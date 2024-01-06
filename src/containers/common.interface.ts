import { ITodo } from "../apis";

export enum SharedKey {
  TodoList = "TodoList",
}

export type SharedDataType = {
  [SharedKey.TodoList]: ITodo.TodoList;
};
