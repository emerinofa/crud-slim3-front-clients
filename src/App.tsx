import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { UserList } from './components/UserList'
import { UserForm } from './components/UserForm'
import { Navbar} from './components/Navbar'
import { Container } from '@mui/material'

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Container>
                <Routes>
                    <Route path="/" element={<UserList />} />
                    <Route path="*" element={<UserList />} />
                    <Route path="/users/new" element={<UserForm />} />
                    <Route path="/users/edit/:dni" element={<UserForm />} />
                </Routes>
            </Container>
        </BrowserRouter>
    )
}
