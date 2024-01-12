"use client";

import { KeyboardEvent, useCallback, useMemo, useRef } from "react";
import { IRenderState, useRenderState } from "react-render-state-hook";
import classNames from "classnames/bind";
import { ITodo as ITodoApi, Todo as TodoApi } from "@/apis";
import styles from "./input-form.module.scss";
import { SharedDataType, SharedKey } from "../common.interface";

const cx = classNames.bind(styles);

export function InputForm() {
  const inputElRef = useRef<HTMLInputElement>(null);
  const [, handleTodoPost, , todoPostState] = useRenderState<ITodoApi.Todo>();
  const [renderTodoListFetch, handleTodoListFetch] = useRenderState<
    SharedDataType[SharedKey.TODO_LIST]
  >(undefined, SharedKey.TODO_LIST);

  const handleInputKeydown = useCallback(
    async (event: KeyboardEvent) => {
      const inputEl = inputElRef.current;

      if (inputEl === null) {
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        try {
          const item = await handleTodoPost(
            () =>
              TodoApi.postItem({
                id: Date.now().toString(32).slice(1, 10),
                text: inputEl.value,
                isDone: false,
              }),
            "addData",
          );
          handleTodoListFetch((prev) => (prev ? [...prev, item] : [item]));
          inputEl.value = "";
        } catch (e) {
          alert((e as Error).message);
        } finally {
          inputEl.focus();
        }
      }
    },
    [handleTodoPost, handleTodoListFetch],
  );

  const isDisabled = useMemo(
    () => todoPostState.status === IRenderState.DataHandlingStatus.IN_PROGRESS,
    [todoPostState.status],
  );

  return (
    <form className={cx("container")}>
      <input
        type="text"
        className={cx("container__inp-text")}
        onKeyDown={handleInputKeydown}
        disabled={isDisabled}
        ref={inputElRef}
        placeholder="Please enter it here."
      />
      <p className={cx("container__remaining")}>
        {renderTodoListFetch(
          (data) => {
            const total = data.length;
            const doneCount = data.filter((item) => item.isDone).length;
            return `${doneCount}/${total}`;
          },
          "0/0",
          "0/0",
          "0/0",
        )}
      </p>
    </form>
  );
}
