export interface ITask {
  id?: string
  title: string
  description: string
  status: boolean
}

export interface ITasksProps {
  tasks: ITask[],
  goRoute: Function,
  loading: boolean
}