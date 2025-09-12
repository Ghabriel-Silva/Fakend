import * as yup from "yup";

const EditUserSchema = yup.object().shape({
    name: yup
        .string()
        .min(2, "O campo nome deve ter pelo menos 2 caracteres")
        .max(100, "O campo nome não pode ter mais de 100 caracteres")
        .notRequired(),

    last_name: yup
        .string()
        .min(2, "O campo sobrenome deve ter pelo menos 2 caracteres")
        .max(100, "O campo sobrenome não pode ter mais de 100 caracteres")
        .notRequired(),

    sexo: yup
        .string()
        .oneOf(["M", "F"], "O campo sexo deve ser 'M' ou 'F'")
        .notRequired(),

    birth_date: yup
        .string()
        .notRequired(),

    active: yup
        .boolean()
        .notRequired(),
});

export default EditUserSchema;
