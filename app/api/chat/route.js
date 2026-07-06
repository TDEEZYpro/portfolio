import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { portfolioContext } from '@/app/lib/portfolioContext'
import { rateLimit } from '@/app/lib/rateLimit'

const MODEL = 'openai/gpt-4o'
const FALLBACK_MODEL = 'openai/gpt-4o-mini'
const MAX_USER_MESSAGE_LENGTH = 500

function getOpenRouterClient() {
  return new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
      'HTTP-Referer': process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000',
      'X-Title': 'Nkosinathi Mnguni Portfolio Chatbot',
    },
  })
}

async function callOpenRouter(messages, model) {
  const openai = getOpenRouterClient()
  return openai.chat.completions.create({
    model,
    messages,
    temperature: 0.7,
    max_tokens: 512,
  })
}

export async function POST(request) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      console.error('OPENROUTER_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Chatbot is temporarily unavailable. The API key has not been configured.' },
        { status: 503 }
      )
    }

    const limit = rateLimit(request)
    if (!limit.allowed) {
      return NextResponse.json(
        { error: 'Too many messages. Please wait a minute before trying again.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      )
    }

    const body = await request.json()
    const userMessages = Array.isArray(body?.messages) ? body.messages : []
    const lastUserMessage = userMessages
      .slice()
      .reverse()
      .find((m) => m.role === 'user')

    if (!lastUserMessage || typeof lastUserMessage.content !== 'string' || !lastUserMessage.content.trim()) {
      return NextResponse.json({ error: 'A valid user message is required.' }, { status: 400 })
    }

    if (lastUserMessage.content.length > MAX_USER_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message is too long. Please keep it under ${MAX_USER_MESSAGE_LENGTH} characters.` },
        { status: 400 }
      )
    }

    const systemMessage = {
      role: 'system',
      content: portfolioContext,
    }

    const messagesForApi = [systemMessage, ...userMessages]

    let completion
    try {
      completion = await callOpenRouter(messagesForApi, MODEL)
    } catch (primaryError) {
      console.warn('Primary model failed, trying fallback:', primaryError.message)
      try {
        completion = await callOpenRouter(messagesForApi, FALLBACK_MODEL)
      } catch (fallbackError) {
        console.error('Fallback model also failed:', fallbackError.message)
        throw fallbackError
      }
    }

    const reply = completion.choices?.[0]?.message?.content?.trim()

    if (!reply) {
      return NextResponse.json({ error: 'No response received from the AI model.' }, { status: 502 })
    }

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong while fetching the response. Please try again.' },
      { status: 500 }
    )
  }
}
