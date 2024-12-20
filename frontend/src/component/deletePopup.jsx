import React, { useRef, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

const DeleteConfirmationPopup = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  itemToDelete,
  setIsDeleteOpen,
  title = "Delete Confirmation",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel"
}) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        onClose();
        setIsDeleteOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, setIsDeleteOpen]);

  const handleConfirm = (id) => {
    onConfirm(id);
    onClose();
  };

  const handleClose = () => {
    onClose();
    setIsDeleteOpen(false);
  };

  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen}>
      <div className="fixed inset-0 bg-black/50" /> {/* Overlay */}
      <AlertDialogContent ref={dialogRef}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            className="bg-white hover:bg-gray-50"
            onClick={handleClose}
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={() => handleConfirm(itemToDelete)}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationPopup;