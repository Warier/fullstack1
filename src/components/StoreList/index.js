import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setStores } from '../../store/gameSlice';
import api from '../../services/api';

function StoreList() {
    const dispatch = useDispatch();
    const { stores } = useSelector(state => state.games);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await api.get('/stores');
                dispatch(setStores(response.data.filter(store => store.isActive)));
            } catch (error) {
                console.error('Erro ao carregar lojas:', error);
            }
        };
        fetchStores();
    }, [dispatch]);

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