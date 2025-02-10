import React from 'react';
import { Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { PLACEHOLDER_IMAGE } from '../../utils/constants';
import './styles.css';

function GameList() {
    const { games, loading, error } = useSelector(state => state.games);
    const isLoggedIn = localStorage.getItem('token') !== null;

    const handleAddToLibrary = async (game) => {
        if (!isLoggedIn) {
            alert('Você precisa estar logado para adicionar um jogo à biblioteca!');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/library', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    gameId: game.gameID,
                    name: game.external,
                    thumb: game.thumb,
                    cheapest: game.cheapest,
                    cheapestDealID: game.cheapestDealID,
                    steamAppID: game.steamAppID,
                }),
            });

            if (response.ok) {
                alert('Jogo adicionado à biblioteca com sucesso!');
            } else {
                const errorData = await response.json();
                alert(`Erro ao adicionar jogo à biblioteca: ${errorData.message}`);
            }
        } catch (err) {
            console.error("Erro ao adicionar à biblioteca:", err);
            alert('Erro ao adicionar jogo à biblioteca. Tente novamente.');
        }
    };

    if (loading) {
        return <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    if (games.length === 0) {
        return <Alert variant="info">Nenhum jogo encontrado. Tente uma nova busca.</Alert>;
    }

    return (
        <Row>
            {games.map((game) => (
                <Col key={game.gameID} md={4} lg={3} className="mb-4">
                    <Card className="game-card h-100">
                        <Card.Img
                            variant="top"
                            src={game.thumb || PLACEHOLDER_IMAGE}
                            className="game-thumb"
                            onError={(e) => { e.target.src = PLACEHOLDER_IMAGE; }}
                        />
                        <Card.Body className="d-flex flex-column">
                            <Card.Title className="text-primary">{game.external}</Card.Title>
                            <Card.Text className="text-success fw-bold">Menor preço: ${game.cheapest}</Card.Text>
                            <Button
                                variant="outline-primary"
                                href={`https://www.cheapshark.com/redirect?dealID=${game.cheapestDealID}`}
                                target="_blank"
                                className="mt-auto"
                            >
                                Ver Oferta
                            </Button>
                            <Button
                                variant="success"
                                className="mt-2"
                                onClick={() => handleAddToLibrary(game)}
                            >
                                Adicionar à Biblioteca
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default GameList;