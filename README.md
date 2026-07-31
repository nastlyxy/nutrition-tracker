# SimplyCalo 🍽️

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=for-the-badge&logo=react&logoColor=white)](https://recharts.org/)

**SimplyCalo** is a lightweight, responsive, and intuitive nutrition and calorie-tracking web application. It empowers users to take control of their daily diet by calculating personalized energy requirements (BMR & TDEE), logging daily meals using a global food database, and engineering custom recipes with automatic macronutrient calculations per 100g.

---

## 📸 Screenshots & Demo

<p align="center">
  <img src="/public/demo.gif" alt="SimplyCalo Application Dashboard" width="600px" style="border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);" />
</p>

<p align="center">
  <em>SimplyCalo Interface: Mobile-first Tracker view, Recharts Donut visualization, and intuitive Meal logging.</em>
</p>

---

## Key Features

* 🔍 **Smart Food Search (Edamam API Integration)**
    Integrated with the Edamam Food Database API to query millions of real-world foods. Implements API debouncing (500ms delay) within React lifecycle effects to avoid redundant network overhead and optimize request quotas.
* 🍳 **Dynamic Custom Recipe Builder & Calculator**
    A powerful engine allowing users to assemble custom recipes with multiple ingredients. Using advanced array reduction (`.reduce()`), it dynamically calculates the total weight and computes precise calories, proteins, fats, and carbs per 100g for the newly engineered meal.
* 📊 **Interactive Visual Analytics (Recharts)**
    Replaced simple progress trackers with an elegant, responsive circular Donut Chart representing Macronutrient distribution (P/F/C) in real-time, paired with intuitive visual progress bars for daily targets.
* 🔒 **Secure Authentication & Database Persistence**
    Fully backed by **Firebase Authentication** (Google Single Sign-On) and **Cloud Firestore**. Safely stores user profile parameters, custom recipes, and daily calorie logs, ensuring instant synchronization across devices.
* 📈 **Historical Target Protection (Snapshot Pattern)**
    Features an advanced database architectural pattern where the user's target calorie and macronutrient limits are snapshotted upon logging their first meal of the day. This guarantees that if a user alters their current profile parameters (e.g., weight, goals), all historical logs retain their correct targets.
* 📱 **Tailwind-Powered Mobile-First UI**
    Designed from the ground up to support responsive layouts across devices. Features fluid, accessible grid allocations, adaptive typography, and intuitive tab menus designed specifically for seamless mobile experiences.

---

## Architecture & Tech Stack

* **Frontend Library:** React (Functional Components, Custom Contexts, Hooks)
* **Build System:** Vite (ES6+)
* **State Management:** React Context API (`AuthContext`, `UserContext`, `FoodContext`)
* **Styling & UI:** Tailwind CSS, React Hot Toast
* **Charts & Visualization:** Recharts
* **Backend Infrastructure:** Firebase (Auth, Firestore Realtime DB)
* **Third-Party API:** Edamam Food Database API

---

## Getting Started

To run SimplyCalo locally on your machine, follow these steps:

### 1. Clone the repository
```bash
git clone [https://github.com/nastlyxy/nutrition-tracker.git](https://github.com/nastlyxy/nutrition-tracker.git)
cd nutrition-tracker
```

### 2. Install dependencies
```bash
npm install
```
### 3. Configure Environment Variables

Create a .env file in the root directory and populate it with your API keys:

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

VITE_EDAMAM_APP_ID=your_edamam_app_id
VITE_EDAMAM_APP_KEY=your_edamam_app_key
```

### 4. Run the development server

```
npm run dev
```

## Roadmap & Future Improvements

SimplyCalo represents a fully functional MVP. Future iterations will focus on:

* TypeScript Migration: Refactoring JavaScript files to TypeScript to introduce strict compile-time type checking and improve maintainability.

* State Management Refactoring: Moving state from React Context API to Zustand or Redux Toolkit to prevent unnecessary renders and centralize state transitions.

* Custom Hooks Extraction: Extracting Edamam API search algorithms and Firestore operations into dedicated custom React hooks (e.g., useFoodSearch, useUserLogger) for enhanced separation of concerns.
