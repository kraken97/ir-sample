import React from 'react';
import _ from 'lodash';
import { InlineForm } from 'rebass';
import { connect } from 'react-redux';

class Search extends React.Component {
  change = _.debounce((value) => {
    this.props.actions.booksQuery(value);
    this.props.actions.searchBooks(value);
  }, 200)
  render() {
    const { actions, idToken } = this.props;
    return (
      <InlineForm
        buttonLabel="Search"
        label="search"
        name="search"
        onChange={e => this.change(e.target.value)}
        onClick={(e) => {
          e.preventDefault();
          actions.booksRequest(idToken);
        }}
      />
    );
  }
}

export default connect(state => ({
  value: state.books.get('query'),
}))(Search);
