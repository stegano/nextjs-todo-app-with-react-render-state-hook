/* eslint-disable jsx-a11y/label-has-associated-control */

"use client";

import { ChangeEvent, useEffect, useMemo } from "react";
import classNames from "classnames/bind";
import { IRenderState, useRenderState } from "react-render-state-hook";
import { ITodo as ITodoApi, Todo as TodoApi } from "@/apis";
import Skeleton from "react-loading-skeleton";
import styles from "./list.module.scss";
import { SharedDataType, SharedKey } from "../common.interface";
import "react-loading-skeleton/dist/skeleton.css";

const cx = classNames.bind(styles);

export function List() {
  const [, handleTodoUpdate, , todoUpdateState] = useRenderState<ITodoApi.Todo>();
  const [renderTodoList, handleTodoList, handleResetTodoList] = useRenderState<
    SharedDataType[SharedKey.TODO_LIST]
  >(undefined, SharedKey.TODO_LIST);

  useEffect(() => {
    handleTodoList(() => TodoApi.fetchList(), "fetchInitData");
    return () => {
      handleResetTodoList();
    };
  }, [handleResetTodoList, handleTodoList]);

  const $indicator = useMemo(() => {
    return (
      <Skeleton
        width="100%"
        count={5}
        style={{ marginTop: 16, marginBottom: 16, borderRadius: 16 }}
        baseColor="#eee"
        highlightColor="#f3f3f3"
      />
    );
  }, []);

  const $content = renderTodoList(
    (data) => {
      const $list = data.map((todo) => {
        const { id, text, isDone } = todo;
        const isDisabled = todoUpdateState.status === IRenderState.DataHandlingStatus.IN_PROGRESS;

        const handleCheckButtonChange = async (event: ChangeEvent<HTMLInputElement>) => {
          try {
            await handleTodoUpdate(async () => {
              return TodoApi.putItem({
                ...todo,
                isDone: event.target.checked,
              });
            }, "updateData");
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

        const handleDeleteButtonClick = async () => {
          try {
            await handleTodoUpdate(async () => {
              return TodoApi.deleteItem(todo);
            }, "deleteData");
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
                onChange={handleCheckButtonChange}
                disabled={isDisabled}
              />
              <p className={cx("container__list__item__content__text")}>{text}</p>
            </label>
            <button
              type="button"
              className={cx("container__list__item__btn-delete")}
              onClick={handleDeleteButtonClick}
              disabled={isDisabled}
            >
              DELETE
            </button>
          </li>
        );
      });
      return <ul className={cx("container__list")}>{$list}</ul>;
    },
    $indicator,
    $indicator,
    <div className={cx("container__status")}>Oops, something went wrong!</div>,
  );

  return <div className={cx("container")}>{$content}</div>;
}
