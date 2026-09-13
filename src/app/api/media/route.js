import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

// --- GET: Paginated, searchable media list ---
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const pageSize = Math.max(1, parseInt(searchParams.get("pageSize") || "24", 10));
    const search = searchParams.get("search")?.trim() || "";

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from("media")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (search) {
      query = query.ilike("original_name", `%${search}%`);
    }

    const { data, error, count } = await query;
    if (error) throw error;

    return NextResponse.json({ items: data || [], total: count || 0, page, pageSize });
  } catch (error) {
    console.error("GET Media Error:", error);
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 });
  }
}
