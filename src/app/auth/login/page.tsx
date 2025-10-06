'use client'

import { Status } from "@/lib/global/types/global-type";
import { teacherLogin } from "@/lib/store/auth/auth-slice";
import { IAuthLoginData } from "@/lib/store/auth/auth-type";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { redirect, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";


function Login() {
    const router = useRouter();
    const dispatch = useAppDispatch()
    const { status, authData } = useAppSelector((store) => store.auth)

    const [data, setData] = useState<IAuthLoginData>({
        teacherInstituteNumber: "",
        teacherEmail: "",
        teacherPassword: "",
    })
    // console.log(data,"dataaa")
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value,
        })
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(teacherLogin(data))
    }


    useEffect(() => {
        if (status === Status.SUCCESS && authData?.teacherToken) {
            router.push("/teacher/dashboard");
        } else {
            router.push("/auth/login");
        }
    }, [status, authData?.teacherToken]);

    return (
        <>
            <div>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link href="./output.css" rel="stylesheet" />
                <title>Login</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                    rel="stylesheet"
                />
                <div className="h-screen w-screen flex justify-center items-center dark:bg-gray-900">
                    <div className="grid gap-8">
                        <div
                            id="back-div"
                            className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4"
                        >
                            <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
                                <h1 className="pt-8 pb-6 font-bold dark:text-gray-400 text-5xl text-center cursor-default">
                                    Teacher Login
                                </h1>
                                <form
                                    onSubmit={handleSubmit}
                                    action="#"
                                    method="post"
                                    className="space-y-4"
                                >
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="mb-2  dark:text-gray-400 text-lg"
                                        >
                                            Email
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            id="email"
                                            name="teacherEmail"
                                            className="border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                                            type="email"
                                            placeholder="Email"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="mb-2 dark:text-gray-400 text-lg"
                                        >
                                            Password
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            id="password"
                                            name="teacherPassword"
                                            className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                                            type="password"
                                            placeholder="Password"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="instituteNumber"
                                            className="mb-2 dark:text-gray-400 text-lg"
                                        >
                                            Institute No.
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            id="instituteNumber"
                                            name="teacherInstituteNumber"
                                            className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                                            type="instituteNumber"
                                            placeholder="instituteNumber"
                                            required
                                        />
                                    </div>
                                    <a
                                        className="group text-blue-400 transition-all duration-100 ease-in-out"
                                        href="#"
                                    >
                                        <span className="bg-left-bottom bg-gradient-to-r text-sm from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                                            Forget your password?
                                        </span>
                                    </a>
                                    <button
                                        className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                                        type="submit"
                                    >
                                        LOG IN
                                    </button>
                                </form>
                                <div className="flex flex-col mt-4 items-center justify-center text-sm">
                                    <h3 className="dark:text-gray-300">
                                        Login for Teacher
                                    </h3>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;