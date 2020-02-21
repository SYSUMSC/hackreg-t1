import React, { useRef, FC } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Spinner from 'react-bootstrap/Spinner';
import Tooltip from 'react-bootstrap/Tooltip';
import { connect } from 'react-redux';
import { StateType } from '../redux/Store';
import { ConnectStatus } from '../redux/type/shared';
import { bindActionCreators, Dispatch } from 'redux';
import { createUserLogoutAction } from '../redux/action/connective.action';
import './EmailAndLogoutButton.css';
import fetch from 'cross-fetch';

type StateProps = {
  email: string;
  connectStatus: ConnectStatus;
};

type DispatchProps = {
  submitLogoutAction: () => void;
};

type Props = StateProps & DispatchProps;

const EmailAndLogoutButtonContent: FC<Props> = ({
  email,
  connectStatus,
  submitLogoutAction
}) => {
  const target = useRef<HTMLSpanElement>(null);
  const errorMsg =
    connectStatus.type === 'ERRORED' ? connectStatus.message : null;
  const connecting = connectStatus.type === 'CONNECTING';
  return (
    <>
      {email}，
      <span ref={target} className={`logout`} onClick={submitLogoutAction}>
        {connecting ? (
          <Spinner as="span" animation="border" size="sm" />
        ) : (
          '登出'
        )}
      </span>
      <Overlay target={target.current!} show={!!errorMsg} placement="bottom">
        <Tooltip id="logoutErroredMsg">{errorMsg}</Tooltip>
      </Overlay>
    </>
  );
};

const mapStateToProps = (state: StateType): StateProps => ({
  email: state.localData.email!,
  connectStatus: state.userLogout.connectStatus
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      submitLogoutAction: () =>
        createUserLogoutAction(
          () =>
            fetch('/backend/auth/logout', {
              method: 'POST',
              mode: 'same-origin',
              credentials: 'same-origin'
            }),
          null,
          dispatch => {
            dispatch({
              type: 'USER_LOGOUT_RESET'
            });
            dispatch({
              type: 'LOCAL_DATA_CLEAR'
            });
            window.location.reload(true);
          }
        )
    },
    dispatch
  );

const EmailAndLogoutButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailAndLogoutButtonContent);

export default EmailAndLogoutButton;
