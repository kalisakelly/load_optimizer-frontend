import  { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

// Modal setup
Modal.setAppElement('#root');

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', role: '' });
  const [userIdToEdit, setUserIdToEdit] = useState(null);

  const token = localStorage.getItem('userToken');
  

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users', authHeaders);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const openModal = (user = { name: '', email: '', role: '' }, isEdit = false) => {
    setCurrentUser(user);
    setIsEditing(isEdit);
    setUserIdToEdit(user.userid || null);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentUser({ name: '', email: '', role: '' });
    setUserIdToEdit(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const userPayload = {
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role,
      };

      if (isEditing) {
        await axios.patch(`http://localhost:3000/users/${userIdToEdit}`, userPayload, authHeaders);
      } else {
        await axios.post('http://localhost:3000/users', userPayload, authHeaders);
      }

      await fetchUsers();
      closeModal();
    } catch (error) {
      console.error('Error saving user:', error.response?.data || error.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`, authHeaders);
      await fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error.response?.data || error.message);
    }
  };

  const handleEditUser = (user) => {
    openModal(
      {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      true
    );
    setUserIdToEdit(user.userid);
  };

  return (
    <div className="min-h-screen bg-gray-50/30 p-4 md:p-6">
      <h2 className="flex justify-start mb-4 text-lg font-semibold p-2 mt-4">Users management</h2>

      <div className="flex justify-end mb-4 pt-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => openModal()}
        >
          Add New User
        </button>
      </div>

      <table className="w-full text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 font-medium">ID</th>
            <th className="px-4 py-3 font-medium">Username</th>
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

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="User Modal"
        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit User' : 'Add User'}</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Username</label>
              <input
                type="text"
                name="name"
                value={currentUser.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

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

            <div className="mb-4">
              <label className="block mb-2">Role</label>
              <select
                name="role"
                value={currentUser.role}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              >
                <option value="" disabled>Select Role</option>
                <option value="admin">Admin</option>
                <option value="logistic">Logistic</option>
                <option value="client">Client</option>
                <option value="driver">Driver</option>
              </select>
            </div>

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
