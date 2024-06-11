import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Box,
  Select,
  useToast,
} from '@chakra-ui/react';

const LogisticsForm = () => {
  const [fuelUsed, setFuelUsed] = useState('');
  const [categoryId, setCategoryId] = useState('1');  
  const [unit, setUnit] = useState('');
  const [message, setMessage] = useState('');
  const toast = useToast();

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    const logisticsData = {
      fuelUsed: parseInt(fuelUsed, 10),
      categoryId: parseInt(categoryId, 10), 
      unit: unit,
      message: message
    };
    console.log('Logistics Data:', logisticsData);

    try {
      const response = await fetch('http://localhost:3005/api/available/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(logisticsData)
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log('Server Response:', responseData);
        toast({
          title: "Success",
          description: "Logistics message sent successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Failed to send logistics message:', error);
      toast({
        title: "Error",
        description: "Failed to send logistics message.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const inputStyle = { color: 'white', borderColor: 'gray.300' };

  return (
    <Box maxW="md" mx="auto" color="white">
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mb={4}>
          <FormLabel>Fuel Used</FormLabel>
          <Input {...inputStyle} type="number" value={fuelUsed} onChange={(e) => setFuelUsed(e.target.value)} />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Category</FormLabel>
          <Select {...inputStyle} value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option style={{ background: 'black', color: 'white' }} value="1">Daily</option>
            <option style={{ background: 'black', color: 'white' }} value="2">Weekly</option>
          </Select>
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Unit</FormLabel>
          <Input {...inputStyle} type="text" value={unit} onChange={(e) => setUnit(e.target.value)} />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Message</FormLabel>
          <Textarea {...inputStyle} value={message} onChange={(e) => setMessage(e.target.value)} />
        </FormControl>
        <Button colorScheme="black" variant="outline" type="submit">Send Message</Button>
      </form>
    </Box>
  );
};

export default LogisticsForm;