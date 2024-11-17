import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

function GameList({ games }) {
    return (
        <Row>
            {games.map((game) => (
                <Col key={game.gameID} md={4} className="mb-4">
                    <Card>
                        <Card.Img variant="top" src={game.thumb} />
                        <Card.Body>
                            <Card.Title>{game.external}</Card.Title>
                            <Card.Text>
                                Menor preço: ${game.cheapest}
                            </Card.Text>
                            <Button
                                variant="primary"
                                href={`https://www.cheapshark.com/redirect?dealID=${game.cheapestDealID}`}
                                target="_blank"
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