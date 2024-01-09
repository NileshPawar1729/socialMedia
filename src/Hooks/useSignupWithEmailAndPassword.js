
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../Firebase/firebase';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import useShowToast from './useShowToast';
import useAuthStore from '../Store/authStore';

const useSignupWithEmailAndPassword = () => {

    const [createUserWithEmailAndPassword, ,loading,error,] = useCreateUserWithEmailAndPassword(auth);

    const showToast = useShowToast();

    const loginUser = useAuthStore(state=>state.login);
   
    const signup = async (input) => {

        if (!input.email || !input.password || !input.username || !input.fullName) {
           showToast("Error", 'Please fill all fields', 'error');
            return;
        }

        const usersRef = collection(firestore, 'users');
        const q = query(usersRef, where('username', '==', input.username));
        const querySnapshot = await getDocs(q);
        
        if(!querySnapshot.empty){
            showToast("Error","Username already exist", "error");
            return;
        }

        try {

            const newUser = await createUserWithEmailAndPassword(input.email, input.password);
            if (!newUser && error) {
                showToast("Error", error.message, 'error');
                return;
            }

            if (newUser) {
                const userDoc = {
                    uid: newUser.user.uid,
                    email: input.email,
                    username: input.username,
                    fullName: input.fullName,
                    bio: '',
                    profilePicURL: '',
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now()
                }
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
                localStorage.setItem('user-info', JSON.stringify(userDoc));
                loginUser(userDoc);
            }

        } catch (error) {
            showToast("Error", error.message, 'error');
        }
    }

    return { loading, error, signup }
}

export default useSignupWithEmailAndPassword
