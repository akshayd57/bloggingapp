import { FC } from "react";

import Link from "next/link";

const Home:FC =()=>{

    return (


        <div>

        <nav>

            <ul>

                <li>
                    <Link href="/login">Login</Link>
                </li>
                <br />
                <li>
                    <Link href="/register">Register</Link>
                </li>
                <br />
                <li>
                    <Link href="user">Users</Link>
                </li>

                <br />
                <li>
                <Link href="protected/protectedpage">MY Profile</Link>
                </li>
            </ul>
        </nav>


        </div>
    )
}

export default Home;
