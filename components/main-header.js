import Link from "next/link";

import logoImg from '@/assets/logo.png';
// console.log("logoImg", logoImg);

export default function MainHeader() {

  return (
    <>
    <header>
        <Link href='/'>
            <img src={logoImg.src} alt="NextLevel Food" />
            NextLevel Food
        </Link>
    </header>

    <ul>
        <li>
            <Link href='/meals'>Browse Meals</Link>
        </li>
        <li>
            <Link href='/community'>Foodies Community</Link>
        </li>
    </ul>
    </>
  )
}
