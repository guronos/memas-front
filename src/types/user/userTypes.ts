export interface I_UserLogin {
    email: string
    password: string
}

export interface I_UserCreate {
    email: string
    phone: string
    password: string
    passwordRepeat: string
    firstName: string
    lastName: string
    birthDate: string
    sex: string
    isAcceptedCookies: boolean
    isAcceptLicense: boolean
}
export interface I_UserData {
    userId?: number
}
