import { CircularProgress } from "@mui/material";
import styles from '../styles/loading.module.css'

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <CircularProgress size={300} />
      </div>
    </div>
  )
}