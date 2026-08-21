export type RegisterFormData = {
    name?: string;
    email: string;
    password: string;
    password_confirmation: string;  
}

export type LoginFormData = {
    email: string;
    password: string;
}