import React, { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import SubscriptionCard from './SubscriptionCard';
import { Subscription } from '../../types/Subscription';
import { UserSubscription } from '../../types/UserSubscription';

interface MainHolderProps {
    setUserSubs: React.Dispatch<React.SetStateAction<UserSubscription[]>>;
    currentSubs: UserSubscription[];
}

const MainHolder= ({}:MainHolderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [userSubscriptions, setUserSubscriptions] = useState<UserSubscription|undefined>(undefined);


  useEffect(() => {
    fetch('http://localhost:3005/api/available')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setSubscriptions(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);


  return (
    <Flex direction="row" align="center" justify="center">
      {subscriptions.map(subscription => (
        <SubscriptionCard
          userSubscriptions={userSubscriptions}
          key={subscription.id}
          name={subscription.name}
          description={subscription.description}
          onSubscribe={() => {alert(`Subscribed to ${subscription.name}`)
          
        }}
        />
      ))}
    </Flex>
  );
};

export default MainHolder;