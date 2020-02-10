import { FormikProps } from 'formik';
import React, { FunctionComponent, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Overlay from 'react-bootstrap/Overlay';
import Spinner from 'react-bootstrap/Spinner';
import Tooltip from 'react-bootstrap/Tooltip';
import { FormData } from './SignupPage';

type IProps = {
  formik: FormikProps<FormData>;
  confirmed: boolean;
  onCancel: (setSubmitting: (isSubmitting: boolean) => void) => void;
  erroredAction: ErroredAction;
};

export type ErroredAction = null | {
  type: 'cancel' | 'submit';
  errorMessage: string;
};

// TODO: reflect this piece of shit with Redux
const SubmitAndCancelButton: FunctionComponent<IProps> = ({
  formik,
  confirmed,
  onCancel,
  erroredAction
}) => {
  const target = useRef<Button>(null);
  return (
    <>
      <ButtonGroup>
        {confirmed ? (
          <>
            <Button
              variant="primary"
              {...(erroredAction?.type === 'cancel' && {
                className: 'text-danger',
                ref: target as React.RefObject<any>
              })}
              disabled={formik.isSubmitting}
              onClick={() => onCancel(formik.setSubmitting)}
            >
              {formik.isSubmitting ? (
                <>
                  <Spinner animation="border" size="sm" />
                </>
              ) : (
                '取消报名'
              )}
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline-primary"
              type="submit"
              {...(erroredAction?.type === 'submit' && {
                className: 'text-danger',
                ref: target as React.RefObject<any>
              })}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <>
                  <Spinner animation="border" size="sm" />
                </>
              ) : (
                '提交表单至服务器'
              )}
            </Button>
          </>
        )}
      </ButtonGroup>
      {erroredAction ? (
        <>
          <Overlay
            target={target.current!}
            show={!!erroredAction.errorMessage}
            placement="bottom"
          >
            <Tooltip id="logoutErroredMsg">
              {erroredAction.errorMessage}
            </Tooltip>
          </Overlay>
        </>
      ) : null}
    </>
  );
};

export default SubmitAndCancelButton;
