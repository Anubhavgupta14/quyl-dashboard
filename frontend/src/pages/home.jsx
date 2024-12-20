import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import Layout from "../component/layout";
import { GoPlus } from "react-icons/go";
import { FiHelpCircle, FiBell } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { LuMessageSquareMore } from "react-icons/lu";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineSegment } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, deleteItem } from "../features/slice";
import AddEditPopup from "../component/addEditPopup";
import DeleteConfirmationPopup from "../component/deletePopup";

const Home = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.items);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isInitialFetch, setIsInitialFetch] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      dispatch(fetchItems({ search: searchQuery }));
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, dispatch]);

  const handleEditClick = (student) => {
    setEditingStudent(student);
    setIsPopupOpen(true);
  };
  const handleDelete = (item) => {
    setItemToDelete(item);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async (id) => {
    try {
      await dispatch(deleteItem(id));
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  useEffect(() => {
    if (!isInitialFetch) {
      dispatch(fetchItems());
      setIsInitialFetch(true);
    }
  }, [isInitialFetch]);

  if (status === "loading" && !items.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }


  return (
    <Layout>
      <div className="p-6 h-[100vh] bg-[#f7f8fa]">
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
              <img
                src="./profile.jpg"
                className="h-[35px] rounded"
                alt="profile"
              />
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
            <Button className="bg-[#e9ecf1] hover:bg-[#d9dde6] text-[#3d506c] font-semibold" onClick={() => setIsPopupOpen(true)}>
              <GoPlus className="font-semibold" /> Add new Student
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
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-800">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((student, index) => (
                  <tr key={student.id || index}>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {student.studentName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {student.cohort}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex gap-2">
                        {student.courses?.map((course, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs"
                          >
                            <img
                              src={course.courseImg}
                              className="h-[20px] rounded mr-2"
                              alt={course.title}
                            />
                            {course.title}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(student.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(student.lastLogin).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
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
                    <td className="flex gap-2 px-6 py-4 text-sm">
                      <MdOutlineModeEdit className="text-xl cursor-pointer my-2 text-[#73767a]" onClick={()=>handleEditClick(student.id)}/>
                      <MdDeleteOutline className="text-xl my-2 cursor-pointer text-[#73767a]" onClick={()=> handleDelete(student.id)}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <AddEditPopup
          isOpen={isPopupOpen}
          onClose={() => {
            setIsPopupOpen(false);
            setEditingStudent(null);
          }}
          editData={editingStudent}
        />
      )}
      {isDeleteOpen && (
        <DeleteConfirmationPopup
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        setIsDeleteOpen={setIsDeleteOpen}
        onConfirm={handleConfirmDelete}
        itemToDelete={itemToDelete}
        title="Delete Student"
        description="Are you sure you want to delete this student? All their data will be permanently removed."
      />
      )}
    </Layout>
  );
};

export default Home;
