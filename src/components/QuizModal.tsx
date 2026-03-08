import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, TrendingUp, Puzzle, Lightbulb, CheckCircle2 } from 'lucide-react';

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background';

interface QuizModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenLeadModal: () => void;
}

const questions = [
    {
        title: "Quantas pessoas tem a tua empresa?",
        options: [
            "Só eu (freelancer/solopreneur)",
            "2 a 10 pessoas",
            "11 a 50 pessoas",
            "Mais de 50 pessoas"
        ]
    },
    {
        title: "Quanto tempo a tua equipa perde por semana em tarefas repetitivas?",
        options: [
            "Pouco — menos de 2 horas",
            "Algum — entre 2 a 5 horas",
            "Muito — entre 5 a 10 horas",
            "Demasiado — mais de 10 horas"
        ]
    },
    {
        title: "Qual é o maior desafio do teu negócio neste momento?",
        options: [
            "Responder e gerir comunicações (emails, mensagens, follow-ups)",
            "Converter e gerir leads comerciais",
            "Criar documentos, propostas e contratos",
            "Gerir operações e processos internos"
        ]
    },
    {
        title: "Como descreves o teu processo atual para as tarefas do dia a dia?",
        options: [
            "Tudo é feito manualmente, pessoa a pessoa",
            "Temos algumas ferramentas mas nada está ligado",
            "Temos sistemas mas ainda há muito trabalho manual",
            "Já automatizamos algumas coisas mas queremos fazer mais"
        ]
    },
    {
        title: "O que preferes quando pensas em implementar uma solução nova?",
        options: [
            "Quero algo simples que funcione sem complicações",
            "Quero integrar com as ferramentas que já uso",
            "Quero uma solução completamente personalizada ao meu negócio",
            "Ainda não sei bem o que quero"
        ]
    },
    {
        title: "Qual é o teu principal objetivo para os próximos 6 meses?",
        options: [
            "Poupar tempo e reduzir trabalho manual",
            "Aumentar vendas e converter mais leads",
            "Escalar o negócio sem contratar mais pessoas",
            "Melhorar a experiência dos meus clientes"
        ]
    }
];

type ResultType = 'A' | 'B' | 'C' | null;

