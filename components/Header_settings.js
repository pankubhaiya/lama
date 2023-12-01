import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BiLogOutCircle } from "react-icons/bi";
import { LuIndianRupee } from "react-icons/lu";
import { FiChevronDown } from "react-icons/fi";
import { BiSupport } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdNotifications, IoNotifications, IoMdHome, IoMdArrowDown, IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io"
import { useEmailContext } from "../context/EmailContext";
export default function Header({ Account }) {
    const [isEmailModalOpen, setEmailModalOpen] = useState(false);
    const [isCreateProjectModalOpen, setCreateProjectModalOpen] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [isProjectNameValid, setProjectNameValid] = useState(true);
    const [email, setEmail] = useState('');
    const [nav, setNav] = useState(false);
    const [username, setUsername] = useState("");
    const {globalEmail} = useEmailContext();

    useEffect(() => {
        setUsername(sessionStorage.getItem("name"));
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
        <div className="w-full h-auto bg-white">
            <div className="w-full  rounded-tl-md ">
                <div className="h-[66px]     flex items-center justify-between bg-white  ">
                    <div className="m-2 flex gap-1">
                        <p><IoMdHome size={20} className="text-left text-sm text-[#7e22ce]" /></p><p className="text-[#7e22ce] text-left text-m">/ Account Settings</p>

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
                  

                </div>

            </div >

            <div>
                <div className="m-10 mt-16 text-left text-[#7e22ce]"><h1 className="text-4xl font-bold ">Account Settings</h1></div>

                <div>

                    <div className="m-16 ">

                        <div className="flex w-full justify-center gap-5">
                            <div className="bg-rouded  border rounded-full w-24 h-24 justify-center"><img className="border rounded-full w-24 h-24" src="https://oliver-andersen.se/wp-content/uploads/2018/03/cropped-Profile-Picture-Round-Color.png" alt="" /></div>

                            <div className="w-96"> 
                                <label htmlFor="projectName" className="block mb-2 ">
                                User Name
                            </label>
                                <input
                                    type="text"
                                    id="projectName"
                                    placeholder="Type here"
                                    className={`border p-2 mb-4 w-full ${!isProjectNameValid ? 'border-red-500' : ''
                                        }`}
                                    value={projectName}
                                    onChange={(e) => {
                                        setProjectName(e.target.value);
                                        setProjectNameValid(true);
                                    }}
                                /></div>
                            <div className="w-96">
                                <label htmlFor="projectName" className="block mb-2 ">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    id="projectName"
                                    placeholder="Type here"
                                    className={`border p-2 mb-4 w-full ${!isProjectNameValid ? 'border-red-500' : ''
                                        }`}
                                    value={globalEmail}
                                    onChange={(e) => {
                                        setProjectName(e.target.value);
                                        setProjectNameValid(true);
                                    }}
                                />
                            </div>


                        </div>
                    </div>
                </div>
                <div className="m-10 mt-5 text-left text-[#7e22ce]"><h1 className="text-4xl font-bold ">Subscriptions</h1></div>
                <div className="flex justify-around mt-10 bg-[#7e22ce] ml-8 mr-8 pt-5 pb-5 text-white font-bold border rounded-2xl">
                    <p className="pt-2 text-xl">You are currently on the Ques AI Basic Plan!</p>
                    <div className="bg-white  text-black w-32 pt-2 h-10 font-bold border rounded-xl text-center">Upgrade</div>
                </div>
                
                <div className="m-10 mt-5 text-left text-[#FF274C]"><h1 className="text-xl font-bold ">Cancel Subscription</h1></div>


            </div>

        </div>
    );
}
