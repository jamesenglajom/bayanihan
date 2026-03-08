
"use client"
import React from 'react'
import AdminNavbar from "@/app/components/admin/AdminNavbar"
import AdminSidebar from "@/app/components/admin/AdminSidebar"
function AdminTemplate({children}) {
  return (
    <div className="flex">
        <AdminSidebar />
        <div className="min-h-dvh w-[calc(100%-256px)]">
            <AdminNavbar />
            <div className="p-3">{children}</div>
        </div>
    </div>
  )
}

export default AdminTemplate