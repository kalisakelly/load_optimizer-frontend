import { useFormik } from 'formik';

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      name: '',  
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input 
            type="text" 
            name="name" 
            value={formik.values.name} 
            onChange={formik.handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

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

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password" 
            name="password" 
            value={formik.values.password} 
            onChange={formik.handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input 
            type="password" 
            name="confirmPassword" 
            value={formik.values.confirmPassword} 
            onChange={formik.handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Continue
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-indigo-600 hover:text-indigo-500">Sign in</a>
        </p>
      </form>
    </div>
  );
}

export default Signup;