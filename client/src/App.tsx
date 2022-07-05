import React, {useContext, useEffect} from 'react';
import './App.css';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";

function App() {
    const {store} = useContext(Context);

    useEffect(() => {
        if(localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, [])

    if(store.isAuth) {
        return <div>
            <div>{`User authorized ${store.user.email}`}</div>
            <button onClick={() => store.logout()}>Logout</button>
        </div>
    }

    return (
        <div>
            <h1>{!store.isAuth && 'You need to authorize.'}</h1>
            <LoginForm />
        </div>
    );
}

export default observer(App);
