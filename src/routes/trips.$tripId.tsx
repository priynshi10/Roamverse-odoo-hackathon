import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useStore, totalBudget, tripDuration } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { cityCatalog, activityCatalog } from "@/lib/sample-data";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  ArrowLeft, ArrowUp, ArrowDown, Calendar, Copy, Globe, MapPin, Plus,
  Share2, Trash2, X, Wallet, ListChecks, NotebookPen, Map, Clock,
} from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/trips/$tripId")({
  head: () => ({ meta: [{ title: "Trip — Traveloop" }] }),
  component: TripDetailPage,
});

const categoryColors: Record<string, string> = {
  adventure: "bg-orange-500", food: "bg-rose-500", culture: "bg-violet-500",
  nature: "bg-emerald-500", shopping: "bg-pink-500", nightlife: "bg-indigo-500",
  sightseeing: "bg-sky-500", transport: "bg-slate-500", stay: "bg-amber-500",
};

function TripDetailPage() {
  const { tripId } = Route.useParams();
  const navigate = useNavigate();
  const user = useStore((s) => s.user);
  const hydrated = useStore((s) => s.hydrated);
  const trip = useStore((s) => s.trips.find((t) => t.id === tripId));
  const deleteTrip = useStore((s) => s.deleteTrip);
  const togglePublic = useStore((s) => s.togglePublic);
  const duplicateTrip = useStore((s) => s.duplicateTrip);

  useEffect(() => { if (hydrated && !user) navigate({ to: "/login" }); }, [hydrated, user, navigate]);

  if (!trip) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Trip not found</h1>
        <Button className="mt-4" onClick={() => navigate({ to: "/trips" })}>Back to trips</Button>
      </div>
    );
  }

  const handleShare = () => {
    if (!trip.isPublic) togglePublic(trip.id);
    const url = `${window.location.origin}/share/${trip.id}`;
    navigator.clipboard?.writeText(url);
    toast.success("Public link copied!");
  };

  return (
    <div>
      {/* HERO */}
      <section className="relative h-72 sm:h-96 overflow-hidden">
        {trip.cover ? (
          <img src={trip.cover} alt={trip.name} className="absolute inset-0 h-full w-full object-cover" />
        ) : <div className="absolute inset-0 gradient-hero" />}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/30" />
        <div className="relative mx-auto max-w-7xl h-full px-4 sm:px-6 flex flex-col justify-end pb-8">
          <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/trips" })} className="self-start mb-4 bg-white/10 backdrop-blur text-white hover:bg-white/20 hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-1" /> All trips
          </Button>
          <div className="flex flex-wrap items-end justify-between gap-4 text-white">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {trip.isPublic && <Badge className="bg-coral text-coral-foreground border-0"><Globe className="h-3 w-3 mr-1" />Public</Badge>}
                <Badge variant="secondary" className="bg-white/20 text-white border-0">{tripDuration(trip)} days</Badge>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold drop-shadow">{trip.name}</h1>
              <p className="mt-2 text-white/90 max-w-xl">{trip.description}</p>
              <p className="mt-2 text-sm text-white/80 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {format(new Date(trip.startDate), "MMM d")} – {format(new Date(trip.endDate), "MMM d, yyyy")}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleShare} className="bg-white text-primary hover:bg-white/90">
                <Share2 className="h-4 w-4 mr-1" /> Share
              </Button>
              <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20" onClick={() => {
                const id = duplicateTrip(trip.id);
                if (id) { toast.success("Duplicated"); navigate({ to: "/trips/$tripId", params: { tripId: id } }); }
              }}>
                <Copy className="h-4 w-4 mr-1" /> Duplicate
              </Button>
              <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20" onClick={() => {
                if (confirm("Delete this trip?")) { deleteTrip(trip.id); navigate({ to: "/trips" }); }
              }}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <Tabs defaultValue="itinerary" className="space-y-6">
          <TabsList className="flex flex-wrap h-auto">
            <TabsTrigger value="itinerary"><Map className="h-4 w-4 mr-1" />Itinerary</TabsTrigger>
            <TabsTrigger value="budget"><Wallet className="h-4 w-4 mr-1" />Budget</TabsTrigger>
            <TabsTrigger value="packing"><ListChecks className="h-4 w-4 mr-1" />Packing</TabsTrigger>
            <TabsTrigger value="notes"><NotebookPen className="h-4 w-4 mr-1" />Notes</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="itinerary"><ItineraryTab tripId={trip.id} /></TabsContent>
          <TabsContent value="budget"><BudgetTab tripId={trip.id} /></TabsContent>
          <TabsContent value="packing"><PackingTab tripId={trip.id} /></TabsContent>
          <TabsContent value="notes"><NotesTab tripId={trip.id} /></TabsContent>
          <TabsContent value="settings"><SettingsTab tripId={trip.id} /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

