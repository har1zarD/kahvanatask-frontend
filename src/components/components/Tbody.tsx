import React from "react";

import { TbodyProps } from "../../types";
import Buttons from "./Buttons";

const Tbody: React.FC<TbodyProps> = ({ users, onEditClick, onDeleteClick }) => {
  return (
    <tbody>
      {users.map((user) => (
        <tr key={user._id}>
          <td className='p-2'>{user.firstName}</td>
          <td className='p-2'>{user.lastName}</td>
          <td className='p-2'>{user.email}</td>
          <td className='p-2'>{user.phoneNumber}</td>
          <td className='p-2 text-center flex justify-center'>
            <Buttons src='icons/editIcon.png' alt='edit' onClick={() => onEditClick(user)} />
            <Buttons src='icons/deleteIcon.png' alt='delete' onClick={() => onDeleteClick(user._id)} />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default Tbody;
