/* eslint-disable jsx-a11y/label-has-associated-control */

"use client";

import { ITodo as ITodoApi, Todo as TodoApi } from "@/src/apis";
import { ChangeEvent, useEffect } from "react";
import classNames from "classnames/bind";
import { IRenderState, useRenderState } from "react-render-state-hook";
import styles from "./list.module.scss";
import { SharedDataType, SharedKey } from "../common.interface";

const cx = classNames.bind(styles);

export function List() {
  const [, handleTodoUpdate, , todoUpdateState] = useRenderState<ITodoApi.Todo>();
  const [renderTodoList, handleTodoList, handleResetTodoList] = useRenderState<
    SharedDataType[SharedKey.TodoList]
  >(undefined, SharedKey.TodoList);

  useEffect(() => {
    // Initial Data Fetch
    handleTodoList(() => TodoApi.fetchList());
    return () => {
      handleResetTodoList();
    };
  }, [handleResetTodoList, handleTodoList]);

  const $content = renderTodoList(
    (data) => {
      const $list = data.map((todo) => {
        const { id, text, isDone } = todo;
        const isDisabled = todoUpdateState.status === IRenderState.DataHandlingStatus.IN_PROGRESS;

        const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
          try {
            await handleTodoUpdate(async () => {
              return TodoApi.putItem({
                ...todo,
                isDone: event.target.checked,
              });
            });
            handleTodoList((prev) => {
              if (prev === undefined) {
                return [];
              }
              return prev.map((prevItem) => {
                if (prevItem.id === id) {
                  return {
                    ...prevItem,
                    isDone: event.target.checked,
                  };
                }
                return prevItem;
              });
            });
          } catch (e) {
            // eslint-disable-next-line no-param-reassign
            event.target.checked = !event.target.checked;
            alert((e as Error).message);
          }
        };

        const handleClick = async () => {
          try {
            await handleTodoUpdate(async () => {
              return TodoApi.deleteItem(todo);
            });
            handleTodoList((prev) => {
              if (prev === undefined) {
                return [];
              }
              return prev.filter((prevItem) => {
                return prevItem.id !== id;
              });
            });
          } catch (e) {
            alert((e as Error).message);
          }
        };

        const inpKey = `inp/${id}/${isDone}`;

        return (
          <li className={cx("container__list__item")} key={id}>
            <label className={cx("container__list__item__content")}>
              <input
                key={inpKey}
                type="checkbox"
                className={cx("container__list__item__content__inp-done")}
                defaultChecked={isDone}
                onChange={handleChange}
                disabled={isDisabled}
              />
              <p className={cx("container__list__item__content__text")}>{text}</p>
            </label>
            <button
              type="button"
              className={cx("container__list__item__btn-delete")}
              onClick={handleClick}
              disabled={isDisabled}
            >
              DELETE
            </button>
          </li>
        );
      });
      return <ul className={cx("container__list")}>{$list}</ul>;
    },
    <div className={cx("container__status")}>Ready</div>,
    <div className={cx("container__status")}>Loading...</div>,
    <div className={cx("container__status")}>Oops, something went wrong!</div>,
  );

  return <div className={cx("container")}>{$content}</div>;
}