import React from "react";

const isMobile = () => {
  if (typeof document !== `undefined`) {
    return "ontouchstart" in document.documentElement === true;
  }
  return false;
};

const eventType = isMobile() ? "ontouchstart" : "click";

const reducer = (
  state: any,
  action: {
    type: string;
    payload?: any;
  }
) => {
  switch (action.type) {
    case "OPEN":
      const { id } = action.payload;
      // Close all other dropdowns. This makes sure
      const others: any = {};
      Object.keys(state)
        .filter(i => i !== id)
        .forEach(i => (others[i] = false));
      return {
        ...state,
        [id]: true,
        ...others
      };
    case "CLOSE":
      return {
        ...state,
        [action.payload.id]: false
      };
  }
};

interface DropdownProps {
  [key: string]: boolean;
}

export default function useDropdown({
  initialState
}: {
  initialState: DropdownProps;
}) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const focusedInput = React.useRef<any>();
  const eventHandler = React.useRef<any>();

  React.useEffect(() => {
    // Setup outer click event handler
    eventHandler.current = (e: any) => {
      const container = document.querySelector(
        `[data-dropdown-container-id="${focusedInput.current}"]`
      );

      if (container) {
        const isOuterClick = !container.contains(e.target);
        if (isOuterClick) {
          dispatch({
            type: "CLOSE",
            payload: { id: focusedInput.current }
          });
          window.removeEventListener(eventType, eventHandler.current);
        }
      }
    };

    // Cleanup
    return () => {
      window.removeEventListener(eventType, eventHandler.current);
    };
  }, []);

  const getContainerProps = (id: string) => ({
    "data-dropdown-container-id": id,
    "aria-haspopup": "listbox",
    "aria-expanded": state[id]
  });

  const getTogglerProps = (id: string) => ({
    id,
    "aria-label": state[id] ? "close dropdown" : "open dropdown",
    readOnly: true,
    onFocus: () => {
      focusedInput.current = id;
      window.addEventListener(eventType, eventHandler.current);

      dispatch({
        type: "OPEN",
        payload: { id }
      });
    }
  });

  const getDropdownProps = (id: string) => ({
    role: "listbox",
    isOpen: state[id]
  });

  const isOpen = (id: string) => state[id];

  const toggle = (type: "open" | "close") => (id: string) => {
    switch (type) {
      case "open":
        dispatch({
          type: "OPEN",
          payload: {
            id
          }
        });
        break;
      case "close":
        dispatch({
          type: "CLOSE",
          payload: {
            id
          }
        });
        break;
      default:
        break;
    }
  };

  return {
    isOpen,
    toggle,
    getContainerProps,
    getTogglerProps,
    getDropdownProps
  };
}
