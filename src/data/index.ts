import type {
  Skill,
  Experience,
  Project,
  Achievement,
  SocialLink,
} from "@/types";

export const personalInfo = {
  name: "Tran Dang Khoa",
  title: "Frontend Developer",
  tagline:
    "Building high-performance React applications with premium UI engineering.",
  bio: "I'm a Frontend Developer with 3+ years of experience crafting high-performance web applications. I specialize in React.js architecture, BigCommerce e-commerce platforms, and premium UI engineering. I'm passionate about clean code, scalable architecture, and delivering exceptional user experiences that convert.",
  location: "Ho Chi Minh City, Vietnam",
  email: "khoatran.itdev@gmail.com",
  github: "https://github.com/trandangkhoa",
  linkedin: "https://www.linkedin.com/in/khoatranitdev/",
};

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/trandangkhoa", icon: "Github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/khoatranitdev/",
    icon: "Linkedin",
  },
  { label: "Email", href: "mailto:khoatran.itdev@gmail.com", icon: "Mail" },
];

export const skills: Skill[] = [
  // Core
  { name: "React.js", level: 95, category: "Core" },
  { name: "TypeScript", level: 90, category: "Core" },
  { name: "JavaScript (ES6)", level: 95, category: "Core" },
  { name: "HTML5 / CSS3", level: 95, category: "Core" },
  { name: "jQuery", level: 95, category: "Core" },
  // Styling
  { name: "Tailwind CSS", level: 92, category: "Styling" },
  { name: "SCSS / SASS", level: 88, category: "Styling" },
  { name: "Framer Motion", level: 82, category: "Styling" },
  { name: "Ant Design", level: 82, category: "Styling" },
  { name: "Material UI", level: 82, category: "Styling" },
  // Ecosystem
  { name: "Vite", level: 88, category: "Ecosystem" },
  { name: "Redux Toolkit", level: 85, category: "Ecosystem" },
  { name: "React Query", level: 83, category: "Ecosystem" },
  // Platform
  { name: "BigCommerce", level: 92, category: "Platform" },
  { name: "Stencil.js", level: 85, category: "Platform" },
  { name: "GraphQL", level: 78, category: "Platform" },
  { name: "REST APIs", level: 90, category: "Platform" },
  { name: "Handlebars", level: 90, category: "Platform" },
  { name: "Supabase", level: 90, category: "Platform" },
  // Tooling
  { name: "Git / GitHub", level: 90, category: "Tooling" },
  { name: "CI/CD Pipelines", level: 78, category: "Tooling" },
  { name: "Figma", level: 75, category: "Tooling" },
  { name: "Photoshop", level: 75, category: "Tooling" },
  { name: "Illustrator", level: 75, category: "Tooling" },
  { name: "Stitch", level: 75, category: "Tooling" },
  // AI
  { name: "Claude AI", level: 88, category: "AI Workflow" },
  { name: "GitHub Copilot", level: 88, category: "AI Workflow" },
  { name: "Prompt Engineering", level: 82, category: "AI Workflow" },
];

export const skillCategories = [
  "Core",
  "Styling",
  "Ecosystem",
  "Platform",
  "Tooling",
  "AI Workflow",
];

export const experiences: Experience[] = [
  {
    company: "Freelance / Contract",
    role: "Senior Frontend Developer",
    period: "2023 – Present",
    current: true,
    description: [
      "Led frontend development for 20+ BigCommerce e-commerce stores, increasing average conversion rate by 18%",
      "Built reusable React component libraries used across 5+ client projects, reducing development time by 40%",
      "Integrated AI-assisted workflows (Claude AI + GitHub Copilot) to accelerate feature delivery by 35%",
      "Implemented CI/CD pipelines with GitHub Actions for automated testing and Vercel deployments",
    ],
    tech: [
      "React",
      "TypeScript",
      "BigCommerce",
      "Stencil.js",
      "GraphQL",
      "Tailwind CSS",
    ],
  },
  {
    company: "Digital Agency",
    role: "Frontend Developer",
    period: "2022 – 2023",
    description: [
      "Developed 50+ BigCommerce storefronts from Figma designs to production using Stencil.js and custom themes",
      "Built RESTful API integrations with ERPs, payment gateways, and third-party logistics providers",
      "Optimized page load times by 45% using lazy loading, code splitting, and image optimization strategies",
      "Collaborated with UX/UI designers to deliver pixel-perfect, responsive interfaces",
    ],
    tech: ["React", "JavaScript", "BigCommerce", "SCSS", "REST API", "jQuery"],
  },
  {
    company: "Startup",
    role: "Junior Frontend Developer",
    period: "2021 – 2022",
    description: [
      "Built and maintained customer-facing web application used by 10,000+ monthly active users",
      "Migrated legacy jQuery codebase to modern React architecture, reducing bundle size by 30%",
      "Implemented responsive designs and accessibility improvements achieving WCAG 2.1 AA compliance",
    ],
    tech: ["React", "JavaScript", "CSS3", "HTML5", "Git"],
  },
];

