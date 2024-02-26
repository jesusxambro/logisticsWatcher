import React, { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import SubscriptionCard from './SubscriptionCard';
import { Subscription } from '../../types/Subscription';

interface MainHolderProps {
    setUserSubs: React.Dispatch<React.SetStateAction<Subscription[]>>;
    currentSubs: Subscription[];
}

const MainHolder= ({setUserSubs, currentSubs}:MainHolderProps) => {

//   const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const mockSubscriptions: Subscription[] = [
        { id: '1', name: 'Subscription A', description: 'Description for Subscription A' },
        { id: '2', name: 'Subscription B', description: 'Description for Subscription B' },
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