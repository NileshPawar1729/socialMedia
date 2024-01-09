import { useEffect, useState } from "react"
import useShowToast from "./useShowToast";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../Firebase/firebase";
import useUserProfileStore from "../Store/UserProfileStore";

 
 const useGetUserProfileByUsername = (username) => {
   const [isloading, setIsLoading] = useState(true);
   const showToast = useShowToast();
   const {userProfile, setUserProfile} = useUserProfileStore();

   useEffect(() => {
     const getUserProfile = async ()=>{
         setIsLoading(true);
        try {
            const q = query(collection(firestore,'users'),where('username','==', username));
            const querySnapShot = await getDocs(q);

            if(querySnapShot.empty) return setUserProfile(null);

            let userDoc;
            querySnapShot.forEach((doc)=>{
                userDoc = doc.data();
            });
            setUserProfile(userDoc); 
            console.log(userDoc)

        } catch (error) {
            showToast("Error",error.message,'error')
        }finally{
            setIsLoading(false);
        }

     }
     getUserProfile();
   }, [setUserProfile,username,showToast]);
   return {isloading, userProfile};
   
 }
 
 export default useGetUserProfileByUsername
 