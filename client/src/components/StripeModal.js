import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import axios from 'axios';
import Input from './Input';
import PulseButton from './PulseButton';

import styled from 'styled-components';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { BsExclamationCircleFill } from 'react-icons/bs';
const CardElementOptions = {
  style: {
    base: {
      fontSize: '15px',
      color: '#000',
      '::placeholder': {
        color: '#3f3f3f'
      }
    },
    invalid: {
      color: '#000'
    }
  },
  hidePostalCode: true
};

function StripeModal(props) {
  // stripe related
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setProcessing] = useState(false);

  const [stripeOnFocus, setStripeOnFocus] = useState(false);
  const [stripeDetails, setStripeDetails] = useState({
    complete: false,
    empty: true,
    error: false,
    errorMsg: ''
  });

  // other fields
  const [inputFields, setInputFields] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [message, setMessage] = useState({
    firstName: { type: '', text: '' },
    lastName: { type: '', text: '' },
    email: { type: '', text: '' }
  });

  const handleChange = e => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    setMessage({ ...message, [e.target.name]: { type: '', text: '' } });
  };

  const validateEmail = e => {
    const { value, name } = e.target;

    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    console.log(e.target.value);
    if (!re.test(String(e.target.value).toLowerCase())) {
      setMessage({
        ...message,
        [name]: { type: 'error', text: 'This email is not in valid format.' }
      });
    } else {
      setMessage({
        ...message,
        [name]: { type: '', text: '' }
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { email } = inputFields;

    const billingDetails = {
      email: email
    };

    setProcessing(true);

    const { data } = await axios.post('/api/stripe', {
      amount: 500
    });

    const cardElement = elements.getElement(CardElement);

    const paymentMethodReq = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: billingDetails
    });

    const confirmCardPayment = await stripe.confirmCardPayment(data.client, {
      payment_method: paymentMethodReq.paymentMethod.id
    });

    // I call this so the user credits in the header update
    props.fetchUser();
    setProcessing(false);
  };
  return (
    <Container onMouseDown={e => e.stopPropagation()}>
      <Header>
        <h1>Emaily</h1>
        <h3>
          <strong>€5</strong> for 5 email credits
        </h3>
      </Header>
      <Body>
        <Form onSubmit={handleSubmit}>
          {/* <h2>Personal Details</h2> */}
          {/* <div className='input-group'>
            <Input
              handleChange={handleChange}
              placeholder='First name'
              name='firstName'
              additionalClasses='form-group'
              value={inputFields.firstName}
            />
            <Input
              handleChange={handleChange}
              placeholder='Last name'
              name='lastName'
              additionalClasses='form-group'
              value={inputFields.lastName}
            />
          </div> */}
          <h2>Payment Details</h2>
          <Input
            handleChange={handleChange}
            onBlur={e => {
              if (e.target.value === '') {
                setMessage({
                  ...message,
                  [e.target.name]: {
                    type: 'error',
                    text: 'This field is required.'
                  }
                });
              } else {
                validateEmail(e);
              }
            }}
            type='email'
            placeholder='Verify your email'
            name='email'
            additionalClasses='form-group'
            value={inputFields.email}
            message={message.email}
          />

          <CardElementContainer
            className={`stripeCard-Container ${stripeOnFocus ? 'focus' : ''} ${
              stripeDetails.error ? 'error' : ''
            }`}
          >
            <CardElement
              options={CardElementOptions}
              onChange={e => {
                const { error } = e;

                setStripeDetails({
                  ...stripeDetails,
                  empty: e.empty,
                  complete: e.complete,
                  error: Boolean(error),
                  errorMsg: error?.message || ''
                });
              }}
              onFocus={() => setStripeOnFocus(true)}
              onBlur={() => {
                setStripeOnFocus(false);
              }}
            />
          </CardElementContainer>
          {stripeDetails.errorMsg && (
            <small className='stripe-error'>
              <div className='icon'>
                <BsExclamationCircleFill />
              </div>
              <p>{stripeDetails.errorMsg || <span>Lorem Ipsum</span>}</p>
            </small>
          )}
          <div className='buttonCont'>
            <PulseButton
              as='button'
              classNames='pulsie black'
              disabled={
                !stripeDetails.complete ||
                message.email.type === 'error' ||
                isProcessing
              }
            >
              {isProcessing ? 'Processing...' : 'PAY €5'}
            </PulseButton>
          </div>
        </Form>
      </Body>
    </Container>
  );
}

export default connect(null, actions)(StripeModal);

const CardElementContainer = styled.div`
  border: 2px solid transparent;
  box-shadow: 0 0 1px 1px rgb(212, 212, 212);
  border-radius: 5px;
  padding: 0.5rem 0rem 0.5rem 0.5rem;
  transition: 0.3s all ease;

  &.focus {
    border-color: #1a73e8;
    box-shadow: none;

    &.error {
      border-color: #d93025;
      box-shadow: none;
    }
  }

  &.error {
    box-shadow: 0 0 1px 1px #d93025;
    transition: none;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  .buttonCont {
    margin-top: 3.5rem;
    display: flex;
    justify-content: center;
    width: 100%;

    .pulsie {
      padding: 1rem 1.5rem;
      border: 1px solid black;
      border-radius: 5px;
      width: 75%;
      background: blue;
      color: #ffffff;
      font-weight: bold;
      font-size: 1.1rem;
      border: none;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      span {
        color: #89ff01;
      }
    }
  }

  .stripe-error {
    display: flex;
    margin-top: 0.4rem;
    color: #d93025;

    .icon {
      font-size: 0.9rem;
    }

    p {
      margin-left: 0.6rem;
    }
  }

  h2 {
    margin-bottom: 1.5rem;
  }

  .input-group {
    display: flex;
    justify-content: space-between;
    .form-group {
      width: 48%;
    }
  }

  .form-group {
    margin-bottom: 2rem;
  }
`;

const Header = styled.div`
  height: 160px;
  width: 100%;
  background: #00009eb9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    color: white;
  }

  h3 {
    margin-top: 0.5rem;
    font-weight: 300;
    color: #cccccc;

    strong {
      color: #72ff1e;
    }
  }
`;

const Body = styled.div`
  height: 100%;
  padding: 3rem 2.5rem;
  position: relative;
  background: white;
`;

const Container = styled.div`
  min-height: 62vh;
  max-width: 32rem;
  min-width: 28rem;
  height: 50%;
  width: 45vw;
  margin-top: 5rem;
  border-radius: 10px;
  overflow: hidden;
`;