export function QuizModal({ isOpen, onClose, onOpenLeadModal }: QuizModalProps) {
    const [step, setStep] = useState(0); // 0 = start, 1-6 = questions, 7 = result
    const [direction, setDirection] = useState(1);
    const [answers, setAnswers] = useState<number[]>([]);

    // Reset state when opened or closed
    React.useEffect(() => {
        if (isOpen) {
            setStep(0);
            setDirection(1);
            setAnswers([]);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleStart = () => {
        setDirection(1);
        setStep(1);
    };

    const handleOptionClick = (optionIndex: number) => {
        const newAnswers = [...answers];
        newAnswers[step - 1] = optionIndex;
        setAnswers(newAnswers);

        // Auto advance
        setTimeout(() => {
            setDirection(1);
            setStep(prev => prev + 1);
        }, 300); // short delay for visual feedback
    };

    const handlePrev = () => {
        setDirection(-1);
        setStep(prev => prev - 1);
    };

    const handleClose = () => {
        onClose();
    };

    const handleGoHome = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onClose();
    };

    const calculateResult = (): ResultType => {
        const q1 = answers[0]; // 0=solo, 1=2-10, 2=11-50, 3=>50
        const q2 = answers[1]; // 0=<2, 1=2-5, 2=5-10, 3=>10
        const q4 = answers[3]; // 0=manual, 1=tools not linked, 2=systems but manual, 3=automated somewhat
        const q5 = answers[4]; // 3=don't know

        const hasTeam = q1 >= 1;
        const smallMediumTeam = q1 <= 2;
        const soloSmallTeam = q1 <= 1;

        const losesMuchTime = q2 >= 2;
        const losesLittleTime = q2 <= 1;
        const mostlyManual = q4 === 0;

        const someToolsWithManualWork = q4 === 1 || q4 === 2;
        const notSureWhatWants = q5 === 3;

        if (hasTeam && (losesMuchTime || mostlyManual)) return 'A';
        if (someToolsWithManualWork && smallMediumTeam) return 'B';
        if (soloSmallTeam && (losesLittleTime || notSureWhatWants)) return 'C';

        // fallbacks
        if (mostlyManual) return 'A';
        if (soloSmallTeam) return 'C';
        return 'B';
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0
        })
    };

    const resultVariants = {
        enter: { scale: 0.9, opacity: 0 },
        center: { scale: 1, opacity: 1 },
        exit: { scale: 1.1, opacity: 0 }
    };

    const renderContent = () => {
        if (step === 0) {
            return (
                <motion.div
                    key="start"
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="flex flex-col h-full items-center justify-center text-center px-4"
                >
                    <h3 className="text-4xl sm:text-5xl font-display font-semibold mb-6 leading-tight max-w-md">
                        Descobre em 2 minutos se a IA pode transformar o teu negócio
                    </h3>
                    <p className="text-gray-400 mb-10 text-lg leading-relaxed max-w-md">
                        Responde a 6 perguntas rápidas sobre o teu negócio e recebe um diagnóstico personalizado — sem compromisso, sem linguagem técnica.
                    </p>
                    <button
                        onClick={handleStart}
                        className={`px-8 py-4 bg-primary hover:bg-primary-hover text-white font-medium rounded-xl transition-all duration-300 text-lg cursor-pointer ${focusRing}`}
                    >
                        Iniciar Diagnóstico &rarr;
                    </button>
                </motion.div>
            );
        }

        if (step >= 1 && step <= 6) {
            const qIndex = step - 1;
            const question = questions[qIndex];
            const selectedOption = answers[qIndex];

            return (
                <motion.div
                    key={`q-${step}`}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="flex flex-col h-full"
                >
                    <h3 className="text-2xl sm:text-3xl font-display font-semibold mb-8 mt-4 leading-snug">
                        {question.title}
                    </h3>

                    <div className="space-y-4 flex-1">
                        {question.options.map((opt, idx) => {
                            const isSelected = selectedOption === idx;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleOptionClick(idx)}
                                    className={`w-full text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${focusRing} cursor-pointer min-h-[5rem] flex items-center ${isSelected
                                            ? 'bg-primary/20 border-primary '
                                            : 'bg-black/50 border-white/10 hover:border-white/30 hover:bg-white/5'
                                        }`}
                                >
                                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-4 flex-shrink-0 transition-colors ${isSelected ? 'border-primary bg-primary' : 'border-white/30'}`}>
                                        {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                    </div>
                                    <span className={`text-base sm:text-lg ${isSelected ? 'text-white font-medium' : 'text-gray-300'}`}>
                                        {opt}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-8 pt-4">
                        <button
                            onClick={handlePrev}
                            className={`text-gray-400 hover:text-white transition-colors cursor-pointer text-sm font-medium flex items-center ${focusRing}`}
                        >
                            &larr; Voltar
                        </button>
                    </div>
                </motion.div>
            );
        }

        // Step 7: Result
        const res = calculateResult();
        let Icon = TrendingUp;
        let title = "";
        let p = "";
        let listTitle = "";
        let listItems: string[] = [];
        let btnText = "";

        if (res === 'A') {
            Icon = TrendingUp;
            title = "O teu negócio está a perder tempo e dinheiro todos os dias";
            p = "Com base nas tuas respostas, identificámos que a tua empresa tem um potencial de automação muito elevado. Tens processos repetitivos, uma equipa que pode focar-se em trabalho de maior valor e ferramentas que ainda não estão a comunicar entre si. Isto significa que há ganhos imediatos possíveis — em tempo, eficiência e custos.";
            listTitle = "O que podes automatizar já:";
            listItems = [
                "A gestão da tua comunicação e inbox",
                "A qualificação e acompanhamento de leads",
                "A geração de documentos e propostas",
                "Os teus relatórios e operações internas"
            ];
            btnText = "Quero saber como → Agendar Conversa Gratuita";
        } else if (res === 'B') {
            Icon = Puzzle;
            title = "Já tens as bases — falta dar o próximo passo";
            p = "Já tens algumas ferramentas implementadas, o que é ótimo. Mas com base nas tuas respostas, ainda há processos manuais que estão a consumir tempo e a travar o crescimento da tua empresa. A boa notícia é que não precisas de mudar o que já tens — precisas de ligar os pontos e deixar a IA trabalhar nos espaços que ainda estão em branco.";
            listTitle = "O que podes melhorar já:";
            listItems = [
                "Integrar as ferramentas que já usas para eliminares trabalho duplicado",
                "Automatizar os follow-ups e comunicações que ainda são manuais",
                "Criar fluxos que funcionam 24 horas sem depender da tua equipa"
            ];
            btnText = "Vamos ligar os pontos → Agendar Conversa Gratuita";
        } else {
            Icon = Lightbulb;
            title = "A IA pode ser o teu maior aliado — e ainda não sabes";
            p = "Mesmo que o teu negócio seja pequeno ou que ainda não sintas que perdes muito tempo em tarefas manuais, a automação pode mudar completamente a forma como trabalhas. Empresas que implementam IA cedo ganham uma vantagem competitiva enorme — fazem mais, com menos esforço, e escalam sem precisar de aumentar custos.";
            listTitle = "Por onde podes começar:";
            listItems = [
                "Automatizar respostas e comunicação com clientes",
                "Criar um fluxo de follow-up que trabalha por ti",
                "Libertar horas do teu dia para focares no crescimento"
            ];
            btnText = "Quero perceber mais → Agendar Conversa Gratuita";
        }

        const handlePrimaryClick = () => {
            onClose();
            onOpenLeadModal();
        };

        return (
            <motion.div
                key="result"
                variants={resultVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="flex flex-col h-full sm:pt-4"
            >
                <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mb-6 shrink-0">
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
                    >
                        <Icon className="w-8 h-8 text-primary" />
                    </motion.div>
                </div>

                <h3 className="text-3xl font-display font-semibold mb-4 text-white leading-tight">
                    {title}
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed text-[1.05rem]">
                    {p}
                </p>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                    <h4 className="font-semibold text-white mb-4">{listTitle}</h4>
                    <ul className="space-y-3">
                        {listItems.map((item, i) => (
                            <li key={i} className="flex items-start text-gray-300">
                                <CheckCircle2 className="w-5 h-5 text-primary mr-3 shrink-0 mt-0.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-auto flex flex-col gap-3 pb-4">
                    <button
                        onClick={handlePrimaryClick}
                        className={`w-full py-4 bg-primary hover:bg-primary-hover text-white font-medium rounded-xl transition-all duration-300 text-center shadow-[0_0_20px_rgba(5,102,141,0.3)] cursor-pointer ${focusRing}`}
                    >
                        {btnText}
                    </button>
                    <button
                        onClick={handleGoHome}
                        className={`w-full py-4 bg-transparent border border-white/15 hover:bg-white/5 text-white font-medium rounded-xl transition-all duration-300 text-center cursor-pointer ${focusRing}`}
                    >
                        Voltar à Página Inicial
                    </button>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6" aria-modal="true" role="dialog">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={handleClose}
            />

            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="relative w-full h-full md:h-auto md:max-w-2xl bg-surface md:border border-border md:rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:max-h-[90vh]"
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className={`absolute top-4 right-4 z-20 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ${focusRing}`}
                >
                    <X className="w-6 h-6 md:w-5 md:h-5" />
                </button>

                {/* Progress Bar (Only during questions) */}
                {step >= 1 && step <= 6 && (
                    <div className="w-full bg-white/5 h-1.5 shrink-0 z-10 relative">
                        <div className="absolute top-3 left-6 text-xs text-gray-500 font-medium uppercase tracking-widest hidden sm:block">
                            Passo {step} de 6
                        </div>
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: `${((step - 1) / 6) * 100}%` }}
                            animate={{ width: `${(step / 6) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                )}

                {/* Content area */}
                <div className="p-6 pt-12 sm:p-10 sm:pt-14 overflow-y-auto overflow-x-hidden relative flex-1 min-h-[500px] flex flex-col">
                    <AnimatePresence mode="wait" custom={direction}>
                        {renderContent()}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
