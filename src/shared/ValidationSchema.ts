import * as Yup from 'yup';

const emailSchema = Yup.string()
  .max(30)
  .matches(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
  .required();

const passwordSchema = Yup.string()
  .matches(/^[a-zA-Z0-9#@!~%^&*]{8,30}$/)
  .required();

export const emailAndPasswordValidationSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema
});

export const emailValidationSchema = Yup.object().shape({
  email: emailSchema
});

export const passwordResetValidationSchema = Yup.object().shape({
  password: passwordSchema,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null])
    .required()
});

// Match all phone numbers from China mainland(exclude IoT numbers) and HKSAR
// Reference: https://www.hkepc.com/forum/viewthread.php?fid=26&tid=2190792 & https://github.com/VincentSit/ChinaMobilePhoneNumberRegex
const phoneRegex = /^1[0-9]{10}$|^[569][0-9]{7}$|^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[01356789]\d{2}|4(?:0\d|1[0-2]|9\d))|9[01356789]\d{2}|6[2567]\d{2}|4[579]\d{2})\d{6}$/;

export const signupFormValidationSchema = Yup.object().shape({
  confirmed: Yup.boolean(),
  form: Yup.object().shape({
    teamInfo: Yup.object({
      name: Yup.string()
        .max(20)
        .required(),
      description: Yup.string()
        .max(50)
        .required()
    }),
    memberInfo: Yup.array(
      Yup.object().shape({
        name: Yup.string()
          .max(20)
          .required(),
        gender: Yup.string()
          .matches(/^[0-2]$/)
          .required(),
        captain: Yup.bool().required(),
        email: Yup.string()
          .max(50)
          .matches(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
          .required(),
        phone: Yup.string()
          .matches(phoneRegex)
          .required(),
        size: Yup.string()
          .matches(/^[0-6]$/)
          .required(),
        school: Yup.string()
          .max(30)
          .required(),
        education: Yup.string()
          .matches(/^[0-2]$/)
          .required(),
        grade: Yup.string()
          .max(10)
          .required(),
        profession: Yup.string()
          .max(20)
          .required(),
        experience: Yup.string()
          .max(100)
          .required()
      })
    )
      .min(1)
      .max(6)
      .required()
  })
});
