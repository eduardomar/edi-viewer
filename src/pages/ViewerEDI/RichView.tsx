import React, { useMemo } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Segment from '../../interfaces/Segment';
import AccordionItem from './AccordionItem';
import { OffcanvasProps } from './Offcanvas';

interface RichViewProps {
  segments: Segment[];

  dataOffcanvas: OffcanvasProps | null;
  setDataOffcanvas: (dataOffcanvas: OffcanvasProps | null) => void;
}

const EVENT_KEY_ALL = '0000';
const RichView: React.FC<RichViewProps> = ({
  segments,
  dataOffcanvas,
  setDataOffcanvas,
}) => {
  const [activeKey, setActiveKey] = React.useState<string[]>([]);
  const isCollapsedAll = activeKey.includes(EVENT_KEY_ALL);
  const segmentsValid = useMemo(() => {
    return segments.filter(({ elements }) => elements.length);
  }, [segments]);

  return (
    <Accordion
      alwaysOpen
      activeKey={activeKey}
      onSelect={eventKeys => {
        if (!Array.isArray(eventKeys)) return;

        const allEventKeys = Array.from(
          { length: segmentsValid.length },
          (_, index) => `${index}`,
        );
        if (
          (activeKey.includes(EVENT_KEY_ALL) &&
            eventKeys.includes(EVENT_KEY_ALL)) ||
          (!activeKey.includes(EVENT_KEY_ALL) &&
            !eventKeys.includes(EVENT_KEY_ALL))
        ) {
          const counter = allEventKeys.filter(eventKey =>
            eventKeys.includes(eventKey),
          ).length;

          const newEventKeys = [...eventKeys];
          if (
            counter === allEventKeys.length &&
            !newEventKeys.includes(EVENT_KEY_ALL)
          ) {
            newEventKeys.push(EVENT_KEY_ALL);
          } else if (counter === 0) {
            newEventKeys.length = 0;
          }

          setActiveKey(newEventKeys);
        } else {
          if (eventKeys.includes(EVENT_KEY_ALL)) {
            setActiveKey(allEventKeys.concat([EVENT_KEY_ALL]));
          } else {
            setActiveKey([]);
          }
        }
      }}
    >
      <Accordion.Item eventKey={EVENT_KEY_ALL}>
        <Accordion.Header>
          {isCollapsedAll ? 'Collapse All' : 'Expand All'}
        </Accordion.Header>
      </Accordion.Item>
      {segmentsValid.map((segment, index) => (
        <AccordionItem
          key={index}
          eventKey={`${index}`}
          segment={segment}
          dataOffcanvas={dataOffcanvas}
          setDataOffcanvas={setDataOffcanvas}
        />
      ))}
    </Accordion>
  );
};

export default RichView;
