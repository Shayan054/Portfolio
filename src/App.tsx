import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from 'react';
import shayan from './assets/shayan.png';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import {
  ArrowDown,
  ArrowUpRight,
  Brain,
  BrainCircuit,
  Check,
  ChevronRight,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Github,
  Layers,
  Layers3,
  Linkedin,
  Link2,
  Mail,
  Menu,
  Moon,
  MoveUpRight,
  Network,
  Search,
  Send,
  ShieldCheck,
  Sun,
  Waypoints,
  Webhook,
  X,
} from 'lucide-react';

import {
  SiAngular,
  SiCplusplus,
  SiCss,
  SiDart,
  SiDjango,
  SiDocker,
  SiFlutter,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiPostgresql,
  SiPython,
  SiRailway,
  SiReact,
  SiSelenium,
  SiTailwindcss,
  SiTensorflow,
  SiVercel,
} from 'react-icons/si';

import { portfolio, type Project } from './portfolio-data';

type Filter = 'All' | Project['type'];
type SkillGroup = (typeof portfolio.skillGroups)[number];

// Maps each tech-stack item to a recognizable brand icon and a restrained brand color.
type SkillIconConfig = {
  icon: ComponentType<{
    size?: number;
    className?: string;
    style?: CSSProperties;
    'aria-hidden'?: boolean;
  }>;
  color: string;
};

const SKILL_ICON: Record<string, SkillIconConfig> = {
  // Languages
  'C++': { icon: SiCplusplus, color: '#00599C' },
  Python: { icon: SiPython, color: '#3776AB' },
  JavaScript: { icon: SiJavascript, color: '#D6A900' },
  SQL: { icon: Database, color: '#336791' },

  // Frontend
  React: { icon: SiReact, color: '#149ECA' },
  Angular: { icon: SiAngular, color: '#DD0031' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  HTML: { icon: SiHtml5, color: '#E34F26' },
  CSS: { icon: SiCss, color: '#1572B6' },

  // Backend & APIs
  Django: { icon: SiDjango, color: '#0C4B33' },
  'Django REST Framework': { icon: Layers3, color: '#A30000' },
  'REST APIs': { icon: Network, color: '#0F8B8D' },

  // AI & Machine Learning
  'Machine Learning': { icon: BrainCircuit, color: '#7C3AED' },
  TensorFlow: { icon: SiTensorflow, color: '#FF6F00' },
  LangChain: { icon: Link2, color: '#16A085' },
  RAG: { icon: Search, color: '#2563EB' },
  'LLM APIs': { icon: Cpu, color: '#8B5CF6' },
  'Sentence Transformers': { icon: Waypoints, color: '#7C3AED' },

  // Data, DevOps & Deployment
  PostgreSQL: { icon: SiPostgresql, color: '#4169E1' },
  Docker: { icon: SiDocker, color: '#2496ED' },
  GitHub: { icon: SiGithub, color: '#24292F' },
  Git: { icon: Github, color: '#F05032' },
  Linux: { icon: SiLinux, color: '#D8A800' },
  Vercel: { icon: SiVercel, color: '#181717' },
  Railway: { icon: SiRailway, color: '#6B5DD3' },

  // Mobile Development
  Flutter: { icon: SiFlutter, color: '#02569B' },
  Dart: { icon: SiDart, color: '#0175C2' },

  // Security & Testing
  Nmap: { icon: ShieldCheck, color: '#2563EB' },
  'Burp Suite': { icon: ShieldCheck, color: '#F97316' },
  Nessus: { icon: ShieldCheck, color: '#00A5B5' },
  Selenium: { icon: SiSelenium, color: '#43B02A' },
};

// Swap this for the real photograph when it's ready — everything else (the mask,
// fade, and floating marks) is built to work with any upright portrait crop.
const PORTRAIT_SRC = shayan;

// The one project that should always render large, regardless of which
// projects the filter leaves visible (previously this was tied to array
// index, which broke the grid whenever the featured project was filtered out).
const FEATURED_PROJECT_ID = 'ai-customer-support';

function AmbientMark({
  className = '',
  duration = 12,
  distance = 10,
  rotate = 2.5,
  absolute = true,
  children,
}: {
  className?: string;
  duration?: number;
  distance?: number;
  rotate?: number;
  absolute?: boolean;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none select-none text-foreground/15 ${absolute ? 'absolute' : 'relative'} ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -distance, 0],
              x: [0, distance * 0.25, 0],
              rotate: [-rotate, rotate, -rotate],
            }
      }
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

/** Hero-only mount entrance — keeps section Reveals elsewhere unchanged. */
function HeroIn({
  children,
  className = '',
  delay = 0,
  y = 14,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 0.8, 0.28, 1] }}
    >
      {children}
    </motion.div>
  );
}

const HERO_TECH_ORBITS = [
  { Icon: SiReact, label: 'React', className: 'left-[2%] top-[18%]', duration: 9.5, distance: 7, rotate: 3, delay: 0.55, parallax: { x: 7, y: -5 } },
  { Icon: SiPython, label: 'Python', className: 'right-[0%] top-[12%]', duration: 11, distance: 6, rotate: 2, delay: 0.62, parallax: { x: -6, y: 7 } },
  { Icon: SiDjango, label: 'Django', className: 'left-[-2%] top-[48%]', duration: 12.5, distance: 8, rotate: 2.5, delay: 0.7, parallax: { x: 8, y: 5 } },
  { Icon: SiAngular, label: 'Angular', className: 'right-[-4%] top-[42%]', duration: 10.5, distance: 7, rotate: 3, delay: 0.78, parallax: { x: -7, y: -6 } },
  { Icon: SiJavascript, label: 'JavaScript', className: 'left-[8%] bottom-[22%]', duration: 13, distance: 5, rotate: 2, delay: 0.86, parallax: { x: 5, y: 8 } },
] as const;

type ParallaxDepth = { x: number; y: number };

