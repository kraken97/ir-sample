import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Box, Flex } from 'reflexbox';
import {
  PageHeader,
  Container,
  Message,
  Card,
  HeadingLink,
  Text,
} from 'rebass';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { createSearchAction } from 'redux-search';
import Pager from './pager';

import { booksRequest, booksParams, booksQuery } from './reducer';
import { getSortedBooks, getError, getIsFetching } from './selectors';
import FullscreenLoader from '../shared-components/FullscreenLoader';
import { selectors as authSelectors } from '../auth';
import Search from './Search';

class BooksPage extends React.Component {
  shouldComponentUpdate({ books }) {
    return (!books.equals(this.props.books));
  }
  render() {
    const { isFetching, books, error, actions, idToken, total } = this.props;
    return (
      isFetching ?
        <FullscreenLoader /> :
        <Box style={{ flex: '1 0 auto' }}>
          <Container pt={4} pb={3}>
            <PageHeader my={2} py={2} description="All the books" heading="Books" />
            <Search actions={actions} idToken={idToken} />
            {
              error &&
              <Message theme="error">
                {`Error: ${JSON.stringify(error)}`}
              </Message>
            }
            <Flex align="center" justify="center" wrap gutter={2}>
              {
                books
                  .entrySeq()
                  .map(([id, book]) => (
                    <Card key={id} m={2} style={{ width: '309px', height: '150px' }} >
                      <HeadingLink level={3} href={book.get('url')} target="_blank" rel="noopener noreferrer">
                        {book.get('title')}
                      </HeadingLink>
                      <Text bold>{book.get('author')}</Text>
                      <Text small>
                        {book.get('description')}
                      </Text>
                    </Card>
                  ))
              }
            </Flex>
            <Pager setParams={actions.booksParams} total={total} />
          </Container>
        </Box>
    );
  }
}

BooksPage.propTypes = {
  total: PropTypes.any,
  idToken: PropTypes.string.isRequired,
  books: ImmutablePropTypes.map.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  actions: PropTypes.object.isRequired,
};

BooksPage.defaultProps = {
  error: null,
};


const mapStateToProps = state => (
  {
    total: state.books.get('ids').size,
    idToken: authSelectors.getIdToken(state),
    books: getSortedBooks(state),
    isFetching: getIsFetching(state),
    error: getError(state),
  }
);

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators({
      booksRequest,
      booksParams,
      booksQuery,
      searchBooks: createSearchAction('books'),
    }, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(BooksPage);
