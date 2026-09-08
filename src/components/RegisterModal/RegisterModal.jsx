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
  // define default values with useForm
  const { values, handleChange } = useForm({
    email: "",
    password: "",
    username: "",
  });

  // Track email, password, username validation errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // !"" evaluates to true, !"secret" evaluates to false, "" is considered falsy
  // Password validation helper (returns true or false)
  const isPasswordValid = (password) => {
    console.log(values.password);
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

  // Set up realtime validation feedback while user types
  const handleEmailChange = (evt) => {
    // Update form state hook (email value)
    handleChange(evt);
    // create const that keeps track of input values
    const newEmail = evt.target.value;
    // if there is no input value set error to ""
    if (!newEmail) {
      setEmailError("");
      // else if input is not validated show error
    } else if (!validateEmail(newEmail)) {
      setEmailError("Invalid email address");
      // else set error to ""
    } else {
      setEmailError("");
    }
  };
  // Set up realtime password validation feedback while user types
  const handlePasswordChange = (evt) => {
    handleChange(evt);
    const newPassword = evt.target.value;
    // Passing the fresh input value directly to bypass React state delay**
    if (!newPassword) {
      setPasswordError("");
    } else {
      isPasswordValid(newPassword);
    }
  };
  // Set up a form validity in real-time and set up a isFormValid boolean
  const isFormValid =
    validateEmail(values.email) &&
    validatePassword(values.password) &&
    validateUsername(values.username);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    // // Running final validations before submitting
    // const isEmailValid = validateEmail(values.email);

    // // Validate email before sending request
    // if (!isEmailValid) {
    //   setEmailError("Please enter a valid e-mail")};

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
        {/* Email error message below input */}
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
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
