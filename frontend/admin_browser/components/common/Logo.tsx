"use client";
import { useRouter } from "next/navigation";

export const Logo = () => {
  const router = useRouter();
  const handleClick = (path: string) => {
    router.push(path);
  };
  return (
    <div
      onClick={() => handleClick("/")}
      className="flex items-center space-x-4 hover:transform hover:scale-105 transition-transform duration-300 cursor-pointer"
    >
      <img
        src="/logo.jpg"
        alt="WHITECLINIC Logo"
        className="h-12 w-auto rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      />
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent tracking-tight hover:tracking-wide transition-all duration-300">
        WHITECLINIC
      </h1>
    </div>
  );
};
