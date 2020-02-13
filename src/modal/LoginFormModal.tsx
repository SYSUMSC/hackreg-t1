import React, { FC, ReactElement, RefObject } from 'react';
import ControlledModalFactory from './ControlledModal';
import LoginForm from '../form/LoginForm';

const ControlledModal = ControlledModalFactory(
  state => state.userLogin.modalShown,
  ['USER_LOGIN_SHOW_MODAL', 'USER_LOGIN_HIDE_MODAL', 'USER_LOGIN_RESET']
);

type Props = {
  showPasswordResetRequestModal: RefObject<(() => void) | undefined>;
  children: (showModal: () => void) => ReactElement;
};

const LoginFormModal: FC<Props> = ({
  children,
  showPasswordResetRequestModal
}) => (
  <ControlledModal
    title="登录"
    form={
      <LoginForm
        showPasswordResetRequestModal={showPasswordResetRequestModal}
      />
    }
    trigger={children}
  />
);

export default LoginFormModal;
