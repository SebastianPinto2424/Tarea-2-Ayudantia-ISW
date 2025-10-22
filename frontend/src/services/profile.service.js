
import axios from './root.service.js';

export const getProfile = async () => {
  try {
    const response = await axios.get('/profile/private', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    });

    return {
      success: true,
      data: response.data.data,
      message: response.data.message || 'Perfil obtenido correctamente',
    };
  } catch (error) {
    console.error('Error al obtener perfil:', error);

    return {
      success: false,
      message: error.response?.data?.message || 'Error al obtener perfil',
      data: null,
    };
  }
};

export const updateProfile = async ({ email, password }) => {
  try {
    const response = await axios.patch(
      '/profile/private',
      { email, password },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      success: true,
      data: response.data.data,
      message: response.data.message || 'Perfil actualizado correctamente',
    };
  } catch (error) {
    console.error('Error al actualizar perfil:', error);

    return {
      success: false,
      message: error.response?.data?.message || 'Error al actualizar perfil',
      data: null,
    };
  }
};

export const deleteProfile = async () => {
  try {
    const response = await axios.delete('/profile/private', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    });

    return {
      success: true,
      data: response.data.data,
      message: response.data.message || 'Perfil eliminado correctamente',
    };
  } catch (error) {
    console.error('Error al eliminar perfil:', error);

    return {
      success: false,
      message: error.response?.data?.message || 'Error al eliminar perfil',
      data: null,
    };
  }
};
