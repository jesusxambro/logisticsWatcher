import React, { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import SubscriptionCard from './SubscriptionCard';
import { Subscription } from '../../types/Subscription';
import { UserSubscription } from '../../types/UserSubscription';

interface MainHolderProps {
  setUserSubscriptions: React.Dispatch<React.SetStateAction<Subscription[]>>;
    userSubscriptions: Subscription[];
}

export const isSubInUserSubs = (subscription: Subscription, userSub: Subscription[]) :boolean => {
  return userSub.some(sub => sub.id === subscription.id);

};

const MainHolder= ({userSubscriptions, setUserSubscriptions}:MainHolderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  // const [userSubscriptions, setUserSubscriptions] = useState<Subscription[]>([]);


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

  const handleSubscribe = (subscriptionToAdd: Subscription) => {
  
    if(isSubInUserSubs(subscriptionToAdd, userSubscriptions)){
      const filteredSubscriptions = userSubscriptions.filter(sub => sub.id !== subscriptionToAdd.id);
      setUserSubscriptions(filteredSubscriptions);
      alert(`Unsubscribed from ${subscriptionToAdd.name}`);

    }else{
      const newSubscriptions = [...userSubscriptions, subscriptionToAdd];
      setUserSubscriptions(newSubscriptions); 
      alert(`Subscribed to ${subscriptionToAdd.name}`);    }
  };

  const handleUnsubscribe = (subscriptionToAdd: Subscription) => {
    const tempArray: Subscription[] = userSubscriptions;
    tempArray.splice(tempArray.indexOf(subscriptionToAdd), 1);
    alert(`Unsubscribed from ${subscriptionToAdd.name}`);
    setUserSubscriptions(tempArray);
  };


  return (
    <Flex direction="row" align="center" justify="center">
      {subscriptions.map(subscription => (
        <SubscriptionCard
          userSubscriptions={userSubscriptions}
          key={subscription.id}
          subscription={subscription}
          handleUnsubscribe={handleUnsubscribe}
          onSubscribe={handleSubscribe}
          isSubscribed={isSubInUserSubs(subscription, userSubscriptions)}
        />
      ))}
    </Flex>
  );
};

export default MainHolder;