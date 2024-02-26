import { Flex, useColorMode, Text  } from '@chakra-ui/react'
import React from 'react'

const Header = () => {
    const {colorMode} = useColorMode();
  return (
    <Flex
      as="header"
      width="100%"
      padding="1.5rem"
      backgroundColor={colorMode === 'dark' ? 'gray.800' : 'white'}
      color={colorMode === 'dark' ? 'white' : 'gray.800'}
      justifyContent="center"
      alignItems="center"
      boxShadow="md"
    >
      <Text fontSize="xl" fontWeight="bold">
        LogisticsWatcher
      </Text>
    </Flex>
  )
}

export default Header