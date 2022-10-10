import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggableCardProps {
  toDo: string;
  index: number;
}

const DraggableCard = ({ toDo, index }: IDraggableCardProps) => {
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(cardDraggableProvided) => (
        <Card
          ref={cardDraggableProvided.innerRef}
          {...cardDraggableProvided.dragHandleProps}
          {...cardDraggableProvided.draggableProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
};

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

export default React.memo(DraggableCard);
