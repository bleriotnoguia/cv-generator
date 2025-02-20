import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col sm:flex-row items-center justify-end gap-2 sm:gap-0 p-4 text-sm text-gray-500">
      <p>
        &copy; {new Date().getFullYear()} CV Generator. Tous droits réservés.
      </p>{" "}
      <span className="hidden sm:block mx-2">|</span>
      <p className="italic">
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
