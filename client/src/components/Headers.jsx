import React, { useEffect, useState } from 'react'
import { GrMail } from 'react-icons/gr'
import { IoIosCall } from 'react-icons/io'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { FaLinkedinIn, FaFacebookF, FaUser, FaLock, FaList } from 'react-icons/fa'
import { AiOutlineTwitter, AiFillGithub, AiFillHeart, AiFillShopping } from 'react-icons/ai'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { get_card_products, get_wishlist_products } from '../store/reducers/cardReducer'

const Headers = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { categorys } = useSelector(state => state.home)
    const { userInfo } = useSelector(state => state.auth)
    const { card_product_count, wishlist_count } = useSelector(state => state.card)

    const { pathname } = useLocation()
    const [showShidebar, setShowShidebar] = useState(true);
    const [categoryShow, setCategoryShow] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [category, setCategory] = useState('')

    const search = () => {
        navigate(`/products/search?category=${category}&&value=${searchValue}`)
    }
    const redirect_card_page = () => {
        if (userInfo) {
            navigate(`/card`)
        } else {
            navigate(`/login`)
        }
    }

    useEffect(() => {
        if (userInfo) {
            dispatch(get_card_products(userInfo.id))
            dispatch(get_wishlist_products(userInfo.id))
        }
    }, [userInfo])

    return (
        <div className='w-full bg-[#F9F6EE] text-[#283046] font-sans'>
            {/* Top Header with Subtle Background */}
            <div className='header-top bg-[#AFE1AF] bg-opacity-20 md-lg:hidden'>
                <div className='w-[85%] lg:w-[90%] mx-auto'>
                    <div className='flex w-full justify-between items-center h-[50px] text-[#283046]'>
                        <ul className='flex justify-start items-center gap-8'>
                            <li className='flex relative justify-center items-center gap-2 text-sm after:absolute after:h-[18px] after:w-[1px] after:bg-[#283046] after:-right-[16px] hover:text-[#FFC300] transition-colors'>
                                <span><GrMail /></span>
                                <span>nusantara.culinary@gmail.com</span>
                            </li>
                            <span className='font-semibold'>Multi Vendor Culinary Marketplace</span>
                        </ul>
                        <div>
                            <div className='flex justify-center items-center gap-10'>
                                <div className='flex justify-center items-center gap-4'>
                                    {[FaFacebookF, AiOutlineTwitter, FaLinkedinIn, AiFillGithub].map((Icon, index) => (
                                        <a 
                                            key={index} 
                                            href="#" 
                                            className='text-[#283046] hover:text-[#FFC300] transition-colors'
                                        >
                                            <Icon />
                                        </a>
                                    ))}
                                </div>
                                {/* Language Dropdown with Modern Styling */}
                                <div className='flex group cursor-pointer text-[#283046] text-sm justify-center items-center gap-2 relative'>
                                    <img src="http://localhost:3000/images/language.png" alt="Language" className='w-6 h-6' />
                                    <span className='font-semibold'>Language</span>
                                    <span><MdOutlineKeyboardArrowDown /></span>
                                    <ul className='absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden border border-[#AFE1AF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10'>
                                        <li className='px-4 py-2 hover:bg-[#AFE1AF] hover:bg-opacity-20'>Bahasa</li>
                                        <li className='px-4 py-2 hover:bg-[#AFE1AF] hover:bg-opacity-20'>English</li>
                                    </ul>
                                </div>
                                {/* Login/Profile Section */}
                                {userInfo ? (
                                    <Link 
                                        to='/dashboard' 
                                        className='flex items-center gap-2 hover:text-[#FFC300] transition-colors'
                                    >
                                        <FaUser />
                                        <span className='font-semibold'>{userInfo.name}</span>
                                    </Link>
                                ) : (
                                    <Link 
                                        to='/login' 
                                        className='flex items-center gap-2 hover:text-[#FFC300] transition-colors'
                                    >
                                        <FaLock />
                                        <span className='font-semibold'>Login</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation with Soft Shadows and Hover Effects */}
            <div className='w-[85%] lg:w-[90%] mx-auto py-4'>
                <div className='flex justify-between items-center'>
                    {/* Logo Section */}
                    <Link to='/' className='transform hover:scale-105 transition-transform'>
                        <img 
                            src="http://localhost:3000/images/logo (3).png" 
                            alt="Nusantara Culinary Logo" 
                            className='h-36 object-contain'
                        />
                    </Link>

                    {/* Navigation Menu */}
                    <nav className='flex items-center space-x-6'>
                        {['Home', 'Shop', 'Blog', 'About', 'Contact'].map((item, index) => (
                            <Link 
                                key={index} 
                                to={`/${item.toLowerCase()}`}
                                className={`
                                    font-semibold 
                                    text-[#283046] 
                                    hover:text-[#FFC300] 
                                    transition-colors 
                                    relative 
                                    group
                                    ${pathname === `/${item.toLowerCase()}` ? 'text-[#FFC300]' : ''}
                                `}
                            >
                                {item}
                                <span 
                                    className='
                                        absolute 
                                        bottom-0 
                                        left-0 
                                        w-0 
                                        h-0.5 
                                        bg-[#FFC300] 
                                        group-hover:w-full 
                                        transition-all 
                                        duration-300
                                    '
                                />
                            </Link>
                        ))}
                    </nav>

                    {/* Icons and Action Buttons */}
                    <div className='flex items-center space-x-4'>
                        {/* Wishlist */}
                        <div 
                            onClick={() => navigate(userInfo ? '/dashboard/my-wishlist' : '/login')}
                            className='relative group cursor-pointer'
                        >
                            <AiFillHeart 
                                className='
                                    text-2xl 
                                    text-[#283046] 
                                    group-hover:text-[#FFC300] 
                                    transition-colors
                                '
                            />
                            {wishlist_count > 0 && (
                                <span className='
                                    absolute 
                                    -top-2 
                                    -right-2 
                                    bg-[#FFC300] 
                                    text-white 
                                    rounded-full 
                                    w-5 
                                    h-5 
                                    flex 
                                    items-center 
                                    justify-center 
                                    text-xs
                                '>
                                    {wishlist_count}
                                </span>
                            )}
                        </div>

                        {/* Cart */}
                        <div 
                            onClick={redirect_card_page}
                            className='relative group cursor-pointer'
                        >
                            <AiFillShopping 
                                className='
                                    text-2xl 
                                    text-[#283046] 
                                    group-hover:text-[#FFC300] 
                                    transition-colors
                                '
                            />
                            {card_product_count > 0 && (
                                <span className='
                                    absolute 
                                    -top-2 
                                    -right-2 
                                    bg-[#FFC300] 
                                    text-white 
                                    rounded-full 
                                    w-5 
                                    h-5 
                                    flex 
                                    items-center 
                                    justify-center 
                                    text-xs
                                '>
                                    {card_product_count}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Category Section */}
            <div className='w-[85%] lg:w-[90%] mx-auto mt-4'>
                <div className='flex space-x-6'>
                    {/* Categories Dropdown */}
                    <div className='w-1/4'>
                        <div 
                            onClick={() => setCategoryShow(!categoryShow)}
                            className='
                                bg-[#AFE1AF] 
                                text-[#283046] 
                                py-3 
                                px-4 
                                rounded-lg 
                                flex 
                                justify-between 
                                items-center 
                                cursor-pointer 
                                hover:bg-opacity-80 
                                transition-colors
                            '
                        >
                            <div className='flex items-center space-x-2'>
                                <FaList />
                                <span className='font-semibold'>All Categories</span>
                            </div>
                            <MdOutlineKeyboardArrowDown />
                        </div>
                        
                        {/* Category Dropdown Content */}
                        {!categoryShow && (
                            <div className='
                                mt-2 
                                bg-white 
                                border 
                                border-[#AFE1AF] 
                                rounded-lg 
                                shadow-md 
                                max-h-[400px] 
                                overflow-y-auto
                            '>
                                {categorys.map((c, i) => (
                                    <Link 
                                        key={i} 
                                        to={`/products?category=${c.name}`}
                                        className='
                                            flex 
                                            items-center 
                                            space-x-3 
                                            px-4 
                                            py-2 
                                            hover:bg-[#AFE1AF] 
                                            hover:bg-opacity-20 
                                            transition-colors
                                        '
                                    >
                                        <img 
                                            src={c.image} 
                                            alt={c.name} 
                                            className='w-10 h-10 rounded-full object-cover'
                                        />
                                        <span>{c.name}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Search Bar */}
                    <div className='w-3/4'>
                        <div className='
                            flex 
                            border 
                            border-[#AFE1AF] 
                            rounded-lg 
                            overflow-hidden 
                            focus-within:border-[#FFC300] 
                            transition-colors
                        '>
                            <select 
                                onChange={(e) => setCategory(e.target.value)}
                                className='
                                    bg-transparent 
                                    px-4 
                                    outline-none 
                                    border-r 
                                    border-[#AFE1AF]
                                '
                            >
                                <option value="">All Categories</option>
                                {categorys.map((c, i) => (
                                    <option key={i} value={c.name}>{c.name}</option>
                                ))}
                            </select>
                            
                            <input 
                                type="text" 
                                placeholder='What delicious dish are you craving?' 
                                className='
                                    flex-grow 
                                    px-4 
                                    py-3 
                                    bg-transparent 
                                    outline-none 
                                    text-[#283046] 
                                    placeholder-[#283046] 
                                    placeholder-opacity-50
                                '
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            
                            <button 
                                onClick={search}
                                className='
                                    bg-[#AFE1AF] 
                                    text-[#283046] 
                                    px-6 
                                    font-semibold 
                                    hover:bg-opacity-80 
                                    transition-colors
                                '
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Headers