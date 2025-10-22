
import instance from './root.service.js';

export const getAllUsers = async () => {
  try {
    const response = await instance.get('profile/private/all');
    return {
      success: true,
      data: response.data.data,
      message: response.data.message
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Error al obtener usuarios',
      data: []
    };
  }
};
