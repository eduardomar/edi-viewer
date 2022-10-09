import React, { useCallback, useState } from 'react';
import { DropEvent, useDropzone } from 'react-dropzone';
import { Card, Container } from 'react-bootstrap';
import styled from 'styled-components';
import backgroundImage from '../../assets/images/background-not-found.png';
import { useNavigate } from 'react-router-dom';

const UploadEDI: React.FC = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onDropAccepted = useCallback((files: File[], event: DropEvent) => {
    if (files.length !== 1) return;
    const [file] = files;

    const reader = new FileReader();
    reader.onabort = () => {
      setError(`Reading of "${file.name}" file was aborted.`);
    };
    reader.onerror = () => {
      setError(`Reading of "${file.name}" file has failed.`);
    };
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        setError(`Reading of "${file.name}" file has failed.`);
        return;
      }

      const result = encodeURIComponent(reader.result.replace(/[\n\r]+/gi, ''));
      console.log('🚀 ~ UploadEDI.tsx', { result });
      navigate(`/${result}`);
    };

    reader.readAsText(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    maxFiles: 1,
  });

  return (
    <Wrapper fluid>
      <Card>
        <Card.Body>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>
              Drag &apos;n&apos; drop some files here, or click to select files
            </p>
          </div>

          {error.length > 0 && <h1>{error}</h1>}
        </Card.Body>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled(Container)`
  background-image: url(${backgroundImage});
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div.card {
    width: 65%;
    aspect-ratio: 3;

    & > div.card-body {
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }

  & > p {
    font-size: 1rem;
  }

  & > em {
    font-size: 0.8rem;
  }

  & .dropzone {
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-width: 2px;
    border-radius: 2px;
    border-color: #989090;
    border-style: dashed;
    background-color: #fafafa;
    color: #c9c1c1;
    outline: none;
    transition: border 0.24s ease-in-out;
  }

  & .dropzone:focus {
    border-color: #2196f3;
  }

  & .dropzone.disabled {
    opacity: 0.6;
  }
`;

export default UploadEDI;
