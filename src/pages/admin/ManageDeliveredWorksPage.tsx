import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { DeliveredWork } from '../../types';
import toast from 'react-hot-toast';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import Modal from '../../components/admin/Modal';
import DeliveredWorkForm from '../../components/admin/DeliveredWorkForm';
import Spinner from '../../components/admin/Spinner';

const ManageDeliveredWorksPage = () => {
  const [works, setWorks] = useState<DeliveredWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workToEdit, setWorkToEdit] = useState<DeliveredWork | null>(null);

  const fetchWorks = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('delivered_works').select('*').order('created_at', { ascending: false });
    if (error) {
      toast.error('Erro ao buscar trabalhos.');
    } else {
      setWorks(data as DeliveredWork[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchWorks();
  }, [fetchWorks]);

  const handleAdd = () => {
    setWorkToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (work: DeliveredWork) => {
    setWorkToEdit(work);
    setIsModalOpen(true);
  };

  const handleDelete = async (workId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este trabalho?')) {
      const { error } = await supabase.from('delivered_works').delete().eq('id', workId);
      if (error) {
        toast.error('Erro ao excluir trabalho.');
      } else {
        toast.success('Trabalho excluído com sucesso!');
        fetchWorks();
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Trabalhos Entregues</h1>
        <button onClick={handleAdd} className="bg-brand-green text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-opacity-90">
          <PlusCircle size={20} />
          Adicionar Trabalho
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center"><Spinner /></div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trabalho</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {works.map((work) => (
                <tr key={work.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-md object-cover" src={work.image_url || 'https://img-wrapper.vercel.app/image?url=https://placehold.co/40x40'} alt={work.product_name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{work.product_name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{work.client_name || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEdit(work)} className="text-indigo-600 hover:text-indigo-900 mr-4"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(work.id)} className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={workToEdit ? 'Editar Trabalho' : 'Adicionar Novo Trabalho'}>
        <DeliveredWorkForm 
          workToEdit={workToEdit} 
          onClose={() => setIsModalOpen(false)} 
          onSave={() => {
            setIsModalOpen(false);
            fetchWorks();
          }}
        />
      </Modal>
    </div>
  );
};

export default ManageDeliveredWorksPage;
