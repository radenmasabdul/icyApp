import * as Yup from 'yup';

//validasi login
export const loginValidationSchema = Yup.object({
    email: Yup.string()
        .email('Email tidak valid')
        .required('Email diperlukan'),
    password: Yup.string()
        .min(6, 'Password harus minimal 6 karakter')
        .required('Password diperlukan'),
});
