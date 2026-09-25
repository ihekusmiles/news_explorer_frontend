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
  const [passwordError, setPasswordError] = useState("");

  // Realtime validation for email input change
  const handleEmailChange = (evt) => {
    handleChange(evt);
    const newEmail = evt.target.value;
    if (!newEmail) {
      setEmailError("Email is required");
    } else if (!validateEmail(newEmail)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  // Return true or false if password is valid or not
  const isPasswordValid = (password) => {
    const trimmedPassword = password.trim();
    if (!trimmedPassword) {
      setPasswordError("Password is required");
      return false;
    } else if (trimmedPassword.length < 6) {
      setPasswordError("Please enter your password");
      return false;
    }
    setPasswordError("");
    return true;
  };

  // Realtime validation for password input change
  const handlePasswordChange = (evt) => {
    handleChange(evt);
    const usersPassword = evt.target.value;
    if (!usersPassword) {
      setPasswordError("");
    }
    isPasswordValid(usersPassword);
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
          onChange={handlePasswordChange}
          required
        />
        <span className="modal__error">{passwordError}</span>
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
