import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex items-center justify-end p-4 text-sm text-gray-500">
      <p>
        &copy; {new Date().getFullYear()} CV Generator. Tous droits réservés.
      </p>{" "}
      <span className="mx-2 0">|</span>
      <p className=" italic">
        Par{" "}
        <Link
          href="https://bleriotnoguia.com"
          className="underline"
          target="_blank"
        >
          Blériot Noguia
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
