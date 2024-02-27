import { Container } from '@chakra-ui/react'
import Header from './components/Header'
import MainHolder from './components/subscribers/MainHolder'
import EventNotifier from './components/EventNotifier'
import { useState } from 'react';
import { UserSubscription } from './types/UserSubscription';



function App() {
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);

  return (
    <>
    <Header/>
    <Container maxW="container.xl" pt={5}>
      <MainHolder setUserSubs={setSubscriptions} currentSubs={subscriptions} />
      <EventNotifier/>
      </Container>
    </>
  )
}

export default App
