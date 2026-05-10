import type { Trip } from "./types";
import santorini from "@/assets/dest-santorini.jpg";
import kyoto from "@/assets/dest-kyoto.jpg";
import bali from "@/assets/dest-bali.jpg";
import paris from "@/assets/dest-paris.jpg";
import iceland from "@/assets/dest-iceland.jpg";
import newyork from "@/assets/dest-newyork.jpg";

export const destinationImages = { santorini, kyoto, bali, paris, iceland, newyork };

export const popularDestinations = [
  { name: "Santorini", country: "Greece", image: santorini, costIndex: "₹₹₹", tag: "Romantic" },
  { name: "Kyoto", country: "Japan", image: kyoto, costIndex: "₹₹", tag: "Cultural" },
  { name: "Bali", country: "Indonesia", image: bali, costIndex: "₹", tag: "Tropical" },
  { name: "Paris", country: "France", image: paris, costIndex: "₹₹₹", tag: "Iconic" },
  { name: "Reykjavík", country: "Iceland", image: iceland, costIndex: "₹₹₹", tag: "Adventure" },
  { name: "New York", country: "USA", image: newyork, costIndex: "₹₹₹", tag: "Urban" },
];

export const cityCatalog = [
  { name: "Santorini", country: "Greece", region: "Europe", cost: "₹₹₹" },
  { name: "Kyoto", country: "Japan", region: "Asia", cost: "₹₹" },
  { name: "Bali", country: "Indonesia", region: "Asia", cost: "₹" },
  { name: "Paris", country: "France", region: "Europe", cost: "₹₹₹" },
  { name: "Tokyo", country: "Japan", region: "Asia", cost: "₹₹₹" },
  { name: "Reykjavík", country: "Iceland", region: "Europe", cost: "₹₹₹" },
  { name: "New York", country: "USA", region: "Americas", cost: "₹₹₹" },
  { name: "Lisbon", country: "Portugal", region: "Europe", cost: "₹₹" },
  { name: "Marrakech", country: "Morocco", region: "Africa", cost: "₹" },
  { name: "Cape Town", country: "South Africa", region: "Africa", cost: "₹₹" },
  { name: "Buenos Aires", country: "Argentina", region: "Americas", cost: "₹₹" },
  { name: "Sydney", country: "Australia", region: "Oceania", cost: "₹₹₹" },
  { name: "Barcelona", country: "Spain", region: "Europe", cost: "₹₹" },
  { name: "Istanbul", country: "Turkey", region: "Europe", cost: "₹" },
  { name: "Bangkok", country: "Thailand", region: "Asia", cost: "₹" },
  { name: "Rio de Janeiro", country: "Brazil", region: "Americas", cost: "₹₹" },
];

export const activityCatalog = [
  { title: "Hot air balloon ride", category: "adventure" as const, cost: 8500 },
  { title: "Street food tour", category: "food" as const, cost: 1200 },
  { title: "Museum entry", category: "culture" as const, cost: 800 },
  { title: "National park hike", category: "nature" as const, cost: 500 },
  { title: "Local market shopping", category: "shopping" as const, cost: 2000 },
  { title: "Rooftop bar evening", category: "nightlife" as const, cost: 1500 },
  { title: "City walking tour", category: "sightseeing" as const, cost: 900 },
  { title: "Sunset boat cruise", category: "adventure" as const, cost: 3500 },
  { title: "Cooking class", category: "food" as const, cost: 2500 },
  { title: "Temple visit", category: "culture" as const, cost: 300 },
  { title: "Snorkeling trip", category: "nature" as const, cost: 2000 },
  { title: "Live music venue", category: "nightlife" as const, cost: 1200 },
];

export const sampleTrips: Trip[] = [
  {
    id: "trip-sample-1",
    name: "Greek Islands Escape",
    description: "Sun-soaked island hopping through the Cyclades.",
    startDate: "2026-06-12",
    endDate: "2026-06-22",
    cover: santorini,
    isPublic: true,
    cities: [
      {
        id: "c1", name: "Santorini", country: "Greece",
        startDate: "2026-06-12", endDate: "2026-06-17", coverEmoji: "🏛️",
        days: [
          { id: "d1", date: "2026-06-12", activities: [
            { id: "a1", title: "Arrive & check in to Oia villa", category: "stay", cost: 0, time: "14:00" },
            { id: "a2", title: "Sunset at Oia", category: "sightseeing", cost: 0, time: "20:00" },
          ]},
          { id: "d2", date: "2026-06-13", activities: [
            { id: "a3", title: "Caldera boat cruise", category: "adventure", cost: 3500, time: "10:00" },
            { id: "a4", title: "Greek dinner in Fira", category: "food", cost: 2200, time: "20:00" },
          ]},
        ],
      },
    ],
    packing: [
      { id: "p1", text: "Passport", category: "documents", packed: true },
      { id: "p2", text: "Sunscreen", category: "essentials", packed: false },
      { id: "p3", text: "Swimsuit", category: "clothing", packed: false },
      { id: "p4", text: "Camera", category: "electronics", packed: false },
    ],
    notes: [
      { id: "n1", date: "2026-06-12", title: "Reservation tips", body: "Book Oia sunset spot 1h early." },
    ],
    budget: { transport: 45000, hotel: 65000, activities: 22000, meals: 25000, other: 8000 },
    createdAt: new Date().toISOString(),
  },
  {
    id: "trip-sample-2",
    name: "Japan in Spring",
    description: "Cherry blossoms, ancient temples and bullet trains.",
    startDate: "2026-04-02",
    endDate: "2026-04-14",
    cover: kyoto,
    isPublic: false,
    cities: [
      { id: "c2", name: "Kyoto", country: "Japan", startDate: "2026-04-02", endDate: "2026-04-08", coverEmoji: "⛩️", days: [] },
      { id: "c3", name: "Tokyo", country: "Japan", startDate: "2026-04-08", endDate: "2026-04-14", coverEmoji: "🗼", days: [] },
    ],
    packing: [],
    notes: [],
    budget: { transport: 85000, hotel: 78000, activities: 32000, meals: 38000, other: 12000 },
    createdAt: new Date().toISOString(),
  },
];
