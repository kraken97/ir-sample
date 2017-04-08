import { Map, fromJS, Set } from 'immutable';

export const BOOKS_REQUEST = 'BOOKS_REQUEST';
export const BOOKS_SUCCESS = 'BOOKS_SUCCESS';
export const BOOKS_FAILURE = 'BOOKS_FAILURE';
export const BOOKS_PARAMS = 'SET_BOOKS_PARAMS';
export const BOOKS_QUERY = 'SET_BOOKS_QUERY';
export const BOOKS_SET_IDS = 'BOOKS_SET_IDS';


export const initialState = new Map({
  isFetching: false,
  data: new Map(),
  ids: new Set(),
  error: null,
  query: '',
  size: 20,
  page: 0,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case BOOKS_REQUEST:
      return state.set('isFetching', true);
    case BOOKS_SUCCESS:
      return state.merge({
        isFetching: false,
        data: state.get('data').merge(action.data),
        ids: action.ids,
        error: null,
      });
    case BOOKS_FAILURE:
      return state.merge({
        isFetching: false,
        error: action.error,
      });
    case BOOKS_SET_IDS:
      return state.merge({
        ids: action.payload,
      });
    case BOOKS_PARAMS:
      return state.merge({
        page: action.payload,
      });
    case BOOKS_QUERY:
      return state.merge({
        query: action.payload,
      });
    default:
      return state;
  }
}

export const booksRequest = idToken => (
  {
    type: BOOKS_REQUEST,
    idToken,
  }
);

export const booksSuccess = payload => (
  {
    type: BOOKS_SUCCESS,
    data: payload.data,
    ids: payload.ids,
  }
);

export const booksFailure = error => (
  {
    type: BOOKS_FAILURE,
    error,
  }
);

export const booksParams = payload => (
  {
    type: BOOKS_PARAMS,
    payload,
  }
);

export const booksQuery = payload => (
  {
    type: BOOKS_QUERY,
    payload,
  }
);

export const booksSetIds = payload => (
  {
    type: BOOKS_SET_IDS,
    payload,
  }
);

