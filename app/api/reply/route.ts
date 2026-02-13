import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { message, tone } = await req.json()

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Reply professionally in ${tone} tone.`,
          },
          { role: "user", content: message },
        ],
      }),
    })

    const data = await res.json()
    const reply = data.choices?.[0]?.message?.content || "No reply generated"

    return NextResponse.json({ reply })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "AI failed" }, { status: 500 })
  }
}
