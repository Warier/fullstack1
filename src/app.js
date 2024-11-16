import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState, useCallback } from 'react';
import { Container, Row, Col, Form, Card, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const searchGames = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://www.cheapshark.com/api/1.0/games?title=${searchTerm}`);
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
      </Container>
  );
}

export default App;
