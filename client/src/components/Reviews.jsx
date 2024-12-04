import React, { useState, useEffect } from 'react'
import Ratings from './Ratings'
import RatingTemp from './RatingTemp'
import Pagination from './Pagination'
import { AiFillStar } from 'react-icons/ai'
import RatingReact from 'react-rating'
import { CiStar } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { customer_review, messageClear, get_reviews, get_product } from '../store/reducers/homeReducer'
import toast from 'react-hot-toast'

const Reviews = ({ product }) => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.auth)
  const { successMessage, reviews, totalReview, rating_review } = useSelector(state => state.home)
  const [pageNumber, setPageNumber] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const [rat, setRat] = useState('')
  const [re, setRe] = useState('')

  const review_submit = (e) => {
    e.preventDefault()
    const obj = {
      name: userInfo.name,
      review: re,
      rating: rat,
      productId: product._id
    }
    dispatch(customer_review(obj))
  }

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage)
      dispatch(get_reviews({
        productId: product._id,
        pageNumber
      }))
      dispatch(get_product(product.slug))
      setRat('')
      setRe('')
      dispatch(messageClear())
    }
  }, [successMessage])

  useEffect(() => {
    if (product._id) {
      dispatch(get_reviews({
        productId: product._id,
        pageNumber
      }))
    }
  }, [pageNumber, product])

  // Helper function to render rating bars
  const renderRatingBar = (rating, count) => (
    <div className='flex items-center space-x-4 mb-2'>
      <div className='w-20 flex items-center'>
        <RatingTemp rating={rating} />
      </div>
      <div className='flex-grow h-3 bg-[#F9F6EE] rounded-full overflow-hidden shadow-inner'>
        <div 
          style={{ width: `${Math.floor((100 * (count || 0)) / totalReview)}%` }} 
          className='h-full bg-[#FFC300] rounded-full'
        ></div>
      </div>
      <span className='w-10 text-right text-[#283046] text-sm'>
        {count || 0}
      </span>
    </div>
  )

  return (
    <div className='max-w-4xl mx-auto p-6 bg-[#F9F6EE] rounded-lg shadow-lg'>
      {/* Overall Rating Section */}
      <div className='grid md:grid-cols-2 gap-8 mb-8'>
        <div className='flex flex-col items-center justify-center'>
          <div className='text-center'>
            <span className='text-7xl font-bold text-[#283046]'>{product.rating}</span>
            <span className='text-4xl text-[#283046]/70'>/5</span>
            <div className='flex justify-center mt-4'>
              <Ratings ratings={product.rating} />
            </div>
            <p className='text-[#283046]/70 mt-2'>{totalReview} Reviews</p>
          </div>
        </div>

        {/* Detailed Rating Breakdown */}
        <div className='space-y-2'>
          {[5, 4, 3, 2, 1, 0].map(rating => 
            renderRatingBar(rating, rating_review[5-rating]?.sum)
          )}
        </div>
      </div>

      {/* Reviews List */}
      <div className='border-t border-[#AFE1AF] pt-6 mb-6'>
        <h2 className='text-2xl font-bold text-[#283046] mb-6'>Product Reviews</h2>
        <div className='space-y-6'>
          {reviews.map((r, i) => (
            <div 
              key={i} 
              className='bg-white p-4 rounded-lg shadow-sm border border-[#AFE1AF]'
            >
              <div className='flex justify-between items-center mb-2'>
                <div className='flex text-xl'>
                  <RatingTemp rating={r.rating} />
                </div>
                <span className='text-[#283046]/70 text-sm'>{r.date}</span>
              </div>
              <div>
                <span className='font-semibold text-[#283046]'>{r.name}</span>
                <p className='text-[#283046]/80 mt-2'>{r.review}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalReview > 5 && (
          <div className='flex justify-end mt-6'>
            <Pagination 
              pageNumber={pageNumber} 
              setPageNumber={setPageNumber} 
              totalItem={totalReview} 
              perPage={perPage} 
              showItem={Math.round(totalReview / 5)} 
            />
          </div>
        )}
      </div>

      {/* Review Submission */}
      <div className='mt-8'>
        {userInfo ? (
          <div className='bg-white p-6 rounded-lg border border-[#AFE1AF] shadow-sm'>
            <h3 className='text-xl font-semibold text-[#283046] mb-4'>Write a Review</h3>
            <div className='mb-4'>
              <RatingReact
                onChange={(e) => setRat(e)}
                initialRating={rat}
                emptySymbol={<span className='text-[#283046]/30 text-3xl'><CiStar /></span>}
                fullSymbol={<span className='text-[#FFC300] text-3xl'><AiFillStar /></span>}
              />
            </div>
            <form onSubmit={review_submit}>
              <textarea 
                value={re} 
                required 
                onChange={(e) => setRe(e.target.value)} 
                className='w-full p-3 border border-[#AFE1AF] rounded-lg focus:border-[#FFC300] focus:outline-none transition-colors duration-300' 
                rows="5"
                placeholder="Share your experience with this product..."
              ></textarea>
              <div className='mt-4'>
                <button 
                  type='submit' 
                  className='px-6 py-2 bg-[#FFC300] text-[#283046] rounded-lg hover:bg-[#FFC300]/90 transition-colors duration-300'
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className='text-center'>
            <Link 
              to='/login' 
              className='px-6 py-2 bg-[#FFC300] text-[#283046] rounded-lg hover:bg-[#FFC300]/90 transition-colors duration-300'
            >
              Login to Write a Review
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Reviews