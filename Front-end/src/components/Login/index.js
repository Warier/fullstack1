import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import './index.css'

function Login({ setIsLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                setIsLoggedIn(true);

            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Erro ao fazer login');
            }
        } catch (err) {
            console.error("Erro no login:", err);
            setError('Erro ao fazer login');
        }
    };

    return (
        <Container className="login-container">
            <h2 className='text-primary'>Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Usuário</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite seu usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Entrar
                </Button>
            </Form>
        </Container>
    );
}

export default Login;