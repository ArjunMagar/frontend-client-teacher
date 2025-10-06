import TeacherSidebar from "../sidebar/teacher-sidebar"


function TeacherDashboard({ children }: Readonly<{ children: React.ReactNode }>) {

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.href = "/auth/login";
    }
    return (
        <div className="flex h-screen bg-gray-100">
            {/* sidebar */}
            <div className="hidden md:flex flex-col w-64 bg-gray-800 z-50">
                <div className="flex items-center justify-center h-16 bg-gray-900">
                    <span className="text-white font-bold uppercase">Teacher_Dashboard</span>
                </div>
                <TeacherSidebar />

            </div>
            {/* Main content */}
            <div className="flex flex-col flex-1 overflow-y-auto">
                <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200 py-8">
                    <div className="flex items-center px-4 ">
                        {/* <button className="text-gray-500 focus:outline-none focus:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button> */}
                        {/* <input className="mx-4 w-full border rounded-md px-4 py-2" type="text" placeholder="Search" /> */}
                    </div>
                    <div className="flex items-center pr-4">
                        <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                            Logout
                        </button>
                    </div>
                </div>
                {children}
            </div>
        </div>

    )
}

export default TeacherDashboard