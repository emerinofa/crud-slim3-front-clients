
import { Box, AppBar, Container, Toolbar, Typography, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

export const Navbar = () => {

    const navigate = useNavigate()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color='transparent'>
                <Container>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                                CRUD-CLIENTES-HOME
                            </Link>
                        </Typography>

                        <Button 
                            onClick={() => navigate('/users/new')} 
                            variant='contained' 
                            color='primary'
                        >
                            Nuevo cliente
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}
