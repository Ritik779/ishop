"use client"

import PageHeader from '@/components/admin/PageHeader'
import { axiosInstance } from '@/library/helper'
import { updateAdminData } from '@/redux/slices/AdminSlice'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { AiFillLock } from 'react-icons/ai'
import { BiHide, BiShow } from 'react-icons/bi'
import { FaTachometerAlt, FaUserAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export default function UpdateAdmin() {

    const tabs = ["Update Profile", "Change Password"];
    const admin = useSelector(store => store.admin)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("Update Profile");

    const UpdateProfile = async (e) => {
        e.preventDefault()
        setLoading(true)
        let type = ""
        if (e.target.type.value == "Super Admin") {
            type = 1
        }
        else if (e.target.type.value == "Sub Admin") {
            type = 2
        }
        else if (e.target.type.value == "Staff") {
            type = 3
        } else {
            type = ""
        }

        const name = e.target.name.value
        const email = e.target.email.value
        const contact = e.target.contact.value

        if (!name || !email || !contact || !type) {
            toast.error("All fields are required");
            setLoading(false);
            return;
        }

        const data = { name, email, contact, type }

        try {
            const res = await axiosInstance.put(`/admin/update_profile/${admin?.data?._id}`, data);
            if (res.data.flag === 1) {
                toast.success(res.data.message);
                if (res.data.admin ) {
                    dispatch(updateAdminData({ admin: res.data.admin }));
                } else {
                    console.error("admin data is missing in response");
                }
                e.target.reset();
                router.push("/admin/admins")
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Internal Server Error");
        }

        setLoading(false);
    }

    const options = [
        { name: "Super Admin" },
        { name: "Sub Admin" },
        { name: "Staff" }
    ]


    // Change Password Code
    const newPasswordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // change password Handler
    const ChangePassword = (e) => {
        e.preventDefault();
        setError("");

        const newPassword = newPasswordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (!newPassword || !confirmPassword) {
            setError("All fields are required");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("New password and confirm password do not match");
            return;
        }
        const data = {
            newpassword: newPassword
        }
        axiosInstance.post(`/admin/update_password/${admin.data?._id}`, data)
            .then(
                (response) => {
                    if (response.data.flag == 1) {
                        toast.success(response.data.message)
                        e.target.reset()
                    }
                }
            ).catch(
                (err) => {
                    toast.error(response.data.message)
                }
            )
    };

    return (
        <div className="p-6 col-span-4">
            <PageHeader breadcurms={["Dashboard", "Admin", "Edit"]} name={"Edit Admin"} button={{ text: "Back To View", url: "/admin/admins" }} />
            {/* Tabs */}
            <div className="mt-10">
                <ul className="flex flex-wrap justify-center space-x-4">
                    {tabs.map((tab) => (
                        <li
                            key={tab}
                            className={`cursor-pointer bg-white font-semibold px-6 py-2 rounded-md flex items-center space-x-2 transition ${activeTab === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === "Update Profile" && <FaTachometerAlt />}
                            {tab === "Change Password" && <FaUserAlt />}
                            <span>{tab}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-4 p-4 shadow-lg rounded-2xl border">
                {activeTab === "Update Profile" && (
                    <div className="flex justify-center items-center">
                        <div className="p-6 shadow-lg rounded-2xl bg-white w-[70%]">
                            <h2 className="text-2xl font-semibold text-center flex items-center justify-center gap-2">
                                <AiFillLock /> Change Password
                            </h2>
                            <form onSubmit={UpdateProfile} className="mt-6">
                                <div className="mb-4 relative">
                                    <label className="block text-sm font-medium">Admin Name</label>
                                    <input
                                        name='name'
                                        type="text"
                                        defaultValue={admin?.data?.name}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                                    />
                                </div>

                                <div className="mb-4 relative">
                                    <label className="block text-sm font-medium">Admin Email</label>
                                    <input
                                        name='email'
                                        type="text"
                                        defaultValue={admin?.data?.email}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                <div className="mb-4 relative">
                                    <label className="block text-sm font-medium">Admin Contact</label>
                                    <input
                                        name='contact'
                                        type="text"
                                        defaultValue={admin?.data?.contact}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                <div className="mb-4 relative">
                                    <label className="block text-sm font-medium">Admin Type</label>
                                    <select name="type" id="type" className='w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300'>
                                        <option value="">{admin?.data?.type == 1 && "Super Admin"}{admin?.data?.type == 2 && "Sub Admin"}{admin?.data?.type == 3 && "Staff"}</option>
                                        {
                                            options.map(
                                                (opt,i) =>{
                                                    return <option value={opt.name}>{opt.name}</option>
                                                }
                                            )
                                        }
                                    </select>
                                </div>

                                <button type="submit" disabled={loading ? true : false} className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700">
                                    {loading ? "Updating" : "Submit"}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                {activeTab === "Change Password" && (
                    <div className="flex justify-center items-center">
                        <div className="p-6 shadow-lg rounded-2xl bg-white w-[70%]">
                            <h2 className="text-2xl font-semibold text-center flex items-center justify-center gap-2">
                                <AiFillLock /> Change Password
                            </h2>
                            <form onSubmit={ChangePassword} className="mt-6">
                                <div className="mb-4 relative">
                                    <label className="block text-sm font-medium">New Password</label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        ref={newPasswordRef}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-9 text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <BiHide /> : <BiShow />}
                                    </button>
                                </div>

                                <div className="mb-4 relative">
                                    <label className="block text-sm font-medium">Confirm Password</label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        ref={confirmPasswordRef}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                                    />
                                </div>

                                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                                <button type="submit" className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700">
                                    Change Password
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}


// const DataHandler = ({ isOpen, onSave, onClose, admin }) => {
//     const options = [
//         { name: "Super Admin" },
//         { name: "Sub Admin" },
//         { name: "Staff" }
//     ]

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         let type = ""
//         if (e.target.type.value == "Super Admin") {
//             type = 1
//         }
//         else if (e.target.type.value == "Sub Admin") {
//             type = 2
//         }
//         else if (e.target.type.value == "Staff") {
//             type = 3
//         } else {
//             type = ""
//         }

//         const name = e.target.name.value
//         const contact = e.target.contact.value
//         const email = e.target.email.value
//         if (admin.data?.name == name && admin.data?.contact == contact && admin.data?.email == email || admin?.data?.type == type) {
//             return toast.error("Data Not Updated")
//         }
//         const data = { name, contact, email, type }
//         e.target.reset();
//         onSave(data)
//         onClose();
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-5 rounded-lg shadow-lg w-96">
//                 <h2 className="text-lg font-bold mb-4">Add Address</h2>
//                 <form onSubmit={handleSubmit} className="space-y-3">
//                     <div>
//                         <label htmlFor="name" className="font-semibold">Name</label>
//                         <input type="text" name="name" defaultValue={admin.data?.name} placeholder="Name" className="w-full p-2 border rounded" />
//                     </div>
//                     <div>
//                         <label htmlFor="contact" className="font-semibold">Phone Number</label>
//                         <input type="text" name="contact" defaultValue={admin.data?.contact} placeholder="contact Number" className="w-full p-2 border rounded" />
//                     </div>
//                     <div>
//                         <label htmlFor="email" className="font-semibold">Email</label>
//                         <input type="email" name="email" defaultValue={admin.data?.email} placeholder="Email" className="w-full p-2 border rounded" />
//                     </div>
//                     <div>
//                         <label htmlFor="type" className="font-semibold">Email</label>
//                         <select value={admin?.data?.type} name="type" id="type" className='appearance-none bg-gray-200 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'>
//                             <option value="">Select Type</option>
//                             {
//                                 options.map(
//                                     (item, index) => <option value={item.name}>{item.name}</option>
//                                 )
//                             }
//                         </select>
//                     </div>
//                     <div className="flex justify-between mt-4">
//                         <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Save</button>
//                         <button type="button" onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded">Cancel</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }