export type ConnectStatus =
  | {
      type: 'INITIAL';
    }
  | {
      type: 'CONNECTING';
    }
  | {
      type: 'ERRORED';
      message: string | null;
    }
  | {
      type: 'SUCCESS';
    };
