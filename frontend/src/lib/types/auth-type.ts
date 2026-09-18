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

export type CodeVerificationData = {
    email: string | null;
    code: string;
}

export type PasswordResetData = {
    email: string;
    password: string;
}