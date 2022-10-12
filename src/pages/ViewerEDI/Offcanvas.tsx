import React, { useMemo, useState } from 'react';
import { Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import OffcanvasBootstrap from 'react-bootstrap/Offcanvas';
import TableBootstrap from 'react-bootstrap/Table';
import styled from 'styled-components';
import ButtonClipboard from '../../components/ButtonClipboard';
import EDI from '../../components/EDI';
import useClipboard from '../../hooks/useClipboard';
import Element from '../../interfaces/Element';
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
  const clipboardToElementNameName = useClipboard();
  const clipboardToValue = useClipboard();
  const clipboardToFormattedValue = useClipboard();
  const [value, setValue] = useState('');

  const formattedValue = useMemo(() => {
    // if (value.trim().length === 0) return '';

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

  return (
    <>
      <OffcanvasStyled show={true} onHide={handleHide}>
        <OffcanvasStyled.Header closeButton>
          <OffcanvasStyled.Title>
            <WrapperValue>
              {title} - {dataElement.originalName}
              <ButtonClipboard
                ref={clipboardToElementNameName.target}
                onClick={() => {
                  clipboardToElementNameName
                    .copy(`${title} - ${dataElement.originalName}`)
                    .catch(() => {});
                }}
                disabled={clipboardToElementNameName.copied}
              />
            </WrapperValue>
          </OffcanvasStyled.Title>
        </OffcanvasStyled.Header>
        <OffcanvasStyled.Body>
          <TableStyled striped bordered responsive>
            <tbody>
              <tr>
                <td>{dataElement.originalName} </td>
                <td>
                  <WrapperValue>
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
                    <ButtonClipboard
                      ref={clipboardToValue.target}
                      onClick={() => {
                        clipboardToValue
                          .copy(dataElement.valueFormatted)
                          .catch(() => {});
                      }}
                      disabled={clipboardToValue.copied}
                    />
                  </WrapperValue>
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

            <FormattedValue>
              Formatted value:{' '}
              <Alert.Link
                ref={clipboardToFormattedValue.target}
                onClick={() => {
                  clipboardToFormattedValue
                    .copy(formattedValue)
                    .catch(() => {});
                }}
              >
                <EDI
                  segment={formattedValue}
                  highlight={{ start: 1, end: formattedValue.length }}
                />
              </Alert.Link>
            </FormattedValue>
          </Form.Group>
        </OffcanvasStyled.Body>
      </OffcanvasStyled>

      <clipboardToElementNameName.Tooltip placement="right" />
      <clipboardToValue.Tooltip placement="right" />
      <clipboardToFormattedValue.Tooltip placement="bottom" />
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

const WrapperValue = styled.div`
  display: flex;
  align-items: center;

  & > button {
    margin-left: 0.5rem;
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
