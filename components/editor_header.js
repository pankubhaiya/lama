import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BiLogOutCircle, BiSearch } from "react-icons/bi";
import { LuIndianRupee } from "react-icons/lu";
import { FiChevronDown } from "react-icons/fi";
import { BiSupport } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { IoMdNotifications, IoNotifications, IoMdHome, IoMdArrowDown, IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io"
import { useRouter } from "next/router";
export default function Header({ Account }) {
    const [isEmailModalOpen, setEmailModalOpen] = useState(false);
    const [isCreateProjectModalOpen, setCreateProjectModalOpen] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [isProjectNameValid, setProjectNameValid] = useState(true);
    const [isTextaria, setisTextaria] = useState(false);
    const [nav, setNav] = useState(false);
    const [username, setUsername] = useState("");
    const [text, setText] = useState('');
    const [fileId, setFileId] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Extract fileId from the query
        const { fileId } = router.query;
        if (fileId) {
          setFileId(fileId);
          // Fetch file description when fileId is available
          fetchFileDescription(fileId);
        }
      }, [isTextaria]);

    const fetchFileDescription = async (fileId) => {
        try {
          // Make a GET request to your API endpoint with fileId
          const response = await fetch(`/api/files?fileId=${fileId}`);
          const data = await response.json();
          if (response.ok) {
            setText(data.file.description);
          } else {
            console.error('Error fetching file description:', data.message);
          }
        } catch (error) {
          console.error('Error fetching file description:', error.message);
        }
      };

      const updateFileDescription = async (fileId, newDescription) => {
        try {
          const response = await fetch(`/api/files/?fileId=${fileId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              description: newDescription,
            }),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          console.log('File description updated:', data);
          setText(data.description)
          alert('File description updated ')
        } catch (error) {
          console.error('Error updating file description:', error);
        }
      };
      

    const openCreateProjectModal = () => {
        setEmailModalOpen(false);
        setCreateProjectModalOpen(true);
    };
    const openEditTextModal = () => {
        setisTextaria(true);

    };

    const saveAndExit = () => {
        updateFileDescription(fileId, text);
        setisTextaria(false);
      };
      

    const DiscardTextAria = () => {
        setText('')
        setisTextaria(false);

    };

    const closeCreateProjectModal = () => {
        setCreateProjectModalOpen(false);
        setProjectName('');
        setProjectNameValid(true);
    };
    const handleCreateProject = () => {
        if (projectName.trim() === '') {
            setProjectNameValid(false);
        } else {
            setProjectNameValid(true);
            // Close the create project modal
            closeCreateProjectModal();
        }
    };
 

    return (
        <div className="w-full h-auto bg-white">
            <div className="w-full  rounded-tl-md ">
                <div className="h-[66px]  flex items-center justify-between bg-white  ">
                    <div className="m-2 flex gap-1">
                        <p><IoMdHome size={20} className="text-left text-sm text-[#7e22ce]" /></p><p className="text-[#7e22ce] text-left text-m">/ Sample Project / Transcript</p>

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
                                    href={"/help"}>
                                    <li

                                        className={` flex items-center justify-start text-black gap-x-4 p-1 rounded-md cursor-pointer transition-all duration-500 hover:bg-primary hover:text-red`}
                                    >
                                        <BiSupport size={26} />
                                        Support
                                    </li>
                                </Link>
                                <li
                                    className={` flex items-center justify-start text-black gap-x-4 p-1 rounded-md cursor-pointer transition-all duration-500 hover:bg-primary hover:text-red`}
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
                <div className=" flex justify-between m-10 mt-5 text-left text-[#7e22ce] "><h1 className="text-4xl font-bold ">Edit Transcript</h1> {isTextaria ? (<div><button onClick={DiscardTextAria} className=" text-red-600 border border-red-600 font-bold  pt-2 rounded-lg w-40  pb-2">Discard</button> <button onClick={saveAndExit} className="  text-white bg-[#7e22ce] font-bold  pt-2  pb-2 rounded-lg w-40">Save & exit</button></div>) : null}</div>
                <div className="border border-[#7e22ce] p-5 ml-8 mr-8 rounded-md ">
                    <div className="flex justify-between ml-14 mr-16 ">
                        <div onClick={openEditTextModal} className="flex bg-gray-600 text-white w-32 p-1 pl-3 rounded-full"><span ><MdEdit size={27} className="text-white" /></span>Edit Mode</div>
                        <div><BiSearch size={27} className="text-[#7e22ce]" /></div>
                    </div>
                    {isTextaria ? (<div className="ml-8 mr-8 mt-5">
                        <>
                            <label
                                htmlFor="message"
                                className="block mb-2  text-xl text-[#7e22ce] dark:text-white"
                            >
                                Speaker
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                onChange={(e)=>setText(e.target.value)}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Write your thoughts here..."
                                value={text}
                            />
                        </>

                    </div>) : (<div className="ml-8 mr-8 mt-5">
                        <>
                            <label
                                htmlFor="message"
                                className="block mb-2  text-xl text-[#7e22ce] dark:text-white"
                            >
                                Speaker
                            </label>
                            <textarea
                                id="message"
                                rows={4}   
                                readOnly
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Write your thoughts here..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </>

                    </div>)}



                </div>

            </div>

        </div>
    );
}
