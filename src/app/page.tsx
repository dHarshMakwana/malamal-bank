import Image from "next/image";
import s from "./page.module.scss";
import logo from "/public/logo.png";
import Link from "next/link";

const Home = () => {
  return (
    <main className={s.container}>
      <div className={s.headline}>
        MALAMAL <br /> <span>BANK</span>
      </div>
      <div className={s.vertMove}>
        <Image alt="" src={logo} width={320} height={320} />
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
