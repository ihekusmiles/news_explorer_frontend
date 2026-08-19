import ModalWithForm from "../ModalWithForm/ModalWithForm";

// Remember that the children refers to anything within
// the <ModalWithForm></ModalWithForm> tags.
function LoginModal({ buttonText }) {
  return (
    <ModalWithForm name="login" title="Sign in" buttonText={buttonText}>
      <label className="modal__label" htmlFor="login-email">
        Email
        <input
          className="modal__input"
          type="email"
          id="login-email"
          name="email"
          placeholder="Enter email"
          required
        />
      </label>
      <label className="modal__label" htmlFor="login-password">
        Password
        <input
          className="modal__input"
          type="password"
          id="login-password"
          name="email"
          placeholder="Enter password"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
