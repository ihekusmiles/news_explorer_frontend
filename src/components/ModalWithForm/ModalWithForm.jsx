import closeButton from "../../assets/close-btn.svg";

function ModalWithForm({ children, title, buttonText, name }) {
  return (
    <div className={`modal modal_type_${name} modal__is-opened`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close" type="button">
          <img
            src={closeButton}
            alt="Close button"
            className="modal__close-btn"
          />
        </button>
        <form className={`modal__form ${name}`}>
          {children}
          <button className="modal__submit" type="submit">
            {buttonText}
          </button>
        </form>
        <p className="modal__form-change-text">
          or&nbsp;
          <button className="modal__form-change-btn" type="button">
            click here
          </button>
        </p>
      </div>
    </div>
  );
}

export default ModalWithForm;
