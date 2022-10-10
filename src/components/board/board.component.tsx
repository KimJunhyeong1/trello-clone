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
        {(boardDroppableProvided) => (
          <div
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
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 300px;
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

export default Board;
