import React, { useEffect, useState, useCallback } from 'react';
    import { motion } from 'framer-motion';
    import { supabase } from '@/lib/supabase';
    import { useToast } from "@/components/ui/use-toast";
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
    import { Badge } from "@/components/ui/badge";
    import { Mail, Phone, User, MessageSquare, CalendarDays, Loader2, Briefcase } from 'lucide-react';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
    import PortfolioForm from '@/components/admin/PortfolioForm';
    import PortfolioList from '@/components/admin/PortfolioList';
    import { useAuth } from '@/contexts/AuthContext';

    const AdminDashboardPage = () => {
      const [contactMessages, setContactMessages] = useState([]);
      const [portfolioItems, setPortfolioItems] = useState([]);
      const [loadingMessages, setLoadingMessages] = useState(true);
      const [loadingPortfolio, setLoadingPortfolio] = useState(true);
      const { toast } = useToast();
      const { user } = useAuth();

      const fetchContactMessages = useCallback(async () => {
        setLoadingMessages(true);
        try {
          const { data, error } = await supabase
            .from('contact_messages')
            .select('*')
            .order('created_at', { ascending: false });
          if (error) throw error;
          setContactMessages(data || []);
        } catch (error) {
          toast({
            title: "Erro ao buscar mensagens",
            description: error.message || "Não foi possível carregar as mensagens de contato.",
            variant: "destructive",
          });
        } finally {
          setLoadingMessages(false);
        }
      }, [toast]);

      const fetchPortfolioItems = useCallback(async () => {
        if (!user) {
          setLoadingPortfolio(false);
          return;
        }
        setLoadingPortfolio(true);
        try {
          const { data, error } = await supabase
            .from('portfolio_items')
            .select('*')
            // .eq('user_id', user.id) // Fetch only items by the logged-in user if RLS is set for user-specific items
            .order('created_at', { ascending: false });
          if (error) throw error;
          setPortfolioItems(data || []);
        } catch (error) {
          toast({
            title: "Erro ao buscar portfólio",
            description: error.message || "Não foi possível carregar os itens do portfólio.",
            variant: "destructive",
          });
        } finally {
          setLoadingPortfolio(false);
        }
      }, [toast, user]);

      useEffect(() => {
        fetchContactMessages();
        if (user) { // Only fetch portfolio if user is available
          fetchPortfolioItems();
        }
      }, [fetchContactMessages, fetchPortfolioItems, user]);

      const handlePortfolioItemAdded = (newItem) => {
        setPortfolioItems(prevItems => [newItem, ...prevItems]);
        // Optionally re-fetch to ensure consistency if other admins might be adding items
        // fetchPortfolioItems(); 
      };
      
      const handlePortfolioItemsUpdate = (updatedItems) => {
        setPortfolioItems(updatedItems);
        // Optionally re-fetch
        // fetchPortfolioItems();
      };


      const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
          return new Date(dateString).toLocaleString('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
          });
        } catch (e) { return 'Data inválida'; }
      };

      return (
        <div className="container mx-auto py-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-sky-700 mb-8">Painel Administrativo</h1>

            <Tabs defaultValue="messages" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex mb-6">
                <TabsTrigger value="messages" className="text-base">
                  <MessageSquare className="mr-2 h-5 w-5" /> Mensagens
                </TabsTrigger>
                <TabsTrigger value="portfolio" className="text-base">
                  <Briefcase className="mr-2 h-5 w-5" /> Portfólio
                </TabsTrigger>
              </TabsList>

              <TabsContent value="messages">
                <Card className="shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl text-sky-600 flex items-center">
                      <MessageSquare className="mr-2 h-6 w-6" /> Mensagens de Contato Recebidas
                    </CardTitle>
                    <CardDescription>
                      Visualize as mensagens enviadas através do formulário de contato do site.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loadingMessages ? (
                      <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-12 w-12 animate-spin text-sky-600" />
                        <p className="ml-4 text-lg text-slate-600">Carregando mensagens...</p>
                      </div>
                    ) : contactMessages.length === 0 ? (
                      <p className="text-center text-slate-500 py-10 text-lg">Nenhuma mensagem recebida ainda.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[200px]">Nome</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Telefone</TableHead>
                              <TableHead>Serviço</TableHead>
                              <TableHead>Mensagem</TableHead>
                              <TableHead className="text-right">Data</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {contactMessages.map((msg) => (
                              <TableRow key={msg.id}>
                                <TableCell className="font-medium flex items-center">
                                  <User className="mr-2 h-4 w-4 text-sky-600" /> {msg.name}
                                </TableCell>
                                <TableCell>
                                  <a href={`mailto:${msg.email}`} className="text-sky-600 hover:underline flex items-center">
                                    <Mail className="mr-2 h-4 w-4" /> {msg.email}
                                  </a>
                                </TableCell>
                                <TableCell>
                                  {msg.phone ? (
                                    <a href={`tel:${msg.phone}`} className="text-sky-600 hover:underline flex items-center">
                                      <Phone className="mr-2 h-4 w-4" /> {msg.phone}
                                    </a>
                                  ) : (<span className="text-slate-400">N/A</span>)}
                                </TableCell>
                                <TableCell><Badge variant="secondary" className="bg-sky-100 text-sky-700">{msg.service}</Badge></TableCell>
                                <TableCell className="max-w-xs truncate" title={msg.message}>{msg.message}</TableCell>
                                <TableCell className="text-right text-sm text-slate-500 flex items-center justify-end">
                                  <CalendarDays className="mr-2 h-4 w-4" /> {formatDate(msg.created_at)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="portfolio">
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                  <div className="lg:col-span-1">
                    <PortfolioForm onPortfolioItemAdded={handlePortfolioItemAdded} />
                  </div>
                  <div className="lg:col-span-2">
                    <Card className="shadow-xl">
                      <CardHeader>
                        <CardTitle className="text-2xl text-sky-600 flex items-center">
                          <Briefcase className="mr-2 h-6 w-6" /> Itens do Portfólio
                        </CardTitle>
                        <CardDescription>
                          Gerencie os projetos exibidos na seção de portfólio do site.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {loadingPortfolio && portfolioItems.length === 0 && user ? (
                           <div className="flex justify-center items-center h-64">
                            <Loader2 className="h-12 w-12 animate-spin text-sky-600" />
                            <p className="ml-4 text-lg text-slate-600">Carregando portfólio...</p>
                          </div>
                        ) : !user ? (
                           <p className="text-center text-slate-500 py-10 text-lg">Faça login para gerenciar o portfólio.</p>
                        )
                         : (
                          <PortfolioList initialItems={portfolioItems} onItemsUpdate={handlePortfolioItemsUpdate} />
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      );
    };

    export default AdminDashboardPage;