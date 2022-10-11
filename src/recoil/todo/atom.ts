import { atom } from "recoil";
import { localStorageEffect } from "../localStorageEffect";

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
  effects: [localStorageEffect<ITodoState>("toDo")],
});

export default todoState;
