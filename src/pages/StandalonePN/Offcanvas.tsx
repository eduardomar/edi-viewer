import React from 'react';
import OffcanvasBootstrap from 'react-bootstrap/Offcanvas';
import TableBootstrap from 'react-bootstrap/Table';
import styled from 'styled-components';
import { Element } from '../../segments';

interface OffcanvasProps {
  title: string;
  dataElement: Element | null;
  setDataElement: (dataElement: Element | null) => void;
}

const Offcanvas: React.FC<OffcanvasProps> = ({
  title,
  dataElement,
  setDataElement,
}) => {
  const handleClose = (): void => setDataElement(null);

  return (
    <OffcanvasStyled show={dataElement !== null} onHide={handleClose}>
      <OffcanvasStyled.Header closeButton>
        <OffcanvasStyled.Title>
          {title} - {dataElement?.originalName}
        </OffcanvasStyled.Title>
      </OffcanvasStyled.Header>
      <OffcanvasStyled.Body>
        <TableStyled striped bordered responsive>
          <tbody>
            <tr>
              <td>Value</td>
              <td>{dataElement?.valueFormatted}</td>
            </tr>
            <tr>
              <td>Length/Class</td>
              <td>
                {dataElement?.max}
                {dataElement?.class}
              </td>
            </tr>
            <tr>
              <td>Position</td>
              <td>
                {dataElement?.start === dataElement?.end
                  ? dataElement?.start
                  : `${dataElement?.start ?? ''}-${dataElement?.end ?? ''}`}
              </td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{dataElement?.status}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td
                dangerouslySetInnerHTML={{
                  __html: dataElement?.description ?? '',
                }}
              />
            </tr>
          </tbody>
        </TableStyled>
      </OffcanvasStyled.Body>
    </OffcanvasStyled>
  );
};

const OffcanvasStyled = styled(OffcanvasBootstrap)`
  width: 50% !important;
`;

const TableStyled = styled(TableBootstrap)`
  table-layout: fixed;

  & > tbody > tr > td:nth-child(1) {
    width: 30%;
  }
`;

export default Offcanvas;
