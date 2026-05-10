import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { popularDestinations } from "@/lib/sample-data";
import hero from "@/assets/hero-travel.jpg";
import { MapPin, Sparkles, Wallet, ListChecks, Share2, Compass, Star, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RoamVerse — Personalized Travel Planning Made Easy" },
      { name: "description", content: "Build beautiful multi-city itineraries, track your travel budget, organize packing and share trips — all in one place." },
    ],
  }),
  component: LandingPage,
});

const features = [
  { icon: Sparkles, title: "Smart itineraries", desc: "Day-by-day plans that adapt to your pace, with reorderable cities and activities." },
  { icon: Wallet, title: "Live budget tracking", desc: "Estimate transport, hotels, food and experiences with elegant breakdowns." },
  { icon: ListChecks, title: "Packing checklists", desc: "Templated by trip type so you never forget the essentials." },
  { icon: Share2, title: "Share publicly", desc: "Generate shareable read-only links so friends can follow your journey." },
  { icon: MapPin, title: "Multi-city planning", desc: "Hop between destinations with timeline, list and calendar views." },
  { icon: Compass, title: "Discover places", desc: "Browse curated destinations and activities with cost indicators." },
];

const testimonials = [
  { name: "Maya R.", role: "Solo traveler", quote: "RoamVerse replaced 4 spreadsheets and 2 apps. My Japan trip felt effortless.", rating: 5 },
  { name: "Liam P.", role: "Backpacker", quote: "The budget breakdown literally saved me $400 on my Europe leg.", rating: 5 },
  { name: "Aanya S.", role: "Honeymoon planner", quote: "Sharing the itinerary with our family was magical. So polished.", rating: 5 },
];

function LandingPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={hero} alt="" className="h-full w-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        </div>
        <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-coral/30 blur-3xl animate-blob -z-10" />
        <div className="absolute top-40 right-0 h-96 w-96 rounded-full bg-primary/30 blur-3xl animate-blob -z-10" style={{ animationDelay: "4s" }} />

        <div className="mx-auto max-w-7xl px-6 pt-20 pb-32 sm:pt-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-foreground/80 mb-6">
              <Sparkles className="h-3.5 w-3.5 text-coral" />
              Built for the Odoo Hackathon
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
              Personalized travel planning,{" "}
              <span className="text-gradient">made beautifully easy.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Build multi-city itineraries, track budgets, manage packing and share your trips —
              all in one stunning workspace designed for modern travelers.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/signup">
                <Button size="lg" className="gradient-primary text-primary-foreground border-0 shadow-glow text-base h-12 px-7">
                  Start planning free <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline" className="glass border-border/60 text-base h-12 px-7">
                  Explore destinations
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-coral text-coral" />)}
                <span className="ml-1 font-medium text-foreground">4.9</span>
              </div>
              <span>Loved by 10,000+ travelers worldwide</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">Everything for the perfect trip</h2>
          <p className="mt-4 text-muted-foreground text-lg">Powerful planning tools wrapped in a delightful interface.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Card key={f.title} className="p-6 border-border/60 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="grid h-11 w-11 place-items-center rounded-xl gradient-primary text-primary-foreground mb-4 shadow-glow">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display font-semibold text-lg">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">Trending destinations</h2>
            <p className="mt-3 text-muted-foreground">Get inspired by the world's most loved places.</p>
          </div>
          <Link to="/explore" className="text-sm font-medium text-primary inline-flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popularDestinations.map((d) => (
            <div key={d.name} className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-glow transition-shadow">
              <img src={d.image} alt={d.name} loading="lazy" className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold">{d.name}</h3>
                    <p className="text-sm opacity-90">{d.country}</p>
                  </div>
                  <span className="text-sm font-semibold rounded-full glass px-3 py-1 text-white">{d.costIndex}</span>
                </div>
              </div>
              <span className="absolute top-3 left-3 text-xs font-medium rounded-full bg-coral/90 text-coral-foreground px-2.5 py-1">{d.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">Loved by travelers</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="p-6 border-border/60 shadow-soft">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-coral text-coral" />)}
              </div>
              <p className="text-foreground/90 leading-relaxed">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full gradient-primary grid place-items-center text-primary-foreground font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl gradient-hero p-10 sm:p-16 text-center text-white shadow-glow">
          <div className="absolute -top-10 -right-10 h-60 w-60 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-coral/40 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">Your next adventure starts here</h2>
            <p className="mt-4 text-white/90 max-w-xl mx-auto">Sign up free and build your first itinerary in minutes.</p>
            <div className="mt-8 flex justify-center gap-3">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-12 px-7 text-base">
                  Create your account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
