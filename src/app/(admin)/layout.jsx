import AdminTemplate from "@/app/components/admin/AdminTemplate";
import {Providers} from "@/app/components/admin/Providers";

export const metadata = {
  title: "Admin",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <AdminTemplate>{children}</AdminTemplate>
    </Providers>
  );
}
