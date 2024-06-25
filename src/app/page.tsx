"use client"
import styles from "./page.module.css";
import FormTodo from "@/components/FormTodo";
import { db } from "@/firebase/firebase";
import { useEffect, useState } from "react";
import {  query, collection, onSnapshot } from "firebase/firestore";
import TableTask from "@/components/TableTask";
import type { ITask } from "@/interfaces/ITask";
import { useRouter } from "next/navigation";

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchData = () => {
      const q = query(collection(db, 'tasks'))
      const unsubcribe = onSnapshot(q, (querySnapshot) => {
        let todosArr:ITask[] = []
        querySnapshot.forEach((task:any) => {
          todosArr.push({...task.data(), id:task.id})
        })
        setTasks(todosArr)
      })
      return () => unsubcribe();
    }
    fetchData()
  }, [])

  const goLink = (id: string) => {
    router.push(`/task/${id}`)
  }

  return (
    <main className={styles.container}>
      <div className={styles.heading}>
        <h3 className={styles.title}>Auta-challange</h3>
      </div>
      <div className={styles.form}>
        <FormTodo />
      </div>
      <div>
        <TableTask tasks={tasks} goRoute={goLink}/>
      </div>
    </main>
  );
}