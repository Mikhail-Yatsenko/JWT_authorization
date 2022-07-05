import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const LoginForm: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { store } = useContext(Context);

    return (
        <div>
            <input
                name="email"
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button
                onClick={() => store.login(email, password)}
            >
                Login
            </button>
            <button
                onClick={() => store.registration(email, password)}
            >
                Registration
            </button>
        </div>
    );
};

export default observer(LoginForm);