import React, { useState, useCallback } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { searchGames } from '../../services/api';
import { setGames, setLoading, setError } from '../../store/gameSlice';
import { ERROR_MESSAGES, SEARCH_TYPES } from '../../utils/constants';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const { searchType, exactMatch } = useSelector(state => state.games);

    const validateInput = useCallback(() => {
        if (!searchTerm.trim()) {
            dispatch(setError(ERROR_MESSAGES.EMPTY_SEARCH));
            return false;
        }

        if (searchType === SEARCH_TYPES.STEAM_ID && !/^\d+$/.test(searchTerm)) {
            dispatch(setError(ERROR_MESSAGES.INVALID_STEAM_ID));
            return false;
        }

        return true;
    }, [searchTerm, searchType, dispatch]);

    const handleSearch = useCallback(async (e) => {
        e.preventDefault();

        if (!validateInput()) return;

        dispatch(setLoading(true));
        try {
            const params = searchType === SEARCH_TYPES.TITLE
                ? { title: searchTerm, exact: exactMatch ? 1 : 0 }
                : { steamAppID: searchTerm };

            const data = await searchGames(params);
            dispatch(setGames(data));
            dispatch(setError(null));
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }, [searchTerm, searchType, exactMatch, dispatch, validateInput]);

    return (
        <Form onSubmit={handleSearch} className="search-form mb-4">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Form.Group>
                        <Form.Control
                            type={searchType === SEARCH_TYPES.STEAM_ID ? 'number' : 'text'}
                            placeholder={searchType === SEARCH_TYPES.STEAM_ID ? 'Digite o Steam ID...' : 'Digite o nome do jogo...'}
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

export default SearchBar;