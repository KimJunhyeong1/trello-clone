import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled, { ThemeProvider } from "styled-components";
import Board from "./components/board/board.component";

import GlobalStyle from "./components/shared/GlobalStyle";
import todoState from "./recoil/todo";
import { darkTheme } from "./theme";

function App() {
  const [toDoList, setToDoList] = useRecoilState(todoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;

    if (destination.droppableId === source.droppableId) {
      setToDoList((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(
          destination.index,
          0,
          boardCopy.splice(source.index, 1)[0]
        );

        return { ...allBoards, [source.droppableId]: boardCopy };
      });
    }

    if (destination.droppableId !== source.droppableId) {
      setToDoList((allBoards) => {
        const destinationBoard = [...allBoards[destination.droppableId]];
        const sourceBoard = [...allBoards[source.droppableId]];

        destinationBoard.splice(
          destination.index,
          0,
          sourceBoard.splice(source.index, 1)[0]
        );

        return {
          ...allBoards,
          [destination.droppableId]: destinationBoard,
          [source.droppableId]: sourceBoard,
        };
      });
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDoList).map((element) => (
              <Board key={element} boardId={element} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </ThemeProvider>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100vw;

  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
`;

export default App;
