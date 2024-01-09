import { Box, Image } from '@chakra-ui/react'
import React from 'react'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import useGetUserProfileById from '../../Hooks/useGetUserProfileById'

const FeedPost = ({post}) => {

  const {userProfile} = useGetUserProfileById(post.creastedBy);

  return (
    <>
       <PostHeader post={post} creatorProfile={userProfile}/>
       <Box my={2} borderRadius={4} overflow={'hidden'}>
          <Image src={post.imageURL} alt={'feed post'}/>
       </Box>
       <PostFooter post={post} creatorProfile={userProfile}/>
    </>
  )
}

export default FeedPost
