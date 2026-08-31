import { useState } from "react";

// This useForm hook centralizes form state and gives every input a single
// handleChange function that uses the input's name to update the
// correct property in the values object.

export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return { values, handleChange, setValues };
}
