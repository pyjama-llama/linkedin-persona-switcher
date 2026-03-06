# ContextSwitch — Professional Persona Platform

> A LinkedIn-inspired MVP demonstrating **professional context switching** — a feed that adapts to your active professional role in real time.

---

## What It Does

LinkedIn shows you everything from everyone. ContextSwitch shows you what's relevant to **who you are right now**.

Switch between professional personas — Data Analyst, Business Strategist, Designer, Tech Builder — and the feed instantly re-filters to show only posts scored as relevant to your current context. Every post gets a **% match badge** so you understand why it's surfacing.

## Core Features

- **Persona-based feed filtering** — each post has relevance scores across all personas; switch context, see different posts
- **Onboarding quiz** — 4 questions, multi-select, detects your professional mix and sets up multiple personas at once
- **% Match badges** — transparent relevance scoring on every post (not a black box)
- **Dynamic trending sidebar** — topics change based on active persona context
- **LinkedIn-style UI** — NavBar, composer, engagement actions, dark mode

## Tech Stack

| | |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| State | Zustand |
| UI | shadcn/ui + Lucide icons |
| Data | Static TypeScript (no backend needed for demo) |

## Getting Started

```bash
git clone https://github.com/<your-username>/linkedin-persona-switcher
cd linkedin-persona-switcher
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## The Product Concept

LinkedIn's feed algorithm is a black box — you can't tell it "I'm in analyst mode today, filter for data posts." This prototype makes context explicit and user-controlled. The personas system is the core thesis: professionals wear multiple hats, and their feed should reflect which hat they're wearing.

**Built as a portfolio piece for a Chief of Staff application at LinkedIn Sales Solutions.**
*(Includes a custom static audio override for the Chief of Staff persona—bypassing the Live API to play a curated two-person podcast exported from NotebookLM.)*

---

*[View Product Requirements](./docs/PRODUCT-REQUIREMENTS.md)*
