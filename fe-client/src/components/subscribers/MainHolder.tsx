import React, { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import SubscriptionCard from './SubscriptionCard';
import { Subscription } from '../../types/Subscription';

interface MainHolderProps {
    setUserSubs: React.Dispatch<React.SetStateAction<Subscription[]>>;
    currentSubs: Subscription[];
}

const MainHolder= ({setUserSubs, currentSubs}:MainHolderProps) => {


  useEffect(() => {
    const fetchSubscriptions = async () => {
      const mockSubscriptions: Subscription[] = [
        { id: '1', name: 'Weekly Fuel', description: 'On hand status of fuel by Week' },
        { id: '2', name: 'Daily Fuel', description: 'On hand status of fuel by Day' },
      ];
      setUserSubs(mockSubscriptions);
    };

    fetchSubscriptions();
  }, []);

  return (
    <Flex direction="row" align="center" justify="center">
      {currentSubs.map(subscription => (
        <SubscriptionCard
          key={subscription.id}
          name={subscription.name}
          description={subscription.description}
          onSubscribe={() => alert(`Subscribed to ${subscription.name}`)}
        />
      ))}
    </Flex>
  );
};

export default MainHolder;