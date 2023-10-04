import React, { useState } from "react";

export const UserList = ({ user, deleteUser, updateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    // Send a request to update the user's data the usersList
    updateUser(editedUser);

    // Exit edit mode
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  return (
    <div
      key={user.id}
      className="w-full flex flex-col lg:flex-row justify-between items-center border border-1 mb-4 p-4 rounded-lg"
    >
      {isEditing ? (
        <div className="flex flex-col lg:flex-row justify-between gap-2">
          {/* editing view */}
          <input type="text" name="name" value={editedUser.name} onChange={handleInputChange} className="w-full lg:w-[200px] p-3 rounded-lg" />

          <input type="email" name="email" value={editedUser.email} className="w-full lg:w-[200px] p-3 rounded-lg mt-2 lg:mt-0" onChange={handleInputChange} />

          <input type="text" name="phone" value={editedUser.phone} className="w-full lg:w-[fit] p-3 rounded-lg mt-2 lg:mt-0" onChange={handleInputChange} />

          <button
            className="bg-red-500 py-2 px-8 text-white shadow-md cursor-pointer rounded-lg text-sm mr-2"
            onClick={handleCancel}
          >
            cancel
          </button>
          <button
            className="bg-green-500 py-2 px-8 text-white shadow-md cursor-pointer rounded-lg text-sm mt-2 lg:mt-0"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      ) : (
        <>
          {/* showing information view */}
          <h3 className="text-[15px] w-full lg:w-[100px] mt-2 lg:mt-0 lg:mr-4">
            {editedUser.name}
          </h3>

          <p className="text-[13px] w-full lg:w-[150px] mt-2 lg:mt-0 lg:mr-4">
            {editedUser.email}
          </p>
          <p className="text-[13px] w-full lg:w-[130px] mt-2 lg:mt-0 lg:mr-4">
            {editedUser.phone}
          </p>
          <div className="mt-2 lg:mt-0">
            <button
              className="bg-green-600 py-2 px-8 text-white shadow-md cursor-pointer rounded-lg text-sm mr-2"
              onClick={handleEdit}
            >
              Edit
            </button>

            <button
              className="bg-red-500 py-2 px-8 text-white shadow-md cursor-pointer rounded-lg text-sm mt-2 lg:mt-0"
              onClick={() => deleteUser(user.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};
