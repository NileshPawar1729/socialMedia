import { Alert, AlertIcon, Button, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import useLogin from '../../Hooks/useLogin';

const Login = () => {

    const [input, setInput] = useState({
        email: '',
        password: ''
    });

    const { loading, error, login } = useLogin()

    return (
        <>
            <Input
                placeholder='Email'
                fontSize={14}
                type='Email'
                size={'sm'}
                value={input.email}
                onChange={(e) => setInput({ ...input, email: e.target.value })}
            />
            <Input
                placeholder='Password'
                fontSize={14}
                value={input.password}
                type='password'
                size={'sm'}
                onChange={(e) => setInput({ ...input, password: e.target.value })}
            />

            {error && (
                <Alert status='error' fontSize={13} p={2} borderRadius={4}>
                    <AlertIcon fontSize={12} />
                    {error.message}
                </Alert>
            )}

            <Button width={'full'} colorScheme='blue' size={'sm'} fontSize={14}
                isLoading={loading}
                onClick={() => login(input)}
            >
                Log in
            </Button>
        </>
    )
}

export default Login
