import * as yup from "yup";

const editPasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .min(6, "The current password must have at least 6 characters")
    .max(100, "The current password cannot have more than 100 characters")
    .required("The current password is required"),

  newPassword: yup
    .string()
    .min(6, "The new password must have at least 6 characters")
    .max(100, "The new password cannot have more than 100 characters")
    .required("The new password is required to update your credentials"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("The confirmation password is required"),
});

export default editPasswordSchema;
