'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Code2, 
  FolderTree, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  Layers, 
  Globe2, 
  ChevronDown, 
  Star, 
  Play, 
  Bot, 
  Database, 
  Box, 
  Download, 
  Check, 
  HelpCircle,
  ExternalLink,
  Laptop,
  Flame,
  User,
  Layout,
  Server
} from 'lucide-react';
import { NavItem } from '@/lib/types';

interface LandingPageProps {
  onNavigate: (view: NavItem) => void;
  onQuickStartPrompt?: (prompt: string) => void;
}

// Motion Animation Variants for Scroll & In-View Animations
const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onQuickStartPrompt }) => {
  // Hero interactive prompt state
  const [heroPrompt, setHeroPrompt] = useState(
    'Build an AI CRM using Next.js, Spring Boot, PostgreSQL, Docker, and Clean Architecture.'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'tree' | 'summary' | 'docker'>('tree');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleHeroGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      if (onQuickStartPrompt) {
        onQuickStartPrompt(heroPrompt);
      } else {
        onNavigate('generator');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white scroll-smooth">
      
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => onNavigate('dashboard')}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-blue-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <div>
            <span className="font-black text-lg text-white tracking-tight">AI Project Studio</span>
            <span className="ml-2 px-2 py-0.5 text-[9px] font-black rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase">v2.5 Enterprise</span>
          </div>
        </motion.div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#tech-stack" className="hover:text-white transition-colors">Tech Stack</a>
          <a href="#templates" className="hover:text-white transition-colors">Templates</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-3.5 py-2 text-xs font-bold text-slate-300 hover:text-white transition-colors hidden sm:block cursor-pointer"
          >
            Dashboard
          </button>
          <button
            onClick={() => onNavigate('generator')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs transition-all shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Launch Generator</span>
          </button>
        </motion.div>
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[250px] bg-purple-600/15 blur-[100px] rounded-full pointer-events-none" />

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          className="text-center max-w-3xl mx-auto space-y-4 mb-12"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wide"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Next-Gen Enterprise Code Synthesis</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Turn Any Prompt into Production-Ready <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">Code Architecture</span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Generate full-stack boilerplates, microservices, Docker files, database migrations, and OpenAPI specs in seconds using modern clean architecture principles.
          </p>
        </motion.div>

        {/* Hero Interactive Mockup Grid */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
        >
          
          {/* Left Column: Interactive Prompt Box */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-6 bg-slate-900/90 rounded-3xl border border-slate-800 p-6 shadow-2xl flex flex-col justify-between space-y-6 relative group hover:border-slate-700/80 transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] font-mono text-slate-400">PROMPT INPUT CONSOLE</span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  <span>Describe Your Application Stack</span>
                </label>
                <textarea
                  value={heroPrompt}
                  onChange={(e) => setHeroPrompt(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 leading-relaxed resize-none shadow-inner"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono">
                <div className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 flex items-center justify-between">
                  <span className="text-slate-500">Frontend:</span>
                  <span className="text-blue-400 font-bold">Next.js 15</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 flex items-center justify-between">
                  <span className="text-slate-500">Backend:</span>
                  <span className="text-emerald-400 font-bold">Spring Boot</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 flex items-center justify-between">
                  <span className="text-slate-500">Database:</span>
                  <span className="text-purple-400 font-bold">PostgreSQL</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 flex items-center justify-between">
                  <span className="text-slate-500">Pattern:</span>
                  <span className="text-amber-400 font-bold">Clean Arch</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleHeroGenerate} className="pt-2">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-xs tracking-wide transition-all shadow-xl shadow-blue-600/20 cursor-pointer flex items-center justify-center gap-2 group-hover:scale-[1.01]"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Compiling Architecture Blueprint...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                    <span>GENERATE FULL PROJECT ARCHITECTURE</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Right Column: Live Folder Tree & Output Summary Preview */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-6 bg-slate-900/90 rounded-3xl border border-slate-800 p-6 shadow-2xl flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <FolderTree className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white">Generated Project Structure</span>
                </div>

                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[10px] font-mono">
                  <button
                    onClick={() => setActiveTab('tree')}
                    className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      activeTab === 'tree' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Files Tree
                  </button>
                  <button
                    onClick={() => setActiveTab('summary')}
                    className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      activeTab === 'summary' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Summary
                  </button>
                  <button
                    onClick={() => setActiveTab('docker')}
                    className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      activeTab === 'docker' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Docker
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="mt-4 min-h-[220px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'tree' && (
                    <motion.div 
                      key="tree"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2 font-mono text-xs"
                    >
                      <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 text-slate-300 space-y-1.5 max-h-[240px] overflow-y-auto">
                        <div className="text-blue-400 font-bold flex items-center gap-1.5">
                          <FolderTree className="w-3.5 h-3.5" />
                          <span>ai-crm-enterprise-solution/</span>
                        </div>
                        <div className="pl-4 space-y-1 text-[11px]">
                          <div className="text-slate-400 flex items-center justify-between py-0.5 border-b border-slate-900">
                            <span>├── src/main/java/domain/Customer.java</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">Clean Entity</span>
                          </div>
                          <div className="text-slate-400 flex items-center justify-between py-0.5 border-b border-slate-900">
                            <span>├── src/main/java/services/AIService.java</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300">Spring Boot</span>
                          </div>
                          <div className="text-slate-400 flex items-center justify-between py-0.5 border-b border-slate-900">
                            <span>├── frontend/app/customers/page.tsx</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300">Next.js 15</span>
                          </div>
                          <div className="text-slate-400 flex items-center justify-between py-0.5 border-b border-slate-900">
                            <span>├── docker-compose.yml</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">Postgres + App</span>
                          </div>
                          <div className="text-slate-400 flex items-center justify-between py-0.5">
                            <span>└── OpenAPI_v3_Spec.yaml</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300">Swagger</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'summary' && (
                    <motion.div 
                      key="summary"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-3 font-mono"
                    >
                      <div className="flex justify-between items-center text-blue-400 font-bold border-b border-slate-900 pb-2">
                        <span>PROJECT METRICS</span>
                        <span>100% CLEAN ARCHITECTURE</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>Total Files: <span className="text-white font-bold">48 files</span></div>
                        <div>Lines of Code: <span className="text-white font-bold">~4,200 LOC</span></div>
                        <div>Build Tool: <span className="text-white font-bold">Maven + npm</span></div>
                        <div>Containerization: <span className="text-white font-bold">Multi-stage Docker</span></div>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-normal pt-1">
                        Enforces explicit domain layer separation, repository pattern interfaces, DTO validations, and CORS security headers.
                      </p>
                    </motion.div>
                  )}

                  {activeTab === 'docker' && (
                    <motion.div 
                      key="docker"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto whitespace-pre"
                    >
                      <span className="text-slate-500"># Docker Compose Multi-Container Definition</span>{'\n'}
                      <span className="text-purple-400">version:</span> <span className="text-emerald-300">&apos;3.8&apos;</span>{'\n'}
                      <span className="text-purple-400">services:</span>{'\n'}
                      {'  '}<span className="text-blue-400">backend:</span>{'\n'}
                      {'    '}<span className="text-slate-400">build: ./ai-crm-core</span>{'\n'}
                      {'    '}<span className="text-slate-400">ports: [&quot;8080:8080&quot;]</span>{'\n'}
                      {'  '}<span className="text-blue-400">db:</span>{'\n'}
                      {'    '}<span className="text-slate-400">image: postgres:16-alpine</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Hallucinations Guarantee</span>
              </span>

              <button
                onClick={() => onNavigate('generator')}
                className="text-blue-400 hover:text-blue-300 font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <span>Customize in Full Generator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* 2. TRUSTED BY DEVELOPERS SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUpVariants}
        className="py-12 border-y border-slate-800/80 bg-slate-950/60"
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center space-y-6">
          <p className="text-xs font-bold text-slate-400 tracking-widest uppercase">
            Trusted by over 45,000+ Software Engineers & Tech Leads Worldwide
          </p>

          <motion.div 
            variants={staggerContainerVariants}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-center opacity-70 grayscale hover:grayscale-0 transition-all"
          >
            {['MetaTech', 'StripeInc', 'VercelLab', 'CloudScale', 'OpenEngine', 'DataSphere'].map((brand, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="p-3 font-mono font-black text-sm tracking-tighter text-slate-400 border border-slate-800/60 rounded-xl bg-slate-900/40"
              >
                {`//${brand}`}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 3. FEATURES SECTION */}
      <motion.section 
        id="features" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeInUpVariants}
        className="py-20 px-4 lg:px-8 max-w-7xl mx-auto space-y-12"
      >
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-xs font-bold text-blue-400 tracking-widest uppercase">Enterprise Capabilities</h2>
          <h3 className="text-3xl font-black text-white tracking-tight">
            Built for Developers Who Require Architectural Rigor
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm">
            Everything you need to launch enterprise applications without repetitive boilerplate overhead.
          </p>
        </div>

        <motion.div 
          variants={staggerContainerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: <Layers className="w-6 h-6 text-blue-400" />,
              title: 'Clean Architecture Enforcement',
              desc: 'Generates strict domain models, application use-cases, persistence adapters, and REST/GraphQL controllers.',
              badge: 'Architectural Best Practices'
            },
            {
              icon: <Box className="w-6 h-6 text-emerald-400" />,
              title: 'Docker & Kubernetes Ready',
              desc: 'Multi-stage Dockerfiles, Docker Compose stacks, and Helm charts auto-configured for immediate deployment.',
              badge: 'DevOps Automated'
            },
            {
              icon: <Bot className="w-6 h-6 text-purple-400" />,
              title: 'AI Agent Autonomous Code Review',
              desc: 'Integrates specialized AI Agents (Claude, Gemini, GPT-4o) to lint and verify clean code standards.',
              badge: 'Autonomous AI'
            },
            {
              icon: <Code2 className="w-6 h-6 text-amber-400" />,
              title: 'Full Stack Multi-Language Support',
              desc: 'Mix and match Next.js, Spring Boot, FastAPI, Go Fiber, NestJS, Flutter, or React Native in a single project.',
              badge: 'Polyglot Support'
            },
            {
              icon: <Database className="w-6 h-6 text-rose-400" />,
              title: 'Automated DB Migration & Schemas',
              desc: 'Includes Prisma, Liquibase, Flyway, or Drizzle schema migrations with index optimizations.',
              badge: 'Database First'
            },
            {
              icon: <Download className="w-6 h-6 text-indigo-400" />,
              title: 'Instant ZIP & GitHub Export',
              desc: 'Download fully compilable source archives or push directly to a new private GitHub repository.',
              badge: 'One-Click Export'
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  {item.badge}
                </span>
              </div>
              <h4 className="text-base font-bold text-white">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* 4. HOW IT WORKS SECTION */}
      <motion.section 
        id="how-it-works" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeInUpVariants}
        className="py-20 px-4 lg:px-8 max-w-7xl mx-auto bg-slate-900/40 rounded-3xl border border-slate-800/80 my-12 space-y-12"
      >
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-xs font-bold text-emerald-400 tracking-widest uppercase">Streamlined Workflow</h2>
          <h3 className="text-3xl font-black text-white tracking-tight">From Prompt to Compilable Code in 4 Steps</h3>
        </div>

        <motion.div 
          variants={staggerContainerVariants}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { step: '01', title: 'Specify Prompt & Tech', desc: 'Type your project goal and select preferred frameworks and database layers.' },
            { step: '02', title: 'AI Code Synthesis', desc: 'Our multi-agent pipeline generates clean architecture domain models & APIs.' },
            { step: '03', title: 'Interactive Inspection', desc: 'Review folder structures, inspect source files, and preview Docker specs.' },
            { step: '04', title: 'Deploy or Export', desc: 'Download as ZIP or deploy to Cloud Run / Vercel with a single click.' }
          ].map((s, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 relative space-y-3"
            >
              <span className="text-2xl font-black font-mono text-blue-500/40">{s.step}</span>
              <h4 className="text-sm font-bold text-white">{s.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* 5. TECHNOLOGY STACK SECTION */}
      <motion.section 
        id="tech-stack" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeInUpVariants}
        className="py-16 px-4 lg:px-8 max-w-7xl mx-auto space-y-8"
      >
        <div className="text-center space-y-2">
          <h2 className="text-xs font-bold text-purple-400 tracking-widest uppercase">Supported Technologies</h2>
          <h3 className="text-2xl font-black text-white">Full Polyglot Framework Ecosystem</h3>
        </div>

        <motion.div 
          variants={staggerContainerVariants}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center"
        >
          {[
            { name: 'Next.js 15', category: 'Frontend' },
            { name: 'Spring Boot 3', category: 'Backend' },
            { name: 'PostgreSQL 16', category: 'Database' },
            { name: 'Docker', category: 'DevOps' },
            { name: 'FastAPI', category: 'Python' },
            { name: 'Go Fiber', category: 'Microservice' },
            { name: 'NestJS', category: 'TypeScript' },
            { name: 'Flutter', category: 'Mobile' },
            { name: 'GraphQL', category: 'API' },
            { name: 'Kubernetes', category: 'Orchestration' },
            { name: 'Tailwind CSS', category: 'Styling' },
            { name: 'Prisma ORM', category: 'Data Layer' }
          ].map((tech, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="text-xs font-bold text-white">{tech.name}</div>
              <div className="text-[10px] text-slate-500 mt-1 font-mono">{tech.category}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* 6. AI AGENT SUPPORT */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeInUpVariants}
        className="py-20 px-4 lg:px-8 max-w-7xl mx-auto space-y-12"
      >
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-xs font-bold text-amber-400 tracking-widest uppercase">Multi-Model AI Engine</h2>
          <h3 className="text-3xl font-black text-white">Powered by Top AI Coding Agents</h3>
        </div>

        <motion.div 
          variants={staggerContainerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { name: 'Gemini 2.5 Flash', provider: 'Google AI', trait: 'Ultra-fast multi-file synthesis & context window' },
            { name: 'Claude 3.7 Sonnet', provider: 'Anthropic', trait: 'Deep architectural reasoning & clean code precision' },
            { name: 'GPT-4o Enterprise', provider: 'OpenAI', trait: 'Robust pattern synthesis & API spec creation' }
          ].map((agent, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-base">{agent.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">{agent.provider}</span>
              </div>
              <p className="text-xs text-slate-400">{agent.trait}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* 7. PROJECT TEMPLATES */}
      <motion.section 
        id="templates" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeInUpVariants}
        className="py-20 px-4 lg:px-8 max-w-7xl mx-auto space-y-12"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xs font-bold text-blue-400 tracking-widest uppercase">Ready Blueprints</h2>
            <h3 className="text-3xl font-black text-white">Popular Starter Templates</h3>
          </div>
          <button
            onClick={() => onNavigate('templates')}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-slate-800 cursor-pointer self-start sm:self-auto"
          >
            Explore All 24+ Templates →
          </button>
        </div>

        <motion.div 
          variants={staggerContainerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { title: 'AI CRM Enterprise SaaS', stack: 'Next.js + Spring Boot + Postgres', rating: '5.0' },
            { title: 'Fintech Payment Gateway', stack: 'Go Fiber + PostgreSQL + Stripe', rating: '4.9' },
            { title: 'Realtime Chat & Collaboration', stack: 'NestJS + Redis + WebSockets', rating: '4.8' }
          ].map((tpl, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-blue-400">TEMPLATE</span>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{tpl.rating}</span>
                </div>
              </div>
              <h4 className="text-lg font-bold text-white">{tpl.title}</h4>
              <p className="text-xs text-slate-400 font-mono">{tpl.stack}</p>
              <button
                onClick={() => {
                  if (onQuickStartPrompt) onQuickStartPrompt(tpl.title);
                  else onNavigate('generator');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-200 font-bold text-xs transition-colors cursor-pointer"
              >
                Launch Template
              </button>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* 8. CUSTOMER TESTIMONIALS */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeInUpVariants}
        className="py-20 px-4 lg:px-8 max-w-7xl mx-auto space-y-12 bg-slate-900/30 rounded-3xl border border-slate-800/80"
      >
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-xs font-bold text-rose-400 tracking-widest uppercase">Developer Reviews</h2>
          <h3 className="text-3xl font-black text-white">Loved by Engineers & Architects</h3>
        </div>

        <motion.div 
          variants={staggerContainerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { quote: "Cut our boilerplate setup time from 3 days to under 60 seconds. Clean architecture guarantees our team complies with standards.", author: "Marcus Vance", role: "Principal Architect, CloudScale" },
            { quote: "Generating Docker Compose files and PostgreSQL migration scripts automatically saved us countless DevOps hours.", author: "Elena Rostova", role: "Lead Engineer, TechFlow" },
            { quote: "The best project code generator on the market. Produces actual production-grade code, not half-baked snippets.", author: "David Chen", role: "CTO, NextGen SaaS" }
          ].map((t, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4"
            >
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <div className="text-xs font-bold text-white">{t.author}</div>
                <div className="text-[10px] text-slate-500 font-mono">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* 9. PRICING SECTION */}
      <motion.section 
        id="pricing" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeInUpVariants}
        className="py-20 px-4 lg:px-8 max-w-7xl mx-auto space-y-12"
      >
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-xs font-bold text-emerald-400 tracking-widest uppercase">Simple Transparent Pricing</h2>
          <h3 className="text-3xl font-black text-white">Start Free, Scale as You Grow</h3>

          <div className="inline-flex items-center bg-slate-900 p-1 rounded-2xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${
                billingCycle === 'monthly' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'yearly' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] uppercase">Save 20%</span>
            </button>
          </div>
        </div>

        <motion.div 
          variants={staggerContainerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
        >
          {/* Starter Plan */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase">Hobby & Solo</span>
              <h4 className="text-2xl font-black text-white">Developer Free</h4>
              <div className="text-3xl font-black text-white font-mono">$0 <span className="text-xs text-slate-500 font-sans">/ month</span></div>
              <p className="text-xs text-slate-400">Perfect for exploring code synthesis and solo side projects.</p>
              <ul className="space-y-2 text-xs text-slate-300 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 5 Project Generations / Mo</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Next.js & Node.js Stacks</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> ZIP Source Downloads</li>
              </ul>
            </div>
            <button onClick={() => onNavigate('generator')} className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer">
              Get Started Free
            </button>
          </motion.div>

          {/* Pro Plan */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
            className="p-8 rounded-3xl bg-gradient-to-b from-blue-900/40 via-slate-900 to-slate-900 border-2 border-blue-500 flex flex-col justify-between space-y-6 relative shadow-2xl"
          >
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider">
              MOST POPULAR
            </span>
            <div className="space-y-4">
              <span className="text-xs font-bold text-blue-400 uppercase">Professional</span>
              <h4 className="text-2xl font-black text-white">Pro Developer</h4>
              <div className="text-3xl font-black text-white font-mono">
                {billingCycle === 'yearly' ? '$29' : '$39'} <span className="text-xs text-slate-500 font-sans">/ month</span>
              </div>
              <p className="text-xs text-slate-400">For active developers building multi-tier production services.</p>
              <ul className="space-y-2 text-xs text-slate-200 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited Project Generations</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> All Languages & Frameworks</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Clean Architecture & Docker</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Direct GitHub Repo Integration</li>
              </ul>
            </div>
            <button onClick={() => onNavigate('generator')} className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs cursor-pointer shadow-lg shadow-blue-600/30">
              Upgrade to Pro
            </button>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <span className="text-xs font-bold text-purple-400 uppercase">Teams & Enterprise</span>
              <h4 className="text-2xl font-black text-white">Custom Cluster</h4>
              <div className="text-3xl font-black text-white font-mono">$199 <span className="text-xs text-slate-500 font-sans">/ month</span></div>
              <p className="text-xs text-slate-400">Dedicated AI agent clusters, custom architectural rules, and SOC2 compliance.</p>
              <ul className="space-y-2 text-xs text-slate-300 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Everything in Pro</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Custom Internal Prompt Libraries</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Dedicated SLA & Priority Queue</li>
              </ul>
            </div>
            <button onClick={() => onNavigate('help')} className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer">
              Contact Enterprise Sales
            </button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* 10. FAQ SECTION */}
      <motion.section 
        id="faq" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeInUpVariants}
        className="py-20 px-4 lg:px-8 max-w-4xl mx-auto space-y-8"
      >
        <div className="text-center space-y-3">
          <h2 className="text-xs font-bold text-blue-400 tracking-widest uppercase">Got Questions?</h2>
          <h3 className="text-3xl font-black text-white">Frequently Asked Questions</h3>
        </div>

        <motion.div 
          variants={staggerContainerVariants}
          className="space-y-3"
        >
          {[
            { q: "Can I use the generated code commercially?", a: "Yes, 100%. All generated code is royalty-free and yours to commercialize, modify, or open-source under your own licensing." },
            { q: "What frameworks are supported?", a: "Next.js, React, Spring Boot, FastAPI, Go Fiber, Express, NestJS, Flutter, React Native, PostgreSQL, MySQL, Redis, Docker, and Kubernetes." },
            { q: "How does Clean Architecture enforcement work?", a: "The generator organizes source files into distinct layer packages (domain entities, application use cases, adapters, and REST controllers), preventing tight coupling." },
            { q: "Can I export to GitHub directly?", a: "Yes, Pro and Enterprise users can authorize GitHub OAuth to create and push source code directly to a brand new repository." }
          ].map((faq, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left font-bold text-xs sm:text-sm text-white flex justify-between items-center cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="p-4 pt-0 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 font-sans"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* 11. CALL TO ACTION (CTA) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUpVariants}
        className="py-20 px-4 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="p-10 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Ready to Build Your Next Big Project?</h2>
            <p className="text-blue-100 text-xs sm:text-sm">
              Generate enterprise code bases in seconds. No credit card required to start.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('generator')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white text-slate-950 font-black text-xs hover:bg-slate-100 transition-all shadow-xl cursor-pointer"
              >
                Start Generating Code Now
              </button>
              <button
                onClick={() => onNavigate('templates')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-950/40 text-white font-bold text-xs hover:bg-slate-950/60 border border-white/20 transition-all cursor-pointer"
              >
                Browse Starter Templates
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 12. FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 px-4 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 pb-8 border-b border-slate-800">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span className="font-black text-white text-base">AI Project Studio</span>
            </div>
            <p className="text-slate-400 text-xs max-w-sm">
              Enterprise AI code generation platform delivering compilable, clean architecture software baselines in seconds.
            </p>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-white text-xs uppercase tracking-wider">Product</div>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => onNavigate('generator')} className="hover:text-white cursor-pointer">Project Generator</button></li>
              <li><button onClick={() => onNavigate('templates')} className="hover:text-white cursor-pointer">Templates</button></li>
              <li><button onClick={() => onNavigate('agents')} className="hover:text-white cursor-pointer">AI Agents</button></li>
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-white cursor-pointer">Marketplace</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-white text-xs uppercase tracking-wider">Admin & Tools</div>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => onNavigate('admin-analytics')} className="hover:text-white cursor-pointer">Admin Console</button></li>
              <li><button onClick={() => onNavigate('downloads')} className="hover:text-white cursor-pointer">Downloads</button></li>
              <li><button onClick={() => onNavigate('settings')} className="hover:text-white cursor-pointer">API Keys</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-white text-xs uppercase tracking-wider">Support</div>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => onNavigate('help')} className="hover:text-white cursor-pointer">Documentation</button></li>
              <li><a href="#faq" className="hover:text-white">FAQs</a></li>
              <li><button onClick={() => onNavigate('help')} className="hover:text-white cursor-pointer">System Status</button></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono">
          <div>© {new Date().getFullYear()} AI Project Studio Inc. All rights reserved.</div>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security Statement</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
