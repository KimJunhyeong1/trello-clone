import { atom } from "recoil";

interface ItrashCanState {
  isVisible: boolean;
}

const trashCanState = atom<ItrashCanState>({
  key: "trashCan",
  default: {
    isVisible: false,
  },
});

export default trashCanState;
