import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NavLinks = () => {
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
    <div className="flex justify-start gap-5 md:gap-7">
      <Link to="/#banner" className="flex items-center hover:text-cyan-400">
        <span>home</span>
      </Link>
      <Link to="/#categories">
        <span className="hover:text-cyan-400">categories</span>
      </Link>
      <Link to="/products">
        <span className="hover:text-cyan-400">products</span>
      </Link>
      <Link to="/allShops">
        <span className="hover:text-cyan-400">shops</span>
      </Link>
      <Link to="/blog">
        <span className="hover:text-cyan-400">blog</span>
      </Link>
    </div>
  );

  return <div>{links}</div>;
};

export default NavLinks;
