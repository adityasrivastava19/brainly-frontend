import { Input } from "../component/ui/inputBox";
import { Button } from "../component/ui/Button";
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
type FormValues = {
    username: string;
    password: string;
    confirmpassword:string
};

type ApiResponse = {
    message?: string | { message?: string }[];
};
// function to send data to the backend
async function singup(data: FormValues) {
    const res = await fetch("http://localhost:3000/api/v1/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: data.username,
            password: data.password,
        }),
    });

    const result = await res.json();
    return { res, result };
}

export function Signup() {
    const navigate = useNavigate();
    const [response, setResponse] = useState<ApiResponse | null>(null);
    const[backEndError,setError]=useState<boolean>(false);
    async function onsubmit(data: FormValues) {
        const { res, result } = await singup(data);
        setResponse(result);

        if (res.ok) {
            navigate("/dashboard");
        }
        else{
            setError(true)
        }
    }
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>();
    return (
        <div>
        <div className="h-screen w-screen bg-slate-200 flex justify-center items-center ">
                <div className="bg-white min-h-100  min-w-80 shadow shadow-md">
                    <div className="flex justify-center">
                        <div >
                       <h1 className="text-2xl font-semibold">
                            SIGN UP
                        </h1>
                    </div>
                    </div>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <div className="mt-8">
                            <Input type="text" placeholder="UserName" res={register("username",{required:"please enter the username"})}/>
                            
                        </div>
                        <div className="mt-8 mb-8">
                            <Input type="password" placeholder="password" res={register("password",{required:"please enter the password"})}/>
                            
                        </div>
                            <div className="mt-8 mb-8 ">
                                <Input type="password" placeholder="confirm password" res={register("confirmpassword",{required:"confirm the password",
                                    validate:(value)=>
                                        value===watch("password")||"password does not match"
                                })}/>
                                
                            </div>
                        <div className="flex justify-center mb-4">
                            <Button variant="primary" size="login" loading={false} text="Log In" type="submit"/>
                        </div>
                    </form>
                    <div className="flex justify-center mb-4 text-gray-700">
                    <div>
                        <p >
                            Already have an account? 
                        </p>
                    </div>
                    <div>
                        <a href="/signin" className="text-blue-500 hover:underline">Sign up</a>
                    </div>
                </div>
                    <div>
                    <div className="flex justify-center">
                            {errors.username && <p className="text-red-600 text-sm">{errors.username.message}</p>}
                            </div>
                            <div className=" flex justify-center ">
                            {!errors.username&&errors.password && <div><p className="text-red-600 text-sm">{errors.password.message}</p></div>}
                            </div>
                                <div className="flex justify-center">
                                {!errors.password&&errors.confirmpassword && <p className="text-red-600 text-sm">{errors.confirmpassword.message}</p>}
                                </div>
                        </div>
                                
                </div>
                </div>
                {backEndError && response && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div
                            className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
                            <h2  className="text-lg font-semibold text-red-600">
                                Signup failed
                            </h2>
                            <div className="mt-3 space-y-1 text-sm text-slate-700">
                                {Array.isArray(response.message) ? (
                                    response.message.map((error, index) => (
                                        <p key={index}>{error.message}</p>
                                    ))
                                ) : (
                                    <p>{response.message}</p>
                                )}
                            </div>
                            <div className="mt-5 flex justify-end">
                               <Button variant="primary" type="button" size="md" text="Close" onClick={()=>{setError(false)}}/>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}