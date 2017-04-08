import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import recycleState from 'redux-recycle';
import Perf from 'react-addons-perf';
import { Iterable } from 'immutable';
import { reducer as searchReducer, reduxSearch, SearchApi, INDEX_MODES } from 'redux-search';
import { reducer as appReducer } from './app';
import { reducer as books } from './books';
import { reducer as authReducer, actions as authActions } from './auth';
import rootSaga from './rootSaga';

const prefixSearchApi = new SearchApi({
  indexMode: INDEX_MODES.PREFIXES,
});

const searchM = reduxSearch({
  resourceIndexes: {
    books: ['author', 'title', 'description'],
  },
  searchApi: prefixSearchApi,
  resourceSelector: (resourceName, state) =>
    state[resourceName].get('data'),
});


const reducer = combineReducers(
  {
    auth: authReducer,
    search: searchReducer,
    app: recycleState(appReducer, [authActions.LOGOUT], appReducer.initialState),
    books: recycleState(books, [authActions.LOGOUT], books.initialState),
    routing: routerReducer,
  },
);

export default function configureStore(browserHistory, initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, routerMiddleware(browserHistory)];

  if (process.env.NODE_ENV !== 'production') {
    // Log Immutable state beautifully
    const logger = createLogger({
      stateTransformer: state =>
        Object.keys(state).map((key) => {
          if (Iterable.isIterable(state[key])) {
            return state[key].toJS();
          }

          return state[key];
        }),
    });

    middlewares.push(logger);

    window.Perf = Perf;
  }

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      searchM,
      window.devToolsExtension &&
        process.env.NODE_ENV !== 'production' ? window.devToolsExtension() : f => f,
    ));

  sagaMiddleware.run(rootSaga);
  return store;
}
