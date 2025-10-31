"use client";

import { Status } from "@/lib/global/types/global-type";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { createLesson, resetStatus } from "@/lib/store/lesson/lesson-slice";
import { Ilesson } from "@/lib/store/lesson/lesson-slice.types";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

type ModalProps = {
    closeModal: () => void;
};

function Modal({ closeModal }: ModalProps) {
    const { status } = useAppSelector((store) => store.chapter);
    const dispatch = useAppDispatch();
    const { chapterId } = useParams<{ chapterId: string }>()

    const [loading, setLoading] = useState(false);

    const [data, setData] = useState<Ilesson>({
        lessonName: "",
        lessonDescription: "",
        lessonVideoUrl: "",
        lessonThumbnailUrl: ""

    })
    console.log(data, "Data.........");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
            dispatch(createLesson(token, chapterId, data));
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
                        Add Lesson
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        action="#"
                        method="POST"
                        className="space-y-4"
                    >
                        {/* LessonName */}
                        <div>
                            <label
                                htmlFor="lessonName"
                                className="block font-semibold text-gray-700 mb-1"
                            >
                                Lesson Name
                            </label>
                            <input
                                onChange={handleChange}
                                type="text"
                                id="lessonName"
                                name="lessonName"
                                required
                                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type Lesson Name..."
                            />
                        </div>
                        {/* LessonDescription */}
                        <div>
                            <label
                                htmlFor="lessonDescription"
                                className="block font-semibold text-gray-700 mb-1"
                            >
                                Lesson Description
                            </label>
                            <input
                                onChange={handleChange}
                                type="text"
                                id="lessonDescription"
                                name="lessonDescription"
                                required
                                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type Lesson Description..."
                            />
                        </div>
                        {/* LessonVideoUrl */}
                        <div>
                            <label
                                htmlFor="lessonVideoUrl"
                                className="block font-semibold text-gray-700 mb-1"
                            >
                                Lesson VideoUrl
                            </label>
                            <input
                                onChange={handleChange}
                                type="text"
                                id="lessonVideoUrl"
                                name="lessonVideoUrl"
                                required
                                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type Lesson VideoUrl..."
                            />
                        </div>
                        {/* LessonThumbnailUrl */}
                        <div>
                            <label
                                htmlFor="lessonThumbnailUrl"
                                className="block font-semibold text-gray-700 mb-1"
                            >
                                Lesson ThumbnailUrl
                            </label>
                            <input
                                onChange={handleChange}
                                type="text"
                                id="lessonThumbnailUrl"
                                name="lessonThumbnailUrl"
                                required
                                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type Lesson ThumbnailUrl..."
                            />
                        </div>
                        {/* Submit */}
                        <div className="text-center">
                            <button
                                disabled={loading}
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2.5 rounded-md font-semibold hover:bg-blue-700 transition"
                            >
                                {loading ? "Creating..." : "Create Lesson"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Modal;
