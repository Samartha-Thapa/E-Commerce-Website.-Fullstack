import { CodeVerificationData, LoginFormData, PasswordResetData, RegisterFormData } from "@/lib/types/auth-type";
import api from "../api";
import axios from "axios";

const registerUser = async (data: RegisterFormData) => {
    await axios.get(`${process.env.NEXT_PUBLIC_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
    });
    try{
        const response = await api.post("/register", data);
        return {success: true, ...response.data};
    } catch(err: any) {
        console.error(err);
        return {
            success: false,
            message: err.response?.data?.message || "An unexpected error occurred!",
            errors: err.response?.data?.errors || null,
        }
    }
}

const loginUser = async (data: LoginFormData) => {
    await axios.get(`${process.env.NEXT_PUBLIC_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
    });
    try {
        const response = await api.post("/login", data);
        return {success: true, ...response.data};
    } catch(err: any) {
        console.error(err);
        return {
            success: false,
            message: err.response?.data?.message || "An unexpected error occurred!",
            errors: err.response?.data?.errors || null,
        }
    }
}
async function codeVerification(data: CodeVerificationData) {
    await axios.get(`${process.env.NEXT_PUBLIC_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
    });

    try {

        const response = await api.post("/verifyCode", data);   
        return {success: true, ...response.data};
    } catch (err: any) {
        console.error(err);
        return {
            success: false,
            message: err.response?.data?.message || "An unexpected error occurred!",
            errors: err.response?.data?.errors || null,
        }
    }

}

const forgotPasswordUser = async (data: string) => {
    await axios.get(`${process.env.NEXT_PUBLIC_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
    });

    try {
        const response = await api.post("/forgot-password", {
            email: data
        });
        
        return {success: true, ...response.data};
    } catch(err:any) {
        console.error(err);
        return {
            success: false,
            message: err.response?.data?.message || "An unexpected error occurred!",
            errors: err.response?.data?.errors || null,
        }
    }

}

const resetPasswordUser = async (data: PasswordResetData) => {
    await axios.get(`${process.env.NEXT_PUBLIC_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
    });

    try {
        const response = await api.post("/password-reset", data);
        return {success: true, ...response.data};
    } catch(err: any) {
        console.error(err);
        return {
            success: false,
            message: err.response?.data?.message || "An unexpected error occurred!",
            erros: err.response?.data?.errors || null,
        }
    }
}


export {registerUser, loginUser, codeVerification, forgotPasswordUser, resetPasswordUser };