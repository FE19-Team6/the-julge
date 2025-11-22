"use client";

import styles from "./Footer.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>© codeit - 2025</div>

      <div className={styles.center}>
        <span>Privacy Policy</span>
        <span>FAQ</span>
      </div>

      <div className={styles.right}>
        <Image
          src="/icons/envelope-square.svg"
          alt="email"
          width={20}
          height={20}
        />
        <Image
          src="/icons/facebook.svg"
          alt="facebook"
          width={20}
          height={20}
        />
        <Image
          src="/icons/instagram.svg"
          alt="instagram"
          width={20}
          height={20}
        />
      </div>
    </footer>
  );
}
