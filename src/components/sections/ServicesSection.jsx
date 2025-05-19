import React from 'react';
    import { motion } from 'framer-motion';
    import { Search, FileText, Building, Wrench } from 'lucide-react';
    import SectionWrapper from '@/components/SectionWrapper';

    const servicesData = [
      { icon: <Search size={48} className="text-sky-600 mb-4" />, title: "Vistorias Técnicas", description: "Vistorias detalhadas para compra e venda, avaliação de imóveis, identificação de patologias e muito mais." },
      { icon: <FileText size={48} className="text-sky-600 mb-4" />, title: "Laudos Técnicos", description: "Elaboração de laudos técnicos com embasamento legal e técnico para diversas finalidades judiciais e administrativas." },
      { icon: <Building size={48} className="text-sky-600 mb-4" />, title: "Regularização de Imóveis", description: "Regularizamos seu imóvel junto aos órgãos competentes, garantindo documentação em conformidade com a legislação." },
      { icon: <Wrench size={48} className="text-sky-600 mb-4" />, title: "Consultoria e Assessoria", description: "Orientação técnica especializada para tomada de decisões relacionadas a projetos, construções e reformas." }
    ];

    const ServicesSection = () => {
      return (
        <SectionWrapper id="services" title="Nossos Serviços">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-2xl hover:shadow-sky-200/50 transition-shadow duration-300 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {service.icon}
                <h2 className="text-2xl font-semibold mb-3 text-sky-700">{service.title}</h2>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>
      );
    };

    export default ServicesSection;