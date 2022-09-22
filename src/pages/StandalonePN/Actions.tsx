import React from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { downloadEDI, downloadJSON } from '../../utils/downloadFile';
import { Segment } from '../../utils/ediToObject';

interface ActionsProps {
  edi: Segment[];
}

const Actions: React.FC<ActionsProps> = ({ edi }) => {
  const handleDownloadJSON = (): void => {
    downloadJSON(
      edi.map(({ elements }) =>
        Object.fromEntries(elements.map(({ name, value }) => [name, value])),
      ),
      'edi',
    );
  };

  const handleDownloadEDI = (): void => {
    downloadEDI(
      edi.map(({ edi }) => edi),
      'edi',
    );
  };

  return (
    <Wrapper>
      <Button variant="primary" onClick={handleDownloadJSON}>
        Download JSON
      </Button>

      <Button variant="primary" onClick={handleDownloadEDI}>
        Download EDI
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;

  & > button:not(:last-child) {
    margin-right: 1rem;
  }
`;

export default Actions;
