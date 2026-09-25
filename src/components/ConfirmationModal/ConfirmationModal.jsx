import closeButton from "../../assets/close-btn.svg";

function ConfirmationModal({ isOpen, onClose, buttonText, onSwitchToLogin }) {
  return (
    <div className={`modal ${isOpen && "modal__is-opened"}`}>
      <div className="modal__content modal__confirmation-content">
        <p className="modal__title modal__confirmation-title">
          Registration successfully completed!
        </p>
        <button className="modal__close" type="button" onClick={onClose}>
          <img
            src={closeButton}
            alt="Close button"
            className="modal__close-btn"
          />
        </button>
        <p className="modal__form-change-text">
          <button
            className="modal__form-change-btn modal__confirmation-btn"
            type="button"
            onClick={onSwitchToLogin}
          >
            {buttonText}
          </button>
        </p>
      </div>
    </div>
  );
}

export default ConfirmationModal;