export const projects: Project[] = [
  {
    title: "BigCommerce Multi-Store Platform",
    description:
      "Enterprise-grade multi-store BigCommerce platform for a US fashion retailer with 70+ product categories. Custom Stencil theme, GraphQL API integration, and headless checkout flow.",
    tech: [
      "BigCommerce",
      "Stencil.js",
      "GraphQL",
      "TypeScript",
      "Tailwind CSS",
    ],
    type: "featured",
    category: "E-commerce",
    metrics: "18% conversion uplift · $2M+ annual GMV",
  },
  {
    title: "React Design System",
    description:
      "Production-ready component library with 40+ components built with React, TypeScript, and Storybook. Supports light/dark mode, full accessibility, and tree-shaking.",
    tech: ["React", "TypeScript", "Storybook", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/trandangkhoa",
    type: "featured",
    category: "Open Source",
    metrics: "40+ components · Zero-dependency core",
  },
  {
    title: "AI-Powered Product Search",
    description:
      "Semantic product search engine for e-commerce using vector embeddings. Integrated with BigCommerce catalog and custom React search UI with real-time filtering.",
    tech: ["React", "TypeScript", "OpenAI API", "BigCommerce", "REST API"],
    type: "featured",
    category: "AI / Search",
    metrics: "3x faster discovery · 22% higher AOV",
  },
  {
    title: "Headless Commerce Dashboard",
    description:
      "Admin analytics dashboard for BigCommerce merchants with real-time sales tracking, inventory alerts, and custom reporting built with React and Recharts.",
    tech: ["React", "TypeScript", "GraphQL", "Recharts", "BigCommerce API"],
    type: "regular",
    category: "Dashboard",
  },
  {
    title: "CI/CD Deployment Pipeline",
    description:
      "Automated GitHub Actions pipeline for multi-environment BigCommerce theme deployments with staging previews and automated Lighthouse performance audits.",
    tech: ["GitHub Actions", "BigCommerce CLI", "Node.js", "Shell"],
    type: "regular",
    category: "DevOps",
  },
  {
    title: "Performance Audit Toolkit",
    description:
      "Internal CLI tool for running bulk Lighthouse audits, Core Web Vitals tracking, and automated performance regression detection across client storefronts.",
    tech: ["Node.js", "TypeScript", "Puppeteer", "Lighthouse"],
    type: "regular",
    category: "Tooling",
  },
];

export const achievements: Achievement[] = [
  {
    icon: "ShoppingCart",
    value: "70+",
    label: "BigCommerce Projects",
    description: "E-commerce storefronts delivered",
  },
  {
    icon: "TrendingUp",
    value: "18%",
    label: "Avg. Conversion Lift",
    description: "Across client storefronts",
  },
  {
    icon: "Zap",
    value: "45%",
    label: "Performance Gain",
    description: "Average page speed improvement",
  },
  {
    icon: "Clock",
    value: "3+",
    label: "Years Experience",
    description: "In frontend engineering",
  },
];

export const aiWorkflowItems = [
  {
    title: "Context-Aware Code Generation",
    description:
      "Using Claude AI to generate architecture-aware React components, hooks, and TypeScript types that fit the existing codebase conventions.",
    icon: "Brain",
  },
  {
    title: "GitHub Copilot Integration",
    description:
      "Real-time inline suggestions for repetitive patterns, API integrations, and test case scaffolding — cutting boilerplate by 60%.",
    icon: "GitBranch",
  },
  {
    title: "Prompt-Driven Refactoring",
    description:
      "Systematic codebase improvements using structured prompts — from performance audits to accessibility fixes and bundle optimization.",
    icon: "Wand2",
  },
  {
    title: "35% Faster Delivery",
    description:
      "AI-assisted workflows across the full SDLC: design → architecture → implementation → code review → deployment.",
    icon: "Rocket",
  },
];
