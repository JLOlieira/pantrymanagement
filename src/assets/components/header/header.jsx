import "./header.css";
import { useState } from "react";
import Button from "../button/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="settings">
        <button className="menu-btn" onClick={toggleMenu}>
          <i class="fa-solid fa-bars"></i>
        </button>
        <div>
          <h1>Minha Despensa</h1>
          <p>Grupo</p>
        </div>
      </div>
      {isMenuOpen && (
        <div className="account-settings">
          <div className="user-infos">
            <div>
              <img src="/lukas.png" alt="User" />
              <h2>Lukas Oliveira</h2>
            </div>
            <button className="close-menu" onClick={toggleMenu}>
              <i class="fa-solid fa-angle-left"></i>
            </button>
          </div>
          <div className="groups-top">
            <div>
              <i class="fa-solid fa-users"></i>
              <h3>Meus Grupos</h3>
            </div>
            <button className="new-group">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          <ul>
            <li>
              <p>Grupo Oliveira</p>
              <div>
                <Button className="edit-btn" icon="fa-edit" />
                <Button className="delete-btn" icon="fa-trash" />
              </div>
            </li>
            <li>
              <p>Família</p>
              <div>
                <button>
                  <i class="fa-solid fa-edit"></i>
                </button>
                <button>
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </li>
          </ul>
        </div>
      )}
      <div className="user-menu">
        <button className="userMenu-btn">
          <img src="/lukas.png" alt="User" />
        </button>
      </div>
    </header>
  );
}
