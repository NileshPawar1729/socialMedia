import { Box, Container, Flex, Skeleton, SkeletonCircle, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import FeedPost from './FeedPost'
import useGetFeedPost from '../../Hooks/useGetFeedPost'

const FeedPosts = () => {

  const {isLoading,posts} = useGetFeedPost();

  return (
    <Container maxW={'container.sm'} py={10} px={2}>
      {isLoading && [0,1,2].map((_, idx) => (
        <VStack key={idx} gap={4} alignItems={'flex-start'} mb={10}>
          <Flex gap={2}>
            <SkeletonCircle size={10} />
            <VStack gap={2} alignItems={'flex-start'}>
              <Skeleton height={'10px'} width={'200px'} />
              <Skeleton height={'10px'} width={'200px'} />
            </VStack>
          </Flex>
          <Skeleton w={'full'}>
            <Box h={'400px'}></Box>
          </Skeleton>
        </VStack>
      ))}
      {!isLoading && posts.length>0 &&  posts.map((post)=> <FeedPost key={post.id} post={post}/>)}
      {!isLoading && posts.length === 0 && (
        <>
          <Text fontSize={'medium'} color={'red.400'}>
            Looks like you don&apos;t have any friends.
          </Text>
          <Text color={'red.400'}>Stoping coding and make some!!</Text>
        </>
      )}
    </Container>
  )
}

export default FeedPosts
