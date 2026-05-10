import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useStore } from "@/lib/store";
import { toast } from "sonner";
import hero from "@/assets/hero-travel.jpg";
import { Compass } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — RoamVerse" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const login = useStore((s) => s.login);
  const [email, setEmail] = useState("demo@traveloop.app");
  const [password, setPassword] = useState("password");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return toast.error("Enter a valid email");
    login(email, password);
    toast.success("Welcome back!");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-12">
        <Card className="w-full max-w-md p-8 border-border/60 shadow-card animate-fade-up">
          <div className="flex items-center gap-2 mb-6">
            <span className="grid h-9 w-9 place-items-center rounded-xl gradient-primary text-primary-foreground"><Compass className="h-5 w-5" /></span>
            <span className="font-display font-bold text-lg">RoamVerse</span>
          </div>
          <h1 className="font-display text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground mt-1 text-sm">Sign in to continue planning your trips.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot?</Link>
              </div>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full gradient-primary text-primary-foreground border-0 h-11">Sign in</Button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> OR <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" type="button" onClick={() => { login("guest@traveloop.app", ""); navigate({ to: "/dashboard" }); }}>Continue as guest</Button>
            <Button variant="outline" type="button" disabled>Google</Button>
          </div>

          <p className="text-sm text-muted-foreground text-center mt-6">
            New here? <Link to="/signup" className="text-primary font-medium hover:underline">Create an account</Link>
          </p>
        </Card>
      </div>
      <div className="hidden lg:block relative">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 via-primary/20 to-coral/40" />
        <div className="relative h-full p-12 flex flex-col justify-end text-white">
          <h2 className="font-display text-4xl font-bold leading-tight max-w-md">"Travel makes one modest. You see what a tiny place you occupy in the world."</h2>
          <p className="mt-3 opacity-90">— Gustave Flaubert</p>
        </div>
      </div>
    </div>
  );
}
