import React, { useState, useRef } from 'react';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import styled from 'styled-components';
import EDI from '../../components/EDI';

interface ItemRecordNotFoundProps {
  edi: string;
}

const ItemRecordNotFound: React.FC<ItemRecordNotFoundProps> = ({ edi }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const handleItemClick = async (): Promise<void> => {
    if (navigator?.clipboard !== undefined) {
      await navigator.clipboard.writeText(edi);
      setShow(true);
    } else {
      document.execCommand('copy', true, edi);
      setShow(true);
    }

    setTimeout(() => {
      setShow(false);
    }, 1000);
  };

  return (
    <>
      <ListGroupItem
        ref={target}
        action
        variant="danger"
        onClick={() => {
          handleItemClick().catch(() => {});
        }}
      >
        <EDI segment={edi} />
      </ListGroupItem>

      <Overlay target={target.current} show={show} placement="right">
        <TooltipStyled id="overlay-example">Copied!</TooltipStyled>
      </Overlay>
    </>
  );
};

const TooltipStyled = styled(Tooltip).attrs(() => ({ color: '#d63343' }))`
  & > div.tooltip-arrow:before {
    border-right-color: ${({ color }) => color} !important;
  }

  & > div.tooltip-inner {
    background-color: ${({ color }) => color};
  }
`;

export default ItemRecordNotFound;
