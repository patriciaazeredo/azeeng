import React, { useState } from 'react';
    import { supabase } from '@/lib/supabase';
    import { useToast } from "@/components/ui/use-toast";
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Textarea } from '@/components/ui/textarea';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
    import { UploadCloud, Loader2 } from 'lucide-react';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
    import { useAuth } from '@/contexts/AuthContext';


    const PortfolioForm = ({ onPortfolioItemAdded }) => {
      const { toast } = useToast();
      const { user } = useAuth();
      const [title, setTitle] = useState('');
      const [description, setDescription] = useState('');
      const [category, setCategory] = useState('');
      const [imageFile, setImageFile] = useState(null);
      const [imageAlt, setImageAlt] = useState('');
      const [uploading, setUploading] = useState(false);
      const [previewImage, setPreviewImage] = useState(null);

      const serviceCategories = [
        "Vistorias Técnicas",
        "Laudos Técnicos",
        "Regularização de Imóveis",
        "Consultoria e Assessoria",
        "Outros Projetos"
      ];

      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setImageFile(file);
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewImage(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
          setImageFile(null);
          setPreviewImage(null);
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
          toast({
            title: "Não autenticado",
            description: "Você precisa estar logado para adicionar itens.",
            variant: "destructive",
          });
          return;
        }

        if (!title || !description || !category || !imageFile || !imageAlt) {
          toast({
            title: "Campos incompletos",
            description: "Por favor, preencha todos os campos e selecione uma imagem.",
            variant: "destructive",
          });
          return;
        }

        setUploading(true);

        try {
          const fileExt = imageFile.name.split('.').pop();
          const fileName = `${user.id}/${Date.now()}.${fileExt}`; // Prefix with user ID for better organization
          const filePath = `${fileName}`;

          let { error: uploadError } = await supabase.storage
            .from('portfolio_images')
            .upload(filePath, imageFile);

          if (uploadError) {
            throw uploadError;
          }
          
          const { data: urlData } = supabase.storage
            .from('portfolio_images')
            .getPublicUrl(filePath);

          if (!urlData || !urlData.publicUrl) {
            throw new Error("Não foi possível obter a URL pública da imagem.");
          }
          const imageUrl = urlData.publicUrl;
          
          const { data, error: insertError } = await supabase
            .from('portfolio_items')
            .insert([{ title, description, category, image_url: imageUrl, image_alt: imageAlt, user_id: user.id }])
            .select()
            .single();

          if (insertError) {
            throw insertError;
          }

          toast({
            title: "Sucesso!",
            description: "Novo item de portfólio adicionado.",
          });
          setTitle('');
          setDescription('');
          setCategory('');
          setImageFile(null);
          setPreviewImage(null);
          setImageAlt('');
          if (onPortfolioItemAdded && data) {
            onPortfolioItemAdded(data);
          }
        } catch (error) {
          console.error("Error:", error);
          toast({
            title: "Erro ao adicionar item",
            description: error.message || "Não foi possível adicionar o item ao portfólio.",
            variant: "destructive",
          });
        } finally {
          setUploading(false);
        }
      };

      return (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-sky-700">Adicionar Novo Item ao Portfólio</CardTitle>
            <CardDescription>Preencha os detalhes do projeto e faça upload de uma imagem.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Título do Projeto</label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Vistoria Predial Completa" required disabled={uploading} />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Descrição Detalhada</label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descreva os principais aspectos do projeto..." rows={4} required disabled={uploading} />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">Categoria do Serviço</label>
                <Select onValueChange={setCategory} value={category} disabled={uploading}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceCategories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="imageAlt" className="block text-sm font-medium text-slate-700 mb-1">Texto Alternativo da Imagem (SEO)</label>
                <Input id="imageAlt" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} placeholder="Descrição breve da imagem para acessibilidade" required disabled={uploading} />
              </div>
              <div>
                <label htmlFor="imageFile" className="block text-sm font-medium text-slate-700 mb-1">Imagem do Projeto</label>
                <Input id="imageFile" type="file" onChange={handleImageChange} accept="image/png, image/jpeg, image/webp, image/gif" required disabled={uploading} className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100" />
                {previewImage && (
                  <div className="mt-4">
                    <img  src={previewImage} alt="Pré-visualização" className="max-h-48 rounded-md shadow-md" />
                  </div>
                )}
              </div>
              <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-base py-3" disabled={uploading}>
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <UploadCloud className="mr-2 h-5 w-5" />
                    Adicionar ao Portfólio
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      );
    };

    export default PortfolioForm;