import React, { useEffect, useState } from "react";
import "../styles/Organigrama.css";

function PersonCard({ person, onDoubleClick }) {
  return (
    <div onDoubleClick={() => onDoubleClick(person)} className="person-node">
      <div className="card">
        <div className="icon">👤</div>
        <div className="name">{person.nombre}</div>
        <div className="role">{person.rol}</div>
      </div>
    </div>
  );
}

function TreeNode({ person, allPeople, onDoubleClick }) {
  const children = person.map((id) => allPeople.find((p) => p.id === id));

  return (
    <div className="tree-node">
      <PersonCard person={person} onDoubleClick={onDoubleClick} />
      {children.length > 0 && (
        <div className="tree-children">
          {children.map((child) => (
            <TreeNode
              key={child.id}
              person={child}
              allPeople={allPeople}
              onDoubleClick={onDoubleClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Organigrama() {
  const [people, setPeople] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/personal") // <-- Reemplaza con tu endpoint real
      .then((res) => res.json())
      .then((data) => setPeople(data));
  }, []);

  const leaders = people.filter((p) => p.rol === "Líder");

  return (
    <div className="organigrama-container">
      <div className="tree-root">
        {leaders.map((leader) => (
          <TreeNode
            key={leader.id}
            person={leader}
            allPeople={people}
            onDoubleClick={setSelected}
          />
        ))}
      </div>

      {selected && (
        <div className="overlay" onClick={() => setSelected(null)}>
          <div className="profile-panel" onClick={(e) => e.stopPropagation()}>
            <h2>Perfil de {selected.nombre}</h2>
            <p>
              <strong>Rol:</strong> {selected.rol}
            </p>
            <p>
              <strong>ID:</strong> {selected.id}
            </p>
            <button onClick={() => alert("Editar...")}>Editar</button>
          </div>
        </div>
      )}
    </div>
  );
}
