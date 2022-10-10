import { atom } from "recoil";

interface ITodoState {
  [key: string]: string[];
}

const todoState = atom<ITodoState>({
  key: "toDO",
  default: {
    toDo: ["A", "B", "C"],
    doing: ["D", "E"],
    done: ["F", "G"],
  },
});

export default todoState;
