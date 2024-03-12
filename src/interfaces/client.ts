export interface Client {
    name: string;
    lastName: string;
    age: string;
    birthdate: string;
    dni: string;
}

export interface DniResponse {
    success: boolean;
    dni: string;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    codVerifica: string;
}