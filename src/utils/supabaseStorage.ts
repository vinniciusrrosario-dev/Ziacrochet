import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

/**
 * Envia um arquivo para o bucket 'product-images' no Supabase Storage.
 * Retorna a URL pública do arquivo.
 */
export const uploadFileToSupabase = async (file: File): Promise<string> => {
    const filePath = `public/${uuidv4()}-${file.name}`;
    
    // 1. Upload do arquivo
    const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

    if (error) {
        throw new Error(`Erro no upload da imagem: ${error.message}`);
    }
    
    // 2. Obter a URL pública
    const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(data.path);
        
    return publicUrl;
};