/* -------------------- ITINERARY -------------------- */

function ItineraryTab({ tripId }: { tripId: string }) {
  const trip = useStore((s) => s.trips.find((t) => t.id === tripId)!);
  const addCity = useStore((s) => s.addCity);
  const removeCity = useStore((s) => s.removeCity);
  const reorderCities = useStore((s) => s.reorderCities);
  const addActivity = useStore((s) => s.addActivity);
  const removeActivity = useStore((s) => s.removeActivity);

  const [cityOpen, setCityOpen] = useState(false);
  const [cityName, setCityName] = useState("");
  const [cityCountry, setCityCountry] = useState("");
  const [cityStart, setCityStart] = useState(trip.startDate);
  const [cityEnd, setCityEnd] = useState(trip.endDate);

  const move = (id: string, dir: -1 | 1) => {
    const ids = trip.cities.map((c) => c.id);
    const idx = ids.indexOf(id);
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= ids.length) return;
    [ids[idx], ids[newIdx]] = [ids[newIdx], ids[idx]];
    reorderCities(tripId, ids);
  };

  const submitCity = () => {
    if (!cityName.trim()) return toast.error("City name required");
    addCity(tripId, { name: cityName, country: cityCountry, startDate: cityStart, endDate: cityEnd });
    setCityOpen(false);
    setCityName(""); setCityCountry("");
    toast.success("City added");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Itinerary</h2>
          <p className="text-sm text-muted-foreground">Build your journey city by city, day by day.</p>
        </div>
        <Dialog open={cityOpen} onOpenChange={setCityOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground border-0"><Plus className="h-4 w-4 mr-1" />Add city</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add a city</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label>City</Label>
                <Input value={cityName} onChange={(e) => setCityName(e.target.value)} placeholder="Search or enter city" list="city-options" />
                <datalist id="city-options">
                  {cityCatalog.map((c) => <option key={c.name} value={c.name} />)}
                </datalist>
              </div>
              <div className="space-y-2">
                <Label>Country</Label>
                <Input value={cityCountry} onChange={(e) => setCityCountry(e.target.value)} placeholder="Country" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Arrive</Label>
                  <Input type="date" value={cityStart} onChange={(e) => setCityStart(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Depart</Label>
                  <Input type="date" value={cityEnd} onChange={(e) => setCityEnd(e.target.value)} />
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {cityCatalog.slice(0, 6).map((c) => (
                  <button key={c.name} type="button" onClick={() => { setCityName(c.name); setCityCountry(c.country); }}
                    className="text-xs px-2 py-1 rounded-full bg-secondary hover:bg-secondary/70">
                    {c.name}
                  </button>
                ))}
              </div>
              <Button onClick={submitCity} className="w-full gradient-primary text-primary-foreground border-0">Add city</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {trip.cities.length === 0 ? (
        <Card className="p-12 text-center border-dashed">
          <MapPin className="h-10 w-10 mx-auto text-muted-foreground" />
          <h3 className="font-display font-semibold text-lg mt-3">No cities yet</h3>
          <p className="text-sm text-muted-foreground mt-1">Start by adding your first destination.</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {trip.cities.map((city, idx) => (
            <Card key={city.id} className="p-6 border-border/60 shadow-soft overflow-hidden">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-5 pb-5 border-b border-border/60">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-xl gradient-primary text-primary-foreground text-xl shadow-soft">
                    {city.coverEmoji ?? idx + 1}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold">{city.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {city.country} • {format(new Date(city.startDate), "MMM d")} – {format(new Date(city.endDate), "MMM d")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button size="icon" variant="ghost" disabled={idx === 0} onClick={() => move(city.id, -1)}><ArrowUp className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" disabled={idx === trip.cities.length - 1} onClick={() => move(city.id, 1)}><ArrowDown className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => { if (confirm("Remove city?")) removeCity(tripId, city.id); }}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {city.days.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No days planned. Add an activity to get started.</p>
                ) : (
                  city.days.map((day, di) => (
                    <div key={day.id} className="relative pl-8">
                      <div className="absolute left-0 top-2 grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        {di + 1}
                      </div>
                      <div className="absolute left-3 top-8 bottom-0 w-px bg-border" />
                      <div className="font-semibold text-sm mb-2">
                        Day {di + 1} <span className="text-muted-foreground font-normal">• {format(new Date(day.date), "EEEE, MMM d")}</span>
                      </div>
                      <div className="space-y-2">
                        {day.activities.map((a) => (
                          <div key={a.id} className="group flex items-start gap-3 p-3 rounded-xl bg-secondary/40 hover:bg-secondary transition-colors">
                            <span className={`mt-1 h-2.5 w-2.5 rounded-full ${categoryColors[a.category] ?? "bg-primary"}`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 flex-wrap">
                                <div className="font-medium">{a.title}</div>
                                <div className="text-sm font-semibold text-foreground/80">${a.cost}</div>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                {a.time && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{a.time}</span>}
                                <Badge variant="secondary" className="capitalize text-xs">{a.category}</Badge>
                              </div>
                              {a.notes && <p className="text-xs text-muted-foreground mt-1">{a.notes}</p>}
                            </div>
                            <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100" onClick={() => removeActivity(tripId, city.id, day.id, a.id)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <AddActivityInline onAdd={(a) => addActivity(tripId, city.id, day.date, a)} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function AddActivityInline({ onAdd }: { onAdd: (a: { title: string; category: any; cost: number; time?: string }) => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("sightseeing");
  const [cost, setCost] = useState(0);
  const [time, setTime] = useState("");

  if (!open) return (
    <button onClick={() => setOpen(true)} className="w-full text-left text-sm text-muted-foreground hover:text-foreground py-2 px-3 rounded-xl border border-dashed border-border hover:border-primary/50 transition-colors">
      <Plus className="inline h-3.5 w-3.5 mr-1" /> Add activity
    </button>
  );

  return (
    <div className="p-3 rounded-xl border border-border space-y-2 bg-card">
      <div className="grid sm:grid-cols-2 gap-2">
        <Input placeholder="Activity title" value={title} onChange={(e) => setTitle(e.target.value)} list="act-suggestions" />
        <datalist id="act-suggestions">
          {activityCatalog.map((a) => <option key={a.title} value={a.title} />)}
        </datalist>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {["adventure", "food", "culture", "nature", "shopping", "nightlife", "sightseeing", "transport", "stay"].map((c) => (
              <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid sm:grid-cols-2 gap-2">
        <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        <Input type="number" placeholder="Cost (USD)" value={cost || ""} onChange={(e) => setCost(Number(e.target.value))} />
      </div>
      <div className="flex gap-2">
        <Button size="sm" className="gradient-primary text-primary-foreground border-0" onClick={() => {
          if (!title.trim()) return;
          onAdd({ title, category, cost, time: time || undefined });
          setTitle(""); setCost(0); setTime(""); setOpen(false);
        }}>Add</Button>
        <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      </div>
    </div>
  );
}

/* -------------------- BUDGET -------------------- */

function BudgetTab({ tripId }: { tripId: string }) {
  const trip = useStore((s) => s.trips.find((t) => t.id === tripId)!);
  const setBudget = useStore((s) => s.setBudget);
  const [b, setB] = useState(trip.budget);

  useEffect(() => setB(trip.budget), [trip.budget]);

  const total = totalBudget(b);
  const days = tripDuration(trip);
  const dailyAvg = total / days;

  const data = [
    { name: "Transport", value: b.transport, color: "var(--chart-1)" },
    { name: "Hotel", value: b.hotel, color: "var(--chart-2)" },
    { name: "Activities", value: b.activities, color: "var(--chart-3)" },
    { name: "Meals", value: b.meals, color: "var(--chart-4)" },
    { name: "Other", value: b.other, color: "var(--chart-5)" },
  ];

  const maxBudget = 10000;
  const overBudget = total > maxBudget;

  const update = (k: keyof typeof b, v: number) => {
    const next = { ...b, [k]: Math.max(0, v) };
    setB(next);
    setBudget(tripId, next);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5 border-border/60 shadow-soft">
          <div className="text-sm text-muted-foreground">Total budget</div>
          <div className="font-display text-3xl font-bold mt-1 text-gradient">${total.toLocaleString()}</div>
          {overBudget && <p className="text-xs text-destructive mt-2">⚠ Over recommended ${maxBudget.toLocaleString()}</p>}
        </Card>
        <Card className="p-5 border-border/60 shadow-soft">
          <div className="text-sm text-muted-foreground">Daily average</div>
          <div className="font-display text-3xl font-bold mt-1">${Math.round(dailyAvg).toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-2">Across {days} days</div>
        </Card>
        <Card className="p-5 border-border/60 shadow-soft">
          <div className="text-sm text-muted-foreground">Largest category</div>
          <div className="font-display text-2xl font-bold mt-1 capitalize">
            {data.reduce((a, c) => (c.value > a.value ? c : a), data[0]).name}
          </div>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="p-6 border-border/60 shadow-soft">
          <h3 className="font-display font-semibold text-lg mb-4">Edit categories</h3>
          <div className="space-y-4">
            {(["transport", "hotel", "activities", "meals", "other"] as const).map((k) => (
              <div key={k}>
                <div className="flex justify-between items-center mb-1.5">
                  <Label className="capitalize">{k}</Label>
                  <Input type="number" className="w-32 h-9" value={b[k] || ""} onChange={(e) => update(k, Number(e.target.value))} />
                </div>
                <Progress value={total > 0 ? (b[k] / total) * 100 : 0} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-border/60 shadow-soft">
          <h3 className="font-display font-semibold text-lg mb-4">Breakdown</h3>
          {total > 0 ? (
            <div className="h-72">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={data.filter((d) => d.value > 0)} dataKey="value" innerRadius={60} outerRadius={100} paddingAngle={2}>
                    {data.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: any) => `$${Number(v).toLocaleString()}`} contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : <div className="h-72 grid place-items-center text-sm text-muted-foreground">Add budget amounts to see chart</div>}
        </Card>
      </div>

      <Card className="p-6 border-border/60 shadow-soft">
        <h3 className="font-display font-semibold text-lg mb-4">Compare</h3>
        <div className="h-56">
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip formatter={(v: any) => `$${Number(v).toLocaleString()}`} contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {data.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

/* -------------------- PACKING -------------------- */

function PackingTab({ tripId }: { tripId: string }) {
  const trip = useStore((s) => s.trips.find((t) => t.id === tripId)!);
  const addPacking = useStore((s) => s.addPacking);
  const togglePacking = useStore((s) => s.togglePacking);
  const removePacking = useStore((s) => s.removePacking);

  const [text, setText] = useState("");
  const [cat, setCat] = useState<"clothing" | "electronics" | "essentials" | "documents">("essentials");

  const grouped = useMemo(() => {
    const g: Record<string, typeof trip.packing> = { clothing: [], electronics: [], essentials: [], documents: [] };
    trip.packing.forEach((p) => g[p.category].push(p));
    return g;
  }, [trip.packing]);

  const packed = trip.packing.filter((p) => p.packed).length;

  return (
    <div className="space-y-6">
      <Card className="p-6 border-border/60 shadow-soft">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-semibold text-lg">Packing progress</h3>
          <span className="text-sm text-muted-foreground">{packed} / {trip.packing.length}</span>
        </div>
        <Progress value={trip.packing.length ? (packed / trip.packing.length) * 100 : 0} />
      </Card>

      <Card className="p-6 border-border/60 shadow-soft">
        <h3 className="font-display font-semibold text-lg mb-4">Add an item</h3>
        <div className="flex flex-wrap gap-2">
          <Input placeholder="e.g. Sunscreen" value={text} onChange={(e) => setText(e.target.value)} className="flex-1 min-w-[180px]" />
          <Select value={cat} onValueChange={(v: any) => setCat(v)}>
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="essentials">Essentials</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="documents">Documents</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gradient-primary text-primary-foreground border-0" onClick={() => {
            if (!text.trim()) return;
            addPacking(tripId, { text, category: cat });
            setText("");
          }}><Plus className="h-4 w-4 mr-1" />Add</Button>
        </div>
      </Card>

      <div className="grid gap-5 sm:grid-cols-2">
        {Object.entries(grouped).map(([category, items]) => (
          <Card key={category} className="p-6 border-border/60 shadow-soft">
            <h3 className="font-display font-semibold text-lg capitalize mb-3">{category}</h3>
            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground">No items yet.</p>
            ) : (
              <ul className="space-y-2">
                {items.map((p) => (
                  <li key={p.id} className="group flex items-center gap-3 p-2.5 rounded-xl bg-secondary/40 hover:bg-secondary transition-colors">
                    <input type="checkbox" checked={p.packed} onChange={() => togglePacking(tripId, p.id)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
                    <span className={`flex-1 text-sm ${p.packed ? "line-through text-muted-foreground" : ""}`}>{p.text}</span>
                    <button onClick={() => removePacking(tripId, p.id)} className="opacity-0 group-hover:opacity-100">
                      <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

/* -------------------- NOTES -------------------- */

function NotesTab({ tripId }: { tripId: string }) {
  const trip = useStore((s) => s.trips.find((t) => t.id === tripId)!);
  const addNote = useStore((s) => s.addNote);
  const removeNote = useStore((s) => s.removeNote);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-1 p-6 border-border/60 shadow-soft h-fit">
        <h3 className="font-display font-semibold text-lg mb-4">New note</h3>
        <div className="space-y-3">
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Textarea placeholder="Write your thoughts, reminders, recommendations..." rows={5} value={body} onChange={(e) => setBody(e.target.value)} />
          <Button className="gradient-primary text-primary-foreground border-0 w-full" onClick={() => {
            if (!title.trim()) return toast.error("Add a title");
            addNote(tripId, { title, body, date });
            setTitle(""); setBody(""); toast.success("Note saved");
          }}>Save note</Button>
        </div>
      </Card>

      <div className="lg:col-span-2 space-y-3">
        {trip.notes.length === 0 ? (
          <Card className="p-12 text-center border-dashed">
            <NotebookPen className="h-10 w-10 mx-auto text-muted-foreground" />
            <h3 className="font-display font-semibold text-lg mt-3">No notes yet</h3>
            <p className="text-sm text-muted-foreground mt-1">Capture ideas, reminders, and journal entries.</p>
          </Card>
        ) : trip.notes.map((n) => (
          <Card key={n.id} className="p-5 border-border/60 shadow-soft group">
            <div className="flex justify-between items-start gap-3">
              <div>
                <h4 className="font-display font-semibold text-lg">{n.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{format(new Date(n.date), "EEEE, MMM d, yyyy")}</p>
              </div>
              <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100" onClick={() => removeNote(tripId, n.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            {n.body && <p className="mt-3 text-sm whitespace-pre-wrap text-foreground/90">{n.body}</p>}
          </Card>
        ))}
      </div>
    </div>
  );
}

/* -------------------- SETTINGS -------------------- */

function SettingsTab({ tripId }: { tripId: string }) {
  const trip = useStore((s) => s.trips.find((t) => t.id === tripId)!);
  const updateTrip = useStore((s) => s.updateTrip);
  const togglePublic = useStore((s) => s.togglePublic);

  return (
    <div className="space-y-6">
      <Card className="p-6 border-border/60 shadow-soft space-y-4">
        <h3 className="font-display font-semibold text-lg">Trip details</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={trip.name} onChange={(e) => updateTrip(tripId, { name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input value={trip.description} onChange={(e) => updateTrip(tripId, { description: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Start date</Label>
            <Input type="date" value={trip.startDate} onChange={(e) => updateTrip(tripId, { startDate: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>End date</Label>
            <Input type="date" value={trip.endDate} onChange={(e) => updateTrip(tripId, { endDate: e.target.value })} />
          </div>
        </div>
      </Card>

      <Card className="p-6 border-border/60 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-semibold text-lg">Public sharing</h3>
            <p className="text-sm text-muted-foreground">Anyone with the link can view a read-only version of this trip.</p>
            {trip.isPublic && (
              <Link to="/share/$tripId" params={{ tripId }} className="text-sm text-primary mt-2 inline-block hover:underline">
                Open public link →
              </Link>
            )}
          </div>
          <Switch checked={trip.isPublic} onCheckedChange={() => togglePublic(tripId)} />
        </div>
      </Card>
    </div>
  );
}
