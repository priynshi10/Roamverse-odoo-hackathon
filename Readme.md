<div align="center">

<img src="https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge" alt="Version"/>
<img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="License"/>
<img src="https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge" alt="Build"/>
<img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react" alt="React"/>
<img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript"/>
<img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite" alt="Vite"/>

<br/><br/>

```
██████╗  ██████╗  █████╗  ███╗   ███╗██╗   ██╗███████╗██████╗ ███████╗███████╗
██╔══██╗██╔═══██╗██╔══██╗████╗ ████║██║   ██║██╔════╝██╔══██╗██╔════╝██╔════╝
██████╔╝██║   ██║███████║██╔████╔██║██║   ██║█████╗  ██████╔╝███████╗█████╗  
██╔══██╗██║   ██║██╔══██║██║╚██╔╝██║╚██╗ ██╔╝██╔══╝  ██╔══██╗╚════██║██╔══╝  
██║  ██║╚██████╔╝██║  ██║██║ ╚═╝ ██║ ╚████╔╝ ███████╗██║  ██║███████║███████╗
╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝

    Discover • Explore • Roam
```

### **Plan smarter. Travel better. Share unforgettable journeys.**

*A full-featured AI-inspired travel planning platform built for the **Odoo Hackathon***

<br/>

