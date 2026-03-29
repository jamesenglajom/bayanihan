import React from "react";
import BlogEditor from "@/app/components/admin/BlogEditor";
import { getBlogById } from "@/app/lib/fn_server";

export const metadata = {
  title: "Update Blogs | Admin",
};

async function page({ params }) {
  const { id } = await params;
  const blog = await getBlogById(id);
  return <main>
    <BlogEditor blog={blog}/>
  </main>;
}

export default page;
