import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useStore, totalBudget } from "@/lib/store";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TripCard } from "@/components/TripCard";
import { popularDestinations } from "@/lib/sample-data";
import { Plane, Wallet, MapPin, ListChecks, Plus, ArrowRight } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — RoamVerse" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const user = useStore((s) => s.user);
  const trips = useStore((s) => s.trips);
  const hydrated = useStore((s) => s.hydrated);
  const navigate = useNavigate();

  useEffect(() => {
    if (hydrated && !user) navigate({ to: "/login" });
  }, [hydrated, user, navigate]);

  if (!user) return null;

  const now = Date.now();
  const upcoming = trips.filter((t) => new Date(t.startDate).getTime() > now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  const recent = trips.filter((t) => new Date(t.endDate).getTime() < now).slice(0, 3);

  const totalSpend = trips.reduce((acc, t) => acc + totalBudget(t.budget), 0);
  const cityCount = trips.reduce((a, t) => a + t.cities.length, 0);

  const spendByCategory = trips.reduce(
    (acc, t) => {
      acc.transport += t.budget.transport;
      acc.hotel += t.budget.hotel;
      acc.activities += t.budget.activities;
      acc.meals += t.budget.meals;
      acc.other += t.budget.other;
      return acc;
    },
    { transport: 0, hotel: 0, activities: 0, meals: 0, other: 0 }
  );

  const pieData = [
    { name: "Transport", value: spendByCategory.transport, color: "var(--chart-1)" },
    { name: "Hotel", value: spendByCategory.hotel, color: "var(--chart-2)" },
    { name: "Activities", value: spendByCategory.activities, color: "var(--chart-3)" },
    { name: "Meals", value: spendByCategory.meals, color: "var(--chart-4)" },
    { name: "Other", value: spendByCategory.other, color: "var(--chart-5)" },
  ].filter((d) => d.value > 0);

  const tripsBar = trips.slice(0, 6).map((t) => ({
    name: t.name.length > 12 ? t.name.slice(0, 12) + "…" : t.name,
    budget: totalBudget(t.budget),
  }));

  const stats = [
    { label: "Upcoming trips", value: upcoming.length, icon: Plane, color: "from-primary to-ocean" },
    { label: "Cities planned", value: cityCount, icon: MapPin, color: "from-coral to-amber-500" },
    { label: "Total budget", value: `₹${totalSpend.toLocaleString("en-IN")}`, icon: Wallet, color: "from-emerald-500 to-teal-500" },
    { label: "Saved trips", value: trips.length, icon: ListChecks, color: "from-violet-500 to-fuchsia-500" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 space-y-10">
      {/* HEADER */}
      <section className="relative overflow-hidden rounded-3xl gradient-hero p-8 sm:p-10 text-white shadow-glow">
        <div className="absolute -top-10 -right-10 h-60 w-60 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-coral/40 blur-3xl" />
        <div className="relative flex flex-wrap gap-6 items-center justify-between">
          <div>
            <p className="text-white/80 text-sm">Welcome back,</p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mt-1">{user.name} 👋</h1>
            <p className="mt-2 text-white/90 max-w-md">
              {upcoming[0]
                ? `Your next adventure is ${upcoming[0].name}.`
                : "Ready to plan your next adventure?"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate({ to: "/trips/new" })} className="bg-white text-primary hover:bg-white/90 h-11 px-5">
              <Plus className="h-4 w-4 mr-1" /> New Trip
            </Button>
            <Button onClick={() => navigate({ to: "/explore" })} variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 h-11">
              Explore
            </Button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5 border-border/60 shadow-soft hover:shadow-card transition-shadow">
            <div className={`inline-grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-soft`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div className="mt-4 text-2xl font-display font-bold">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </Card>
        ))}
      </section>

      {/* CHARTS */}
      <section className="grid gap-5 lg:grid-cols-2">
        <Card className="p-6 border-border/60 shadow-soft">
          <h3 className="font-display font-semibold text-lg">Spending by category</h3>
          <p className="text-sm text-muted-foreground mb-4">Across all your trips</p>
          {pieData.length ? (
            <div className="h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
                    {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: any) => `₹${Number(v).toLocaleString("en-IN")}`} contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : <EmptyChart />}
          <div className="flex flex-wrap gap-3 mt-4">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <span className="h-3 w-3 rounded-sm" style={{ background: d.color }} />
                {d.name}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-border/60 shadow-soft">
          <h3 className="font-display font-semibold text-lg">Budget per trip</h3>
          <p className="text-sm text-muted-foreground mb-4">Total estimated cost</p>
          {tripsBar.length ? (
            <div className="h-64">
              <ResponsiveContainer>
                <BarChart data={tripsBar}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip formatter={(v: any) => `₹${Number(v).toLocaleString("en-IN")}`} contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
                  <Bar dataKey="budget" fill="var(--primary)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : <EmptyChart />}
        </Card>
      </section>

      {/* UPCOMING TRIPS */}
      <section>
        <div className="flex items-end justify-between mb-5">
          <h2 className="font-display text-2xl font-bold">Upcoming trips</h2>
          <Link to="/trips" className="text-sm font-medium text-primary inline-flex items-center gap-1">
            All trips <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {upcoming.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.slice(0, 3).map((t) => <TripCard key={t.id} trip={t} />)}
          </div>
        ) : (
          <Card className="p-12 text-center border-dashed border-border/60">
            <p className="text-muted-foreground mb-4">No upcoming trips yet.</p>
            <Button onClick={() => navigate({ to: "/trips/new" })} className="gradient-primary text-primary-foreground border-0">
              <Plus className="h-4 w-4 mr-1" /> Plan a trip
            </Button>
          </Card>
        )}
      </section>

      {/* POPULAR */}
      <section>
        <div className="flex items-end justify-between mb-5">
          <h2 className="font-display text-2xl font-bold">Popular destinations</h2>
          <Link to="/explore" className="text-sm font-medium text-primary inline-flex items-center gap-1">
            Explore all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popularDestinations.slice(0, 4).map((d) => (
            <div key={d.name} className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-card transition-shadow">
              <img src={d.image} alt={d.name} loading="lazy" className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <h3 className="font-display font-bold">{d.name}</h3>
                <p className="text-xs opacity-90">{d.country}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RECENT */}
      {recent.length > 0 && (
        <section>
          <h2 className="font-display text-2xl font-bold mb-5">Recent trips</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((t) => <TripCard key={t.id} trip={t} />)}
          </div>
        </section>
      )}
    </div>
  );
}

function EmptyChart() {
  return <div className="h-64 grid place-items-center text-sm text-muted-foreground">No data yet</div>;
}
