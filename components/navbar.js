import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const router = useRouter();
  const setCurrentNav = (pathName) => {
    return router.pathname === pathName ? "active" : "";
  }

  return (
    <nav className={styles.nav}>
      <Link href="/">
        <span className={setCurrentNav('/')}>Home</span>
      </Link>
      <Link href="/about">
        <span className={setCurrentNav('/about')}>About</span>
      </Link>
      <style jsx>{
        `
          nav {
            background-color:tomato;
          }

          .active {
            color: yellow;
          }
        `
      }
      </style>
    </nav>
  )
}
