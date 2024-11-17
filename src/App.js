import React, { useState } from 'react';
import { Container, Nav } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from './store';
import SearchBar from './components/SearchBar';
import GameList from './components/GameList';
import StoreList from './components/StoreList';
import AdvancedSearch from './components/AdvancedSearch';
import "./App.css";

function App() {
    const [activeComponent, setActiveComponent] = useState('search');

    return (
        <Provider store={store}>
            <div className="app-container">
                <Container fluid className="py-4">
                    <div className="header-container text-center mb-4">
                        <h1 className="text-primary">Game Price Tracker</h1>
                        <Nav className="justify-content-center mt-3">
                            <Nav.Item>
                                <Nav.Link
                                    className={`nav-option ${activeComponent === 'search' ? 'active' : ''}`}
                                    onClick={() => setActiveComponent('search')}
                                >
                                    Buscar Jogos
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    className={`nav-option ${activeComponent === 'stores' ? 'active' : ''}`}
                                    onClick={() => setActiveComponent('stores')}
                                >
                                    Lojas Disponíveis
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>

                    {activeComponent === 'search' && (
                        <>
                            <SearchBar />
                            <AdvancedSearch />
                            <GameList />
                        </>
                    )}

                    {activeComponent === 'stores' && <StoreList />}
                </Container>
            </div>
        </Provider>
    );
}

export default App;
