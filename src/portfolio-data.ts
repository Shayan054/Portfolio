export type Project = {
  id: string;
  title: string;
  type: 'Web' | 'AI / ML' | 'Mobile' | 'Backend' | 'Other';
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
};

export const portfolio = {
  name: 'Shayan Abdulah',
  role: 'Computer Science Graduate & Full-Stack Developer',
  location: 'Islamabad, Pakistan · open to opportunities',
  availability: 'COMPUTER SCIENCE GRADUATE • FULL-STACK & MOBILE DEVELOPER',
  intro:
    'Computer Science graduate building full-stack applications and AI-powered software that solve real-world problems.',
  about:
    'I am a Computer Science graduate interested in software development, full-stack development, and AI/ML. I enjoy turning ideas into practical applications that solve real problems, from thoughtful interfaces to reliable APIs and data-backed systems.',
  email: 'hello@shayanbaloch.dev',
  phone: '+92 300 0000000',
  links: {
    github: 'https://github.com/shayanbaloch',
    linkedin: 'https://www.linkedin.com/in/shayanabdullahpk/',
    resume: '#contact',
  },
  stats: [
    { value: 'BS', label: 'Computer Science' },
    { value: '16+', label: 'core technologies' },
    { value: 'AI', label: 'focus area' },
    { value: 'Open', label: 'to opportunities' },
  ],
  skillGroups: [
    {
      name: 'Languages',
      items: ['C++', 'Python', 'JavaScript', 'SQL'],
    },
    {
      name: 'Web Development',
      items: ['Django', 'Django REST Framework', 'React', 'Angular', 'HTML', 'CSS', 'Tailwind CSS'],
    },
    {
      name: 'AI / ML',
      items: ['Machine Learning', 'TensorFlow', 'LangChain', 'RAG', 'LLM APIs', 'Sentence Transformers'],
    },
    {
      name: 'Tools & Technologies',
      items: ['Git', 'GitHub', 'Docker', 'PostgreSQL', 'REST APIs', 'Linux'],
    },
  ],
  projects: [
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
      id: 'factory-management',
      title: 'Factory / Business Management Project',
      type: 'Backend',
      year: '2023',
      summary: 'Full-stack business management application designed to manage business operations and data.',
      detail:
        'A practical operations system for organizing business data, workflows, and the day-to-day information a growing factory needs to make decisions.',
      problem: 'Business operations were spread across disconnected tools, making it difficult to maintain a dependable source of truth.',
      solution: 'A full-stack management application with structured data, role-aware workflows, and a responsive interface for everyday operations.',
      features: ['Business operations', 'Structured data', 'Responsive dashboards', 'Workflow management', 'PostgreSQL-backed records'],
      challenges: 'Designing a flexible data model and keeping frequent workflows fast without hiding important operational context.',
      stack: ['Django', 'React', 'PostgreSQL'],
      accent: '#83b6a3',
      metric: 'API',
      metricLabel: 'practical systems',
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