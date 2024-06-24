"use client"
import { useForm } from "react-hook-form";

import "../styles/formAdd.css";

export default function FormTodo() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: "",
      description: ""
    }
  });

  function loadData(data: {}):void {
    console.log(data)
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