import React, { useState, useCallback } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import GameList from './components/GameList';
import StoreList from './components/StoreList';
import api from './services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const searchGames = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get(`/games?title=${searchTerm}`);
            setGames(response.data);
        } catch (error) {
            console.error('Erro ao buscar jogos:', error);
        } finally {
            setLoading(false);
        }
    }, [searchTerm]);

    return (
        <Container className="py-4">
            <h1 className="text-center mb-4">Game Price Tracker</h1>

            <StoreList />

            <Form className="mb-4">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                placeholder="Buscar jogos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Button
                            variant="primary"
                            onClick={searchGames}
                            disabled={loading}
                        >
                            {loading ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                'Buscar'
                            )}
                        </Button>
                    </Col>
                </Row>
            </Form>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <GameList games={games} />
            )}
        </Container>
    );
}

export default App;