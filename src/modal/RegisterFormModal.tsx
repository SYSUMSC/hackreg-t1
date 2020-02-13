import React, { FC, ReactElement } from 'react';
import ControlledModalFactory from './ControlledModal';
import RegisterForm from '../form/RegisterForm';

const ControlledModal = ControlledModalFactory(
  state => state.userRegister.modalShown,
  [
    'USER_REGISTER_SHOW_MODAL',
    'USER_REGISTER_HIDE_MODAL',
    'USER_REGISTER_RESET'
  ]
);

type Props = {
  children: (showModal: () => void) => ReactElement;
};

const RegisterFormModal: FC<Props> = ({ children }) => (
  <ControlledModal title="注册" form={<RegisterForm />} trigger={children} />
);

export default RegisterFormModal;
