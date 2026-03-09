import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const PaymentSuccess = () => {

  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')

  const [paymentInfo, setPaymentInfo] = useState({})

  const axiosSecure = useAxiosSecure()

  useEffect(() => {

    const verifyPayment = async () => {

      try {

        if (sessionId) {

          const res = await axiosSecure.patch(
            `/payment-success?session_id=${sessionId}`
          )

          console.log(res.data)

          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId
          })
        }

      } catch (error) {
        console.log(error)
      }

    }

    verifyPayment()

  }, [sessionId, axiosSecure])

  return (
    <div className="text-center mt-20">

      <h2 className="text-4xl text-green-600 font-bold">
        Payment Successful 🎉
      </h2>

      <p className="mt-6 text-lg">
        Transaction ID: <span className="font-semibold">{paymentInfo.transactionId}</span>
      </p>

      <p className="mt-2 text-lg">
        Tracking ID: <span className="font-semibold">{paymentInfo.trackingId}</span>
      </p>

    </div>
  )
}

export default PaymentSuccess