/* eslint-disable react/jsx-key */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    {
      name: "Dashboard",
      path: "/",
    },
    {
      name: "Issues",
      path: "/issues/list",
    },
  ];
  return (
    <nav className="flex space-x-4 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-4">
        {links.map((link) => {
          return (
            <li key={link.path}>
              <Link
                className={classNames({
                  "text-zinc-900": link.path === currentPath,
                  "text-zinc-500": link.path !== currentPath,
                  "hover:text-zinc-800 transition-colors": true,
                })}
                // className={`${link.path === currentPath ? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-800 transition-colors`}
                href={link.path}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
