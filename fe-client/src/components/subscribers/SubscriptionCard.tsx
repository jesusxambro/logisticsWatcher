import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';

interface SubscriptionCardProps {
  name: string;
  description: string;
  onSubscribe: () => void;
}

const SubscriptionCard = ({ name, description, onSubscribe }: SubscriptionCardProps) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} m={2}>
      <Text fontSize="xl" fontWeight="bold">{name}</Text>
      <Text my={2}>{description}</Text>
      <Button colorScheme="blue" onClick={onSubscribe}>Subscribe</Button>
    </Box>
  );
};

export default SubscriptionCard;