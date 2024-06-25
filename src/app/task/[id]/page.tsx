'use client'

import styles from "../../page.module.css";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import type { ITask } from "@/interfaces/ITask";
import { useState, useEffect, Suspense } from "react";
import FormTodo from "@/components/FormTodo";
import { Button, CircularProgress } from "@mui/material";
import Link from "next/link";

export default function TaskById({ params }: { params: { id: string } }) {
  const [task, setTask] = useState<ITask>()
  const [loading, setLoading] = useState<boolean>(true)

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
        setLoading(false)
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
          loading ? <CircularProgress /> :
          task ? <FormTodo task={task} /> : 
          <div>
            <h3>Ups! No hay nada por aca!</h3>
            <Link href="/">
              <Button variant="contained" className={styles.btnBack}>Volver atras</Button>
            </Link>
          </div>
        }
      </div>
    </section>
  )
}