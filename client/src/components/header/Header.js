import React, { useEffect } from 'react';
import { Link as ReachRouterLink } from 'react-router-dom';
import { connect } from 'react-redux';

// import { AiOutlinePoweroff } from 'react-icons/ai';
import { FaAngleRight } from 'react-icons/fa';

import PulseButton from '../PulseButton';
import styled from 'styled-components';
import googleLogo from '../../assets/img/Google__G__Logo.svg.png';

function Header({ user, showPortal }) {
  useEffect(() => {}, [user]);

  const renderContent = () => {
    switch (user) {
      case null:
        return;
      case false:
        return (
          <li>
            <PulseButton as='a' href='/auth/google' classNames='login'>
              <img src={googleLogo} alt='google logo' />
              Sign in with <span className='blue'>G</span>
              <span className='red'>o</span>
              <span className='yellow'>o</span>
              <span className='blue'>g</span>
              <span className='green'>l</span>
              <span className='red'>e</span>
            </PulseButton>
          </li>
        );
      default:
        return (
          <>
            <li>
              <div className='credits'>Credits: {user.credits} </div>
            </li>
            <li>
              <PulseButton
                as='button'
                classNames='nav-item round less-padding-right'
                onClick={() => showPortal()}
              >
                Add credits{' '}
                <div className='icon'>
                  <div className='line'></div>
                  <FaAngleRight />
                </div>
              </PulseButton>
            </li>
            <li>
              <PulseButton
                as='a'
                href='/api/logout'
                classNames='black round logout'
              >
                Logout
              </PulseButton>
            </li>
          </>
        );
    }
  };

  return (
    <HeaderContainer>
      <Logo>
        <Link to={user ? '/surveys' : '/'}>Emaily</Link>
      </Logo>
      <Nav>
        <ul>{renderContent()}</ul>
      </Nav>
    </HeaderContainer>
  );
}

const mapStateToProps = ({ auth }) => ({
  user: auth
});

const mapDispatchToProps = dispatch => ({
  showPortal: () =>
    dispatch({ type: 'toggle_portal', payload: { modal: 'stripe_modal' } })
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #2971c9eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 10rem;
  box-shadow: 0 0 7px #6c6c6c;
  z-index: 10;
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    display: flex;
    align-items: center;

    li {
      margin-right: 2rem;

      .credits {
        padding: 0.5rem 1rem;
        border: thin solid #ffffff47;
        text-transform: uppercase;
        letter-spacing: 0.7px;
        font-weight: bold;
        font-size: 0.9rem;
        color: white;
        cursor: default;
        border-radius: 34px;
      }

      .nav-item {
        background: #ffffff65;
        color: #ffffffe0;
        text-transform: uppercase;
        letter-spacing: 0.7px;
        font-weight: bold;

        &:hover {
          background: #fdfdfd7b;
          color: white;
        }
      }

      .logout {
        font-weight: bold;
        letter-spacing: 0.7px;
      }

      .logout,
      .nav-item {
        font-size: 0.9rem;
      }
    }
  }
`;

const Logo = styled.div`
  font-size: 2rem;
`;

const Link = styled(ReachRouterLink)`
  color: #ececec;
`;
