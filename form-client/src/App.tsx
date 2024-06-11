
import { Container, VStack, Heading, Divider, Box, Text } from '@chakra-ui/react';
import LogisticsForm from './components/LogisticsForm'

function App() {

  return (
    <Box bg="blackAlpha.900" color="white"  minH="100vh" py="12" px="6" >
      <Container maxW="lg" bgColor="blackAlpha.900"  boxShadow="xl" p="6" rounded="md" borderWidth="1px">
        <VStack spacing={4} align="stretch">
          <Heading as="h1" size="xl" textAlign="center">FuelFlow</Heading>
          <Text  fontSize="lg" textAlign="center">
            Enter the logistics details below to dispatch a new message.
          </Text>
          <Divider />
          <LogisticsForm />
        </VStack>
      </Container>
      <Box as="footer" mt="8" textAlign="center">
        <Text fontSize="sm">© {new Date().getFullYear()} Logistics Watcher, Inc. All rights reserved.</Text>
      </Box>
    </Box>
  );
}

export default App
