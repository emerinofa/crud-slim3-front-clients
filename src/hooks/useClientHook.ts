import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { Client, DniResponse } from '../interfaces/client';
import { ACTIVO, BASE_URL, INACTIVO } from '../helpers/constantes';
import axios from 'axios';

const useClientHook = () => {

    const [client, setClient] = useState<Client>({
        name: '',
        lastName: '',
        age: '',
        birthdate: '',
        dni: '',
    });

    const [clients, setClients] = useState<Client[]>()
    const [loading, setLoading] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);

    const navigate = useNavigate();
    const params = useParams();

    const loadClient = async (dni: string) => {
        try {
            const res = await axios.get(`${BASE_URL}/GET/client/${dni}`);
            const data = res.data;
            setClient({
                name: data.name,
                lastName: data.lastName,
                age: data.age,
                birthdate: data.birthdate,
                dni: data.dni,
            });
            setEditing(true);
        } catch (error) {
            console.error('Error al cargar el cliente:', error);
        }
    };

    const loadClients = async () => {
        const res = await axios.get(`${BASE_URL}/GET/listclients`)
        const data = res.data
        setClients(data)
    }

    useEffect(() => {
        if (params.dni) {
            loadClient(params.dni);
        }
    }, [params.dni]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.get(`${BASE_URL}/GET/client/${client.dni}`);
            const existingClient = await response.data;

            if ( editing && existingClient.estado == ACTIVO ) {
                const updateResponse = await axios.put(`${BASE_URL}/PUT/updateclient/${params.dni}`, client, { 
                    headers: { 'Content-Type': 'application/json' },
                }); 
                updateResponse.statusText === 'OK' ? toast.success('Cliente actualizado correctamente') : toast.error('Error al actualizar el cliente');

            } else if ( existingClient.estado == INACTIVO ) {
                const updateStateResponse = await axios.put(`${BASE_URL}/PUT/updateclientstate/${client.dni}`, client, {
                    headers: { 'Content-Type': 'application/json' },
                });
                updateStateResponse.statusText === 'OK' ? toast.success('Cliente nuevamente activo') : toast.error('Error al actualizar el cliente');

            } else {
                const createResponse = await axios.post(`${BASE_URL}/POST/createclient`, client, {
                    headers: { 'Content-Type': 'application/json' },
                });
                createResponse.statusText === 'OK' ? toast.success('Cliente creado correctamente') : toast.error('Error al crear el cliente');
            }
        } catch (error: unknown ) {
            toast.error('Error al crear el cliente, porfavor revise datos ingresados');
        } finally {
            setLoading(false);
            navigate('/');
        }
    };

    const handleDeleteUser = async (dni: string) => {
        try {
            const deleteResponse = await axios.put(`${BASE_URL}/DELETE/deleteclient/${dni}`, client, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            deleteResponse.statusText === 'OK' ? toast.success('Cliente eliminado correctamente') : toast.error('Error al eliminar el cliente');

            setClients(prevClients => prevClients?.filter(client => client.dni !== dni));
        } catch (error) {
            console.error('Hubo un problema con la llamada a la API:', error);
        }
    };

    const handleConsultaDni = async (dni: string) => {
        try {
            const response = await axios.get(`${BASE_URL}/consultar-dni/${dni}`);
            const data: DniResponse  = response.data;
            const clientData: Client = {
                name: data.nombres,
                lastName: `${ data.apellidoPaterno} ${data.apellidoMaterno}`,
                age: '',
                birthdate: '',
                dni: data.dni,
            };
            setClient(clientData);
        } catch (err) {
            console.log(err);
            toast.error('No se encontraron datos para el DNI proporcionado');
        }
    };

    return {
        client,
        clients,
        setClient,
        loading,
        editing,
        handleSubmit,
        handleDeleteUser,
        handleConsultaDni,
        loadClients,
    };
};

export default useClientHook;
