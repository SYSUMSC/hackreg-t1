import React, { FC, ReactElement } from 'react';
import ControlledModalFactory from './ControlledModal';
import PasswordResetRequestForm from '../form/PasswordResetRequestForm';

const ControlledModal = ControlledModalFactory(
  state => state.passwordResetRequest.modalShown,
  [
    'PASSWORD_RESET_REQUEST_SHOW_MODAL',
    'PASSWORD_RESET_REQUEST_HIDE_MODAL',
    'PASSWORD_RESET_REQUEST_RESET'
  ]
);

type Props = {
  children: (showModal: () => void) => ReactElement | void;
};

const PasswordResetRequestFormModal: FC<Props> = ({ children }) => (
  <ControlledModal
    title="重置密码"
    form={<PasswordResetRequestForm />}
    trigger={children}
  />
);

export default PasswordResetRequestFormModal;
