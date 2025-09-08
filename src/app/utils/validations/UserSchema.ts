import * as yup from "yup";

const UserSchema = yup.object().shape({
  name: yup
    .string()
    .required("O campo nome é obrigatório")
    .min(2, "O campo nome deve ter pelo menos 3 caracteres")
    .max(100, "O campo nome não pode ter mais de 100 caracteres"),

  last_name: yup
    .string()
    .required("O campo sobrenome é obrigatório")
    .min(2, "O campo sobrenome deve ter pelo menos 2 caracteres")
    .max(100, "O campo sobrenome não pode ter mais de 100 caracteres"),

  email: yup
    .string()
    .email("O campo email deve ser um email válido")
    .required("O campo email é obrigatório")
    .min(10, "O campo email deve ter pelo menos 10 caracteres")
    .max(100, "O campo email não pode ter mais de 100 caracteres"),

  password: yup
    .string()
    .required("O campo senha é obrigatório")
    .min(6, "O campo senha deve ter pelo menos 6 caracteres")
    .max(100, "O campo senha não pode ter mais de 100 caracteres"),

  birth_date: yup
    .string()
    .typeError("O campo data de nascimento deve ser uma data"),

  sexo: yup
    .string()
    .required("O campo sexo é obrigatório")
    .oneOf(["M", "F"], "O campo sexo deve ser 'M' ou 'F'"),

  active: yup
    .boolean()
    .typeError("O campo ativo deve ser um valor booleano")
    .notRequired(), // opcional
});

export default UserSchema;
