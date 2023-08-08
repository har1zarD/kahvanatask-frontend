import { useState, useEffect } from "react";
import axios from "axios";

import { User } from "../../types";

import Inputs from "../components/Inputs";
import RawHead from "../components/RawHead";
import Pagination from "../pagination/Pagination";
import Header from "../components/Header";
import Tbody from "../components/Tbody";

const MainPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState<User>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const displayedUsers = users.slice(indexOfFirstUser, indexOfLastUser);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (editingUserId) {
        await axios.put(`http://localhost:8000/users/${editingUserId}`, formData);
        setEditingUserId(null);
      } else {
        await axios.post("http://localhost:8000/users", formData);
      }

      setFormData({
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
      });

      fetchUsers();
    } catch (error) {
      console.error("Error creating/editing user:", error);
    }
  };

  const inputFields = [
    { label: "First name", key: "firstName", type: "text" },
    { label: "Last name", key: "lastName", type: "text" },
    { label: "Email", key: "email", type: "email" },
    { label: "Phone number", key: "phoneNumber", type: "text" },
  ];

  return (
    <div className='max-w-3xl mx-auto p-4 py-14'>
      <Header name='Kahvana Task - Haris Velić' />
      <main>
        <div className='mb-4'>
          <h2 className='text-2xl font-semibold mb-2 text-center py-4'>Code Challange</h2>
          <form onSubmit={handleSubmit}>
            {inputFields.map((field) => (
              <Inputs
                placeholder={field.label}
                key={field.key}
                type={field.type}
                name={`${field.label}:`}
                value={formData[field.key]}
                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
              />
            ))}
            <div className='mt-4'>
              <button
                type='submit'
                className='bg-blue-500 text-white p-2 rounded mr-2 transform transition-transform hover:scale-110'
              >
                {editingUserId ? "Update User" : "Create User"}
              </button>
              {editingUserId && (
                <button
                  type='button'
                  className='bg-gray-500 text-white p-2 rounded transform transition-transform hover:scale-110'
                  onClick={() => {
                    setEditingUserId(null);
                    setFormData({
                      _id: "",
                      firstName: "",
                      lastName: "",
                      email: "",
                      phoneNumber: "",
                    });
                  }}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>
        <div>
          <h2 className='text-2xl font-semibold text-center '>User List</h2>
          <table className='w-full border-collapse border mt-4'>
            <RawHead />
            <Tbody users={displayedUsers} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} />
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(users.length / usersPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </div>
  );
};

export default MainPage;
