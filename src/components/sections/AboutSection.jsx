import React from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import mainImage from "../../assets/mainImage.png";

const AboutSection = () => {
  return (
    <SectionWrapper id="about" title="Quem Somos" className="bg-slate-50">
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            class="rounded-xl shadow-xl w-full h-auto object-cover"
            alt="Equipe AZEENG em reunião de planejamento"
            src={mainImage}
          />
        </motion.div>
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-lg text-slate-700 leading-relaxed">
            A AZEENG Serviços de Engenharia é uma empresa especializada em
            soluções técnicas para imóveis e edificações, oferecendo serviços
            como vistorias, laudos técnicos, regularização, assessoria e
            consultoria.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            Atuamos com seriedade, precisão e compromisso com a segurança e a
            legalidade das construções, atendendo clientes residenciais,
            comerciais e industriais em Linhares e toda a região do Espírito
            Santo.
          </p>
          <div>
            <h2 className="text-2xl font-semibold text-sky-700 mb-3">
              Nossa Visão
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              Ser referência em engenharia de confiança e qualidade, reconhecida
              pela excelência técnica, atendimento personalizado e impacto
              positivo nas edificações e na vida das pessoas.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-sky-700 mb-3">
              Nossos Valores
            </h2>
            <ul className="list-disc list-inside space-y-2 text-lg text-slate-700 leading-relaxed">
              <li>Ética e responsabilidade</li>
              <li>Comprometimento com a segurança</li>
              <li>Transparência na comunicação</li>
              <li>Excelência técnica</li>
              <li>Respeito às pessoas</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
