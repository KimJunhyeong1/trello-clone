import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled, { ThemeProvider } from "styled-components";

import Board from "./components/board/board.component";
import GlobalStyle from "./components/shared/GlobalStyle";
import todoState from "./recoil/todo";
import { darkTheme } from "./theme";
import trashCanState from "./recoil/trashCan";
import TrashCan from "./components/trashCan/trashCan.component";

function App() {
  const [toDoList, setToDoList] = useRecoilState(todoState);
  const setTrashCan = useSetRecoilState(trashCanState);

  const onDragEnd = (info: DropResult) => {
    setTrashCan({ isVisible: false });

    const { destination, source } = info;
    if (!destination) return;

    if (destination.droppableId === source.droppableId) {
      switch (destination.droppableId) {
        case "boards":
          setToDoList((allBoards) => {
            const boardsArr = Object.entries(allBoards);
            boardsArr.splice(
              destination.index,
              0,
              boardsArr.splice(source.index, 1)[0]
            );

            return Object.fromEntries(boardsArr);
          });
          break;
        case "toDo":
        case "doing":
        case "done":
          setToDoList((allBoards) => {
            const boardCopy = [...allBoards[source.droppableId]];
            boardCopy.splice(
              destination.index,
              0,
              boardCopy.splice(source.index, 1)[0]
            );

            return { ...allBoards, [source.droppableId]: boardCopy };
          });
          break;
        default:
          break;
      }

      return;
    }

    if (destination.droppableId === "trash") {
      setToDoList((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];

        boardCopy.splice(source.index, 1);

        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });

      return;
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
      <DragDropContext
        onDragEnd={onDragEnd}
        onBeforeDragStart={(info) => {
          if (info.type === "CARD") setTrashCan({ isVisible: true });
        }}
      >
        <Wrapper>
          <Droppable droppableId="boards" direction="horizontal" type="BOARD">
            {(boardsProvided) => (
              <Boards
                ref={boardsProvided.innerRef}
                {...boardsProvided.droppableProps}
              >
                {Object.keys(toDoList).map((element, index) => (
                  <Board key={element} boardId={element} index={index} />
                ))}
                {boardsProvided.placeholder}
              </Boards>
            )}
          </Droppable>
          <TrashCan />
        </Wrapper>
      </DragDropContext>
    </ThemeProvider>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  position: relative;
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
