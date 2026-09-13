import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

// Triggered weekly by the Vercel Cron Job configured in vercel.json. Runs
// independently of the manual button/eligibility window in /api/keepalive --
// its whole job is to guarantee at least one Supabase API call happens every
// week even if nobody opens the admin app.
export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { error } = await supabase.from("keepalive_pings").insert({ source: "cron" });
    if (error) throw error;

    return NextResponse.json({ message: "Pinged Supabase", pingedAt: new Date().toISOString() });
  } catch (error) {
    console.error("Keepalive Cron Error:", error);
    return NextResponse.json({ error: "Failed to ping Supabase" }, { status: 500 });
  }
}
