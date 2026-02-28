import type {
  Skill,
  Experience,
  Project,
  Achievement,
  SocialLink,
} from '@/types';

export const personalInfo = {
  name: 'Tran Dang Khoa',
  title: 'Frontend Developer',
  tagline:
    'Building high-performance React applications with premium UI engineering.',
  bio: "I'm a Frontend Developer with 3+ years of experience crafting high-performance web applications. I specialize in React.js architecture, BigCommerce e-commerce platforms, and premium UI engineering. I'm passionate about clean code, scalable architecture, and delivering exceptional user experiences that convert.",
  location: 'Ho Chi Minh City, Vietnam',
  email: 'khoatran.itdev@gmail.com',
  github: 'https://github.com/khoatran1999',
  linkedin: 'https://www.linkedin.com/in/khoatranitdev/',
  phone: '+84 366962361',
};

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/khoatran1999', icon: 'Github' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/khoatranitdev/',
    icon: 'Linkedin',
  },
  { label: 'Email', href: 'mailto:khoatran.itdev@gmail.com', icon: 'Mail' },
  { label: 'Phone', href: 'tel:+84366962361', icon: 'Phone' },
];

export const skills: Skill[] = [
  // Core
  { name: 'React.js', level: 95, category: 'Core' },
  { name: 'TypeScript', level: 90, category: 'Core' },
  { name: 'JavaScript (ES6)', level: 95, category: 'Core' },
  { name: 'HTML5 / CSS3', level: 95, category: 'Core' },
  { name: 'jQuery', level: 95, category: 'Core' },
  // Styling
  { name: 'Tailwind CSS', level: 92, category: 'Styling' },
  { name: 'SCSS / SASS', level: 88, category: 'Styling' },
  { name: 'Framer Motion', level: 82, category: 'Styling' },
  { name: 'Ant Design', level: 82, category: 'Styling' },
  { name: 'Material UI', level: 82, category: 'Styling' },
  // Ecosystem
  { name: 'Vite', level: 88, category: 'Ecosystem' },
  { name: 'Redux Toolkit', level: 85, category: 'Ecosystem' },
  { name: 'React Query', level: 83, category: 'Ecosystem' },
  // Platform
  { name: 'BigCommerce', level: 92, category: 'Platform' },
  { name: 'Stencil.js', level: 85, category: 'Platform' },
  { name: 'GraphQL', level: 78, category: 'Platform' },
  { name: 'REST APIs', level: 90, category: 'Platform' },
  { name: 'Handlebars', level: 90, category: 'Platform' },
  { name: 'Supabase', level: 90, category: 'Platform' },
  // Tooling
  { name: 'Git / GitHub', level: 90, category: 'Tooling' },
  { name: 'CI/CD Pipelines', level: 78, category: 'Tooling' },
  { name: 'Figma', level: 75, category: 'Tooling' },
  { name: 'Photoshop', level: 75, category: 'Tooling' },
  { name: 'Illustrator', level: 75, category: 'Tooling' },
  { name: 'Stitch', level: 75, category: 'Tooling' },
  // AI
  { name: 'Claude AI', level: 88, category: 'AI Workflow' },
  { name: 'GitHub Copilot', level: 88, category: 'AI Workflow' },
  { name: 'Prompt Engineering', level: 82, category: 'AI Workflow' },
];

export const skillCategories = [
  'Core',
  'Styling',
  'Ecosystem',
  'Platform',
  'Tooling',
  'AI Workflow',
];

export const experiences: Experience[] = [
  {
    company: 'Allcommerce',
    role: 'Frontend Developer',
    period: '11/2022 – 06/2025',
    description: [
      'Built high-performance, scalable React.js admin dashboards and internal systems using Redux, Vite, Tailwind CSS, and Ant Design.',
      'Integrated REST & GraphQL APIs, implemented Webhooks, and handled real-time data flows.',
      'Participated in building multiple commercial-grade BigCommerce templates from scratch to production, ensuring pixel-perfect UI, performance, and cross-device compatibility.',
      'Delivered, maintained, debugged, and optimized 100+ production BigCommerce projects, including, writing technical documentation and usage guidelines.',
      'Applied AI-assisted development (Claude AI, GitHub Copilot) to accelerate coding, refactoring, and debugging.',
      'Built basic CI/CD pipelines and optimized frontend performance.',
    ],
    tech: [
      'React',
      'Redux Toolkit',
      'JavaScript',
      'HTML/SCSS',
      'REST API',
      'Tailwind CSS',
      'Ant Design',
      'BigCommerce',
      'Handlebars',
      'Stencil',
      'JQuery',
      'GraphQL',
      'Git',
      'Figma',
      'Claude AI',
    ],
  },
  {
    company: 'Viet Japan Partner',
    role: 'Frontend Developer',
    period: '03/2022 – 10/2022',
    description: [
      'Developed pixel-perfect, responsive user interfaces from Figma designs using HTML, SCSS, JavaScript, and React.js.',
      'Collaborated with backend developers to integrate REST APIs and ensure seamless data flow.',
    ],
    tech: ['React', 'JavaScript', 'HTML', 'SCSS', 'REST API'],
  },
  {
    company: 'FreeLancer',
    role: 'Designer',
    period: '2021 – 2022',
    description: [
      'Created name cards, banners, labels, catalogs, packaging and product visuals.',
      'Collaborated with clients to understand design requirements and deliver high-quality visual assets that met their needs.',
    ],
    tech: ['Photoshop', 'Illustrator', 'Figma'],
  },
];

