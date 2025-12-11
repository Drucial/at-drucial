import type { LucideIcon } from "lucide-react";
import {
  BookHeart,
  BrickWall,
  FlaskConical,
  Globe,
  NotebookPen,
} from "lucide-react";

export type Project = {
  id: string;
  slug: string;
  title: string;
  company: string;
  role: string;
  excerpt: string;
  description: string;
  year: string;
  tags: string[];
  icon?: LucideIcon;
  url?: string;
  images?: string[];
};

export const projects: Project[] = [
  {
    id: "1",
    slug: "praxis-labs",
    title: "Praxis Labs",
    company: "Praxis Labs",
    role: "Founder",
    excerpt:
      "An innovative product think tank—a logical home for ventures spanning software, design, and content creation.",
    description: `
## About Praxis Labs

Praxis Labs is my R&D umbrella company and product incubator. With so many ideas and projects in flight, I needed a logical home—both financially and thematically—to host all my ventures. A place to distribute final products, showcase works-in-progress, and discuss ideas openly.

### Philosophy

Nothing extra. Everything essential. Praxis Labs is built on constraint and intentionality—removing friction and distilling ideas to their core.

### Active Projects

- **Shad-zen** - A Next.js project template with shadcn/ui, Tailwind, and Motion/React. Includes heavy code style and lint guidelines designed to keep AI copilots in check while generating code.

- **Hyper Mono** - A mono synth plugin for all major DAWs. A unique twist on the classic dual oscillator synth with advanced harmonic controls and wide-range LFO controls. Written in C++.

- **Gratis** - A gratitude journal app focused on calm, reflection, and speed. Designed to be completed in under five minutes daily. Includes mood tracking, task tracking, and daily focus features. Currently in beta, prepping for App Store launch.

- **zen-vim** - A micro-minimalist Neovim distribution focusing on simplicity and speed.

### Vision

Praxis Labs is my future—an innovative product think tank where philosophy meets practice, and process takes precedence over perfection.
    `,
    year: "2025",
    tags: ["R&D", "Incubator", "Software", "Design", "Open Source"],
    icon: FlaskConical,
    url: "https://praxis-labs.io",
  },
  {
    id: "2",
    slug: "auranote-ai",
    title: "Auranote AI",
    company: "Praxis Labs",
    role: "Founder & Lead Developer",
    excerpt:
      "Write easily. Reflect deeply. See clearly. An AI-powered journaling platform with a unique approach to emotional wellness.",
    description: `
## Auranote AI

Auranote is an AI-powered journaling platform currently in public beta. It's designed to make reflection accessible while offering deeper insights through thoughtful AI integration.

### Your Personal Aura

Each user gets an evolving "Aura"—an AI companion tuned to their needs based on entries and conversations. It can generate support, help users introspect, and create images to help process or experience emotions in a tangible way.

### Features

- **AI-Guided Prompts** - Gentle nudges that help explore feelings when words don't come easily
- **Emotional Insights** - Analysis revealing thinking patterns and fresh perspectives
- **Visual Emotion** - AI-generated artistic visualizations that transform written reflections into meaningful imagery
- **Wellness Tracking** - Monitor emotional growth over time (coming soon)

### What Sets It Apart

The simplicity of use combined with multiple levels of opt-in AI integration. The UI focuses on creating a simplistic, inviting, and calming feeling—a safe space for introspection rather than a clinical tool.

### Roadmap

Currently web-only, with plans for a mobile app in 2026.
    `,
    year: "2024",
    tags: ["AI", "Journaling", "Mental Health", "Web App"],
    icon: BookHeart,
    url: "https://auranote.ai",
  },
  {
    id: "3",
    slug: "paintserver",
    title: "Paintserver",
    company: "Craftwork",
    role: "Principal Designer & Full Stack Developer",
    excerpt:
      "Transformed a barebones Rails app into a powerful CRM, analytics machine, and operations swiss army knife for a Y Combinator startup.",
    description: `
## Paintserver

Paintserver is Craftwork's internal ERP and CRM platform that manages the entire painting operation from lead to project close. Craftwork finished top of class in their Y Combinator batch in 2023 and currently services 3 markets.

### The Challenge

When I joined, Paintserver was a barebones stock Rails app with scaffolded views and no consideration for the user. It worked as a tool—if you knew how to work it. I was brought on to right the ship as lead designer and full stack developer.

### Building the Foundation

Despite having no prior Ruby or Rails experience, I picked it up quickly and evolved the app alongside the team. Beyond feature development, I built the infrastructure for quality:

- **Design System** - A comprehensive component library for consistent UI
- **Human Interface Guidelines** - Standards for interaction patterns across the app
- **Design Review SOPs** - Processes ensuring quality at every release
- **Brand Guidelines** - Collaborated with our brand designer on visual identity

### Key Features I Shipped

- **Staffing Calendar** - A complex web of availability between projects, deliveries, and crews presented in an intuitive, highly effective interface. Coordinates scheduling across multiple markets.

- **Project Management Flow** - My crowning achievement. A dedicated UX based on every team's SOPs, ensuring every project from lead-in to close gets the same attention, follows the same procedures, and receives top-level quality.

- **Unified Communications** - Task system combined with a comms UI integrating phone, SMS, email, and internal messaging directly in the application.

### My Role

I operate on a small team of engineers and lead a small team of designers as principal designer. Day-to-day splits between design review, ideation, research, and engineering the features I lead. Project management and progress reporting are significant, but the actual implementation—splitting time between Figma and the terminal—is what I love.
    `,
    year: "2023-Present",
    tags: ["Rails", "ERP", "CRM", "Design Systems", "Y Combinator"],
    icon: BrickWall,
  },
  {
    id: "4",
    slug: "craftwork-web",
    title: "Website & Customer Portal",
    company: "Craftwork",
    role: "Principal Designer & Full Stack Developer",
    excerpt:
      "The Apple-like buying experience for home services—featuring the industry's only self-serve estimating tool and a premium customer portal.",
    description: `
## Craftwork Website & Customer Portal

The customer-facing side of Craftwork, encompassing the marketing website and customer portal. Our CEO's dream is to bring the Apple or Tesla buying experience to home services—and this is how we deliver it.

### My Role

While I've contributed design and implementation across the marketing site and approved all designs there, my key impact on marketing was motion design and overall vision. My primary focus is the Customer Portal—a vision cut from my own flesh, though built as a true team effort.

### The Customer Portal

Every customer who contacts Craftwork gets access to a portal that provides an extremely premium experience matching the quality of our expert painters. It includes:

- **Self-Serve Estimating Tool** - The only one in the industry. Customers can get accurate estimates on their own terms.
- **Onboarding Flow** - A guided experience that sets expectations and builds confidence from first contact.
- **Project Progress Tracker** - Real-time visibility into every stage of their project.

### The Differentiator

This portal is the core thing that separates us from the competition in our customers' eyes. The direct mentions of it in reviews—right next to how floored they are by our painting—are the proof.

### Technology

Next.js application powered by Payload CMS for marketing content. The portal connects to Paintserver via API using tRPC, keeping customer data in sync with operations in real-time.
    `,
    year: "2023-Present",
    tags: ["Next.js", "Payload CMS", "tRPC", "Customer Portal"],
    icon: Globe,
    url: "https://craftwork.com",
  },
  {
    id: "5",
    slug: "stashpad",
    title: "Stashpad",
    company: "Stashpad",
    role: "Designer & Frontend Developer",
    excerpt:
      "A Techstars-backed, lightning-fast note-taking app for developers. I joined a scrappy team to shape the UI/UX through two major design overhauls.",
    description: `
## Stashpad

Stashpad was a blazing-fast, local-first note-taking application designed for developers and power users. I discovered them on social media shortly after they came out of Techstars, and after speaking with the CEO and CTO, I was sold by the vision and the CEO's tenacity and conviction. On the design front, their minds were wide open—plenty of room to make a mark. A playground.

### The Team

A small, scrappy team of 5 engineers and 2 designers. I functioned as both designer and frontend developer, focusing on UI and UX. I also did some marketing via the YouTube channel as the voice of Stashpad for a brief time.

### The Work

The app went through two major design overhauls during my tenure. We had no design system to speak of, and the app eventually diverged from itself—prompting a complete restart. We rebuilt from scratch twice, each time refining the vision for what a developer-focused notes app should feel like.

### Key Features

- **Local-First** - Notes live on your machine, synced when you want
- **Markdown Native** - Write in markdown, see it rendered instantly
- **Command Palette** - Keyboard-driven interface for maximum efficiency
- **Lightweight** - Starts in milliseconds, never slows you down

### Outcome

Unfortunately, Stashpad suffered some self-inflicted wounds and dissolved about a year after my departure. Despite the ending, it was a formative experience in early-stage product development and the realities of startup life.
    `,
    year: "2022-2023",
    tags: ["Electron", "Techstars", "Developer Tools", "UI/UX"],
    icon: NotebookPen,
  },
];
