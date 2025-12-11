export type Experience = {
  title: string;
  company: string;
  period: string;
  description: string[];
};

export type Project = {
  name: string;
  role: string;
  url?: string;
  description: string[];
};

export type SkillCategory = {
  icon: string;
  name: string;
  skills: string[];
};

export type ContactLink = {
  label: string;
  href: string;
  display: string;
};

export type Resume = {
  name: string;
  title: string;
  location: string;
  intro: string;
  currentProject: {
    name: string;
    url: string;
  };
  about: string[];
  experience: Experience[];
  education: {
    title: string;
    description: string[];
  };
  projects: Project[];
  skills: SkillCategory[];
  contact: ContactLink[];
};

export const resume: Resume = {
  name: "Drew White",
  title: "Full-Stack Engineer & Designer",
  location: "Charlotte, NC",
  intro:
    "I build fast, thoughtful digital products with a deep focus on UX, performance, and emotional impact.",
  currentProject: {
    name: "AI-powered journaling app",
    url: "https://auranote.ai",
  },
  about: [
    "I'm a self-taught engineer and designer with a background in UX, product, and startup life. I dropped out of high school, built my career from the ground up, and have since led projects across web, mobile, and AI. I'm driven by curiosity, craft, and a desire to build tools that actually matter.",
    "I thrive in that rare middle ground where aesthetics meet systems thinking — balancing clean code, performance, and polish with empathy and intuition. Whether I'm heads-down building or collaborating cross-functionally, I bring high standards, fast iteration, and a deep respect for the end user.",
  ],
  experience: [
    {
      title: "Co-Founder & Principal Engineer",
      company: "AuraNote",
      period: "Jan 2024 – Present",
      description: [
        "Building an AI-powered journaling platform focused on emotional clarity, personal growth, and expressive reflection.",
        "Designed and implemented the product end-to-end using modern web technologies (Next.js, Tailwind, PostgreSQL, OpenAI, S3).",
        "Developed core features like mood-based image generation, streaming AI reflections, encrypted journal entries, and multi-image support.",
        "Architected a clean, performant codebase with server actions, minimal client state, and zero-dependency markdown rendering.",
        "Driving product vision, UX, engineering, branding, and go-to-market strategy as a co-founder.",
      ],
    },
    {
      title: "Principal Designer & Full Stack Developer",
      company: "Craftwork",
      period: "Jul 2023 – Present",
      description: [
        "Lead design and front-end architecture for multiple client applications, improving user engagement and performance across mobile and web.",
        "Spearheaded internal tools and workflows to accelerate delivery and reduce design-dev handoff friction.",
        "Built robust full-stack features using React, Next.js, and PostgreSQL, with an emphasis on speed and clean UX.",
        "Act as a bridge between design, engineering, and leadership, helping drive product vision and quality.",
      ],
    },
    {
      title: "Designer & Frontend Developer",
      company: "Stashpad",
      period: "Jan 2022 – Jul 2023",
      description: [
        "Owned the UI design system and component library, improving developer velocity and visual consistency.",
        "Collaborated directly with founders to shape product direction and deliver polished, performant features in a fast-moving startup environment.",
        "Led the effort to redesign the app's core UX, contributing to a measurable increase in user retention and satisfaction.",
      ],
    },
    {
      title: "Founder",
      company: "Hyak Co.",
      period: "Jan 2020 – Aug 2021 (Acquired)",
      description: [
        "Built and scaled a boutique creative agency focused on branding, web design, and early-stage product development.",
        "Led all client work, from discovery to deployment, delivering 30+ successful design systems, brand packages, and web applications.",
        "Managed a small team of contractors and freelancers, overseeing creative direction, client relations, and business operations.",
        "Successfully exited via acquisition in 2021.",
      ],
    },
    {
      title: "Marketing Director",
      company: "Dunstone Company",
      period: "Feb 2013 – Jul 2021",
      description: [
        "Directed all branding and marketing efforts, including web, print, and digital strategy, for a global manufacturing company.",
        "Rebuilt the company's digital presence, leading to a 3x increase in inbound interest and modernized brand perception.",
        "Collaborated with leadership to align marketing strategy with business goals, improving operational efficiency and customer outreach.",
      ],
    },
  ],
  education: {
    title: "Self-Taught Engineer & Designer",
    description: [
      "Dropped out of high school and built my career from the ground up through relentless self-education, hands-on experience, and a deep obsession with craft.",
      "Taught myself design, UX, and full-stack development by launching real products, working across startups, and learning from every project I touched.",
      "Continuously study systems architecture, interface design, and emerging technologies to stay sharp and intentional in my work.",
      "I believe the best education is doing — and I've spent over a decade proving that by building things that matter.",
    ],
  },
  projects: [
    {
      name: "AuraNote",
      role: "Co-Founder / Principal Engineer & Designer",
      url: "https://auranote.ai",
      description: [
        "An AI-powered journaling app designed to help users reflect deeply, visually, and emotionally through writing, AI feedback, and creative prompts.",
        "Built from scratch with a clean full-stack architecture (Next.js, PostgreSQL, S3, OpenAI, Tailwind), with zero client-side dependencies for rendering Markdown.",
        "Developed features like mood-based image generation, encrypted entries, multi-image support, and an immersive AI reflection mode.",
        "Currently in public beta.",
      ],
    },
    {
      name: "Craftwork OS",
      role: "Principal Designer & Full Stack Developer",
      description: [
        "Internal ERP and CRM platform for Craftwork, a Y Combinator startup (top of class, 2023) providing residential painting services across 3 markets.",
        "Helped transform a barebones Rails app into a powerful operations tool, building the design system, Human Interface Guidelines, and design review SOPs from scratch.",
        "Shipped key features including the Staffing Calendar, Project Management Flow, and Unified Communications (phone, SMS, email, internal messaging).",
      ],
    },
    {
      name: "Stashpad",
      role: "Designer & Frontend Developer",
      description: [
        "A Techstars-backed, fast, local-first note-taking app for developers.",
        "Worked as both designer and frontend developer, focusing on UI and UX through two major design overhauls.",
        "Also contributed to marketing via the YouTube channel as the voice of Stashpad for a brief time.",
      ],
    },
  ],
  skills: [
    {
      icon: "wrench",
      name: "Technical",
      skills: [
        "Full-Stack Development (JavaScript, TypeScript, React, Next.js, Node.js)",
        "Backend & APIs (PostgreSQL, REST, Server Actions, Supabase, Prisma)",
        "DevOps & Infra (Vercel, AWS S3, CI/CD, Docker basics)",
        "Markdown Rendering, Image Processing, Client-Side Encryption",
      ],
    },
    {
      icon: "palette",
      name: "Design & UX",
      skills: [
        "UX/UI Design, Design Systems, Interaction Design",
        "Branding & Visual Identity",
        "Prototyping & Wireframing (Figma, Framer)",
        "Design-Dev Handoff & Implementation",
      ],
    },
    {
      icon: "brain",
      name: "Product & Strategy",
      skills: [
        "Product Development & Vision",
        "Founding & Startup Leadership",
        "AI/LLM Integration (OpenAI API, embeddings, prompt design)",
        "Team Collaboration & Cross-Functional Communication",
      ],
    },
    {
      icon: "book",
      name: "Tools & Tech Stack",
      skills: [
        "Figma, Adobe Creative Suite, Notion, Linear, VS Code, Git",
        "Cursor, Tauri, Tailwind CSS, shadcn/ui",
      ],
    },
  ],
  contact: [
    {
      label: "Email",
      href: "mailto:drew@drucial.dev",
      display: "drew@drucial.dev",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/drucial/",
      display: "linkedin.com/in/drucial",
    },
    {
      label: "Github",
      href: "https://github.com/drucial",
      display: "github.com/drucial",
    },
    {
      label: "Portfolio",
      href: "https://drucial.dev",
      display: "drucial.dev",
    },
  ],
};
