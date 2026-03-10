import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Wrench } from 'lucide-react';

interface UnderConstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UnderConstructionModal: React.FC<UnderConstructionModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#111318] border border-white/10 rounded-2xl p-8 md:p-10 text-center shadow-2xl flex flex-col items-center"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors cursor-pointer w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Wrench className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-display font-semibold mb-3 text-white">Página em Construção</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Esta página está a ser construída e estará disponível muito em breve. Obrigado pela tua paciência!
            </p>
            <button
              onClick={onClose}
              className="py-3 px-8 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium rounded-xl transition-all duration-300 cursor-pointer w-full"
            >
              Voltar atrás
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
