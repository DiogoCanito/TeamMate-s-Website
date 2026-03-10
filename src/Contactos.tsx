import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown, Menu, Star, ArrowRight, ArrowLeft,
  BarChart3, Settings, TrendingDown, Shield, Box,
  Twitter, Instagram, Linkedin, X, Loader2, CheckCircle,
  Fingerprint, Sparkles, Clock, Zap, Blocks, Link, Users,
  Mic, Brain, Mail, UserCheck, FileText, Megaphone, Cpu, HeadphonesIcon, BatteryLow, MapPin
} from 'lucide-react';

import { EtherealShadow } from './components/ui/etheral-shadow';
import { LeadModal } from './components/LeadModal';
import { QuizModal } from './components/QuizModal';
import { supabase } from './lib/supabase';

/* ─── Focus style helper ─────────────────────────────── */
const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background';

/* ─── useCountUp hook ────────────────────────────────── */
function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const linear = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - linear, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (linear < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

/* ─── useInView hook ─────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Navbar ─────────────────────────────────────────── */
const Navbar = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Serviços', href: '/#cases' },
    { label: 'Processo', href: '/#process' },
    { label: 'Testemunhos', href: '/#testimonials' },
    { label: 'Contacto', href: '/contactos' },
  ];

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Full-width fixed wrapper, navbar centered at max-w-7xl */}
      <div className="fixed top-4 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
        <nav
          className="w-full max-w-7xl bg-[#0a0a0a]/90 backdrop-blur-md rounded-2xl pointer-events-auto"
          role="navigation"
          aria-label="Navegação principal"
        >
          <div className="px-6 h-[72px] flex items-center justify-between">
            {/* TeaMate Logo */}
            <a href="/" aria-label="TeaMate — página inicial" className={`flex items-center ${focusRing} rounded`}>
              <img
                src="/images/Logo TeamMate.svg"
                alt="TeaMate"
                className="h-16 w-auto"
                draggable={false}
              />
            </a>

            {/* Desktop nav links — centred */}
            <ul className="hidden md:flex items-center gap-8" role="list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    className={`text-base font-display font-medium text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer ${focusRing} rounded`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/50 to-blue-400/50 rounded-xl blur opacity-25 group-hover:opacity-60 transition duration-500" aria-hidden="true"></div>
                <button
                  onClick={onOpenModal}
                  className={`relative px-5 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-xl transition-all duration-300 cursor-pointer ${focusRing}`}
                >
                  Agendar Conversa
                </button>
              </div>
            </div>

            {/* Mobile hamburger */}
            <button
              className={`md:hidden text-white cursor-pointer ${focusRing} rounded`}
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-0 z-[49] bg-[#0a0a0a] pt-[84px] px-6 pb-6 flex flex-col gap-4 mobile-menu-enter"
          role="menu"
        >
          {/* Mobile nav links */}
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              role="menuitem"
              onClick={(e) => handleNav(e, link.href)}
              className={`text-lg font-display font-medium text-gray-300 hover:text-white py-3 border-b border-white/5 transition-colors duration-200 cursor-pointer ${focusRing} rounded`}
            >
              {link.label}
            </a>
          ))}

          <div className="relative group mt-2 w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/50 to-blue-400/50 rounded-xl blur opacity-25 group-hover:opacity-60 transition duration-500" aria-hidden="true"></div>
            <button
              className={`relative w-full px-5 py-3.5 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-xl transition-all duration-300 cursor-pointer ${focusRing}`}
              onClick={() => { setIsOpen(false); onOpenModal(); }}
            >
              Agendar Conversa
            </button>
          </div>
        </div>
      )}
    </>
  );
};

/* ─── Testimonials ───────────────────────────────────── */
const TESTIMONIALS = [
  {
    id: 1,
    quote: "Antes da TeamMate, o nosso processo de onboarding de clientes demorava 3 dias e envolvia 4 pessoas. Hoje é automático, demora 2 horas e ninguém precisa de tocar em nada. Foi a melhor decisão que tomámos este ano.",
    name: "Ricardo Fernandes",
    role: "CEO, Growtify",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: 2,
    quote: "Éramos cépticos em relação à IA. Achámos que ia ser complicado, caro e que nunca ia encaixar no nosso negócio. A TeamMate provou que estávamos errados em menos de 3 semanas. A nossa equipa de vendas finalmente foca-se só em vender.",
    name: "Mariana Costa",
    role: "Diretora Comercial, Novalink",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: 3,
    quote: "O que mais me surpreendeu não foi a automação em si, foi o processo. Explicámos como trabalhamos, eles ouviram de verdade e construíram algo que parece feito especificamente para nós — porque foi.",
    name: "Tomás Guerreiro",
    role: "COO, Stackmove",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
  },
];

