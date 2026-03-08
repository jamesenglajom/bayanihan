import AdminTemplate from "@/app/components/admin/AdminTemplate"
// import "./admin.css";

export const metadata = {
  title: "Admin",
};

export default function RootLayout({ children }) {
  return <AdminTemplate>{children}</AdminTemplate>;
}
