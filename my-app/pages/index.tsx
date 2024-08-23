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
                    <Link href="userlist">Users</Link>
                </li>

                <br />
                <li>
                <Link href="/updateuser">updateuser</Link>
                    </li>
                    
                    <br />
                    <li>
 <Link href="/signout" >Signout </Link>
                    </li>

                    <br />
                    <li>
                        <Link  href="/createpost">CreatePost</Link>
                    </li>
            </ul>
        </nav>


        </div>
    )
}

export default Home;
