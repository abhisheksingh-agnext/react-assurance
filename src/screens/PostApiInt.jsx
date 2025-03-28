import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Box, Heading, SimpleGrid, Text, Center, Spinner } from "@chakra-ui/react";
import { fetchPosts } from "../redux/slices/post";

export default function PostApiInt() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const isLoading = useSelector((state) => state.post.isLoading);
  const isSuccess = useSelector((state) => state.post.isSuccess);

  useEffect(() => {
    dispatch(fetchPosts());  
  }, [dispatch]);

  return (
    <Box p={5} bg="gray.100" minHeight="100vh">
      <Heading as="h1" size="xl" textAlign="center" color="blue.500" mb={5}>
        Posts
      </Heading>
      {isLoading ? (
        <Center>
          <Spinner size="xl" color="blue.500" />
        </Center>
      ) : isSuccess ? (
        <SimpleGrid columns={[1, 2, 3]} spacing={10}>
          {posts.map((post) => (
            <Box
              key={post.id}
              p={5}
              bg="white"
              borderRadius="md"
              boxShadow="md"
              borderWidth="1px"
              transition="transform 0.2s"
              _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
            >
              <Heading as="h2" size="md" color="blue.500" mb={2}>
                {post.title}
              </Heading>
              <Text>{post.body}</Text>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Center>
          <Text color="red.500">Failed to load posts. Please try again.</Text>
        </Center>
      )}
    </Box>
  );
}