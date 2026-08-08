import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const faqs = Array.isArray(body) ? body : [];

    // Whole-list replace (matches the previous single-key overwrite semantics):
    // wipe the table, then reinsert in the client's order.
    const { error: deleteError } = await supabase
      .from('faqs')
      .delete()
      .not('id', 'is', null);
    if (deleteError) throw deleteError;

    if (faqs.length > 0) {
      const rows = faqs.map((faq, index) => ({
        id: faq.id?.toString(),
        question: faq.question,
        answer: faq.answer,
        sort_order: index,
      }));
      const { error: insertError } = await supabase.from('faqs').insert(rows);
      if (insertError) throw insertError;
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Save Error:", error);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
