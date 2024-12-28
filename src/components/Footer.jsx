import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex justify-between items-center px-6 py-4 w-full lg:w-3/4 mx-auto shadow-md ">
      {/* Left Side - All rights reserved text */}
      <div className="text-sm text-gray-600">
        &copy; 2024 All rights reserved.
      </div>

      {/* Right Side - Developed By Text and GitHub Icon */}
      <div className="flex items-center space-x-2">
        <p className="text-gray-800 font-semibold">Developed by</p>
        <a
          href="https://github.com/devalienbrain"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 hover:text-cyan-600 transition-colors duration-300"
        >
          <FaGithub size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
