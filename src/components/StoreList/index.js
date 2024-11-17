import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getStores } from '../../services/api';
import { setStores } from '../../store/gameSlice';

function StoreList() {
    const dispatch = useDispatch();
    const { stores } = useSelector(state => state.games);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const data = await getStores();
                dispatch(setStores(data.filter(store => store.isActive)));
            } catch (error) {
                console.error('Erro ao carregar lojas:', error);
            }
        };
        fetchStores();
    }, [dispatch]);

    return (
        <Row className="stores-grid">
            {stores.map((store) => (
                <Col key={store.storeID} md={3} lg={2} className="mb-3">
                    <Card className="store-card bg-dark">
                        <Card.Body>
                            <img
                                src={`https://www.cheapshark.com${store.images.banner}`}
                                alt={store.storeName}
                                className="store-banner w-100"
                            />
                            <h6 className="text-white text-center mt-2">
                                {store.storeName}
                            </h6>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default StoreList;