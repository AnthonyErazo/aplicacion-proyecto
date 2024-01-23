import { object, string,ref} from "yup"

export const loginSchema = object({
    email:string()
        .email("Ingrese un correo valido")
        .required("Ingrese un correo"),
    password:string()
        .required("Ingrese una contraseña"),
    confirmPassword:string()
        .oneOf([ref("password")],"las contraseñas no son iguales")
        // .required("vuelva a ingresar el mail")
})