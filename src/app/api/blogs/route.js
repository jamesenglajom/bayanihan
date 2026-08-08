import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

// --- GET: Fetch all blogs (List View) ---
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('id, handle, title, excerpt, author, badge, read_duration, main_image, categories, published_at, created_at, updated_at')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data || []);
  } catch (error) {
    console.error("GET List Error:", error);
    return NextResponse.json({ error: 'Failed to fetch blog list' }, { status: 500 });
  }
}

// --- POST: Create blogs ---
export async function POST(request) {
  try {
    const body = await request.json();
    if (!body?.id || !body?.handle) {
      return NextResponse.json({ error: 'Missing ID or Handle' }, { status: 400 });
    }

    const row = { ...body, published_at: body.published_at || null };

    const { error } = await supabase.from('blogs').insert(row);

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'URL handle already exists' }, { status: 400 });
      }
      throw error;
    }

    return NextResponse.json({ message: 'Blog created successfully' }, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}

// --- PUT: Update blogs ---
export async function PUT(request) {
  try {
    const body = await request.json();
    if (!body?.id) {
      return NextResponse.json({ error: 'Missing Blog ID' }, { status: 400 });
    }

    const { id, ...fields } = body;
    const row = { ...fields, published_at: fields.published_at || null };

    const { error } = await supabase.from('blogs').update(row).eq('id', id);

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'New URL handle is already taken' }, { status: 400 });
      }
      throw error;
    }

    return NextResponse.json({ message: 'Blog updated successfully' });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

// --- DELETE: Remove a blog ---
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing Blog ID' }, { status: 400 });
    }

    const { data, error: deleteError } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id)
      .select()
      .maybeSingle();

    if (deleteError) throw deleteError;
    if (!data) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog and associated handles deleted' }, { status: 200 });

  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
