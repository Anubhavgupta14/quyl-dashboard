import React from "react";
import { FaUser, FaUserPlus } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { Toaster } from 'sonner';
import { RiDashboard3Line } from "react-icons/ri";
import { PiNotebookFill } from "react-icons/pi";
import { GrBook } from "react-icons/gr";
import { AiOutlinePieChart } from "react-icons/ai";
import { RiSettingsLine } from "react-icons/ri";
import { FiHelpCircle } from "react-icons/fi";

const Layout = ({ children }) => {
  const location = useLocation();

  const items = [
    {
      name: "Dashboard",
      icon: <RiDashboard3Line className="text-xl"/>,
      link: "/dashboard",
    },
    {
      name: "Students",
      icon: <PiNotebookFill className="text-xl"/>,
      link: "/",
    },
    {
      name: "Chapter",
      icon: <GrBook className="text-xl"/>,
      link: "/chapter",
    },
    {
      name: "Help",
      icon: <FiHelpCircle className="text-xl"/>,
      link: "/help",
    },
    {
      name: "Reports",
      icon: <AiOutlinePieChart className="text-xl"/>,
      link: "/reports",
    },
    {
      name: "Settings",
      icon: <RiSettingsLine className="text-xl"/>,
      link: "/settings",
    },
  ]

  return (
    <>
      <Toaster />
      <div className="flex h-screen">
        <div className="w-[15%] h-screen bg-white text-black">
          <div className="flex items-center gap-2.5 border-b border-white/20 p-3 py-5">
            <img src="./logo.png" className="h-[50px]"></img>
          </div>

          {items.map((el,i)=>(
          <div className="p-3">
            <Link to={el.link} key={i}>
              <div
                className={`w-full  flex items-center gap-2.5 rounded-md p-2.5 pl-1.5 cursor-pointer hover:bg-[#e9ecf1] text-black ${
                  location.pathname === el.link ? "bg-[#e9ecf1] text-black" : ""
                }`}
              >
                {el.icon}
                <p>{el.name}</p>
              </div>
            </Link>
          </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="w-[85%] scrollbar-hide">
          {children}
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        a {
          color: white;
          text-decoration: none;
        }

        a:active {
          color: white !important;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loader {
          border: 8px solid #f3f3f3;
          border-top: 8px solid #3498db;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          position: absolute;
          left: 50%;
          top: 50%;
          animation: spin 1s linear infinite;
        }

        .primary-btn {
          @apply bg-blue-500 border-none text-white h-10 px-2.5 flex items-center cursor-pointer gap-1.5 rounded-full;
        }
      `}</style>
    </>
  );
};

export default Layout;