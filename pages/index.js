// pages/index.js
import Head from "next/head";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useEmailContext } from "../context/EmailContext";

const Home = () => {
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const [isCreateProjectModalOpen, setCreateProjectModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [isProjectNameValid, setProjectNameValid] = useState(true);
  const [isEmailValid, setEmailValid] = useState(true);
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { setGlobalEmail } = useEmailContext();
  const { globalEmail } = useEmailContext();
  // const { setGlobalEmail } = useGlobalContext(); // Update this based on your global context setup

  useEffect(() => {
    // Open the email modal when the component mounts
    setEmailModalOpen(true);
  }, []);

  const openCreateProjectModal = () => {
    setEmailModalOpen(false);
    setCreateProjectModalOpen(true);
  };

  const closeCreateProjectModal = () => {
    setCreateProjectModalOpen(false);
    setProjectName('');
    setProjectNameValid(true);
  };

  
  const handleCreateProject = async () => {
    if (projectName.trim() === '') {
      setProjectNameValid(false);
    } else {
      setProjectNameValid(true);
      // Close the create project modal
      try {
        // Send a POST request to create the project
        const response = await fetch('/api/projects/create_project', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ projectName, email: globalEmail }),
        });
        console.log(response)

        if (response.ok) {
          const result = await response.json();
          console.log(result)
          console.log(result);
          alert(result.message)
          router.push('/projects');
        } else {
          const error = await response.json();
          alert(response.message)
          setCreateProjectModalOpen(false)
          console.log(error);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  };

  const handleEmailRegistration = async()=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
      setEmailValid(false);
    } 
    else if(!emailRegex.test(email)){
      setEmailValid(false);
    }
    else{
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
  
        if (response.user) {
          const result = await response.json();
          console.log(result);
          alert(response.message)
          setEmailModalOpen(false)
          setGlobalEmail(email);
        }
         else {
          const error = await response.json();
          alert(error.message);
          setEmailModalOpen(false)
          setGlobalEmail(email);
          console.log(error.message);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }

  }
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col relative" >
      <Head>
        <title>Create New Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <nav className=" p-4 text-black flex justify-between items-center w-[95%] mx-auto">
        {/* Left side with logo */}
        <div className="flex items-center">
          <img src="/logo.svg" alt="Logo" className="w-8 h-8 mr-2" />
          <span className="text-xl font-bold text-[#7e22ce]">LAMA</span>
        </div>

        {/* Right side with icons */}
        <div className="flex items-center">
          <span className="mr-4">
            <i className="fas fa-cog"></i>
          </span>
          <span>
            <i className="fas fa-bell"></i>
          </span>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="container mx-auto rounded-lg   flex flex-col items-center justify-center p-8 w-2/3">
          <h1 className="text-5xl font-semibold mb-8 text-[#7e22ce]">Create a new project</h1>

          {/* Image */}
          <img
            src="/hero_img.jpeg"
            alt="Project"
            className="mb-4 rounded-lg max-w-full"
            style={{ width: "40%" }}
          />

          {/* Text */}
          <p className="text-gray-700 mb-4 w-[70%] text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in
          </p>

          {/* Button */}
          <button onClick={openCreateProjectModal} className="bg-black text-white py-2 px-4 rounded-lg flex items-center hover:bg-gray-800 hover:text-gray-200">
            <span className="mr-2">Create New Project</span>
            <i className="fas fa-plus"></i>
          </button>
                {/* Modal */}

                {isCreateProjectModalOpen && <div className="fixed inset-0 bg-gray-100 opacity-80"></div>}
                {isEmailModalOpen && <div className="fixed inset-0 bg-gray-100 opacity-80"></div>}
                {isEmailModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white shadow-md p-8 rounded-lg w-[70%]">
            <h2 className="text-2xl font-semibold mb-4">Enter Your Email</h2>
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              className="border p-2 mb-4 w-full"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setEmailValid(true);
              }}
            />
             {!isEmailValid && (
              <p className="text-red-500 mb-4">Enter Valid email</p>
            )}
            <div className="flex justify-end">
              <button onClick={handleEmailRegistration}  className="bg-[#7e22ce]  text-white py-2 px-4 rounded-lg">
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

{isCreateProjectModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white shadow-md p-8 rounded-lg w-[70%]">
            <h2 className="text-2xl font-semibold mb-4">Create Project</h2>
            <label htmlFor="projectName" className="block mb-2">
              Enter Project Name
            </label>
            <input
              type="text"
              id="projectName"
              placeholder="Type here"
              className={`border p-2 mb-4 w-full ${
                !isProjectNameValid ? 'border-red-500' : ''
              }`}
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                setProjectNameValid(true);
              }}
            />
            {!isProjectNameValid && (
              <p className="text-red-500 mb-4">Project name cannot be empty</p>
            )}
            <div className="flex justify-end">
              <button onClick={closeCreateProjectModal} className="mr-4 text-red-600">
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                className="bg-[#7e22ce] text-white py-2 px-4 rounded-lg"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
      </main>
    </div>
  );
};

export default Home;
