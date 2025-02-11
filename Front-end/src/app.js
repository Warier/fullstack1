import React, { useState, useEffect } from 'react';
import { Container, Nav, Button } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from './store';
import SearchBar from './components/SearchBar';
import GameList from './components/GameList';
import StoreList from './components/StoreList';
import AdvancedSearch from './components/AdvancedSearch';
import Login from './components/Login';
import MyLibrary from './components/MyLibrary';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/my-library');
    };

    return (
        <Provider store={store}>
            <div className="app-container">
                <Container fluid className="py-4">
                    <div className="header-container text-center mb-4">
                        <h1 className="text-primary">Game Price Tracker</h1>
                        <Nav className="justify-content-center mt-3">
                            <Nav.Item>
                                <Link to="/" className="nav-link nav-option">Buscar Jogos</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link to="/stores" className="nav-link nav-option">Lojas Disponíveis</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link to="/my-library" className="nav-link nav-option">Minha Biblioteca</Link>
                            </Nav.Item>
                        </Nav>
                        {isLoggedIn && (
                            <div className="logout-button-container" style={{ position: 'absolute', top: '20px', right: '20px' }}>
                                <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
                            </div>
                        )}
                    </div>

                    <Routes>
                        <Route path="/" element={<><SearchBar /><AdvancedSearch /><GameList /></>} />
                        <Route path="/stores" element={<StoreList />} />
                        <Route path="/my-library" element={isLoggedIn ? <MyLibrary /> : <Login setIsLoggedIn={setIsLoggedIn} />} /> {}
                    </Routes>

                </Container>
            </div>
        </Provider>
    );
}
export default App;