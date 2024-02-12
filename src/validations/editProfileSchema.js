import { object, string, ref, date } from "yup"

export const editProfileSchema = object({
    name: string()
        .required("Ingrese un nombre"),
    lastName: string()
        .required("Ingrese su apellido"),
    birthday: date()
        .nullable().typeError('Ingrese una fecha de cumpleaños válida')
        .required("Ingrese su fecha de nacimiento")
        .max(new Date(), 'La fecha de nacimiento no puede ser en el futuro')
})