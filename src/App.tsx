import React, { useState } from 'react';
import { 
  ChevronDown, Menu, Star, ArrowRight, ArrowLeft, 
  BarChart3, Settings, TrendingDown, Shield, Box,
  Twitter, Instagram, Linkedin, X
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <Box className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">AutoAI</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
            Todas as Páginas <ChevronDown className="w-4 h-4" />
          </div>
          <a href="#about" className="hover:text-white transition-colors">Sobre</a>
          <a href="#insights" className="hover:text-white transition-colors">Insights</a>
          <a href="#cases" className="hover:text-white transition-colors">Casos de Estudo</a>
        </div>

        <div className="hidden md:flex items-center">
          <button className="px-5 py-2.5 text-sm font-medium text-white border border-white/10 rounded-full hover:bg-white/5 transition-colors">
            Começar Gratuitamente
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-[#0a0a0a] border-b border-white/5 p-6 flex flex-col gap-4">
          <a href="#about" className="text-gray-300 hover:text-white transition-colors">Sobre</a>
          <a href="#insights" className="text-gray-300 hover:text-white transition-colors">Insights</a>
          <a href="#cases" className="text-gray-300 hover:text-white transition-colors">Casos de Estudo</a>
          <button className="w-full px-5 py-2.5 text-sm font-medium text-white border border-white/10 rounded-full hover:bg-white/5 transition-colors mt-4">
            Começar Gratuitamente
          </button>
        </div>
      )}
    </nav>
  );
};

const Hero = () => (
  <section className="relative pt-40 pb-20 px-6 overflow-hidden">
    <div className="glow-bg"></div>
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-5xl md:text-7xl font-display font-semibold tracking-tight leading-[1.1] mb-6">
        O seu caminho para o <br className="hidden md:block" /> sucesso escalável começa aqui.
      </h1>
      <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
        Desbloqueie todo o potencial do seu negócio com a AutoAI, a solução de automação de ponta baseada em inteligência artificial.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-12">
        <input 
          type="email" 
          placeholder="Insira o seu email" 
          className="w-full px-6 py-3.5 bg-white/5 border border-white/10 rounded-full text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
        />
        <button className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-full transition-colors whitespace-nowrap">
          Acesso Antecipado
        </button>
      </div>

      <div className="flex items-center justify-center gap-3 text-sm text-gray-400">
        <div className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/5">
          <Star className="w-4 h-4 fill-primary text-primary" />
          <span className="font-medium text-white">4.7</span>
        </div>
        <span>avaliado na</span>
        <span className="font-display font-bold text-white tracking-tight">Clutch</span>
      </div>
    </div>
  </section>
);

const BrandTicker = () => (
  <section className="py-10 border-y border-white/5 bg-white/[0.02] overflow-hidden">
    <div className="flex gap-12 items-center animate-marquee whitespace-nowrap opacity-50">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <div key={i} className="flex items-center gap-2 font-display font-bold text-xl text-white">
          <Box className="w-6 h-6" /> Brand {i}
        </div>
      ))}
    </div>
  </section>
);

