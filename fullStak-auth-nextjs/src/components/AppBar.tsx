import Link from "next/link";
import React from "react";
import SignInButton from "./SignInButton";
import ThemeToggle from "./ThemeToggle";
const AppBar = () => {
  return (
    <header className="items-center flex gap-4 p-4 from-white to-gray-200 shadow border-b border-border">
      <Link className="transition-colors hover:text-blue-500" href={"/"}>
        Home Page
      </Link>
      <Link
        className="transition-colors hover:text-blue-500"
        href={"/dashboard"}
      >
        DashBoard
      
      </Link>
      <ThemeToggle/>
      

      <SignInButton />
    </header>
  );
};

export default AppBar;
