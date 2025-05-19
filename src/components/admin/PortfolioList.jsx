import React, { useState, useEffect } from 'react';
    import { supabase } from '@/lib/supabase';
    import { useToast } from "@/components/ui/use-toast";
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Trash2, Edit, Eye, Loader2, PackageSearch } from 'lucide-react';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
    import { useAuth } from '@/contexts/AuthContext';

    const PortfolioList = ({ initialItems = [], onItemsUpdate }) => {
      const [items, setItems] = useState(initialItems);
      const [loading, setLoading] = useState(false);
      const [itemToDelete, setItemToDelete] = useState(null);
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      const { toast } = useToast();
      const { user } = useAuth();

      useEffect(() => {
        setItems(initialItems);
      }, [initialItems]);

      const openDeleteDialog = (item) => {
        setItemToDelete(item);
        setIsDeleteDialogOpen(true);
      };

      const handleDeleteItem = async () => {
        if (!itemToDelete || !user) {
          toast({
            title: "Ação não permitida",
            description: "Você precisa estar logado para excluir itens.",
            variant: "destructive",
          });
          return;
        }
        setLoading(true);
        try {
          
          const { error: dbError } = await supabase
            .from('portfolio_items')
            .delete()
            .match({ id: itemToDelete.id, user_id: user.id }); 

          if (dbError) throw dbError;

          if (itemToDelete.image_url) {
            const imagePath = itemToDelete.image_url.substring(itemToDelete.image_url.indexOf(user.id + '/')); // Ensure correct path with user_id
             await supabase.storage.from('portfolio_images').remove([imagePath]);
          }

          toast({
            title: "Item excluído!",
            description: "O item do portfólio foi removido com sucesso.",
          });
          const updatedItems = items.filter(item => item.id !== itemToDelete.id);
          setItems(updatedItems);
          if (onItemsUpdate) {
            onItemsUpdate(updatedItems);
          }
        } catch (error) {
          console.error("Error deleting item:", error);
          toast({
            title: "Erro ao excluir",
            description: error.message || "Não foi possível excluir o item.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
          setIsDeleteDialogOpen(false);
          setItemToDelete(null);
        }
      };
      
      if (loading && items.length === 0) {
        return (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
            <p className="ml-3 text-slate-600">Carregando itens...</p>
          </div>
        );
      }

      if (items.length === 0) {
        return (
          <div className="text-center py-10">
            <PackageSearch className="mx-auto h-16 w-16 text-slate-400 mb-4" />
            <p className="text-slate-500 text-lg">Nenhum item no portfólio ainda.</p>
            <p className="text-slate-400 text-sm">Adicione novos projetos usando o formulário acima.</p>
          </div>
        );
      }

      return (
        <div className="space-y-6">
          {items.map((item) => (
            <Card key={item.id} className="shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  {item.image_url ? (
                    <img  src={item.image_url} alt={item.image_alt || item.title} className="h-48 w-full object-cover md:h-full" />
                  ) : (
                    <div className="h-48 w-full bg-slate-200 flex items-center justify-center md:h-full">
                      <Eye className="h-12 w-12 text-slate-400" />
                    </div>
                  )}
                </div>
                <div className="md:w-2/3">
                  <CardHeader>
                    <CardTitle className="text-lg text-sky-700">{item.title}</CardTitle>
                    <CardDescription className="text-xs text-slate-500">{item.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 line-clamp-3">{item.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm" onClick={() => alert('Funcionalidade de edição a ser implementada.')} disabled={loading}>
                      <Edit className="mr-1 h-4 w-4" /> Editar
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => openDeleteDialog(item)} disabled={loading}>
                      <Trash2 className="mr-1 h-4 w-4" /> Excluir
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
          
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogDescription>
                  Tem certeza que deseja excluir o item "{itemToDelete?.title}"? Esta ação não pode ser desfeita e removerá a imagem associada.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" disabled={loading}>Cancelar</Button>
                </DialogClose>
                <Button variant="destructive" onClick={handleDeleteItem} disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                  Excluir
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    };

    export default PortfolioList;