import React from 'react';
    import { motion } from 'framer-motion';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Building, FileText, Search, Wrench, Users, CheckCircle } from 'lucide-react';
    import SectionWrapper from '@/components/SectionWrapper';

    const tipsData = [
      {
        title: "Antes de Comprar um Imóvel",
        content: "Sempre solicite uma vistoria técnica antes de fechar negócio. Problemas estruturais, infiltrações ou irregularidades podem custar muito caro para resolver depois da compra.",
        icon: Search
      },
      {
        title: "Regularização Documental",
        content: "Mesmo que seu imóvel esteja construído há anos, é importante regularizá-lo. A documentação em dia valoriza o imóvel e evita problemas futuros em transações ou heranças.",
        icon: FileText
      },
      {
        title: "Reformas e Ampliações",
        content: "Antes de iniciar qualquer reforma ou ampliação, consulte um engenheiro para verificar a viabilidade do projeto e as exigências legais. Reformas irregulares podem trazer multas e até exigência de demolição.",
        icon: Wrench
      },
      {
        title: "Importância da ART",
        content: "A Anotação de Responsabilidade Técnica (ART) é obrigatória para obras e serviços de engenharia. Ela protege tanto o cliente quanto o profissional, documentando quem foi o responsável técnico pela obra.",
        icon: CheckCircle
      },
      {
        title: "Problemas com Vizinhos",
        content: "Em casos de disputas com vizinhos sobre limites de terreno, construções ou danos, um laudo técnico pode ser fundamental para comprovar irregularidades e resolver o conflito.",
        icon: Users
      },
      {
        title: "Segurança nas Construções",
        content: "Nunca economize em projetos e acompanhamento técnico. Problemas estruturais podem colocar em risco a segurança dos moradores e resultar em custos muito maiores no futuro.",
        icon: Building
      }
    ];

    const TipsSection = () => {
      return (
        <SectionWrapper id="tips" title="Dicas e Informações Úteis">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tipsData.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden">
                  <CardHeader className="bg-sky-50 p-6">
                    <div className="flex items-center space-x-3">
                      <tip.icon size={32} className="text-sky-600" />
                      <CardTitle className="text-xl text-sky-700">{tip.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow">
                    <p className="text-slate-600 leading-relaxed">{tip.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>
      );
    };

    export default TipsSection;