import React from 'react';
import { Flex } from 'reflexbox';
import {
  Heading,
  Banner,
  Container,
  Section,
  SectionHeader,
  Blockquote,
} from 'rebass';

const HomePage = () => (
  <Flex column style={{ flex: '1 0 auto' }}>
    <Banner
      style={{ minHeight: '90vh', backgroundAttachment: 'scroll' }}
      backgroundImage="http://lorempixel.com/1920/1080/abstract/"
      m={0}
    >
      <Heading size={1} big>
      Web search demo
      </Heading>
      <Heading size={2}>
        React + Redux + Redux-search
      </Heading>
      <Heading size={3} pt={2}>
        <a
          href="https://github.com/kraken97/ir-demo"
          target="_blank"
          rel="noreferrer noopener"
        >
          View on Github
        </a>
      </Heading>
    </Banner>
  </Flex>
);

export default HomePage;
