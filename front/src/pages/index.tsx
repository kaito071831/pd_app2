import { NextPage } from "next";
import Link from "next/link";


const Home: NextPage = () => {
  return (
    <div>
      <h1>Sample</h1>
      <Link href="/sign_in">
        <a>ログイン</a>
      </Link>
    </div>
  )
}

export default Home;
