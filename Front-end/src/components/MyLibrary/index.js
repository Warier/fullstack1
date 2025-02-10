import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import SearchBarLibrary from '../SearchBarLibrary';
import './styles.css';

function MyLibrary() {
    const [libraryGames, setLibraryGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchError, setSearchError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');


    const fetchLibraryGames = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/library', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setLibraryGames(data);
                setError(null);
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (err) {
            console.error("Erro ao buscar jogos da biblioteca:", err);
            setError('Erro ao buscar jogos da biblioteca.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLibraryGames();
    }, []);


    const handleSearch = async (term) => {
        setSearchTerm(term);
        setLoading(true);
        setSearchError(null);
        try {
            const response = await fetch(`http://localhost:4000/api/library/search?q=${term}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setLibraryGames(data);
                if(data.length === 0 && term !== ''){
                    setSearchError("Nenhum jogo encontrado com esse nome")
                }
            } else {
                const errorData = await response.json();
                setSearchError(errorData.message);
            }
        } catch (err) {
            console.error("Erro ao buscar jogos na biblioteca:", err);
            setSearchError('Erro ao buscar jogos na biblioteca.');
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return <div className="text-center py-5">Carregando...</div>;
    }

    if (error) {
        return <div className="text-center py-5 text-danger">{error}</div>;
    }

    if(libraryGames.length === 0 && searchTerm === ''){
        return <div className="text-center py-5">Nenhum jogo na biblioteca ainda.</div>;
    }

    return (
        <Container>
            <h2 className="text-primary mb-4">Minha Biblioteca</h2>
            <SearchBarLibrary onSearch={handleSearch} /> {}
            {searchError && <Alert variant="warning">{searchError}</Alert>}

            <Row>
                {libraryGames.map((game) => (
                    <Col key={game.gameId} md={4} lg={3} className="mb-4">
                        <Card className="game-card h-100">
                            <Card.Img variant="top" src={game.thumb} className="game-thumb" />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="text-primary">{game.name}</Card.Title>
                                <Card.Text className="text-success fw-bold">
                                    Menor preço: ${game.cheapest}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default MyLibrary;