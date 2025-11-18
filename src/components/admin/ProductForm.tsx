import { useState, useEffect, FC } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabase';
import { Product } from '../../types';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import Spinner from './Spinner';

interface ProductFormProps {
  productToEdit?: Product | null;
  onClose: () => void;
  onSave: () => void;
}

type FormData = {
  name: string;
  description: string;
  size: string;
  price_range: string;
};

const ProductForm: FC<ProductFormProps> = ({ productToEdit, onClose, onSave }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      reset({
        name: productToEdit.name,
        description: productToEdit.description,
        size: productToEdit.size,
        price_range: productToEdit.price_range,
      });
      setExistingImageUrls(productToEdit.image_urls || []);
    } else {
      reset();
      setExistingImageUrls([]);
    }
  }, [productToEdit, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const uploadImages = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    for (const file of imageFiles) {
      const filePath = `public/${uuidv4()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (error) {
        throw new Error(`Erro no upload da imagem: ${error.message}`);
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(data.path);
      
      uploadedUrls.push(publicUrl);
    }
    return uploadedUrls;
  };
  
  const removeExistingImage = (urlToRemove: string) => {
    setExistingImageUrls(prev => prev.filter(url => url !== urlToRemove));
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      let newImageUrls: string[] = [];
      if (imageFiles.length > 0) {
        newImageUrls = await uploadImages();
      }
      
      const allImageUrls = [...existingImageUrls, ...newImageUrls];

      const productData = {
        ...data,
        image_urls: allImageUrls,
      };

      let error;
      if (productToEdit) {
        const { error: updateError } = await supabase
          .from('products')
          .update(productData)
          .eq('id', productToEdit.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('products')
          .insert([productData]);
        error = insertError;
      }

      if (error) throw error;

      toast.success(`Produto ${productToEdit ? 'atualizado' : 'salvo'} com sucesso!`);
      onSave();
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Ocorreu um erro.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome do Produto</label>
        <input {...register('name', { required: 'Nome é obrigatório' })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green" />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea {...register('description', { required: 'Descrição é obrigatória' })} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green"></textarea>
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tamanho/Dimensões</label>
        <input {...register('size', { required: 'Tamanho é obrigatório' })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green" />
        {errors.size && <p className="text-red-500 text-xs mt-1">{errors.size.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Faixa de Preço</label>
        <input {...register('price_range', { required: 'Preço é obrigatório' })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green" />
        {errors.price_range && <p className="text-red-500 text-xs mt-1">{errors.price_range.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Imagens</label>
        {existingImageUrls.length > 0 && (
          <div className="mt-2 grid grid-cols-3 gap-2">
            {existingImageUrls.map(url => (
              <div key={url} className="relative">
                <img src={url} alt="Imagem existente" className="h-24 w-full object-cover rounded-md" />
                <button type="button" onClick={() => removeExistingImage(url)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 text-xs">X</button>
              </div>
            ))}
          </div>
        )}
        <input type="file" multiple onChange={handleImageChange} className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-green file:text-white hover:file:bg-opacity-90" />
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Cancelar</button>
        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-brand-green text-white rounded-md hover:bg-opacity-90 disabled:bg-gray-400 flex items-center gap-2">
          {isSubmitting && <Spinner />}
          {isSubmitting ? 'Salvando...' : 'Salvar Produto'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
