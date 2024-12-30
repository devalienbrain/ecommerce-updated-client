import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="py-8 px-6 w-full lg:w-3/4 mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
        {/* Left Side: Logo, Website Name, and Address */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 lg:space-y-0">
          <span className="text-xl font-extrabold text-gray-800">
            E-Commerce online
          </span>

          {/* Address Header */}
          <div className="text-lg font-semibold text-gray-700">Address</div>

          {/* Address */}
          <div className="flex items-center gap-2 text-gray-700 mt-2">
            <MdLocationOn size={20} />
            <span className="text-sm">Aftabnagar, Dhaka, Bangladesh</span>
          </div>
        </div>

        {/* Center: Contact Info */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 lg:space-y-0">
          <div className="text-lg font-semibold text-gray-700">Contact</div>

          <div className="flex items-center gap-2 text-gray-700">
            <AiFillMail size={20} />
            <span className="text-sm">
              <a
                href="mailto:hassansabbir0321@gmail.com"
                className="hover:text-cyan-600"
              >
                hassansabbir0321@gmail.com
              </a>
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <FaWhatsapp size={20} />
            <span className="text-sm">
              <a
                href="https://wa.me/8801893070812"
                className="hover:text-cyan-600"
              >
                +880 1893070812
              </a>
            </span>
          </div>
        </div>

        {/* Right Side: Social Links */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 lg:space-y-0">
          <div className="text-lg font-semibold text-gray-700">Profile</div>

          <div className="flex gap-6 justify-center lg:justify-start items-center text-gray-700">
            <a
              href="https://github.com/devalienbrain"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-600 transition-colors duration-300"
            >
              <FaGithub size={30} />
            </a>
            <a
              href="https://x.com/Hassan006930481"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-600 transition-colors duration-300"
            >
              <FaTwitter size={30} />
            </a>
            <a
              href="https://www.linkedin.com/in/md-sabbir-hassan-murad/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-600 transition-colors duration-300"
            >
              <FaLinkedin size={30} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61558770101731"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-600 transition-colors duration-300"
            >
              <FaFacebook size={30} />
            </a>
          </div>
        </div>
      </div>

      {/* Horizontal Line */}
      <hr className="my-6 border-t border-gray-200" />

      {/* Bottom: Copyright */}
      <div className="text-center text-sm text-gray-600">
        <p>&copy; 2024 All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