🚀 Video Link (https://drive.google.com/file/d/1-jw0xyJwrEQP-DSrhCu1-gO5J9OAu55r/view?usp=sharing)  

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Feature Showcase](#-feature-showcase)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Data Model](#-data-model)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Configuration](#-environment-configuration)
- [Core Modules Deep Dive](#-core-modules-deep-dive)
- [State Management](#-state-management)
- [Routing Strategy](#-routing-strategy)
- [Component Design System](#-component-design-system)
- [Performance Optimizations](#-performance-optimizations)
- [Accessibility](#-accessibility)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌍 Overview

**Roamverse** is a modern, full-featured travel itinerary management platform that eliminates the complexity of planning multi-city trips. Built with a React + TypeScript frontend, it delivers a seamless, responsive, and visually elegant experience across all devices.

At its core, Roamverse is a **client-side SPA** with persistent local storage, dynamic routing, and a modular component architecture — designed to be extensible, scalable, and ready for a backend integration layer.

```
                        ┌───────────────────────────────────────┐
                        │            Roamverse PLATFORM         │
                        │                                       │
   ┌──────────┐         │  ┌──────────┐      ┌──────────────┐   │
   │  Browser │ ──────► │  │   Vite   │ ───► │  React + TS  │   │
   └──────────┘         │  │  Server  │      │     SPA      │   │
                        │  └──────────┘      └──────┬───────┘   │
                        │                           │           │
                        │              ┌────────────▼─────────┐ │
                        │              │     Zustand Store    │ │
                        │              │  (Persistent State)  │ │
                        │              └────────────┬─────────┘ │
                        │                           │           │
                        │         ┌─────────────────▼────────┐  │
                        │         │      localStorage API    │  │
                        │         └──────────────────────────┘  │
                        └───────────────────────────────────────┘
```

### Why Roamverse?

| Problem | Roamverse Solution |
|---|---|
| Trip planning is scattered across apps | Unified itinerary + budget + packing in one place |
| No context-aware activity suggestions | Destination-based activity discovery with category filters |
| Sharing itineraries is painful | One-click public sharing with read-only URLs |
| Budget tracking is manual | Real-time expense breakdown with visual analytics |
| Packing is always forgotten | Smart categorized checklists with progress tracking |

---

## ✨ Feature Showcase

### 🔐 Authentication System

Secure, session-aware authentication with multiple entry paths.

```
┌─────────────────────────────────────────────────┐
│                AUTH FLOW                        │
│                                                 │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐   │
│  │  Login   │    │  Signup  │    │  Guest   │   │
│  │ /login   │    │ /signup  │    │  Mode    │   │
│  └────┬─────┘    └────┬─────┘    └────┬─────┘   │
│       │               │               │         │
│       └───────────────┴───────────────┘         │
│                       │                         │
│              ┌────────▼────────┐                │
│              │   Dashboard     │                │
│              │   /dashboard    │                │
│              └─────────────────┘                │
└─────────────────────────────────────────────────┘
```

**Capabilities:**
- User registration with form validation
- Secure login with session persistence
- Forgot password recovery flow
- Guest mode for exploring without signup
- Route-level auth guards

---

### 🏠 Smart Dashboard

A personalized command center for all travel activity.

**Dashboard Widgets:**
- **Welcome Panel** — Personalized greeting with travel statistics
- **Upcoming Trips** — Card-based preview of next journeys
- **Budget Highlights** — Spending overview with visual indicators
- **Recommended Destinations** — Curated picks based on profile
- **Recent Activity Feed** — Timeline of latest trip updates
- **Analytics Charts** — Pie + bar charts for spending insights

---

### 🧳 Multi-City Trip Planner

The heart of Roamverse — create, organize, and visualize complex multi-stop journeys.

```
Trip: Europe Summer 2025
│
├── 📍 Paris, France          [Jun 10–14]
│   ├── Day 1: Eiffel Tower, Louvre
│   ├── Day 2: Versailles Day Trip
│   └── Day 3: Montmartre, Seine Cruise
│
├── 📍 Amsterdam, Netherlands [Jun 14–17]
│   ├── Day 1: Rijksmuseum, Anne Frank House
│   └── Day 2: Keukenhof Gardens
│
└── 📍 Berlin, Germany        [Jun 17–20]
    ├── Day 1: Brandenburg Gate, Holocaust Memorial
    └── Day 2: East Side Gallery, Checkpoint Charlie
```

**Features:**
- Unlimited cities per trip
- Drag-and-drop city reordering
- Per-city date range assignment
- Day-by-day activity scheduling
- Trip duplication for templates
- Public/private visibility toggle

---

### 💰 Budget & Expense Tracking

Real-time financial management built into every trip.

```
Trip Budget Overview
┌────────────────────────────────────────────┐
│  Total Budget: $3,500                      │
│  Spent: $2,240          Remaining: $1,260  │
│                                            │
│  By Category:                              │
│  ████████████░░░░  Transport    $680 / 34% │
│  ██████████░░░░░░  Hotel        $890 / 45% │
│  █████░░░░░░░░░░░  Activities   $320 / 16% │
│  ████░░░░░░░░░░░░  Meals        $280 / 14% │
│  ██░░░░░░░░░░░░░░  Misc         $70  / 3%  │
└────────────────────────────────────────────┘
```

**Budget Categories:** Transport · Hotel · Activities · Meals · Miscellaneous

**Analytics Provided:**
- Per-category breakdown with pie charts
- Daily average spend calculator
- Trip total estimation
- Over/under budget indicators

---

### 🎒 Packing Checklist System

Smart, reusable packing management with category-based organization.

| Category | Example Items | Progress |
|---|---|---|
| 👔 Clothing | Shirts, Pants, Jacket | `████░ 80%` |
| 💻 Electronics | Charger, Adapter, Camera | `███░░ 60%` |
| 📄 Documents | Passport, Visa, Insurance | `█████ 100%` |
| 🧴 Essentials | Toiletries, Meds, Sunscreen | `██░░░ 40%` |

---

### 🌐 Public Trip Sharing

Share itineraries with a single shareable link — no account needed to view.

```
https://traveloop.app/share/trip/xt8k2p9q

✓ Read-only public view
✓ Full itinerary visibility
✓ One-click trip duplication for viewers
✓ Social sharing support (Twitter, WhatsApp, copy link)
```

---

## 🏗 Architecture

### System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     FRONTEND ARCHITECTURE                    │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐   │
│  │                   PRESENTATION LAYER                  │   │
│  │                                                       │   │
│  │  Pages/Routes          Shared Components              │   │
│  │  ┌──────────────┐     ┌────────────────────────────┐  │   │
│  │  │ /dashboard   │     │ Navbar, Sidebar, Cards     │  │   │
│  │  │ /trips       │     │ Charts, Forms, Modals      │  │   │
│  │  │ /trips/:id   │     │ Buttons, Badges, Toasts    │  │   │
│  │  │ /explore     │     └────────────────────────────┘  │   │
│  │  │ /profile     │                                     │   │
│  │  └──────────────┘                                     │   │
│  └──────────────────────────────────────────────────────-┘   │
│                              │                               │
│  ┌───────────────────────────▼──────────────────────────┐    │
│  │                     LOGIC LAYER                      │    │
│  │                                                      │    │
│  │  Custom Hooks              Utility Functions         │    │
│  │  ┌──────────────────┐     ┌────────────────────────┐ │    │
│  │  │ useTrip          │     │ formatCurrency         │ │    │
│  │  │ useBudget        │     │ calculateDuration      │ │    │
│  │  │ useAuth          │     │ generateShareId        │ │    │
│  │  │ usePacking       │     │ validateItinerary      │ │    │
│  │  └──────────────────┘     └────────────────────────┘ │    │
│  └───────────────────────────┬──────────────────────────┘    │
│                               │                              │
│  ┌────────────────────────────▼──────────────────────────┐   │
│  │                     STATE LAYER                       │   │
│  │                                                       │   │
│  │  Zustand Stores                                       │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────┐   │   │
│  │  │ tripStore│ │authStore │ │uiStore   │ │userStore│   │   │
│  │  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬────┘   │   │
│  │       └────────────┴────────────┴─────────────┘       │   │
│  │                           │                           │   │
│  │              ┌────────────▼──────────┐                │   │
│  │              │  localStorage Adapter │                │   │
│  │              └───────────────────────┘                │   │
│  └───────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
App
├── AuthProvider
│   └── RouterProvider (TanStack Router)
│       ├── Layout
│       │   ├── Navbar
│       │   ├── Sidebar
│       │   └── <Outlet />
│       │
│       ├── /login → LoginPage
│       ├── /signup → SignupPage
│       ├── /dashboard → DashboardPage
│       │   ├── WelcomeSection
│       │   ├── TripCarousel
│       │   ├── BudgetWidget
│       │   └── RecommendedDestinations
│       │
│       ├── /trips → MyTripsPage
│       │   └── TripCard[]
│       │
│       ├── /trips/new → CreateTripPage
│       │   ├── TripForm
│       │   └── CitySelector
│       │
│       ├── /trips/:id → TripDetailPage
│       │   ├── ItineraryBuilder
│       │   │   └── DayCard[]
│       │   │       └── ActivityItem[]
│       │   ├── BudgetPanel
│       │   ├── PackingChecklist
│       │   └── NotesPanel
│       │
│       ├── /explore → ExplorePage
│       │   ├── SearchBar
│       │   ├── RegionFilter
│       │   └── DestinationGrid
│       │
│       ├── /profile → ProfilePage
│       └── /share/:id → PublicTripView
```

---

## 🛠 Tech Stack

### Frontend Core

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 18.x | UI component library |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type-safe JavaScript superset |
| [Vite](https://vitejs.dev/) | 5.x | Build tool & dev server |
| [TanStack Router](https://tanstack.com/router) | Latest | Type-safe file-based routing |

### UI & Styling

| Technology | Purpose |
|---|---|
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [ShadCN UI](https://ui.shadcn.com/) | Accessible, composable component primitives |
| [Lucide React](https://lucide.dev/) | Icon library |
| [Sonner](https://sonner.emilkowal.ski/) | Toast notifications |

### State & Data

| Technology | Purpose |
|---|---|
| [Zustand](https://github.com/pmndrs/zustand) | Lightweight global state management |
| [Recharts](https://recharts.org/) | Data visualization (pie, bar, line charts) |
| `localStorage` | Client-side data persistence |

---

## 🗃 Data Model

### Entity Relationship Overview

```
┌───────────────┐         ┌───────────────────┐
│     User      │ 1 ──── n│       Trip        │
├───────────────┤         ├───────────────────┤
│ id            │         │ id                │
│ name          │         │ userId (FK)       │
│ email         │         │ title             │
│ bio           │         │ description       │
│ avatarUrl     │         │ coverImageUrl     │
│ createdAt     │         │ startDate         │
└───────────────┘         │ endDate           │
                          │ isPublic          │
                          │ shareId           │
                          │ createdAt         │
                          └────────┬──────────┘
                                   │
                 ┌─────────────────┼──────────────────┐
                 │                 │                  │
          1 ── n │          1 ── 1 │           1 ── n │
                 ▼                 ▼                  ▼
    ┌────────────────┐  ┌──────────────────┐  ┌─────────────┐
    │      City      │  │      Budget      │  │    Note     │
    ├────────────────┤  ├──────────────────┤  ├─────────────┤
    │ id             │  │ id               │  │ id          │
    │ tripId (FK)    │  │ tripId (FK)      │  │ tripId (FK) │
    │ name           │  │ totalBudget      │  │ content     │
    │ country        │  │ transport        │  │ createdAt   │
    │ arrivalDate    │  │ hotel            │  └─────────────┘
    │ departureDate  │  │ activities       │
    │ orderIndex     │  │ meals            │       1 ── n
    └───────┬────────┘  │ miscellaneous    │          │
            │           └──────────────────┘          ▼
     1 ── n │                                ┌──────────────────┐
            ▼                                │   PackingItem    │
    ┌──────────────────┐                     ├──────────────────┤
    │    Activity      │                     │ id               │
    ├──────────────────┤                     │ tripId (FK)      │
    │ id               │                     │ name             │
    │ cityId (FK)      │                     │ category         │
    │ name             │                     │ isPacked         │
    │ category         │                     └──────────────────┘
    │ date             │
    │ time             │
    │ cost             │
    │ notes            │
    └──────────────────┘
```

### TypeScript Interface Definitions

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
  createdAt: string;
}

interface Trip {
  id: string;
  userId: string;
  title: string;
  description?: string;
  coverImageUrl?: string;
  startDate: string;
  endDate: string;
  isPublic: boolean;
  shareId: string;
  cities: City[];
  budget: Budget;
  packingItems: PackingItem[];
  notes: Note[];
  createdAt: string;
  updatedAt: string;
}

interface City {
  id: string;
  tripId: string;
  name: string;
  country: string;
  arrivalDate: string;
  departureDate: string;
  orderIndex: number;
  activities: Activity[];
}

interface Activity {
  id: string;
  cityId: string;
  name: string;
  category: ActivityCategory;
  date: string;
  time?: string;
  cost?: number;
  notes?: string;
}

type ActivityCategory =
  | 'adventure'
  | 'food'
  | 'culture'
  | 'nature'
  | 'shopping'
  | 'nightlife'
  | 'sightseeing';

interface Budget {
  id: string;
  tripId: string;
  totalBudget: number;
  transport: number;
  hotel: number;
  activities: number;
  meals: number;
  miscellaneous: number;
}

interface PackingItem {
  id: string;
  tripId: string;
  name: string;
  category: PackingCategory;
  isPacked: boolean;
}

type PackingCategory = 'clothing' | 'electronics' | 'documents' | 'essentials';

interface Note {
  id: string;
  tripId: string;
  content: string;
  createdAt: string;
}
```

---

## 📂 Project Structure

```
Roamverse/
│
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── assets/
│       └── images/
│
├── src/
│   │
│   ├── components/                  # Reusable UI components
│   │   ├── ui/                      # ShadCN primitive overrides
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   │
│   │   ├── auth/                    # Auth-specific components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SignupForm.tsx
│   │   │   └── AuthGuard.tsx
│   │   │
│   │   ├── dashboard/               # Dashboard widgets
│   │   │   ├── WelcomeSection.tsx
│   │   │   ├── TripCarousel.tsx
│   │   │   ├── BudgetWidget.tsx
│   │   │   └── StatsCard.tsx
│   │   │
│   │   ├── trips/                   # Trip management components
│   │   │   ├── TripCard.tsx
│   │   │   ├── TripForm.tsx
│   │   │   ├── CityCard.tsx
│   │   │   └── ShareModal.tsx
│   │   │
│   │   ├── itinerary/               # Itinerary builder components
│   │   │   ├── ItineraryBuilder.tsx
│   │   │   ├── DayCard.tsx
│   │   │   ├── ActivityItem.tsx
│   │   │   └── ActivityForm.tsx
│   │   │
│   │   ├── budget/                  # Budget & expense components
│   │   │   ├── BudgetPanel.tsx
│   │   │   ├── ExpenseChart.tsx
│   │   │   └── CategoryBreakdown.tsx
│   │   │
│   │   ├── packing/                 # Packing checklist components
│   │   │   ├── PackingChecklist.tsx
│   │   │   ├── PackingItem.tsx
│   │   │   └── PackingProgress.tsx
│   │   │
│   │   ├── explore/                 # Destination discovery components
│   │   │   ├── DestinationGrid.tsx
│   │   │   ├── DestinationCard.tsx
│   │   │   └── RegionFilter.tsx
│   │   │
│   │   └── layout/                  # Layout shell components
│   │       ├── Navbar.tsx
│   │       ├── Sidebar.tsx
│   │       └── MobileNav.tsx
│   │
│   ├── routes/                      # TanStack Router route definitions
│   │   ├── __root.tsx
│   │   ├── index.tsx
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   ├── dashboard.tsx
│   │   ├── trips/
│   │   │   ├── index.tsx
│   │   │   ├── new.tsx
│   │   │   └── $tripId.tsx
│   │   ├── explore.tsx
│   │   ├── profile.tsx
│   │   └── share.$shareId.tsx
│   │
│   ├── store/                       # Zustand state stores
│   │   ├── authStore.ts
│   │   ├── tripStore.ts
│   │   ├── uiStore.ts
│   │   └── userStore.ts
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── useTrip.ts
│   │   ├── useBudget.ts
│   │   ├── useAuth.ts
│   │   ├── usePacking.ts
│   │   └── useDestinations.ts
│   │
│   ├── lib/                         # Utility functions & helpers
│   │   ├── utils.ts                 # General utilities (cn, etc.)
│   │   ├── formatters.ts            # Currency, date, duration formatters
│   │   ├── validators.ts            # Form & data validators
│   │   ├── shareUtils.ts            # Share ID generation
│   │   └── storage.ts               # localStorage adapter
│   │
│   ├── types/                       # TypeScript type definitions
│   │   ├── trip.ts
│   │   ├── user.ts
│   │   ├── budget.ts
│   │   └── index.ts
│   │
│   ├── data/                        # Static data & mock datasets
│   │   ├── destinations.ts
│   │   ├── activities.ts
│   │   └── regions.ts
│   │
│   ├── styles/
│   │   └── globals.css              # Global styles & Tailwind imports
│   │
│   ├── main.tsx                     # Application entry point
│   └── routeTree.gen.ts             # Auto-generated route tree
│
├── .env.example                     # Environment variable template
├── .gitignore
├── components.json                  # ShadCN configuration
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

```bash
node --version    # >= 18.0.0
npm --version     # >= 9.0.0
git --version     # any recent version
```

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/priynshi10/Roamverse-odoo-hackathon.git
cd roamverse
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

**4. Start the development server**
```bash
npm run dev
```

The app will be available at `http://localhost:`

### Available Scripts

```bash
npm run dev          # Start development server with HMR
npm run build        # Type-check + production build
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix
npm run type-check   # TypeScript type checking only
npm run format       # Format with Prettier
```

---

## ⚙️ Environment Configuration

```bash
# .env.example

# App
VITE_APP_NAME=Roamverse
VITE_APP_VERSION=1.0.0
VITE_APP_URL=http://localhost:5173

# Feature Flags
VITE_ENABLE_GUEST_MODE=true
VITE_ENABLE_PUBLIC_SHARING=true
VITE_ENABLE_ANALYTICS=false

# Storage
VITE_STORAGE_PREFIX=traveloop_

# Future: API Integration
# VITE_API_BASE_URL=https://api.roamverse.app
# VITE_GOOGLE_MAPS_API_KEY=your_key_here
# VITE_WEATHER_API_KEY=your_key_here
```

---

## 🔍 Core Modules Deep Dive

### Trip Store (Zustand)

```typescript
// store/tripStore.ts — conceptual interface

interface TripStore {
  trips: Trip[];
  activeTrip: Trip | null;

  // CRUD
  createTrip: (data: CreateTripInput) => Trip;
  updateTrip: (id: string, data: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  duplicateTrip: (id: string) => Trip;

  // City Management
  addCity: (tripId: string, city: CreateCityInput) => void;
  removeCity: (tripId: string, cityId: string) => void;
  reorderCities: (tripId: string, newOrder: string[]) => void;

  // Activity Management
  addActivity: (cityId: string, activity: CreateActivityInput) => void;
  removeActivity: (cityId: string, activityId: string) => void;

  // Budget
  updateBudget: (tripId: string, budget: Partial<Budget>) => void;

  // Packing
  addPackingItem: (tripId: string, item: CreatePackingItemInput) => void;
  togglePackingItem: (tripId: string, itemId: string) => void;
  removePackingItem: (tripId: string, itemId: string) => void;

  // Sharing
  setTripPublic: (tripId: string, isPublic: boolean) => void;
  getTripByShareId: (shareId: string) => Trip | undefined;
}
```

### localStorage Persistence Strategy

```typescript
// lib/storage.ts — persistence pattern

const STORAGE_KEYS = {
  TRIPS: 'traveloop_trips',
  USER: 'traveloop_user',
  AUTH: 'traveloop_auth',
} as const;

// Zustand middleware for automatic persistence
const persistMiddleware = (config) =>
  persist(config, {
    name: STORAGE_KEYS.TRIPS,
    partialize: (state) => ({ trips: state.trips }),
  });
```

---

## 🔄 State Management

Roamverse uses **Zustand** for global state with a slice-based pattern and localStorage middleware for persistence.

```
┌────────────────────────────────────────────────────┐
│                  ZUSTAND STORES                    │
│                                                    │
│  authStore          tripStore          uiStore     │
│  ─────────          ─────────          ───────     │
│  • user             • trips[]          • sidebar   │
│  • isAuthenticated  • activeTrip       • theme     │
│  • token            • loading          • modals    │
│  • login()          • createTrip()                 │
│  • logout()         • updateTrip()     userStore   │
│  • signup()         • deleteTrip()     ─────────   │
│                     • addCity()        • profile   │
│                     • addActivity()    • prefs     │
│                     • updateBudget()   • saved     │
└────────────────────────────────────────────────────┘
              │               │               │
              └───────────────┴───────────────┘
                              │
                    ┌─────────▼──────────┐
                    │   localStorage     │
                    │   (auto-persist)   │
                    └────────────────────┘
```

---

## 🗺 Routing Strategy

TanStack Router provides **fully type-safe routing** with file-based route generation.

| Route | Component | Auth Required | Notes |
|---|---|---|---|
| `/` | `IndexPage` | No | Redirects to login or dashboard |
| `/login` | `LoginPage` | No | Redirects if authenticated |
| `/signup` | `SignupPage` | No | Redirects if authenticated |
| `/dashboard` | `DashboardPage` | Yes | Main entry after login |
| `/trips` | `MyTripsPage` | Yes | All user trips |
| `/trips/new` | `CreateTripPage` | Yes | Trip creation wizard |
| `/trips/$tripId` | `TripDetailPage` | Yes | Itinerary + budget + packing |
| `/explore` | `ExplorePage` | No | Destination discovery |
| `/profile` | `ProfilePage` | Yes | User settings |
| `/share/$shareId` | `PublicTripView` | No | Public read-only view |
| `/forgot-password` | `ForgotPasswordPage` | No | Password recovery |

---

## 🎨 Component Design System

Roamverse uses ShadCN UI as a base, extended with custom tokens for a travel-inspired aesthetic.

### Color Palette

```css
:root {
  /* Brand */
  --color-primary: #2563EB;        /* Blue — trust, reliability */
  --color-secondary: #7C3AED;      /* Purple — adventure, creativity */
  --color-accent: #F59E0B;         /* Amber — warmth, energy */

  /* Semantic */
  --color-success: #10B981;        /* Green — confirmed, packed */
  --color-warning: #F59E0B;        /* Amber — over budget warning */
  --color-danger: #EF4444;         /* Red — delete, error states */

  /* Neutral */
  --color-background: #0F172A;     /* Dark navy (dark mode) */
  --color-surface: #1E293B;        /* Card backgrounds */
  --color-border: #334155;         /* Subtle borders */
  --color-text-primary: #F1F5F9;   /* Primary text */
  --color-text-muted: #94A3B8;     /* Muted/secondary text */
}
```

### Typography Scale

| Token | Size | Weight | Usage |
|---|---|---|---|
| `text-display` | 3rem | 800 | Hero headings |
| `text-h1` | 2.25rem | 700 | Page titles |
| `text-h2` | 1.875rem | 600 | Section headings |
| `text-h3` | 1.5rem | 600 | Card titles |
| `text-body` | 1rem | 400 | Body copy |
| `text-small` | 0.875rem | 400 | Labels, captions |
| `text-xs` | 0.75rem | 400 | Metadata, badges |

---

## ⚡ Performance Optimizations

- **Code splitting** — TanStack Router enables per-route lazy loading
- **Memoization** — `React.memo` and `useMemo` on expensive chart renders
- **Virtualization** — Long destination lists rendered with windowing
- **Optimistic UI** — State updates instantly before persistence
- **Debounced search** — City/activity search inputs debounced at 300ms
- **Image optimization** — Lazy-loaded destination images with blur placeholders

---

## ♿ Accessibility

- WCAG 2.1 AA compliant color contrast ratios
- Full keyboard navigation support
- ARIA labels on all interactive elements
- Screen reader compatible route announcements
- Focus trap management in modals and dialogs
- Reduced motion support via `prefers-reduced-motion`

---

## 🧪 Testing

### Planned Test Coverage

```
src/
├── __tests__/
│   ├── unit/
│   │   ├── store/          # Zustand store logic
│   │   ├── hooks/          # Custom hook behaviour
│   │   └── lib/            # Utility function coverage
│   │
│   ├── integration/
│   │   ├── TripCreation    # Full trip creation flow
│   │   ├── BudgetTracking  # Budget update & calculation
│   │   └── PublicSharing   # Share URL generation & view
│   │
│   └── e2e/                # Playwright / Cypress
│       ├── auth.spec.ts
│       ├── trip-planner.spec.ts
│       └── public-share.spec.ts
```

**Run tests:**
```bash
npm run test           # Unit & integration tests
npm run test:e2e       # End-to-end tests (Playwright)
npm run test:coverage  # Coverage report
```

---

## 🚢 Deployment

### Build for Production

```bash
npm run build
# Output: dist/
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --dir=dist --prod
```

### Docker (Optional)

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker build -t Roamverse .
docker run -p 3000:80 Roamverse
```

---

## 🗺 Roadmap

### Version 1.1
- [ ] AI-powered trip recommendations (Claude API integration)
- [ ] Real-time weather integration per city
- [ ] Interactive Google Maps embeds

### Version 1.2
- [ ] Flight & hotel price APIs (Skyscanner / Booking.com)
- [ ] Collaborative trip planning (multi-user)
- [ ] Offline support via Service Workers

### Version 2.0
- [ ] Native mobile apps (React Native)
- [ ] Travel chat assistant
- [ ] Expense splitting with friends
- [ ] Multi-language support (i18n)
- [ ] Social travel feed & community

---

## 🏆 Hackathon Coverage

| Requirement | Status | Implementation |
|---|---|---|
| Authentication System | ✅ Complete | Login, signup, guest mode, auth guards |
| Dashboard | ✅ Complete | Stats, charts, upcoming trips, recommendations |
| Create Trip | ✅ Complete | Multi-city wizard with dates |
| My Trips | ✅ Complete | Card grid, search, filter |
| Itinerary Builder | ✅ Complete | Day-by-day with activities |
| Itinerary View | ✅ Complete | Timeline visualization |
| City Search | ✅ Complete | Search + region filters |
| Activity Search | ✅ Complete | Category filters + cost |
| Budget Breakdown | ✅ Complete | Pie/bar charts, real-time totals |
| Packing Checklist | ✅ Complete | Categories + progress tracking |
| Public Sharing | ✅ Complete | Shareable read-only URLs |
| User Profile | ✅ Complete | Edit, stats, saved destinations |
| Trip Notes | ✅ Complete | Per-trip note-taking |
| Relational Data Model | ✅ Complete | Users → Trips → Cities → Activities |
| Responsive Design | ✅ Complete | Desktop, tablet, mobile |

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/traveloop.git
cd traveloop

# 3. Create a feature branch
git checkout -b feature/your-feature-name

# 4. Make your changes and commit
git add .
git commit -m "feat: add your feature description"

# 5. Push to your fork
git push origin feature/your-feature-name

# 6. Open a Pull Request on GitHub
```

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat:     New feature
fix:      Bug fix
docs:     Documentation changes
style:    Formatting (no logic change)
refactor: Code restructure (no feature/fix)
test:     Adding or fixing tests
chore:    Build process or tooling changes
```

---

## 📄 License

This project is developed for **educational and hackathon purposes** under the MIT License.

```
MIT License

Copyright (c) 2025 Roamverse

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 👨‍💻 Team

Built with passion for travelers and innovators at the **Odoo Hackathon 2025**.

---

<div align="center">

**"Travel planning should feel as exciting as the journey itself."**

⭐ Star this repo if Roamverse helped you explore the world better!

[🔝 Back to Top](#)

</div>
