import { createSelector } from 'reselect';
import { getSearchSelectors } from 'redux-search';

const getBooks = state => state.books.get('data');
const getIds = state => state.books.get('ids');
const getpage = state => state.books.get('page');
const getSize = state => state.books.get('size');


export const getError = state => state.books.get('error');

export const getIsFetching = state => state.books.get('isFetching');

const mapSearch = (books, ids, page, size) => ids.skip(page * size).take(size).toSeq().map(el => books.get(el));

export const getSortedBooks = createSelector(
  [getBooks, getIds, getpage, getSize],
  mapSearch,
);

const {
  result, // book ids
} = getSearchSelectors({
  resourceName: 'books',
  resourceSelector: (resourceName, state) => state.resources.get(resourceName),
});

export const getBooksLocalSearch = createSelector(
  [getBooks, result, getpage, getSize],
  mapSearch,
);