const Testimonials = () => {
  const { ref, inView } = useInView();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitX, setExitX] = useState<number>(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = TESTIMONIALS.length;

  const next = useCallback(() => {
    setExitX(-300);
    setCurrentIndex(prev => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setExitX(300);
    setCurrentIndex(prev => (prev - 1 + total) % total);
  }, [total]);

  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 5000);
  }, [next]);

  useEffect(() => {
    resetAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [resetAuto]);

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const power = Math.abs(info.offset.x) * info.velocity.x;
    if (power < -8000) { resetAuto(); next(); }
    else if (power > 8000) { resetAuto(); prev(); }
  };

  return (
    <section id="testimonials" className="py-24 px-6 bg-surface/50" aria-label="Testemunhos" ref={ref}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left column */}
        <div className={inView ? 'reveal-up' : 'opacity-0'}>
          <h2 className="text-4xl md:text-5xl font-display font-semibold leading-tight mb-4">
            Empresas que pararam de perder tempo
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-16">
            Não pedimos que confies em nós. Pedimos que ouças quem já confiou.
          </p>
          <div className="flex gap-12">
            <div>
              <p className="text-5xl font-display font-bold text-primary mb-2" aria-label="90 por cento">90%</p>
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Aumento de</p>
              <p className="font-medium">Eficiência Operacional</p>
            </div>
            <div>
              <p className="text-5xl font-display font-bold text-primary mb-2" aria-label="84 por cento">84%</p>
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Redução de</p>
              <p className="font-medium">Custos Manuais</p>
            </div>
          </div>
        </div>

        {/* Right column — stacked card carousel */}
        <div className={`relative flex items-center justify-center min-h-[420px] w-full ${inView ? 'reveal-up' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>

          {/* Card stack */}
          <div className="relative w-full max-w-lg flex items-center justify-center" style={{ height: '340px' }}>
            <AnimatePresence initial={false}>
              {TESTIMONIALS.map((t, index) => {
                const position = (index - currentIndex + total) % total;
                const isVisible = position < 3;
                if (!isVisible) return null;

                return (
                  <motion.div
                    key={t.id}
                    style={{ zIndex: total - position }}
                    initial={{ scale: 0.92, opacity: 0, y: 20 }}
                    animate={{
                      scale: 1 - position * 0.05,
                      y: position * 12,
                      opacity: 1 - position * 0.18,
                      x: 0,
                    }}
                    exit={{
                      x: exitX,
                      opacity: 0,
                      scale: 0.9,
                      transition: { duration: 0.22 },
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 280,
                      damping: 28,
                    }}
                    drag={position === 0 ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                    className="absolute w-full"
                  >
                    <div className="relative bg-[#111318] border border-white/10 rounded-2xl p-8 shadow-2xl" style={{ cursor: position === 0 ? 'grab' : 'default' }}>
                      {/* Arrows inside front card only */}
                      {position === 0 && (
                        <>
                          <button
                            onClick={(e) => { e.stopPropagation(); resetAuto(); prev(); }}
                            aria-label="Testemunho anterior"
                            className={`absolute top-4 left-4 z-10 w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer text-lg ${focusRing}`}
                          >
                            ←
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); resetAuto(); next(); }}
                            aria-label="Próximo testemunho"
                            className={`absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer text-lg ${focusRing}`}
                          >
                            →
                          </button>
                        </>
                      )}
                      <div className="flex flex-col items-center text-center gap-5">
                        <img
                          src={t.avatar}
                          alt={`Foto de ${t.name}`}
                          className="w-16 h-16 rounded-full object-cover border-2 border-white/10 flex-shrink-0"
                        />
                        <div className="space-y-2">
                          <h3 className="text-lg font-display font-semibold text-white">{t.name}</h3>
                          <p className="text-primary text-xs font-medium uppercase tracking-wider">{t.role}</p>
                        </div>
                        <p className="text-gray-300 text-base leading-relaxed italic max-w-sm">
                          &ldquo;{t.quote}&rdquo;
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div className="absolute -bottom-2 left-0 right-0 flex justify-center gap-2" role="tablist" aria-label="Navegar testemunhos">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`Testemunho ${i + 1}`}
                onClick={() => {
                  setExitX(i > currentIndex ? -300 : 300);
                  setCurrentIndex(i);
                  resetAuto();
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === currentIndex ? 'bg-primary w-5' : 'bg-white/20 w-2 hover:bg-white/40'}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};



/* ─── FAQ ────────────────────────────────────────────── */
const faqs = [
  { q: 'Quanto tempo demora a implementação?', a: 'Entre 1 a 4 semanas, dependendo da complexidade. Automações simples ficam prontas em poucos dias.' },
  { q: 'A TeamMate integra-se às nossas ferramentas existentes?', a: 'Sim. Trabalhamos com CRMs, ERPs, e-mail marketing, redes sociais e muito mais. Adaptamo-nos ao teu stack, não o contrário.' },
  { q: 'A TeamMate consegue acompanhar o crescimento da empresa?', a: 'Sempre. As nossas soluções são construídas para escalar — mais volume, mais processos, sem precisar de contratar mais ninguém.' },
  { q: 'Que tipo de suporte está disponível após o lançamento?', a: 'Suporte contínuo com monitorização, ajustes e formação para a tua equipa tirar o máximo das automações.' },
  { q: 'A TeamMate é segura e competente?', a: 'Sim. Seguimos as normas RGPD, usamos integrações testadas e entregamos resultados reais — não promessas.' },
];

const FAQ = () => {
  const { ref, inView } = useInView();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = useCallback((i: number) => {
    setOpenIndex(prev => prev === i ? null : i);
  }, []);

  return (
    <section id="faq" className="py-24 px-6 bg-surface/30" ref={ref}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className={`lg:col-span-5 ${inView ? 'reveal-up' : 'opacity-0'}`}>
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">FAQs</p>
          <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6 leading-tight">Perguntas Frequentes</h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Tens dúvidas sobre como a IA pode transformar o teu negócio? Encontre as respostas abaixo ou contacta-nos diretamente.
          </p>
          <a href="/contactos" className={`inline-block px-6 py-2.5 border border-white/15 hover:bg-white/5 text-white rounded-xl transition-all duration-300 cursor-pointer ${focusRing}`}>
            Faz a tua Pergunta
          </a>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-4" role="list">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-2xl bg-surface border border-border hover:border-white/20 transition-colors duration-200 overflow-hidden ${inView ? 'reveal-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 100 + 200}ms` }}
              role="listitem"
            >
              <button
                className={`w-full p-6 flex justify-between items-center cursor-pointer text-left ${focusRing} rounded-2xl`}
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
              >
                <span className="text-lg font-medium pr-4">{faq.q}</span>
                <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-transform duration-300 flex-shrink-0 ${openIndex === i ? 'rotate-180' : ''}`} aria-hidden="true">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>
              <div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                className={`faq-answer ${openIndex === i ? 'open' : ''}`}
              >
                <div>
                  <p className="px-6 pb-6 text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Footer ─────────────────────────────────────────── */
const Footer = () => {
  const scrollTo = (href: string) => {
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  const footerCols = [
    {
      title: 'Navegação',
      links: [
        { label: 'Serviços', href: '/#cases' },
        { label: 'Processo', href: '/#process' },
        { label: 'Testemunhos', href: '/#testimonials' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { label: 'FAQs', href: '/#faq' },
        { label: 'Contacto', href: '/contactos' },
        { label: 'RadMate', href: '/radmate' },
      ],
    },
    {
      title: 'Recursos',
      links: [
        { label: 'Termos', href: '#' },
        { label: 'Privacidade', href: '#' },
        { label: 'Licença', href: '#' },
      ],
    },
  ];

  return (
    <footer className="pt-20 pb-10 px-6 bg-surface/50 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
          <div className="lg:col-span-4">
            <div className="mb-6">
              <img
                src="/images/Logo TeamMate.svg"
                alt="TeamMate"
                className="h-14 w-auto"
                draggable={false}
              />
            </div>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Menos trabalho repetitivo. Mais tempo para crescer.
            </p>
          </div>

          <nav className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8" aria-label="Links de navegação do rodapé">
            {footerCols.map((col) => (
              <div key={col.title}>
                <h3 className="font-display font-semibold mb-6">{col.title}</h3>
                <div className="flex flex-col gap-4 text-gray-400">
                  {col.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => { if (link.href.startsWith('#') && link.href !== '#') { e.preventDefault(); scrollTo(link.href); } }}
                      className={`hover:text-white transition-colors duration-200 cursor-pointer ${focusRing} rounded`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex gap-4">
            {/* TikTok */}
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors duration-200 cursor-pointer ${focusRing}`} aria-label="Seguir TeamMate no TikTok">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.02-.06Z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors duration-200 cursor-pointer ${focusRing}`} aria-label="Seguir TeamMate no Instagram">
              <Instagram className="w-4 h-4" aria-hidden="true" />
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors duration-200 cursor-pointer ${focusRing}`} aria-label="Seguir TeamMate no LinkedIn">
              <Linkedin className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
          <p className="text-sm text-gray-500 font-display">
            © TeamMate {new Date().getFullYear()} — Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};


