import React, { useState } from 'react';
import { Link as ReachRouterLink } from 'react-router-dom';
import styled from 'styled-components';

function PulseButton({ children, classNames = '', ...restProps }) {
  const [shadow, setShadow] = useState({
    clicks: 0,
    visible: false,
    top: 30,
    left: 10
  });

  const { clicks, visible, left, top } = shadow;

  const shadows = () => {
    const shadowsArr = [];
    for (let i = 0; i < clicks; i++) {
      shadowsArr.push(
        <Shadow
          top={top}
          left={left}
          key={i}
          onAnimationEnd={() => {
            if (i === clicks - 1) {
              setShadow({ ...shadow, clicks: 0 });
            }
          }}
        />
      );
    }

    return shadowsArr;
  };

  return (
    <PulseButtonContainer
      onMouseDown={e => {
        const rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        setShadow({
          ...shadow,
          visible: false,
          top: x,
          left: y
        });
      }}
      onMouseUp={() => {
        setShadow({
          ...shadow,
          visible: true,
          clicks: clicks + 1
        });
      }}
      left={left}
      top={top}
      className={`${visible ? 'clicked' : ''} ${classNames && classNames}`}
      {...restProps}
    >
      <div className='inner'>{children}</div>
      {shadows()}
    </PulseButtonContainer>
  );
}

export default PulseButton;

const Shadow = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  /* background: #6262622f; */
  background: #4d4d4d84;
  z-index: 10;
  pointer-events: none;
  animation: clicked 1s forwards ease;

  @keyframes clicked {
    0% {
      opacity: 1;
      clip-path: ${({ left, top }) => `circle(0px at ${top}px ${left}px)`};
    }
    100% {
      opacity: 0;
      clip-path: ${({ left, top }) => `circle(100% at ${top}px ${left}px)`};
    }
  }
`;

const PulseButtonContainer = styled(ReachRouterLink)`
  padding: 0.5rem 1rem;
  color: #0c0c0c;
  background: #eeeeee;
  border-radius: 7px;
  transition: all 0.3s ease;
  letter-spacing: 0.2px;
  position: relative;
  display: block;
  overflow: hidden;
  cursor: pointer;

  &.round {
    border-radius: 48px;
  }

  &.less-padding-right {
    padding-right: 0.3rem;
  }

  &.black {
    background: #00000066;
    color: #ffffffcf;

    ${Shadow} {
      background: #c7c7c784;
    }

    &:hover {
      background: #00000066;
    }
  }

  &:active {
    transform: translate(1px, 2px);
  }

  .inner {
    z-index: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    width: 100%;
    height: 100%;

    .icon {
      margin-left: 0.3rem;
      position: relative;
      display: flex;

      .line {
        width: 0px;
        height: 2px;
        position: absolute;
        top: 50%;
        left: 3px;
        transform: translateY(-50%);
        border-radius: 20px;
        background: white;
      }

      svg {
        position: relative;
        width: 1rem;
        height: 1rem;
        transition: 0.3s transform ease;
      }
    }

    span:first-of-type {
      margin-left: 0.3em;
    }

    img {
      width: 1.2rem;
      height: 1.2rem;
      margin-right: 7px;
    }

    svg {
      width: 1.2rem;
      height: 1.2rem;
      margin-right: 4px;
    }
  }

  span {
    transition: color 0.2s ease;
  }

  &:hover {
    background: #eeeeee;

    .icon {
      .line {
        width: 8px;
      }

      svg {
        transform: translateX(3px);
      }
    }
    span {
      &.blue {
        color: #357ae8;
        text-shadow: 0 0 1px #357ae8;
      }

      &.red {
        color: red;
        text-shadow: 0 0 1px red;
      }

      &.yellow {
        color: rgb(255, 145, 0);
        text-shadow: 0 0 1px rgb(255, 145, 0);
      }

      &.green {
        color: rgb(0, 138, 0);
        text-shadow: 0 0 1px rgb(0, 138, 0);
      }
    }
  }
`;
