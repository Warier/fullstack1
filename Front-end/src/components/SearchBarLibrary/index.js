import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import './styles.css';

function SearchBarLibrary({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            alert("Por favor, digite um termo para buscar.");
            return;
        }
        onSearch(searchTerm);
    };

    return (
        <Form onSubmit={handleSearch} className="search-form mb-4">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome do jogo..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100"
                    >
                        Buscar
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

export default SearchBarLibrary;