import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { popularDestinations } from "@/lib/sample-data";
import { toast } from "sonner";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Traveloop" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const user = useStore((s) => s.user);
  const hydrated = useStore((s) => s.hydrated);
  const updateUser = useStore((s) => s.updateUser);
  const trips = useStore((s) => s.trips);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");

  useEffect(() => { if (hydrated && !user) navigate({ to: "/login" }); }, [hydrated, user, navigate]);
  useEffect(() => { if (user) { setName(user.name); setBio(user.bio ?? ""); } }, [user]);
  if (!user) return null;

  const save = () => {
    updateUser({ name, bio });
    toast.success("Profile updated");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 space-y-8">
      <div className="relative overflow-hidden rounded-3xl gradient-hero p-8 text-white shadow-glow">
        <div className="flex items-center gap-5">
          <Avatar className="h-20 w-20 ring-4 ring-white/30">
            <AvatarFallback className="bg-white text-primary text-2xl font-bold">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-display text-3xl font-bold">{user.name}</h1>
            <p className="opacity-90">{user.email}</p>
            <p className="mt-2 text-sm opacity-90 max-w-md">{user.bio}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-6 border-border/60 shadow-soft">
          <h2 className="font-display font-semibold text-xl mb-4">Account details</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Full name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user.email} disabled />
            </div>
            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} />
            </div>
            <Button onClick={save} className="gradient-primary text-primary-foreground border-0">Save changes</Button>
          </div>
        </Card>

        <Card className="p-6 border-border/60 shadow-soft">
          <h2 className="font-display font-semibold text-xl mb-4">Travel stats</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between"><span className="text-muted-foreground">Trips planned</span><span className="font-semibold">{trips.length}</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">Cities</span><span className="font-semibold">{trips.reduce((a, t) => a + t.cities.length, 0)}</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">Public trips</span><span className="font-semibold">{trips.filter((t) => t.isPublic).length}</span></li>
          </ul>
        </Card>
      </div>

      <Card className="p-6 border-border/60 shadow-soft">
        <h2 className="font-display font-semibold text-xl mb-4 flex items-center gap-2">
          <Heart className="h-5 w-5 text-coral" /> Favorite destinations
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {popularDestinations.slice(0, 3).map((d) => (
            <div key={d.name} className="relative overflow-hidden rounded-xl">
              <img src={d.image} alt={d.name} className="h-32 w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-2 left-3 text-white text-sm font-semibold">{d.name}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
