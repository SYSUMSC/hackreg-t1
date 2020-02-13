import React, { FC, ReactElement } from 'react';
import ControlledModalFactory from './ControlledModal';
import SubmitWorkForm from '../form/SubmitWorkForm';

const ControlledModal = ControlledModalFactory(
  state => state.submitWork.modalShown,
  ['SUBMIT_WORK_SHOW_MODAL', 'SUBMIT_WORK_HIDE_MODAL', 'SUBMIT_WORK_RESET']
);

type Props = {
  children: (showModal: () => void) => ReactElement;
};

const SubmitWorkFormModal: FC<Props> = ({ children }) => (
  <ControlledModal
    title="提交作品"
    form={<SubmitWorkForm />}
    trigger={children}
  />
);

export default SubmitWorkFormModal;
