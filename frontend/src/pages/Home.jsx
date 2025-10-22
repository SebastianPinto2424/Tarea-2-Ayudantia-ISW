
import { useState } from 'react';
import Swal from 'sweetalert2';
import { getProfile, updateProfile, deleteProfile } from '../services/profile.service.js';

const Home = () => {
  const [perfil, setPerfil] = useState(null); 
  const [form, setForm] = useState({ email: '', password: '' }); 
  const [openEdit, setOpenEdit] = useState(false); 

  const handleGetProfile = async () => {
    try {
      const result = await getProfile();

      if (result.success) {
        setPerfil(result.data);
        setForm({ email: result.data.email || '', password: '' });

        await Swal.fire({
          title: '¡Perfil cargado!',
          text: 'Tu información se ha obtenido correctamente.',
          icon: 'success',
          confirmButtonColor: '#4F46E5'
        });
      } else {
        await Swal.fire({
          title: 'Error',
          text: result.message || 'No se pudo obtener el perfil.',
          icon: 'error',
          confirmButtonColor: '#d33'
        });
      }
    } catch (err) {
      console.error('Error al obtener perfil:', err);
      await Swal.fire('Error', 'Ocurrió un error inesperado.', 'error');
    }
  };

  const handleEdit = () => {
    if (!perfil) return;
    setForm({ email: perfil.email || '', password: '' });
    setOpenEdit(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        email: form.email || undefined,
        password: form.password || undefined
      };

      const res = await updateProfile(payload);

      if (res.success) {
        await Swal.fire({
          title: 'Perfil actualizado',
          text: 'Tu información fue modificada correctamente.',
          icon: 'success',
          confirmButtonColor: '#4F46E5'
        });

        setOpenEdit(false);
        await handleGetProfile();
      } else {
        await Swal.fire('Error', res.message || 'No se pudo actualizar el perfil.', 'error');
      }
    } catch (err) {
      console.error('Error al actualizar perfil:', err);
      await Swal.fire('Error', 'Error inesperado al actualizar perfil.', 'error');
    }
  };

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: '¿Eliminar cuenta?',
      text: 'Esta acción es irreversible. Tu perfil se eliminará permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await deleteProfile();

      if (res.success) {
        await Swal.fire('Eliminado', 'Tu cuenta fue eliminada correctamente.', 'success');
        setPerfil(null);
      } else {
        await Swal.fire('Error', res.message || 'Error al eliminar perfil.', 'error');
      }
    } catch (err) {
      console.error('Error al eliminar perfil:', err);
      await Swal.fire('Error', 'Error inesperado al eliminar perfil.', 'error');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-4xl transform transition-all hover:scale-[1.01]">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          Página de Inicio
        </h1>

        <div className="mb-6">
          <button
            onClick={handleGetProfile}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
          >
            Obtener Perfil
          </button>
        </div>

        {perfil && (
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span role="img" aria-label="doc">📋</span> Mi Perfil
            </h2>
            <p className="mb-1"><strong>Email:</strong> {perfil.email}</p>
            <p className="mb-4 break-all">
              <strong>Contraseña (encriptada):</strong> {perfil.password}
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleEdit}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Editar perfil
              </button>
              <button
                onClick={handleDelete}
                className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Eliminar perfil
              </button>
            </div>
          </div>
        )}

        {openEdit && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Editar mi Perfil</h3>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
                    placeholder="tu@correo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nueva contraseña (opcional)
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
                    placeholder="********"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                  >
                    Guardar cambios
                  </button>

                  <button
                    type="button"
                    onClick={() => setOpenEdit(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