/* ─── Contact Section ────────────────────────────────── */
const ContactSection = () => {
  const { ref, inView } = useInView();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: '',
    aceitouTermos: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [modalState, setModalState] = useState<'loading' | 'success' | 'error'>('loading');

  const isValid = formData.nome && formData.email && formData.assunto && formData.mensagem && formData.aceitouTermos;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setShowModal(true);
    setModalState('loading');

    try {
      // Create a promise for the Supabase request
      const supabaseRequest = supabase
        .from('contactos')
        .insert([
          {
            nome: formData.nome,
            email: formData.email,
            telefone: formData.telefone || null,
            assunto: formData.assunto,
            mensagem: formData.mensagem,
            aceitou_termos: formData.aceitouTermos
          }
        ]);

      // Create a timeout promise (6 seconds)
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Timeout de envio: O pedido demorou mais de 6 segundos.")), 6000);
      });

      // Race both promises
      const { error } = await Promise.race([supabaseRequest, timeoutPromise]) as any;

      if (error) {
        console.error('Error saving contact:', error);
        setModalState('error');
        return;
      }

      setModalState('success');
      // Limpar o form em caso de sucesso
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: '',
        aceitouTermos: false,
      });

    } catch (err) {
      console.error('Unexpected error or timeout:', err);
      setModalState('error');
    }
  };

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Left column */}
        <div className={inView ? 'reveal-up' : 'opacity-0'}>
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">Contactos</p>
          <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6 leading-tight">
            Fala connosco. Estamos prontos para te ouvir.
          </h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-lg">
            Seja para esclarecer uma dúvida, perceber como podemos ajudar o teu negócio ou simplesmente saber mais sobre a TeamMate — estamos aqui.
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 text-gray-300">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-primary">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-lg">geral@teammate.pt</span>
            </div>
            <div className="flex items-center gap-4 text-gray-300">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-primary">
                <HeadphonesIcon className="w-5 h-5" />
              </div>
              <span className="text-lg">+351 900 000 000</span>
            </div>
            <div className="flex items-center gap-4 text-gray-300">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-primary">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-lg">Porto, Portugal</span>
            </div>
          </div>
        </div>

        {/* Right column - Form */}
        <div className={`bg-[#111318] p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl ${inView ? 'reveal-up' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-300">Nome completo <span className="text-primary">*</span></label>
                <input
                  type="text"
                  placeholder="O teu nome"
                  value={formData.nome}
                  onChange={e => setFormData({ ...formData, nome: e.target.value })}
                  className={`w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300`}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-300">Email <span className="text-primary">*</span></label>
                <input
                  type="email"
                  placeholder="O teu email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300`}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-300">Telefone</label>
                <input
                  type="tel"
                  placeholder="O teu número de telefone"
                  value={formData.telefone}
                  onChange={e => setFormData({ ...formData, telefone: e.target.value })}
                  className={`w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300`}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-300">Assunto <span className="text-primary">*</span></label>
                <div className="relative">
                  <select
                    value={formData.assunto}
                    onChange={e => setFormData({ ...formData, assunto: e.target.value })}
                    className={`w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 ${formData.assunto ? 'text-white' : 'text-gray-600'}`}
                  >
                    <option value="" disabled className="text-gray-600">Seleciona o assunto</option>
                    <option value="Servicos" className="text-white">Quero saber mais sobre os vossos serviços</option>
                    <option value="Projeto" className="text-white">Tenho uma questão sobre um projeto</option>
                    <option value="Proposta" className="text-white">Quero uma proposta personalizada</option>
                    <option value="Outro" className="text-white">Outro</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-300">Mensagem <span className="text-primary">*</span></label>
                <textarea
                  placeholder="Escreve aqui a tua mensagem..."
                  value={formData.mensagem}
                  onChange={e => setFormData({ ...formData, mensagem: e.target.value })}
                  className={`w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 min-h-[120px] resize-y focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300`}
                />
              </div>
            </div>

            <div className="flex items-start gap-3 mt-2">
              <div className="pt-1">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={formData.aceitouTermos}
                  onChange={e => setFormData({ ...formData, aceitouTermos: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-600 bg-[#0a0a0a] checked:bg-primary checked:border-primary focus:ring-primary focus:ring-offset-[#0a0a0a] cursor-pointer"
                />
              </div>
              <label htmlFor="privacy" className="text-sm text-gray-400 cursor-pointer select-none leading-relaxed">
                Aceito a política de privacidade e o tratamento dos meus dados pela TeamMate
              </label>
            </div>

            <div className="relative group mt-4">
              <div className={`absolute -inset-1 bg-gradient-to-r from-blue-600/50 to-blue-400/50 rounded-xl blur opacity-25 ${isValid ? 'group-hover:opacity-60 transition duration-500' : 'opacity-0'} `} aria-hidden="true"></div>
              <button
                type="submit"
                disabled={!isValid}
                className={`relative w-full py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${isValid
                  ? 'bg-primary text-white hover:bg-primary-hover shadow-lg cursor-pointer'
                  : 'bg-white/5 text-white/30 cursor-not-allowed border border-white/5'
                  }`}
              >
                Enviar Mensagem
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-sm"
              onClick={() => {
                if (modalState !== 'loading') setShowModal(false);
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#111318] border border-white/10 rounded-2xl p-8 md:p-10 text-center shadow-2xl flex flex-col items-center"
            >
              {modalState !== 'loading' && (
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors cursor-pointer w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {modalState === 'loading' && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center justify-center flex-1 py-4"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                  </div>
                  <h3 className="text-2xl font-display font-semibold mb-3 text-white">A enviar a mensagem...</h3>
                  <p className="text-gray-400 leading-relaxed mb-2">
                    Por favor, aguarda enquanto guardamos as tuas informações.
                  </p>
                </motion.div>
              )}

              {modalState === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center justify-center flex-1"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    >
                      <CheckCircle className="w-10 h-10 text-primary" />
                    </motion.div>
                  </div>
                  <h3 className="text-2xl font-display font-semibold mb-3 text-white">Mensagem enviada com sucesso!</h3>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    Obrigado por entrares em contacto connosco. A nossa equipa vai analisar a tua mensagem e responder-te o mais brevemente possível.
                  </p>
                  <p className="text-sm text-gray-500 mb-8 font-medium">
                    Normalmente respondemos em menos de 24 horas.
                  </p>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full py-3.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-hover transition-colors flex items-center justify-center cursor-pointer shadow-lg"
                  >
                    Fechar e Voltar ao Site
                  </button>
                </motion.div>
              )}

              {modalState === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center justify-center flex-1 py-4"
                >
                  <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    >
                      <X className="w-10 h-10 text-red-500" />
                    </motion.div>
                  </div>
                  <h3 className="text-2xl font-display font-semibold mb-3 text-white">Ocorreu um erro</h3>
                  <p className="text-gray-400 leading-relaxed mb-8">
                    Não foi possível guardar a tua mensagem neste momento. Pode ser um problema de ligação ou demora excessiva. Por favor, tenta novamente mais tarde.
                  </p>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full py-3.5 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors flex items-center justify-center cursor-pointer border border-white/10"
                  >
                    Tentar Novamente
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* ─── Contactos Page ─────────────────────────────────── */
const Contactos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = 'Contactos | TeamMate';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans scroll-smooth overflow-x-hidden selection:bg-primary/30 selection:text-white">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <main className="pt-20">
        <ContactSection />
        <Testimonials />
        <FAQ />
      </main>

      <Footer />

      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Contactos;
