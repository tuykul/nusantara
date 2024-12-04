import React, { useState } from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { 
    FaList, 
    FaChevronRight,
    FaDashcube,
    FaShoppingCart,
    FaHeart,
    FaCommentAlt,
    FaLock,
    FaSignOutAlt
} from 'react-icons/fa'
import api from '../api/api'
import { useDispatch } from 'react-redux'
import { user_reset } from '../store/reducers/authReducer'
import { reset_count } from '../store/reducers/cardReducer'

const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [filterShow, setFilterShow] = useState(false)

    const logout = async () => {
        try {
            await api.get('/customer/logout')
            localStorage.removeItem('customerToken')
            dispatch(user_reset())
            dispatch(reset_count())
            navigate('/login')
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const menuItems = [
        { icon: <FaDashcube />, text: 'Dashboard', link: '/dashboard' },
        { icon: <FaShoppingCart />, text: 'My Orders', link: '/dashboard/my-orders' },
        { icon: <FaHeart />, text: 'Wishlist', link: '/dashboard/my-wishlist' },
        { icon: <FaCommentAlt />, text: 'Chat', link: '/dashboard/chat' },
        { icon: <FaLock />, text: 'Change Password', link: '/dashboard/chage-password' }
    ]

    return (
        <div className='bg-[#F9F6EE] min-h-screen flex flex-col'>
            <Headers />
            <div className='flex-grow container mx-auto px-4 py-8'>
                {/* Mobile Menu Toggle */}
                <div className='md-lg:block hidden mb-4'>
                    <button 
                        onClick={() => setFilterShow(!filterShow)} 
                        className='flex items-center justify-center p-3 bg-[#AFE1AF] text-[#283046] hover:bg-[#FFC300] transition-colors duration-300 rounded-lg'
                    >
                        <FaList className='mr-2' /> Menu
                    </button>
                </div>

                <div className='flex md-lg:flex-col gap-6'>
                    {/* Sidebar */}
                    <div className={`
                        md-lg:fixed md-lg:z-50 md-lg:top-1/2 md-lg:transform md-lg:-translate-y-1/2 
                        md-lg:transition-all md-lg:duration-300 
                        ${filterShow ? 'md-lg:left-4' : 'md-lg:left-[-270px]'}
                        w-[270px] 
                        bg-white 
                        border border-[#AFE1AF] 
                        rounded-lg 
                        shadow-lg
                        md-lg:max-w-[270px]
                    `}>
                        <ul className='py-4 text-[#283046] px-4'>
                            {menuItems.map((item, index) => (
                                <li 
                                    key={index} 
                                    className={`
                                        flex justify-between items-center 
                                        py-3 px-3 
                                        rounded-md 
                                        transition-colors 
                                        duration-200
                                        ${location.pathname === item.link 
                                            ? 'bg-[#AFE1AF]/20 text-[#FFC300]' 
                                            : 'hover:bg-[#AFE1AF]/10'
                                        }
                                    `}
                                >
                                    <Link 
                                        to={item.link} 
                                        className='flex items-center gap-3 w-full'
                                    >
                                        <span className='text-xl'>{item.icon}</span>
                                        <span>{item.text}</span>
                                    </Link>
                                    <FaChevronRight className='text-sm opacity-50' />
                                </li>
                            ))}
                            <li 
                                onClick={logout} 
                                className='flex justify-between items-center py-3 px-3 hover:bg-red-100 rounded-md transition-colors duration-200 cursor-pointer group'
                            >
                                <div className='flex items-center gap-3'>
                                    <span className='text-xl text-red-500 group-hover:text-red-600'>
                                        <FaSignOutAlt />
                                    </span>
                                    <span className='text-[#283046] group-hover:text-red-600'>
                                        Logout
                                    </span>
                                </div>
                                <FaChevronRight className='text-sm opacity-50 group-hover:text-red-600' />
                            </li>
                        </ul>
                    </div>

                    {/* Content Area */}
                    <div className='flex-grow md-lg:w-full'>
                        <div className='bg-white rounded-lg shadow-md p-6 border border-[#AFE1AF]'>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard