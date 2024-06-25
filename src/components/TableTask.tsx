import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from "../app/page.module.css";
import type { ITask } from '@/interfaces/ITask';
import { truncateText } from '@/utils/trunscateText';
import { useAppContext } from "@/context/loading";
import { CircularProgress, Tooltip } from '@mui/material';
import { db } from '@/firebase/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

export default function TableTask({ tasks, goRoute }: {tasks:ITask[], goRoute: Function}) {
  const { setLoading } = useAppContext()

  const deleteTask = async(e: Event,task: ITask) => {
    e.preventDefault()
    e.stopPropagation(); // Evitar la propagación del evento
    setLoading(true)
    try{
      if(task.id){
        await deleteDoc(doc(db, 'tasks', task.id?.toString()))
      }
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className={styles.table}>
      {
        tasks.length > 0 ? 
        (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Titulo de tarea</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
                <TableBody>
                  {tasks.map((task: ITask) => (
                    <TableRow
                      key={task.id}
                      hover
                      className={styles.tableBody}
                      onClick={() => goRoute(task.id)}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Tooltip title={task.title}>
                          <span>{truncateText(task.title)}</span>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip title={task.description}>
                          <span>{truncateText(task.description)}</span>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        {task.status ? 'Completado' : 'Pendiente'}
                      </TableCell>
                      <TableCell>
                        <button className={styles.btnDelete} onClick={(e) => deleteTask(e, task)}>
                          Borrar
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div className={styles.textCenter}>
            <CircularProgress />
          </div>
        )
      }
    </div>
  );
}