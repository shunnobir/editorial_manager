import React from "react";

function Footer() {
  return (
    <div className="text-sm w-full flex items-center justify-center bg-primary text-primary-foreground py-3 transition-all duration-300">
      <span>
        &copy; {new Date().getFullYear()}, University of Chittagong
        <span className="hidden sm:inline-block">
          , Chittagong 4331, Bangladesh
        </span>
      </span>
    </div>
  );
}

export default Footer;
