import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { popularDestinations, cityCatalog, activityCatalog } from "@/lib/sample-data";
import { Search, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/explore")({
  head: () => ({ meta: [{ title: "Explore — RoamVerse" }] }),
  component: ExplorePage,
});

const regions = ["All", "Europe", "Asia", "Americas", "Africa", "Oceania"];
const categories = ["All", "adventure", "food", "culture", "nature", "shopping", "nightlife", "sightseeing"];

function ExplorePage() {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("All");
  const [cat, setCat] = useState("All");

  const cities = cityCatalog.filter((c) =>
    (region === "All" || c.region === region) &&
    (c.name.toLowerCase().includes(q.toLowerCase()) || c.country.toLowerCase().includes(q.toLowerCase()))
  );
  const acts = activityCatalog.filter((a) =>
    (cat === "All" || a.category === cat) &&
    a.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <h1 className="font-display text-4xl font-bold">Explore</h1>
      <p className="text-muted-foreground mt-1">Discover destinations and activities to add to your trips.</p>

      <div className="relative max-w-xl mt-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input className="pl-9 h-11" placeholder="Search cities, countries or activities..." value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <Tabs defaultValue="cities" className="mt-8">
        <TabsList>
          <TabsTrigger value="cities">Cities</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="cities" className="mt-6 space-y-6">
          <div className="flex flex-wrap gap-2">
            {regions.map((r) => (
              <button key={r} onClick={() => setRegion(r)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${region === r ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/70"}`}>
                {r}
              </button>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {popularDestinations.map((d) => (
              <div key={d.name} className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-card transition-all hover:-translate-y-1">
                <img src={d.image} alt={d.name} className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
                  <div>
                    <h3 className="font-display font-bold text-xl">{d.name}</h3>
                    <p className="text-sm opacity-90">{d.country}</p>
                  </div>
                  <span className="text-xs font-semibold rounded-full glass px-3 py-1">{d.costIndex}</span>
                </div>
              </div>
            ))}
          </div>

          <Card className="p-6 border-border/60">
            <h3 className="font-display font-semibold text-lg mb-4">All cities</h3>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {cities.map((c) => (
                <div key={c.name} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg gradient-primary text-primary-foreground">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="font-medium text-sm">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{c.country}</div>
                    </div>
                  </div>
                  <Badge variant="secondary">{c.cost}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="mt-6 space-y-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${cat === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/70"}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {acts.map((a) => (
              <Card key={a.title} className="p-5 border-border/60 shadow-soft hover:shadow-card transition-shadow">
                <Badge variant="secondary" className="capitalize mb-3">{a.category}</Badge>
                <h4 className="font-semibold">{a.title}</h4>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Estimated cost</span>
                  <span className="font-display font-bold text-lg text-gradient">₹{a.cost.toLocaleString("en-IN")}</span>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
