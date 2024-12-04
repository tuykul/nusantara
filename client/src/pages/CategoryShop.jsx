import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Range } from 'react-range'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import Products from '../components/products/Products'
import { AiFillStar, AiOutlineFilter } from 'react-icons/ai'
import { CiStar } from 'react-icons/ci'
import { BsFillGridFill } from 'react-icons/bs'
import { FaThList } from 'react-icons/fa'
import ShopProducts from '../components/products/ShopProducts'
import Pagination from '../components/Pagination'
import { price_range_product, query_products } from '../store/reducers/homeReducer'
import { useDispatch, useSelector } from 'react-redux'

const CategoryShops = () => {
    let [searchParams, setSearchParams] = useSearchParams()
    const category = searchParams.get('category')
    const { products, totalProduct, latest_product, priceRange, parPage } = useSelector(state => state.home)

    const dispatch = useDispatch()
    const [pageNumber, setPageNumber] = useState(1)
    const [styles, setStyles] = useState('grid')
    const [filter, setFilter] = useState(false)
    const [state, setState] = useState({ values: [priceRange.low, priceRange.high] })
    const [rating, setRatingQ] = useState('')
    const [sortPrice, setSortPrice] = useState('')

    useEffect(() => {
        dispatch(price_range_product())
    }, [])

    useEffect(() => {
        setState({
            values: [priceRange.low, priceRange.high === priceRange.low ? priceRange.high + 1 : priceRange.hight]
        })
    }, [priceRange])

    useEffect(() => {
        dispatch(
            query_products({
                low: state.values[0] || '',
                high: state.values[1] || '',
                category,
                rating,
                sortPrice,
                pageNumber
            })
        )
    }, [state.values[0], state.values[1], category, rating, pageNumber, sortPrice])

    const resetRating = () => {
        setRatingQ('')
        dispatch(query_products({
            low: state.values[0],
            high: state.values[1],
            category,
            rating: '',
            sortPrice,
            pageNumber
        }))
    }

    return (
        <div className='bg-gradient-to-br from-[#F5F5DC] to-[#FAFAD2] min-h-screen'>
            <Headers />
            
            {/* Elegant Banner Section */}
            <section className='relative h-[350px] overflow-hidden'>
                <div 
                    className='absolute inset-0 bg-cover bg-center filter brightness-50 transform scale-105' 
                    style={{backgroundImage: "url('http://localhost:3000/images/banner/shop.gif')"}}
                ></div>
                <div className='relative z-10 flex flex-col justify-center items-center h-full text-white text-center px-4'>
                    <h1 className='text-5xl font-bold mb-6 tracking-wide drop-shadow-xl'>
                        Nusantara Culinary Shop
                    </h1>
                    <div className='flex items-center gap-3 text-xl'>
                        <Link to='/' className='hover:text-[#FFD700] transition-all duration-300 ease-in-out'>Home</Link>
                        <MdOutlineKeyboardArrowRight className='text-[#FFD700]' />
                        <span className='text-[#FFD700]'>Products</span>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className='py-16 container mx-auto px-4'>
                <div className='flex flex-wrap -mx-4'>
                    {/* Sidebar Filter */}
                    <div className={`w-full md:w-1/4 px-4 ${filter ? 'block' : 'hidden md:block'}`}>
                        <div className='bg-white shadow-2xl rounded-2xl p-6 border-2 border-[#8FBC8F] transition-all duration-300 hover:shadow-lg'>
                            {/* Price Range Filter */}
                            <div className='mb-8'>
                                <h2 className='text-2xl font-bold text-[#2F4F4F] mb-4 border-b-2 border-[#8FBC8F] pb-2'>Price Range</h2>
                                <Range
                                    step={1}
                                    min={priceRange.low}
                                    max={priceRange.high === priceRange.low ? priceRange.high + 1 : priceRange.hight}
                                    values={state.values}
                                    onChange={(values) => setState({ values })}
                                    renderTrack={({ props, children }) => (
                                        <div {...props} className='w-full h-3 bg-[#8FBC8F] rounded-full cursor-default'>
                                            {children}
                                        </div>
                                    )}
                                    renderThumb={({ props }) => (
                                        <div 
                                            {...props} 
                                            className='w-6 h-6 bg-[#FFD700] rounded-full shadow-lg transform -translate-y-1/2 hover:scale-110 transition-transform'
                                        />
                                    )}
                                />
                                <div className='mt-4 text-center'>
                                    <span className='text-[#2F4F4F] font-semibold'>
                                        Rp{Math.floor(state.values[0])} - Rp{Math.floor(state.values[1])}
                                    </span>
                                </div>
                            </div>

                            {/* Rating Filter */}
                            <div className='mb-8'>
                                <h2 className='text-2xl font-bold text-[#2F4F4F] mb-4 border-b-2 border-[#8FBC8F] pb-2'>Customer Ratings</h2>
                                <div className='space-y-3'>
                                    {[5, 4, 3, 2, 1].map((stars) => (
                                        <div 
                                            key={stars} 
                                            onClick={() => setRatingQ(stars)}
                                            className='flex items-center gap-2 cursor-pointer hover:bg-[#8FBC8F]/10 p-2 rounded-md transition-colors group'
                                        >
                                            {[...Array(5)].map((_, i) => (
                                                i < stars ? 
                                                    <AiFillStar key={i} className='text-[#FFD700] text-xl group-hover:scale-110 transition-transform' /> : 
                                                    <CiStar key={i} className='text-[#FFD700] text-xl group-hover:scale-110 transition-transform' />
                                            ))}
                                            <span className='text-[#2F4F4F] ml-2 group-hover:text-[#2F4F4F]/80'>& above</span>
                                        </div>
                                    ))}
                                    <div 
                                        onClick={resetRating}
                                        className='flex items-center gap-2 cursor-pointer hover:bg-[#8FBC8F]/10 p-2 rounded-md transition-colors group'
                                    >
                                        {[...Array(5)].map((_, i) => (
                                            <CiStar key={i} className='text-[#FFD700] text-xl group-hover:scale-110 transition-transform' />
                                        ))}
                                        <span className='text-[#2F4F4F] ml-2 group-hover:text-[#2F4F4F]/80'>Clear Filter</span>
                                    </div>
                                </div>
                            </div>

                            {/* Latest Products */}
                            <div className='hidden md:block'>
                                <Products title="Latest Products" products={latest_product} />
                            </div>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className='w-full md:w-3/4 px-4'>
                        {/* Mobile Filter Toggle */}
                        <div className='md:hidden flex justify-between items-center mb-6'>
                            <button 
                                onClick={() => setFilter(!filter)} 
                                className='flex items-center gap-2 bg-[#FFD700] text-[#2F4F4F] px-4 py-2 rounded-md hover:bg-[#FFD700]/90 transition-colors'
                            >
                                <AiOutlineFilter /> {filter ? 'Hide' : 'Show'} Filters
                            </button>
                        </div>

                        {/* Products Header */}
                        <div className='bg-white shadow-xl rounded-2xl p-4 mb-6 border-2 border-[#8FBC8F] flex justify-between items-center'>
                            <h3 className='text-lg font-semibold text-[#2F4F4F]'>
                                {totalProduct} Products Found
                            </h3>
                            <div className='flex items-center gap-4'>
                                <select 
                                    onChange={(e) => setSortPrice(e.target.value)}
                                    className='border-2 border-[#8FBC8F] px-3 py-2 rounded-md text-[#2F4F4F] focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/50 outline-none transition-all'
                                >
                                    <option value="">Sort By</option>
                                    <option value="low-to-high">Price: Low to High</option>
                                    <option value="high-to-low">Price: High to Low</option>
                                </select>
                                <div className='hidden md:flex items-center gap-2'>
                                    <button 
                                        onClick={() => setStyles('grid')} 
                                        className={`p-2 rounded-md transition-all ${styles === 'grid' ? 'bg-[#FFD700] text-[#2F4F4F] shadow-md' : 'text-[#2F4F4F] hover:bg-[#8FBC8F]/10'}`}
                                    >
                                        <BsFillGridFill />
                                    </button>
                                    <button 
                                        onClick={() => setStyles('list')} 
                                        className={`p-2 rounded-md transition-all ${styles === 'list' ? 'bg-[#FFD700] text-[#2F4F4F] shadow-md' : 'text-[#2F4F4F] hover:bg-[#8FBC8F]/10'}`}
                                    >
                                        <FaThList />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className='mb-8'>
                            <ShopProducts products={products} styles={styles} />
                        </div>

                        {/* Pagination */}
                        {totalProduct > parPage && (
                            <div className='flex justify-center'>
                                <Pagination 
                                    pageNumber={pageNumber} 
                                    setPageNumber={setPageNumber} 
                                    totalItem={totalProduct} 
                                    parPage={parPage} 
                                    showItem={Math.floor(totalProduct / parPage)} 
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default CategoryShops