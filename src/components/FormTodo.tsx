import { useForm } from "react-hook-form";
import type { ITask } from "@/interfaces/ITask";
import "../styles/formAdd.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Switch,FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";

export default function FormTodo({task}: {task?:ITask}) {
  const [status, setStatus] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: task?.id ? {
      title: task.title,
      description: task.description
    } : {
      title: "",
      description: ""
    }
  });

  useEffect(() => {
    if(task?.id){
      setStatus(task?.status)
    }
  }, [task])

  const loadData = async(data: ITask):Promise<void> => {
    if(task?.id) {
      await updateDoc(doc(db, 'tasks', task.id), {
        description: data.description,
        title: data.title,
        status
      })
    }else {

    }
  }


  return (
    <form
      onSubmit={handleSubmit((data) => {
        loadData(data as ITask);
      })}
    >
      <label>Titulo</label>
      <input {...register("title",  { required: true })}  />
      {errors.title && <p>El campo titulo es obligatorio</p>}
      <label>Descripcion</label>
      <input
        {...register("description", { required: true })}
      />
      {errors.description && <p>El campo descripción es obligatorio</p>}
      <div className="">
        {
          task?.id &&
          <FormControlLabel 
            control={
              <Switch
                checked={status}
                onChange={() => setStatus(!status)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label="Estado"
          />
        }
      </div>
      <input type="submit" />
    </form>
  );
}