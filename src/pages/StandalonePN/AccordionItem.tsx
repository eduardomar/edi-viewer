import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import EDI from '../../components/EDI';
import { Element, Segment } from '../../utils/ediToObject';
import Offcanvas from './Offcanvas';

interface AccordionItemProps {
  eventKey: string;
  segment: Segment;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ eventKey, segment }) => {
  const [highlight, setHighlight] = useState({ start: -1, end: -1 });
  const [dataElement, setDataElement] = useState<Element | null>(null);

  const handleMouseOver = (start: number, end: number): void =>
    setHighlight({ start, end });
  const handleMouseLeave = (): void => setHighlight({ start: -1, end: -1 });

  const handleShow = (element: Element): void => setDataElement(element);

  if (segment?.edi?.length === 0 || segment?.elements?.length === 0)
    return <></>;

  return (
    <>
      <Offcanvas
        title={segment?.elements[0].value ?? ''}
        dataElement={dataElement}
        setDataElement={setDataElement}
      />
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Header>
          <EDI segment={segment.edi} highlight={highlight} />
        </Accordion.Header>
        <Accordion.Body>
          <Table striped bordered hover>
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
                  <td dangerouslySetInnerHTML={{ __html: element.name }} />
                  <td>{element.value}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
};

export default AccordionItem;
