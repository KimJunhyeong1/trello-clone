import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "./components/shared/GlobalStyle";
import todoState from "./recoil/todo";
import { darkTheme } from "./theme";

function App() {
  const [todoList, setTodoList] = useRecoilState(todoState);
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    setTodoList((prevTodoList) => {
      const copyTodoList = [...prevTodoList];

      copyTodoList.splice(
        destination.index,
        0,
        copyTodoList.splice(source.index, 1)[0]
      );

      return copyTodoList;
    });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            <Droppable droppableId="one">
              {(boardDroppableProvided) => (
                <Board
                  ref={boardDroppableProvided.innerRef}
                  {...boardDroppableProvided.droppableProps}
                >
                  {todoList.map((element, index) => (
                    <Draggable
                      key={element}
                      draggableId={element}
                      index={index}
                    >
                      {(cardDraggableProvided) => (
                        <Card
                          ref={cardDraggableProvided.innerRef}
                          {...cardDraggableProvided.dragHandleProps}
                          {...cardDraggableProvided.draggableProps}
                        >
                          {element}
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {boardDroppableProvided.placeholder}
                </Board>
              )}
            </Droppable>
          </Boards>
        </Wrapper>
      </DragDropContext>
    </ThemeProvider>
  );
}

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

export default App;
