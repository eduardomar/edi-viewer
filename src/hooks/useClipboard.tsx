import React, { useRef, useState } from 'react';
import { OverlayProps } from 'react-bootstrap';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import styled from 'styled-components';
import copyToClipboard from '../utils/copyToClipboard';

interface TooltipProps extends Omit<OverlayProps, 'children' | 'target'> {
  color?: string;
}

interface ClipboardRet {
  target: React.MutableRefObject<null>;
  copied: boolean;
  copy: (text: string) => Promise<void>;
  Tooltip: React.FC<TooltipProps>;
}

const useClipboard = (): ClipboardRet => {
  const [copied, setCopied] = useState<boolean>(false);
  const target = useRef(null);

  return {
    target,
    copied,
    copy: async (text: string): Promise<void> => {
      await copyToClipboard(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1000);
    },

    Tooltip: ({ color, ...props }: TooltipProps) => (
      <Overlay target={target.current} show={copied} {...props}>
        <TooltipStyled
          id="overlay-example"
          {...(color !== undefined ? { color } : {})}
        >
          Copied!
        </TooltipStyled>
      </Overlay>
    ),
  };
};

// .attrs(() => ({ color: '#d63343' }))
const TooltipStyled = styled(Tooltip)`
  & > div.tooltip-arrow:before {
    border-right-color: ${({ color }) => color} !important;
  }

  & > div.tooltip-inner {
    background-color: ${({ color }) => color};
  }
`;

export default useClipboard;
