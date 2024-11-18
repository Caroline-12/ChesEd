import { Box, Button, Text, VStack, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgGradient="linear(to-r, blue.50, teal.50)"
      padding={6}
    >
      <VStack spacing={4} textAlign="center">
        <Heading as="h1" fontSize="4xl" color="red.500">
          Access Denied
        </Heading>
        <Text fontSize="lg" color="gray.700" maxW="600px">
          You do not have permission to view this page. Please check with your administrator if you believe this is an error.
        </Text>
        <Button 
          onClick={goBack} 
          colorScheme="teal" 
          variant="solid"
          size="lg"
        >
          Go Back
        </Button>
      </VStack>
    </Box>
  );
};

export default Unauthorized;
