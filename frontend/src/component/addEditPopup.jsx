import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createItem, updateItem, fetchItemById } from "../features/slice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";

const initialFormState = {
  studentName: "",
  cohort: "",
  courses: "",
  status: "",
};

const StudentPopup = ({ isOpen, onClose, editData = null }) => {
  const dispatch = useDispatch();
  const currentItem = useSelector((state) => state.items.currentItem);
  const [formData, setFormData] = useState(initialFormState);

  // Reset form when popup opens/closes or switches between add/edit modes
  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormState);
      return;
    }

    if (editData) {
      dispatch(fetchItemById(editData));
    } else {
      setFormData(initialFormState);
    }
  }, [isOpen, editData, dispatch]);

  // Update form when currentItem changes (for edit mode)
  useEffect(() => {
    if (currentItem && editData) {
      setFormData({
        studentName: currentItem.studentName || "",
        cohort: currentItem.cohort || "",
        courses: currentItem.courses
          ? currentItem.courses.map((c) => c.title).join(", ")
          : "",
        status: currentItem.status || "",
      });
    }
  }, [currentItem, editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const processedData = {
      ...formData,
      courses: formData.courses.split(",").map((course) => ({
        title: course.trim(),
        courseImg:
          "https://res.cloudinary.com/dhlsvwpny/image/upload/v1734620411/78239264_40-Middle-School-Student-Resize_jqz6os.jpg",
      })),
      createdAt: currentItem?.createdAt || new Date().toISOString(),
      lastLogin: currentItem?.lastLogin || new Date().toISOString(),
    };

    try {
      if (editData) {
        await dispatch(
          updateItem({ id: editData, itemData: processedData })
        ).unwrap();
      } else {
        await dispatch(createItem(processedData)).unwrap();
      }
      setFormData(initialFormState);
      onClose();
    } catch (err) {
      console.error("Failed to save student:", err);
    }
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setFormData(initialFormState);
        onClose();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>{editData ? "Edit Student" : "Add New Student"}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="studentName">Student Name</Label>
            <Input
              id="studentName"
              value={formData.studentName}
              onChange={(e) => handleChange("studentName", e.target.value)}
              placeholder="Enter student name"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cohort">Cohort</Label>
            <Input
              id="cohort"
              value={formData.cohort}
              onChange={(e) => handleChange("cohort", e.target.value)}
              placeholder="Enter cohort"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courses">Courses</Label>
            <Input
              id="courses"
              value={formData.courses}
              onChange={(e) => handleChange("courses", e.target.value)}
              placeholder="Enter courses (comma-separated)"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleChange("status", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormData(initialFormState);
                onClose();
              }}
              className="bg-white hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button type="submit">
              {editData ? "Save Changes" : "Add Student"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StudentPopup;