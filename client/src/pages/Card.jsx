import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { get_card_products, delete_card_product, messageClear, quantity_inc, quantity_dec } from '../store/reducers/cardReducer'

const Card = () => {
    const dispatch = useDispatch()
    const navegate = useNavigate()
    const { userInfo } = useSelector(state => state.auth)
    const { card_products, successMessage, price, buy_product_item, shipping_fee, outofstock_products } = useSelector(state => state.card)

    const redirect = () => {
        navegate('/shipping', {
            state: {
                products: card_products,
                price: price,
                shipping_fee: shipping_fee,
                items: buy_product_item
            }
        })
    }

    useEffect(() => {
        dispatch(get_card_products(userInfo.id))
    }, [])

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            dispatch(get_card_products(userInfo.id))
        }
    }, [successMessage])

    const inc = (quantity, stock, card_id) => {
        const temp = quantity + 1;
        if (temp <= stock) {
            dispatch(quantity_inc(card_id))
        }
    }

    const dec = (quantity, card_id) => {
        const temp = quantity - 1;
        if (temp !== 0) {
            dispatch(quantity_dec(card_id))
        }
    }

    return (
        <div className='bg-[#F9F6EE] min-h-screen'>
            <Headers />
            <section className='bg-cover bg-no-repeat relative bg-left' 
                style={{
                    backgroundImage: `url("http://localhost:3000/images/banner/card.jpg")`,
                    height: '220px',
                    marginTop: '1.5rem'
                }}>
                <div className='absolute left-0 top-0 w-full h-full bg-[#AFE1AF]/50'>
                    <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                        <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-[#283046]'>
                            <h2 className='text-3xl font-bold'>Nusantara Culinary</h2>
                            <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                                <Link to='/' className='hover:text-[#FFC300] transition-colors'>Home</Link>
                                <span className='pt-2'><MdOutlineKeyboardArrowRight /></span>
                                <span>Cart</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='bg-[#F9F6EE] py-12'>
                <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto'>
                    {card_products.length > 0 || outofstock_products.length > 0 ? (
                        <div className='flex flex-wrap gap-6'>
                            {/* Product List Section */}
                            <div className='w-[67%] md-lg:w-full'>
                                <div className='pr-3 md-lg:pr-0'>
                                    <div className='flex flex-col gap-6'>
                                        {/* In Stock Products */}
                                        {card_products.length > 0 && (
                                            <div className='bg-white border border-[#AFE1AF] rounded-lg shadow-md'>
                                                <div className='p-4 bg-[#AFE1AF]/10 border-b border-[#AFE1AF]'>
                                                    <h2 className='text-md text-[#283046] font-semibold'>
                                                        Stock Products ({card_products.length})
                                                    </h2>
                                                </div>
                                                {card_products.map((shop, shopIndex) => (
                                                    <div key={shopIndex} className='p-4'>
                                                        <h3 className='text-[#283046] font-medium mb-4'>{shop.shopName}</h3>
                                                        {shop.products.map((product, prodIndex) => (
                                                            <div key={prodIndex} className='flex flex-wrap items-center border-b border-[#AFE1AF]/30 py-4'>
                                                                <div className='flex sm:w-full gap-4 w-7/12 items-center'>
                                                                    <img 
                                                                        className='w-[100px] h-[100px] object-cover rounded-md' 
                                                                        src={product.productInfo.images[0]} 
                                                                        alt="product image" 
                                                                    />
                                                                    <div className='text-[#283046]'>
                                                                        <h2 className='text-lg font-semibold'>{product.productInfo.name}</h2>
                                                                        <span className='text-sm text-[#283046]/70'>Brand: {product.productInfo.brand}</span>
                                                                    </div>
                                                                </div>
                                                                <div className='flex justify-between w-5/12 sm:w-full sm:mt-3 items-center'>
                                                                    <div className='text-[#283046]'>
                                                                        <h2 className='text-lg text-[#FFC300] font-bold'>
                                                                            Rp{product.productInfo.price - Math.floor((product.productInfo.price * product.productInfo.discount) / 100)}
                                                                        </h2>
                                                                        <p className='line-through text-sm text-[#283046]/50'>Rp{product.productInfo.price}</p>
                                                                        <p className='text-green-600'>-{product.productInfo.discount}%</p>
                                                                    </div>
                                                                    <div className='flex flex-col gap-2'>
                                                                        <div className='flex bg-[#AFE1AF]/20 h-[40px] justify-center items-center rounded-md'>
                                                                            <button 
                                                                                onClick={() => dec(product.quantity, product._id)} 
                                                                                className='px-3 text-[#283046] hover:text-[#FFC300]'>-</button>
                                                                            <div className='px-3 text-[#283046]'>{product.quantity}</div>
                                                                            <button 
                                                                                onClick={() => inc(product.quantity, product.productInfo.stock, product._id)} 
                                                                                className='px-3 text-[#283046] hover:text-[#FFC300]'>+</button>
                                                                        </div>
                                                                        <button 
                                                                            onClick={() => dispatch(delete_card_product(product._id))} 
                                                                            className='px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors'
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Out of Stock Products */}
                                        {outofstock_products.length > 0 && (
                                            <div className='bg-white border border-red-200 rounded-lg shadow-md'>
                                                <div className='p-4 bg-red-50 border-b border-red-200'>
                                                    <h2 className='text-md text-red-600 font-semibold'>
                                                        Out of Stock ({outofstock_products.length})
                                                    </h2>
                                                </div>
                                                {outofstock_products.map((product, index) => (
                                                    <div key={index} className='p-4 opacity-60'>
                                                        {/* Similar structure to in-stock products, but with reduced opacity */}
                                                        <div className='flex flex-wrap items-center'>
                                                            <div className='flex sm:w-full gap-4 w-7/12 items-center'>
                                                                <img 
                                                                    className='w-[100px] h-[100px] object-cover rounded-md' 
                                                                    src={product.products[0].images[0]} 
                                                                    alt="product image" 
                                                                />
                                                                <div className='text-[#283046]'>
                                                                    <h2 className='text-lg font-semibold'>{product.products[0].name}</h2>
                                                                    <span className='text-sm text-[#283046]/70'>Brand: {product.products[0].brand}</span>
                                                                </div>
                                                            </div>
                                                            {/* Rest of the out of stock product details */}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary Section */}
                            <div className='w-[33%] md-lg:w-full'>
                                {card_products.length > 0 && (
                                    <div className='bg-white border border-[#AFE1AF] rounded-lg shadow-md p-6'>
                                        <h2 className='text-xl font-bold text-[#283046] mb-4'>Order Summary</h2>
                                        
                                        <div className='space-y-3 text-[#283046]'>
                                            <div className='flex justify-between items-center'>
                                                <span>{buy_product_item} Items</span>
                                                <span>Rp{price}</span>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <span>Shipping Fee</span>
                                                <span>Rp{shipping_fee}</span>
                                            </div>
                                            
                                            <div className='flex gap-2 mb-3'>
                                                <input 
                                                    className='w-full px-3 py-2 border border-[#AFE1AF] rounded-md outline-none focus:border-[#FFC300] transition-colors' 
                                                    type="text" 
                                                    placeholder='Input Voucher Coupon' 
                                                />
                                                <button className='px-5 py-2 bg-[#AFE1AF] text-[#283046] rounded-md hover:bg-[#FFC300] transition-colors'>
                                                    Apply
                                                </button>
                                            </div>
                                            
                                            <div className='flex justify-between items-center font-bold'>
                                                <span>Total</span>
                                                <span className='text-lg text-[#FFC300]'>Rp{price + shipping_fee}</span>
                                            </div>
                                            
                                            <button 
                                                onClick={redirect} 
                                                className='w-full px-5 py-3 bg-[#AFE1AF] text-[#283046] rounded-md hover:bg-[#FFC300] transition-colors uppercase'
                                            >
                                                Proceed to Checkout ({buy_product_item} Items)
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className='text-center py-12'>
                            <Link 
                                to='/shops' 
                                className='px-6 py-3 bg-[#AFE1AF] text-[#283046] rounded-md hover:bg-[#FFC300] transition-colors'
                            >
                                Shop Now
                            </Link>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Card