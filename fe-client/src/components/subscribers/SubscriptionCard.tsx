import React, { useState } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { UserSubscription } from '../../types/UserSubscription';
import { Subscription } from '../../types/Subscription';
import { isSubInUserSubs } from './MainHolder';

interface SubscriptionCardProps {
  subscription: Subscription;
  onSubscribe: (subscriptionToAdd: Subscription) => void;
  userSubscriptions: Subscription[];
  handleUnsubscribe: (subscriptionToAdd: Subscription) => void;
  isSubscribed: boolean;
}



const SubscriptionCard = ({ handleUnsubscribe,
  subscription,
  isSubscribed,
  onSubscribe,
  userSubscriptions }: SubscriptionCardProps) => {

    const colorScheme = isSubscribed? "red" : "blue";

     return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} m={2}>
      <Text fontSize="xl" fontWeight="bold">{subscription.name}</Text>
      <Text my={2}>{subscription.description}</Text>
      <Button colorScheme={colorScheme} 
      onClick={ () => onSubscribe(subscription)}
      >
        {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
      </Button>
    </Box>
  ); 
  
};

export default SubscriptionCard;