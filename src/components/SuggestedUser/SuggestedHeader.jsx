import { Avatar, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import useLogout from '../../Hooks/useLogout'
import useAuthStore from '../../Store/authStore';
import { Link } from 'react-router-dom';

const SuggestedHeader = () => {

  const { handleLogout, isLoggingOut } = useLogout();
  const authUser = useAuthStore((state) => state.user);

  if (!authUser) {
    // You can decide what to render or return when authUser is null
    return null; // or return a loading state or default content
  }

  return (
    <>
      <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
        <Flex alignItems={'center'} gap={2}>
          <Link to={`${authUser.username}`}>
            <Avatar name={authUser.username} size={'lg'} src={authUser.profilePicURL} />
          </Link>
          <Link to={`${authUser.username}`}>
            <Text fontSize={12} fontWeight={'bold'}>
              {authUser.username}
            </Text>
          </Link>
        </Flex>
        <Button
          size={'xs'}
          background={'transparent'}
          _hover={{ bg: 'transparent' }}
          fontSize={14}
          fontWeight={'medium'}
          color={'blue.400'}
          onClick={handleLogout}
          isLoading={isLoggingOut}
          style={{ textDecoration: 'none' }}
          cursor={'pointer'}
        >Log out</Button>
      </Flex>
    </>
  )
}

export default SuggestedHeader
