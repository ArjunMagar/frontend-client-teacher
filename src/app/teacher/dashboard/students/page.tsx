"use client"

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useEffect } from "react";
import { fetchStudents } from "@/lib/store/student/student-slice";

function Student() {
  const dispatch = useAppDispatch()
  const { students } = useAppSelector((store) => store.student)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchStudents(token));
    }
  }, []);
  return (
    <>
      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Kerala User Listing Table</title>
        <div className="container mx-auto px-4 py-8">
          {/* {isModalOpen && <Modal closeModal={closeModal} />} */}
          {/* {isModalOpen1 && <Modal1 id={selectedId} closeModal1={closeModal1} />} */}
          <h1 className="text-3xl font-bold text-center mb-8">Students</h1>
          {/* Search and Add User (Static) */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Search users..."
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>
          {/* User Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-left">StudentName</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Course</th>
                  <th className="py-3 px-6 text-left">CreatedAt</th>
                  <th className="py-3 px-6 text-left">UpdatedAt</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {students.length > 0 &&
                  students.map((student) => {
                    return (
                      <tr
                        key={student.enrollmentId}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="py-3 px-6 text-left">
                          {student.enrollmentId}
                        </td>
                        <td className="py-3 px-6 text-left">
                          {student.username}
                        </td>
                        <td className="py-3 px-6 text-left">
                          {student.email}
                        </td>
                        <td className="py-3 px-6 text-left">
                          {student.courseName}
                        </td>
                        <td className="py-3 px-6 text-left">
                          {new Date(student.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-6 text-left">
                          {new Date(student.updatedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {/* Static Pagination */}
          <div className="flex justify-between items-center mt-6">
            <div>
              <span className="text-sm text-gray-700">
                Showing 1 to 5 of 5 entries
              </span>
            </div>
            <div className="flex space-x-2">
              <a href="https://abhirajk.vercel.app/" target="blank">
                <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 opacity-50">
                  Previous
                </button>
              </a>
              <a href="https://abhirajk.vercel.app/" target="blank">
                <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 opacity-50">
                  Next
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Student;