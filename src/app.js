import React, { useState, useCallback } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import store from './store';
import GameList from './components/GameList';
import StoreList from './components/StoreList';
import AdvancedSearch from './components/AdvancedSearch';
import api from './services/api';
import { setGames, setLoading, setError } from './store/gameSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppContent() {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const { searchType, exactMatch, error } = useSelector(state => state.games);

    const searchGames = useCallback(async () => {
        if (!searchTerm.trim()) {
            dispatch(setError('Por favor, insira um termo de busca'));
            return;
        }

        try {
            dispatch(setLoading(true));
            const params = searchType === 'title'
                ? { title: searchTerm, exact: exactMatch ? 1 : 0 }
                : { steamAppID: searchTerm };

            const response = await api.get('/games', { params });
            dispatch(setGames(response.data));
            dispatch(setError(null));
        } catch (error) {
            dispatch(setError('Erro ao buscar jogos. Tente novamente.'));
        } finally {
            dispatch(setLoading(false));
        }
    }, [searchTerm, searchType, exactMatch, dispatch]);

    return (
        <Container className="py-4">
            <h1 className="text-center mb-4">Game Price Tracker</h1>

            <StoreList />

            {error && <Alert variant="danger">{error}</Alert>}

            <Form className="mb-4">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Control
                                type={searchType === 'steamId' ? 'number' : 'text'}
                                placeholder={searchType === 'steamId' ? 'Digite o Steam ID...' : 'Digite o nome do jogo...'}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Button
                            variant="primary"
                            onClick={searchGames}
                        >
                            Buscar
                        </Button>
                    </Col>
                </Row>
            </Form>

            <AdvancedSearch />
            <GameList />
        </Container>
    );
}

function App() {
    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
    );
}

export default App;