import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { validateEmail, validatePassword } from "../../utils/validation";

function LoginModal({
  buttonText,
  isOpen,
  onClose,
  onSwitchToRegister,
  onLoginSubmit,
}) {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (evt) => {
    handleChange(evt);
    const newEmail = evt.target.value;
    if (!newEmail || validateEmail(newEmail)) {
      setEmailError("");
    } else {
      setEmailError("Invalid email address");
    }
  };

  // Validating email and password in form and returning a boolean
  const isFormValid =
    validateEmail(values.email) && validatePassword(values.password);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isFormValid && onLoginSubmit) {
      onLoginSubmit(values);
    }
  };

  return (
    <ModalWithForm
      name="login"
      title="Sign in"
      textChange="Sign up"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onAltClick={onSwitchToRegister}
      /* Submitting form */
      onSubmit={handleSubmit}
      isDisabled={!isFormValid}
    >
      <label className="modal__label" htmlFor="login-email">
        Email
        <input
          className="modal__input"
          type="email"
          id="login-email"
          name="email"
          placeholder="Enter email"
          value={values.email || ""}
          onChange={handleEmailChange}
          required
        />
        <span className="modal__error">{emailError}</span>
      </label>
      <label className="modal__label" htmlFor="login-password">
        Password
        <input
          className="modal__input"
          type="password"
          id="login-password"
          name="password"
          placeholder="Enter password"
          value={values.password || ""}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
