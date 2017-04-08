import 'isomorphic-fetch';
import { put } from 'redux-saga/effects';
import { Map, List } from 'immutable';

import { actions as authActions } from './auth';
import { Book } from './books';
// import books from './books/books.json';

// eslint-disable-next-line
const getFetchInit = (idToken, requestMethod, body) => {
  const requestHeaders = new Headers();
  requestHeaders.append('Authorization', `Bearer ${idToken}`);
  requestHeaders.append('Content-Type', 'application/json');

  const fetchInit = { method: requestMethod, headers: requestHeaders };

  if (body) {
    fetchInit.body = JSON.stringify(body);
  }

  return fetchInit;
};

const mapBookToKeyValuePair = book => [book.id, new Book(book)];

// eslint-disable-next-line
export async function fetchBooks(idToken, query) {
  // This app reads data from books.json as this is just a demonstration
  // Normally an API call would be made (see below)
  // The API should check validity of idToken and return unauthorised if not valid
  // The app would then prompt the user to log in again
  // See https://github.com/jch254/serverless-node-dynamodb-api for an example

  // const response = await fetch(`${process.env.API_BASE_URI}/items`, getFetchInit(idToken, 'GET'));

  try {
    const res = await fetch(`http://localhost:3000/books?q=${query}`, getFetchInit(idToken, 'GET'));
    // console.log('books', res.json());
    const books = await res.json();
    return {
      data: new Map(books.map(mapBookToKeyValuePair)),
      ids: new List(books.map(el => el.id)),
    };
  } catch (err) {
    throw new Error(`Error occurred downstream: ${err}`);
  }
}

export function* handleApiError(error, failureAction) {
  const response = error.response;

  if (response === undefined) {
    yield put(failureAction(error.message));
  } else if (response.status === 401) {
    // Unauthorised - show login
    yield put(authActions.loginRequest());
  } else {
    const responseError = {
      status: response.status,
      statusText: response.statusText,
      message: error.message,
    };

    yield put(failureAction(responseError));
  }
}
