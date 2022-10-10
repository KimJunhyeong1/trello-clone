import { atom } from "recoil";

const todoState = atom({
  key: "toDO",
  default: ["A", "B", "C", "D", "E", "F", "G"],
});

export default todoState;
