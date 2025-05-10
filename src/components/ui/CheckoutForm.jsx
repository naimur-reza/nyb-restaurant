"use client"

import React, { useState, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

// Load Stripe
const stripePromise = loadStripe("pk_test_51RNB7fP5ZJfcVMb3iVEtb5nPxVcspwwM3SbPoYcaoKDsXcaU8uBDV8UXTGjmqz1khNxv6EfERU363AZv9gKKRVdP00PTRcUxzI")

// Mock API call
const submitPayment = async (paymentData) => {
  console.log("Mock Payment Submitted", paymentData)
  return { orderId: "mock12345" }
}

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [orderId, setOrderId] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state.trim()) newErrors.state = "State is required"
    if (!formData.zip.trim()) newErrors.zip = "ZIP code is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) return

    if (!validateForm()) return

    setIsLoading(true)
    const cardElement = elements.getElement(CardElement)

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    })

    if (error) {
      setErrors({ card: error.message })
      setIsLoading(false)
      return
    }

    try {
      const response = await submitPayment({
        paymentMethodId: paymentMethod.id,
        amount: 2999, // $29.99 in cents
        customerInfo: formData,
      })

      if (response) {
        setOrderId(response.orderId)
        setIsSuccessModalOpen(true)
        setFormData({
          name: "",
          email: "",
          address: "",
          city: "",
          state: "",
          zip: "",
          country: "US",
        })
        cardElement.clear()
      }
    } catch (err) {
      console.log(err)
      setErrors({ submission: "Payment processing failed. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 bg-gray-800 text-white">
            <h2 className="text-xl font-semibold">Complete Your Purchase</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Info */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-4">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["name", "email"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 capitalize">
                        {field}
                      </label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full border ${errors[field] ? "border-red-500" : "border-gray-300"} rounded-md py-2 px-3`}
                      />
                      {errors[field] && <p className="text-sm text-red-600">{errors[field]}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Address Info */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-4">Shipping Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["address", "city", "state", "zip"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 capitalize">
                        {field.replace("_", " ")}
                      </label>
                      <input
                        type="text"
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full border ${errors[field] ? "border-red-500" : "border-gray-300"} rounded-md py-2 px-3`}
                      />
                      {errors[field] && <p className="text-sm text-red-600">{errors[field]}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Info */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-4">Payment Information</h3>
                <div className="border border-gray-300 rounded-md p-4">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": { color: "#aab7c4" },
                        },
                        invalid: { color: "#9e2146" },
                      },
                    }}
                  />
                  {errors.card && <p className="mt-2 text-sm text-red-600">{errors.card}</p>}
                </div>
              </div>

              {/* Summary */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-4">Order Summary</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Product</span>
                    <span className="font-medium">Premium Subscription</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total</span>
                    <span className="font-medium">$29.99</span>
                  </div>
                </div>
              </div>

              {/* Submission Error */}
              {errors.submission && (
                <div className="md:col-span-2">
                  <p className="text-sm text-red-600 bg-red-50 p-3 rounded">{errors.submission}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="md:col-span-2 mt-4">
                <button
                  type="submit"
                  disabled={isLoading || !stripe}
                  className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path d="M4 12a8 8 0 018-8v8H4z" fill="currentColor" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Complete Purchase"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <Transition appear show={isSuccessModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsSuccessModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Payment Successful
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Thank you for your purchase! Your order ID is <strong>{orderId}</strong>.
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
                    onClick={() => setIsSuccessModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

// Wrap with Elements Provider
const StripeCheckoutPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
)

export default StripeCheckoutPage
