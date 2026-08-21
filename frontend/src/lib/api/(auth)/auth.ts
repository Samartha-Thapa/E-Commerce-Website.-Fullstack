import { codeVerificationData, LoginFormData, RegisterFormData } from "@/lib/types/auth-type";
import api from "../api";
import axios from "axios";

const registerUser = async (data: RegisterFormData) => {
    await axios.get(`${process.env.NEXT_PUBLIC_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
    });
    try{
        const response = await api.post("/register", data);
        return response.data;
    } catch(err) {
        console.error(err);
    }
}

const loginUser = async (data: LoginFormData) => {
    await axios.get(`${process.env.NEXT_PUBLIC_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
    });
    try {
        const response = await api.post("/login", data);
        return response.data;
    } catch(err) {
        console.error(err);
    }
}

export async function codeVerification(data: codeVerificationData) {
    await axios.get(`${process.env.NEXT_PUBLIC_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
    });

    const response = await api.post("/verifyCode", data);

    return response.data;

}

export {registerUser, loginUser };