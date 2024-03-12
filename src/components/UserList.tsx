import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import useClientHook from "../hooks/useClientHook"
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    TablePagination, 
    Paper, 
    IconButton, 
    Tooltip 
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const UserList = () => {

    const { clients, loadClients, handleDeleteUser } = useClientHook();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate()

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        loadClients()
    }, [])

    return (
        <div>
            <h1>Lista de clientes</h1>
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>DNI</strong></TableCell>
                        <TableCell><strong>NOMBRES</strong></TableCell>
                        <TableCell><strong>APELLIDOS</strong></TableCell>
                        <TableCell><strong>FECHA DE NACIMIENTO</strong></TableCell>
                        <TableCell><strong>EDAD</strong></TableCell>
                        <TableCell><strong>ACCIONES</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {clients?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow key={row.dni}>
                            <TableCell>{row.dni}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.lastName}</TableCell>
                            <TableCell>{row.birthdate}</TableCell>
                            <TableCell>{row.age}</TableCell>
                            <TableCell>
                                <Tooltip title="Editar">
                                    <IconButton
                                        onClick={() => navigate(`/users/edit/${row.dni}`)}
                                        color="inherit"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Eliminar">
                                    <IconButton
                                        onClick={() => handleDeleteUser(row.dni)}
                                        color="warning"
                                        style={{ marginLeft: 8 }}
                                    >
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={clients?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
            <Toaster
                position="top-right"
                reverseOrder={false}
                gutter={8}
                containerStyle={{}}
                toastOptions={{
                    duration: 3000
                }}
            />
        </div>
    )
}
