import React, { useEffect, useContext } from 'react';
import backendurl from '../../config';

import { AuthContext } from '../../context/auth-context';

const SignInButton = () => {
    const auth = useContext(AuthContext);

    const handleLogin = () => {
        const popupWindow = window.open(
            `${backendurl}/auth`,
            '_blank',
            'width=800, height=600'
        );
        if (window.focus) popupWindow.focus();
        console.log('and what next?');
        console.log({ auth });
    };

    useEffect(() => {
        window.addEventListener('message', (event) => {
            if (event.origin !== `${backendurl}`) return;

            const { token, ok, username, id } = event.data;
            console.log({ token, ok, username, id });

            if (ok) {
                localStorage.setItem(
                    'userData',
                    JSON.stringify({
                        userId: id,
                        token,
                        username,
                    })
                );
                auth.login(token, id);
            }
        });
    }, [auth]);

    return <div id="steamlogin" onClick={handleLogin}></div>;
};

export default SignInButton;
