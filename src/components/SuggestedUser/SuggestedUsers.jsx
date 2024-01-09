import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import SuggestedHeader from './SuggestedHeader'
import SuggestedUser from './SuggestedUser'
import useGetSuggestedUsers from '../../Hooks/useGetSuggestedUsers'

const SuggestedUsers = () => {
  const { isLoading, suggestedUser } = useGetSuggestedUsers();

  if (isLoading) return null;


  return (
    <>
      <VStack py={8} px={6} gap={4}>
        <SuggestedHeader />

        {suggestedUser.length !== 0 && (
          <Flex alignItems={'center'} justifyContent={'space-between'} w={'full'}>
            <Text fontSize={12} fontWeight={'bold'} color={'gray.500'}>
              Suggested for you
            </Text>
            <Text fontSize={12} fontWeight={'bold'} _hover={{ color: 'gray.400' }} cursor={'pointer'}>
              See all
            </Text>
          </Flex>
        )}

        {suggestedUser.map(user => (
          <SuggestedUser user={user} key={user.uid} />
        ))}

        <Box
          fontSize={12} color={'gray.500'} mt={5} alignSelf={'start'}
        >&copy; 2024 Built By {" "}
          <Link href='#' target='_blank' color={'blue.500'} fontSize={14}>Nilesh Pawar</Link>
        </Box>
      </VStack>
    </>
  )
}

export default SuggestedUsers
