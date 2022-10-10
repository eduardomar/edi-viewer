import React from 'react';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import EDI from '../../components/EDI';
import useClipboard from '../../hooks/useClipboard';

interface ItemRecordNotFoundProps {
  edi: string;
}

const ItemRecordNotFound: React.FC<ItemRecordNotFoundProps> = ({ edi }) => {
  const clipboardToEDI = useClipboard();

  return (
    <>
      <ListGroupItem
        ref={clipboardToEDI.target}
        action
        variant="danger"
        onClick={() => {
          clipboardToEDI.copy(edi).catch(() => {});
        }}
      >
        <EDI segment={edi} />
      </ListGroupItem>

      <clipboardToEDI.Tooltip placement="right" color="#d63343" />
    </>
  );
};

export default ItemRecordNotFound;
