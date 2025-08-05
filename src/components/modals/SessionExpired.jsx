import "../../styles/Modal.css";

export const SessionExpiredModal = ({ onClose }) => {
  return (
    <div className="failed-overlay">
      <div className="failed-modal">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <span className="material-symbols-outlined">warning</span>
        <h2>ADVERTENCIA!</h2>
        <br></br>
        <h3>Su sesión ha expirado. Por favor, vuelva a iniciar sesión.</h3>
      </div>
    </div>
  );
};
