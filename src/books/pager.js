import React from 'react';
import {
  Button,
} from 'rebass';
import { Flex, Box } from 'reflexbox';
import functional from 'react-functional';

class pager extends React.Component {
  state = {
    page: 0,
  }
  updateparams = (i) => {
    if (i < 0) {
      return;
    }
    this.setState({
      page: i,
    });
    this.props.setParams(i);
  }

  render() {
    const { total } = this.props;
    return (
      <Flex p={2} align="center">
        <Box px={5}>
          <Button
            backgroundColor="primary"
            color="white"
            onClick={() => {
              this.updateparams(this.state.page - 1);
            }}
            inverted
            rounded
          >
            prev
    </Button>
        </Box>
        <Box px={1}>
          {this.state.page + 1}/{total / 20}
        </Box>
        <Box px={2} flexAuto>
          <Button
            onClick={() => {
              this.updateparams(this.state.page + 1);
            }}
            backgroundColor="primary"
            color="white"
            inverted
            rounded
          >
            next
    </Button>
        </Box>
      </Flex>
    );
  }
}

export default pager;
