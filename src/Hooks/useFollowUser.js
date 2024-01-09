import { useEffect, useState } from "react"
import useAuthStore from "../Store/authStore";
import useUserProfileStore from "../Store/UserProfileStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../Firebase/firebase";

const useFollowUser = (userId) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const authuser = useAuthStore((state)=>state.user);
    const setAuthUser = useAuthStore((state)=>state.setUser);
    const { userProfile, setUserProfile } = useUserProfileStore();
    const showToast = useShowToast();

    const handleFollowUser = async () => {
        setIsUpdating(true);
        try {
            const currentUserRef = doc(firestore, 'users', authuser.uid);
            const userToFollowOrUnFollowRef = doc(firestore, 'users', userId);

            await updateDoc(currentUserRef, {
                following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
            })

            await updateDoc(userToFollowOrUnFollowRef, {
                followers: isFollowing ? arrayRemove(authuser.uid) : arrayUnion(authuser.uid)
            })

            if (isFollowing) {
                //unfollow
                setAuthUser({
                    ...authuser,
                    following: authuser.following.filter((uid) => uid !== userId)
                })
                if(userProfile) 
                setUserProfile({
                    ...userProfile,
                    followers: userProfile.followers.filter((uid) => uid !== authuser.uid)
                })
                localStorage.setItem('user-info', JSON.stringify({
                    ...authuser,
                    following: authuser.following.filter((uid) => uid !== userId)
                }))
                setIsFollowing(false);
            }
            else {
                //follow
                setAuthUser({
                    ...authuser,
                    following:[...authuser.following, userId]
                })
                if(userProfile)
                setUserProfile({
                    ...userProfile,
                    followers:[...userProfile.followers, authuser.uid]
                })
                localStorage.setItem("user-info", JSON.stringify({
                    ...authuser,
                    following:[...authuser.following, userId]
                }))
                setIsFollowing(true);
            }

        } catch (error) {
            showToast("Error",error.message,'error')
        } finally {
            setIsUpdating(false);
        }
    }

    useEffect(() => {
        if (authuser) {
            const isFollowing = authuser.following.includes(userId);
            setIsFollowing(isFollowing);
        }
    }, [authuser, userId])

    return { isUpdating, isFollowing, handleFollowUser }
}

export default useFollowUser
