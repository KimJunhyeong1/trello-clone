import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

const DraggableCard = ({ toDoId, toDoText, index }: IDraggableCardProps) => {
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(cardDraggableProvided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={cardDraggableProvided.innerRef}
          {...cardDraggableProvided.dragHandleProps}
          {...cardDraggableProvided.draggableProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
};

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) =>
    props.isDragging ? "#e4f2ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`;

export default React.memo(DraggableCard);
