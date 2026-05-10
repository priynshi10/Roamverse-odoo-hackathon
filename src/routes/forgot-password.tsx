import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Compass } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot password — Traveloop" }] }),
  component: ForgotPage,
});

function ForgotPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return toast.error("Enter a valid email");
    setSent(true);
    toast.success("Reset link sent (demo)");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] grid place-items-center px-6 py-12">
      <Card className="w-full max-w-md p-8 border-border/60 shadow-card animate-fade-up">
        <div className="flex items-center gap-2 mb-6">
          <span className="grid h-9 w-9 place-items-center rounded-xl gradient-primary text-primary-foreground"><Compass className="h-5 w-5" /></span>
          <span className="font-display font-bold text-lg">Traveloop</span>
        </div>
        <h1 className="font-display text-3xl font-bold">Reset your password</h1>
        <p className="text-muted-foreground mt-1 text-sm">Enter your email and we'll send a reset link.</p>

        {!sent ? (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full gradient-primary text-primary-foreground border-0 h-11">Send reset link</Button>
          </form>
        ) : (
          <div className="mt-6 rounded-xl bg-secondary p-4 text-sm">
            Check your inbox at <strong>{email}</strong> for further instructions.
          </div>
        )}
        <p className="text-sm text-muted-foreground text-center mt-6">
          <Link to="/login" className="text-primary font-medium hover:underline">Back to sign in</Link>
        </p>
      </Card>
    </div>
  );
}
