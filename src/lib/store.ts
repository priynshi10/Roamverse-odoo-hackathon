import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Trip, User, Activity, City, PackingItem, Note } from "./types";
import { sampleTrips } from "./sample-data";

const uid = () => Math.random().toString(36).slice(2, 10);

interface State {
  user: User | null;
  trips: Trip[];
  theme: "light" | "dark";
  hydrated: boolean;
  setHydrated: () => void;
  toggleTheme: () => void;

  signup: (name: string, email: string, password: string) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;

  createTrip: (data: Omit<Trip, "id" | "cities" | "packing" | "notes" | "budget" | "createdAt" | "isPublic"> & Partial<Trip>) => string;
  updateTrip: (id: string, patch: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  duplicateTrip: (id: string) => string | undefined;
  togglePublic: (id: string) => void;

  addCity: (tripId: string, city: Omit<City, "id" | "days">) => void;
  removeCity: (tripId: string, cityId: string) => void;
  reorderCities: (tripId: string, ids: string[]) => void;

  addActivity: (tripId: string, cityId: string, date: string, activity: Omit<Activity, "id">) => void;
  removeActivity: (tripId: string, cityId: string, dayId: string, activityId: string) => void;

  addPacking: (tripId: string, item: Omit<PackingItem, "id" | "packed">) => void;
  togglePacking: (tripId: string, id: string) => void;
  removePacking: (tripId: string, id: string) => void;

  addNote: (tripId: string, note: Omit<Note, "id">) => void;
  removeNote: (tripId: string, id: string) => void;

  setBudget: (tripId: string, budget: Trip["budget"]) => void;
}

const ensureDays = (city: City): City => {
  if (city.days?.length) return city;
  const out: City["days"] = [];
  const start = new Date(city.startDate);
  const end = new Date(city.endDate);
  const cursor = new Date(start);
  while (cursor <= end) {
    out.push({ id: uid(), date: cursor.toISOString().slice(0, 10), activities: [] });
    cursor.setDate(cursor.getDate() + 1);
  }
  return { ...city, days: out };
};

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      user: null,
      trips: sampleTrips,
      theme: "light",
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),

      toggleTheme: () => {
        const next = get().theme === "light" ? "dark" : "light";
        set({ theme: next });
        if (typeof document !== "undefined") {
          document.documentElement.classList.toggle("dark", next === "dark");
        }
      },

      signup: (name, email) => {
        set({ user: { id: uid(), name, email, bio: "Travel enthusiast." } });
      },
      login: (email) => {
        if (!email) return false;
        const name = email.split("@")[0];
        set({ user: { id: uid(), name: name.charAt(0).toUpperCase() + name.slice(1), email, bio: "Travel enthusiast." } });
        return true;
      },
      logout: () => set({ user: null }),
      updateUser: (patch) => set((s) => ({ user: s.user ? { ...s.user, ...patch } : s.user })),

      createTrip: (data) => {
        const id = uid();
        const trip: Trip = {
          id,
          name: data.name,
          description: data.description ?? "",
          startDate: data.startDate,
          endDate: data.endDate,
          cover: data.cover ?? "",
          isPublic: false,
          cities: [],
          packing: [],
          notes: [],
          budget: { transport: 0, hotel: 0, activities: 0, meals: 0, other: 0 },
          createdAt: new Date().toISOString(),
        };
        set((s) => ({ trips: [trip, ...s.trips] }));
        return id;
      },
      updateTrip: (id, patch) =>
        set((s) => ({ trips: s.trips.map((t) => (t.id === id ? { ...t, ...patch } : t)) })),
      deleteTrip: (id) => set((s) => ({ trips: s.trips.filter((t) => t.id !== id) })),
      duplicateTrip: (id) => {
        const t = get().trips.find((x) => x.id === id);
        if (!t) return;
        const newId = uid();
        set((s) => ({ trips: [{ ...t, id: newId, name: t.name + " (copy)", isPublic: false }, ...s.trips] }));
        return newId;
      },
      togglePublic: (id) =>
        set((s) => ({ trips: s.trips.map((t) => (t.id === id ? { ...t, isPublic: !t.isPublic } : t)) })),

      addCity: (tripId, city) =>
        set((s) => ({
          trips: s.trips.map((t) =>
            t.id === tripId ? { ...t, cities: [...t.cities, ensureDays({ ...city, id: uid(), days: [] })] } : t
          ),
        })),
      removeCity: (tripId, cityId) =>
        set((s) => ({
          trips: s.trips.map((t) =>
            t.id === tripId ? { ...t, cities: t.cities.filter((c) => c.id !== cityId) } : t
          ),
        })),
      reorderCities: (tripId, ids) =>
        set((s) => ({
          trips: s.trips.map((t) => {
            if (t.id !== tripId) return t;
            const map = new Map(t.cities.map((c) => [c.id, c]));
            return { ...t, cities: ids.map((id) => map.get(id)!).filter(Boolean) };
          }),
        })),

      addActivity: (tripId, cityId, date, activity) =>
        set((s) => ({
          trips: s.trips.map((t) => {
            if (t.id !== tripId) return t;
            return {
              ...t,
              cities: t.cities.map((c) => {
                if (c.id !== cityId) return c;
                let day = c.days.find((d) => d.date === date);
                let days = c.days;
                if (!day) {
                  day = { id: uid(), date, activities: [] };
                  days = [...c.days, day].sort((a, b) => a.date.localeCompare(b.date));
                }
                return {
                  ...c,
                  days: days.map((d) =>
                    d.date === date ? { ...d, activities: [...d.activities, { ...activity, id: uid() }] } : d
                  ),
                };
              }),
            };
          }),
        })),
      removeActivity: (tripId, cityId, dayId, activityId) =>
        set((s) => ({
          trips: s.trips.map((t) =>
            t.id !== tripId ? t : {
              ...t,
              cities: t.cities.map((c) =>
                c.id !== cityId ? c : {
                  ...c,
                  days: c.days.map((d) =>
                    d.id !== dayId ? d : { ...d, activities: d.activities.filter((a) => a.id !== activityId) }
                  ),
                }
              ),
            }
          ),
        })),

      addPacking: (tripId, item) =>
        set((s) => ({
          trips: s.trips.map((t) =>
            t.id === tripId ? { ...t, packing: [...t.packing, { ...item, id: uid(), packed: false }] } : t
          ),
        })),
      togglePacking: (tripId, id) =>
        set((s) => ({
          trips: s.trips.map((t) =>
            t.id === tripId
              ? { ...t, packing: t.packing.map((p) => (p.id === id ? { ...p, packed: !p.packed } : p)) }
              : t
          ),
        })),
      removePacking: (tripId, id) =>
        set((s) => ({
          trips: s.trips.map((t) =>
            t.id === tripId ? { ...t, packing: t.packing.filter((p) => p.id !== id) } : t
          ),
        })),

      addNote: (tripId, note) =>
        set((s) => ({
          trips: s.trips.map((t) =>
            t.id === tripId ? { ...t, notes: [{ ...note, id: uid() }, ...t.notes] } : t
          ),
        })),
      removeNote: (tripId, id) =>
        set((s) => ({
          trips: s.trips.map((t) =>
            t.id === tripId ? { ...t, notes: t.notes.filter((n) => n.id !== id) } : t
          ),
        })),

      setBudget: (tripId, budget) =>
        set((s) => ({ trips: s.trips.map((t) => (t.id === tripId ? { ...t, budget } : t)) })),
    }),
    {
      name: "traveloop-store",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
        if (typeof document !== "undefined" && state?.theme === "dark") {
          document.documentElement.classList.add("dark");
        }
      },
    }
  )
);

export const totalBudget = (b: Trip["budget"]) =>
  b.transport + b.hotel + b.activities + b.meals + b.other;

export const tripDuration = (t: Trip) => {
  const ms = new Date(t.endDate).getTime() - new Date(t.startDate).getTime();
  return Math.max(1, Math.round(ms / 86400000) + 1);
};
