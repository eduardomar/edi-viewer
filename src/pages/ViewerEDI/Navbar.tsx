import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarBootstrap from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import swal from 'sweetalert2';
import Segment from '../../interfaces/Segment';
import copyToClipboard from '../../utils/copyToClipboard';
import { downloadEDI, downloadJSON } from '../../utils/downloadFile';
import ViewerSelector from './ViewerSelector';

interface NavbarProps {
  segments: Segment[];
  title: string;
  radioValue: string;
  setRadioValue: (radioValue: string) => void;
}

enum OptionToDownload {
  FILE,
  COPY,
}

enum TypeDownload {
  JSON,
  EDI,
}

const Navbar: React.FC<NavbarProps> = ({
  segments,
  title,
  radioValue,
  setRadioValue,
}) => {
  const handleDownloadClick = async (
    option: OptionToDownload,
    type: TypeDownload,
  ): Promise<void> => {
    if (type === TypeDownload.JSON) {
      const data = segments.map(({ elements }) =>
        Object.fromEntries(elements.map(({ name, value }) => [name, value])),
      );

      if (option === OptionToDownload.COPY)
        copyToClipboard(JSON.stringify(data)).catch(() => {});
      else downloadJSON(data, 'edi');

      return;
    }

    const result = await swal.fire({
      title: 'Do you want to format the edi?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: `No, I prefer it in one line`,
    });

    const strEdi = segments
      .map(({ edi }) => edi)
      .join(result.isConfirmed ? `\n` : '');

    if (option === OptionToDownload.COPY)
      copyToClipboard(strEdi).catch(() => {});
    else downloadEDI(strEdi, 'edi');
  };

  return (
    <NavbarBootstrap
      bg="dark"
      variant="dark"
      expand="lg"
      fixed="top"
      // sticky="top"
    >
      <Container fluid>
        <NavbarBootstrap.Brand href="#">{title}</NavbarBootstrap.Brand>
        <NavbarBootstrap.Toggle aria-controls="navbarScroll" />
        <NavbarBootstrap.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <NavDropdown title="Download" id="navbarScrollingDropdown">
              <NavDropdown.Item
                onClick={() => {
                  handleDownloadClick(
                    OptionToDownload.FILE,
                    TypeDownload.JSON,
                  ).catch(() => {});
                }}
              >
                JSON
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  handleDownloadClick(
                    OptionToDownload.FILE,
                    TypeDownload.EDI,
                  ).catch(() => {});
                }}
              >
                EDI
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Copy To Clipboard" id="navbarScrollingDropdown">
              <NavDropdown.Item
                onClick={() => {
                  handleDownloadClick(
                    OptionToDownload.COPY,
                    TypeDownload.JSON,
                  ).catch(() => {});
                }}
              >
                JSON
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  handleDownloadClick(
                    OptionToDownload.COPY,
                    TypeDownload.EDI,
                  ).catch(() => {});
                }}
              >
                EDI
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}

          <ViewerSelector
            radioValue={radioValue}
            setRadioValue={setRadioValue}
          />
        </NavbarBootstrap.Collapse>
      </Container>
    </NavbarBootstrap>
  );
};

export default Navbar;
