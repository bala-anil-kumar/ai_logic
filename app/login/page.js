"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function LoginPage(){
    const route= useRouter();
    const [email,setEmail] =useState("");
    const [password,setPassword] =useState("");
    const [error, setError]=useState("");

    function handleForm(e){
        e.preventDefault();
        if (email ==="admin@test.com" && password==="admin123"){
          document.cookie = "isLogin=true; path=/";
          route.replace("/products");
        }
        else{
            setError("user not found");

        }

    }
    return(
        <form onSubmit={handleForm} >
            <h2>Login page</h2>
            <input type="email" 
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}


             
            />
            <input type="password"
            placeholder="password"
            onChange={(e)=>setPassword(e.target.value)}
            />
            {
                error && <p>{error}</p>
            }
            <button type="submit"> Login</button>

        </form>
    )


}