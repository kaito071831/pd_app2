import { NextPage } from "next";
import Link from "next/link";
import { Header } from "../components/header";


const Home: NextPage = () => {
  return (
    <div>
      <Header/>
      <Link href="/sign_in">
        <a>サインイン</a>
      </Link>
      <br />
      <Link href="/sign_up">
        <a>サインアップ</a>
      </Link>
    </div>
  )
}

export default Home;