/** Smooth mouse parallax for the hero visual — DOM transforms only, no per-frame React state. */
function useHeroParallax(enabled: boolean) {
  const rootRef = useRef<HTMLElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const haloRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!enabled) return;

    const root = rootRef.current;
    if (!root) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;
    let active = true;

    const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

    const apply = (node: HTMLElement | null, depth: ParallaxDepth) => {
      if (!node) return;
      const x = current.x * depth.x;
      const y = current.y * depth.y;
      node.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    };

    const tick = () => {
      if (!active) return;
      current.x = lerp(current.x, target.x, 0.08);
      current.y = lerp(current.y, target.y, 0.08);

      apply(portraitRef.current, { x: -2, y: -2 });
      apply(haloRef.current, { x: -1.5, y: -1.2 });
      apply(cardRef.current, { x: -3.5, y: -3.2 });
      bgRefs.current.forEach((node, index) => {
        const depth = index % 2 === 0 ? { x: -1.2, y: -1.6 } : { x: 1.4, y: -1.1 };
        apply(node, depth);
      });
      iconRefs.current.forEach((node, index) => {
        const depth = HERO_TECH_ORBITS[index]?.parallax ?? { x: 6, y: 6 };
        apply(node, depth);
      });

      const settled = Math.abs(current.x - target.x) < 0.001 && Math.abs(current.y - target.y) < 0.001;
      if (!settled || target.x !== 0 || target.y !== 0) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const ensureTick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const rect = root.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      target.x = Math.max(-1, Math.min(1, nx));
      target.y = Math.max(-1, Math.min(1, ny));
      ensureTick();
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      ensureTick();
    };

    root.addEventListener('pointermove', onMove, { passive: true });
    root.addEventListener('pointerleave', onLeave);
    ensureTick();

    return () => {
      active = false;
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
      [portraitRef.current, haloRef.current, cardRef.current, ...bgRefs.current, ...iconRefs.current].forEach((node) => {
        if (node) node.style.transform = '';
      });
    };
  }, [enabled]);

  return { rootRef, portraitRef, haloRef, cardRef, bgRefs, iconRefs };
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${visible ? 'reveal' : 'opacity-0'} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title, detail }: { eyebrow: string; title: string; detail?: string }) {
  return (
    <div className="mb-12 grid gap-4 md:grid-cols-[minmax(0,1fr)_340px] md:items-end">
      <div>
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h2 className="display max-w-3xl text-4xl font-semibold leading-[.98] sm:text-5xl">{title}</h2>
      </div>
      {detail ? <p className="max-w-sm text-sm leading-7 text-muted-foreground md:pb-1">{detail}</p> : null}
    </div>
  );
}

function LogoMark() {
  return (
    <a href="#top" className="flex items-center gap-3" data-testid="link-logo">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground">
        SB
      </span>
      <span className="hidden text-sm font-bold tracking-[-.03em] sm:block">Shayan Abdullah</span>
    </a>
  );
}

/*
 * Generated project visual — reused as the expanded-view cover
 * whenever a project has no `image` set.
 */
