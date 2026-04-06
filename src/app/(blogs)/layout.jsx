import AdminTemplate from "@/app/components/admin/AdminTemplate";
// import "./admin.css";

export const metadata = {
  title: "Blogs Page",
};

export default function RootLayout({ children }) {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#000814] transition-colors duration-500 pb-20">
    
      {/* 1. Sleek Hero Header */}
      <header className="relative pt-20 pb-32 px-6 overflow-hidden bg-white dark:bg-[#020617]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#003566 1px, transparent 1px)', size: '40px 40px' }} />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-5xl md:text-8xl font-black text-[#001d3d] dark:text-white tracking-tighter mb-6">
            BES <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-yellow-500">Insights.</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg font-medium leading-relaxed">
            The pulse of the Filipino-Swedish community. Heritage, news, and shared journeys.
          </p>
        </div>
      </header>
      
      <>{children}</>
    </main>
  );
}
