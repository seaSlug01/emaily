import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const getClientSecretAndUserObj = () => async dispatch => {
  const stripeResponse = await axios.post('/api/stripe', {
    amount: 500
  });

  dispatch({
    type: FETCH_USER,
    payload: {
      stripeSecretKey: stripeResponse.data.client,
      user: stripeResponse.data.user
    }
  });
};
