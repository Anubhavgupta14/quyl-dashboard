import React from "react";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import Layout from "../component/layout";
import { GoPlus } from "react-icons/go";
import { FiHelpCircle } from "react-icons/fi";
import { LuMessageSquareMore } from "react-icons/lu";
import { MdOutlineSegment } from "react-icons/md";
import { FiBell } from "react-icons/fi";

const Home = () => {
  const students = [
    {
      name: "Anshuman Kashyap",
      cohort: "AY 2024-25",
      dateJoined: "17. Nov, 2024",
      lastLogin: "17. Nov, 2024 4:16 PM",
      status: "active",
    },
    {
      name: "Bansi Dadhaniya",
      cohort: "AY 2024-25",
      dateJoined: "17. Nov, 2024",
      lastLogin: "17. Nov, 2024 4:16 PM",
      status: "active",
    },
    {
      name: "Chandrika Valotia",
      cohort: "AY 2024-25",
      dateJoined: "17. Nov, 2024",
      lastLogin: "17. Nov, 2024 4:16 PM",
      status: "inactive",
    },
    {
      name: "Devang Dave",
      cohort: "AY 2024-25",
      dateJoined: "17. Nov, 2024",
      lastLogin: "17. Nov, 2024 4:16 PM",
      status: "active",
    },
    {
      name: "Forum Bhatt",
      cohort: "AY 2024-25",
      dateJoined: "17. Nov, 2024",
      lastLogin: "17. Nov, 2024 4:16 PM",
      status: "active",
    },
    // Add remaining students...
  ];

  return (
    <Layout>
      <div className="p-6 h-[100vh] bg-[#f7f8fa]">
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search your course"
              className="pl-8 pr-4 py-2 text-gray-500 rounded-md w-[450px] focus:outline-none"
            />
          </div>
          <div className="flex gap-7 items-center">
            <FiHelpCircle className="text-xl text-gray-500 cursor-pointer" />
            <div className="relative cursor-pointer">
              <LuMessageSquareMore className="text-xl text-gray-500" />
              <div className="h-[8px] w-[8px] bg-red-400 rounded-full absolute top-[-1px] right-[-1px]"></div>
            </div>
            <MdOutlineSegment className="text-xl text-gray-500 cursor-pointer" />
            <div className="relative cursor-pointer">
              <FiBell className="text-xl text-gray-500" />
              <div className="h-[8px] w-[8px] bg-red-400 rounded-full absolute top-[-1px] right-[1px]"></div>
            </div>
            <div className="flex gap-3 items-center cursor-pointer">
              <img src="./profile.jpg" className="h-[35px] rounded"></img>
              <p className="font-medium">Anubhav Gupta</p>
            </div>
          </div>
        </div>

        <div className="bg-[#fff] p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4 items-center">
              <Select defaultValue="AY 2024-25">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AY 2024-25">AY 2024-25</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="CBSE 9">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CBSE 9">CBSE 9</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-[#e9ecf1] hover:bg-[#d9dde6] text-[#3d506c] font-semibold">
              <GoPlus className="font-semibold"/> Add new Student
            </Button>
          </div>
          {/* Table */}
          <div className="bg-white rounded-lg overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-800">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-800">
                    Cohort
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-800">
                    Courses
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-800">
                    Date Joined
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-800">
                    Last login
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-800">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {student.cohort}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex gap-2">
                        <span className="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs">
                          <img src="./profile.jpg" className="h-[20px] rounded mr-2"></img>
                          CBSE 9 Science
                        </span>
                        <span className="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs">
                        <img src="./profile.jpg" className="h-[20px] rounded mr-2"></img>
                          CBSE 9 Maths
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {student.dateJoined}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {student.lastLogin}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-block w-3 h-3 rounded-full ${
                          student.status === "active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
