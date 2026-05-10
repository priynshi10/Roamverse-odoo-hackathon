import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { TripCard } from "@/components/TripCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Search } from "lucide-react";

export const Route = createFileRoute("/trips/")({
  head: () => ({ meta: [{ title: "My Trips — RoamVerse" }] }),
  component: TripsPage,
});

function TripsPage() {
  const trips = useStore((s) => s.trips);
  const user = useStore((s) => s.user);
  const hydrated = useStore((s) => s.hydrated);
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  useEffect(() => { if (hydrated && !user) navigate({ to: "/login" }); }, [hydrated, user, navigate]);
  if (!user) return null;

  const filtered = trips.filter((t) =>
    t.name.toLowerCase().includes(q.toLowerCase()) ||
    t.cities.some((c) => c.name.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-4xl font-bold">My Trips</h1>
          <p className="text-muted-foreground mt-1">{trips.length} trips planned</p>
        </div>
        <Button onClick={() => navigate({ to: "/trips/new" })} className="gradient-primary text-primary-foreground border-0">
          <Plus className="h-4 w-4 mr-1" /> New Trip
        </Button>
      </div>

      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input className="pl-9" placeholder="Search trips or cities..." value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      {filtered.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => <TripCard key={t.id} trip={t} />)}
        </div>
      ) : (
        <Card className="p-16 text-center border-dashed">
          <h3 className="font-display text-xl font-semibold">No trips found</h3>
          <p className="text-muted-foreground mt-2 mb-5">Start planning your next adventure.</p>
          <Button onClick={() => navigate({ to: "/trips/new" })} className="gradient-primary text-primary-foreground border-0">
            <Plus className="h-4 w-4 mr-1" /> Create your first trip
          </Button>
        </Card>
      )}
    </div>
  );
}
