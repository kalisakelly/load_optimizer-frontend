import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  const redirectByRole = (role) => {
    const roleRoutes = {
      admin: '/home',
      logistics: '/home',
      driver: '/delivered-list',
      client: '/product-list',
    };
    return roleRoutes[role] || '/product-list';
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', values, {
          withCredentials: true,
        });

        if (response.data.message === 'success') {
          const { token, role } = response.data;

          localStorage.setItem('userToken', token);
          localStorage.setItem('userRole', role);

          navigate(redirectByRole(role));
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || error.message || 'An unknown error occurred';
        setLoginError(errorMessage);
        console.error('Login failed:', errorMessage);
        alert('Invalid credentials or an error occurred.');
      }
    },
  });

  useEffect(() => {
    if (formik.isSubmitting) {
      setLoginError(null);
    }
  }, [formik.isSubmitting]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {loginError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {loginError}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-indigo-600 hover:text-indigo-500">
            Sign up
          </a>
        </p>
        <p className="mt-4 text-center text-sm text-gray-600">
          Forgot password?{' '}
          <a href="/forgot-password" className="text-indigo-600 hover:text-indigo-500">
            Click here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
