import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../utils/validation";

function RegisterModal({
  buttonText,
  isOpen,
  onClose,
  onSwitchToLogin,
  onRegisterSubmit,
}) {
  // Defing default values with useForm
  const { values, handleChange } = useForm({
    email: "",
    password: "",
    username: "",
  });

  // Tracking email, password, username validation errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  // Setting up realtime validation feedback while user types
  const handleEmailChange = (evt) => {
    // Updating form state hook (email value)
    handleChange(evt);
    // Creating const that keeps track of input values
    const newEmail = evt.target.value;
    // If there is no input value trigger email required error
    if (!newEmail) {
      setEmailError("Email is required");
      // else if input is not validated show error
    } else if (!validateEmail(newEmail)) {
      setEmailError("Invalid email address");
      // else remove error message by setting to ""
    } else {
      setEmailError("");
    }
  };

  // Password validation helper (returns true or false)
  const isPasswordValid = (password) => {
    const trimmedPassword = password.trim();
    // If the trimmed password is empty
    if (!trimmedPassword) {
      setPasswordError("Password is required");
      return false;
    } else if (trimmedPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  // Setting up realtime password validation feedback while user types
  const handlePasswordChange = (evt) => {
    handleChange(evt);
    const newPassword = evt.target.value;
    // Passing the fresh input value directly to bypass React state delay**
    if (!newPassword) {
      setPasswordError("");
    }
    isPasswordValid(newPassword);
  };

  // Username validation helper (returns true or false)
  const isUsernameValid = (username) => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      setUsernameError("Username is required");
      return false;
    } else if (trimmedUsername.length < 3) {
      setUsernameError("Username must be at least 3 characters long");
      return false;
    }
    setUsernameError("");
    return true;
  };

  const handleUsernameChange = (evt) => {
    handleChange(evt);
    const username = evt.target.value;
    if (!username) {
      setUsernameError("");
    }
    isUsernameValid(username);
  };

  // Setting up a form validity in real-time and set up a isFormValid boolean
  const isFormValid =
    validateEmail(values.email) &&
    validatePassword(values.password) &&
    validateUsername(values.username);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (isFormValid && onRegisterSubmit) {
      onRegisterSubmit(values);
    }
  };

  return (
    <ModalWithForm
      name="register"
      title="Sign up"
      textChange="Sign in"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onAltClick={onSwitchToLogin}
      onSubmit={handleSubmit}
      isDisabled={!isFormValid} // Passing dynamic boolean down
    >
      <label className="modal__label" htmlFor="register-email">
        Email
        <input
          className="modal__input"
          id="register-email"
          type="email"
          name="email"
          placeholder="Enter email"
          value={values.email || ""}
          onChange={handleEmailChange}
          required
        />
        <span className="modal__error">{emailError}</span>
      </label>

      <label className="modal__label" htmlFor="register-password">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          id="register-password"
          placeholder="Enter password"
          value={values.password || ""}
          onChange={handlePasswordChange}
          required
        />
        <span className="modal__error">{passwordError}</span>
      </label>
      <label className="modal__label" htmlFor="register-username">
        Username
        <input
          className="modal__input"
          type="text"
          name="username"
          id="register-username"
          placeholder="Enter your username"
          value={values.username || ""}
          onChange={handleUsernameChange}
          required
        />
        <span className="modal__error">{usernameError}</span>
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
