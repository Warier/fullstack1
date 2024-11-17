import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

function StoreList() {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await axios.get('https://www.cheapshark.com/api/1.0/stores');
                setStores(response.data.filter(store => store.isActive));
            } catch (error) {
                console.error('Erro ao carregar lojas:', error);
            }
        };
        fetchStores();
    }, []);

    return (
        <Row className="mb-4">
            {stores.map((store) => (
                <Col key={store.storeID} md={3} className="mb-3">
                    <Card>
                        <Card.Body>
                            <img
                                src={`https://www.cheapshark.com${store.images.banner}`}
                                alt={store.storeName}
                                style={{ width: '100%', height: '50px', objectFit: 'contain' }}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default StoreList;