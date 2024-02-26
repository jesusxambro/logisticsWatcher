import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Flex, useColorMode, Text, useColorModeValue, Box, IconButton  } from '@chakra-ui/react'
import React from 'react'


const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const SwitchIcon = colorMode === 'light' ? MoonIcon : SunIcon;
    const bgColor = useColorModeValue('gray.100', 'gray.900');
    const textColor = useColorModeValue('black', 'white');

    return (
        <Box bg={bgColor} px={4}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <Text fontSize="xl" fontWeight="bold" color={textColor}>
              LogisticsWatcher
            </Text>
            <IconButton
              aria-label="Toggle dark mode"
              icon={<SwitchIcon />}
              onClick={toggleColorMode}
              colorScheme={useColorModeValue('purple', 'orange')}
            />
          </Flex>
        </Box>
      );
}

export default Header