import React, { useLayoutEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Menu from "./Menu";
import rough from "roughjs/bundled/rough.esm";
import { actions, toolTypes, cursorPositions } from "./constants";
import {
  createElement,
  updateElement,
  drawElement,
  adjustmentRequired,
  adjustElementCoordinates,
  getElementAtPosition,
  getCursorForPosition,
  getResizedCoordinates,
  updatePencilElementWhenMoving,
} from "./utils";
import { v4 as uuidv4 } from "uuid";
import { updateElement as updateElementInStore } from "./whiteboardSlice";
import { emitCursorPosition } from "./socketConn/socketConn";
import Modal from "react-modal"; 

Modal.setAppElement('#app'); 

let emitCursor = true;
let lastCursorPosition;

const Whiteboard = ({ socket }) => {
  const canvasRef = useRef();
  const textAreaRef = useRef(null);
  const toolType = useSelector((state) => state.whiteboard.tool);
  const elements = useSelector((state) => state.whiteboard.elements);

  const [action, setAction] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [showAlert, setShowAlert] = useState(false); 

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);

    elements.forEach((element) => {
      drawElement({ roughCanvas, context: ctx, element });
    });
  }, [elements]);

  const handleMouseDown = (event) => {
    const { clientX, clientY } = event;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const canvasX = clientX - canvasRect.left;
    const canvasY = clientY - canvasRect.top;

    if (selectedElement && action === actions.WRITING) {
      return;
    }

    switch (toolType) {
      case toolTypes.RECTANGLE:
      case toolTypes.LINE:
      case toolTypes.PENCIL: {
        const element = createElement({
          x1: canvasX,
          y1: canvasY,
          x2: canvasX,
          y2: canvasY,
          toolType,
          id: uuidv4(),
        });
        setAction(actions.DRAWING);
        setSelectedElement(element);
        dispatch(updateElementInStore(element));
        break;
      }
      case toolTypes.TEXT: {
        const element = createElement({
          x1: canvasX,
          y1: canvasY,
          x2: canvasX,
          y2: canvasY,
          toolType,
          id: uuidv4(),
        });

        setAction(actions.WRITING);
        setSelectedElement(element);
        dispatch(updateElementInStore(element));

        if (textAreaRef.current) {
          const textareaX = canvasX - canvasRect.left;
          const textareaY = canvasY - canvasRect.top;

          textAreaRef.current.style.position = "absolute";
          textAreaRef.current.style.left = `${textareaX}px`;
          textAreaRef.current.style.top = `${textareaY}px`;
          textAreaRef.current.focus();
        }
        break;
      }
      case toolTypes.SELECTION: {
        const element = getElementAtPosition(canvasX, canvasY, elements);

        if (element) {
          const { id, type, position, x1, y1, x2, y2 } = element;

          if (
            type === toolTypes.RECTANGLE ||
            type === toolTypes.TEXT ||
            type === toolTypes.LINE
          ) {
            const cursorX = canvasX - x1;
            const cursorY = canvasY - y1;
            const offsetX = cursorX;
            const offsetY = cursorY;

            if (position === cursorPositions.INSIDE) {
              setAction(actions.MOVING);
              setSelectedElement({ ...element, offsetX, offsetY });
            } else {
              setAction(actions.RESIZING);
              setSelectedElement({
                ...element,
                offsetX,
                offsetY,
                originalX1: x1,
                originalY1: y1,
                originalX2: x2,
                originalY2: y2,
                position,
              });
            }
          } else if (type === toolTypes.PENCIL) {
            const offsetX = element.points.map((point) => canvasX - point.x);
            const offsetY = element.points.map((point) => canvasY - point.y);

            setAction(actions.MOVING);
            setSelectedElement({ ...element, offsetX, offsetY });
          }
        } else {
          setAction(null);
          setSelectedElement(null);
        }
        break;
      }
      default:
        setShowAlert(true); 
    }
  };

  const handleMouseUp = () => {
    const selectedElementIndex = elements.findIndex(
      (element) => element.id === selectedElement?.id
    );

    if (selectedElementIndex !== -1) {
      if (action === actions.DRAWING || action === actions.RESIZING) {
        if (adjustmentRequired(elements[selectedElementIndex].type)) {
          const { x1, y1, x2, y2 } = adjustElementCoordinates(
            elements[selectedElementIndex]
          );
          updateElement(
            {
              id: selectedElement.id,
              index: selectedElementIndex,
              x1,
              x2,
              y1,
              y2,
              type: elements[selectedElementIndex].type,
            },
            elements
          );
        }
      }
    }

    setAction(null);
    setSelectedElement(null);
  };

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const canvasRect = canvasRef.current.getBoundingClientRect();

    const canvasX = clientX - canvasRect.left;
    const canvasY = clientY - canvasRect.top;

    lastCursorPosition = { x: canvasX, y: canvasY };

    if (emitCursor) {
      emitCursorPosition({ x: clientX, y: clientY });
      emitCursor = false;

      setTimeout(() => {
        emitCursor = true;
        emitCursorPosition(lastCursorPosition);
      }, [50]);
    }

    if (action === actions.DRAWING) {
      const index = elements.findIndex(
        (element) => element.id === selectedElement.id
      );

      if (index !== -1) {
        updateElement(
          {
            index,
            id: elements[index].id,
            x1: elements[index].x1,
            y1: elements[index].y1,
            x2: canvasX,
            y2: canvasY,
            type: elements[index].type,
          },
          elements
        );

        if (textAreaRef.current) {
          textAreaRef.current.style.left = `${canvasX}px`;
          textAreaRef.current.style.top = `${canvasY}px`;
        }
      }
    }

    if (toolType === toolTypes.SELECTION) {
      const element = getElementAtPosition(canvasX, canvasY, elements);
      event.target.style.cursor = element
        ? getCursorForPosition(element.position)
        : "default";
    }

    if (
      selectedElement &&
      toolType === toolTypes.SELECTION &&
      action === actions.MOVING &&
      selectedElement.type === toolTypes.PENCIL
    ) {
      const newPoints = selectedElement.points.map((_, index) => ({
        x: canvasX - selectedElement.offsetX[index],
        y: canvasY - selectedElement.offsetY[index],
      }));

      const index = elements.findIndex(
        (element) => element.id === selectedElement.id
      );

      if (index !== -1) {
        updatePencilElementWhenMoving({ index, newPoints }, elements);
      }

      return;
    }

    if (
      toolType === toolTypes.SELECTION &&
      action === actions.MOVING &&
      selectedElement
    ) {
      const { id, x1, x2, y1, y2, type, offsetX, offsetY, text } =
        selectedElement;

      const width = x2 - x1;
      const height = y2 - y1;

      const newX1 = canvasX - offsetX;
      const newY1 = canvasY - offsetY;

      const index = elements.findIndex(
        (element) => element.id === selectedElement.id
      );

      if (index !== -1) {
        updateElement(
          {
            id,
            x1: newX1,
            y1: newY1,
            x2: newX1 + width,
            y2: newY1 + height,
            type,
            index,
            text,
          },
          elements
        );
      }
    }

    if (
      toolType === toolTypes.SELECTION &&
      action === actions.RESIZING &&
      selectedElement
    ) {
      const { id, type, position, ...coordinates } = selectedElement;
      const { x1, y1, x2, y2 } = getResizedCoordinates(
        canvasX,
        canvasY,
        position,
        coordinates
      );

      const selectedElementIndex = elements.findIndex(
        (element) => element.id === selectedElement.id
      );

      if (selectedElementIndex !== -1) {
        updateElement(
          {
            x1,
            y1,
            x2,
            y2,
            type: selectedElement.type,
            id: selectedElement.id,
            index: selectedElementIndex,
          },
          elements
        );
      }
    }
  };

  const handleTextAreaBlur = (event) => {
    const { id, x1, y1, type } = selectedElement;

    const index = elements.findIndex(
      (element) => element.id === selectedElement.id
    );

    if (index !== -1) {
      updateElement(
        {
          id,
          x1,
          y1,
          type,
          text: event.target.value,
          index,
        },
        elements
      );

      setAction(null);
      setSelectedElement(null);
    }
  };

  return (
    <div className="whiteboard-wrapper">
      <Menu />
      <Modal
        isOpen={showAlert}
        onRequestClose={() => setShowAlert(false)}
        contentLabel="Unknown Tool"
        className="custom-modal" 
      >
        <h2>No tool selected</h2>
        <p>Please select a valid tool type from the menu bar.</p>
        <button onClick={() => setShowAlert(false)}>Close</button>
      </Modal>
      {action === actions.WRITING ? (
        <textarea
          ref={textAreaRef}
          onBlur={handleTextAreaBlur}
          style={{
            position: "absolute",
            top: selectedElement.y1 - 3,
            left: selectedElement.x1,
            font: "24px sans-serif",
            margin: 0,
            padding: 0,
            border: 0,
            outline: 0,
            overflow: "hidden",
            resize: "auto",
            whiteSpace: "pre",
            background: "transparent",
          }}
        />
      ) : null}

      <canvas
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        ref={canvasRef}
        width={500}
        height={500}
        id="canvas"
      />
    </div>
  );
};

export default Whiteboard;
