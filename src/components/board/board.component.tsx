import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import todoState from "../../recoil/todo";
import DraggableCardComponent from "../draggableCard/draggableCard.component";

interface IBoardProps {
  boardId: string;
}

interface IForm {
  toDo: string;
}

const Board = ({ boardId }: IBoardProps) => {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const [toDo, setToDo] = useRecoilState(todoState);
  const boardList = toDo[boardId];
  const onValid = ({ toDo }: IForm) => {
    const newTodo = { id: Date.now(), text: toDo };

    setToDo((prevBoards) => {
      return { ...prevBoards, [boardId]: [...prevBoards[boardId], newTodo] };
    });
    setValue("toDo", "");
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(boardDroppableProvided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={boardDroppableProvided.innerRef}
            {...boardDroppableProvided.droppableProps}
          >
            {boardList.map((todo, index) => (
              <DraggableCardComponent
                key={todo.id}
                toDoId={todo.id}
                toDoText={todo.text}
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
  width: 400px;
  padding: 20px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 400px;
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
  font-weight: 800;
  margin-bottom: 20px;
  font-size: 20px;
`;

const Form = styled.form`
  width: 100%;

  input {
    width: 100%;
    height: 40px;
    border: none;
  }
`;

export default Board;
