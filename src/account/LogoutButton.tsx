import React, { FunctionComponent, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { LoginEmailContext } from '../App';

type LogoutHandler =
    (updateCtx: React.Dispatch<React.SetStateAction<string | null>>, toggleLoggingOut: React.Dispatch<React.SetStateAction<boolean>>, toggleErrored: React.Dispatch<React.SetStateAction<boolean>>) => void;

const handleLogout: LogoutHandler = (updateCtx, toggleLoggingOut, toggleErrored) => {
    toggleLoggingOut(true);
    toggleErrored(false);
    Promise.race<Promise<Response>>([
        new Promise((_, reject) => setTimeout(() => reject(new Error()), 8000)),
        fetch('/auth/logout', { // TODO: change it to /backend/auth
            method: 'POST',
            mode: 'same-origin',
            credentials: 'same-origin',
        }),
    ])
    .then((response) => {
        if (response.ok) {
            localStorage.clear();
            updateCtx(null);
        } else {
            throw new Error();
        }
    })
    .catch(() => {
        toggleErrored(true);
        toggleLoggingOut(false);
    });
};

const LogoutButton: FunctionComponent = () => {
    const { state, update } = React.useContext(LoginEmailContext);
    const [loggingOut, toggleLoggingOut] = useState(false);
    const [logoutErrored, toggleLogoutErrored] = useState(false);
    return (<>
        {state}，
        {loggingOut ?
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
            /> :
            <span
                className={`clickable-text${logoutErrored ? ' text-danger' : ''}`}
                onClick={() => handleLogout(update, toggleLoggingOut, toggleLogoutErrored)}
            >
                登出
            </span>
        }
    </>);
};

export default LogoutButton;
