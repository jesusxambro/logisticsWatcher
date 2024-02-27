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
    let ws: WebSocket | null = null;

    const connectWebSocket = () => {
      // Assuming the WebSocket server URL is 'ws://example.com/ws'
      // Adjust the URL as needed, possibly including subscription IDs in the query string if your server supports it
      ws = new WebSocket('ws://example.com/ws');

      ws.onopen = () => {
        // Send subscription IDs to the server after establishing the connection
        // This assumes the server accepts JSON with a specific format
        const subscriptionIds = userSubscriptions.map(sub => sub.id);
        ws!.send(JSON.stringify({ action: 'subscribe', ids: subscriptionIds }));
      };

      ws.onmessage = (event) => {
        // Assuming server sends JSON data
        const eventData = JSON.parse(event.data);
        setEvents(prevEvents => [...prevEvents, eventData]);
        // Optionally use toast for real-time notifications
        toast({
          title: eventData.message,
          status: 'info',
          duration: 10000,
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

    connectWebSocket();

    // Cleanup WebSocket connection on component unmount
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [userSubscriptions, toast]);

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