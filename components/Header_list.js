import React, { useState, useEffect } from "react";
import Link from 'next/link';
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
    const [fileName, setfileName] = useState('');
    const [fileDescription,setFileDescription] = useState('')
    const [isfileNameValid, setfileNameValid] = useState(true);
    const [email, setEmail] = useState('');
    const [nav, setNav] = useState(false);
    const [username, setUsername] = useState("");
    const [files, setFiles] = useState([]);
    const router = useRouter()

    useEffect(() => {
        const { projectId } = router.query;
        if (projectId) {
          fetchFiles(projectId);
        }
    }, [isfileNameValid]);

    const fetchFiles = async (projectId) => {
        try {
          const response = await fetch(`/api/files?projectId=${projectId}`);
          if (response.ok) {
            const data = await response.json();
            setFiles(data.files);
          } else {
            console.error('Error fetching files:', response.statusText);
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };

    const openCreateProjectModal = () => {
        setEmailModalOpen(false);
        setCreateProjectModalOpen(true);
    };

    const closeCreateProjectModal = () => {
        setCreateProjectModalOpen(false);
        setfileName('');
        setfileNameValid(true);
    };
    const handleCreateProject = () => {
        if (fileName.trim() === '') {
            setfileNameValid(false);
        } else {
            setfileNameValid(true);
            closeCreateProjectModal();
        }
    };

    const handleEditClick = (fileId)=>{
        router.push(`/editor?fileId=${fileId}`)
    }

    const handleDeleteFile = async (fileId)=>{
        try {
            const response = await fetch(`/api/files?fileId=${fileId}`, {
              method: 'DELETE',
            });
        
            if (!response.ok) {
                console.log(response)
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            if(response.ok){
                setfileNameValid
                alert('File deleted successfully')
            }
            
        
          } catch (error) {
            console.error('Error deleting file:', error);
          }
    }


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
                <div className="m-10 mt-5 text-left text-[#7e22ce]"><h1 className="text-4xl font-bold ">Sample Project</h1></div>

                <div className="flex items-center w-full gap-20 pl-24 ">
                    <div onClick={openCreateProjectModal} className="border rounded-lg bg-white pl-5 pt-3 flex w-72  pb-5"> <img
                        className="h-10 w-10 rounded-2xl"
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a0/YouTube_social_red_circle_%282017%29.svg"
                        alt="user"
                    />
                        <div className="text-left ml-5 font-bold" > <p>Upload</p>
                            <p>Youtube Video</p>
                        </div>

                    </div>
                    <div onClick={openCreateProjectModal} className="border rounded-2xl  bg-white pl-5 pt-3 flex w-72 pb-5"><img
                        className="h-10 w-10 rounded-full"
                        src="https://rb.gy/todrwl"
                        alt="user"
                    />
                        <div className="text-left ml-5 font-bold" > <p>Upload</p>

                            <p>Spotify Podcast</p>
                        </div></div>
                    <div onClick={openCreateProjectModal} className="border rounded-2xl bg-white pl-5 pt-3 flex w-72 pb-5" ><img
                        className="h-10 w-10 "
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-4PhhECO0lWTSBfcBCO64_napA7zFNi-rzw&usqp=CAU"
                        alt="user"
                    />
                        <div className="text-left ml-5 font-bold" > <p>Upload</p>
                            <p>RSS Feed</p>
                        </div></div>
                </div>

                <div className="flex justify-around mt-10 bg-[#7e22ce] ml-32 mr-32 pt-3 pb-3 text-white font-bold border rounded-2xl">
                    <p className="pt-2">All files are processed! Your widget is ready to go!</p>
                    <div className="bg-white  text-black w-32 pt-2 h-10 font-bold border rounded-xl text-center">Try it out!</div>
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-28 mt-8">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Upload Date | Time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                              
                            </tr>
                        </thead>
                   <tbody>
                        {files.map((file) => (
              <tr
                key={file._id} // Assuming your file object has an _id field
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {file.name}
                </th>
                <td className="px-6 py-4">{new Date(file.createdAt).toLocaleDateString()}| {new Date(file.createdAt).toLocaleTimeString("en-US", {
  hour12: false, // Use 24-hour time format
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
})}</td>
                <td className="px-6 py-4">Done</td>
                <td className="px-6 py-4 text-right flex space-between">
                  <a
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={()=>handleEditClick(file._id)}
                  >
                    Edit |
                  </a>
                  <a
                    className="font-medium text-red-600 dark hover:underline"
                    onClick={()=>handleDeleteFile(file._id)}
                  >
                    | Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
}
