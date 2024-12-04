import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'
import { get_seller, seller_status_update, messageClear } from '../../store/Reducers/sellerReducer'

const SellerDetails = () => {
    const dispatch = useDispatch()
    const { seller, successMessage } = useSelector(state => state.seller)
    const { sellerId } = useParams()
    useEffect(() => {
        dispatch(get_seller(sellerId))
    }, [sellerId])
    const [status, setStatus] = useState('')
    const submit = (e) => {
        e.preventDefault()
        dispatch(seller_status_update({
            sellerId,
            status
        }))
    }
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
    }, [successMessage])
    useEffect(() => {
        if (seller) {
            setStatus(seller.status)
        }
    }, [seller])
    return (
        <div>
            <div className='px-2 lg:px-7 pt-5'>
                <div className='w-full p-4 bg-[#F9F6EE] rounded-md'>
                    <div className='w-full flex flex-wrap text-[#283046]'>
                        <div className='w-3/12 flex justify-center items-center py-3'>
                            <div>
                                {
                                    seller?.image ? <img className='w-full h-[230px] object-cover rounded-md' src={seller?.image} alt="" /> : <span>Gambar belum diunggah</span>
                                }
                            </div>
                        </div>
                        <div className='w-4/12'>
                            <div className='px-0 md:px-5 py-2'>
                                <div className='py-2 text-lg font-semibold'>
                                    <h2>Informasi Dasar</h2>
                                </div>
                                <div className='flex justify-between text-sm flex-col gap-2 p-4 bg-[#AFE1AF] rounded-md'>
                                    <div className='flex gap-2'>
                                        <span className='font-semibold'>Nama:</span>
                                        <span>{seller?.name}</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <span className='font-semibold'>Email:</span>
                                        <span>{seller?.email}</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <span className='font-semibold'>Peran:</span>
                                        <span>{seller?.role}</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <span className='font-semibold'>Status:</span>
                                        <span>{seller?.status}</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <span className='font-semibold'>Akun Pembayaran:</span>
                                        <span>{seller?.payment}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-4/12'>
                            <div className='px-0 md:px-5 py-2'>
                                <div className='py-2 text-lg font-semibold'>
                                    <h2>Alamat</h2>
                                </div>
                                <div className='flex justify-between text-sm flex-col gap-2 p-4 bg-[#AFE1AF] rounded-md'>
                                    <div className='flex gap-2'>
                                        <span className='font-semibold'>Nama Toko:</span>
                                        <span>{seller?.shopInfo?.shopName}</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <span className='font-semibold'>Provinsi:</span>
                                        <span>{seller?.shopInfo?.division}</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <span className='font-semibold'>Kabupaten:</span>
                                        <span>{seller?.shopInfo?.district}</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <span className='font-semibold'>Kecamatan:</span>
                                        <span>{seller?.shopInfo?.sub_district}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={submit}>
                            <div className='flex gap-4 py-3'>
                                <select value={status} onChange={(e) => setStatus(e.target.value)} className='px-4 py-2 focus:border-[#FFC300] outline-none bg-[#F9F6EE] border border-[#AFE1AF] rounded-md text-[#283046]' name="" required id="">
                                    <option value="">--pilih status--</option>
                                    <option value="active">Aktif</option>
                                    <option value="deactive">Nonaktif</option>
                                </select>
                                <button className='bg-[#FFC300] hover:bg-[#E57F84] text-[#283046] rounded-md px-7 py-2 w-[170px] transition duration-300'>Kirim</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerDetails