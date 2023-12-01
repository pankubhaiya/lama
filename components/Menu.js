import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiHelpCircle, BiLogOutCircle } from "react-icons/bi";
import { BsArrowLeftCircleFill, BsDisplay, BsDot } from "react-icons/bs";
import { RiFolderUploadLine } from "react-icons/ri";
import {
  MdBarChart,
  MdOutlineAccountBalance,
  MdOutlineKeyboardArrowLeft,
  MdOutlineManageAccounts,
  MdSpaceDashboard,
} from "react-icons/md";
import { RxCalendar } from "react-icons/rx";

const DpMenu = (props) => {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState(0);

  const menu = [
    {
      title: "Projects",
      to: "/dashboard"
    },
    {
      title: "Widget Configuration",
      to: "#"
    },
    {
      title: "Deployment",
      to: "#"
    },
    {
      title: "Pricing",
      to: "#",
    },
    {
      title:"Account",
      to:"/settings"
    }
  ];

  const handleMenuItemClick = useCallback(
    (index) => {
      setSelectedMenuItem(index);
      sessionStorage.setItem("selectedMenuItem", index);
    },
    [setSelectedMenuItem]
  );

  useEffect(() => {
    const storedIndex = parseInt(sessionStorage.getItem("selectedMenuItem")) || 0;
    setSelectedMenuItem(storedIndex);
  }, []); // Run once on mount

  return (
        <div className="h-full" style={{ backgroundImage: "url('path_to_your_image')" }}>
            <div
                className={`${open ? "w-[290px]" : "w-24"
                    } p-4 pt-3 bg-white ease-in-out duration-500 flex-col gap-5 items-start relative h-screen shadow-lg shadow-[#FFF1EB] shadow-opacity-[30%] `}
            >
                <div className="flex items-center">
                    <img src="/logo.svg" alt="Logo" className="w-8 h-8 mr-2" />
                    <span className="text-xl font-bold text-[#7e22ce]">LAMA</span>
                </div>

                <div
                    className={`origin-left text-xl text-black  items-center gap-1  ease-in-out duration-300 ${!open && "scale-24"
                        }`}
                >
                    <div
                        className={` origin-left w-[260px]  text-xl  font-bold flex   items-center gap-1  ease-in-out duration-700 `}
                    >
                        <div className={` ${open ? "ml-1" : "ml-0"
                            } p-3 border-b-[0.5px] ease-in-out duration-700 flex items-center  ${open ? "w-[250px]" : "w-[70px]"} ${open ? "h-12" : "h-12"}`}
                        >
                            <span className={`origin-left ease-in-out ${!open && "hidden"} ${open ? "ml-2" : "ml-0"}  text-[#555555] duration-500 cursor-default tracking-wide font-bold `} >
                                Podcast Upload Flow
                            </span>

                        </div>
                    </div>
                    <ul className={`${open ? "" : "flex flex-col items-center justify-center"}`}>
                        {menu.map((item, index) => (
                            <li
                            key={index}
                            className={` ${item.gap ? "mt-4" : "mt-4"} flex items-center gap-x-4 rounded-full cursor-pointer transition-all duration-500 `}
                        >
                            <button
                                type="button"
                                onClick={() => handleMenuItemClick(index)}
                                className={`w-full hover:bg-[#7e22ce] hover:text-white h-full rounded-lg p-2
                                ${index === selectedMenuItem ? 'bg-[#7e22ce] font-semibold text-white'
                                        : 'text-black'
                                    }`}

                            >
                                <Link href={item.to} className="flex items-center gap-2">
                                    <span>{item.icons}</span>
                                    <p className={`${open ? "" : "hidden scale-0 "} origin-center text-[14px]`}>
                                        {item.title}
                                    </p>
                                </Link>
                            </button>
                        </li>
                        ))}


                    </ul>
                </div>
            </div >

        </div >
    );
};

export default DpMenu;
