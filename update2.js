const fs = require('fs');

const path = 'src/RadMate.tsx';
let content = fs.readFileSync(path, 'utf8');

const newComponents = `
/* ─── Problem ────────────────────────────────────────── */
const Problem = () => {
  const { ref, inView } = useInView();
  return (
    <section id="problema" className="py-24 px-6 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className={inView ? 'reveal-up' : 'opacity-0'}>
          <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6 leading-tight text-text-main">
            O problema que resolvemos
          </h2>
          <p className="text-lg text-text-muted leading-relaxed">
            As equipas gastam horas intermináveis em tarefas repetitivas que roubam tempo ao que realmente importa. A comunicação falha, os dados perdem-se e a produtividade estagna.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          {[
            { Icon: Clock, title: 'Tempo Desperdiçado', desc: 'Horas gastas em tarefas manuais que podiam ser automatizadas.' },
            { Icon: Target, title: 'Erros Frequentes', desc: 'Processos manuais estão sujeitos a falhas humanas constantes.' },
            { Icon: BatteryLow, title: 'Cansaço da Equipa', desc: 'Trabalho repetitivo desmotiva e esgota os teus melhores talentos.' }
          ].map((item, i) => (
             <div key={i} className={\`p-6 rounded-2xl bg-surface-hover border border-border flex items-start gap-4 \${inView ? 'reveal-up' : 'opacity-0'}\`} style={{ animationDelay: \`\${i * 100}ms\` }}>
               <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-black/5 border border-border flex items-center justify-center">
                 <item.Icon className="w-6 h-6 text-primary" />
               </div>
               <div>
                 <h3 className="text-xl font-display font-semibold text-text-main mb-2">{item.title}</h3>
                 <p className="text-text-muted text-base">{item.desc}</p>
               </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Visual Demo ────────────────────────────────────── */
const VisualDemo = () => {
  const { ref, inView } = useInView();
  return (
    <section id="demo" className="py-24 px-6 bg-surface-hover" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className={\`w-full aspect-[2/1] bg-border/50 rounded-3xl border border-border flex items-center justify-center shadow-lg relative overflow-hidden mb-12 \${inView ? 'reveal-up' : 'opacity-0'}\`}>
           <div className="absolute top-0 left-0 right-0 h-10 bg-surface border-b border-border flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
           </div>
           <p className="text-text-muted text-xl font-medium mt-10">Demo do Software</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
           {[
             { Icon: Zap, text: 'Geração Instantânea' },
             { Icon: Shield, text: '100% Seguro e Privado' },
             { Icon: LayoutDashboard, text: 'Interface Intuitiva' }
           ].map((item, i) => (
             <div key={i} className={\`flex flex-col items-center gap-3 \${inView ? 'reveal-up' : 'opacity-0'}\`} style={{ animationDelay: \`\${i * 150}ms\` }}>
                <item.Icon className="w-8 h-8 text-primary" />
                <p className="font-medium text-text-main">{item.text}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Pricing ────────────────────────────────────────── */
const Pricing = () => {
  const { ref, inView } = useInView();
  const plans = [
    { name: 'Base', price: '€299', desc: 'Para pequenas equipas', features: ['Até 5 utilizadores', 'Suporte email', 'Funcionalidades base'] },
    { name: 'Pro', price: '€599', desc: 'O mais escolhido', features: ['Até 20 utilizadores', 'Suporte prioritário', 'Automações avançadas', 'Integrações custom'], popular: true },
    { name: 'Enterprise', price: 'Sob consulta', desc: 'Para escalar rápido', features: ['Utilizadores ilimitados', 'Suporte 24/7', 'Infraestrutura dedicada', 'SLA garantido'] }
  ];

  return (
    <section id="planos" className="py-24 px-6 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className={\`text-center mb-16 \${inView ? 'reveal-up' : 'opacity-0'}\`}>
          <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6 leading-tight text-text-main">
            Planos simples e transparentes
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Escolhe o plano que se adapta ao momento da tua empresa.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div key={i} className={\`relative p-8 rounded-3xl bg-surface border \${plan.popular ? 'border-primary shadow-xl scale-105 z-10' : 'border-border'} flex flex-col \${inView ? 'reveal-up' : 'opacity-0'}\`} style={{ animationDelay: \`\${i * 150}ms\` }}>
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full">
                  Mais Popular
                </span>
              )}
              <div className="mb-6 mt-4">
                <h3 className="text-2xl font-display font-bold text-text-main mb-2">{plan.name}</h3>
                <p className="text-text-muted text-sm">{plan.desc}</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-bold text-text-main">{plan.price}</span>
                {plan.price !== 'Sob consulta' && <span className="text-text-muted">/mês</span>}
              </div>
              <ul className="mb-8 flex-1 space-y-4">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-text-muted">{feat}</span>
                  </li>
                ))}
              </ul>
              <div className="relative group/btn mt-auto">
                 <div className={\`absolute -inset-1 rounded-xl blur opacity-25 group-hover/btn:opacity-60 transition duration-500 \${plan.popular ? 'bg-gradient-to-r from-blue-600/50 to-blue-400/50' : ''}\`} aria-hidden="true"></div>
                 <button className={\`relative w-full py-3.5 rounded-xl font-medium transition-colors \${plan.popular ? 'bg-primary text-white hover:bg-primary-hover border border-transparent' : 'bg-transparent text-text-main border border-border hover:bg-black/5'}\`}>
                   Escolher Plano
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
`;

const appRenderRegex = /\/\* ─── App ────────────────────────────────────────────── \*\/[\s\S]*\}\s*$/;
const renderFunction = `/* ─── App ────────────────────────────────────────────── */
${newComponents}

export default function RadMate() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  return (
    <div className="radmate-theme min-h-screen bg-background text-text-main selection:bg-primary/30">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <main>
        <Hero
          onOpenModal={() => setIsModalOpen(true)}
          onOpenQuizModal={() => setIsQuizModalOpen(true)}
        />
        <Problem />
        <Process />
        <Features />
        <VisualDemo />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA onOpenModal={() => setIsModalOpen(true)} />
      </main>
      <Footer />
      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <QuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        onOpenLeadModal={() => setIsModalOpen(true)}
      />
    </div>
  );
}
`;

content = content.replace(appRenderRegex, renderFunction);
fs.writeFileSync(path, content);

// Now patch App.tsx for Ver Caso de Estudo and Footer link
let appPath = 'src/App.tsx';
let appContent = fs.readFileSync(appPath, 'utf8');

// Replace standard button to <a>
appContent = appContent.replace(
    /<button className=\{`relative px-8 py-3\.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-xl transition-all duration-300 cursor-pointer \${focusRing}`\}>\s*Ver Caso de Estudo\s*<\/button>/,
    '<a href="/radmate" className={`relative inline-block px-8 py-3.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-xl transition-all duration-300 cursor-pointer ${focusRing}`}>\n              Ver Caso de Estudo\n            </a>'
);

// Footer injection
appContent = appContent.replace(
    /{ label: 'Contacto', href: '#' },/,
    "{ label: 'Contacto', href: '#' },\n        { label: 'RadMate', href: '/radmate' },"
);

fs.writeFileSync(appPath, appContent);

console.log("SUCCESS!");
