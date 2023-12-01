import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BiLogOutCircle, BiSearch } from "react-icons/bi";
import { LuIndianRupee } from "react-icons/lu";
import { FiChevronDown } from "react-icons/fi";
import { BiSupport } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { IoMdNotifications, IoNotifications, IoMdHome, IoMdArrowDown, IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io"
export default function Header({ Account }) {
    const [isEmailModalOpen, setEmailModalOpen] = useState(false);
    const [isCreateProjectModalOpen, setCreateProjectModalOpen] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [isProjectNameValid, setProjectNameValid] = useState(true);
    const [isTextaria, setisTextaria] = useState(false);
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');
    const [isOption, setOption] = useState(true);
    const [nav, setNav] = useState(false);
    const [username, setUsername] = useState("");

  

    const openCreateProjectModal = () => {
        setEmailModalOpen(false);
        setCreateProjectModalOpen(true);
    };
    const TrueOption = () => {
        setOption(true);

    };
    const falseOption = () => {
        setOption(false);

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
            // Save email to global context
            // setGlobalEmail(email);

            // Handle project creation logic here
            // Reset validation state
            setProjectNameValid(true);
            // Close the create project modal
            closeCreateProjectModal();
        }
    };

    return (
        <div className="w-full h-auto bg-white ">
            <div className="w-full  rounded-tl-md ">
                <div className="h-[66px]  flex items-center justify-between bg-white  ">
                    <div className="m-2 flex gap-1">
                        <p><IoMdHome size={20} className="text-left text-sm text-[#7e22ce]" /></p><p className="text-[#7e22ce] text-left text-m">/ Sample Project / configuration</p>

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

            <div>{isOption ? (<div>
                <div className=" flex justify-between m-10 mt-5 text-left text-[#7e22ce] "><h1 className="text-4xl font-bold ">configuration</h1></div>
                <div className=" flex  p-5 ml-14 mr-8 rounded-md ">
                    <div onClick={TrueOption} className=" text-[#7e22ce] font-bold text-xl m-4 ">General</div>
                    <div onClick={falseOption} className="  text-black  text-xl m-4 ">Display</div>
                    <div className=" text-black  text-xl m-4">Advanced</div>

                </div>

                <div className="w-full pl-20 pr-20">


                    <label htmlFor="projectName" className="block mb-5 pl-4 text-xl">
                        Chatbot Name
                    </label>
                    <input
                        type="text"
                        id="projectName"
                        placeholder="Type here"
                        className={`border p-2 mb-8 w-full ${!isProjectNameValid ? 'border-red-500' : ''
                            }`}
                        value={projectName}
                        onChange={(e) => {
                            setProjectName(e.target.value);
                            setProjectNameValid(true);
                        }}
                    />
                    <label htmlFor="projectName" className="block mb-5 pl-4 text-xl">
                        Welcome Message
                    </label>
                    <input
                        type="text"
                        id="projectName"
                        placeholder="Type here"
                        className={`border p-2 mb-8  w-full ${!isProjectNameValid ? 'border-red-500' : ''
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
                    <label htmlFor="projectName" className="block mb-5 pl-4 text-xl">
                        Input Placeholder
                    </label>
                    <input
                        type="text"
                        id="projectName"
                        placeholder="Type here"
                        className={`border p-2 mb-8 w-full ${!isProjectNameValid ? 'border-red-500' : ''
                            }`}
                        value={projectName}
                        onChange={(e) => {
                            setProjectName(e.target.value);
                            setProjectNameValid(true);
                        }}
                    />

                </div>

            </div>) : (<div>
                <div className=" flex justify-between m-10 mt-5 text-left text-[#7e22ce] "><h1 className="text-4xl font-bold ">configuration</h1></div>
                <div className=" flex  p-5 ml-14 mr-8 rounded-md ">
                    <div onClick={TrueOption} className=" text-black text-xl m-4 ">General</div>
                    <div onClick={falseOption} className="font-bold  text-[#7e22ce] text-xl m-4 ">Display</div>
                    <div className=" text-black  text-xl m-4">Advanced</div>

                </div>

                <div class="grid grid-cols-2 gap-10 place-content-stretch h-48 w-full pr-20 pl-20">


                    <div>
                        <label htmlFor="projectName" className="block mb-5 pl-4 text-xl">
                        Primary Color
                        </label>
                        <input
                            type="text"
                            id="projectName"
                            placeholder="Type here"
                            className={`border p-2 mb-2 w-full ${!isProjectNameValid ? 'border-red-500' : ''
                                }`}
                            value={projectName}
                            onChange={(e) => {
                                setProjectName(e.target.value);
                                setProjectNameValid(true);
                            }}
                        />
                    </div>
                    <dir>
                        <label htmlFor="projectName" className="block mb-5 pl-4 text-xl">
                        Font Color
                        </label>
                        <input
                            type="text"
                            id="projectName"
                            placeholder="Type here"
                            className={`border p-2 mb-2 w-full ${!isProjectNameValid ? 'border-red-500' : ''
                                }`}
                            value={projectName}
                            onChange={(e) => {
                                setProjectName(e.target.value);
                                setProjectNameValid(true);
                            }}
                        />
                    </dir>

                    <div> <label htmlFor="projectName" className="block mb-5 pl-4 text-xl">
                    Font Size (in px)
                    </label>
                        <input
                            type="text"
                            id="projectName"
                            placeholder="Type here"
                            className={`border p-2 mb-2 w-full ${!isProjectNameValid ? 'border-red-500' : ''
                                }`}
                            value={projectName}
                            onChange={(e) => {
                                setProjectName(e.target.value);
                                setProjectNameValid(true);
                            }}
                        /></div>
                    <div>
                        <label htmlFor="projectName" className="block mb-2 pl-4 text-xl">
                        Chat Height (in % of total screen)
                        </label>
                        <input
                            type="text"
                            id="projectName"
                            placeholder="Type here"
                            className={`border p-2 mb-2 w-full ${!isProjectNameValid ? 'border-red-500' : ''
                                }`}
                            value={projectName}
                            onChange={(e) => {
                                setProjectName(e.target.value);
                                setProjectNameValid(true);
                            }}
                        />
                    </div>

                </div>

            </div>)}

            </div>





        </div>
    );
}