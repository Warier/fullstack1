import React from 'react';
import { Card, Button } from 'react-bootstrap';

const GameCard = React.memo(({ game }) => {
    return (
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
    );
});

export default GameCard;