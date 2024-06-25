import { useForm } from "react-hook-form";
import type { ITask } from "@/interfaces/ITask";
import "../styles/formAdd.css";

export default function FormTodo({task}: {task?:ITask}) {
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

  const loadData = async(data: {}):Promise<void> => {
    if(task?.id) {
      console.log('paso', task, data)
    }
  }


  return (
    <form
      onSubmit={handleSubmit((data) => {
        loadData(data);
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
      <input type="submit" />
    </form>
  );
}