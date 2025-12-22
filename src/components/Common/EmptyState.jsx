import React from "react";
import { Ghost } from "lucide-react";

const EmptyState = ({ 
  icon = <Ghost className="w-16 h-16 text-muted-foreground/60" />, 
  title = "No posts yet", 
  description = "When someone you follow posts, their posts will appear here." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-500">
      <div className="relative mb-6">
        <div className="bg-muted rounded-full p-8 transition-transform hover:scale-105 duration-300">
          {icon}
        </div>
      </div>
      
      <h3 className="text-foreground text-2xl font-bold mb-3 tracking-tight">
        {title}
      </h3>
      
      <p className="text-muted-foreground text-base max-w-[320px] leading-relaxed font-medium">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;
