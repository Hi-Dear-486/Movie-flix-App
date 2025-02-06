"use client";
import React, { useState, useEffect, useCallback } from "react";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import ContentWrapper from "../contentwrapper/page";
import Image from "next/image";
import "./style.scss";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  let router = useRouter();
  let pathname = usePathname();

  const openMobileMenu = () => {
    setMobileMenu(true);
  };

  const navigationhandler = (type) => {
    if (type === "movie") {
      router.push("/");
    } else {
      router.push("/");
    }
    setMobileMenu(false);
  };

  const controlnavbar = useCallback(() => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY, mobileMenu]);

  useEffect(() => {
    window.addEventListener("scroll", controlnavbar);
    return () => {
      window.removeEventListener("scroll", controlnavbar);
    };
  }, [lastScrollY, controlnavbar]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => router.push("/")}>
          <Image
            src="../assets/movix-logo.svg"
            alt="logo"
            width={150}
            height={50}
            className="w-40 h-auto"
          />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationhandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationhandler("tv")}>
            TV Shows
          </li>
          <li className="menuItem"></li>
        </ul>
        <div className="mobileMenuItems">
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
    </header>
  );
};

export default Header;
