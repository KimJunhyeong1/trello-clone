import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "./components/shared/GlobalStyle";
import { darkTheme } from "./theme";

function App() {
  const onDragEnd = () => {};
  const TO_DO = ["A", "B", "C", "D", "E", "F", "G"];

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
                  {TO_DO.map((element, index) => (
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
