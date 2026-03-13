import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-base px-4">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-md bg-white text-3xl font-black text-black">
          OKX
        </div>
        <p className="text-lg tracking-[0.2em] text-slate-500">OKX Quant System</p>
      </div>
      <LoginForm />
      <div className="mt-8 flex gap-6 text-sm text-slate-500">
        <a>Privacy Policy</a>
        <a>Terms of Service</a>
        <a>API Documentation</a>
      </div>
    </main>
  );
}
