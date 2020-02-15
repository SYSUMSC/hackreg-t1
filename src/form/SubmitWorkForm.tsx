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
  return (
    <Form>
      <Alert variant="info">
        只有在比赛期间才能提交作品；请将作品打包为zip压缩包再上传。
      </Alert>
      <input
        type="file"
        accept=".zip"
        disabled={
          connectStatus.type === 'CONNECTING' ||
          connectStatus.type === 'SUCCESS'
        }
        onChange={e =>
          (file.current = e.target.files ? e.target.files[0] : undefined)
        }
      />
      <Button
        variant="outline-primary"
        className="float-right"
        ref={msgTarget}
        disabled={
          connectStatus.type === 'CONNECTING' ||
          connectStatus.type === 'SUCCESS'
        }
        onClick={() => handleSubmit(file)}
      >
        {connectStatus.type === 'CONNECTING' ? (
          <Spinner as="span" animation="border" size="sm" />
        ) : (
          '提交作品'
        )}
      </Button>
      <Overlay
        show={connectStatus.type === 'ERRORED'}
        target={msgTarget.current}
        placement="top"
      >
        <Tooltip id="submitWorkFormMsg">
          {connectStatus.type === 'ERRORED'
            ? connectStatus.message
            : connectStatus.type === 'SUCCESS'
            ? '提交成功'
            : null}
        </Tooltip>
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
            fetch(
              `${
                process.env.NODE_ENV === 'production' ? '/backend' : ''
              }/submit`,
              {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                body: data
              }
            ),
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
