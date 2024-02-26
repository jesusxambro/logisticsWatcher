import React, { useState, useEffect } from 'react';
import { Box, useToast } from '@chakra-ui/react';

interface Event {
  id: string;
  message: string;
}

const EventNotifier = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const toast = useToast();

  useEffect(() => {
    const newEvent: Event = { id: 'event1', message: 'New event received!' };
    setEvents(currentEvents => [...currentEvents, newEvent]);

    const timer = setTimeout(() => {
      setEvents(currentEvents => currentEvents.filter(event => event.id !== newEvent.id));
      toast({
        title: 'Event faded away.',
        description: "An event has been automatically removed after 10 seconds.",
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
    }, 10000);

    return () => clearTimeout(timer); 
  }, []); 

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