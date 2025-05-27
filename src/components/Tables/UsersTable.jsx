import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { axiosInstance } from "../../services/axiosInstance";
import { Spinner } from "../../components/Spinner";
import { UserPanel } from "./UserPanel";
import { DeleteUser } from "./DeleteUser";
import "../../styles/UsersTable.css";

export const UsersTable = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [renderTable, setRenderTable] = useState(false);
  const [reloadKey, setReloadKey] = useState(Date.now());
  const [openPanel, setOpenPanel] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleNewUser = () => {
    setOpenPanel(true);
  };

  const handleEditUser = () => {
    setEditUser(true);
    setOpenPanel(true);
  };

  const handleDeleteUser = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {
    setReloadKey(Date.now());
    setEditUser(false);
    setOpenPanel(false);
  };

  const handleCloseDelete = () => {
    setReloadKey(Date.now());
    setOpenDelete(false);
  };

  const handleMouse = (e) => {
    setSelectedUser(e);
  };

  const Button = ({ clase, icon, onClick }) => (
    <button className={clase} type="button" onClick={onClick}>
      <span className="material-symbols-outlined">{icon}</span>
    </button>
  );

  useEffect(() => {
    axiosInstance
      .get("/auth/getUsers")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log("Error al obtener Usuarios: ", error);
      });
  }, []);

  useEffect(() => {
    const filtrados = data.filter(
      (objeto) => objeto.nombre !== null && objeto.rol !== null
    );
    setUsers(filtrados);

    if (users != []) {
      setRenderTable(true);
    }
  }, [data]);

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.name,
    },
    {
      name: "Usuario",
      selector: (row) => row.username,
    },
    {
      name: "Foro",
      selector: (row) => row.foro,
    },
    {
      name: "Rol",
      selector: (row) => row.rol,
    },
    {
      name: "",
      button: "true",
      cell: () => (
        <Button clase="edit-button" icon="edit" onClick={handleEditUser} />
      ),
      center: "true",
    },
    {
      name: "",
      button: "true",
      cell: () => (
        <Button
          clase="delete-button"
          icon="person_remove"
          onClick={handleDeleteUser}
        />
      ),
      center: "true",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <section className="users-top">
          <button onClick={handleNewUser}>
            <span className="material-symbols-outlined">person_add</span>
            Crear Usuario
          </button>
        </section>
        <section className="usersTable-container">
          {renderTable && (
            <DataTable
              key={reloadKey}
              columns={columns}
              data={users}
              fixedHeader
              highlightOnHover
              onRowMouseEnter={handleMouse}
            />
          )}
        </section>

        {openPanel && (
          <UserPanel
            onClose={handleClose}
            user={editUser ? selectedUser : null}
          ></UserPanel>
        )}

        {openDelete && (
          <DeleteUser
            onClose={handleCloseDelete}
            user={selectedUser}
          ></DeleteUser>
        )}
      </>
    );
  }
};
