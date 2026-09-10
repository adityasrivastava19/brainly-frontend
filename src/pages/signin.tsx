import { Input } from "../component/ui/inputBox";
import { Button } from "../component/ui/Button";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type FormValues = {
    username: string;
    password: string;
};
type ApiResponse = {
    message?: string | { message?: string }[];
};
async function signin(data: FormValues) {
    const res = await fetch("http://localhost:3000/api/v1/signin", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const result=await res.json();
    return {res, result};
}

export function Signin() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const navigate = useNavigate();
    const [response,  setResponse]=useState<ApiResponse|null>(null);
    async function onsubmit(data: FormValues) {
        const {res,result} = await signin(data);
            setResponse(result);
        if (res.ok) {
                localStorage.setItem("token", result.token);
            navigate("/dashboard");
        }
    }

    return (
        <div className="h-screen w-screen bg-slate-200 flex justify-center items-center ">
            <div className="bg-white min-h-100 min-w-80 shadow shadow-md">
                <div className="flex justify-center">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Sign IN
                        </h1>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onsubmit)}>
                    <div className="mt-15">
                        <Input type="text" placeholder="UserName" res={register("username", { required: "Enter The Username" })} />
                        
                    </div>
                    <div className="mt-8 mb-8">
                        <Input type="password" placeholder="password" res={register("password", { required: "Enter The Password" })} />
                        
                    </div>
                    <div className="flex justify-center mb-5">
                        <Button variant="primary" size="login" loading={false} text="Log In" type="submit" />
                    </div>
                    <div>
                        <div className="flex justify-center">
                            {errors.username && <p className="text-red-600 text-sm">{errors.username.message}</p>}
                        </div>
                        <div className="flex justify-center ">
                            {!errors.username&&errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
                        </div>
                    </div>
                </form>
                <div className="flex justify-center mb-4 text-gray-700">
                    <div>
                        <p >
                            Don't have an account? 
                        </p>
                    </div>
                    <div>
                        <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
                    </div>
                </div>
                {response&&(
                        <div>
                            <div className="flex justify-center text-red-600 text-sm">

                                {
                                    Array.isArray(response.message)?(
                                        response.message.map((error,index)=>(
                                            <p key={index}>{error.message}</p>
                                        ))
                                    ):(
                                        <p>{response.message}</p>
                                    )
                                }
                            </div>

                        </div>
                    )}
            </div>
        </div>
    )
}