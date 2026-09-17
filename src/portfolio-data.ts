export type Project = {
  id: string;
  title: string;
  type: 'AI / ML' | 'Mobile' | 'Full-Stack' | 'Other';
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
  email: 'hello@shayanbaloch.dev',
  phone: '+92 300 0000000',
  links: {
    github: 'https://github.com/shayanbaloch',
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
      type: 'Full-Stack',
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
      github: 'https://github.com/shayanbaloch',
      demo: 'https://friendly-purpose-production-9a5b.up.railway.app/login',
      image: 'projects/factory-management-project/image1.png',
    },
    {
      id: 'ai-customer-support',
      title: 'AI Customer Support SaaS',
      type: 'AI / ML',
      year: '2024',
      summary: 'An AI-powered customer support platform with document-based RAG, conversational support, source citations, conversation history, support tickets, and human handoff.',
      detail:
        'A support workspace that helps teams answer questions from their own knowledge base while keeping the human support path visible and easy to reach.',
      problem: 'Support teams were spending too much time searching internal documents and repeating answers across conversations.',
      solution: 'A searchable knowledge layer powered by retrieval-augmented generation, with citations and a handoff path when automation should stop.',
      features: ['Document-based RAG', 'Source citations', 'Conversation history', 'Support tickets', 'Human handoff'],
      challenges: 'Balancing helpful AI responses with transparent sources, predictable failure states, and a clear escalation path.',
      stack: ['Angular', 'Django', 'DRF', 'PostgreSQL', 'pgvector', 'Groq', 'Sentence Transformers', 'AI/ML'],
      accent: '#e3a36b',
      metric: 'RAG',
      metricLabel: 'grounded answers',
      github: 'https://github.com/shayanbaloch',
      demo: '#contact',
    },
    
    {
      id: 'safar',
      title: 'Safar / a mobile field guide',
      type: 'Mobile',
      year: '2023',
      summary: 'A lightweight mobile companion for finding local routes, stories, and places worth slowing down for.',
      detail:
        'Safar was designed around intermittent connectivity and one-handed use. The result is an offline-first mobile experience with map primitives, saved itineraries, and a small editorial layer for context.',
      problem: 'People needed a lightweight way to discover and save local routes while away from reliable connectivity.',
      solution: 'An offline-first mobile experience that keeps the useful parts of a field guide close at hand.',
      features: ['Phone-first interface', 'Offline-friendly flows', 'Saved itineraries', 'Map primitives', 'Editorial context'],
      challenges: 'Keeping the experience useful and calm on a small screen while accounting for intermittent connectivity.',
      stack: ['Flutter', 'Dart', 'SQLite', 'Maps'],
      accent: '#d8bd68',
      metric: 'UX',
      metricLabel: 'mobile-first',
      github: 'https://github.com/shayanbaloch',
      demo: '#contact',
    },
  ] satisfies Project[],
  experience: [
    {
      period: '2024 — now',
      role: 'Independent developer',
      place: 'Remote · selected products & experiments',
      text: 'Partnering with founders and small teams to turn ambiguous ideas into shippable, maintainable software.',
    },
    {
      period: '2023 — 2024',
      role: 'Full-stack developer',
      place: 'Product engineering · contract',
      text: 'Built responsive React surfaces, Node services, and the glue between user needs and technical constraints.',
    },
    {
      period: '2019 — 2023',
      role: 'BS Computer Science',
      place: 'University · Islamabad, Pakistan',
      text: 'Studied software engineering, databases, networks, and the habit of asking better questions.',
    },
  ],
  achievements: [
    { title: 'ICPC Regionalist', text: 'Built problem-solving fluency through competitive programming.' },
    { title: 'SOFTEC Final Round', text: 'Presented practical software work in a competitive university showcase.' },
    { title: 'Programming competitions', text: 'Kept sharpening algorithms, debugging, and collaboration under time pressure.' },
    { title: 'Certifications & internships', text: 'Continued learning through structured study and hands-on project work.' },
  ],
};