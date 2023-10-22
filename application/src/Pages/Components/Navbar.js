import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <nav className="bg-green-600 p-4 text-white shadow-md">
      <div className="container mx-auto">
        <ul className="flex justify-around">
          <li className="hover:text-green-300">
            <Link to={"/simu1"}>
              <p>Statistiques</p>
            </Link>
          </li>
          <li className="hover:text-green-300">
            <Link to={"/simu2"}>
              <p>Prévisions</p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
