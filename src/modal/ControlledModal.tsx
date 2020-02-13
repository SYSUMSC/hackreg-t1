import React, { ReactElement, FC } from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { StateType } from '../redux/Store';
import { Dispatch } from 'redux';

type OwnProps = {
  title: string;
  form: ReactElement;
  trigger: (showModal: () => void) => ReactElement;
};

type StateProps = {
  show: boolean;
};

type DispatchProps = {
  showModal: () => void;
  hideModal: () => void;
  resetFormData: () => void;
};

type Props = StateProps & DispatchProps & OwnProps;

const ControlledModalContent: FC<Props> = ({
  title,
  form,
  trigger,
  show,
  showModal,
  hideModal,
  resetFormData
}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          resetFormData();
          hideModal();
        }}
        backdrop="static"
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{form}</Modal.Body>
      </Modal>
      {trigger(showModal)}
    </>
  );
};

const getMapStateToProps = (shouldShow: (state: StateType) => boolean) => (
  state: StateType,
  ownProps: OwnProps
): StateProps => ({
  show: shouldShow(state),
  ...ownProps
});

const getMapDispatchToProps = (actionTypes: [string, string, string]) => (
  dispatch: Dispatch
): DispatchProps => ({
  showModal: () => {
    dispatch({
      type: actionTypes[0]
    });
  },
  hideModal: () => {
    dispatch({
      type: actionTypes[1]
    });
  },
  resetFormData: () => {
    dispatch({
      type: actionTypes[2]
    });
  }
});

const ControlledModalFactory = (
  shouldShow: (state: StateType) => boolean,
  actionTypes: [string, string, string]
) =>
  connect(
    getMapStateToProps(shouldShow),
    getMapDispatchToProps(actionTypes)
  )(ControlledModalContent);

export default ControlledModalFactory;
