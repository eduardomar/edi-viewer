import React from 'react';
import { Link } from 'react-router-dom';
import { HouseDoorFill, Envelope } from 'react-bootstrap-icons';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import backgroundImage from '../../assets/images/background-not-found.png';

const NotFound: React.FC = () => {
  return (
    <Wrapper fluid>
      <ErrorTemplate>
        <h1>Oops!</h1>
        <h2>404 Not Found</h2>
        <div>Sorry, an error has occured, Requested page not found!</div>
        <ErrorActions>
          <Link to="/" className="btn btn-primary btn-lg">
            <HouseDoorFill />
            Take Me Home
          </Link>
          <Link
            to="#"
            onClick={evt => {
              window.location.href = 'mailto:lalo_ramirez1990@outlook.com';
              evt.preventDefault();
            }}
            className="btn btn-outline-dark btn-lg"
          >
            <Envelope />
            Support
          </Link>
        </ErrorActions>
      </ErrorTemplate>
    </Wrapper>
  );
};

const Wrapper = styled(Container)`
  background-image: url(${backgroundImage});
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorTemplate = styled.div`
  text-align: center;
`;

const ErrorActions = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-around;

  & > a {
    display: flex;
    align-items: center;

    & > svg {
      margin-right: 0.3rem;
    }
  }
`;

export default NotFound;
