import type {E_Sex} from "@/enums/userEnum.ts";

export interface I_UserLogin {
    email: string;
    password: string;
}

export interface I_UserCreate {
    email: string;
    phone: string;
    password: string;
    passwordRepeat: string;
    firstName: string;
    lastName: string;
    birthDate: Date | null;
    sex: E_Sex;
    isAcceptedCookies: boolean;
    isAcceptLicense: boolean;
}
export interface I_UserData {
    userId?: number;
}
