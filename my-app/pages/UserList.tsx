import { response} from "@/interface/response";
import { useSession } from "next-auth/react"
import { useState } from "react";
import { User } from "../interface/user";


const UserList=()=>{

const {data:session,status}=useSession();
const [user,setUser]=useState<User[]>([]);
const [loading,setLoading]=useState(true);

const [error,setError]=useState<string | null>(null)

console.log(status)


    return (

        <div>


        </div>
    )

}