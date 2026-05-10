import { Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";
import type { Trip } from "@/lib/types";
import { totalBudget, tripDuration } from "@/lib/store";
import { format } from "date-fns";

export function TripCard({ trip }: { trip: Trip }) {
  return (
    <Link to="/trips/$tripId" params={{ tripId: trip.id }} className="group block">
      <Card className="overflow-hidden border-border/60 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 p-0">
        <div className="relative h-44 overflow-hidden">
          {trip.cover ? (
            <img src={trip.cover} alt={trip.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
          ) : (
            <div className="h-full w-full gradient-hero" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          {trip.isPublic && (
            <Badge className="absolute top-3 right-3 bg-coral text-coral-foreground border-0">
              <Users className="h-3 w-3 mr-1" /> Public
            </Badge>
          )}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <h3 className="font-display font-bold text-xl drop-shadow-md line-clamp-1">{trip.name}</h3>
            <p className="text-xs opacity-90 line-clamp-1">{trip.description}</p>
          </div>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {format(new Date(trip.startDate), "MMM d")} – {format(new Date(trip.endDate), "MMM d, yyyy")}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" /> {trip.cities.length} {trip.cities.length === 1 ? "city" : "cities"}
            </span>
            <span className="font-semibold text-foreground">₹{totalBudget(trip.budget).toLocaleString("en-IN")}</span>
          </div>
          <div className="text-xs text-muted-foreground">{tripDuration(trip)} days</div>
        </div>
      </Card>
    </Link>
  );
}
