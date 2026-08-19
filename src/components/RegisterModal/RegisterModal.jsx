import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ buttonText }) {
  return (
    <ModalWithForm name="register" title="Sign up" buttonText={buttonText}>
      <label className="modal__label" htmlFor="register-email">
        Email
        <input
          className="modal__input"
          type="email"
          id="register-email"
          name="email"
          placeholder="Enter email"
          required
        />
      </label>

      <label className="modal__label" htmlFor="register-password">
        Password
        <input
          className="modal__input"
          type="password"
          id="register-password"
          placeholder="Enter password"
          required
        />
      </label>
      <label className="modal__label" htmlFor="register-username">
        Username
        <input
          className="modal__input"
          type="text"
          id="register-username"
          placeholder="Enter your username"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
