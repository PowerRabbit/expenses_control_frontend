import React, { FormEvent, useState } from 'react';

import { EcAPI } from '../services/api.service';
import { EcError } from '../services/error.service';


//SETTINGS.SERVER_URL

export function EcAuth() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function sendCredentials(e: FormEvent<HTMLFormElement>) {
        (e as unknown as Event).stopPropagation();
        (e as unknown as Event).preventDefault();

        //EcAPI.logIn()
        if (username && password) {
            EcAPI.logIn(username, password).then((response) => {
                console.log(response);
            });
        } else {
            EcError.showError('Please enter username and password!');
        }
    }

    return (
        <div>

            <form onSubmit={sendCredentials}>
                <input type="text" placeholder="Username" value={username} onChange={e => setUsername((e.target as any).value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword((e.target as any).value)} />
                <button type="submit">Log In</button>
            </form>

        </div>
    );
}
