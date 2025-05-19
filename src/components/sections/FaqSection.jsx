import React from 'react';
    import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
    import { ChevronDown } from 'lucide-react';
    import SectionWrapper from '@/components/SectionWrapper';

    const faqData = [
      {
        question: "Para que serve um laudo técnico de engenharia?",
        answer: "Um laudo técnico serve para documentar tecnicamente uma situação, identificar causas de problemas e oferecer respaldo legal em ações judiciais, seguros ou tomadas de decisão."
      },
      {
        question: "Quando é necessário contratar uma vistoria técnica em um imóvel?",
        answer: "Sempre que houver dúvidas sobre segurança, danos visíveis, reformas próximas, compra e venda de imóveis ou problemas estruturais."
      },
      {
        question: "Qual a diferença entre laudo e vistoria?",
        answer: "A vistoria é uma inspeção visual com registro das condições do imóvel; o laudo é um documento técnico que analisa causas, consequências e propõe soluções."
      },
      {
        question: "O que é um laudo de vizinhança e quando ele é exigido?",
        answer: "O laudo de vizinhança é feito antes de obras ou demolições e registra o estado dos imóveis ao redor para evitar conflitos por danos."
      },
      {
        question: "Vocês fazem regularização de imóveis junto à prefeitura?",
        answer: "Sim, auxiliamos em todo o processo de regularização junto à prefeitura, incluindo planta, documentação e acompanhamento."
      },
      {
        question: "Quanto tempo demora para entregar um laudo técnico?",
        answer: "O prazo varia conforme a complexidade do caso, mas em média entre 3 e 10 dias úteis após a vistoria."
      }
    ];

    const FaqSection = () => {
      return (
        <SectionWrapper id="faq" title="Dúvidas Frequentes" className="bg-slate-50">
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {faqData.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="border-b border-sky-200 last:border-b-0">
                <AccordionTrigger className="py-6 text-left text-lg font-medium text-sky-700 hover:text-sky-600 transition-colors duration-300 flex justify-between items-center w-full [&[data-state=open]>svg]:rotate-180">
                  {item.question}
                  <ChevronDown className="h-5 w-5 shrink-0 text-sky-500 transition-transform duration-200" />
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6 text-slate-600 leading-relaxed text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SectionWrapper>
      );
    };

    export default FaqSection;