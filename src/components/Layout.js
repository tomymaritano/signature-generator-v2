import React from 'react';
import { Box, Flex, Heading, Text, Link, Container } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <Flex direction="column" minHeight="100vh" bg={'white'}>
      <Box as="header" bg="#fcd144" color="black" py={10}>
        <Container >
          <Flex align="center" justify="center">
            <Heading as="h1" size="lg">Gmail signature generator</Heading>
          </Flex>
        </Container>
      </Box>

      <Box as="main" bg={'gray.50'} flex="1" py={8} px={4} maxW="container.lg" mx="auto" width="100%">
        {children}
      </Box>

      <Box as="footer" bg="#fcd144" color="black" py={4} textAlign="center">
        <Text>&copy; {new Date().getFullYear()} My App. All rights reserved.</Text>
      </Box>
    </Flex>
  );
};

export default Layout;
