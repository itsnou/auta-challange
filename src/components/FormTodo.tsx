'use client'
import { useForm } from "react-hook-form";
import type { ITask } from "@/interfaces/ITask";
import "../styles/formAdd.css";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Switch,FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/controllerStates";
import Button from '@mui/material/Button';
import { useRouter } from "next/navigation";

export default function FormTodo({task}: {task?:ITask}) {
  const [status, setStatus] = useState<boolean>(false)
  const { setLoading, setSnacker } = useAppContext()
  const router = useRouter()

  const {
    register,
    handleSubmit,
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
    setLoading(true)
    try{
      if(task?.id) {
        await updateDoc(doc(db, 'tasks', task.id), {
          description: data.description,
          title: data.title,
          status
        })
        router.push('/')
        setSnacker({
          color:'success',
          message: 'Tarea editada con exito!',
          open: true
        })
      }else {
        await addDoc(collection(db, 'tasks'), {
          title: data.title,
          description: data.description,
          status: false
        })
        setSnacker({
          color:'success',
          message: 'Tarea agregada con exito!',
          open: true
        })
      }
    }catch(error) {
      setSnacker({
        color:'error',
        message: 'Ups! Ocurrio un error inesperado, intenta nuevamente mas tarde',
        open: true
      })
    }finally{
      setLoading(false)
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
      <div>
        {
          task?.id &&
          <div className="container-status">
            <FormControlLabel 
              labelPlacement="top"
              control={
                <Switch
                  checked={status}
                  onChange={() => setStatus(!status)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="Estado"
            />
            <div>{!status ? 'Pendiente' : 'Completado'}</div>
          </div>
        }
      </div>
      <Button variant="contained" type="submit">
        Enviar
      </Button>
    </form>
  );
}