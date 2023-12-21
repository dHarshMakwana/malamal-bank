import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import s from "./burger.module.scss";
import Image from "next/image";
import logo from "/public/logo.png";
import {
  AiOutlineHome,
  AiOutlineQrcode,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineHistory,
} from "react-icons/ai";
import Link from "next/link";

interface HamburgerSidebarProps {}

const Burger: FC<HamburgerSidebarProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: "Home", icon: <AiOutlineHome />, route: "/home" },
    { name: "Qr Scan", icon: <AiOutlineQrcode />, route: "/qrscan" },
    { name: "Profile", icon: <AiOutlineUser />, route: "/profile" },
    { name: "Settings", icon: <AiOutlineSetting />, route: "/settings" },
    { name: "History", icon: <AiOutlineHistory />, route: "/history" },
  ];

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
              <div className={s.navItems}>
                {navItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ delay: index * 0.2 }}
                    onClick={handleToggle}
                  >
                    <Link href={item.route}>
                      <div className={s.navItem}>
                        {item.icon}
                        {item.name}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Burger;
