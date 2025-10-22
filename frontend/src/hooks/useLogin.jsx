/*
import { useState } from 'react';

const useLogin = () => {
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const errorData = (dataMessage) => {
        if (dataMessage) {
            if (dataMessage.includes('email') || dataMessage.includes('Email')) {
                setErrorEmail(dataMessage);
            } else if (dataMessage.includes('password') || dataMessage.includes('contraseña')) {
                setErrorPassword(dataMessage);
            }
        }
    };

    const handleInputChange = () => {
        setErrorEmail('');
        setErrorPassword('');
    };

    return {
        errorEmail,
        errorPassword,
        errorData,
        handleInputChange
    };
};

export default useLogin;
*/

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth.service.js';
import Swal from 'sweetalert2';

const useLogin = () => {
  const navigate = useNavigate();
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const errorData = (dataMessage) => {
    if (dataMessage) {
      if (dataMessage.includes('email') || dataMessage.includes('Email')) {
        setErrorEmail(dataMessage);
      } else if (dataMessage.includes('password') || dataMessage.includes('contraseña')) {
        setErrorPassword(dataMessage);
      }
    }
  };

  const handleInputChange = () => {
    setErrorEmail('');
    setErrorPassword('');
  };

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const response = await login({ email, password });

      if (response.status === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          showConfirmButton: false,
          timer: 1500,
        });

        sessionStorage.setItem('usuario', JSON.stringify(response.data.user));
        navigate('/home');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: response.message || 'Credenciales incorrectas',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudo conectar al servidor.',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    errorEmail,
    errorPassword,
    errorData,
    handleInputChange,
    handleLogin,
    loading,
  };
};

export default useLogin;
