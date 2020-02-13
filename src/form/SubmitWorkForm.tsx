import React, { FC, useRef, RefObject } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import { StateType } from '../redux/Store';
import { createSubmitWorkAction } from '../redux/action/connective.action';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Alert from 'react-bootstrap/Alert';
import fetch from 'cross-fetch';

type StateProps = StateType['submitWork'];

type DispatchProps = {
  handleSubmit: (file: RefObject<File | undefined>) => void;
};

type Props = StateProps & DispatchProps;

const SubmitWorkFormContent: FC<Props> = ({ connectStatus, handleSubmit }) => {
  // FIXME: https://github.com/react-bootstrap/react-bootstrap/issues/4706
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const msgTarget = useRef<any>(null);
  const file = useRef<File | null>();
  const submitting = connectStatus.type === 'CONNECTING';
  const success = connectStatus.type === 'SUCCESS';
  const message =
    connectStatus.type === 'ERRORED'
      ? connectStatus.message
      : success
      ? '提交成功'
      : null;
  return (
    <Form>
      <Alert variant="info">
        只有在比赛期间才能提交作品；请将作品打包为zip压缩包再上传。
      </Alert>
      <input
        type="file"
        accept=".zip"
        disabled={submitting || success}
        onChange={e =>
          (file.current = e.target.files ? e.target.files[0] : undefined)
        }
      />
      <Button
        variant="outline-primary"
        className="float-right"
        ref={msgTarget}
        disabled={submitting || success}
        onClick={() => handleSubmit(file)}
      >
        {submitting ? (
          <Spinner as="span" animation="border" size="sm" />
        ) : (
          '提交作品'
        )}
      </Button>
      <Overlay
        show={!!message && !submitting}
        target={msgTarget.current}
        placement="top"
      >
        <Tooltip id="submitWorkFormMsg">{message}</Tooltip>
      </Overlay>
    </Form>
  );
};

const mapStateToProps = (state: StateType): StateProps => ({
  ...state.submitWork
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, {}, Action>
): DispatchProps => ({
  handleSubmit: (file: RefObject<File | undefined>) => {
    if (!file.current) {
      dispatch({
        type: 'SUBMIT_WORK_CONNECT_ERRORED',
        message: '请选择一个zip文件来上传'
      });
    } else {
      const data = new FormData();
      data.append('work', file.current);
      dispatch(
        createSubmitWorkAction(
          () =>
            fetch('/submit', {
              // TODO: change it to /backend/submit
              method: 'POST',
              mode: 'same-origin',
              credentials: 'same-origin',
              body: data
            }),
          null
        )
      );
    }
  }
});

const SubmitWorkForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitWorkFormContent);

export default SubmitWorkForm;
