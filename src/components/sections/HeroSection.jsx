import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import SectionWrapper from '@/components/SectionWrapper';

    const HeroSection = () => {
      return (
        <SectionWrapper id="hero" className="bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 text-white pt-28 pb-20 md:pt-40 md:pb-32" titleClassName="sr-only">
          <div className="text-center">
            <motion.h1
              className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              AZEENG Serviços de Engenharia
            </motion.h1>
            <motion.p
              className="text-lg md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Excelência técnica em vistorias, laudos, regularização de imóveis e consultoria especializada em Linhares e região.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button size="lg" className="bg-white text-sky-600 hover:bg-slate-100 hover:text-sky-700 transition-all duration-300 transform hover:scale-105 shadow-lg px-10 py-7 text-lg font-semibold" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Solicite um Orçamento
              </Button>
            </motion.div>
          </div>
        </SectionWrapper>
      );
    };

    export default HeroSection;