import "./header.css";
import { useState, useEffect, use } from "react";
import Button from "../button/button";
import Input from "../input/input";
import {
  getUserGroups,
  createGroup,
  deleteGroup,
  getItems,
} from "../../../api";

import { useContext } from "react";
import { AuthContext } from "../../../context/useAuth";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(
    JSON.parse(localStorage.getItem("selectedGroup")) || null,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

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

  const toggleAddGroupModal = () => {
    setModalOpen(!modalOpen);
  };

  const closeModalOnOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setModalOpen(false);
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    await createGroup(newGroupName, user.id);
    setNewGroupName("");
    setModalOpen(false);
    const updatedGroups = await getUserGroups(user.id);
    setGroups(updatedGroups);
  };
  const handleDeleteGroup = async (groupId) => {
    await deleteGroup(groupId);
    const updatedGroups = await getUserGroups(user.id);
    setGroups(updatedGroups);
  };

  const handleSelectGroup = async (group) => {
    setSelectedGroup(group);
    setIsMenuOpen(false);
    localStorage.setItem("selectedGroup", JSON.stringify(group));
    window.location.reload(); // Recarrega a página para atualizar os itens com base no grupo selecionado
  };

  return (
    <header className="header">
      <div className="settings">
        <button className="menu-btn" onClick={toggleMenu}>
          <i class="fa-solid fa-bars"></i>
        </button>
        <div>
          <h1>Minha Despensa</h1>
          <p>{selectedGroup ? selectedGroup.name : "Selecione um grupo"}</p>
        </div>
      </div>
      {isMenuOpen && (
        <div className="account-settings">
          <div className="user-infos">
            <div>
              <img src="/icon-7797704_640.png" alt="User" />
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
            <button className="new-group" onClick={toggleAddGroupModal}>
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          <div className="list-group">
            <ul>
              {groups.map((group) => (
                <li
                  key={group.id}
                  onClick={() => handleSelectGroup(group)}
                  className={
                    selectedGroup && selectedGroup._id === group._id
                      ? "selected"
                      : ""
                  }
                >
                  <p>{group.name}</p>
                  <div>
                    <button onClick={() => handleDeleteGroup(group.id)}>
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

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModalOnOverlayClick}>
          <div className="modal-container">
            <h3>Novo grupo</h3>
            <Input
              type="text"
              placeholder="Nome"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
            <Button
              className="default"
              label="Salvar"
              onClick={handleCreateGroup}
            />
          </div>
        </div>
      )}
    </header>
  );
}
