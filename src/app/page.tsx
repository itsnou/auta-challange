import styles from "./page.module.css";
import FormTodo from "@/components/FormTodo";

export default function Home() {

  return (
    <main className={styles.container}>
      <div className={styles.heading}>
        <h3>Auta-challange</h3>
      </div>
      <div className={styles.form}>
        <FormTodo />
      </div>
    </main>
  );
}
