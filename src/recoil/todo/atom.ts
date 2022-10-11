import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface ITodoState {
  [key: string]: ITodo[];
}

const todoState = atom<ITodoState>({
  key: "toDO",
  default: {
    toDo: [],
    doing: [],
    done: [],
  },
});

export default todoState;
