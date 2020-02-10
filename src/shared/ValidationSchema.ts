import * as Yup from 'yup';

export const emailAndPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .max(30)
    .matches(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
    .required(),
  password: Yup.string()
    .min(8)
    .max(30)
    .required()
});

export const emailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .max(30)
    .matches(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
    .required()
});
