import { Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import todoState from "../../recoil/todo";
import DraggableCardComponent from "../draggableCard/draggableCard.component";

interface IBoardProps {
  boardId: string;
}

const Board = ({ boardId }: IBoardProps) => {
  const boardList = useRecoilValue(todoState)[boardId];

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(boardDroppableProvided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={boardDroppableProvided.innerRef}
            {...boardDroppableProvided.droppableProps}
          >
            {boardList.map((element, index) => (
              <DraggableCardComponent
                key={element}
                toDo={element}
                index={index}
              />
            ))}
            {boardDroppableProvided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  overflow: hidden;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  flex-grow: 1;
  padding: 20px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  transition: background-color 0.3s ease-in-out;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

export default Board;