function ProjectVisualFallback({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "relative h-[220px] w-full overflow-hidden rounded-xl border border-border sm:h-[270px] lg:h-[290px]"
          : "relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border"
      }
    >
      <div className="absolute inset-0" style={{ backgroundColor: project.accent }} />
      <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full border border-[#173c3d]/15" />
      <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full border border-[#173c3d]/15" />
      <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[#173c3d]/30 bg-[#f5efe1]/90 p-3 shadow-xl shadow-[#173c3d]/10 ${compact ? "w-[64%] max-w-[500px]" : "w-[76%]"}`}>
        <div className="flex gap-1.5 border-b border-[#173c3d]/10 pb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#173c3d]/45" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#173c3d]/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#173c3d]/15" />
        </div>
        <div className="mt-3 grid grid-cols-[.65fr_1.35fr] gap-2">
          <div className="space-y-2">
            <div className="h-2 w-3/4 rounded bg-[#173c3d]/20" />
            <div className="h-10 rounded-md bg-[#173c3d]/10" />
            <div className="h-2 w-1/2 rounded bg-[#173c3d]/15" />
          </div>
          <div className="rounded-md bg-[#173c3d]/10 p-3">
            <div className="h-2 w-1/2 rounded bg-[#173c3d]/25" />
            <div className="mt-3 h-12 rounded-md border border-[#173c3d]/15" />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('shayan-theme') === 'dark';
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formError, setFormError] = useState('');
  const [sent, setSent] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cursor, setCursor] = useState({ x: -40, y: -40, hover: false });
  const [activeSection, setActiveSection] = useState('Home');
  const reduceMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setFinePointer(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const heroParallax = useHeroParallax(Boolean(finePointer && !reduceMotion));

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('shayan-theme', dark ? 'dark' : 'light');
  }, [dark]);

  // Lock body scroll while the expanded project overlay is open.
  useEffect(() => {
    if (!selectedProject) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProject]);

  // Reset the screenshot lightbox whenever the overlay closes/changes.
  useEffect(() => {
    if (!selectedProject) setLightboxImage(null);
  }, [selectedProject]);

  useEffect(() => {
    if (!lightboxImage) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxImage]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };
    const interactive = 'a, button, [role="button"], input, textarea, select, label';
    const onPointerMove = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const hover = Boolean(target?.closest(interactive));
      setCursor({ x: event.clientX, y: event.clientY, hover });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  useEffect(() => {
    const sections = [
      ['top', 'Home'],
      ['about', 'About'],
      ['skills', 'Skills'],
      ['work', 'Projects'],
      ['experience', 'Experience'],
      ['contact', 'Contact'],
    ] as const;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const match = sections.find(([id]) => id === visible.target.id);
          if (match) setActiveSection(match[1]);
        }
      },
      { rootMargin: '-18% 0px -62% 0px', threshold: [0.1, 0.35, 0.7] },
    );
    sections.forEach(([id]) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [techFilter, setTechFilter] = useState('All technologies');
  const visibleProjects = useMemo(
    () =>
      portfolio.projects.filter(
        (project) =>
          (filter === 'All' || project.type === filter) &&
          (techFilter === 'All technologies' || project.stack.includes(techFilter)),
      ),
    [filter, techFilter],
  );
  const activeProject =
  visibleProjects.find((project) => project.id === activeProjectId) ??
  visibleProjects[0] ??
  null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setFormError('Please fill in your name, email, and a short note.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      setFormError('That email address does not look quite right.');
      return;
    }
    setSent(true);
  };

  const closeMobile = () => setMobileOpen(false);
  const navItems = [
    ['Home', '#top'],
    ['About', '#about'],
    ['Skills', '#skills'],
    ['Projects', '#work'],
    ['Experience', '#experience'],
    ['Contact', '#contact'],
  ];

  return (
    <div id="top" className="soft-noise min-h-[100dvh] overflow-x-hidden">
      <div className="fixed left-0 top-0 z-[70] h-0.5 bg-accent transition-[width] duration-150" style={{ width: `${progress}%` }} />
      <div
        className={`cursor-orb hidden md:block ${cursor.hover ? 'is-hover' : ''}`}
        style={{ left: cursor.x, top: cursor.y }}
        aria-hidden="true"
      />

      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="section-wrap flex h-[72px] items-center justify-between">
          <LogoMark />
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className={`relative text-xs font-semibold transition-colors hover:text-foreground ${activeSection === label ? 'text-foreground' : 'text-muted-foreground'}`}
                data-testid={`link-nav-${label.toLowerCase()}`}
              >
                {label}
                {activeSection === label ? <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-accent" /> : null}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDark((value) => !value)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary"
              aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
              data-testid="button-toggle-theme"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a
              href="#contact"
              className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 sm:flex"
              data-testid="link-header-contact"
            >
              Let&apos;s talk <ArrowUpRight size={14} />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border md:hidden"
              aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileOpen}
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {mobileOpen ? (
          <nav className="border-t border-border bg-background px-5 py-5 md:hidden" aria-label="Mobile navigation">
            <div className="section-wrap grid gap-1">
              {navItems.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={closeMobile}
                  className="flex items-center justify-between border-b border-border/70 py-3 text-sm font-semibold"
                  data-testid={`link-mobile-${label.toLowerCase()}`}
                >
                  {label}
                  <ChevronRight size={15} className="text-muted-foreground" />
                </a>
              ))}
            </div>
          </nav>
        ) : null}
      </header>

      <main>
        <section
          ref={(node) => {
            heroParallax.rootRef.current = node;
          }}
          className="grid-paper relative overflow-x-clip border-b border-border/70"
          aria-labelledby="hero-title"
        >
          <div
            ref={(node) => {
              heroParallax.bgRefs.current[0] = node;
            }}
            className="pointer-events-none absolute inset-0 hidden lg:block"
            aria-hidden="true"
          >
            <AmbientMark className="left-[8%] top-[18%]" duration={11} distance={9}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M10 3v14M3 10h14" /></svg>
            </AmbientMark>
          </div>
          <div
            ref={(node) => {
              heroParallax.bgRefs.current[1] = node;
            }}
            className="pointer-events-none absolute inset-0 hidden lg:block"
            aria-hidden="true"
          >
            <AmbientMark className="left-[3%] bottom-[14%]" duration={15} distance={7}>
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
            </AmbientMark>
          </div>
          <div className="section-wrap grid min-h-[calc(100dvh-72px)] items-center gap-10 py-14 lg:grid-cols-[1.12fr_.88fr] lg:gap-16 lg:py-20">
            <div className="relative z-10 max-w-2xl lg:max-w-none">
              <HeroIn delay={0} y={8}>
                <div className="mb-7 flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                  </span>
                  <span className="mono text-[10px] uppercase tracking-[.15em] text-muted-foreground">{portfolio.availability}</span>
                </div>
              </HeroIn>
              <h1 id="hero-title" className="display max-w-3xl text-[clamp(3.2rem,8.5vw,7.6rem)] font-semibold leading-[.86]">
                <HeroIn delay={0.08} y={18} className="block">
                  Hi, I&apos;m
                </HeroIn>
                <HeroIn delay={0.18} y={18} className="block text-primary">
                  Shayan Abdullah.
                </HeroIn>
              </h1>
              <HeroIn delay={0.32} y={16}>
                <p className="mt-8 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                  {portfolio.intro}
                </p>
                <p className="mono mt-4 text-[10px] uppercase tracking-[.14em] text-primary">
                  Python <span className="text-muted-foreground">•</span> Django <span className="text-muted-foreground">•</span> React <span className="text-muted-foreground">•</span> Angular <span className="text-muted-foreground">•</span> Flutter <span className="text-muted-foreground">•</span>C++ <span className="text-muted-foreground">•</span> AI/ML
                </p>
              </HeroIn>
              <HeroIn delay={0.48} y={12}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <a
                    href="#work"
                    className="hero-cta hero-cta-primary group inline-flex min-h-11 items-center gap-3 rounded-full bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground"
                    data-testid="link-view-work"
                  >
                    View My Work <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                  </a>
                  <a
                    href="#contact"
                    className="hero-cta hero-cta-secondary inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-3.5 text-sm font-bold"
                    data-testid="link-start-conversation"
                  >
                    Let&apos;s Connect <MoveUpRight size={15} />
                  </a>
                  <a
                    href={portfolio.links.resume}
                    download="Hafiz-Shayan-Abdullah.pdf"
                    className="hero-cta hero-cta-link inline-flex min-h-11 items-center text-xs font-bold text-muted-foreground underline decoration-border underline-offset-4"
                  >
                    Download CV
                  </a>
                </div>
              </HeroIn>
              <HeroIn delay={0.58} y={10}>
                <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border/70 pt-5 sm:mt-14">
                  <span className="mono text-[10px] uppercase tracking-[.16em] text-muted-foreground">{portfolio.location}</span>
                  <div className="flex items-center gap-3">
                    <a href={portfolio.links.github} target="_blank" rel="noreferrer" className="text-muted-foreground transition-colors hover:text-foreground" aria-label="GitHub" data-testid="link-hero-github"><Github size={17} /></a>
                    <a href={portfolio.links.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground transition-colors hover:text-foreground" aria-label="LinkedIn" data-testid="link-hero-linkedin"><Linkedin size={17} /></a>
                    <a href={`mailto:${portfolio.email}`} className="text-muted-foreground transition-colors hover:text-foreground" aria-label="Email" data-testid="link-hero-email"><Mail size={17} /></a>
                  </div>
                </div>
              </HeroIn>
            </div>

            <div className="relative mx-auto mb-6 flex w-full max-w-[520px] justify-center pb-8 sm:mb-0 sm:pb-4 lg:-translate-y-10">
              <div ref={heroParallax.haloRef} className="pointer-events-none absolute inset-0 will-change-transform" aria-hidden="true">
                <div className="absolute left-1/2 top-[40%] h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.16)_0%,hsl(var(--accent)/0.06)_42%,transparent_72%)] blur-2xl dark:bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.2)_0%,hsl(var(--accent)/0.08)_42%,transparent_72%)]" />
                <div className="absolute left-1/2 top-[48%] h-64 w-56 -translate-x-1/2 -translate-y-1/2 rounded-[40%] bg-foreground/[0.04] blur-xl" />
              </div>

              <HeroIn delay={0.38} y={22} className="relative w-full">
                <div ref={heroParallax.portraitRef} className="will-change-transform">
                  <img
                    src={PORTRAIT_SRC}
                    alt="Shayan Baloch - Full Stack Developer"
                    className="portrait-blend relative z-10 mx-auto h-auto max-h-[620px] w-full max-w-[500px] object-contain drop-shadow-[0_18px_32px_rgba(15,40,50,0.14)]"
                  />
                </div>

                <AmbientMark className="left-[4%] top-[10%] hidden text-lg sm:block" duration={9} distance={6} rotate={2}>
                  +
                </AmbientMark>
                <AmbientMark className="right-[2%] top-[46%] hidden text-xs mono sm:block" duration={13} distance={5} rotate={1.5}>
                  {'</>'}
                </AmbientMark>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-[20%] right-[6%] hidden h-1.5 w-1.5 rounded-full bg-accent/55 sm:block"
                />

                {HERO_TECH_ORBITS.map(({ Icon, label, className, duration, distance, rotate, delay }, index) => (
                  <HeroIn key={label} delay={delay} y={10} className={`absolute z-20 hidden sm:block ${className}`}>
                    <div
                      ref={(node) => {
                        heroParallax.iconRefs.current[index] = node;
                      }}
                      className="will-change-transform"
                    >
                      <AmbientMark absolute={false} duration={duration} distance={distance} rotate={rotate}>
                        <span
                          className="grid h-10 w-10 place-items-center rounded-2xl border border-border/80 bg-card/90 text-foreground/70 shadow-sm shadow-foreground/5 backdrop-blur-sm dark:bg-card/80"
                          aria-label={label}
                        >
                          <Icon size={18} aria-hidden />
                        </span>
                      </AmbientMark>
                    </div>
                  </HeroIn>
                ))}
              </HeroIn>

              <HeroIn delay={0.95} y={14} className="absolute -bottom-5 left-0 z-30 sm:-left-6">
                <div ref={heroParallax.cardRef} className="will-change-transform">
                  <div className="rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-lg shadow-foreground/[0.06] backdrop-blur-sm">
                    <p className="mono text-[9px] uppercase tracking-[.14em] text-muted-foreground">
                      Currently thinking about
                    </p>
                    <p className="mt-1 text-sm font-bold">tools that feel human</p>
                  </div>
                </div>
              </HeroIn>
            </div>
          </div>
          <a
            href="#about"
            className="mono absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] uppercase tracking-[.16em] text-muted-foreground transition-colors hover:text-primary sm:flex"
            data-testid="link-scroll-explore"
          >
            Scroll to explore <ArrowDown size={14} className="scroll-nudge" />
          </a>
        </section>

        <section id="about" className="section-wrap relative scroll-mt-24 py-24 sm:py-32" aria-labelledby="about-title">
          <AmbientMark className="right-2 top-10 hidden sm:block" duration={17} distance={7}>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="13" cy="13" r="10" /></svg>
          </AmbientMark>
          <SectionHeading eyebrow="01 / About me" title="Computer science, product thinking, practical software." detail="I enjoy building software where thoughtful design meets practical engineering." />
          <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-24">
            <Reveal>
              <p id="about-title" className="display max-w-2xl text-3xl font-medium leading-[1.15] sm:text-4xl">
                {portfolio.about}
              </p>
              <p className="mt-7 max-w-xl text-sm leading-8 text-muted-foreground">
                I care about interfaces that explain themselves, APIs that keep their promises, and teams that leave a codebase easier to enter than they found it.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="rounded-[1.5rem] border border-border bg-card p-6 sm:p-7">
                <p className="eyebrow mb-5">Quick information</p>
                <dl className="divide-y divide-border">
                  {[
                    ['Education', 'BS Computer Science'],
                    ['Areas', 'Full-Stack Development • AI/ML • Mobile'],
                    ['Location', 'Islamabad, Pakistan'],
                    ['Status', 'Open to opportunities'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                      <dt className="mono text-[9px] uppercase tracking-[.13em] text-muted-foreground">{label}</dt>
                      <dd className="text-right text-sm font-semibold">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="mt-8 grid grid-cols-2 divide-x divide-y divide-border border-y border-border py-0 sm:grid-cols-4 sm:divide-y-0">
                {portfolio.stats.map((stat) => (
                  <div key={stat.label} className="px-4 py-5 first:pl-0 sm:px-5">
                    <p className="display text-2xl font-semibold text-primary sm:text-3xl">{stat.value}</p>
                    <p className="mono mt-2 text-[9px] uppercase leading-4 tracking-[.13em] text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

      
        <section
  id="work"
  className="section-wrap scroll-mt-24 py-24 sm:py-32"
  aria-labelledby="work-title"
>
  {/* =========================
      SECTION HEADER
  ========================== */}
  <Reveal>
    <div className="mb-10 grid gap-6 md:grid-cols-[1fr_380px] md:items-end">
      <div>
        <p className="eyebrow mb-4">
          03 / Featured projects
        </p>

        <h2
          id="work-title"
          className="display text-4xl font-semibold leading-none sm:text-5xl"
        >
          Selected{' '}
          <span className="italic text-primary">
            work.
          </span>
        </h2>
      </div>

      <p className="max-w-sm text-sm leading-7 text-muted-foreground md:justify-self-end">
        A selection of projects across full-stack development, AI/ML,
        mobile applications, and software engineering.
      </p>
    </div>
  </Reveal>

  {/* =========================
      FILTERS
  ========================== */}
  <Reveal delay={80}>
    <div className="mb-10 flex flex-wrap items-center gap-2 border-y border-border/70 py-4">
      {(
        [
          'All',
          'AI / ML',
          'Mobile',
          'Full-Stack',
          'Other',
        ] as Filter[]
      ).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setFilter(item)}
          aria-pressed={filter === item}
          className={`
            rounded-full border px-4 py-2
            text-[11px] font-bold
            transition-all duration-200

            ${
              filter === item
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-background text-muted-foreground hover:border-primary/60 hover:text-primary'
            }
          `}
        >
          {item}
        </button>
      ))}

      {/* TECHNOLOGY FILTER */}
      <label className="relative sm:ml-2">
        <span className="sr-only">
          Filter projects by technology
        </span>

        <select
          value={techFilter}
          onChange={(event) =>
            setTechFilter(event.target.value)
          }
          className="
            h-9 appearance-none rounded-full
            border border-border
            bg-background
            px-4 pr-9
            text-[11px] font-bold
            outline-none
            transition-colors
            hover:border-primary
            focus:border-primary
          "
        >
          {[
            'All technologies',
            'Python',
            'Django',
            'React',
            'Angular',
            'C++',
            'AI/ML',
            'Flutter',
          ].map((technology) => (
            <option key={technology}>
              {technology}
            </option>
          ))}
        </select>

        <ChevronRight
          size={13}
          className="
            pointer-events-none
            absolute right-3 top-1/2
            -translate-y-1/2 rotate-90
            text-muted-foreground
          "
        />
      </label>

      {/* PROJECT COUNT */}
      <span className="mono ml-auto hidden text-[9px] uppercase tracking-[.14em] text-muted-foreground sm:block">
        {visibleProjects.length}{' '}
        {visibleProjects.length === 1
          ? 'project'
          : 'projects'}
      </span>
    </div>
  </Reveal>

  {/* =========================
      PROJECT GRID
  ========================== */}
  {visibleProjects.length > 0 ? (
    <motion.div
      layout
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {visibleProjects.map((project, index) => {
        /*
         * A project counts as live only if
         * it contains a real demo URL.
         *
         * For non-live projects:
         * demo: ''
         */
        const hasLiveDemo =
          Boolean(project.demo) &&
          project.demo !== '#';

        /*
         * Non-live projects receive a
         * dedicated project/case-study page.
         */
        const hasDetailPage = !hasLiveDemo;

        return (
          <motion.article
            layout
            key={project.id}
            initial={{
              opacity: 0,
              y: 35,
              rotate:
                index % 2 === 0
                  ? -1.5
                  : 1.5,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}
            transition={{
              layout: {
                duration: 0.4,
                ease: [
                  0.22,
                  0.8,
                  0.28,
                  1,
                ],
              },

              opacity: {
                duration: 0.3,
                delay:
                  index * 0.04,
              },

              y: {
                duration: 0.45,
                delay:
                  index * 0.04,
              },

              rotate: {
                duration: 0.45,
                delay:
                  index * 0.04,
              },
            }}
            whileHover={{
              y: -6,
            }}
            className="
              group/project
              relative
              flex h-full flex-col
              overflow-hidden
              rounded-[1.6rem]
              border border-border
              bg-card
              transition-shadow duration-300
              hover:shadow-xl
              hover:shadow-foreground/[0.06]
            "
          >
            {/* =========================
                PROJECT VISUAL
            ========================== */}

            {hasDetailPage ? (
              /*
               * NON-LIVE PROJECT
               *
               * Screenshot area opens
               * its project page.
               */
              

              
              <button
  type="button"
  onClick={() => setSelectedProject(project)}
  className="
    relative block
    aspect-[16/10]
    w-full overflow-hidden
    text-left
  "
  aria-label={`View ${project.title} project`}
>
  {project.image ? (
    /* =========================
        REAL PROJECT SCREENSHOT
    ========================== */
    <img
      src={project.image}
      alt={`${project.title} preview`}
      className="
        absolute inset-0
        h-full w-full
        object-cover
        object-top
        transition-transform
        duration-500
        group-hover/project:scale-[1.03]
      "
    />
  ) : (
    /* =========================
        FALLBACK VISUAL
    ========================== */
    <>
      <div
        className="
          absolute inset-0
          transition-transform duration-500
          group-hover/project:scale-[1.03]
        "
        style={{
          backgroundColor: project.accent,
        }}
      />

      {/* DECORATION */}
      <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full border border-[#173c3d]/15" />

      <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full border border-[#173c3d]/15" />

      {/* MOCK APPLICATION WINDOW */}
      <div
        className="
          absolute
          left-1/2 top-1/2
          w-[76%]
          -translate-x-1/2
          -translate-y-1/2

          rounded-xl
          border border-[#173c3d]/30
          bg-[#f5efe1]/90
          p-3

          shadow-xl
          shadow-[#173c3d]/10

          transition-all
          duration-500

          group-hover/project:
          -translate-y-[52%]

          group-hover/project:
          scale-[1.04]
        "
      >
        {/* BROWSER DOTS */}
        <div className="flex gap-1.5 border-b border-[#173c3d]/10 pb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#173c3d]/45" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#173c3d]/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#173c3d]/15" />
        </div>

        {/* MOCK UI */}
        <div className="mt-3 grid grid-cols-[.65fr_1.35fr] gap-2">
          <div className="space-y-2">
            <div className="h-2 w-3/4 rounded bg-[#173c3d]/20" />

            <div className="h-10 rounded-md bg-[#173c3d]/10" />

            <div className="h-2 w-1/2 rounded bg-[#173c3d]/15" />
          </div>

          <div className="rounded-md bg-[#173c3d]/10 p-3">
            <div className="h-2 w-1/2 rounded bg-[#173c3d]/25" />

            <div className="mt-3 h-12 rounded-md border border-[#173c3d]/15" />
          </div>
        </div>
      </div>
    </>
  )}

  {/* TYPE */}
  <div className="absolute left-4 top-4 flex items-center gap-2">
    <span
      className="
        mono rounded-full
        border border-[#173c3d]/15
        bg-[#f5efe1]/90
        px-2.5 py-1
        text-[8px]
        font-semibold uppercase
        tracking-[.12em]
        text-[#173c3d]
        backdrop-blur-sm
      "
    >
      {project.type}
    </span>
  </div>

  {/* YEAR */}
  <span
    className="
      mono
      absolute right-4 top-4
      rounded-full
      bg-[#173c3d]/85
      px-2.5 py-1
      text-[8px]
      tracking-[.12em]
      text-[#f5efe1]
    "
  >
    {project.year}
  </span>
</button>
            ) : (
              /*
               * LIVE PROJECT
               *
               * Visual is presentation only.
               * It does NOT open Details.
               */
              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                className="
                   relative block
  m-4 mb-0
  aspect-[16/10]
  w-[calc(100%-2rem)]
  overflow-hidden
  rounded-[1rem]
  border border-border/70
  bg-secondary/40
  text-left
  shadow-[0_8px_25px_rgba(23,60,61,0.06)]
                "
                aria-label={`View ${project.title} project`}
              >
           {project.image ? (
  /* REAL PROJECT COVER IMAGE */
  <img
    src={project.image}
    alt={`${project.title} preview`}
    className="
        absolute inset-0
  h-full w-full
  object-contain
  object-center
  p-2
  sm:p-3
  transition-transform
  duration-500
  ease-out
  group-hover/project:scale-[1.015]
    "
  />
) : (
  /* FALLBACK WHEN PROJECT HAS NO IMAGE */
  <>
    <div
      className="
        absolute inset-0
        transition-transform duration-500
        group-hover/project:scale-[1.03]
      "
      style={{
        backgroundColor: project.accent,
      }}
    />

    {/* DECORATION */}
    <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full border border-[#173c3d]/15" />

    <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full border border-[#173c3d]/15" />

    {/* MOCK APPLICATION WINDOW */}
    <div
      className="
        absolute
        left-1/2 top-1/2
        w-[76%]
        -translate-x-1/2
        -translate-y-1/2
        rounded-xl
        border border-[#173c3d]/30
        bg-[#f5efe1]/90
        p-3
        shadow-xl
        shadow-[#173c3d]/10
        transition-all
        duration-500
        group-hover/project:-translate-y-[52%]
        group-hover/project:scale-[1.04]
      "
    >
      {/* BROWSER DOTS */}
      <div className="flex gap-1.5 border-b border-[#173c3d]/10 pb-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#173c3d]/45" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#173c3d]/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#173c3d]/15" />
      </div>

      {/* MOCK UI */}
      <div className="mt-3 grid grid-cols-[.65fr_1.35fr] gap-2">
        <div className="space-y-2">
          <div className="h-2 w-3/4 rounded bg-[#173c3d]/20" />

          <div className="h-10 rounded-md bg-[#173c3d]/10" />

          <div className="h-2 w-1/2 rounded bg-[#173c3d]/15" />
        </div>

        <div className="rounded-md bg-[#173c3d]/10 p-3">
          <div className="h-2 w-1/2 rounded bg-[#173c3d]/25" />

          <div className="mt-3 h-12 rounded-md border border-[#173c3d]/15" />
        </div>
      </div>
    </div>
  </>
)}

                {/* TYPE */}
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span
                    className="
                      mono rounded-full
                      border border-[#173c3d]/15
                      bg-[#f5efe1]/85
                      px-2.5 py-1
                      text-[8px]
                      font-semibold uppercase
                      tracking-[.12em]
                      text-[#173c3d]
                      backdrop-blur-sm
                    "
                  >
                    {project.type}
                  </span>
                </div>

                {/* YEAR */}
                <span
                  className="
                    mono
                    absolute right-4 top-4
                    rounded-full
                    bg-[#173c3d]/85
                    px-2.5 py-1
                    text-[8px]
                    tracking-[.12em]
                    text-[#f5efe1]
                  "
                >
                  {project.year}
                </span>

                {/* LIVE INDICATOR */}
                <div
                  className="
                    absolute bottom-4 left-4

                    flex items-center gap-2

                    rounded-full
                    bg-[#f5efe1]/90

                    px-3 py-1.5

                    backdrop-blur-sm
                  "
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#173c3d] opacity-30" />

                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#173c3d]" />
                  </span>

                  <span
                    className="
                      mono
                      text-[7px]
                      font-semibold
                      uppercase
                      tracking-[.1em]
                      text-[#173c3d]
                    "
                  >
                    Live
                  </span>
                </div>
              </button>
            )}

            {/* =========================
                PROJECT INFORMATION
            ========================== */}
            <div className="flex flex-1 flex-col px-6 pb-6 pt-5">

              {/* NUMBER */}
              <div className="mb-3 flex items-center justify-between">
                <span className="mono text-[9px] uppercase tracking-[.14em] text-primary">
                  Project{' '}
                  {String(index + 1).padStart(
                    2,
                    '0'
                  )}
                </span>

                <span className="h-px w-10 bg-border" />
              </div>

              {/* =========================
                  TITLE
              ========================== */}

              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                className="block text-left"
              >
                <h3
                  className="
                     display
  text-[1.35rem]
  font-semibold
  leading-[1.1]
  transition-colors
  duration-200
  group-hover/project:text-primary
                  "
                >
                  {project.title}
                </h3>
              </button>

              {/* =========================
                  ONE-LINE DESCRIPTION
              ========================== */}
              <p
                className="
                  mt-3
  line-clamp-2
  text-[13px]
  leading-[1.65]
  text-muted-foreground
                "
              >
                {project.summary}
              </p>

              {/* =========================
                  TECHNOLOGIES
              ========================== */}
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                {project.stack
                  .slice(0, 4)
                  .map((technology) => (
                    <span
                      key={technology}
                      className="
                        mono
                        text-[10px]
                        font-medium
                        tracking-[.01em]
                        text-foreground/70
                        [text-rendering:optimizeLegibility]
                        antialiased
                      "
                    >
                      {technology}
                    </span>
                  ))}

                {project.stack.length > 4 ? (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedProject(project);
                    }}
                    className="
                      mono
                      cursor-pointer
                      text-[10px]
                      font-medium
                      tracking-[.01em]
                      text-foreground/70
                      underline-offset-2
                      transition-colors
                      duration-200
                      hover:text-primary
                      hover:underline
                    "
                    aria-label={`View all ${project.stack.length} technologies used in ${project.title}`}
                  >
                    +{project.stack.length - 4}
                  </button>
                ) : null}
              </div>

              {/* =========================
                  ACTIONS
              ========================== */}
              <div
                className="
                  mt-auto
                  flex items-center
                  border-t border-border
                  pt-5
                "
              >
                {/* =====================
                    NON-LIVE PROJECT
                ====================== */}

                {hasDetailPage ? (
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="
                      group/details
                      inline-flex
                      items-center
                      gap-1.5

                      text-[11px]
                      font-bold
                      text-primary
                    "
                  >
                    View Project

                    <ArrowUpRight
                      size={13}
                      className="
                        transition-transform

                        group-hover/details:
                        translate-x-0.5

                        group-hover/details:
                        -translate-y-0.5
                      "
                    />
                  </button>
                ) : (
                  /* =====================
                      LIVE PROJECT
                  ====================== */
                  <span
                    className="
                      mono
                      text-[8px]
                      uppercase
                      tracking-[.12em]
                      text-muted-foreground
                    "
                  >
                    Available online
                  </span>
                )}

                {/* RIGHT ACTIONS */}
                <div className="ml-auto flex items-center gap-2">

                  {/* GITHUB */}
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        grid h-8 w-8
                        place-items-center

                        rounded-full
                        border border-border

                        text-muted-foreground

                        transition-all
                        duration-200

                        hover:border-primary
                        hover:bg-primary
                        hover:text-primary-foreground
                      "
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <Github size={14} />
                    </a>
                  ) : null}

                  {/* LIVE DEMO */}
                  {hasLiveDemo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        inline-flex
                        h-8
                        items-center
                        gap-1.5

                        rounded-full
                        border border-border

                        px-3

                        text-[10px]
                        font-bold

                        transition-all
                        duration-200

                        hover:border-primary
                        hover:bg-primary
                        hover:text-primary-foreground
                      "
                    >
                      Live

                      <ExternalLink
                        size={11}
                      />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </motion.article>
        );
      })}
    </motion.div>
  ) : (
    /* =========================
        EMPTY FILTER STATE
    ========================== */
    <div className="rounded-2xl border border-dashed border-border py-16 text-center">
      <p className="text-sm font-semibold">
        No projects found.
      </p>

      <p className="mt-2 text-xs text-muted-foreground">
        Try another category or technology.
      </p>

      <button
        type="button"
        onClick={() => {
          setFilter('All');
          setTechFilter(
            'All technologies'
          );
        }}
        className="mt-5 text-xs font-bold text-primary underline underline-offset-4"
      >
        Reset filters
      </button>
    </div>
  )}
</section>
        <section
          id="skills"
          className="scroll-mt-24 border-y border-border/70 bg-secondary/30 py-20 sm:py-24"
          aria-labelledby="stack-title"
        >
          <div className="section-wrap">
            <Reveal>
              <div className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
                <div>
                  <p className="eyebrow mb-4">02 / Tech stack</p>
                  <h2
                    id="stack-title"
                    className="display max-w-xl text-4xl font-semibold leading-none sm:text-5xl"
                  >
                    The tools behind the thinking.
                  </h2>
                </div>

                <p className="max-w-md text-sm leading-7 text-muted-foreground md:justify-self-end">
                  Technologies I use to build, experiment with, deploy, and explore
                  different areas of software.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="relative grid gap-4 md:grid-cols-12">
                <AmbientMark
                  className="-top-10 right-2 hidden text-2xl sm:block"
                  duration={16}
                  distance={6}
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <circle cx="4" cy="4" r="1.4" />
                    <circle cx="15" cy="4" r="1.4" />
                    <circle cx="26" cy="4" r="1.4" />
                    <circle cx="4" cy="15" r="1.4" />
                    <circle cx="15" cy="15" r="1.4" />
                    <circle cx="26" cy="15" r="1.4" />
                  </svg>
                </AmbientMark>

                {portfolio.skillGroups.map((group: SkillGroup, groupIndex: number) => {
                  const widths = [
                    'md:col-span-4',
                    'md:col-span-4',
                    'md:col-span-4',
                    'md:col-span-6',
                    'md:col-span-6',
                    'md:col-span-4',
                    'md:col-span-8',
                  ];

                  return (
                    <motion.div
                      key={group.name}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{
                        delay: groupIndex * 0.06,
                        duration: 0.4,
                        ease: 'easeOut',
                      }}
                      className={`
                        ${widths[groupIndex] ?? 'md:col-span-4'}
                        rounded-2xl border border-border bg-background/75 p-5
                        shadow-[0_4px_20px_rgba(0,0,0,0.015)]
                        transition-all duration-300
                        hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md
                      `}
                    >
                      <div className="mb-5 flex items-center justify-between border-b border-border pb-3">
                        <p className="mono text-[10px] font-bold uppercase tracking-[.16em] text-primary">
                          {group.name}
                        </p>
                        <span className="mono text-[9px] text-muted-foreground">
                          0{groupIndex + 1}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-2 min-[430px]:grid-cols-2">
                        {group.items.map((item, itemIndex) => {
                          const skill = SKILL_ICON[item];
                          const Icon = skill?.icon ?? Code2;
                          const iconColor = skill?.color ?? '#238783';

                          return (
                            <motion.div
                              key={item}
                              initial={{ opacity: 0, y: 6 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                delay: groupIndex * 0.035 + itemIndex * 0.025,
                                duration: 0.3,
                                ease: 'easeOut',
                              }}
                              className="
                                group/skill flex min-h-[58px] min-w-0 items-center gap-3
                                rounded-xl border border-border/70 bg-secondary/20
                                px-3 py-2.5 transition-all duration-200
                                hover:-translate-y-0.5 hover:border-primary/35
                                hover:bg-primary/[0.045] hover:shadow-sm
                              "
                            >
                              <div
                                className="
                                  flex h-9 w-9 shrink-0 items-center justify-center
                                  rounded-lg bg-background shadow-sm ring-1 ring-border/60
                                  transition-transform duration-200 group-hover/skill:scale-105
                                "
                              >
                                <Icon
                                  size={20}
                                  style={{ color: iconColor }}
                                  className="transition-transform duration-200 group-hover/skill:scale-110"
                                  aria-hidden
                                />
                              </div>

                              <span
                                className="
                                  min-w-0 text-[11px] font-semibold leading-[1.3]
                                  text-foreground/75 transition-colors duration-200
                                  group-hover/skill:text-foreground
                                "
                              >
                                {item}
                              </span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="experience" className="border-y border-border/70 bg-secondary/25 scroll-mt-24 py-24 sm:py-32" aria-labelledby="experience-title">
          <div className="section-wrap">
            <SectionHeading eyebrow="04 / The long view" title="A practice built on range, not noise." detail="I’m early in the journey, but serious about the craft: learn quickly, communicate clearly, ship thoughtfully." />
            <div className="grid gap-16 lg:grid-cols-[1.15fr_.85fr]">
              <div>
                {portfolio.experience.map((item, index) => (
                  <Reveal key={item.period} delay={index * 90}>
                    <div className="group grid gap-3 border-t border-border py-7 sm:grid-cols-[145px_1fr] sm:gap-8">
                      <span className="mono text-[10px] uppercase tracking-[.1em] text-muted-foreground">{item.period}</span>
                      <div>
                        <h3 id={index === 0 ? 'experience-title' : undefined} className="display text-xl font-semibold">{item.role}</h3>
                        <p className="mt-1 text-xs font-semibold text-primary">{item.place}</p>
                        <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">{item.text}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={160}>
                <div className="rounded-[1.5rem] border border-border bg-card p-7 sm:p-9">
                  <p className="eyebrow mb-7">Small wins, kept</p>
                  <div className="space-y-5">
                    {portfolio.achievements.map((item) => (
                      <div key={item.title} className="flex gap-3 text-sm leading-6">
                        <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><Check size={12} strokeWidth={3} /></span>
                        <span><strong className="font-bold">{item.title}</strong><span className="mt-1 block text-muted-foreground">{item.text}</span></span>
                      </div>
                    ))}
                  </div>
                  <a href={portfolio.links.github} target="_blank" rel="noreferrer" className="mt-9 flex items-center justify-between border-t border-border pt-5 text-sm font-bold transition-colors hover:text-primary" data-testid="link-view-github">
                    More experiments on GitHub <ArrowUpRight size={15} />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section-wrap py-24 sm:py-32" aria-labelledby="github-title">
          <div className="relative overflow-hidden rounded-[1.7rem] border border-border bg-[#16383a] p-7 text-[#f3ecd9] sm:p-12">
            <div className="absolute -right-16 -top-32 h-80 w-80 rounded-full border border-[#f3ecd9]/15" />
            <div className="absolute -bottom-40 right-16 h-96 w-96 rounded-full border border-[#f3ecd9]/10" />
            <div className="relative z-10 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="mono mb-5 text-[10px] uppercase tracking-[.18em] text-[#b9d5c6]">05 / GitHub</p>
                <h2 id="github-title" className="display max-w-xl text-4xl font-semibold leading-[.98] sm:text-6xl">Building in Public</h2>
                <p className="mt-6 max-w-lg text-sm leading-7 text-[#c6d4c9]">Small utilities, half-formed ideas, and the occasional deep dive live in public. Browse around if you like seeing how things are put together.</p>
              </div>
              <a href={portfolio.links.github} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-3 rounded-full bg-[#f3ecd9] px-5 py-3.5 text-sm font-bold text-[#16383a] transition-transform hover:-translate-y-1" data-testid="link-github-profile">
                <Github size={17} /> Visit GitHub <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="relative border-t border-border/70 scroll-mt-24 py-24 sm:py-32" aria-labelledby="contact-title">
          <AmbientMark className="right-6 top-8 hidden lg:block" duration={14} distance={6}>
            <span className="mono text-lg">+</span>
          </AmbientMark>
          <div className="section-wrap grid gap-16 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
            <Reveal>
              <p className="eyebrow mb-4">06 / Your turn</p>
              <h2 id="contact-title" className="display max-w-lg text-5xl font-semibold leading-[.92] sm:text-7xl">Let&apos;s Build Something</h2>
              <p className="mt-7 max-w-sm text-sm leading-7 text-muted-foreground">Whether you&apos;re looking for a developer, have a project idea, or simply want to connect, feel free to reach out.</p>
              <div className="mt-8 grid gap-3 text-sm">
                <a href={`mailto:${portfolio.email}`} className="inline-flex items-center gap-2 font-bold text-primary" data-testid="link-contact-email"><Mail size={15} /> {portfolio.email} <ArrowUpRight size={15} /></a>
                <a href={`tel:${portfolio.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 font-bold text-primary"><span className="text-xs">TEL</span> {portfolio.phone} <ArrowUpRight size={15} /></a>
                <a href={portfolio.links.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-bold text-primary"><Linkedin size={15} /> LinkedIn <ArrowUpRight size={15} /></a>
                <a href={portfolio.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-bold text-primary"><Github size={15} /> GitHub <ArrowUpRight size={15} /></a>
              </div>
            </Reveal>
            <Reveal delay={120}>
              {sent ? (
                <div className="flex min-h-[390px] flex-col items-center justify-center rounded-[1.5rem] border border-primary/30 bg-primary/5 p-8 text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground"><Check size={24} /></span>
                  <h3 className="display mt-6 text-3xl font-semibold">Message queued.</h3>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-muted-foreground">Thanks, {formState.name.split(' ')[0] || 'there'}. This demo form is ready to connect to your preferred inbox.</p>
                  <button type="button" onClick={() => { setSent(false); setFormState({ name: '', email: '', message: '' }); }} className="mt-7 text-sm font-bold text-primary underline underline-offset-4" data-testid="button-send-another">Send another note</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rounded-[1.5rem] border border-border bg-card p-6 sm:p-9" noValidate>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="grid gap-2 text-xs font-bold">
                      Your name
                      <input required value={formState.name} onChange={(event) => setFormState({ ...formState, name: event.target.value })} className="h-12 rounded-xl border border-input bg-background px-4 text-sm font-normal transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none" placeholder="How should I call you?" data-testid="input-contact-name" />
                    </label>
                    <label className="grid gap-2 text-xs font-bold">
                      Email address
                      <input required type="email" value={formState.email} onChange={(event) => setFormState({ ...formState, email: event.target.value })} className="h-12 rounded-xl border border-input bg-background px-4 text-sm font-normal transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none" placeholder="you@company.com" data-testid="input-contact-email" />
                    </label>
                  </div>
                  <label className="mt-6 grid gap-2 text-xs font-bold">
                    What are you thinking about?
                    <textarea required value={formState.message} onChange={(event) => setFormState({ ...formState, message: event.target.value })} className="min-h-36 resize-y rounded-xl border border-input bg-background p-4 text-sm font-normal leading-7 transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none" placeholder="A sentence or two is plenty." data-testid="textarea-contact-message" />
                  </label>
                  {formError ? <p className="mt-4 text-xs font-semibold text-destructive" role="alert" data-testid="status-form-error">{formError}</p> : null}
                  <button type="submit" className="mt-7 inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5" data-testid="button-submit-contact">
                    Send the note <Send size={15} />
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70">
        <div className="section-wrap flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <LogoMark />
            <p className="mt-3 text-xs text-muted-foreground">COMPUTER SCIENCE GRADUATE • FULL-STACK & MOBILE DEVELOPER</p>
            <p className="mt-2 text-[10px] text-muted-foreground">© 2024 Shayan Abdullah. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-5">
            <a href={portfolio.links.github} target="_blank" rel="noreferrer" className="text-muted-foreground transition-colors hover:text-foreground" aria-label="GitHub" data-testid="link-footer-github"><Github size={17} /></a>
            <a href={portfolio.links.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground transition-colors hover:text-foreground" aria-label="LinkedIn" data-testid="link-footer-linkedin"><Linkedin size={17} /></a>
            <a href={`mailto:${portfolio.email}`} className="text-muted-foreground transition-colors hover:text-foreground" aria-label="Email" data-testid="link-footer-email"><Mail size={17} /></a>
            <a href="#top" className="ml-2 grid h-9 w-9 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary" aria-label="Back to top" data-testid="link-back-to-top"><ArrowDown size={15} className="rotate-180" /></a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedProject ? (
          (() => {
            const project = selectedProject;
            const projectHasLiveDemo = Boolean(project.demo) && project.demo !== '#';
            const hasScreenshots = Boolean(project.screenshots && project.screenshots.length > 0);

            return (
              <motion.div
                key="project-overlay"
                className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#102a2b]/75 p-4 backdrop-blur-sm sm:p-6 lg:p-8"
                role="presentation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 0.8, 0.28, 1] }}
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget) setSelectedProject(null);
                }}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="project-dialog-title"
                  layoutId={`project-${project.id}`}
                  initial={{ opacity: 0, scale: 0.97, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: 10 }}
                  transition={{ duration: 0.3, ease: [0.22, 0.8, 0.28, 1] }}
                  onMouseDown={(event) => event.stopPropagation()}
                  className="max-h-[84dvh] w-full max-w-[880px] overflow-y-auto rounded-[1.35rem] border border-border bg-card shadow-2xl"
                >
                  <div className="p-5 sm:p-6 lg:p-7">
                    {/* HEADER */}
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <p className="eyebrow mb-2">
                          {project.type} / {project.year}
                        </p>
                        <h2 id="project-dialog-title" className="display text-2xl font-semibold sm:text-3xl">
                          {project.title}
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedProject(null)}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                        aria-label="Close project details"
                        data-testid="button-close-project"
                      >
                        <X size={17} />
                      </button>
                    </div>

                    <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{project.summary}</p>

                    {/* MAIN VISUAL */}
                    <div className="mt-5">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={`${project.title} screenshot`}
                          className="h-[220px] w-full rounded-xl border border-border object-cover sm:h-[270px] lg:h-[290px]"
                        />
                      ) : (
                        <ProjectVisualFallback project={project} compact />
                      )}
                    </div>

                    {/* ALL TECHNOLOGIES */}
                    <div className="mt-6">
                      <p className="eyebrow mb-2">Technologies</p>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                          <span key={item} className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* ABOUT */}
                    <div className="mt-6">
                      <p className="eyebrow mb-2">About</p>
                      <p className="text-sm leading-7 text-muted-foreground">{project.detail}</p>
                    </div>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <div>
                        <p className="eyebrow mb-2">Problem</p>
                        <p className="text-sm leading-6 text-muted-foreground">{project.problem}</p>
                      </div>
                      <div>
                        <p className="eyebrow mb-2">Solution</p>
                        <p className="text-sm leading-6 text-muted-foreground">{project.solution}</p>
                      </div>
                    </div>

                    {/* KEY FEATURES */}
                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <div>
                        <p className="eyebrow mb-2">Key features</p>
                        <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                          {project.features.map((feature) => (
                            <li key={feature}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="eyebrow mb-2">Challenges</p>
                        <p className="text-sm leading-6 text-muted-foreground">{project.challenges}</p>
                      </div>
                    </div>

                    {/* SCREENSHOT GALLERY */}
                    {hasScreenshots ? (
                      <div className="mt-6">
                        <p className="eyebrow mb-2">Gallery</p>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {project.screenshots!.map((shot, shotIndex) => (
                            <button
                              key={shot}
                              type="button"
                              onClick={() => setLightboxImage(shot)}
                              className="group/shot overflow-hidden rounded-xl border border-border"
                            >
                              <img
                                src={shot}
                                alt={`${project.title} screenshot ${shotIndex + 1}`}
                                className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover/shot:scale-[1.03]"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {/* FOOTER LINKS */}
                    <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
                      <span className="mono text-[10px] uppercase tracking-[.14em] text-muted-foreground">A selected case study</span>
                      <div className="flex flex-wrap items-center gap-4">
                        {project.github ? (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-bold text-primary"
                            data-testid={`link-project-${project.id}`}
                          >
                            GitHub <ArrowUpRight size={15} />
                          </a>
                        ) : null}
                        {projectHasLiveDemo ? (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => setSelectedProject(null)}
                            className="inline-flex items-center gap-2 text-sm font-bold text-primary"
                          >
                            Live Project <ArrowUpRight size={15} />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* SCREENSHOT LIGHTBOX */}
                <AnimatePresence>
                  {lightboxImage ? (
                    <motion.div
                      key="screenshot-lightbox"
                      className="fixed inset-0 z-[60] grid place-items-center bg-[#0b1e1f]/90 p-6"
                      role="presentation"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      onMouseDown={(event) => {
                        if (event.target === event.currentTarget) setLightboxImage(null);
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setLightboxImage(null)}
                        className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-[#f5efe1]/30 text-[#f5efe1] transition-colors hover:border-[#f5efe1] hover:text-[#f5efe1]"
                        aria-label="Close screenshot"
                      >
                        <X size={17} />
                      </button>
                      <motion.img
                        src={lightboxImage}
                        alt={`${project.title} screenshot enlarged`}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="max-h-[85dvh] max-w-full rounded-xl object-contain shadow-2xl"
                      />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })()
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default App;