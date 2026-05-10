import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Compass, Moon, Sun, LogOut, Plus } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/trips", label: "My Trips" },
  { to: "/explore", label: "Explore" },
];

export function Navbar() {
  const user = useStore((s) => s.user);
  const theme = useStore((s) => s.theme);
  const toggleTheme = useStore((s) => s.toggleTheme);
  const logout = useStore((s) => s.logout);
  const path = useRouterState({ select: (r) => r.location.pathname });
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full glass-strong border-b border-border/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="grid h-9 w-9 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
            <Compass className="h-5 w-5" />
          </span>
          <span className="hidden sm:inline">RoamVerse</span>
        </Link>

        {user && (
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => {
              const active = path === l.to || path.startsWith(l.to + "/");
              return (
                <Link key={l.to} to={l.to}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}>
                  {l.label}
                </Link>
              );
            })}
          </nav>
        )}

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {user ? (
            <>
              <Button onClick={() => navigate({ to: "/trips/new" })} className="hidden sm:inline-flex gap-1">
                <Plus className="h-4 w-4" /> New Trip
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-full focus:outline-none focus:ring-2 ring-ring">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="gradient-primary text-primary-foreground font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground font-normal">{user.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate({ to: "/profile" })}>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate({ to: "/dashboard" })}>Dashboard</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { logout(); navigate({ to: "/" }); }}>
                    <LogOut className="h-4 w-4 mr-2" /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-2">Sign in</Link>
              <Button onClick={() => navigate({ to: "/signup" })} className="gradient-primary text-primary-foreground border-0 shadow-soft">
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
