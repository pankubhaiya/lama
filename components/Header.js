import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BiLogOutCircle } from "react-icons/bi";
import { LuIndianRupee } from "react-icons/lu";
import { FiChevronDown } from "react-icons/fi";
import { BiSupport } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdNotifications, IoNotifications, IoMdHome, IoMdArrowDown, IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io"
import { useRouter } from "next/router";
export default function Header({ Account }) {
    const [isEmailModalOpen, setEmailModalOpen] = useState(false);
    const [isCreateProjectModalOpen, setCreateProjectModalOpen] = useState(false);
    const [fileName, setFileName] = useState('');
    const [fileDescription, setFileDescription] = useState('')
    const [isProjectNameValid, setProjectNameValid] = useState(true);
    const [email, setEmail] = useState('');
    const [nav, setNav] = useState(false);
    const [username, setUsername] = useState("");
    const router = useRouter()

    useEffect(() => {
        setUsername(sessionStorage.getItem("name"));
    }, []);

    const openCreateProjectModal = () => {
        setEmailModalOpen(false);
        setCreateProjectModalOpen(true);
    };

    const closeCreateProjectModal = () => {
        setCreateProjectModalOpen(false);
        setFileName('');
        setFileDescription('');
        setProjectNameValid(true);
    };
    const handleCreateProject = async () => {
        if (fileName.trim() === '' || fileDescription.trim() === '') {
            setProjectNameValid(false);
        } else {
            try {
                const response = await fetch('/api/files', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    name: fileName,
                    description: fileDescription,
                    projectId: router.query.projectId
                  }),
                });
        
                if (response.ok) {
                  // Handle success, e.g., show a success message or redirect
                  alert('File added successfully!');
                  router.push(`/render_files?projectId=${router.query.projectId}`)
                } else {
                  // Handle error response
                  const error = await response.json();
                  console.error('Error adding file:', error);
                }
              } catch (error) {
                console.error('An error occurred:', error);
              }
            setProjectNameValid(true);
            // Close the create project modal
            closeCreateProjectModal();
        }
    };
    const navigate = useRouter();

    const handleLogout = () => {
        sessionStorage.clear();
        // Account = false;
        navigate("/");
    };

    return (
        <div className="w-full h-auto bg-white">
            <div className="w-full  rounded-tl-md ">
                <div className="h-[66px]   flex items-center justify-between bg-white  ">
                    <div className="m-2 flex gap-1">
                        <p><IoMdHome size={20} className="text-left text-sm text-[#7e22ce]" /></p><p className="text-[#7e22ce] text-left text-m">/ Sample Project /  Upload</p>

                    </div>
                    <div className="flex gap-5 bg-white">
                        <div className="">
                            <div
                                className={`flex px-4 py-2 rounded-[10px] cursor-pointer bg-white items-center w-auto`}

                            >
                                <div className="items-center flex gap-2 w-fit  ">
                                    <div className="flex items-center gap-3 w-fit border-[#7e22ce]">
                                        <IoMdArrowDropdown size={27} className="text-[#555555]" />
                                        <div>EN</div>
                                        <div className="">
                                            <img
                                                className="h-10 w-10 rounded-full"
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/United-kingdom_flag_icon_round.svg/2048px-United-kingdom_flag_icon_round.svg.png"
                                                alt="user"
                                            />
                                        </div>
                                        <h1>{username}</h1>
                                    </div>
                                    <div className="">
                                        <IoMdNotifications size={27} className="text-[#555555]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {nav ? (
                        <div className="z-[100] absolute shadow-lg rounded-[10px] bg-white  right-2 top-16 w-[180px] h-24 p-3">
                            <ul className="text-lg text-left">
                                <Link
                                    to={"/help"}>
                                    <li

                                        className={` flex items-center justify-start text-black gap-x-4 p-1 rounded-md cursor-pointer transition-all duration-500 hover:bg-primary hover:text-red`}
                                    >
                                        <BiSupport size={26} />
                                        Support
                                    </li>
                                </Link>
                                <li
                                    className={` flex items-center justify-start text-black gap-x-4 p-1 rounded-md cursor-pointer transition-all duration-500 hover:bg-primary hover:text-red`}
                                    onClick={() => handleLogout()}
                                >
                                    <BiLogOutCircle size={26} />
                                    Logout
                                </li>
                            </ul>
                        </div>
                    ) : null}

                </div>

            </div >

            <div>
                <div className="m-10 mt-5 text-left text-[#7e22ce]"><h1 className="text-4xl font-bold ">Upload</h1></div>

                <div class="grid grid-cols-3 gap-10 place-content-stretch h-48 w-full pr-20 pl-20">
                    <div onClick={openCreateProjectModal} className="border rounded-lg bg-white pl-5 pt-3 flex "> <img
                        className="h-10 w-10 rounded-2xl"
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a0/YouTube_social_red_circle_%282017%29.svg"
                        alt="user"
                    />
                        <div className="text-left ml-5 font-bold" > <p>Upload</p>
                            <p>Youtube Video</p>
                        </div>

                    </div>
                    <div onClick={openCreateProjectModal} className="border rounded-2xl  bg-white pl-5 pt-3 flex"><img
                        className="h-10 w-10 rounded-full"
                        src="https://rb.gy/todrwl"
                        alt="user"
                    />
                        <div className="text-left ml-5 font-bold" > <p>Upload</p>
                         
                            <p>Spotify Podcast</p>
                        </div></div>
                    <div onClick={openCreateProjectModal} className="border rounded-2xl bg-white pl-5 pt-3 flex"><img
                        className="h-10 w-10 "
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-4PhhECO0lWTSBfcBCO64_napA7zFNi-rzw&usqp=CAU"
                        alt="user"
                    />
                        <div className="text-left ml-5 font-bold" > <p>Upload</p>
                        <p>RSS Feed</p>
                        </div></div>
                    <div onClick={openCreateProjectModal} className="border rounded-2xl bg-white pl-5 pt-3 flex"> <img
                        className="h-10 w-10 rounded-full"
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a0/YouTube_social_red_circle_%282017%29.svg"
                        alt="user"
                    /><div className="text-left ml-5 font-bold" > <p>Upload</p>
                       <p>Youtube Video</p>
                        </div></div>
                    <div onClick={openCreateProjectModal} className="border rounded-2xl bg-white pl-5 pt-3 flex"><img
                        className="h-10 w-10 rounded-full"
                        src="https://rb.gy/todrwl"
                        alt="user"
                    /><div className="text-left ml-5 font-bold" > <p>Upload</p>
                           <p>Spotify Podcast</p>
                        </div></div>
                    <div onClick={openCreateProjectModal} className="border rounded-2xl bg-white pl-5 pt-3 flex"><img
                        className="h-10 w-10 "
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-4PhhECO0lWTSBfcBCO64_napA7zFNi-rzw&usqp=CAU"
                        alt="user"
                    />
                        <div className="text-left ml-5 font-bold" > <p>Upload</p>
                            <p>RSS Feed</p>
                        </div>
                    </div>
                </div>


                <p className="text-gray-500 text-2xl mt-5 justify-center w-full text-center">or</p>
                <div className="flex items-center justify-center w-full pr-5 mt-5">
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                                className="w-8 h-8 mb-4 text-[#7e22ce] dark:text-gray-400 "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Select a file or drag and drop here (Podcast Media or Transcription Text)</span>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                MP4, MOV, MP3, WAV, PDF, DOCX or TXT file
                            </p>

                            <button className="bg-white text-[#7e22ce] border rounded-lg  border-[#7e22ce]  mt-5 w-28">Select File</button>

                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div>
            </div>
            <div>
            { isCreateProjectModalOpen && <div className="fixed inset-0 bg-gray-100 opacity-80"></div>}
                {isCreateProjectModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="bg-white p-8 rounded-lg w-[70%]">
                            {/* <h2 className="text-2xl font-semibold mb-4">Create Project</h2> */}
                            <div  className="bg-white  pt-3 flex justify-between pb-5 ">
                                <div className="flex gap-2"> <img
                                    className="h-10 w-10 rounded-2xl"
                                    src="https://upload.wikimedia.org/wikipedia/commons/a/a0/YouTube_social_red_circle_%282017%29.svg"
                                    alt="user"
                                />
                                    <p className="pt-2">Upload From Youtube</p></div>
                                <div  onClick={closeCreateProjectModal}>X</div>
                            </div>
                            <label htmlFor="projectName" className="block mb-2 ">
                                Name
                            </label>
                            <input
                                type="text"
                                id="projectName"
                                placeholder="Type here"
                                className={`border p-2 mb-4 w-full ${!isProjectNameValid ? 'border-red-500' : ''
                                    }`}
                                value={fileName}
                                onChange={(e) => {
                                    setFileName(e.target.value);
                                    setProjectNameValid(true);
                                }}
                            />
                            <label htmlFor="projectName" className="block mb-2">
                                Description
                            </label>
                            <input
                                type="text"
                                id="projectName"
                                placeholder="Type here"
                                className={`border p-2 mb-4 w-full ${!isProjectNameValid ? 'border-red-500' : ''
                                    }`}
                                value={fileDescription}
                                onChange={(e) => {
                                    setFileDescription(e.target.value);
                                    setProjectNameValid(true);
                                }}
                            />
                            {!isProjectNameValid && (
                                <p className="text-red-500 mb-4">Description cannot be empty</p>
                            )}
                            <div className="flex justify-end">
                             
                                <button
                                    onClick={handleCreateProject}
                                    className="bg-[#7e22ce] text-white py-2 px-4 rounded-lg w-24"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}
