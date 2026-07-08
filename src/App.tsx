import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Briefcase, 
  BookOpen, 
  Award, 
  Mail, 
  Linkedin, 
  Github, 
  ExternalLink, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Compass, 
  Server, 
  Database, 
  Cpu, 
  Terminal, 
  Users, 
  FolderGit2, 
  Smartphone, 
  Globe,
  Check,
  Send,
  X,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Predefined Projects with Rich Details for the Interactive Modal
interface Project {
  id: string;
  title: string;
  category: 'web' | 'java' | 'systems' | 'pmo';
  role: string;
  description: string;
  longDescription: string;
  technologies: string[];
  link?: string;
  highlights: string[];
  architecture?: string[];
}

const PROJECTS: Project[] = [
  {
    id: 'rehman-school',
    title: 'Rehman Public School Web Portal',
    category: 'web',
    role: 'Lead Full-Stack Web Developer',
    description: 'Designed, engineered, and deployed a responsive live web application with an eye-safe dark theme, parent inquiries, and interactive admin dashboards.',
    longDescription: 'Rehman Public School Web Portal is a fully production-ready educational platform designed to digitalize parent-school communication. It features an interactive student-parent information query module, a beautiful, high-contrast dark theme optimized for eye comfort, clean informational sections, and responsive contact flows. It was designed to replace manual processes and has successfully handled parent inquiry traffic on the live web.',
    technologies: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Responsive UI'],
    link: 'https://www.rehmanpublicschool.com',
    highlights: [
      'Engineered a live, production Web Portal hosted on a custom domain.',
      'Designed a custom, eye-safe high-contrast dark theme requested by the client.',
      'Built interactive parent-teacher inquiry portals with custom validation.',
      'Achieved 95+ Lighthouse performance, accessibility, and SEO scores.'
    ],
    architecture: [
      'Frontend: Single-Page Application with React.js & modern tailwind utilities',
      'Backend: Node.js/Express server routing for parent query records',
      'Database: Structured collection mapping in MongoDB for prompt inquiry retrievals',
      'Hosting: Production deployment on standard cloud container stack'
    ]
  },
  {
    id: 'jewelry-store',
    title: 'E-Commerce Jewelry Store',
    category: 'web',
    role: 'Full-Stack Developer',
    description: 'Advanced MERN Stack online retail portal integrated with JWT session authentication, shopping carts, and interactive checkout systems.',
    longDescription: 'A comprehensive, secured e-commerce platform built on the MERN stack. Features structured schemas for products and orders, encrypted JWT authentication for users, shopping cart caching, search filters, and an admin management interface to control jewelry inventory details in real time.',
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Tailwind CSS'],
    highlights: [
      'Implemented robust stateless JWT authentication with secure httpOnly cookie simulation.',
      'Created a dynamic, fluid shopping cart with real-time price totals and discount coupon structures.',
      'Designed a responsive grid layout optimized for retina-screen product image galleries.'
    ],
    architecture: [
      'Client: React state provider managing cart actions and user login sessions',
      'API: RESTful endpoints mapping GET, POST, PUT, DELETE for catalog management',
      'DB: MongoDB schemas with optimized indexes for product queries'
    ]
  },
  {
    id: 'match-making',
    title: 'Match-Making Application',
    category: 'java',
    role: 'Database & Backend Developer',
    description: 'Highly robust relational database application connecting users based on lifestyle filters and secure data matchmaking structures.',
    longDescription: 'An object-oriented relational database system built with Java and SQL that matches individuals for lifelong partnerships based on extensive questionnaire vectors, preferences, and automated SQL join filters. Optimized for security and high queries-per-second retrieval.',
    technologies: ['Java', 'SQL', 'JDBC', 'Database Design', 'MS Access', 'Swing UI'],
    highlights: [
      'Developed optimized relational tables with precise primary/foreign key mappings.',
      'Designed custom JDBC adapters in Java to securely capture and query questionnaire metrics.',
      'Implemented advanced SQL queries to filter compatibility scores dynamically.'
    ]
  },
  {
    id: 'mini-compiler',
    title: 'Mini Compiler for Procedural Language',
    category: 'systems',
    role: 'Compiler Developer',
    description: 'A fully functional procedural compiler engine in Python to tokenize, parse, and analyze syntactic compliance for a custom subset of C language.',
    longDescription: 'A system-level utility built in Python to simulate the front-end stages of a language compiler. It tokenizes raw text, constructs parse trees using custom grammar rules, and highlights syntactic and semantic errors for a custom-defined procedural programming language.',
    technologies: ['Python', 'Lexical Analysis', 'Compiler Design', 'Regex', 'Abstract Syntax Trees'],
    highlights: [
      'Wrote custom regular expressions and lexical analyzers to isolate language keywords.',
      'Constructed a recursive descent parser to map grammar structures into abstract syntax trees.',
      'Built helpful, detailed error logs pinpointing the exact line and character coordinates of compile-time syntax failures.'
    ]
  },
  {
    id: 'theatre-management',
    title: 'Theatre Management System',
    category: 'java',
    role: 'Lead Software Architect',
    description: 'Object-oriented seat booking and show scheduler suite enhancing real-time ticketry management, seat map arrays, and theater operational flows.',
    longDescription: 'A complete desktop application suite designed in Java OOP to handle movie theater operations. Includes real-time visual seat map selectors, movie scheduling grids, ticketing database records, and sales reporting tools for supervisors.',
    technologies: ['Java', 'Object-Oriented Programming', 'Swing UI', 'SQL', 'Multi-threading'],
    highlights: [
      'Built a rich interactive graphical seat picker showing available vs booked states.',
      'Implemented multi-threaded session locking to prevent double-booking of seats.',
      'Generated printable transaction receipt logs and summary audit files.'
    ]
  },
  {
    id: 'sports-club',
    title: 'Sports Club Management System',
    category: 'java',
    role: 'Java Developer',
    description: 'Organizes player rosters, tournament charts, team statistics, and game event scheduling lists with clean relational data modeling.',
    longDescription: 'An administrative desktop tool for municipal sports clubs. It organizes team assignments, matches schedules, ranks tournament brackets, and stores historical player metrics in a structured relational model.',
    technologies: ['Java OOP', 'Data Modeling', 'Relational Database', 'MS Access'],
    highlights: [
      'Developed tournament bracket automation logic calculating wins, losses, and point differentials.',
      'Built custom forms to easily modify player contact details and medical waiver status records.',
      'Designed clear dashboard summaries of club-wide schedules.'
    ]
  }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'web' | 'java' | 'systems'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeStackCategory, setActiveStackCategory] = useState<'frontend' | 'backend' | 'database' | 'pmo'>('frontend');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [accentColor, setAccentColor] = useState<'amber' | 'emerald'>('amber');

  // Filter projects based on selected tab
  const filteredProjects = selectedCategory === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === selectedCategory);

  // Auto-dismiss success notification
  useEffect(() => {
    if (formSubmitted) {
      const timer = setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formSubmitted]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    // Simulate API storage / feedback
    setFormSubmitted(true);
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  const accentClasses = {
    amber: {
      text: 'text-amber-400',
      textHover: 'hover:text-amber-300',
      bg: 'bg-amber-500',
      bgHover: 'hover:bg-amber-600',
      border: 'border-amber-500/30',
      borderFocus: 'focus:border-amber-500',
      ring: 'focus:ring-amber-500/20',
      glow: 'shadow-amber-500/10',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      gradient: 'from-amber-400 to-amber-600',
      bullet: 'text-amber-500'
    },
    emerald: {
      text: 'text-emerald-400',
      textHover: 'hover:text-emerald-300',
      bg: 'bg-emerald-500',
      bgHover: 'hover:bg-emerald-600',
      border: 'border-emerald-500/30',
      borderFocus: 'focus:border-emerald-500',
      ring: 'focus:ring-emerald-500/20',
      glow: 'shadow-emerald-500/10',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      gradient: 'from-emerald-400 to-emerald-600',
      bullet: 'text-emerald-500'
    }
  }[accentColor];

  // Helper to scroll smoothly
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Background Decorative Mesh Lights */}
      <div className="absolute top-0 left-0 right-0 h-[100vh] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-blue-900/10 blur-[120px]" />
        <div className={`absolute top-[-10%] right-[-10%] w-[45%] h-[55%] rounded-full bg-${accentColor}-900/10 blur-[120px] transition-all duration-700`} />
        <div className="absolute top-[60vh] left-[30%] w-[40%] h-[40%] rounded-full bg-indigo-900/5 blur-[120px]" />
      </div>

      {/* FIXED NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-md border-b border-slate-900 px-6 py-4 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo Name */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm tracking-widest text-slate-300 font-bold flex items-center gap-1.5 cursor-pointer uppercase" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <span className={`w-2 h-2 rounded-full ${accentClasses.bg} animate-pulse`} />
              Madiha Aamir
            </span>
          </div>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-slate-400">
            <button onClick={() => scrollToSection('stack-section')} className="hover:text-slate-100 transition-colors cursor-pointer">Stack</button>
            <button onClick={() => scrollToSection('projects-section')} className="hover:text-slate-100 transition-colors cursor-pointer">Projects</button>
            <button onClick={() => scrollToSection('experience-section')} className="hover:text-slate-100 transition-colors cursor-pointer">Experience</button>
            <button onClick={() => scrollToSection('education-section')} className="hover:text-slate-100 transition-colors cursor-pointer">Education</button>
            <button onClick={() => scrollToSection('contact-section')} className="hover:text-slate-100 transition-colors cursor-pointer">Contact</button>
          </nav>

          {/* Right Controls: Accent Selector & Email Shortcut */}
          <div className="flex items-center gap-4">
            {/* Theme / Accent toggler */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-1 flex items-center gap-1">
              {(['amber', 'emerald'] as const).map((color) => (
                <button
                  key={color}
                  onClick={() => setAccentColor(color)}
                  className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                    accentColor === color 
                      ? 'border-white scale-110 ring-1 ring-white/20' 
                      : 'border-transparent opacity-40 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: color === 'amber' ? '#f59e0b' : '#10b981'
                  }}
                  title={`Switch to ${color} accent`}
                />
              ))}
            </div>

            <button 
              onClick={() => scrollToSection('contact-section')}
              className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-1.5 rounded-lg border border-slate-800 bg-slate-950/60 text-slate-200 hover:border-slate-700 transition-all cursor-pointer`}
            >
              <Mail size={13} />
              <span>Hire Me</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-32">
        
        {/* HERO SECTION */}
        <section id="hero" className="flex flex-col gap-8 max-w-4xl pt-4">
          
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-950 border border-slate-800/80 px-4 py-2 rounded-full w-fit shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono tracking-wider text-slate-300">
           Open to Software Engineering Internships & Graduate Roles
            </span>
          </div>

          {/* Main Title Banner */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-sans font-extrabold tracking-tight text-white leading-[1.1] md:leading-[1.05]">
              Hi, I'm Madiha Aamir <span className={`bg-gradient-to-r ${accentClasses.gradient} bg-clip-text text-transparent font-black`}></span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl font-normal pt-2">
              Final-semester Computer Science student in Karachi, shipping production full-stack applications — from React interfaces down to deployed databases. Recently took a real client's school website from a blank repo to a live domain.
            </p>
          </div>

          {/* CTA & Link Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button 
              onClick={() => scrollToSection('projects-section')}
              className={`${accentClasses.bg} ${accentClasses.bgHover} text-slate-950 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl flex items-center gap-2.5 transition-all cursor-pointer shadow-lg shadow-black/40`}
            >
              <span>View projects</span>
              <ArrowRight size={15} />
            </button>
<a
  href="/madiha-resume (3).pdf"
  download
  className="bg-white text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-slate-200 transition"
>
Download Resume
</a>
            <button
              onClick={() => scrollToSection('contact-section')}
              className="bg-slate-950 hover:bg-slate-900 text-slate-200 border border-slate-800/80 hover:border-slate-700 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer"
            >
              <Mail size={15} className="text-slate-400" />
              <span>Get in touch</span>
            </button>

            {/* Quick Links */}
            <div className="flex items-center gap-3.5 ml-0 sm:ml-4 pl-0 sm:pl-6 border-l-0 sm:border-l border-slate-800 h-10 mt-2 sm:mt-0">
              <a 
                href="https://linkedin.com/in/madihaaamir" 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-400 hover:text-white transition-colors p-1"
                title="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="https://github.com/madiha-aamir18" 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-400 hover:text-white transition-colors p-1"
                title="GitHub Repos"
              >
                <Github size={18} />
              </a>
              <a 
                href="https://www.rehmanpublicschool.com" 
                target="_blank" 
                rel="noreferrer" 
                className={`text-slate-400 ${accentClasses.textHover} transition-colors p-1 flex items-center gap-1 text-[11px] font-mono`}
                title="Live Website"
              >
                <ExternalLink size={15} />
                <span className="hidden sm:inline">rehmanpublicschool.com</span>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 1: INTERACTIVE SKILL STACK VISUALIZER */}
        <section id="stack-section" className="scroll-mt-24 space-y-8">
          <div className="space-y-2">
            <span className={`text-xs font-mono uppercase tracking-widest ${accentClasses.text}`}>01. Technical Arsenal</span>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-white">Full-Stack Competencies</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Category Navigation (Left side) */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {[
                { id: 'frontend', name: 'Frontend Engineering', desc: 'Interfaces & User State', icon: Globe },
                { id: 'backend', name: 'Backend Services', desc: 'REST APIs & JWT Auth', icon: Server },
                { id: 'database', name: 'Databases & Storage', desc: 'SQL & NoSQL Structures', icon: Database },
                { id: 'pmo', name: 'IT Project Coordination', desc: 'Planning, Risks & Milestones', icon: Users },
              ].map((cat) => {
                const Icon = cat.icon;
                const isActive = activeStackCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveStackCategory(cat.id as any)}
                    className={`flex-1 lg:flex-initial text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3.5 whitespace-nowrap min-w-[220px] ${
                      isActive 
                        ? `bg-slate-950 border-slate-800 ${accentClasses.glow} shadow-md` 
                        : 'bg-transparent border-transparent hover:bg-slate-900/40 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className={`p-2 rounded-lg transition-colors ${isActive ? `${accentClasses.bg} text-slate-950` : 'bg-slate-950 border border-slate-800 text-slate-400'}`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <h3 className={`text-xs font-bold tracking-tight ${isActive ? 'text-white' : ''}`}>{cat.name}</h3>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">{cat.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Simulated Live Console display */}
            <div className="lg:col-span-8 bg-slate-950 border border-slate-900 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
              
              {/* Window Controls */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
              </div>

              {/* Console Banner */}
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest pb-4 border-b border-slate-900">
                <Terminal size={12} className={accentClasses.text} />
                <span>madiha-aamir@core-v8-v6: ~/{activeStackCategory}</span>
              </div>

              {/* Dynamic Content */}
              <div className="flex-1 py-6 space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStackCategory}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {activeStackCategory === 'frontend' && (
                      <>
                        <div className="space-y-1.5 font-mono text-xs">
                          <p className="text-slate-500">// Modern, state-driven interfaces with pixel-perfect responsive layouts</p>
                          <p className="text-emerald-400">STATUS: ACTIVE &amp; HIGH OPTIMIZATION</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {['React.js', 'Tailwind CSS', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'Responsive Web Design', 'JSON Integration'].map((skill, i) => (
                            <div key={i} className="bg-slate-900/30 border border-slate-800/40 p-3 rounded-lg flex items-center gap-2">
                              <span className={`text-xs ${accentClasses.text}`}>✓</span>
                              <span className="text-xs font-semibold text-slate-300">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {activeStackCategory === 'backend' && (
                      <>
                        <div className="space-y-1.5 font-mono text-xs">
                          <p className="text-slate-500">// Modular APIs, stateless session keys, and streamlined microservices</p>
                          <p className="text-indigo-400">STATUS: PRODUCTION BACKEND INTEGRATION</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {['Node.js', 'Express.js', 'MERN Stack', 'NestJS', 'RESTful API Routing', 'JWT Session Auth'].map((skill, i) => (
                            <div key={i} className="bg-slate-900/30 border border-slate-800/40 p-3 rounded-lg flex items-center gap-2">
                              <span className={`text-xs ${accentClasses.text}`}>✓</span>
                              <span className="text-xs font-semibold text-slate-300">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {activeStackCategory === 'database' && (
                      <>
                        <div className="space-y-1.5 font-mono text-xs">
                          <p className="text-slate-500">// Structured database designs, relational schema validation, and optimized indices</p>
                          <p className="text-amber-400">STATUS: RELATIONAL &amp; DOCUMENT MAPPING READY</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {['MongoDB', 'SQL', 'PostgreSQL', 'MS Access', 'Drizzle ORM', 'Schema Design'].map((skill, i) => (
                            <div key={i} className="bg-slate-900/30 border border-slate-800/40 p-3 rounded-lg flex items-center gap-2">
                              <span className={`text-xs ${accentClasses.text}`}>✓</span>
                              <span className="text-xs font-semibold text-slate-300">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {activeStackCategory === 'pmo' && (
                      <>
                        <div className="space-y-1.5 font-mono text-xs">
                          <p className="text-slate-500">// Hands-on project scheduling, risk registers, task mapping, and sprint reports</p>
                          <p className="text-rose-400">STATUS: CERTIFIED PMO METHODOLOGY TRAINED</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {['Project Planning', 'Risk Management', 'Sprint Scheduling', 'Task Coordination', 'Milestone Tracking', 'Status Reporting'].map((skill, i) => (
                            <div key={i} className="bg-slate-900/30 border border-slate-800/40 p-3 rounded-lg flex items-center gap-2">
                              <span className={`text-xs ${accentClasses.text}`}>✓</span>
                              <span className="text-xs font-semibold text-slate-300">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Console Footer Info */}
              <div className="border-t border-slate-900 pt-4 flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-500">
                <span>Modules: 4 compiled successfully</span>
                <span className="text-slate-400">Ready for full-stack tasks</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: PROJECTS & FLAGSHIP SHOWCASE */}
        <section id="projects-section" className="scroll-mt-24 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className={`text-xs font-mono uppercase tracking-widest ${accentClasses.text}`}>02. Engineering Deeds</span>
              <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-white">Selected Applications</h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-900 text-xs font-mono self-start md:self-auto overflow-x-auto max-w-full scrollbar-none">
              {[
                { id: 'all', name: 'All Work' },
                { id: 'web', name: 'MERN & Web' },
                { id: 'java', name: 'Java & OOP' },
                { id: 'systems', name: 'Systems' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === tab.id 
                      ? 'bg-slate-900 text-white font-bold' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {filteredProjects.map((project) => {
              const isFlagship = project.id === 'rehman-school';
              return (
                <div 
                  key={project.id}
                  className={`bg-slate-950 rounded-2xl p-6 border transition-all flex flex-col justify-between group ${
                    isFlagship 
                      ? `border-${accentColor}-500/20 md:col-span-2 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-950 to-${accentColor}-950/10` 
                      : 'border-slate-900 hover:border-slate-800'
                  }`}
                >
                  {/* Subtle Glowing Badge for Flagship */}
                  {isFlagship && (
                    <div className="absolute -top-3 -right-3 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                  )}

                  <div className="space-y-4">
                    {/* Top Row: Category Tag & Links */}
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 ${accentClasses.text}`}>
                        {project.category === 'web' ? 'MERN Stack' : project.category === 'java' ? 'Java Development' : 'Systems Utility'}
                      </span>
                      
                      {project.link ? (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-xs font-mono"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Live Site</span>
                          <ExternalLink size={13} />
                        </a>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-600">Local Repository</span>
                      )}
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-lg font-sans font-bold text-white group-hover:text-amber-400 transition-colors flex items-center gap-2">
                        <span>{project.title}</span>
                        {isFlagship && <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md border border-amber-500/25">Flagship</span>}
                      </h3>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">Role: {project.role}</p>
                      <p className="text-xs text-slate-400 leading-relaxed mt-3 max-w-3xl">
                        {project.description}
                      </p>
                    </div>

                    {/* Technologies tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="bg-slate-900/60 border border-slate-800/40 text-[10px] font-mono text-slate-300 px-2.5 py-1 rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions / View Details */}
                  <div className="border-t border-slate-900/60 pt-4 mt-6 flex items-center justify-between">
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1 font-mono cursor-pointer"
                    >
                      <span>Explore details</span>
                      <ChevronRight size={13} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                    
                    {isFlagship && (
                      <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">www.rehmanpublicschool.com</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: WORK HISTORY & EXPERIENCE */}
        <section id="experience-section" className="scroll-mt-24 space-y-8">
          <div className="space-y-2">
            <span className={`text-xs font-mono uppercase tracking-widest ${accentClasses.text}`}>03. Professional Exposure</span>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-white">Professional Experience</h2>
          </div>

          <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Core Card Timeline */}
            <div className="relative border-l border-slate-800 pl-6 sm:pl-8 space-y-6">
              
              {/* Timeline Bullet */}
              <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500 border-2 border-slate-950" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h3 className="text-md font-sans font-extrabold text-white">PMO Intern</h3>
                  <p className="text-xs font-mono text-slate-300">UBL – IT Project Management Office</p>
                </div>
                <div className="text-right sm:text-right text-left">
                  <span className="bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400 px-3 py-1 rounded-full">
                    Aug 2025 – Oct 2025
                  </span>
                  <p className="text-[10px] font-mono text-slate-500 mt-1">Karachi, Pakistan</p>
                </div>
              </div>

              {/* Bullet Accomplishments */}
              <ul className="space-y-3.5 text-xs text-slate-400 leading-relaxed max-w-4xl list-disc pl-4 marker:text-indigo-400">
                <li>
                  Active coordination and tracking of high-priority IT deployment projects, consolidating sprint statistics, updating project scheduling documents, and translating key metrics into status reports for management.
                </li>
                <li>
                  Gained extensive, structured exposure to enterprise planning frameworks, operational risk management registers, sprint coordination, and departmental resource tracking workflows.
                </li>
              </ul>

              {/* PMO Tools Highlight */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono text-slate-500 mr-2">Key Frameworks:</span>
                {['Agile Sprint Tracking', 'Risk Analysis Registers', 'Task Scheduling', 'Resource Allocation', 'Milestone Reports'].map((tool, idx) => (
                  <span key={idx} className="bg-slate-900 text-[9px] font-mono text-indigo-400 border border-indigo-950 px-2.5 py-0.5 rounded-md">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: EDUCATION & COURSES */}
        <section id="education-section" className="scroll-mt-24 space-y-8">
          <div className="space-y-2">
            <span className={`text-xs font-mono uppercase tracking-widest ${accentClasses.text}`}>04. Academic Foundation</span>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-white">Academic Qualifications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            
            {/* Primary Degree Card */}
            <div className="md:col-span-7 bg-slate-950 border border-slate-900 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-md font-sans font-bold text-white">Bachelor of Computer Science (BSCS)</h3>
                    <p className="text-xs font-mono text-slate-400">Bahria University Karachi Campus</p>
                  </div>
                  <span className={`bg-amber-500/10 border border-amber-500/25 ${accentClasses.text} text-[10px] font-mono px-3 py-1 rounded-full`}>
                   Bachelor of Computer Science
Expected Graduation: 2026
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed pt-2">
                  Currently completing final-semester coursework and projects at Bahria University Karachi Campus, focusing heavily on software design methodologies, web application engineering, and enterprise database systems.
                </p>
              </div>

              <div className="border-t border-slate-900/80 pt-4 mt-6 flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span>Enrollment: Spring 2023 - Present</span>
                <span>Karachi, PK</span>
              </div>
            </div>

            {/* Coursework Directory */}
            <div className="md:col-span-5 bg-slate-950 border border-slate-900 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-1.5">
                  <BookOpen size={13} className={accentClasses.text} />
                  <span>Key Coursework</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-slate-300">
                  {[
                    'Data Structures & Algorithms',
                    'Database Management Systems',
                    'Software Project Management',
                    'Software Requirement Engineering',
                    'Web Application Development',
                    'Cloud Computing Systems',
                    'Assembly Language Programming',
                    'Object-Oriented Design'
                  ].map((course, i) => (
                    <div key={i} className="flex gap-1.5 items-start">
                      <span className={`text-[10px] ${accentClasses.text}`}>•</span>
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: CERTIFICATIONS */}
        <section id="certifications-section" className="space-y-8">
          <div className="space-y-2">
            <span className={`text-xs font-mono uppercase tracking-widest ${accentClasses.text}`}>05. Credentials</span>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-white">Certifications & Honors</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Certificate of Participation in Query Quest',
                issuer: 'Bahria University',
                desc: 'Demonstrated speed and mastery in writing complex SQL relational database queries under timed competitive constraints.',
                icon: Database,
                color: 'text-amber-400'
              },
              {
                title: 'PMO Internship Certificate',
                issuer: 'United Bank Limited (UBL)',
                desc: 'Official work credential confirming successful completion of IT project management coordination tenure with exemplary performance indices.',
                icon: Award,
                color: 'text-indigo-400'
              }
            ].map((cert, i) => {
              const Icon = cert.icon;
              return (
                <div key={i} className="bg-slate-950 border border-slate-900 p-5 rounded-xl flex gap-4 items-start">
                  <div className={`p-2.5 rounded-lg bg-slate-900 border border-slate-800 ${cert.color}`}>
                    <Icon size={18} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-white leading-snug">{cert.title}</h3>
                    <p className="text-[10px] font-mono text-slate-500">{cert.issuer}</p>
                    <p className="text-xs text-slate-400 leading-relaxed pt-1.5">{cert.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 6: GET IN TOUCH CONTACT */}
        <section id="contact-section" className="scroll-mt-24 max-w-4xl mx-auto space-y-8 pb-10">
          <div className="space-y-2 text-center">
            <span className={`text-xs font-mono uppercase tracking-widest ${accentClasses.text}`}>06. Let's Work Together</span>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-white">Get in Touch</h2>
            <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
              I'm always interested in internships, entry-level software engineering roles, freelance projects, and collaborating on exciting ideas. Feel free to reach out through email or LinkedIn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch pt-2">
            
            {/* Quick Contact Links */}
            <div className="md:col-span-5 space-y-4 flex flex-col justify-between">
              
              <div className="space-y-3">
                {/* Email Direct link */}
                <a 
                  href="mailto:madihaaamir2004@gmail.com"
                  className="block p-4 bg-slate-950 border border-slate-900 hover:border-slate-800 rounded-xl transition-all group"
                >
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Direct Mailbox</p>
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-400 mt-1">madihaaamir2004@gmail.com</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Click to launch your email client</p>
                </a>

                {/* LinkedIn Link */}
                <a 
                  href="https://linkedin.com/in/madihaaamir"
                  target="_blank"
                  rel="noreferrer"
                  className="block p-4 bg-slate-950 border border-slate-900 hover:border-slate-800 rounded-xl transition-all group"
                >
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Professional Network</p>
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-400 mt-1">linkedin.com/in/madihaaamir</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Let's connect and sync profiles</p>
                </a>

                {/* GitHub Link */}
                <a 
                  href="https://github.com/madiha-aamir18"
                  target="_blank"
                  rel="noreferrer"
                  className="block p-4 bg-slate-950 border border-slate-900 hover:border-slate-800 rounded-xl transition-all group"
                >
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Open Source Repos</p>
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-400 mt-1">github.com/madiha-aamir18</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Explore repository structures and source codes</p>
                </a>
              </div>

              {/* Status Note */}
              <div className="p-4 bg-slate-950/60 border border-slate-900/80 rounded-xl font-mono text-[11px] text-slate-500 leading-relaxed">
                <p className="text-slate-400 font-bold mb-1">// Response Metrics</p>
                Normally replies within 24 hours. Based in Karachi, Pakistan (GMT+5). Fully equipped for remote development workspace settings.
              </div>
            </div>

            {/* Interactive Contact Form (Mock Action) */}
            <div className="md:col-span-7 bg-slate-950 border border-slate-900 p-6 rounded-2xl relative overflow-hidden">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Your Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. M. Rehman"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className={`w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-white focus:outline-hidden ${accentClasses.borderFocus} ${accentClasses.ring} transition-all`}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-300">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="name@company.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className={`w-full bg-[#030712] border border-slate-900 rounded-xl p-3 text-xs text-white focus:outline-hidden ${accentClasses.borderFocus} ${accentClasses.ring} transition-all`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Your Message</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Describe your web project details or inquiries..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className={`w-full bg-[#030712] border border-slate-900 rounded-xl p-3 text-xs text-white focus:outline-hidden ${accentClasses.borderFocus} ${accentClasses.ring} transition-all resize-none`}
                  />
                </div>

                <button 
                  type="submit"
                  className={`w-full ${accentClasses.bg} ${accentClasses.bgHover} text-slate-950 font-bold text-xs px-5 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md`}
                >
                  <Send size={13} />
                  <span>Submit Message Inquiry</span>
                </button>
              </form>

              {/* Toast Success Overlay */}
              <AnimatePresence>
                {formSubmitted && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#030712]/95 flex flex-col items-center justify-center text-center p-6"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 animate-bounce">
                      <Check size={20} />
                    </div>
                    <h4 className="text-sm font-bold text-white">Inquiry Successfully Simmed!</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
                      Thank you for submitting. This simulation successfully captured your name and email. Feel free to also send an email to <span className={accentClasses.text}>madihaaamir2004@gmail.com</span>!
                    </p>
                    <button 
                      onClick={() => setFormSubmitted(false)}
                      className="mt-4 text-[10px] font-mono text-slate-500 hover:text-slate-300 underline cursor-pointer"
                    >
                      Back to form
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 py-10 mt-20 text-center text-xs text-slate-500 bg-[#02050e]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px]">
          <p>© 2026 Madiha Aamir. All rights reserved.</p>
          <p className="text-slate-600">
            Handcrafted with React, Tailwind &amp; Motion.Built with React • TypeScript • Tailwind CSS • Motion
          </p>
        </div>
      </footer>

      {/* PROJECT EXPLORE MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden z-10 flex flex-col"
            >
              {/* Top Bar with close button */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-900 bg-slate-950">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Project Blueprint</span>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
                  title="Close Modal"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Content Scroll */}
              <div className="p-6 overflow-y-auto max-h-[75vh] space-y-6">
                
                {/* Title */}
                <div>
                  <h3 className="text-xl font-sans font-extrabold text-white">{selectedProject.title}</h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">Role: {selectedProject.role}</p>
                </div>

                {/* Extended Paragraph */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-500">// Project Context</h4>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/30 p-4 rounded-xl border border-slate-900/60">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>
                </div>

                {/* Highlights List */}
                {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                  <div className="space-y-2.5">
                    <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-500">// Major Milestones & Achievements</h4>
                    <ul className="space-y-2 text-xs text-slate-400 pl-4 list-disc marker:text-amber-500 leading-relaxed">
                      {selectedProject.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Architecture details if available */}
                {selectedProject.architecture && selectedProject.architecture.length > 0 && (
                  <div className="space-y-2.5">
                    <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-500">// System Architecture Stack</h4>
                    <div className="bg-slate-900/50 rounded-xl border border-slate-900 p-4 space-y-2 text-[11px] font-mono text-slate-300">
                      {selectedProject.architecture.map((arch, i) => (
                        <div key={i} className="flex gap-2">
                          <span className="text-slate-500">&gt;</span>
                          <span>{arch}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies and Direct Actions */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-500">// Built with</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span key={idx} className="bg-slate-900/80 border border-slate-800 text-[10px] font-mono text-slate-200 px-3 py-1 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Drawer Actions */}
              <div className="px-6 py-4 border-t border-slate-900 bg-slate-950/80 flex items-center justify-between">
                {selectedProject.link ? (
                  <a 
                    href={selectedProject.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`bg-amber-500 text-slate-950 hover:bg-amber-600 font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all`}
                  >
                    <span>Launch Live Website</span>
                    <ExternalLink size={13} />
                  </a>
                ) : (
                  <span className="text-[10px] font-mono text-slate-500">Local Offline System</span>
                )}

                <button 
                  onClick={() => setSelectedProject(null)}
                  className="bg-slate-900 hover:bg-slate-850 text-slate-300 text-xs px-4 py-2 rounded-lg border border-slate-800 transition-colors cursor-pointer"
                >
                  Close Blueprint
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
