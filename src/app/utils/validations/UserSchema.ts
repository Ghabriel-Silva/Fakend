import * as yup from "yup";

const UserSchema = yup.object().shape({
  name: yup
    .string()
    .required("The name field is required")
    .min(2, "The name field must have at least 2 characters")
    .max(100, "The name field cannot have more than 100 characters"),

  last_name: yup
    .string()
    .required("The last name field is required")
    .min(2, "The last name field must have at least 2 characters")
    .max(100, "The last name field cannot have more than 100 characters"),

  email: yup
    .string()
    .email("The email field must be a valid email")
    .required("The email field is required")
    .min(10, "The email field must have at least 10 characters")
    .max(100, "The email field cannot have more than 100 characters"),

  password: yup
    .string()
    .required("The password field is required")
    .min(6, "The password field must have at least 6 characters")
    .max(100, "The password field cannot have more than 100 characters"),

  birth_date: yup
    .string()
    .typeError("The birth date field must be a valid date"),

  sexo: yup
    .string()
    .required("The gender field is required")
    .oneOf(["M", "F"], "The gender field must be 'M' or 'F'"),

  active: yup
    .boolean()
    .typeError("The active field must be a boolean value")
    .notRequired(), // optional
});

export default UserSchema;
