import { MdClose } from "react-icons/md";
import styles from "./Modal.module.css";

interface ModalProps {
  title: string;
  stats: { lang: string; percent: string }[];
  onClose: () => void;
}

export const Modal = ({ title, stats, onClose }: ModalProps) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>  <MdClose /></button>
        <h2>{title}</h2>
        {stats.length === 0 ? (
          <p>No language data available</p>
        ) : (
          <ul className={styles.list}>
            {stats.map(({ lang, percent }) => (
              <li key={lang}>
                <strong>{lang}</strong>: {percent}%
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
