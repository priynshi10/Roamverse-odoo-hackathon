import { Link } from "@tanstack/react-router";
import { Compass, Mail, Globe, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="grid h-8 w-8 place-items-center rounded-lg gradient-primary text-primary-foreground">
              <Compass className="h-4 w-4" />
            </span>
            Traveloop
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Personalized travel planning made beautifully easy.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
            <li><Link to="/trips" className="hover:text-foreground">My Trips</Link></li>
            <li><Link to="/explore" className="hover:text-foreground">Explore</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>About</li><li>Careers</li><li>Press</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Connect</h4>
          <div className="flex gap-3 text-muted-foreground">
            <Mail className="h-5 w-5 hover:text-foreground" />
            <Globe className="h-5 w-5 hover:text-foreground" />
            <Heart className="h-5 w-5 hover:text-foreground" />
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Traveloop. Built for the Odoo Hackathon.
      </div>
    </footer>
  );
}
