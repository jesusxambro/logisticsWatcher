import { Box, IconButton, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Event } from '../types/Event';
import { CloseIcon } from '@chakra-ui/icons';

interface EventNotificationProps {
    event: Event;
    index: number;
    handleDelete: (idToDelete: String) => void;

}

const EventNotification = ({event, index, handleDelete} : EventNotificationProps) => {
    const bg = useColorModeValue('gray.500', 'gray.700');

    return (
    <Box key={index} p={4}
     shadow="md" 
     borderWidth="1px" 
     my={2} 
     bg={bg}
     display={"flex"}
     alignItems={"center"}
     justifyContent={"space-between"}
     borderRadius={"lg"}
     boxShadow={"md"}
     mb={2}
     >

        <Text fontSize={"medium"}
        style={{"fontWeight": "bold"}}
        >
        {event.message}

        </Text>
        <IconButton aria-label={'delete event icon'}
        icon={<CloseIcon/>}
        size={"sm"}
        onClick={()=> handleDelete(event.id)}
        backgroundColor={"transparent"}
        _hover={{backgroundColor: 'blue.600'}}
        _active={{backgroundColor: 'blue.700'}} 
        />

  </Box>
  )
}

export default EventNotification