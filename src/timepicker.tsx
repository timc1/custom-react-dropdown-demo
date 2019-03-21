import React from "react";
import styled from "@emotion/styled";
import times, { TimesType } from "./times";

export default function Timepicker({
  time,
  onChange,
  isShowing,
  showTimesBefore,
  showTimesAfter,
  isMobile
}: {
  time: string;
  isShowing?: boolean;
  onChange?: (value: string) => any;
  showTimesBefore?: string;
  showTimesAfter?: string;
  isMobile?: boolean;
}) {
  const timesCopy = times.slice();

  if (showTimesBefore || showTimesAfter) {
    const indexOfTimeToShowBefore = timesCopy.findIndex(
      (i: TimesType) => i.full === showTimesBefore
    );
    if (indexOfTimeToShowBefore !== -1) {
      timesCopy.splice(indexOfTimeToShowBefore + 1);
    }

    const indexOfTimetoShowAfter = timesCopy.findIndex(
      (i: TimesType) => i.full === showTimesAfter
    );
    if (indexOfTimetoShowAfter !== -1) {
      timesCopy.splice(0, indexOfTimetoShowAfter);
    }
  }

  return (
    <>
      {isMobile ? (
        <>
          <option value="Select one" disabled>
            Select one
          </option>
          {timesCopy.map((t: TimesType) => (
            <option key={t.full} value={t.full}>
              {t.full}
            </option>
          ))}
        </>
      ) : (
        <Container>
          {timesCopy.map(t => (
            <TimeContainer key={t.full}>
              <Toggle
                isActive={time === t.full}
                onClick={() => (onChange ? onChange(t.full) : {})}
                tabIndex={isShowing ? 0 : -1}
              >
                <span className="time">{t.time}</span>
                <span>{t.meridien}</span>
              </Toggle>
            </TimeContainer>
          ))}
        </Container>
      )}
    </>
  );
}

const TimeContainer = styled.li`
  margin-bottom: calc(var(--padding) / 2);
`;

const Container = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  max-height: 200px;
  height: 100%;
`;

const Toggle = styled.button`
  position: relative;
  height: 100%;
  width: 5.3125rem;
  border: none;
  background: none;
  padding: 15px 10px;
  color: var(--color-dark);
  font-size: var(--font-small);
  font-weight: ${props => (props.isActive ? "700" : "400")};
  cursor: pointer;
  display: flex;

  > .time {
    margin-right: 3px;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: opacity 400ms var(--ease);
    z-index: -1;
  }

  &::before {
    background: var(--color-dark-4);
    opacity: ${(props: { isActive: boolean }) => (props.isActive ? 1 : 0)};
    transition: opacity 400ms var(--ease);
    transition: opacity 400ms var(--ease);
  }

  &::after {
    background: #fff;
    box-shadow: var(--box-shadow);
    opacity: ${(props: { isActive: boolean }) => (props.isActive ? 1 : 0)};
  }

  &:active {
    &::after {
      opacity: 1;
    }
  }
`;
