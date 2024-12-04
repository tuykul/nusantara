import React, { useState, useEffect } from 'react'
import { FaFacebookF } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineGoogle } from 'react-icons/ai'
import { FiMail, FiLock, FiUser } from 'react-icons/fi'
import FadeLoader from 'react-spinners/FadeLoader'
import { useSelector, useDispatch } from 'react-redux'
import { customer_register, messageClear } from '../store/reducers/authReducer'
import toast from 'react-hot-toast'
import logo from '../assets/logo (3).png'

const Register = () => {
    const navigate = useNavigate()
    const { loader, successMessage, errorMessage, userInfo } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    
    const register = (e) => {
        e.preventDefault()
        dispatch(customer_register(state))
    }

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        if (userInfo) {
            navigate('/')
        }
    }, [successMessage, errorMessage])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-lg mx-auto">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
                        <div className="p-8 lg:p-12">
                            <div className="text-center">
                                <img src={logo} alt="Logo" className="h-32 mx-auto mb-6 transform hover:rotate-2 transition-transform duration-300"/>
                                <h2 className="text-3xl font-bold text-[#283046] mb-2">
                                    Buat Akun Baru
                                </h2>
                                <p className="text-[#283046]">Bergabunglah dengan kami hari ini</p>
                            </div>
                            
                            <form onSubmit={register} className="space-y-6 mt-8">
                                <div className="relative">
                                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#283046]"/>
                                    <input
                                        type="text"
                                        name="name"
                                        value={state.name}
                                        onChange={inputHandle}
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-[#AFE1AF] focus:border-[#FFC300] outline-none transition-all duration-300 text-[#283046] bg-[#F9F6EE]"
                                        placeholder="Nama Lengkap"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#283046]"/>
                                    <input
                                        type="email"
                                        name="email"
                                        value={state.email}
                                        onChange={inputHandle}
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-[#AFE1AF] focus:border-[#FFC300] outline-none transition-all duration-300 text-[#283046] bg-[#F9F6EE]"
                                        placeholder="Email Anda"
                                        required
                                    />
                                </div>
                                
                                <div className="relative">
                                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#283046]"/>
                                    <input
                                        type="password"
                                        name="password"
                                        value={state.password}
                                        onChange={inputHandle}
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-[#AFE1AF] focus:border-[#FFC300] outline-none transition-all duration-300 text-[#283046] bg-[#F9F6EE]"
                                        placeholder="Password"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-4 rounded-xl font-semibold transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    Daftar Sekarang
                                </button>
                            </form>

                            <div className="mt-8">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white text-gray-500">atau lanjutkan dengan</span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <button className="flex items-center justify-center px-4 py-3 border border-transparent rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors duration-200 group">
                                        <FaFacebookF className="text-white group-hover:scale-110 transition-transform duration-200"/>
                                    </button>
                                    <button className="flex items-center justify-center px-4 py-3 border border-transparent rounded-xl bg-red-600 hover:bg-red-700 transition-colors duration-200 group">
                                        <AiOutlineGoogle className="text-white group-hover:scale-110 transition-transform duration-200"/>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8 space-y-2 text-center">
                                <p className="text-gray-600">
                                    Sudah punya akun?{' '}
                                    <Link to="/login" className="font-semibold text-yellow-500 hover:text-yellow-600 transition-colors duration-200">
                                        Masuk Sekarang
                                    </Link>
                                </p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register