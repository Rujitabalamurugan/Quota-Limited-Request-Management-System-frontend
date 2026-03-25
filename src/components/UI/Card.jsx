import React from 'react';
import { cn } from './Button'; // Reusing the utility function

export const Card = React.forwardRef(({ className, children, glass = false, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border transition-all duration-200",
        glass 
          ? "glass-card" 
          : "bg-white border-slate-100 shadow-sm dark:bg-slate-900 dark:border-slate-800",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";
