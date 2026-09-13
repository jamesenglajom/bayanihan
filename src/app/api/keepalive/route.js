import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

const PING_INTERVAL_MS = 7 * 24 * 60 * 60 * 1000; // 1 week

async function getStatus() {
  const { data, error } = await supabase
    .from("keepalive_pings")
    .select("created_at, source")
    .order("created_at", { ascending: false })
    .limit(5);
  if (error) throw error;

  const lastPing = data?.[0] || null;
  const nextEligibleAt = lastPing
    ? new Date(new Date(lastPing.created_at).getTime() + PING_INTERVAL_MS).toISOString()
    : null;
  const canPingNow = !lastPing || Date.now() >= new Date(nextEligibleAt).getTime();

  return { lastPing, nextEligibleAt, canPingNow, history: data || [] };
}

// --- GET: current keep-alive status ---
export async function GET() {
  try {
    const status = await getStatus();
    return NextResponse.json(status);
  } catch (error) {
    console.error("Keepalive Status Error:", error);
    return NextResponse.json({ error: "Failed to load keep-alive status" }, { status: 500 });
  }
}

// --- POST: manually ping now (rate-limited to once per week) ---
export async function POST() {
  try {
    const status = await getStatus();
    if (!status.canPingNow) {
      return NextResponse.json(
        { error: `Already pinged this week. Next available ${status.nextEligibleAt}.` },
        { status: 429 },
      );
    }

    const { error } = await supabase.from("keepalive_pings").insert({ source: "manual" });
    if (error) throw error;

    const updated = await getStatus();
    return NextResponse.json(updated, { status: 201 });
  } catch (error) {
    console.error("Keepalive Ping Error:", error);
    return NextResponse.json({ error: "Failed to ping Supabase" }, { status: 500 });
  }
}
