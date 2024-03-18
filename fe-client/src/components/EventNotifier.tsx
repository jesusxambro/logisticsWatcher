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

const EventNotifier: React.FC<EventNotifierProps> = ({ userSubscriptions }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const toast = useToast();

  useEffect(() => {
    let ws: WebSocket | null = null;

    const connectWebSocket = () => {
      // Adjust the URL to your WebSocket server
      ws = new WebSocket('ws://localhost:3006');

      ws.onopen = () => {
        console.log('WebSocket connected');
        // Send a message to subscribe to specific IDs, if your server supports it
        const subscriptionIds = userSubscriptions.map(sub => sub.id);
        ws!.send(JSON.stringify({ action: 'subscribe', ids: subscriptionIds }));
      };

      ws.onmessage = (event) => {
        const eventData = JSON.parse(event.data);
        setEvents(prevEvents => [...prevEvents, eventData]);
        toast({
          title: 'New Event',
          description: eventData.message,
          status: 'info',
          duration: 9000,
          isClosable: true,
        });
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        ws!.close();
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
        ws = null;
      };
    };

    if (userSubscriptions.length > 0) {
      connectWebSocket();
    }

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [userSubscriptions, toast]);

  return (
    <Box>
      {events.map((event, index) => (
        <Box key={index} p={5} shadow="md" borderWidth="1px" my={2} backgroundColor="Highlight">
          {event.message}
        </Box>
      ))}
    </Box>
  );
};

export default EventNotifier;