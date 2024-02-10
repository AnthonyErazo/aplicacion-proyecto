import { object, string, ref, date } from "yup"

export const loginSchema = object({
    name: string()
        .required("Ingrese un nombre"),
    lastName: string()
        .required("Ingrese su apellido"),
    birthday: date()
        .nullable().typeError('Ingrese una fecha de cumpleaños válida')
        .required("Ingrese su fecha de nacimiento")
        .max(new Date(), 'La fecha de nacimiento no puede ser en el futuro'),
    email: string()
        .required("Ingrese un correo")
        .email("Ingrese un correo valido"),
    password: string()
        .required("Ingrese una contraseña")
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: string()
        .oneOf([ref("password")], "las contraseñas no son iguales")
})