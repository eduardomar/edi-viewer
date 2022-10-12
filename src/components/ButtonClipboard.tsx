import React, { ForwardedRef } from 'react';
import { Clipboard, ClipboardCheck } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

interface ButtonClipboardProps {
  onClick: (event: React.BaseSyntheticEvent) => void;
  disabled: boolean;
}

const ButtonClipboardRef = (
  { onClick, disabled }: ButtonClipboardProps,
  ref: ForwardedRef<HTMLButtonElement>,
): JSX.Element => {
  return (
    <ButtonStyled
      ref={ref}
      variant="outline-info"
      size="sm"
      onClick={onClick}
      disabled={disabled}
    >
      {!disabled ? <Clipboard /> : <ClipboardCheck />}
    </ButtonStyled>
  );
};

const ButtonStyled = styled(Button)`
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonClipboard = React.forwardRef<
  HTMLButtonElement,
  ButtonClipboardProps
>(ButtonClipboardRef);

export default ButtonClipboard;
