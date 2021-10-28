import { TOGGLE_PORTAL, HIDE_PORTAL } from '../actions/types';

export default function portalReducer(
  state = { show: false, modal: '' },
  action
) {
  switch (action.type) {
    case TOGGLE_PORTAL:
      return {
        show: !state.show,
        ...action.payload
      };
    case HIDE_PORTAL:
      return action.payload;
    default:
      return state;
  }
}
