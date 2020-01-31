import React, { FunctionComponent, useRef, useState } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Spinner from 'react-bootstrap/Spinner';
import Tooltip from 'react-bootstrap/Tooltip';
import { LoginEmailContext } from '../App';

type LogoutHandler =
    (updateCtx: React.Dispatch<React.SetStateAction<string | null>>, toggleLoggingOut: React.Dispatch<React.SetStateAction<boolean>>, updateErroredMsg: React.Dispatch<React.SetStateAction<string | null>>) => void;

const handleLogout: LogoutHandler = (updateCtx, toggleLoggingOut, updateErroredMsg) => {
    updateErroredMsg(null);
    toggleLoggingOut(true);
    Promise.race<Promise<Response>>([
        new Promise((_, reject) => setTimeout(() => reject(new Error('请求超时，请重试')), 8000)),
        fetch('/auth/logout', { // TODO: change it to /backend/auth
            method: 'POST',
            mode: 'same-origin',
            credentials: 'same-origin',
        }),
    ]).then((response) => {
        if (response.ok) {
            localStorage.clear();
            updateCtx(null);
            window.location.reload(true);
            return null;
        } else {
            return response.json();
        }
    }).then((data) => {
        if (data?.message) {
            throw new Error(data.message);
        }
    }).catch((error) => {
        toggleLoggingOut(false);
        updateErroredMsg(error.message);
    });
};

const LogoutButton: FunctionComponent = () => {
    const { state, update } = React.useContext(LoginEmailContext);
    const [loggingOut, toggleLoggingOut] = useState(false);
    const [erroredMsg, updateErroredMsg] = useState<string | null>(null);
    const target = useRef<HTMLSpanElement>();
    return (<>
        {state}，
        {loggingOut ? (<>
            <Spinner
                as="span"
                animation="border"
                size="sm"
            />
        </>) : (<>
            <span
                ref={target as React.RefObject<any>}
                className={`clickable-text${erroredMsg ? ' text-danger' : ''}`}
                onClick={() => handleLogout(update, toggleLoggingOut, updateErroredMsg)}
            >
                登出
            </span>
            <Overlay target={target.current!} show={!!erroredMsg} placement="bottom">
                <Tooltip id="logoutErroredMsg">
                    {erroredMsg}
                </Tooltip>
            </Overlay>
        </>)}
    </>);
};

export default LogoutButton;
