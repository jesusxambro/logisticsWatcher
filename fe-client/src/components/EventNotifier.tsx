import  { useState, useEffect } from 'react';
import { Box, useToast } from '@chakra-ui/react';
import { Subscription } from '../types/Subscription';
import { Event } from '../types/Event';
import EventNotification from './EventNotification';


interface EventNotifierProps {
  userSubscriptions: Subscription[];
}

const EventNotifier: React.FC<EventNotifierProps> = ({ userSubscriptions }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const toast = useToast();

  const handleEventNotificationDeletion = (idToDelete : String) => {
    event?.preventDefault();
    setEvents((events) => 
      events.filter( item => item.id !== idToDelete)
    )
  };

  const apiWs = import.meta.env.VITE_API_WS;


  useEffect(() => {
    let ws: WebSocket | null = null;

    const connectWebSocket = () => {
      ws = new WebSocket(`wss://${apiWs}:3006`);

      ws.onopen = () => {
        console.log('WebSocket connected');
        const subscriptionIds = userSubscriptions.map(sub => sub.id);
        ws!.send(JSON.stringify({ action: 'subscribe', ids: subscriptionIds }));
      };

      ws.onmessage = (event) => {
        const eventData = JSON.parse(event.data);
        setEvents(prevEvents => [...prevEvents, eventData]);
        toast({
          title: 'Incoming Event',
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
        <EventNotification event={event} 
        key={index}
        index={index} handleDelete={handleEventNotificationDeletion} />
      ))}
    </Box>
  );
};

export default EventNotifier;