import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import s from "./burger.module.scss";
import Image from "next/image";
import logo from "/public/logo.png";

interface HamburgerSidebarProps {}

const Burger: FC<HamburgerSidebarProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={s.sidebarContainer}>
      <button className={s.hamburgerButton} onClick={handleToggle}>
        menu
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={s.sidebar}
          >
            <div className={s.container}>
              <div className={s.header}>
                <Image width={50} alt="" src={logo} />
                <div onClick={handleToggle}>close</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Burger;
