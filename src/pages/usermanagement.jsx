import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'; // Ensure you install react-modal: `npm install react-modal`
import axios from 'axios';
import OrderTable from '../components/OrderTable';

// Modal setup (make sure it's added to the root element of your app)
Modal.setAppElement('#root'); // Adjust this selector to match your app's root

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({ username: '', email: '', role: '' });
  const [userIdToEdit, setUserIdToEdit] = useState(null);

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users'); // Adjust API URL
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Open Modal for add/edit user
  const openModal = (user = { username: '', email: '', role: '' }, isEdit = false) => {
    setCurrentUser(user);
    setIsEditing(isEdit);
    setModalIsOpen(true);
  };

  // Close Modal and reset form
  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentUser({ username: '', email: '', role: '' });
    setUserIdToEdit(null);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  // Handle form submission for add/edit user
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:3000/users/${userIdToEdit}`, currentUser); // Update user by ID
      } else {
        await axios.post('http://localhost:3000/users', currentUser); // Create new user
      }
      const response = await axios.get('http://localhost:3000/users');
      setUsers(response.data); // Refresh users list
      closeModal(); // Close the modal
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  // Delete user by ID
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`); // Delete user by ID
      const response = await axios.get('http://localhost:3000/users'); // Refresh users list
      setUsers(response.data);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Edit user
  const handleEditUser = (user) => {
    setUserIdToEdit(user.userid); // Set the ID of the user being edited
    openModal(user, true);
  };

  return (

    
    <div className="min-h-screen bg-gray-50/30 p-4 md:p-6">
       {/* <div className="lg:col-span-3">
            <h2 className="mb-4 text-lg font-semibold">Client & Order Management Summary</h2>
             <OrderTable />
        </div> */}
    <h2 className="flex justify-start mb-4 text-lg font-semibold p-2 mt-4">Users management</h2>
      <div className="flex justify-end mb-4 pt-2">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        onClick={() => openModal()}
      >
        Add New User
      </button>
      </div>
      

      {/* Users table */}
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 font-medium">ID</th>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Role</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.userid} className="hover:bg-gray-50">
              <td className="px-4 py-3">{user.userid}</td>
              <td className="px-4 py-3">{user.name}</td>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3">{user.role}</td>
              <td className="px-4 py-3">
                <button
                  className="bg-blue-500 text-white p-1 rounded mr-2"
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white p-1 rounded"
                  onClick={() => handleDeleteUser(user.userid)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for add/edit user */}

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="User Modal" className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
  <div className="bg-white p-8 rounded-lg shadow-lg w-96">
    <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit User' : 'Add User'}</h2>
    <form onSubmit={handleFormSubmit}>
      
      {/* Username input */}
      <div className="mb-4">
        <label className="block mb-2">Username</label>
        <input
          type="text"
          name="username"
          value={currentUser.name}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      {/* Email input */}
      <div className="mb-4">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={currentUser.email}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      {/* Role input */}
      <div className="mb-4">
        <label className="block mb-2">Role</label>
        <select
          name="role"
          value={currentUser.role}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="" disabled>Select Role</option>
          <option value="admin">Admin</option>
          <option value="logistic">logistic</option>
          <option value="user">user</option>
          <option value="driver">driver</option>
        </select>
      </div>

      {/* Action buttons */}
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          {isEditing ? 'Update User' : 'Add User'}
        </button>
      </div>
    </form>
  </div>
</Modal>

    </div>
  );
}

export default UserManagement;
