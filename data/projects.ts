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
      "R&D umbrella and personal project incubator for experimental software and design exploration.",
    description: `
## About Praxis Labs

Praxis Labs is my personal R&D umbrella company and incubator for experimental software projects. It serves as the home for exploring new technologies, design patterns, and product ideas.

### Mission

To build thoughtful software that solves real problems while pushing the boundaries of what's possible in user experience and engineering.

### Focus Areas

- **Developer Tools** - Utilities that improve workflow and productivity
- **Design Systems** - Exploring new patterns in component architecture
- **AI Integration** - Thoughtful applications of machine learning
- **Open Source** - Contributing back to the community
    `,
    year: "2024",
    tags: ["R&D", "Incubator", "Personal Projects"],
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
      "AI-powered journaling application that helps users reflect, grow, and gain insights from their thoughts.",
    description: `
## Auranote AI

Auranote is an AI-powered journaling application designed to help users develop a consistent reflection practice while gaining deeper insights from their entries.

### Features

- **Intelligent Prompts** - Context-aware prompts that guide meaningful reflection
- **Sentiment Analysis** - Track emotional patterns over time
- **Theme Detection** - Automatically identify recurring themes in your entries
- **Private & Secure** - Your thoughts remain yours

### Technology

Built with modern web technologies focusing on performance and privacy.
    `,
    year: "2024",
    tags: ["AI", "Journaling", "Mental Health", "React Native"],
    icon: BookHeart,
    url: "https://auranote.ai",
  },
  {
    id: "3",
    slug: "paintserver",
    title: "Paintserver",
    company: "Craftwork",
    role: "Senior Software Engineer",
    excerpt:
      "Internal ERP and CRM system powering Craftwork's painting operations, scheduling, and customer management.",
    description: `
## Paintserver

Paintserver is Craftwork's internal ERP and CRM platform that manages the entire painting operation from lead to completion.

### Core Functions

- **Lead Management** - Track and nurture potential customers
- **Scheduling** - Coordinate crews, jobs, and materials
- **Invoicing** - Generate and track payments
- **Reporting** - Business intelligence and analytics

### Impact

Streamlined operations across multiple markets, improving efficiency and customer satisfaction.
    `,
    year: "2023-Present",
    tags: ["ERP", "CRM", "React", "Node.js"],
    icon: BrickWall,
  },
  {
    id: "4",
    slug: "craftwork-web",
    title: "Website & Customer Portal",
    company: "Craftwork",
    role: "Senior Software Engineer",
    excerpt:
      "Public-facing website and customer portal for Craftwork's residential painting services.",
    description: `
## Craftwork Website & Customer Portal

The digital front door for Craftwork, including the marketing website and authenticated customer portal.

### Website Features

- **Instant Quoting** - Get painting estimates in minutes
- **Service Areas** - Market-specific content and pricing
- **Portfolio** - Showcase of completed projects

### Customer Portal

- **Project Tracking** - Real-time status updates
- **Communication** - Direct messaging with project managers
- **Documents** - Access contracts, invoices, and photos

### Technology

Next.js application with headless CMS and custom integrations.
    `,
    year: "2023-Present",
    tags: ["Next.js", "Customer Portal", "Marketing"],
    icon: Globe,
    url: "https://craftwork.com",
  },
  {
    id: "5",
    slug: "stashpad",
    title: "Stashpad",
    company: "Stashpad",
    role: "Senior Software Engineer",
    excerpt:
      "Lightning-fast, local-first note-taking app built for developers who think in markdown.",
    description: `
## Stashpad

Stashpad is a blazing-fast, local-first note-taking application designed specifically for developers and power users.

### Key Features

- **Local-First** - Your notes live on your machine, synced when you want
- **Markdown Native** - Write in markdown, see it rendered instantly
- **Command Palette** - Keyboard-driven interface for maximum efficiency
- **Lightweight** - Starts in milliseconds, never slows you down

### My Contributions

- Core editor functionality and performance optimization
- Design system and component architecture
- User experience improvements

### Technology

Electron application with custom markdown rendering and local storage.
    `,
    year: "2022-2023",
    tags: ["Electron", "Note-taking", "Developer Tools", "Local-first"],
    icon: NotebookPen,
  },
];
