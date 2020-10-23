import React from 'react';
import {Container, Title, Button, ButtonContainer} from './style';
import {Link} from 'react-router-dom';

const Home = () => {

    return (
        <Container>
            <Title>Game of Life</Title>


            <ButtonContainer>
                <Link to="/play">
                    <Button>Play</Button>
                </Link>

                <Link to="/about">
                    <Button>Instructions</Button>
                </Link>
            </ButtonContainer>

        </Container>
    )
}

export default Home;