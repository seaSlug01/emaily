import React from 'react';

import { BsExclamationCircleFill } from 'react-icons/bs';
import styled from 'styled-components';

function Input({
  placeholder,
  name,
  handleChange,
  type = 'text',
  additionalClasses,
  message,
  value,
  ...rest
}) {
  return (
    <FormGroup className={`${additionalClasses}`}>
      <div className='container'>
        <InputField
          name={name}
          type={type}
          onChange={handleChange}
          value={value}
          className={message && message.type}
          {...rest}
        />
        <Label className={value.length > 0 ? 'shrink' : ''}>
          {placeholder}
        </Label>
      </div>
      {message && message.text !== '' && (
        <small className={message && message.type}>
          <div className='icon'>
            <BsExclamationCircleFill />
          </div>
          <p>{message.text}</p>
        </small>
      )}
    </FormGroup>
  );
}

export default Input;

const Label = styled.label`
  color: #3f3f3f;
  font-weight: 400;
  position: absolute;
  top: 50%;
  left: 0.3rem;
  padding: 0 0.2rem;
  transform: translateY(-50%);
  transition: all 0.2s ease;
  pointer-events: none;
  border-radius: 3px;
  background: inherit;

  &.shrink {
    transform: translateY(-180%);
    font-size: 12px;
  }
`;

const InputField = styled.input`
  width: 100%;
  height: 100%;
  padding: 0.5rem 0rem 0.5rem 0.5rem;
  border-radius: 4px;
  border: 2px solid transparent;
  box-shadow: 0 0 1px 1px rgb(212, 212, 212);
  font-size: 15px;
  transition: 0.3s ease all;

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
  }

  &:focus {
    border-color: #1a73e8;
    box-shadow: none;

    &.error + ${Label} {
      color: #d93025;
    }

    & + ${Label} {
      transform: translateY(-180%);
      font-size: 12px;
      color: #1a73e8;
    }
  }

  &.error {
    box-shadow: 0 0 1px 1px #d93025;
    transition: none;
    & ~ ${Label}.shrink {
      color: #d93025;
    }

    &:focus {
      border: 2px solid #d93025;
      box-shadow: none;
    }
  }
`;

const FormGroup = styled.div`
  width: 100%;
  font-size: 15px;

  small {
    display: flex;
    margin-top: 0.4rem;

    &.error {
      color: #d93025;
    }

    .icon {
      font-size: 0.9rem;
    }

    p {
      margin-left: 0.6rem;
    }
  }

  .container {
    position: relative;
    background: white;
  }
`;
