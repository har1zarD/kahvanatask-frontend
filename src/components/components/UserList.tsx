import axios from "axios";
import React, { useEffect, useState } from "react";

import { User } from "../../types";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [, setEditingUserId] = useState<string | null>(null);
  const [, setFormData] = useState<User>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user: User) => {
    setFormData(user);
    setEditingUserId(user._id);
  };

  const handleDeleteClick = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h2 className='text-lg font-semibold'>User List</h2>
      <table className='w-full border-collapse border mt-4'>
        <thead>
          <tr className='bg-gray-100 text-left'>
            <th className='p-2'>First Name</th>
            <th className='p-2'>Last Name</th>
            <th className='p-2'>Email</th>
            <th className='p-2'>Phone Number</th>
            <th className='p-2 text-center'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className='p-2'>{user.firstName}</td>
              <td className='p-2'>{user.lastName}</td>
              <td className='p-2'>{user.email}</td>
              <td className='p-2'>{user.phoneNumber}</td>
              <td className='p-2 text-center flex justify-center'>
                <button className='icon-container transform transition-transform hover:scale-125'>
                  <img
                    src='icons/editIcon.png'
                    alt='edit'
                    className=' text-white  w-6 h-6 '
                    onClick={() => handleEditClick(user)}
                  />
                </button>
                <button className='icon-container transform transition-transform hover:scale-125'>
                  <img
                    src='icons/deleteIcon.png'
                    alt='delete'
                    className=' text-white  w-6 h-6 '
                    onClick={() => handleDeleteClick(user._id)}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
