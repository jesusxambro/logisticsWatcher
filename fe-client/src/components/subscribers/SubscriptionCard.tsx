import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { UserSubscription } from '../../types/UserSubscription';
import { Subscription } from '../../types/Subscription';

interface SubscriptionCardProps {
  subscription: Subscription;
  onSubscribe: () => void;
  userSubscriptions: UserSubscription|undefined;
}

const isSubInUserSubs = (subscription: Subscription, userSub: UserSubscription) :boolean => {
  return userSub.subscriptions.some(sub => sub.id === subscription.id);

};

const SubscriptionCard = ({ subscription, onSubscribe, userSubscriptions }: SubscriptionCardProps) => {
  const isDisabled = () => {
    if(isSubInUserSubs(subscription, userSubscriptions!)) {
      return true;
  }else{ return false;}};
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} m={2}>
      <Text fontSize="xl" fontWeight="bold">{subscription.name}</Text>
      <Text my={2}>{subscription.description}</Text>
      <Button colorScheme="blue" 
      disabled={isDisabled()} 
      onClick={onSubscribe}
      >Subscribe</Button>
    </Box>
  );
};

export default SubscriptionCard;