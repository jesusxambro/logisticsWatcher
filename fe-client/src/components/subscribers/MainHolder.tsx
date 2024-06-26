import { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import SubscriptionCard from './SubscriptionCard';
import { Subscription } from '../../types/Subscription';

interface MainHolderProps {
  setUserSubscriptions: React.Dispatch<React.SetStateAction<Subscription[]>>;
    userSubscriptions: Subscription[];
}

export const isSubInUserSubs = (subscription: Subscription, userSub: Subscription[]) :boolean => {
  return userSub.some(sub => sub.id === subscription.id);

};

const MainHolder= ({userSubscriptions, setUserSubscriptions}:MainHolderProps) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;


  useEffect(() => {
    fetch(`${apiUrl}/api/available`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setSubscriptions(data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
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