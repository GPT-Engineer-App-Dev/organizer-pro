import { Box, VStack, Heading, Input, IconButton, useColorMode, Flex, Button, Text, useColorModeValue, HStack, Spacer } from '@chakra-ui/react';
import { FaSun, FaMoon, FaTrash, FaPlus } from 'react-icons/fa';
import { useState } from 'react';

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input === '') return;
    const newTask = { id: Date.now(), text: input, isCompleted: false };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Box bg={bgColor} color={textColor} minHeight="100vh" p={5}>
      <Flex justifyContent="space-between" mb={5}>
        <Heading>Todo App</Heading>
        <IconButton icon={colorMode === 'light' ? <FaMoon /> : <FaSun />} isRound='true' size='lg' alignSelf='flex-end' onClick={toggleColorMode} />
      </Flex>
      <VStack spacing={4}>
        <HStack w="100%">
          <Input placeholder="Add a task..." value={input} onChange={(e) => setInput(e.target.value)} />
          <IconButton icon={<FaPlus />} isRound='true' onClick={handleAddTask} />
        </HStack>
        {tasks.map(task => (
          <HStack key={task.id} w="100%" p={4} bg={task.isCompleted ? 'green.200' : 'gray.200'} borderRadius="lg">
            <Text as={task.isCompleted ? 's' : ''}>{task.text}</Text>
            <Spacer />
            <IconButton icon={<FaTrash />} isRound='true' onClick={() => handleDeleteTask(task.id)} />
            <Button onClick={() => handleToggleTask(task.id)}>{task.isCompleted ? 'Undo' : 'Complete'}</Button>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default Index;