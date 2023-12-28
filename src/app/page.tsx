"use client";
import Image from "next/image";
import s from "./page.module.scss";
import logo from "/public/logo.png";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext.context";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const Home = () => {
  const { isUser } = useAuth();
  const router = useRouter();

  if (isUser()) {
    router.push("/home");
    toast.success("Already logged in");
  }

  return (
    <main className={s.container}>
      <div className={s.headline}>
        MALAMAL <br /> <span>BANK</span>
      </div>
      <div className={s.vertMove}>
        <Image alt="" src={logo} className={s.logo} priority />
      </div>
      <div className={s.btnGroup}>
        <Link href="/signup">
          <div className="btn-primary">Sign Up</div>
        </Link>
        <Link href="/login">
          <div className="btn-secondary">Log In</div>
        </Link>
      </div>
    </main>
  );
};

export default Home;
