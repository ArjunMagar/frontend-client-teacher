"use client";


import { Status } from "@/lib/global/types/global-type";
import { createChapters, resetStatus } from "@/lib/store/chapter/chapter-slice";
import { Ichapter } from "@/lib/store/chapter/chapter-slice.types";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

type ModalProps = {
    closeModal: () => void;
};

function Modal({ closeModal }: ModalProps) {
    const { status } = useAppSelector((store) => store.chapter);
    const dispatch = useAppDispatch();
    const { courseId } = useParams<{ courseId: string }>()

    const [loading, setLoading] = useState(false);

    const [data, setData] = useState<Ichapter>({
        chapterName: "",
        chapterDuration: "",
        chapterLevel: ""
    })
    console.log(data, "Data.........");

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value,
        });
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(createChapters(token, courseId, data));
        }
    };
    useEffect(() => {
        if (status === Status.SUCCESS) {
            dispatch(resetStatus());
            setLoading(false);
            closeModal();
        }
    }, [status]);



    return (
        <>
            <div
                className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-40 flex items-center justify-center"

            >
                {/* overlay */}
                <div
                    onClick={closeModal}
                    aria-hidden="true"
                    className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"
                ></div>
                {/* Modal Content */}
                <div
                    className="bg-white w-full max-w-2xl mx-4 p-6 rounded-lg shadow-lg relative"
                    onClick={(e) => e.stopPropagation()} // 👈 This prevents closing when clicking inside the modal
                >
                    {/* Close Button */}
                    <button
                        onClick={closeModal}
                        className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
                    >
                        &times;
                    </button>

                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Add Chapter
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        action="#"
                        method="POST"
                        className="space-y-4"
                    >
                        {/* ChapterName */}
                        <div>
                            <label
                                htmlFor="chapterName"
                                className="block font-semibold text-gray-700 mb-1"
                            >
                                Chapter Name
                            </label>
                            <input
                                onChange={handleChange}
                                type="text"
                                id="chapterName"
                                name="chapterName"
                                required
                                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type Chapter Name..."
                            />
                        </div>
                        {/* ChapterDuration */}
                        <div>
                            <label
                                htmlFor="chapterDuration"
                                className="block font-semibold text-gray-700 mb-1"
                            >
                                Chapter Duration
                            </label>
                            <input
                                onChange={handleChange}
                                type="text"
                                id="chapterDuration"
                                name="chapterDuration"
                                required
                                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type Chapter Duration..."
                            />
                        </div>
                        {/* ChapterLevel */}
                        <div>
                            <label
                                htmlFor="chapterLevel"
                                className="block font-semibold text-gray-700 mb-1"
                            >
                                Chapter Level
                            </label>
                            <select
                                onChange={handleChange}
                                id="chapterLevel"
                                name="chapterLevel"
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="" hidden>Select Level</option>
                                <option value="beginner" >Beginner</option>
                                <option value="intermediate" >Intermediate</option>
                                <option value="advance" >Advance</option>
                            </select>
                        </div>
                        {/* Submit */}
                        <div className="text-center">
                            <button
                                disabled={loading}
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2.5 rounded-md font-semibold hover:bg-blue-700 transition"
                            >
                                {loading ? "Creating..." : "Create Chapter"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Modal;
