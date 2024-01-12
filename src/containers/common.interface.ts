import { ITodo } from "../apis";

export enum SharedKey {
  TODO_LIST = "TodoList",
}

export type SharedDataType = {
  [SharedKey.TODO_LIST]: ITodo.TodoList;
};
