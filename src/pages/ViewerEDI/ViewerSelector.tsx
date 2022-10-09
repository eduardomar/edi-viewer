import React from 'react';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import styled from 'styled-components';
import ToggleButtonBootstrap from 'react-bootstrap/ToggleButton';
import { optionsViewer } from './constants';

interface ViewerSelectorProps {
  radioValue: string;
  setRadioValue: (radioValue: string) => void;
}

const ViewerSelector: React.FC<ViewerSelectorProps> = ({
  radioValue,
  setRadioValue,
}) => {
  return (
    <WrapperButtons>
      <ButtonGroup>
        {optionsViewer.map((opt, idx) => {
          const Icon = opt.icon;

          return (
            <ToggleButtonStyled
              key={idx}
              type="radio"
              id={`radio-${idx}`}
              name="radio"
              variant="outline-primary"
              value={opt.value}
              checked={radioValue === opt.value}
              onChange={e => setRadioValue(e.currentTarget.value)}
            >
              <Icon />
              {opt.text}
            </ToggleButtonStyled>
          );
        })}
      </ButtonGroup>
    </WrapperButtons>
  );
};

const WrapperButtons = styled(Container)`
  display: flex;
  justify-content: flex-end;
`;

const ToggleButtonStyled = styled(ToggleButtonBootstrap)`
  display: flex;
  align-items: center;

  & > *:first-child {
    margin-right: 0.2rem;
  }
`;

export default ViewerSelector;
