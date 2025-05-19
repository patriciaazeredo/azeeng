import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { useToast } from "@/components/ui/use-toast";
    import { supabase } from '@/lib/supabase';
    import { useAuth } from '@/contexts/AuthContext';
    import { LogIn } from 'lucide-react';

    const AdminLoginPage = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [loading, setLoading] = useState(false);
      const { toast } = useToast();
      const navigate = useNavigate();
      const { login } = useAuth();

      const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;

          if (data.user) {
            login(data.user, data.session);
            toast({
              title: "Login bem-sucedido!",
              description: "Redirecionando para o painel...",
            });
            navigate('/admin/dashboard');
          } else {
             toast({
              title: "Erro de Login",
              description: "Usuário não encontrado ou credenciais inválidas.",
              variant: "destructive",
            });
          }
        } catch (error) {
          toast({
            title: "Erro de Login",
            description: error.message || "Ocorreu um erro ao tentar fazer login.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };

      return (
        <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center p-4 bg-gradient-to-br from-sky-100 via-slate-50 to-stone-100">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-full max-w-md shadow-2xl">
              <CardHeader className="text-center">
                <div className="mx-auto bg-sky-600 p-3 rounded-full w-fit mb-4">
                  <LogIn size={32} className="text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-sky-700">Acesso Administrativo</CardTitle>
                <CardDescription className="text-slate-600">
                  Faça login para gerenciar o conteúdo do site.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-slate-50 border-slate-300 focus:ring-sky-500 focus:border-sky-500"
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-slate-700">Senha</label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-slate-50 border-slate-300 focus:ring-sky-500 focus:border-sky-500"
                      disabled={loading}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-lg py-3" disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="text-center block">
                <p className="text-xs text-slate-500">
                  Esta área é restrita a administradores autorizados.
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      );
    };

    export default AdminLoginPage;