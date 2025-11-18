import { useState, useEffect, FC } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabase';
import { DeliveredWork } from '../../types';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import Spinner from './Spinner';

interface DeliveredWorkFormProps {
  workToEdit?: DeliveredWork | null;
  onClose: () => void;
  onSave: () => void;
}

type FormData = {
  product_name: string;
  client_name?: string;
};

const DeliveredWorkForm: FC<DeliveredWorkFormProps> = ({ workToEdit, onClose, onSave }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (workToEdit) {
      reset({
        product_name: workToEdit.product_name,
        client_name: workToEdit.client_name,
      });
      setExistingImageUrl(workToEdit.image_url);
    } else {
      reset();
      setExistingImageUrl(null);
    }
  }, [workToEdit, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) throw new Error("Nenhuma imagem selecionada.");
    
    const filePath = `public/${uuidv4()}-${imageFile.name}`;
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, imageFile);

    if (error) throw new Error(`Erro no upload da imagem: ${error.message}`);
    
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(data.path);
      
    return publicUrl;
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      let imageUrl = existingImageUrl;
      if (imageFile) {
        imageUrl = await uploadImage();
      }

      if (!imageUrl) {
        toast.error("A imagem do trabalho é obrigatória.");
        setIsSubmitting(false);
        return;
      }
      
      const workData = { ...data, image_url: imageUrl };

      let error;
      if (workToEdit) {
        const { error: updateError } = await supabase
          .from('delivered_works')
          .update(workData)
          .eq('id', workToEdit.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('delivered_works')
          .insert([workData]);
        error = insertError;
      }

      if (error) throw error;

      toast.success(`Trabalho ${workToEdit ? 'atualizado' : 'salvo'} com sucesso!`);
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
        <input {...register('product_name', { required: 'Nome é obrigatório' })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green" />
        {errors.product_name && <p className="text-red-500 text-xs mt-1">{errors.product_name.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome do Cliente (Opcional)</label>
        <input {...register('client_name')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Imagem</label>
        {existingImageUrl && !imageFile && (
          <div className="mt-2">
            <img src={existingImageUrl} alt="Imagem existente" className="h-32 w-auto object-cover rounded-md" />
          </div>
        )}
        <input type="file" onChange={handleImageChange} className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-green file:text-white hover:file:bg-opacity-90" />
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Cancelar</button>
        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-brand-green text-white rounded-md hover:bg-opacity-90 disabled:bg-gray-400 flex items-center gap-2">
          {isSubmitting && <Spinner />}
          {isSubmitting ? 'Salvando...' : 'Salvar Trabalho'}
        </button>
      </div>
    </form>
  );
};

export default DeliveredWorkForm;
