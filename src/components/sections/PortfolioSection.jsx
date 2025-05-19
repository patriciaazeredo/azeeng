import React, { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { ChevronRight, Loader2, PackageSearch } from 'lucide-react';
    import SectionWrapper from '@/components/SectionWrapper';
    import { supabase } from '@/lib/supabase';
    import { useToast } from "@/components/ui/use-toast";

    const PortfolioSection = () => {
      const [portfolioItems, setPortfolioItems] = useState([]);
      const [selectedPortfolioItem, setSelectedPortfolioItem] = useState(null);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [loading, setLoading] = useState(true);
      const { toast } = useToast();

      useEffect(() => {
        const fetchPortfolioItems = async () => {
          setLoading(true);
          try {
            const { data, error } = await supabase
              .from('portfolio_items')
              .select('*')
              .order('created_at', { ascending: false });

            if (error) {
              // Check if the error is due to RLS before showing a generic error
              if (error.message.includes("violates row-level security policy")) {
                 console.warn("RLS policy might be preventing access to portfolio_items for non-authenticated users or public. This is expected if items are user-specific and no public read policy is set.");
                 setPortfolioItems([]); // Set to empty if RLS prevents public read
              } else {
                throw error; // Re-throw other errors
              }
            } else {
              setPortfolioItems(data || []);
            }
          } catch (error) {
            toast({
              title: "Erro ao carregar portfólio",
              description: "Não foi possível buscar os projetos. Tente novamente.",
              variant: "destructive",
            });
          } finally {
            setLoading(false);
          }
        };
        fetchPortfolioItems();
      }, [toast]);

      const openModal = (item) => {
        setSelectedPortfolioItem(item);
        setIsModalOpen(true);
      };
      
      if (loading) {
        return (
          <SectionWrapper id="portfolio" title="Portfólio de Serviços">
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-sky-600" />
              <p className="ml-4 text-lg text-slate-600">Carregando projetos...</p>
            </div>
          </SectionWrapper>
        );
      }

      if (!loading && portfolioItems.length === 0) {
        return (
          <SectionWrapper id="portfolio" title="Portfólio de Serviços">
            <div className="text-center py-10">
              <PackageSearch className="mx-auto h-24 w-24 text-slate-400 mb-6" />
              <h2 className="text-2xl font-semibold text-slate-600 mb-2">Nenhum projeto no portfólio ainda.</h2>
              <p className="text-slate-500">Volte em breve para ver nossos trabalhos!</p>
            </div>
          </SectionWrapper>
        );
      }


      return (
        <SectionWrapper id="portfolio" title="Portfólio de Serviços">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => openModal(item)}
                className="cursor-pointer group"
              >
                <Card className="overflow-hidden h-full flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <div className="relative h-56 w-full overflow-hidden">
                    <img 
                      alt={item.image_alt || item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                     src={item.image_url || "https://images.unsplash.com/photo-1595872018818-97555653a011"} />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-sky-700 group-hover:text-sky-600 transition-colors duration-300">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-slate-600 line-clamp-3">{item.description}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="text-sky-600 hover:text-sky-500 p-0">Ver Detalhes <ChevronRight className="ml-1 h-4 w-4" /></Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {selectedPortfolioItem && (
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="sm:max-w-[625px] bg-white p-0 rounded-lg shadow-2xl">
                <DialogHeader className="p-6 pb-0">
                  <DialogTitle className="text-2xl font-bold text-sky-700">{selectedPortfolioItem.title}</DialogTitle>
                  <DialogDescription className="text-slate-500 pt-1">{selectedPortfolioItem.category}</DialogDescription>
                </DialogHeader>
                <div className="p-6 space-y-4">
                  <div className="w-full h-64 md:h-80 rounded-md overflow-hidden">
                    <img 
                      alt={selectedPortfolioItem.image_alt || selectedPortfolioItem.title}
                      className="w-full h-full object-cover"
                     src={selectedPortfolioItem.image_url || "https://images.unsplash.com/photo-1694388001616-1176f534d72f"} />
                  </div>
                  <p className="text-slate-700 leading-relaxed">{selectedPortfolioItem.description}</p>
                </div>
                <DialogFooter className="p-6 pt-0">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Fechar</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </SectionWrapper>
      );
    };

    export default PortfolioSection;