import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Range } from 'react-range'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import { AiFillStar } from 'react-icons/ai'
import { CiStar } from 'react-icons/ci'
import { BsFillGridFill } from 'react-icons/bs'
import { FaThList } from 'react-icons/fa'
import ShopProducts from '../components/products/ShopProducts'
import Pagination from '../components/Pagination'
import { price_range_product, query_products } from '../store/reducers/homeReducer'
import { useDispatch, useSelector } from 'react-redux'

const Shops = () => {
    const { products, totalProduct, categorys, priceRange, parPage } = useSelector(state => state.home)

    const dispatch = useDispatch()
    const [pageNumber, setPageNumber] = useState(1)
    const [styles, setStyles] = useState('grid')
    const [filter, setFilter] = useState(false)
    const [category, setCategory] = useState('')
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

    const queryCategoey = (e, value) => {
        if (e.target.checked) {
            setCategory(value)
        } else {
            setCategory('')
        }
    }

    useEffect(() => {
        dispatch(
            query_products({
                low: state.values[0],
                high: state.values[1],
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
        <div className='bg-[#F9F6EE] text-[#283046]'>
            <Headers />
            <section className='relative h-[300px] overflow-hidden'>
                <div 
                    className='absolute inset-0 bg-cover bg-center filter brightness-50' 
                    style={{backgroundImage: `url("http://localhost:3000/images/banner/shop.gif")`}}
                ></div>
                <div className='relative z-10 flex flex-col justify-center items-center h-full text-white text-center'>
                    <h1 className='text-4xl font-light tracking-wider mb-4'>Nusantara Culinary</h1>
                    <div className='flex items-center space-x-3'>
                        <Link to='/' className='hover:text-[#FFC300] transition-colors'>Home</Link>
                        <MdOutlineKeyboardArrowRight />
                        <span className='text-[#FFC300]'>Products</span>
                    </div>
                </div>
            </section>

            <div className='container mx-auto px-4 py-12'>
                <div className='flex md:flex-col gap-8'>
                    {/* Sidebar */}
                    <div className={`w-1/4 md:w-full ${filter ? 'hidden md:block' : 'block'}`}>
                        {/* Category Filter */}
                        <div className='mb-8 border-b border-[#AFE1AF] pb-4'>
                            <h3 className='text-xl font-semibold mb-4'>Categories</h3>
                            <div className='space-y-2'>
                                {categorys.map((c, i) => (
                                    <div key={i} className='flex items-center'>
                                        <input 
                                            type="checkbox"
                                            id={c.name}
                                            checked={category === c.name}
                                            onChange={(e) => queryCategoey(e, c.name)}
                                            className='mr-3 text-[#FFC300] focus:ring-[#FFC300] focus:border-[#FFC300]'
                                        />
                                        <label 
                                            htmlFor={c.name} 
                                            className='text-[#283046] hover:text-[#FFC300] transition-colors'
                                        >
                                            {c.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className='mb-8 border-b border-[#AFE1AF] pb-4'>
                            <h3 className='text-xl font-semibold mb-4'>Price Range</h3>
                            <Range
                                step={1}
                                min={priceRange.low}
                                max={priceRange.high === priceRange.low ? priceRange.high + 1 : priceRange.hight}
                                values={state.values}
                                onChange={(values) => setState({ values })}
                                renderTrack={({ props, children }) => (
                                    <div {...props} className='w-full h-1 bg-[#AFE1AF] rounded'>
                                        {children}
                                    </div>
                                )}
                                renderThumb={({ props }) => (
                                    <div 
                                        {...props} 
                                        className='w-5 h-5 bg-[#FFC300] rounded-full shadow-md transform -translate-x-1/2 -translate-y-1/2'
                                    />
                                )}
                            />
                            <div className='text-center mt-4'>
                                <span className='text-[#283046]'>
                                    Rp{Math.floor(state.values[0])} - Rp{Math.floor(state.values[1])}
                                </span>
                            </div>
                        </div>

                        {/* Rating Filter */}
                        <div>
                            <h3 className='text-xl font-semibold mb-4'>Rating</h3>
                            <div className='space-y-2'>
                                {[5, 4, 3, 2, 1, 0].map((stars) => (
                                    <div 
                                        key={stars} 
                                        onClick={() => stars > 0 ? setRatingQ(stars) : resetRating()}
                                        className='flex items-center cursor-pointer hover:bg-[#AFE1AF]/20 p-2 rounded'
                                    >
                                        {[...Array(5)].map((_, i) => (
                                            <span 
                                                key={i} 
                                                className={`text-xl ${i < stars ? 'text-[#FFC300]' : 'text-[#283046]/30'}`}
                                            >
                                                {i < stars ? <AiFillStar /> : <CiStar />}
                                            </span>
                                        ))}
                                        {stars === 0 && <span className='ml-2 text-[#283046]/70'>Clear Filter</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className='w-3/4 md:w-full'>
                        {/* Mobile Filter Toggle */}
                        <div className='md:block hidden mb-4'>
                            <button 
                                onClick={() => setFilter(!filter)}
                                className='w-full py-2 bg-[#FFC300] text-[#283046] rounded hover:bg-[#FFC300]/90 transition-colors'
                            >
                                {filter ? 'Show Filters' : 'Hide Filters'}
                            </button>
                        </div>

                        {/* Products Header */}
                        <div className='flex justify-between items-center mb-6'>
                            <h2 className='text-xl font-medium text-[#283046]'>
                                {totalProduct} Products
                            </h2>
                            <div className='flex items-center space-x-4'>
                                <select 
                                    onChange={(e) => setSortPrice(e.target.value)}
                                    className='border border-[#AFE1AF] rounded px-3 py-2 text-[#283046] focus:border-[#FFC300]'
                                >
                                    <option value="">Sort By</option>
                                    <option value="low-to-high">Low to High Price</option>
                                    <option value="high-to-low">High to Low Price</option>
                                </select>
                                <div className='flex space-x-2'>
                                    <button 
                                        onClick={() => setStyles('grid')}
                                        className={`p-2 rounded ${styles === 'grid' ? 'bg-[#FFC300] text-[#283046]' : 'text-[#283046]/70 hover:bg-[#AFE1AF]/20'}`}
                                    >
                                        <BsFillGridFill />
                                    </button>
                                    <button 
                                        onClick={() => setStyles('list')}
                                        className={`p-2 rounded ${styles === 'list' ? 'bg-[#FFC300] text-[#283046]' : 'text-[#283046]/70 hover:bg-[#AFE1AF]/20'}`}
                                    >
                                        <FaThList />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid/List */}
                        <ShopProducts products={products} styles={styles} />

                        {/* Pagination */}
                        {totalProduct > parPage && (
                            <Pagination 
                                pageNumber={pageNumber} 
                                setPageNumber={setPageNumber} 
                                totalItem={totalProduct} 
                                parPage={parPage} 
                                showItem={Math.floor(totalProduct / parPage)} 
                            />
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Shops