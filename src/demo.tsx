import React from "react";
import styled from "@emotion/styled";

import useDropdown from "./use-dropdown";
import Timepicker from "./timepicker";
import withMedia from "./with-media";

const initialState = {
  startTime: "",
  endTime: ""
};

const reducer = (
  state: { startTime: string; endTime: string },
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "UPDATE_VALUES":
      const { id, value } = action.payload;
      return {
        ...state,
        [id]: value
      };
    default:
      return state;
  }
};

export default withMedia(function Demo({ media }: { media: number }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const {
    isOpen,
    toggle,
    getContainerProps,
    getTogglerProps,
    getDropdownProps
  } = useDropdown({
    initialState: {
      startTime: false,
      endTime: false
    }
  });

  return (
    <Container>
      <Group {...getContainerProps("startTime")}>
        {media < 567 ? (
          <Label htmlFor="startTime">
            Start Time
            <Select
              id="startTime"
              value={state.startTime || "Select one"}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const { value } = e.target;
                dispatch({
                  type: "UPDATE_VALUES",
                  payload: {
                    id: "startTime",
                    value
                  }
                });
              }}
            >
              <Timepicker
                isMobile={true}
                time={state.startTime}
                showTimesBefore={state.endTime}
              />
            </Select>
          </Label>
        ) : (
          <>
            <Label htmlFor="startTime">
              Start Time
              <Input
                {...getTogglerProps("startTime")}
                value={state.startTime}
                placeholder="Select one"
              />
            </Label>
            <DropdownContainer {...getDropdownProps("startTime")}>
              <Timepicker
                isShowing={isOpen("startTime")}
                time={state.startTime}
                showTimesBefore={state.endTime}
                onChange={(value: string) => {
                  dispatch({
                    type: "UPDATE_VALUES",
                    payload: {
                      id: "startTime",
                      value
                    }
                  });
                  toggle("close")("startTime");
                }}
              />
            </DropdownContainer>
          </>
        )}
      </Group>
      <Group {...getContainerProps("endTime")}>
        {media < 567 ? (
          <Label htmlFor="endTime">
            End Time
            <Select
              id="endTime"
              value={state.endTime || "Select one"}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const { value } = e.target;
                dispatch({
                  type: "UPDATE_VALUES",
                  payload: {
                    id: "endTime",
                    value
                  }
                });
              }}
            >
              <Timepicker
                isMobile={true}
                time={state.endTime}
                showTimesAfter={state.startTime}
              />
            </Select>
          </Label>
        ) : (
          <>
            <Label htmlFor="endTime">
              End Time
              <Input
                {...getTogglerProps("endTime")}
                value={state.endTime}
                placeholder="Select one"
              />
            </Label>
            <DropdownContainer {...getDropdownProps("endTime")}>
              <Timepicker
                isShowing={isOpen("endTime")}
                time={state.endTime}
                showTimesAfter={state.startTime}
                onChange={(value: string) => {
                  dispatch({
                    type: "UPDATE_VALUES",
                    payload: {
                      id: "endTime",
                      value
                    }
                  });
                  toggle("close")("endTime");
                }}
              />
            </DropdownContainer>
          </>
        )}
      </Group>
    </Container>
  );
});

const Input = (props: any) => (
  <InputContainer>
    <StyledInput {...props} />
    <span />
  </InputContainer>
);

// We make a Select component because if we want to render conditionally, the "as" prop won't work.
export const Select = (props: any) => (
  <InputContainer>
    <StyledInput {...props} as="select" />
    <span />
  </InputContainer>
);

// Styles
// ======

const Container = styled.div`
  --box-shadow: 0 1px 3px rgba(188, 193, 217, 0.22),
    0 4px 12px rgba(188, 193, 217, 0.25);
  --padding: 20px;
  --border-radius: 5px;
  --font-small: 0.85rem;
  --font-medium: 1.3rem;
  --font-large: 2rem;
  --color-light: #f1f2f7;
  --ease: cubic-bezier(0.19, 1, 0.22, 1);

  box-shadow: var(--box-shadow);
  padding: var(--padding);
  border-radius: var(--border-radius);
  display: grid;
  grid-gap: var(--padding);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    border-radius: inherit;
    z-index: -1;
  }
`;

const Group = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  font-weight: 700;
  cursor: pointer;
  color: #21c8b7;
`;

const DropdownContainer = styled.div`
  padding: var(--padding);
  box-shadow: var(--box-shadow);
  background: #fff;
  position: absolute;
  left: 100px;
  top: 60px;
  transform: ${(props: { isOpen: boolean }) =>
    props.isOpen ? "scaleX(1)" : "scaleX(0)"};
  transform-origin: 0 0;
  opacity: ${(props: { isOpen: boolean }) => (props.isOpen ? 1 : 0)};
  transition: transform 400ms var(--ease) 100ms, opacity 350ms var(--ease) 50ms;
  pointer-events: ${(props: { isOpen: boolean }) =>
    props.isOpen ? "initial" : "none"};
  touch-action: ${(props: { isOpen: boolean }) =>
    props.isOpen ? "initial" : "none"};
  max-height: 250px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  z-index: 1;
`;

const InputContainer = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  padding: 15px;
  font-size: var(--font-medium);
  border-radius: var(--border-radius);
  border: none;
  background: none;
  width: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 0px;
  text-overflow: "";
  outline: none;
  cursor: pointer;
  &:focus {
    + span {
      &::after {
        opacity: 1;
      }
    }
  }

  + span {
    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: var(--border-radius);
      z-index: -1;
    }
    &::before {
      border: 1px solid var(--color-light);
    }

    &::after {
      box-shadow: var(--box-shadow);
      opacity: 0;
      transition: opacity 250ms var(--ease);
    }
  }
`;
