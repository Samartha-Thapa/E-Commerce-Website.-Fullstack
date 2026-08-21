import { RegisterFormData } from "@/lib/types/auth-type";
import api from "../api";

const registerUser = async (data: RegisterFormData) => {
    try{
        const response = await api.post("/register", data);
        return response.data;
    } catch(err) {
        console.error(err);
    }
}

export {registerUser };