import React from 'react';
import styled, { css } from 'styled-components';

interface Props {
  segment: String;
  highlight?: {
    start: number;
    end: number;
  };
}

interface SpanProps extends React.HTMLProps<HTMLSpanElement> {
  highlight: Boolean;
}

interface CharProps extends SpanProps {
  whiteSpace: Boolean;
  hover: Boolean;
}

const EDI: React.FC<Props> = ({ segment, highlight }) => {
  const { start, end } = highlight ?? { start: -1, end: -1 };
  const markHighlight = start > 0 && end >= start && end <= segment.length;

  return (
    <>
      {segment.split('').map((char, index) => {
        return (
          <Char
            key={index}
            whiteSpace={char.trim().length === 0}
            highlight={markHighlight}
            hover={index >= start - 1 && index <= end - 1}
          >
            {char.trim()}
          </Char>
        );
      })}
    </>
  );
};

const Char = styled.span<CharProps>`
  display: flex;
  width: 0.75rem;
  height: 19.1953px;
  justify-content: center;
  align-items: center;

  ${({ highlight, hover }: CharProps) => {
    if (highlight === false) return;

    const opacity = hover === true ? 1 : 0.25;
    return css`
      opacity: ${opacity};
      ${opacity === 1
        ? css`
            border-bottom: solid 0.1rem var(--bs-accordion-active-color);

            .collapsed > &&&& {
              border-bottom: solid 0.1rem var(--bs-accordion-btn-color);
            }
          `
        : ``}
    `;
  }}

  ${({ whiteSpace }: CharProps) => {
    return whiteSpace === true
      ? css`
          &::before {
            content: ' ';
            display: inline-block;

            border: solid 0.25rem;
            border-radius: 81px;
            width: 2px;
            height: 2px;
            border-color: var(--bs-accordion-active-color);
            opacity: 0.5;
          }

          .collapsed > &&&&::before {
            border-color: var(--bs-accordion-btn-color);
          }
        `
      : css``;
  }}
`;

export default EDI;
