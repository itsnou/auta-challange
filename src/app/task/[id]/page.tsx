'use client'

import styles from "../../page.module.css";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import type { ITask } from "@/interfaces/ITask";
import { useState, useEffect, Suspense } from "react";
import FormTodo from "@/components/FormTodo";
import { CircularProgress } from "@mui/material";

export default function TaskById({ params }: { params: { id: string } }) {
  const [task, setTask] = useState<ITask>()

  useEffect(() => {
    const fetchData = () => {
      const unsub = onSnapshot(doc(db, "tasks", params.id), (doc) => {
        const taskById = doc.data()
        if(taskById){
          setTask({
            id: params.id,
            title: taskById.title,
            description: taskById.description,
            status: taskById.status
          });
        }
      });
      return () => unsub()
    }
    fetchData()
  }, [params.id])

  return (
    <section className={styles.container}>
      <div className={styles.textCenter}>
        <h3>Task id: {params.id}</h3>
      </div>
      <div className={styles.form}>
        {
          task ? <FormTodo task={task} /> : <CircularProgress />
        }
      </div>
    </section>
  )
}