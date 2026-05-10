export type ActivityCategory =
  | "adventure" | "food" | "culture" | "nature" | "shopping" | "nightlife" | "sightseeing" | "transport" | "stay";

export interface Activity {
  id: string;
  title: string;
  category: ActivityCategory;
  cost: number; // in INR
  time?: string; // HH:mm
  notes?: string;
}

export interface ItineraryDay {
  id: string;
  date: string; // ISO yyyy-mm-dd
  activities: Activity[];
}

export interface City {
  id: string;
  name: string;
  country: string;
  startDate: string;
  endDate: string;
  days: ItineraryDay[];
  coverEmoji?: string;
}

export interface PackingItem {
  id: string;
  text: string;
  category: "clothing" | "electronics" | "essentials" | "documents";
  packed: boolean;
}

export interface Note {
  id: string;
  date: string;
  title: string;
  body: string;
}

export interface Trip {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  cover: string; // image URL or asset name
  isPublic: boolean;
  cities: City[];
  packing: PackingItem[];
  notes: Note[];
  budget: { transport: number; hotel: number; activities: number; meals: number; other: number };
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}
