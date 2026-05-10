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

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — RoamVerse" }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const signup = useStore((s) => s.signup);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Please enter your name");
    if (!email.includes("@")) return toast.error("Enter a valid email");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");
    signup(name.trim(), email, password);
    toast.success("Account created!");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2">
      <div className="hidden lg:block relative">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-coral/50 via-primary/20 to-primary/60" />
        <div className="relative h-full p-12 flex flex-col justify-end text-white">
          <h2 className="font-display text-4xl font-bold leading-tight max-w-md">Plan once. Travel everywhere.</h2>
          <p className="mt-3 opacity-90 max-w-md">Join thousands of travelers building beautiful itineraries with RoamVerse.</p>
        </div>
      </div>
      <div className="flex items-center justify-center px-6 py-12">
        <Card className="w-full max-w-md p-8 border-border/60 shadow-card animate-fade-up">
          <div className="flex items-center gap-2 mb-6">
            <span className="grid h-9 w-9 place-items-center rounded-xl gradient-primary text-primary-foreground"><Compass className="h-5 w-5" /></span>
            <span className="font-display font-bold text-lg">RoamVerse</span>
          </div>
          <h1 className="font-display text-3xl font-bold">Create your account</h1>
          <p className="text-muted-foreground mt-1 text-sm">Free forever. No credit card required.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Maya Patel" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="At least 6 characters" />
            </div>
            <Button type="submit" className="w-full gradient-primary text-primary-foreground border-0 h-11">Create account</Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
