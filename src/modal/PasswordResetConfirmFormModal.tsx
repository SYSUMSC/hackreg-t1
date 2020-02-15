import React, { FC, ReactElement } from 'react';
import ControlledModalFactory from './ControlledModal';
import PasswordResetConfirmForm from '../form/PasswordResetConfirmForm';

const ControlledModal = ControlledModalFactory(
  state => state.passwordResetConfirm.modalShown,
  [
    'PASSWORD_RESET_CONFIRM_SHOW_MODAL',
    'PASSWORD_RESET_CONFIRM_HIDE_MODAL',
    'PASSWORD_RESET_CONFIRM_RESET'
  ]
);

type Props = {
  passwordResetEmail: string;
  passwordResetToken: string;
  children: (showModal: () => void) => ReactElement | void;
};

const PasswordResetConfirmFormModal: FC<Props> = ({
  passwordResetEmail,
  passwordResetToken,
  children
}) => (
  <ControlledModal
    title="重置密码"
    form={
      <PasswordResetConfirmForm
        presetEmail={passwordResetEmail}
        presetToken={passwordResetToken}
      />
    }
    trigger={children}
  />
);

export default PasswordResetConfirmFormModal;
