import React, { FC, useRef } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Tooltip from 'react-bootstrap/Tooltip';
import Overlay from 'react-bootstrap/Overlay';

type SubmitButtonProps = {
  submitting: boolean;
  message: string | null;
};
const SubmitButton: FC<SubmitButtonProps> = ({ submitting, message }) => {
  // FIXME: https://github.com/react-bootstrap/react-bootstrap/issues/4706
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const target = useRef<any>(null);
  return (
    <>
      <ButtonGroup>
        <Button
          variant="outline-primary"
          type="submit"
          ref={target}
          disabled={submitting}
        >
          {submitting ? <Spinner animation="border" size="sm" /> : '提交表单'}
        </Button>
      </ButtonGroup>
      <Overlay
        target={target.current!}
        show={!!message && !submitting}
        placement="bottom"
      >
        <Tooltip id="signupPageErrorMsg">{message}</Tooltip>
      </Overlay>
    </>
  );
};

export default SubmitButton;
