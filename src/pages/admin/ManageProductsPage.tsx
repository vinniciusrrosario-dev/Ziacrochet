import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { Product } from '../../types';
import toast from 'react-hot-toast';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import Modal from '../../components/admin/Modal';
import ProductForm from '../../components/admin/ProductForm';
import Spinner from '../../components/admin/Spinner';

const ManageProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (error) {
      toast.error('Erro ao buscar produtos.');
    } else {
      setProducts(data as Product[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAdd = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (productId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      const { error } = await supabase.from('products').delete().eq('id', productId);
      if (error) {
        toast.error('Erro ao excluir produto.');
      } else {
        toast.success('Produto excluído com sucesso!');
        fetchProducts();
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Produtos</h1>
        <button onClick={handleAdd} className="bg-brand-green text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-opacity-90">
          <PlusCircle size={20} />
          Adicionar Produto
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center"><Spinner /></div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preço</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-md object-cover" src={product.image_urls?.[0] || 'https://img-wrapper.vercel.app/image?url=https://placehold.co/40x40'} alt={product.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price_range}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEdit(product)} className="text-indigo-600 hover:text-indigo-900 mr-4"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={productToEdit ? 'Editar Produto' : 'Adicionar Novo Produto'}>
        <ProductForm 
          productToEdit={productToEdit} 
          onClose={() => setIsModalOpen(false)} 
          onSave={() => {
            setIsModalOpen(false);
            fetchProducts();
          }}
        />
      </Modal>
    </div>
  );
};

export default ManageProductsPage;
