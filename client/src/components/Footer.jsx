import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaFacebookF, FaLinkedin } from 'react-icons/fa'
import { AiFillGithub, AiOutlineTwitter, AiFillShopping, AiFillHeart } from 'react-icons/ai'
import { useSelector } from 'react-redux'

const Footer = () => {
    const { card_product_count, wishlist_count } = useSelector(state => state.card)
    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.auth)
    
    return (
        <footer className='bg-[#AFE1AF] text-[#283046] shadow-lg'>
            <div className='container mx-auto px-4 py-12'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {/* Company Info */}
                    <div className='space-y-4'>
                        <div className='flex items-center space-x-4'>
                            <img 
                                className='w-24 h-28 object-contain' 
                                src="http://localhost:3000/images/logo (3).png" 
                                alt="logo" 
                            />
                            <div>
                                <h2 className='text-xl font-bold'>Nusantara Culinary</h2>
                            </div>
                        </div>
                        <div className='space-y-2 opacity-80'>
                            <p>Address: Medan, Sumatera Utara</p>
                            <p>Phone: +6282267622725</p>
                            <p>Email: NusantaraCulinary@gmail.com</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
                            <ul className='space-y-2'>
                                <li>
                                    <Link 
                                        to="/about" 
                                        className='hover:text-[#FFC300] transition-colors duration-300'
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/about/shop" 
                                        className='hover:text-[#FFC300] transition-colors duration-300'
                                    >
                                        About our Shop
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/information" 
                                        className='hover:text-[#FFC300] transition-colors duration-300'
                                    >
                                        Delivery Information
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className='hover:text-[#FFC300] transition-colors duration-300'
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className='hover:text-[#FFC300] transition-colors duration-300'
                                    >
                                        Blogs
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className='text-lg font-semibold mb-4'>More Links</h3>
                            <ul className='space-y-2'>
                                <li>
                                    <Link 
                                        className='hover:text-[#FFC300] transition-colors duration-300'
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className='hover:text-[#FFC300] transition-colors duration-300'
                                    >
                                        Returns
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className='hover:text-[#FFC300] transition-colors duration-300'
                                    >
                                        Careers
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className='hover:text-[#FFC300] transition-colors duration-300'
                                    >
                                        FAQs
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className='hover:text-[#FFC300] transition-colors duration-300'
                                    >
                                        Gift Cards
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter & Social */}
                    <div className='space-y-6'>
                        <div>
                            <h3 className='text-lg font-semibold mb-4'>Join Our Newsletter</h3>
                            <p className='opacity-80 mb-4'>Get Email updates about our latest and shop specials offers</p>
                            <div className='relative'>
                                <input 
                                    placeholder='Enter your mail' 
                                    className='w-full px-4 py-3 border border-[#AFE1AF] rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#FFC300]' 
                                    type="email" 
                                />
                                <button className='absolute right-0 top-0 h-full px-6 bg-[#FFC300] text-[#283046] uppercase font-bold rounded-r-lg hover:bg-[#F9F6EE] transition-colors duration-300'>
                                    Subscribe
                                </button>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div>
                            <h3 className='text-lg font-semibold mb-4'>Connect With Us</h3>
                            <div className='flex space-x-4'>
                                {[
                                    { Icon: FaFacebookF, link: '#' },
                                    { Icon: AiOutlineTwitter, link: '#' },
                                    { Icon: FaLinkedin, link: '#' },
                                    { Icon: AiFillGithub, link: '#' }
                                ].map(({ Icon, link }, index) => (
                                    <a 
                                        key={index}
                                        href={link} 
                                        className='w-10 h-10 border border-[#AFE1AF] rounded-full flex items-center justify-center hover:bg-[#FFC300] hover:text-white transition-colors duration-300'
                                    >
                                        <Icon />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className='text-center mt-8 pt-6 border-t border-[#AFE1AF]'>
                    <p className='opacity-80'>Copyright ©2024 by Nusantara Culinary</p>
                </div>
            </div>

            {/* Floating Cart and Wishlist */}
            <div className='hidden md:block fixed bottom-4 right-4 z-50'>
                <div className='bg-white border border-[#AFE1AF] rounded-full p-2 shadow-lg'>
                    <div className='flex flex-col gap-3'>
                        <div 
                            onClick={() => navigate(userInfo ? '/card' : '/login')} 
                            className='relative cursor-pointer w-10 h-10 rounded-full bg-[#F9F6EE] border border-[#AFE1AF] flex items-center justify-center'
                        >
                            <AiFillShopping className='text-xl text-[#283046]' />
                            {card_product_count !== 0 && (
                                <div className='absolute -top-1 -right-1 bg-[#FFC300] text-[#283046] w-5 h-5 rounded-full flex items-center justify-center text-xs'>
                                    {card_product_count}
                                </div>
                            )}
                        </div>
                        <div 
                            onClick={() => navigate(userInfo ? '/dashboard/my-wishlist' : '/login')} 
                            className='relative cursor-pointer w-10 h-10 rounded-full bg-[#F9F6EE] border border-[#AFE1AF] flex items-center justify-center'
                        >
                            <AiFillHeart className='text-xl text-[#283046]' />
                            {wishlist_count !== 0 && (
                                <div className='absolute -top-1 -right-1 bg-[#FFC300] text-[#283046] w-5 h-5 rounded-full flex items-center justify-center text-xs'>
                                    {wishlist_count}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer