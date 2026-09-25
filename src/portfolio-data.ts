export type Project = {
  id: string;
  title: string;
  type: 'Web' |'AI / ML' | 'Mobile'  | 'Other';
  year: string;
  summary: string;
  detail: string;
  problem: string;
  solution: string;
  features: string[];
  challenges: string;
  stack: string[];
  accent: string;
  metric: string;
  metricLabel: string;
  github: string;
  demo: string;
  /**
   * Optional cover image for the project card / expanded view.
   * If omitted, the generated mock-application visual is used as a fallback.
   * Example: image: '/projects/saferoute/cover.png',
   */
  image?: string;
  /**
   * Optional screenshot gallery shown in the expanded project view.
   * If omitted, the gallery section is simply hidden.
   * Example:
   * screenshots: [
   *   '/projects/saferoute/01.png',
   *   '/projects/saferoute/02.png',
   * ],
   */
  screenshots?: string[];
};

export const portfolio = {
  name: 'Shayan Abdulah',
  role: 'Computer Science Graduate & Full-Stack Developer',
  location: 'Islamabad, Pakistan · open to opportunities',
  availability: 'COMPUTER SCIENCE GRADUATE • FULL-STACK & MOBILE DEVELOPER',
  intro:
    'Computer Science graduate building full-stack applications and AI-powered software that solve real-world problems.',
  about:
    'I am a Computer Science graduate interested in software development, full-stack development, AI/ML, and mobile applications. I enjoy building practical software that solves real problems, from thoughtful interfaces and reliable APIs to LLM-powered applications and RAG systems.',
  email: 'shayanabdullah89@gmail.com',
  phone: '+92 307 0870604',
  links: {
    github: 'https://github.com/Shayan054',
    linkedin: 'https://www.linkedin.com/in/shayanabdullahpk/',
    resume: "/Hafiz-Shayan-Abdullah.pdf",
  },
  stats: [
    { value: 'BS', label: 'Computer Science' },
    { value: 'Web', label: 'Full-Stack Development' },
    { value: 'AI', label: 'LLMs • RAG • ML • LangChain • APIs' },
    { value: 'Mobile', label: 'Development' },
  ],
  skillGroups: [
    {
      name: 'Languages',
      items: ['C++', 'Python', 'JavaScript', 'SQL'],
    },
    {
      name: 'Frontend',
      items: ['React', 'Angular', 'Tailwind CSS', 'HTML', 'CSS'],
    },
    {
      name: 'Backend & APIs',
      items: ['Django', 'Django REST Framework', 'REST APIs'],
    },
    {
      name: 'AI & Machine Learning',
      items: [
        'Machine Learning',
        'TensorFlow',
        'LangChain',
        'RAG',
        'LLM APIs',
      ],
    },
    {
      name: 'Data, DevOps & Deployment',
      items: [
        'PostgreSQL',
        'Docker',
        'GitHub',
        'Linux',
        'Vercel',
        'Railway',
      ],
    },
    {
      name: 'Mobile Development',
      items: ['Flutter', 'Dart'],
    },
    {
      name: 'Security & Testing',
      items: ['Nmap', 'Burp Suite', 'Nessus', 'Selenium'],
    },
  ],
  projects: [
    {
      id: 'factory-management',
      title: 'Factory Management System',
      type: 'Web',
      year: '2026',
      summary: 'Full-stack business management application designed to streamline business operations, manage data, and handle day-to-day workflows.',
      detail:
        'A practical operations management system for organizing business data, streamlining workflows, and providing the information a growing factory needs to manage its day-to-day operations and make informed decisions.',
      problem: 'Business operations relied heavily on manual data entry, Excel spreadsheets, and physical record-keeping, making it difficult to maintain accurate, organized, and easily accessible business information.',
      solution: 'Developed a centralized full-stack factory management system to digitize business records, streamline operational workflows, and provide a single platform for managing and accessing business data.',
      features: ['Order management', 'Customer management', 'Product management', 'Responsive dashboards', 'Workflow management', 'PostgreSQL-backed records'],

      challenges: 'Replacing manual Excel and paper-based record-keeping with a centralized system while keeping business data organized, accessible, and easy to manage.',
      stack: ['Django', 'React', 'PostgreSQL','TailwindCSS','Python','JavaScript'],
      accent: '#83b6a3',
      metric: 'API',
      metricLabel: 'practical systems',
      github: 'https://github.com/Shayan054/factory-project',
      demo: 'https://friendly-purpose-production-9a5b.up.railway.app/login',
      image: 'projects/factory-management-project/image1.png',
    },
    
      {
        id: 'ai-customer-support',
        title: 'AI Customer Support SaaS',
        type: 'AI / ML',
        year: '2026',
        summary: 'AI-powered customer support SaaS platform designed to help businesses provide contextual support using their own knowledge and documentation.',
        detail:
          'A multi-business customer support platform that enables companies to create dedicated support workspaces, manage business knowledge, configure AI-assisted support, and handle customer conversations through a modern customer-facing interface and business dashboard.',
        problem:
          'Businesses often rely on scattered FAQs, policy documents, and support resources, making it difficult to provide customers with fast, consistent, and context-aware answers.',
        solution:
          'Developing a centralized AI customer support platform where businesses can manage their support knowledge and customer interactions, with an AI layer designed to retrieve relevant business context and generate more accurate, company-specific responses.',
        features: [
          'AI-powered customer support',
          'Business workspaces',
          'Customer chat interface',
          'Knowledge base management',
          'Conversation management',
          'AI configuration',
          'Support analytics dashboard',
          'Responsive SaaS interface'
        ],
        challenges:
          'Designing a scalable multi-business support architecture that can combine company-specific knowledge retrieval, AI-generated responses, customer conversations, and business management tools while keeping each company’s data isolated.',
        stack: [
          'Angular',
          'TypeScript',
          'Django',
          'Django REST Framework',
          'PostgreSQL',
          'pgvector',
          'Groq API',
          'TailwindCSS',
          'Python',
          'RAG',
          'LLM'
        ],
        accent: '#38bdf8',
        metric: 'AI',
        metricLabel: 'support platform',
        github: 'https://github.com/Shayan054/Ai-Customer-Support-Saas',
        demo: 'https://ai-customer-support-saas-ashen.vercel.app/',
        image: 'projects/ai-customer-support-saas/image1.png',
      },
    {
      id: 'Ajaia-Docs',
    
      title: 'Ajaia Docs',
    
      type: 'Web',
    
      year: '2026',
    
      summary: 'A collaborative document management and editing platform with authentication, sharing, and Markdown-based workflows.',
    
      detail:
        'Ajaia Docs was built as a full-stack collaborative document platform featuring user authentication, document creation and editing, file import, sharing with editor permissions, persistent storage, and Markdown export. The project focuses on clean document workflows while demonstrating a complete React and Django-based application architecture.',
    
      problem: 'Managing documents across different formats and collaborating with other users can become fragmented without a simple platform that combines editing, sharing, and document organization.',
    
      solution: 'A full-stack document platform that allows users to create, edit, import, organize, share, and export documents while maintaining ownership and access permissions.',
      image: 'projects/ajaia-docs/image1.png',

      features: [
        'Document creation and editing',
        'Rich-text document editor',
        'TXT and Markdown import',
        'Document sharing with editor permissions',
        'Owned and shared document views',
        'Markdown export',
        'User authentication',
        'Persistent document storage',
        'Demo user accounts'
      ],
    
      challenges: 'Designing a reliable full-stack document workflow while handling authentication, document ownership, sharing permissions, file imports, and persistent data across the frontend and backend.',
    
      stack: ['React', 'Vite', 'Django', 'Django REST Framework', 'SQLite', 'JavaScript', 'Markdown'],
    
      accent: '#7c6f9f',
    
      metric: '12/12',
    
      metricLabel: 'tests passing',
    
      github: 'https://github.com/Shayan054/ajaia-docs',
    
      demo: 'https://ajaia-docs-flax.vercel.app/',
    },
    {
      id: 'Geo-Vista',
    
      title: 'Geo Vista',
    
      type: 'Web',
    
      year: '2026',
    
      summary: 'An interactive Web GIS application for exploring maps, geospatial data, and practical GIS concepts.',
    
      detail:
        'Geo Vista was built as a lightweight browser-based GIS experience using JavaScript and open-source mapping libraries. It brings together interactive maps, geospatial data, layer management, measurement tools, and client-side spatial analysis in a single web application.',
    
      problem: 'Understanding GIS concepts can be difficult without an interactive environment where spatial data and mapping operations can be explored visually.',
    
      solution: 'An interactive Web GIS application that demonstrates practical geospatial concepts through maps, data layers, spatial measurements, and client-side analysis.',
      image: 'projects/geo-vista/image1.png',

      features: [
        'Interactive maps',
        'GeoJSON data visualization',
        'Layer management',
        'Distance and area measurement',
        'Spatial analysis',
        'Map markers and drawing tools'
      ],
    
      challenges: 'Building useful GIS functionality entirely on the client side while keeping the map experience responsive and easy to use.',
    
      stack: ['HTML', 'Tailwind CSS', 'JavaScript', 'Leaflet', 'GeoJSON', 'Turf.js'],
    
      accent: '#6b8e7b',
    
      metric: 'GIS',
    
      metricLabel: 'interactive',
    
      github: 'https://github.com/Shayan054/GeoVista-',
    
      demo: 'https://geo-vista-nu.vercel.app/',
    },
  ] satisfies Project[],
  experience: [
    {
      period: '2026 — now',
      role: 'Independent developer',
      place: 'Personal projects · AI · Full-stack development',
      text: 'Building and deploying practical software projects across Django, React, Angular, APIs, databases, and AI-powered applications.',
    },
    {
      period: 'July 2025 — August 2025',
      role: 'VAPT Intern',
      place: 'NECOP · Internship',
      text: 'Worked with security assessment tools and practical vulnerability testing, including Nmap, Burp Suite, and Nessus.',
    },
    {
      period: '2022 — 2026',
      role: 'BS Computer Science',
      place: 'Bahria University · Islamabad, Pakistan',
      text: 'Studied computer science fundamentals while building across C++, web development, mobile applications, databases, and AI/ML.',
    },
  ],
  achievements: [
    { title: 'ICPC Regionalist', text: 'Built problem-solving fluency through competitive programming.' },
    { title: 'SOFTEC Final Round', text: 'Presented practical software work in a competitive university showcase.' },
    { title: 'Programming competitions', text: 'Kept sharpening algorithms, debugging, and collaboration under time pressure.' },
    { title: 'Certifications & internship', text: 'Continued learning through structured study and hands-on project work.' },
  ],
};