

import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NavLinks = ({ isMobile }: { isMobile: boolean }) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (pathname === "/" && hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, hash]);

  const links = (
    <div
      className={`flex ${
        isMobile
          ? "flex-col w-full items-start gap-4"
          : "flex-row items-center gap-5"
      }`}
    >
      <Link to="/#banner" className="hover:text-cyan-400">
        <span>Home</span>
      </Link>
      <Link to="/#categories" className="hover:text-cyan-400">
        <span>Categories</span>
      </Link>
      <Link to="/products" className="hover:text-cyan-400">
        <span>Products</span>
      </Link>
      <Link to="/allShops" className="hover:text-cyan-400">
        <span>Shops</span>
      </Link>
      <Link to="/blog" className="hover:text-cyan-400">
        <span>Blog</span>
      </Link>
    </div>
  );

  return <>{links}</>;
};

export default NavLinks;
