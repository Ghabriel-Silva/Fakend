import * as yup from "yup";

const EditUserSchema = yup.object().shape({
    name: yup
        .string()
        .min(2, "The name field must have at least 2 characters")
        .max(100, "The name field cannot have more than 100 characters")
        .notRequired(),

    last_name: yup
        .string()
        .min(2, "The last name field must have at least 2 characters")
        .max(100, "The last name field cannot have more than 100 characters")
        .notRequired(),

    sexo: yup
        .string()
        .oneOf(["M", "F"], "The gender field must be 'M' or 'F'")
        .notRequired(),

    birth_date: yup
        .string()
        .notRequired(),

    active: yup
        .boolean()
        .notRequired(),
});

export default EditUserSchema;
