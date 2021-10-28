import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactDom from 'react-dom';

import styled from 'styled-components';

import StripeModal from './StripeModal';

// Stripe
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function Portal(props) {
  const {
    portal: { show, modal },
    hidePortal
  } = props;
  const [initialClosingTarget, setInitialClosingTarget] = useState(null);

  useEffect(() => {
    if (show) {
      document.querySelector('body').style.overflow = 'hidden';
    } else {
      document.querySelector('body').style.overflow = 'auto';
    }
  }, [show]);
  if (!show) {
    return null;
  }

  return ReactDom.createPortal(
    <PortalContainer
      onMouseDown={e => setInitialClosingTarget(e.target)}
      onMouseUp={e => {
        if (e.target === initialClosingTarget) {
          hidePortal();
        }
      }}
    >
      {modal === 'stripe_modal' ? (
        <Elements stripe={stripePromise}>
          <StripeModal />
        </Elements>
      ) : (
        <>
          <h1>Whatashiwa Here! Modal!~</h1>
          <h1>TEST!~</h1>
          <h1>TEST!~</h1>
          <h1>TEST!~</h1>
          <h1>TEST!~</h1>
          <h1>TEST!~</h1>
          <h1>TEST!~</h1>
          <h1>TEST!~</h1>
        </>
      )}
    </PortalContainer>,
    document.getElementById('portal')
  );
}

const mapStateToProps = ({ portal }) => ({
  portal: portal
});

const mapDispatchToProps = dispatch => ({
  hidePortal: () =>
    dispatch({
      type: 'toggle_portal',
      payload: { modal: '' }
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Portal);

const PortalContainer = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  background: #0000005c;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
`;
