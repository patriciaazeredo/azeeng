import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Textarea } from '@/components/ui/textarea';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
    import { MessageSquare, MapPin, Mail, Clock, Phone } from 'lucide-react';
    import { useToast } from "@/components/ui/use-toast";
    import SectionWrapper from '@/components/SectionWrapper';
    import { supabase } from '@/lib/supabase';

    const ContactSection = () => {
      const { toast } = useToast();
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
      const [isSubmitting, setIsSubmitting] = useState(false);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };

      const handleSelectChange = (value) => {
        setFormData(prev => ({ ...prev, service: value }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message || !formData.service) {
          toast({
            title: "Erro ao enviar",
            description: "Por favor, preencha todos os campos obrigatórios.",
            variant: "destructive",
          });
          return;
        }

        setIsSubmitting(true);

        try {
          const { error } = await supabase
            .from('contact_messages')
            .insert([
              { 
                name: formData.name, 
                email: formData.email, 
                phone: formData.phone, 
                service: formData.service, 
                message: formData.message 
              }
            ]);

          if (error) {
            throw error;
          }

          toast({
            title: "Mensagem Enviada!",
            description: "Obrigado por entrar em contato. Retornaremos em breve.",
          });
          setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        } catch (error) {
          console.error("Error submitting form to Supabase:", error);
          toast({
            title: "Erro ao Enviar",
            description: "Houve um problema ao enviar sua mensagem. Tente novamente mais tarde.",
            variant: "destructive",
          });
        } finally {
          setIsSubmitting(false);
        }
      };

      return (
        <SectionWrapper id="contact" title="Entre em Contato" className="bg-gradient-to-b from-sky-50 to-slate-100">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              className="space-y-8 p-8 bg-white rounded-xl shadow-xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-semibold text-sky-700 mb-6">Informações</h2>
              <div className="space-y-5">
                <div className="flex items-start">
                  <MapPin size={28} className="text-sky-600 mr-4 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-xl font-medium text-slate-800">Endereço</h3>
                    <p className="text-slate-600">Linhares - ES</p>
                    <p className="text-slate-600">Atendemos em toda a região</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail size={28} className="text-sky-600 mr-4 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-xl font-medium text-slate-800">E-mail</h3>
                    <a href="mailto:suporte@azeeng.com.br" className="text-sky-600 hover:text-sky-500 transition-colors duration-300">suporte@azeeng.com.br</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone size={28} className="text-sky-600 mr-4 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-xl font-medium text-slate-800">Telefone (Exemplo)</h3>
                    <a href="tel:+5527999999999" className="text-sky-600 hover:text-sky-500 transition-colors duration-300">(27) 99999-9999</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock size={28} className="text-sky-600 mr-4 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-xl font-medium text-slate-800">Horário de Atendimento</h3>
                    <p className="text-slate-600">Segunda a Sexta: 9h às 17h</p>
                    <p className="text-slate-600">Sábado: Fechado</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="p-8 bg-white rounded-xl shadow-xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-semibold text-sky-700 mb-6">Envie uma Mensagem</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
                  <Input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} placeholder="Seu nome completo" required className="bg-slate-50 border-slate-300 focus:ring-sky-500 focus:border-sky-500" disabled={isSubmitting} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
                  <Input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} placeholder="seuemail@exemplo.com" required className="bg-slate-50 border-slate-300 focus:ring-sky-500 focus:border-sky-500" disabled={isSubmitting} />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Telefone (Opcional)</label>
                  <Input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} placeholder="(XX) XXXXX-XXXX" className="bg-slate-50 border-slate-300 focus:ring-sky-500 focus:border-sky-500" disabled={isSubmitting} />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1">Serviço de Interesse</label>
                  <Select name="service" onValueChange={handleSelectChange} value={formData.service} disabled={isSubmitting}>
                    <SelectTrigger className="w-full bg-slate-50 border-slate-300 focus:ring-sky-500 focus:border-sky-500">
                      <SelectValue placeholder="Selecione um serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vistoria Técnica">Vistoria Técnica</SelectItem>
                      <SelectItem value="Laudo Técnico">Laudo Técnico</SelectItem>
                      <SelectItem value="Regularização de Imóvel">Regularização de Imóvel</SelectItem>
                      <SelectItem value="Consultoria/Assessoria">Consultoria/Assessoria</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Mensagem</label>
                  <Textarea name="message" id="message" value={formData.message} onChange={handleInputChange} rows={4} placeholder="Descreva sua necessidade ou dúvida" required className="bg-slate-50 border-slate-300 focus:ring-sky-500 focus:border-sky-500" disabled={isSubmitting} />
                </div>
                <Button type="submit" size="lg" className="w-full bg-sky-600 hover:bg-sky-700 text-white text-base py-3" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                  {!isSubmitting && <MessageSquare className="ml-2 h-5 w-5" />}
                </Button>
              </form>
            </motion.div>
          </div>
        </SectionWrapper>
      );
    };

    export default ContactSection;