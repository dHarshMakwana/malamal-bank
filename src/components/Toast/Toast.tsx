"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, cloneElement } from "react";
import { ToastIcon, Toaster, toast } from "react-hot-toast";
import s from "./toast.module.scss";

const CustomToaster = (): JSX.Element => (
  <Toaster position="bottom-right">
    {(t) => {
      const icon = <ToastIcon toast={t} />;

      return (
        <AnimatePresence>
          {t.visible && (
            <motion.div
              className={s.toast}
              initial={{ scale: 0.6, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.6, opacity: 0, y: 20 }}
            >
              <>
                {cloneElement(icon, { className: s.icon })}
                <span className={s.message}>{t.message as ReactNode}</span>
                {t.type !== "loading" && (
                  <button
                    className={s.content}
                    onClick={() => toast.dismiss(t.id)}
                  >
                    X
                  </button>
                )}
              </>
            </motion.div>
          )}
        </AnimatePresence>
      );
    }}
  </Toaster>
);

export default CustomToaster;
