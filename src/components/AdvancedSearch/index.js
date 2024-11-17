import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchType, setExactMatch } from '../../store/gameSlice';

function AdvancedSearch() {
    const dispatch = useDispatch();
    const { searchType, exactMatch } = useSelector(state => state.games);

    return (
        <Row className="justify-content-center mb-4">
            <Col md={8}>
                <div className="advanced-search-container">
                    <h5 className="text-primary mb-3">Busca Avançada</h5>
                    <Form.Group className="mb-3">
                        <div className="d-flex gap-3">
                            <Form.Check
                                type="radio"
                                id="searchByTitle"
                                label="Buscar por título"
                                name="searchType"
                                checked={searchType === 'title'}
                                onChange={() => dispatch(setSearchType('title'))}
                                className="search-option"
                            />
                            <Form.Check
                                type="radio"
                                id="searchBySteamId"
                                label="Buscar por Steam ID"
                                name="searchType"
                                checked={searchType === 'steamId'}
                                onChange={() => dispatch(setSearchType('steamId'))}
                                className="search-option"
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check
                            type="checkbox"
                            id="exactMatch"
                            label="Correspondência exata"
                            checked={exactMatch}
                            onChange={(e) => dispatch(setExactMatch(e.target.checked))}
                            disabled={searchType === 'steamId'}
                            className="exact-match-option"
                        />
                    </Form.Group>
                </div>
            </Col>
        </Row>
    );
}

export default AdvancedSearch;