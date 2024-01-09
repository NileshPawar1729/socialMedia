
import useShowToast from './useShowToast'
import { auth, firestore } from '../Firebase/firebase';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import useAuthStore from '../Store/authStore';
import { useState } from 'react';

const useLogin = () => {
 const showToast = useShowToast();
 const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, , loading, error,] = useSignInWithEmailAndPassword(auth);

  const loginUser = useAuthStore((state)=>state.login);

  const login = async (input)=>{
    if(!input.email || !input.password){
        return showToast("Error", "Please fill all the fields", 'error')
    }
    try {
        const userCred = await signInWithEmailAndPassword(input.email, input.password);

        if(userCred){
            const docRef = doc(firestore, 'users', userCred.user.uid);
            const docSnap = await getDoc(docRef); 
            localStorage.setItem('user-info', JSON.stringify(docSnap.data()));
            loginUser(docSnap.data());
        }

    } catch (error) {
        showToast("Error", error.message, 'error')
    }
  }

  return {loading, error, login};

}

export default useLogin
