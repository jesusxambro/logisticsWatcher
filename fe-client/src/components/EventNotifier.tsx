import React, { useState, useEffect } from 'react';
import { Box, useToast } from '@chakra-ui/react';
import { Subscription } from '../types/Subscription';

interface Event {
  id: string;
  message: string;
}

interface EventNotifierProps {
  userSubscriptions: Subscription[];
}

const EventNotifier = ({userSubscriptions}: EventNotifierProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  const toast = useToast();
  useEffect(() => {
    // Cleanup WebSocket connection on component unmount
    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, [webSocket]);

  

  // useEffect(() => {
  //   const newEvent: Event = { id: 'event1', message: 'New event received!' };
  //   setEvents(currentEvents => [...currentEvents, newEvent]);

  //   const timer = setTimeout(() => {
  //     setEvents(currentEvents => currentEvents.filter(event => event.id !== newEvent.id));
  //     toast({
  //       title: 'Event faded away.',
  //       description: "An event has been automatically removed after 10 seconds.",
  //       status: 'info',
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   }, 10000);

  //   return () => clearTimeout(timer); 
  // }, []); 

  return (
    <Box>
      {events.map(event => (
        <Box key={event.id} p={5} shadow="md" borderWidth="1px" my={2} backgroundColor={'Highlight'}>
          {event.message}
        </Box>
      ))}
    </Box>
  );
};

export default EventNotifier;