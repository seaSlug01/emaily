import React from 'react';
import styled from 'styled-components';

import landingWoman from '../assets/img/Optimized-pexels-pavel-danilyuk-6443353.jpg';
import googleLogo from '../assets/img/Google__G__Logo.svg.png';

import PulseButton from './PulseButton';

import { motion } from 'framer-motion';
import { pageAnimation, titleAnim, photoAnim, ballAnim } from '../animations';

function Landing() {
  return (
    <LandingContainer variants={pageAnimation} initial='hidden' animate='show'>
      <motion.div variants={ballAnim} className='ball ball-1'></motion.div>
      <motion.div variants={ballAnim} className='ball ball-2'></motion.div>
      <motion.div variants={ballAnim} className='ball ball-3'></motion.div>
      <div className='left'>
        <Title variants={titleAnim}>Emaily!</Title>
        <SubTitle variants={titleAnim}>
          Collect <strong>feedback</strong> from your users.
        </SubTitle>
        <Paragraph variants={titleAnim}>
          Use the <strong>email credits</strong> for analysis and metrics for
          your goals and gain insights directly from your customers and
          audience. <strong>Manage your canpaigns</strong> with ease!
        </Paragraph>
        <motion.div variants={titleAnim} className='cta'>
          <PulseButton as='a' href='/auth/google' classNames='login-btn round'>
            <img src={googleLogo} alt='' />
            Log in with Google
          </PulseButton>
        </motion.div>
      </div>
      <div className='right'>
        <Image>
          <motion.img
            variants={photoAnim}
            src={landingWoman}
            alt='landing page photo'
          />
        </Image>
      </div>
    </LandingContainer>
  );
}

const Paragraph = styled(motion.p)`
  margin-top: 3rem;
  color: #a75d5d;
  line-height: 1.4;
  font-size: 1.2rem;
  width: 80%;

  strong {
    color: #2971c9eb;
  }
`;

const Image = styled.div`
  flex: 1;
  border-radius: 5px;
  overflow: hidden;
  img {
    max-height: 40.5rem;
  }
`;

const LandingContainer = styled(motion.div)`
  display: flex;
  background: #dadada6e;
  min-height: 75vh;
  padding: 2rem 2rem;
  border-radius: 15px;
  position: relative;

  .ball {
    width: 9rem;
    height: 9rem;
    border-radius: 50%;
    position: absolute;
    z-index: -1;
    filter: blur(3px);

    &.ball-1 {
      background: #7878ff;
      top: -4%;
      left: -3%;
    }

    &.ball-2 {
      background: #ff58f1;

      top: 50%;
      left: 40%;
      width: 5rem;
      height: 5rem;
    }

    &.ball-3 {
      background: #ff5613;
      bottom: -5%;
      left: 16%;
      width: 6rem;
      height: 6rem;
    }
  }

  .cta {
    margin-top: 4rem;
    .login-btn {
      background: #cad8ff;
      color: #3b3b3b;
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
      font-weight: bold;
      display: inline-flex;
      align-items: center;
      box-shadow: 2px 2px 5px #808080a6, -2px -2px 5px white;

      &:active {
        box-shadow: -2px -2px 3px #80808081, 2px 2px 5px white;
      }

      &:hover {
        background: #b9caff;
      }

      img {
        height: 25px;
        width: 25px;
        margin-right: 0.5rem;
      }
    }
  }

  & > div {
    width: 50%;
  }

  .left {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;

const Title = styled(motion.h1)`
  font-size: 6rem;
  position: relative;
  left: -3px;
  color: #2f2f2f;
`;

const SubTitle = styled(motion.p)`
  font-size: 2rem;
  font-weight: 300;
  color: #a75d5d;

  strong {
    color: #2971c9eb;
  }
`;

export default Landing;
