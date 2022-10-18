import { Droppable } from "react-beautiful-dnd";
import { BsTrashFill } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import trashCanState from "../../recoil/trashCan";

const TrashCan = () => {
  const trashCan = useRecoilValue(trashCanState);

  return (
    <Droppable droppableId="trash" type="CARD">
      {(trashProvided, snapshot) => (
        <TrashIconWrapper
          isDraggingOver={snapshot.isDraggingOver}
          ref={trashProvided.innerRef}
          {...trashProvided.droppableProps}
        >
          {trashCan.isVisible && <TrashIcon />}
          {trashProvided.placeholder}
        </TrashIconWrapper>
      )}
    </Droppable>
  );
};

const TrashIconWrapper = styled.div<{ isDraggingOver: boolean }>`
  position: fixed;
  width: 50px;
  height: 50px;
  bottom: 30px;
  right: 30px;
  transform: ${(props) => (props.isDraggingOver ? "scale(1.2)" : "none")};
`;

const TrashIcon = styled(BsTrashFill)`
  padding: 10px;
  border-radius: 10px;
  font-size: 50px;
  color: white;
  background-color: red;
`;

export default TrashCan;
