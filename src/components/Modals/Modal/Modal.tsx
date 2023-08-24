import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import s from "./modal.module.scss";
import Portal from "../../Portal";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children?: any;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    // <Portal>
      <AnimatePresence>
        {open && (
          <motion.div
            className={s.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={s.modal}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
            >
              <button className={s.closeButton} onClick={onClose}>
                &times;
              </button>
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    // </Portal>
  );
};

export default Modal;
