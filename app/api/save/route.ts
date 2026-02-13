import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { sender, message, reply } = await req.json()

    const { error } = await supabase.from("messages").insert([
      {
        sender,
        message,
        reply,
      },
    ])

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Database failed" }, { status: 500 })
  }
}
