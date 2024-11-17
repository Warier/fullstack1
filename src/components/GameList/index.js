import React from 'react';
import { Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { PLACEHOLDER_IMAGE, ERROR_MESSAGES } from '../../utils/constants';
import './styles.css';

function GameList() {
    const { games, loading, error } = useSelector(state => state.games);

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    if (games.length === 0) {
        return (
            <Alert variant="info">
                Nenhum jogo encontrado. Tente uma nova busca.
            </Alert>
        );
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
                            onError={(e) => {
                                e.target.src = PLACEHOLDER_IMAGE;
                            }}
                        />
                        <Card.Body className="d-flex flex-column">
                            <Card.Title className="text-primary">{game.external}</Card.Title>
                            <Card.Text className="text-success fw-bold">
                                Menor preço: ${game.cheapest}
                            </Card.Text>
                            <Button
                                variant="outline-primary"
                                href={`https://www.cheapshark.com/redirect?dealID=${game.cheapestDealID}`}
                                target="_blank"
                                className="mt-auto"
                            >
                                Ver Oferta
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default GameList;