import Link from "next/link";
import Image from "next/image";
import MainHeaderBackground from "./main-header-background";

import logoImg from '@/assets/logo.png';
// console.log("logoImg", logoImg);
import classes from './main-header.module.css'

export default function MainHeader() {

  return (
    <>
    <MainHeaderBackground />
    <header className={classes.header}>
        <Link href='/' className={classes.logo}>
            <Image src={logoImg} alt="NextLevel Food" priority />
            NextLevel Food
        </Link>
    
        <nav className={classes.nav}>
            <ul >
                <li>
                    <Link href='/meals'>Browse Meals</Link>
                </li>
                <li>
                    <Link href='/community'>Foodies Community</Link>
                </li>
            </ul>
        </nav>
    </header>
    </>
  )
}