const Features = () => {
  const features = [
    { icon: <BarChart3 className="w-6 h-6 text-primary" />, title: "Insights de Dados", desc: "Ganhe uma visão abrangente com análises preditivas." },
    { icon: <Settings className="w-6 h-6 text-primary" />, title: "Automação de Processos", desc: "Automatize tarefas repetitivas e fluxos de trabalho." },
    { icon: <TrendingDown className="w-6 h-6 text-primary" />, title: "Eficiência de Custos", desc: "Identifique áreas de desperdício e otimize recursos." },
    { icon: <Shield className="w-6 h-6 text-primary" />, title: "Escalabilidade Segura", desc: "Proteja os seus dados com a nossa encriptação robusta." },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">Principais Funcionalidades</p>
          <h2 className="text-4xl md:text-5xl font-display font-semibold max-w-2xl leading-tight">
            Desbloqueie os benefícios de soluções mais inteligentes
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="p-8 rounded-2xl bg-surface border border-border hover:border-white/20 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/5">
                {f.icon}
              </div>
              <h5 className="text-xl font-display font-semibold mb-3">{f.title}</h5>
              <p className="text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section className="py-24 px-6 bg-surface/50 border-y border-border">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="relative aspect-square rounded-3xl overflow-hidden border border-border bg-surface">
        <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop" alt="Dashboard" className="object-cover w-full h-full opacity-80 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-tr from-background/80 to-transparent"></div>
      </div>
      
      <div>
        <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6 leading-tight">
          Soluções inovadoras, feitas à sua medida
        </h2>
        <p className="text-lg text-gray-400 mb-10 leading-relaxed">
          Muitas plataformas de automação são complexas e têm uma curva de aprendizagem acentuada. Nós simplificamos a IA para que a sua equipa se possa focar no crescimento.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 mb-10">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border flex-1">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
              <Box className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Integrado com</p>
              <p className="font-medium">Sistemas CRM</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border flex-1">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
              <Box className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Integrado com</p>
              <p className="font-medium">Plataformas ERP</p>
            </div>
          </div>
        </div>
        
        <button className="px-8 py-3.5 bg-white text-black hover:bg-gray-200 font-medium rounded-full transition-colors">
          Começar Gratuitamente
        </button>
      </div>
    </div>
  </section>
);

const Products = () => (
  <section className="py-24 px-6 overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">Os Nossos Produtos</p>
          <h2 className="text-4xl md:text-5xl font-display font-semibold max-w-2xl leading-tight">
            Transformando desafios em oportunidades
          </h2>
        </div>
        <div className="flex gap-3">
          <button className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-surface transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-surface transition-colors">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="min-w-[300px] md:min-w-[400px] aspect-[4/5] rounded-3xl relative overflow-hidden snap-start group border border-border bg-surface">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-background via-background/80 to-transparent">
              <div className="flex items-center gap-2 mb-4">
                <Box className="w-5 h-5 text-primary" />
                <span className="font-display font-bold">AutoBot {i}</span>
              </div>
              <h4 className="text-2xl font-display font-semibold">As Vantagens de Nos Escolher</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 px-6 bg-surface/30 border-y border-border">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div>
        <h2 className="text-4xl md:text-5xl font-display font-semibold mb-12 leading-tight">
          Confiado por inovadores em todo o mundo
        </h2>
        <div className="flex gap-12">
          <div>
            <h3 className="text-5xl font-display font-bold text-primary mb-2">90%</h3>
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Aumento de</p>
            <p className="font-medium">Eficiência Operacional</p>
          </div>
          <div>
            <h3 className="text-5xl font-display font-bold text-primary mb-2">84%</h3>
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Redução de</p>
            <p className="font-medium">Custos Manuais</p>
          </div>
        </div>
      </div>
      
      <div className="bg-surface border border-border rounded-3xl p-10 flex flex-col justify-between">
        <h4 className="text-2xl leading-relaxed font-medium mb-12">
          "Graças à AutoAI, alcançámos um nível de automação que nunca pensámos ser possível. A equipa deles criou fluxos de trabalho que não só poupam tempo, mas inspiram inovação."
        </h4>
        <div className="flex items-center gap-4">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" alt="Author" className="w-14 h-14 rounded-full object-cover" />
          <div>
            <p className="font-display font-semibold text-lg">Joana Silva</p>
            <p className="text-gray-400 text-sm">CEO, TechNova Solutions</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Statistics = () => (
  <section className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">Estatísticas</p>
        <h2 className="text-4xl md:text-5xl font-display font-semibold max-w-2xl mx-auto leading-tight">
          Os números que definem o nosso sucesso
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { num: "95%", title: "Resultados que Importam", desc: "Desbloqueie todo o potencial da sua empresa com a AutoAI." },
          { num: "20%", title: "Métricas de Sucesso", desc: "Maximize o poder dos seus dados com as nossas soluções." },
          { num: "36%", title: "Performance Comprovada", desc: "Transforme os seus fluxos de trabalho eficientemente." },
          { num: "54%", title: "Impacto em Números", desc: "Eleve as suas estratégias de negócio através da IA." }
        ].map((s, i) => (
          <div key={i} className="p-8 rounded-2xl bg-surface border border-border text-center">
            <h2 className="text-5xl font-display font-bold mb-6">{s.num}</h2>
            <h4 className="text-xl font-display font-semibold mb-3">{s.title}</h4>
            <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Process = () => (
  <section className="py-24 px-6 bg-surface/30 border-y border-border overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">Processo para o Sucesso</p>
        <h2 className="text-4xl md:text-5xl font-display font-semibold max-w-2xl mx-auto leading-tight">
          Passo-a-passo para alcançar resultados
        </h2>
      </div>
      
      <div className="relative max-w-5xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block"></div>
        
        {[
          { step: 1, title: "Descobrir & Estrategizar", desc: "Analisamos os seus processos atuais e identificamos oportunidades de automação com IA.", align: "left" },
          { step: 2, title: "Desenhar & Desenvolver", desc: "Criamos fluxos de trabalho personalizados e integramos as ferramentas de IA mais adequadas.", align: "right" },
          { step: 3, title: "Lançar & Otimizar", desc: "Implementamos as soluções e monitorizamos continuamente para garantir a máxima eficiência.", align: "left" }
        ].map((p, i) => (
          <div key={i} className={`flex flex-col md:flex-row items-center gap-12 mb-24 last:mb-0 ${p.align === 'right' ? 'md:flex-row-reverse' : ''}`}>
            <div className={`flex-1 ${p.align === 'right' ? 'md:text-left' : 'md:text-right'} text-center md:text-left`}>
              <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">{p.title}</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-md ml-auto mr-auto md:mx-0">{p.desc}</p>
              <button className="px-6 py-2.5 border border-white/10 rounded-full hover:bg-white/5 transition-colors">
                Saber Mais
              </button>
            </div>
            
            <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-background border-2 border-border flex items-center justify-center text-2xl font-display font-bold">
              {p.step}
            </div>
            
            <div className="flex-1 w-full">
              <div className="aspect-[4/3] rounded-3xl bg-surface border border-border overflow-hidden relative">
                <img src={`https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop&sig=${i}`} alt="Process" className="w-full h-full object-cover opacity-60 mix-blend-luminosity" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Blog = () => (
  <section className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">Insights & Blog</p>
          <h2 className="text-4xl md:text-5xl font-display font-semibold max-w-2xl leading-tight">
            Últimos artigos & insights da indústria
          </h2>
        </div>
        <button className="px-6 py-2.5 border border-white/10 rounded-full hover:bg-white/5 transition-colors whitespace-nowrap">
          Ver mais Insights
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Unificando as suas ferramentas para uma experiência perfeita", author: "Rui Costa", role: "Engenheiro de IA" },
          { title: "Aproveitando a tecnologia para o sucesso do crescimento", author: "Ana Silva", role: "Especialista em Automação" },
          { title: "Como os dados podem impulsionar melhores decisões", author: "Pedro Santos", role: "Analista de Dados" }
        ].map((b, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6 border border-border bg-surface">
              <img src={`https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop&sig=${i}`} alt="Blog" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h4 className="text-xl font-display font-semibold mb-6 leading-snug group-hover:text-primary transition-colors">{b.title}</h4>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface border border-border overflow-hidden">
                <img src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop&sig=${i}`} alt="Author" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-medium text-sm">{b.author}</p>
                <p className="text-xs text-gray-500">{b.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "A AutoAI é segura de usar?", a: "A segurança é a nossa prioridade. Utilizamos encriptação avançada e protocolos de segurança rigorosos para proteger os seus dados." },
    { q: "O que acontece se eu perder as minhas credenciais?", a: "Temos um processo de recuperação seguro que garante que apenas utilizadores autorizados podem aceder à sua conta." },
    { q: "Onde posso encontrar ajuda para usar as funcionalidades?", a: "Oferecemos suporte 24/7 e documentação detalhada para o ajudar a tirar o máximo partido da nossa plataforma." },
    { q: "Quais são os benefícios de usar a AutoAI?", a: "Aumento de eficiência, redução de custos operacionais e a capacidade de escalar o seu negócio sem aumentar proporcionalmente a equipa." }
  ];

  return (
    <section className="py-24 px-6 bg-surface/30 border-y border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">FAQs</p>
          <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6 leading-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Tem dúvidas sobre como a IA pode transformar o seu negócio? Encontre as respostas abaixo ou contacte-nos diretamente.
          </p>
          <button className="px-6 py-2.5 border border-white/10 rounded-full hover:bg-white/5 transition-colors">
            Faça a sua Pergunta
          </button>
        </div>
        
        <div className="lg:col-span-7 flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="p-6 rounded-2xl bg-surface border border-border cursor-pointer hover:border-white/20 transition-colors"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-medium">{faq.q}</h4>
                <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-transform ${openIndex === i ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
              {openIndex === i && (
                <p className="mt-4 text-gray-400 leading-relaxed">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => (
  <section className="py-24 px-6">
    <div className="max-w-5xl mx-auto relative rounded-[3rem] overflow-hidden border border-border">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-surface to-background"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      
      <div className="relative p-16 md:p-24 text-center">
        <h2 className="text-4xl md:text-6xl font-display font-semibold mb-6 leading-tight max-w-2xl mx-auto">
          Dê o próximo passo para o sucesso
        </h2>
        <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
          Junte-se a centenas de empresas que já automatizaram os seus processos e escalaram as suas operações com a nossa tecnologia.
        </p>
        <button className="px-8 py-4 bg-primary hover:bg-primary-hover text-white font-medium rounded-full transition-colors text-lg">
          Começar Gratuitamente
        </button>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="pt-20 pb-10 px-6 bg-surface/50 border-t border-border">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Box className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">AutoAI</span>
          </div>
          <p className="text-gray-400 leading-relaxed max-w-sm">
            Escale as suas operações com integrações adicionais e automação inteligente baseada em IA.
          </p>
        </div>
        
        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h5 className="font-display font-semibold mb-6">Navegação</h5>
            <div className="flex flex-col gap-4 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Sobre</a>
              <a href="#" className="hover:text-white transition-colors">Insights</a>
              <a href="#" className="hover:text-white transition-colors">Casos de Estudo</a>
            </div>
          </div>
          <div>
            <h5 className="font-display font-semibold mb-6">Empresa</h5>
            <div className="flex flex-col gap-4 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Carreiras</a>
              <a href="#" className="hover:text-white transition-colors">Contacto</a>
              <a href="#" className="hover:text-white transition-colors">FAQs</a>
            </div>
          </div>
          <div>
            <h5 className="font-display font-semibold mb-6">Recursos</h5>
            <div className="flex flex-col gap-4 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Termos</a>
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Licença</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
            <Twitter className="w-4 h-4" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
        <p className="text-sm text-gray-500">
          © AutoAI 2024 - Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-primary/30">
      <Navbar />
      <main>
        <Hero />
        <BrandTicker />
        <Features />
        <About />
        <Products />
        <Testimonials />
        <Statistics />
        <Process />
        <Blog />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
