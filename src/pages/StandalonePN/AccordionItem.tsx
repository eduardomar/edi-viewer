import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import TableBootstrap from 'react-bootstrap/Table';
import styled from 'styled-components';
import EDI from '../../components/EDI';
import Element from '../../interfaces/Element';
import Segment from '../../interfaces/Segment';
import Offcanvas from './Offcanvas';

interface AccordionItemProps {
  eventKey: string;
  segment: Segment;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ eventKey, segment }) => {
  const [highlight, setHighlight] = useState({ start: -1, end: -1 });
  const [dataElement, setDataElement] = useState<Element | null>(null);

  const handleMouseOver = (start: number, end: number): void => {
    if (dataElement === null) setHighlight({ start, end });
  };

  const handleMouseLeave = (): void => {
    if (dataElement === null) setHighlight({ start: -1, end: -1 });
  };

  const handleShow = (element: Element): void => setDataElement(element);

  const handleHide = (): void => {
    setHighlight({ start: -1, end: -1 });
    setDataElement(null);
  };

  if (segment.edi.length === 0 || segment.elements.length === 0) return <></>;

  return (
    <>
      <Offcanvas
        title={segment.elements[0].value}
        dataElement={dataElement}
        handleHide={handleHide}
      />

      <Accordion.Item eventKey={eventKey}>
        <Accordion.Header>
          <EDI segment={segment.edi} highlight={highlight} />
        </Accordion.Header>
        <Accordion.Body>
          <TableStyled striped bordered hover>
            <tbody>
              {segment.elements.map((element, index) => (
                <tr
                  key={index}
                  onMouseOver={() =>
                    handleMouseOver(element.start, element.end)
                  }
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleShow(element)}
                >
                  <td
                    dangerouslySetInnerHTML={{ __html: element.originalName }}
                  />
                  <td>{element.valueFormatted}</td>
                </tr>
              ))}
            </tbody>
          </TableStyled>
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
};

const TableStyled = styled(TableBootstrap)`
  table-layout: fixed;

  & > tbody > tr > td:nth-child(1) {
    width: 30%;
  }
`;

export default AccordionItem;
