import React, { FC } from 'react';
import Spinner from 'react-bootstrap/Spinner';

type LoadingContentProps = {
  errorMsg: string | null;
};

const LoadingSpinnerContent: FC<LoadingContentProps> = ({ errorMsg }) => (
  <div className="signup-page-container spinner-container content-fit-viewport">
    <Spinner animation="grow" role="status" className="content-spinner" />
    {!errorMsg ? null : <span className="font-weight-light">{errorMsg}</span>}
  </div>
);

export default LoadingSpinnerContent;
