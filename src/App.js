import { useState, useEffect } from "react";
import { UserList } from "./components/User";

function App() {
  const [userLists, setUserLists] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [showNewUser, setShowNewUser] = useState(false);

  const toggleShowNewUserOverlay = () => {
    setShowNewUser(!showNewUser);
  };

  /** Fetching userLists from the API and storing them in the userLists */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) {
          throw new Error('Bad Network Response');
        }

        const data = await res.json();
        setUserLists(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /** New user onChangeHandler */
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  /** Onsubmit handler */
  const handleSubmit = async (e) => {
    e.preventDefault();

    //API endpoint URL
    const apiUrl = "https://jsonplaceholder.typicode.com/users";

    // Create an object 
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    };

    // Sending POST request
    const response = await fetch(apiUrl, requestOptions);
    const newUserP = await response.json();

    setUserLists((userlists) => [...userlists, newUserP]);

    // clearing inputs after submission
    setNewUser({
      name: "",
      phone: "",
      email: "",
    });

    toggleShowNewUserOverlay(false);
  };

  // Update user function
  const updateUser = (updatedUser) => {};

  // Passing these functions to the userList component for onClick callback function 
  const deleteUser = (userID) => {
    setUserLists((userlists) => userlists.filter((list) => list.id !== userID));
  };

  //rendering view
  return (
    <div>
      <div className="relative w-full h-full bg-gray-100 flex flex-col items-start lg:items-center">
        <h1 className="text-lg lg:text-3xl font-semibold text-gray-600 mb-4 mr-2">
          User Management
        </h1>

        <button
          className="fixed right-8 top-4 lg:ml-[100vh] lg:mb-10 lg:static bg-blue-400 py-2 px-8 text-white shadow-md cursor-pointer rounded-lg text-sm"
          onClick={toggleShowNewUserOverlay}
        >
          Add New User
        </button>

        <div
          className={`${
            showNewUser ? "flex" : "hidden"
          } flex-col justify-start items-start bg-blue-400 p-4 m-2 fixed top-[100px] right-8 shadow-md - border border-1 rounded-lg`}
        >
          <h2 className="text-[20px] lg:text-[24px] ml-[95px] font-semibold mb-2">
            Add New User
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col lg:flex-row gap-2 mb-3">
              <label className="text-[18px] lg:text-lg font-semibold">
                Name:
              </label>
              <input type="text"  name="name" value={newUser.name} placeholder="Add Your Name" onChange={onChangeHandler} required className="w-full lg:w-[300px] p-3 rounded-lg"/>
            </div>

            <div className="flex flex-col lg:flex-row gap-3 mb-2">
              <label className="text-[18px] lg:text-lg font-semibold">
                Email:
              </label>
              <input type="text" name="email" value={newUser.email} placeholder="Add Email" onChange={onChangeHandler} required className="w-full lg:w-[300px] p-3 rounded-lg"/>
            </div>

            <div className="flex flex-col lg:flex-row gap-1 mb-2">
              <label className="text-[18px] lg:text-lg font-semibold">
                Phone:
              </label>
              <input type="number" name="phone" value={newUser.phone} placeholder="Add Phone Number" onChange={onChangeHandler} required className="w-full lg:w-[300px] p-3 rounded-lg"/>
            </div>

            <button
              type="submit"
              className="text-black-200 py-2 px-8 bg-green-400 shadow-md cursor-pointer rounded-lg text-sm lg:ml-20"
            >
              Create
            </button>
          </form>
        </div>

        {/* Conditionally rendering userLists component and loader */}
        {userLists ? (
          <div className="w-full lg:w-[900px] h-auto lg:h-[600px] py-4 px-4 rounded-lg shadow-md border border-1 overflow-y-scroll overflow-x-scroll lg:overscroll-x-none">
            {userLists.map((user) => {
              return (
                <UserList
                  key={user.id}
                  user={user}
                  deleteUser={deleteUser}
                  updateUser={updateUser}
                />
              );
            })}
          </div>
        ) : (
          <div className="w-full h-[80vh] bg-gray-100 flex flex-col items-center justify-center">
            <img src="/assets/loading-gif.webp" alt="loading" height={100} width={100} />
          </div>
        )}
      </div>
      <footer className="flex flex-col items-center">
        <h3>
          <p>&#169; All Rights Reserved</p>
        </h3>
        <p>
          <cite title="Source Title">Author: Ashootosh-R</cite>
        </p>
      </footer>
    </div>
  );
}

export default App;
