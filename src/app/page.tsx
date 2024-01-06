import classNames from "classnames/bind";
import { InputForm } from "../containers/input-form/input-form";
import { List } from "../containers/list/list";
import styles from "./page.module.scss";

const cx = classNames.bind(styles);

export default function Home() {
  return (
    <main className={cx("container")}>
      <InputForm />
      <List />
    </main>
  );
}
