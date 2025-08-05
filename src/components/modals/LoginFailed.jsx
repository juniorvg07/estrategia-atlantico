import "../../styles/Modal.css";

export const LoginFailedModal = ({ errorLabel, onClose }) => {
  return (
    <div className="failed-overlay">
      <div className="failed-modal">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <span className="material-symbols-outlined">report</span>
        <h2>¡ERROR!</h2>

        <h3>{errorLabel}</h3>
      </div>
    </div>
  );
};
