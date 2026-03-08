"use client";
import { useActionState } from "react"; // Imported from 'react'
import { loginAction, createUserAction } from "@/app/lib/actions";

function LoginForm() {
  const [state, formAction] = useActionState(loginAction, null);
  
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Welcome Back
        </h1>
        <p className="text-slate-400 mt-2 text-sm">
          Please enter your details to sign in
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        {/* ERROR DISPLAY */}
        {state?.error && (
          <div className="p-3 text-sm text-red-400 bg-red-900/20 border border-red-500/50 rounded-lg animate-in fade-in zoom-in duration-200">
            {state.error}
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
            Username
          </label>
          <input
            name="username"
            type="text"
            required
            placeholder="Bayanihan001"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-theme-yellow  text-black font-semibold py-3 rounded-lg hover:bg-theme-cream active:scale-[0.98] transition-all cursor-pointer"
        >
          Sign In
        </button>
      </form>

      {/* <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-slate-500 text-sm">
              Problems logging in? <span className="text-blue-400 hover:underline cursor-pointer">Contact Support</span>
            </p>
          </div> */}
    </div>
  );
}

export default LoginForm;
