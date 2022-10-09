import React, { SyntheticEvent, useMemo, useRef, useState } from 'react';
import { Alert, Overlay, Tooltip } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import OffcanvasBootstrap from 'react-bootstrap/Offcanvas';
import TableBootstrap from 'react-bootstrap/Table';
import styled from 'styled-components';
import EDI from '../../components/EDI';
import Element from '../../interfaces/Element';
import copyToClipboard from '../../utils/copyToClipboard';
import writeSegmentEdi from '../../utils/writeSegmentEdi';

export interface OffcanvasProps {
  title: string;
  dataElement: Element;
  handleHide: () => void;
}

const Offcanvas: React.FC<OffcanvasProps> = ({
  title,
  dataElement,
  handleHide,
}) => {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const formattedValue = useMemo(() => {
    if (value.trim().length === 0) return '';

    return writeSegmentEdi(
      {
        name: 'T',
        elements: [dataElement],
      },
      {
        [dataElement.name]: value.trim(),
      },
    );
  }, [value]);

  const handleValueClick = async (): Promise<void> => {
    await copyToClipboard(formattedValue);
    setShow(true);

    setTimeout(() => {
      setShow(false);
    }, 1000);
  };

  return (
    <>
      <OffcanvasStyled show={true} onHide={handleHide}>
        <OffcanvasStyled.Header closeButton>
          <OffcanvasStyled.Title>
            {title} - {dataElement.originalName}
          </OffcanvasStyled.Title>
        </OffcanvasStyled.Header>
        <OffcanvasStyled.Body>
          <TableStyled striped bordered responsive>
            <tbody>
              <tr>
                <td>{dataElement.originalName}</td>
                <td>
                  {dataElement.originalName
                    .toLocaleLowerCase()
                    .includes('hts') ? (
                    <Alert.Link
                      href={`https://hts.usitc.gov/?query=${dataElement.valueFormatted.replace(
                        /[^\d]/gi,
                        '',
                      )}`}
                      onClick={(event: React.BaseSyntheticEvent) => {
                        event.preventDefault();
                        window.open(
                          event.target.href,
                          dataElement.valueFormatted,
                        );
                      }}
                    >
                      {dataElement.valueFormatted}
                    </Alert.Link>
                  ) : (
                    dataElement.valueFormatted
                  )}
                </td>
              </tr>
              <tr>
                <td>Length/Class</td>
                <td>
                  {dataElement.max}
                  {dataElement.class}
                </td>
              </tr>
              <tr>
                <td>Position</td>
                <td>
                  {dataElement.start === dataElement.end
                    ? dataElement.start
                    : `${dataElement.start ?? ''}-${dataElement.end ?? ''}`}
                </td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{dataElement.status}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td
                  dangerouslySetInnerHTML={{
                    __html: dataElement.description ?? '',
                  }}
                />
              </tr>
            </tbody>
          </TableStyled>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Value</Form.Label>
            <Form.Control
              type="text"
              placeholder="Value To Format..."
              value={value}
              onChange={evt => setValue(evt.target.value)}
            />
            {formattedValue.length > 0 && (
              <FormattedValue>
                Formatted value:{' '}
                <Alert.Link
                  ref={target}
                  onClick={() => {
                    handleValueClick().catch(() => {});
                  }}
                >
                  <EDI
                    segment={formattedValue}
                    highlight={{ start: 1, end: formattedValue.length }}
                  />
                </Alert.Link>
              </FormattedValue>
            )}
          </Form.Group>
        </OffcanvasStyled.Body>
      </OffcanvasStyled>

      <Overlay target={target.current} show={show} placement="bottom">
        <Tooltip id="overlay-example">Copied!</Tooltip>
      </Overlay>
    </>
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

const FormattedValue = styled(Form.Text).attrs(() => ({
  className: 'text-muted',
}))`
  width: 100%;
  display: flex;

  & > a {
    text-decoration: none;
    margin-left: 0.4rem;
    --bs-accordion-active-color: #0d6efd;
    --bs-accordion-btn-color: #0d6efd;
  }
`;

export default Offcanvas;