export const projects: Project[] = [
  {
    title: 'BigCommerce Dinosaur Man',
    description:
      'Enterprise-grade multi-store BigCommerce platform for a US fashion retailer with 100+ product categories. Custom Stencil theme, GraphQL API integration, and headless checkout flow.',
    tech: [
      'BigCommerce',
      'Stencil.js',
      'GraphQL',
      'TypeScript',
      'Tailwind CSS',
    ],
    type: 'featured',
    category: 'E-commerce',
    metrics: '18% conversion uplift · $2M+ annual GMV',
    url: 'https://dinosaur-man-demo.mybigcommerce.com/',
    image: new URL('../image/project1.png', import.meta.url).href,
  },
  {
    title: 'BigCommerce Baby Fashion Storefront',
    description:
      'Production-ready component library with 40+ components built with React, TypeScript, and Storybook. Supports light/dark mode, full accessibility, and tree-shaking.',
    tech: ['React', 'TypeScript', 'Storybook', 'Tailwind CSS', 'Framer Motion'],
    type: 'featured',
    category: 'Open Source',
    metrics: '40+ components · Zero-dependency core',
    url: 'https://dinosaur-kid-demo.mybigcommerce.com/',
    image: new URL('../image/project2.png', import.meta.url).href,
  },
  {
    title: 'Mooncat Pet Store',
    description:
      'Semantic product search engine for e-commerce using vector embeddings. Integrated with BigCommerce catalog and custom React search UI with real-time filtering.',
    tech: ['React', 'TypeScript', 'OpenAI API', 'BigCommerce', 'REST API'],
    type: 'featured',
    category: 'AI / Search',
    metrics: '3x faster discovery · 22% higher AOV',
    url: 'https://mooncat-petstore-demo.mybigcommerce.com/',
    image: new URL('../image/project3.png', import.meta.url).href,
  },
  {
    title: 'BigCommerce Woman Theme',
    description:
      'Admin analytics dashboard for BigCommerce merchants with real-time sales tracking, inventory alerts, and custom reporting built with React and Recharts.',
    tech: ['React', 'TypeScript', 'GraphQL', 'Recharts', 'BigCommerce API'],
    type: 'regular',
    category: 'Dashboard',
    url: 'https://dinosaur-woman-demo.mybigcommerce.com/',
    image: new URL('../image/project4.png', import.meta.url).href,
  },
  {
    title: 'Kitchenary Cooking Store',
    description:
      'Automated GitHub Actions pipeline for multi-environment BigCommerce theme deployments with staging previews and automated Lighthouse performance audits.',
    tech: ['GitHub Actions', 'BigCommerce CLI', 'Node.js', 'Shell'],
    type: 'regular',
    category: 'DevOps',
    url: 'https://kitchenary-cooking-demo.mybigcommerce.com/',
    image: new URL('../image/project5.png', import.meta.url).href,
  },
];

export const achievements: Achievement[] = [
  {
    icon: 'ShoppingCart',
    value: '100+',
    label: 'BigCommerce Projects',
    description: 'E-commerce storefronts delivered',
  },
  {
    icon: 'TrendingUp',
    value: '18%',
    label: 'Avg. Conversion Lift',
    description: 'Across client storefronts',
  },
  {
    icon: 'Zap',
    value: '45%',
    label: 'Performance Gain',
    description: 'Average page speed improvement',
  },
  {
    icon: 'Clock',
    value: '3+',
    label: 'Years Experience',
    description: 'In frontend engineering',
  },
];

export const aiWorkflowItems = [
  {
    title: 'Context-Aware Code Generation',
    description:
      'Using Claude AI to generate architecture-aware React components, hooks, and TypeScript types that fit the existing codebase conventions.',
    icon: 'Brain',
  },
  {
    title: 'GitHub Copilot Integration',
    description:
      'Real-time inline suggestions for repetitive patterns, API integrations, and test case scaffolding — cutting boilerplate by 60%.',
    icon: 'GitBranch',
  },
  {
    title: 'Prompt-Driven Refactoring',
    description:
      'Systematic codebase improvements using structured prompts — from performance audits to accessibility fixes and bundle optimization.',
    icon: 'Wand2',
  },
  {
    title: '35% Faster Delivery',
    description:
      'AI-assisted workflows across the full SDLC: design → architecture → implementation → code review → deployment.',
    icon: 'Rocket',
  },
];
