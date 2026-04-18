import "./header.css";
import { useState, useEffect } from "react";
import Button from "../button/button";
import { getUserGroups } from "../../../api";

import { useContext } from "react";
import { AuthContext } from "../../../context/useAuth";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  const [groups , setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const groups = await getUserGroups(user.id);
      setGroups(groups);
    };
    fetchGroups();
  }, []);

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
              <h2>{user.name}</h2>
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
          <div className="list-group">
            <ul>
              {groups.map((group) => (
                <li key={group.id}>
                  <p>{group.name}</p>
                  <div>
                    <button>
                      <i class="fa-solid fa-edit"></i>
                    </button>
                    <button>
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </li>
              ))}
              
            </ul>
            <button className="logout-btn" onClick={logout}>
              Sair
            </button>
          </div>
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
