export const metadata = {
  title: "Donate & Support | Bayanihan Exchange Sweden (BES)",
  description: "Join the Bayanihan movement in Sweden. Help foster community through cultural exchange and integration workshops. Secure donations via Swish.",
};

export default function RootLayout({ children }) {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#000814] transition-colors duration-500 pb-20">
      {children}
    </main>
  );
}
