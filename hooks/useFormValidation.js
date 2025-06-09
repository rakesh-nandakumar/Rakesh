import { useState } from "react";

export const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value, rules = {}) => {
    const fieldErrors = [];

    if (rules.required && (!value || value.trim() === "")) {
      fieldErrors.push(
        `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
      );
    }

    if (rules.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      fieldErrors.push("Please enter a valid email address");
    }

    if (
      rules.phone &&
      value &&
      !/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, ""))
    ) {
      fieldErrors.push("Please enter a valid phone number");
    }

    if (rules.minLength && value && value.length < rules.minLength) {
      fieldErrors.push(
        `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${
          rules.minLength
        } characters`
      );
    }

    return fieldErrors;
  };

  const validateForm = (formData, validationRules) => {
    const newErrors = {};
    let isValid = true;

    // Validate individual fields
    Object.keys(validationRules).forEach((field) => {
      const fieldErrors = validateField(
        field,
        formData[field],
        validationRules[field]
      );
      if (fieldErrors.length > 0) {
        newErrors[field] = fieldErrors;
        isValid = false;
      }
    }); // Custom validation: at least one contact method required
    if (validationRules.requireContactMethod) {
      const hasEmail = formData.email && formData.email.trim() !== "";
      const hasPhone = formData.phone && formData.phone.trim() !== "";

      if (!hasEmail && !hasPhone) {
        const contactError = "Please provide at least one contact method";
        // Add error to both email and phone fields
        if (!newErrors.email) newErrors.email = [];
        if (!newErrors.phone) newErrors.phone = [];
        newErrors.email.push(contactError);
        newErrors.phone.push(contactError);
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const clearErrors = () => {
    setErrors({});
  };

  const clearFieldError = (fieldName) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  return {
    errors,
    validateForm,
    validateField,
    clearErrors,
    clearFieldError,
    setErrors,
  };
};
