import React from "react";
import { Button } from "./button";

const AlertDialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  
  return children;
};

const AlertDialogContent = React.forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/80 transition-opacity"
        onClick={() => props.onOpenChange?.(false)}
      />
      
      {/* Content */}
      <div
        ref={ref}
        className={`
          fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg
          translate-x-[-50%] translate-y-[-50%] gap-4 
          border bg-background p-6 shadow-lg 
          transition-all duration-200
          sm:rounded-lg
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    </div>
  );
});
AlertDialogContent.displayName = "AlertDialogContent";

const AlertDialogHeader = ({ className = "", ...props }) => (
  <div
    className={`flex flex-col space-y-2 text-center sm:text-left ${className}`}
    {...props}
  />
);

const AlertDialogFooter = ({ className = "", ...props }) => (
  <div
    className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`}
    {...props}
  />
);

const AlertDialogTitle = ({ className = "", ...props }) => (
  <h2
    className={`text-lg font-semibold ${className}`}
    {...props}
  />
);

const AlertDialogDescription = ({ className = "", ...props }) => (
  <p
    className={`text-sm text-muted-foreground ${className}`}
    {...props}
  />
);

const AlertDialogAction = ({ className = "", ...props }) => (
  <Button
    className={className}
    {...props}
  />
);

const AlertDialogCancel = ({ className = "", ...props }) => (
  <Button
    variant="outline"
    className={`mt-2 sm:mt-0 ${className}`}
    {...props}
  />
);

export {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};