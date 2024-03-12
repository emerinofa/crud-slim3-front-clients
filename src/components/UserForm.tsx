import { Grid, Card, Typography, CardContent, TextField, Button, CircularProgress, IconButton, InputAdornment, Tooltip } from '@mui/material'
import PageviewIcon from '@mui/icons-material/Pageview';
import useClientHook from '../hooks/useClientHook';
import { Toaster } from 'react-hot-toast';

export const UserForm = () => {

    const { client, setClient, loading, editing, handleSubmit, handleConsultaDni } = useClientHook();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setClient({
            ...client,
            [e.target.name]: value
        });

        if ( name === 'birthdate' && value.length === 10 ) {
            const age = new Date().getFullYear() - new Date(value).getFullYear();
            setClient((prevClient) => ({ ...prevClient, age: age.toString() }));
        }
    }

    return (
        <Grid 
            container 
            direction={'column'} 
            alignItems={'center'} 
            justifyContent={'center'} 
            spacing={2}
        >
            <Grid item xs={2} width={500}>
                <Card
                    sx={{mt: 5}}
                >
                    <Typography>
                        {editing ? 'Editar cliente' : 'Crear cliente'}
                    </Typography>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant='filled'
                                label='Escribe tu DNI'
                                placeholder='DNI'
                                fullWidth
                                type='text'
                                autoFocus
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Tooltip title="Consultar DNI">
                                                <IconButton onClick={() => handleConsultaDni(client.dni)} disabled={editing}>
                                                    <PageviewIcon style={{ fontSize: 40 }} />
                                                </IconButton>
                                            </Tooltip>
                                        </InputAdornment>
                                    ),
                                    inputProps: { 
                                        inputMode: 'numeric', 
                                        maxLength: 8, 
                                        pattern: '[0-9]{8}' 
                                    },
                                }}
                                required
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name='dni'
                                onChange={handleChange}
                                value={client.dni}
                                helperText= 'Escribe un DNI valido (8 digitos)'
                                disabled={editing}
                            />
                            <TextField
                                variant='filled'
                                label='Escribe tu nombre'
                                placeholder='nombre'
                                fullWidth
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name='name'
                                type='text'
                                inputProps={{ maxLength: 45 }}
                                required
                                onChange={handleChange}
                                value={client.name}
                            />
                            <TextField
                                variant='filled'
                                label='Escribe tus apellidos'
                                placeholder='apellidos'
                                fullWidth
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name='lastName'
                                inputProps={{ maxLength: 45 }}
                                required
                                onChange={handleChange}
                                value={client.lastName}
                            />
                            <TextField
                                variant='filled'
                                label='Escribe tu fecha de nacimiento'
                                placeholder='fecha de nacimiento'
                                fullWidth
                                type='date'
                                inputProps={{
                                    min: new Date(new Date().setFullYear(new Date().getFullYear() - 100)).toISOString().split('T')[0],
                                    max: new Date(new Date().setFullYear(new Date().getFullYear() - 13)).toISOString().split('T')[0],
                                }}
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0',
                                }}
                                name='birthdate'
                                onChange={handleChange}
                                value={client.birthdate}
                            />
                            <TextField
                                variant='filled'
                                label='Edad'
                                placeholder='edad'
                                fullWidth
                                type='number'
                                required
                                disabled
                                inputProps={{
                                    min: 13,
                                    max: 105,
                                }}
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name='age'
                                onChange={handleChange}
                                value={client.age}
                            />
                            <Button
                                variant='contained'
                                type='submit'
                                disabled={!client.name || !client.lastName || !client.birthdate || !client.age || !client.dni || !client.age}
                            >
                                {
                                    loading ? (
                                        <CircularProgress color='inherit' size={24} />
                                    ) : (
                                        editing ? 'Editar cliente' : 'Crear cliente'
                                    )
                                }
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
            <Toaster
                position="top-right"
                reverseOrder={false}
                gutter={8}
                containerStyle={{}}
                toastOptions={{
                    duration: 3000
                }}
            />
        </Grid>
    )
}
