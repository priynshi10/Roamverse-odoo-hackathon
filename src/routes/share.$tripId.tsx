import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore, totalBudget, tripDuration } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/Footer";
import { format } from "date-fns";
import { Calendar, Compass, MapPin, Wallet } from "lucide-react";

export const Route = createFileRoute("/share/$tripId")({
  head: () => ({ meta: [{ title: "Shared trip — RoamVerse" }] }),
  component: SharePage,
});

function SharePage() {
  const { tripId } = Route.useParams();
  const trip = useStore((s) => s.trips.find((t) => t.id === tripId));

  if (!trip || !trip.isPublic) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Trip not available</h1>
        <p className="text-muted-foreground mt-2">This trip is private or no longer exists.</p>
        <Link to="/" className="inline-block mt-6 text-primary hover:underline">Back to RoamVerse</Link>
      </div>
    );
  }

  return (
    <>
      <section className="relative h-80 overflow-hidden">
        {trip.cover && <img src={trip.cover} alt={trip.name} className="absolute inset-0 h-full w-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/40" />
        <div className="relative mx-auto max-w-5xl h-full px-6 flex flex-col justify-end pb-8 text-white">
          <Badge className="self-start mb-3 bg-coral text-coral-foreground border-0">Shared trip</Badge>
          <h1 className="font-display text-4xl sm:text-5xl font-bold drop-shadow">{trip.name}</h1>
          <p className="mt-2 text-white/90 max-w-xl">{trip.description}</p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/90">
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{format(new Date(trip.startDate), "MMM d")} – {format(new Date(trip.endDate), "MMM d, yyyy")}</span>
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{trip.cities.length} cities</span>
            <span className="flex items-center gap-1"><Wallet className="h-4 w-4" />₹{totalBudget(trip.budget).toLocaleString("en-IN")}</span>
            <span>{tripDuration(trip)} days</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-10 space-y-6">
        {trip.cities.length === 0 ? (
          <Card className="p-12 text-center border-dashed">
            <p className="text-muted-foreground">No itinerary yet.</p>
          </Card>
        ) : trip.cities.map((city, idx) => (
          <Card key={city.id} className="p-6 border-border/60 shadow-soft">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/60">
              <div className="grid h-12 w-12 place-items-center rounded-xl gradient-primary text-primary-foreground text-xl">
                {city.coverEmoji ?? idx + 1}
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold">{city.name}</h3>
                <p className="text-sm text-muted-foreground">{city.country} • {format(new Date(city.startDate), "MMM d")} – {format(new Date(city.endDate), "MMM d")}</p>
              </div>
            </div>
            <div className="space-y-4">
              {city.days.map((day, di) => (
                <div key={day.id}>
                  <div className="font-semibold text-sm mb-2">Day {di + 1} <span className="text-muted-foreground font-normal">• {format(new Date(day.date), "EEEE, MMM d")}</span></div>
                  {day.activities.length === 0 ? (
                    <p className="text-xs text-muted-foreground pl-2">No activities</p>
                  ) : (
                    <ul className="space-y-1.5">
                      {day.activities.map((a) => (
                        <li key={a.id} className="flex items-center justify-between text-sm p-2.5 rounded-lg bg-secondary/40">
                          <div>
                            <span className="font-medium">{a.title}</span>
                            <span className="ml-2 text-xs text-muted-foreground capitalize">{a.category}</span>
                          </div>
                          {a.cost > 0 && <span className="font-semibold">₹{a.cost.toLocaleString("en-IN")}</span>}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}

        <Card className="p-6 border-border/60 text-center bg-gradient-to-br from-primary/10 to-coral/10">
          <Compass className="h-8 w-8 mx-auto text-primary mb-2" />
          <p className="font-semibold">Plan your own beautiful trip with RoamVerse</p>
          <Link to="/" className="text-sm text-primary hover:underline mt-1 inline-block">Get started →</Link>
        </Card>
      </div>
      <Footer />
    </>
  );
}
