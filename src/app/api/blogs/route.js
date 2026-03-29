import { NextResponse } from 'next/server';
import { redis } from '@/app/lib/upstash';

const BLOGS_KEY = process.env.UPSTASH_KEY_BLOGS;
const HANDLES_INDEX = 'bes_handles_index';

// --- GET: Fetch all blogs (List View) ---
export async function GET() {
  try {
    const blog_ids = (await redis.get(BLOGS_KEY)) || [];

    if (blog_ids.length === 0) {
      return NextResponse.json([]);
    }

    const all_blogs = await redis.mget(...blog_ids);

    // Slim down data for the list view (Exclude heavy Tiptap content)
    const slim_blogs = all_blogs
      .filter(Boolean)
      .map(({ content, ...rest }) => ({
        ...rest,
      }))
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return NextResponse.json(slim_blogs);
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

    const blog_id = `blog-${body.id}`;
    const blog_handle = body.handle;

    // 1. Uniqueness Check
    const isHandleTaken = await redis.sismember(HANDLES_INDEX, blog_handle);
    if (isHandleTaken) {
      return NextResponse.json({ error: 'URL handle already exists' }, { status: 400 });
    }

    const pipeline = redis.pipeline();
    
    // 2. Update Global ID List
    const blogs_list = (await redis.get(BLOGS_KEY)) || [];
    const new_list = [...new Set([...blogs_list, blog_id])];
    pipeline.set(BLOGS_KEY, new_list);

    // 3. Create Pointer and Update Index
    pipeline.set(`handle:${blog_handle}`, blog_id);
    pipeline.sadd(HANDLES_INDEX, blog_handle);

    // 4. Save Actual Data
    pipeline.set(blog_id, body);

    await pipeline.exec();
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
    const blog_id = `blog-${body.id}`;
    
    // 1. Fetch current data to check for handle changes
    const oldData = await redis.get(blog_id);
    const pipeline = redis.pipeline();

    // 2. Handle Management (If URL slug changed)
    if (oldData && oldData.handle !== body.handle) {
      // Remove old pointers
      pipeline.del(`handle:${oldData.handle}`);
      pipeline.srem(HANDLES_INDEX, oldData.handle);
      
      // Check if new handle is already taken by someone else
      const isNewHandleTaken = await redis.sismember(HANDLES_INDEX, body.handle);
      if (isNewHandleTaken) {
        return NextResponse.json({ error: 'New URL handle is already taken' }, { status: 400 });
      }

      // Add new pointers
      pipeline.set(`handle:${body.handle}`, blog_id);
      pipeline.sadd(HANDLES_INDEX, body.handle);
    }

    // 3. Update core data
    pipeline.set(blog_id, body);
    
    // 4. Ensure ID is in the global index
    const blogs_list = (await redis.get(BLOGS_KEY)) || [];
    if (!blogs_list.includes(blog_id)) {
      pipeline.set(BLOGS_KEY, [...blogs_list, blog_id]);
    }

    await pipeline.exec();
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
    const id = searchParams.get('id'); // Expecting "blog-xxxx"

    if (!id) {
      return NextResponse.json({ error: 'Missing Blog ID' }, { status: 400 });
    }

    const blogData = await redis.get(id);
    if (!blogData) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const pipeline = redis.pipeline();

    // 1. Remove from Global ID List
    const blogs_list = (await redis.get(BLOGS_KEY)) || [];
    const updated_list = blogs_list.filter(item => item !== id);
    pipeline.set(BLOGS_KEY, updated_list);

    // 2. Clean up Handle Pointers
    if (blogData.handle) {
      pipeline.del(`handle:${blogData.handle}`);
      pipeline.srem(HANDLES_INDEX, blogData.handle);
    }

    // 3. Delete Actual Blog Data
    pipeline.del(id);

    await pipeline.exec();
    return NextResponse.json({ message: 'Blog and associated handles deleted' }, { status: 200 });

  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}