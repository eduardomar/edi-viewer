import React, { ForwardedRef } from 'react';
import { Clipboard, ClipboardCheck } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';

interface ButtonClipboardProps {
  onClick: (event: React.BaseSyntheticEvent) => void;
  disabled: boolean;
}

const ButtonClipboardRef = (
  { onClick, disabled }: ButtonClipboardProps,
  ref: ForwardedRef<HTMLButtonElement>,
): JSX.Element => {
  return (
    <Button
      ref={ref}
      variant="outline-info"
      size="sm"
      onClick={onClick}
      disabled={disabled}
    >
      {!disabled ? <Clipboard /> : <ClipboardCheck />}
    </Button>
  );
};

const ButtonClipboard = React.forwardRef<
  HTMLButtonElement,
  ButtonClipboardProps
>(ButtonClipboardRef);

export default ButtonClipboard;
