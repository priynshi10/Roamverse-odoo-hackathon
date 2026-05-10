import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { popularDestinations } from "@/lib/sample-data";
import { toast } from "sonner";

export const Route = createFileRoute("/trips/new")({
  head: () => ({ meta: [{ title: "Create trip — RoamVerse" }] }),
  component: NewTripPage,
});

function NewTripPage() {
  const navigate = useNavigate();
  const user = useStore((s) => s.user);
  const hydrated = useStore((s) => s.hydrated);
  const createTrip = useStore((s) => s.createTrip);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [cover, setCover] = useState(popularDestinations[0].image);

  useEffect(() => { if (hydrated && !user) navigate({ to: "/login" }); }, [hydrated, user, navigate]);
  if (!user) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Add a trip name");
    if (!startDate || !endDate) return toast.error("Add trip dates");
    if (new Date(endDate) < new Date(startDate)) return toast.error("End date must be after start date");
    const id = createTrip({ name, description, startDate, endDate, cover });
    toast.success("Trip created!");
    navigate({ to: "/trips/$tripId", params: { tripId: id } });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <h1 className="font-display text-4xl font-bold">Create a new trip</h1>
      <p className="text-muted-foreground mt-2">Set up the basics — you can add cities and activities next.</p>

      <Card className="mt-8 p-6 sm:p-8 border-border/60 shadow-soft">
        <form onSubmit={submit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Trip name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Summer in Greece" />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="start">Start date</Label>
              <Input id="start" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end">End date</Label>
              <Input id="end" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="desc">Description</Label>
            <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What's the vibe of this trip?" rows={3} />
          </div>

          <div className="space-y-3">
            <Label>Cover photo</Label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {popularDestinations.map((d) => (
                <button key={d.name} type="button" onClick={() => setCover(d.image)}
                  className={`relative aspect-square overflow-hidden rounded-xl ring-2 transition-all ${cover === d.image ? "ring-primary ring-offset-2 ring-offset-background" : "ring-transparent hover:ring-border"}`}>
                  <img src={d.image} alt={d.name} className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit" className="gradient-primary text-primary-foreground border-0 h-11 px-6">Create trip</Button>
            <Button type="button" variant="outline" onClick={() => navigate({ to: "/trips" })}>Cancel</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
