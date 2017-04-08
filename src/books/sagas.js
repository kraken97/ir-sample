import 'isomorphic-fetch';
import { call, put, take, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  BOOKS_REQUEST,
  booksSuccess,
  booksFailure,
  booksSetIds,
  BOOKS_QUERY,
} from './reducer';
import { fetchBooks, handleApiError } from '../apiService';

export function* fetchBooksSaga(idToken, query) {
  try {
    const books = yield call(fetchBooks, idToken, query);
    yield put(booksSuccess(books));
  } catch (error) {
    yield call(handleApiError, error, booksFailure);
  }
}
export const RECEIVE_RESULT = '@@reduxSearch/receiveResult';
export function* watchBooksRequest() {
  while (true) {
    const { idToken } = yield take(BOOKS_REQUEST);
    const query = yield select(state => state.books.get('query'));
    yield call(fetchBooksSaga, idToken, query);
  }
}

export function* watchBooksLocalSearch() {
  while (true) {
    yield take(BOOKS_QUERY);
    yield delay(200);
    const { result } = yield select(state => state.search.books);
    yield put(booksSetIds(result));
  }
}
