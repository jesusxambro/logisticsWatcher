import { Container } from '@chakra-ui/react'
import Header from './components/Header'
import MainHolder from './components/subscribers/MainHolder'
import EventNotifier from './components/EventNotifier'
import { useState } from 'react';
import { Subscription } from './types/Subscription';



function App() {
  const [userSubscriptions, setUserSubscriptions] = useState<Subscription[]>([]);

  return (
    <>
    <Header/>
    <Container maxW="container.xl" pt={5}>
      <MainHolder setUserSubscriptions={setUserSubscriptions} userSubscriptions={userSubscriptions} />
      <EventNotifier userSubscriptions={userSubscriptions}/>
      </Container>
    </>
  )
}

export default App
