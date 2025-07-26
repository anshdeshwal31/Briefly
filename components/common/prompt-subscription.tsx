import Link from 'next/link'
import React from 'react'

const PromptSubscriptionCard = () => {
  return (
          <div className="relative z-10 bg-white backdrop-blur-md rounded-3xl shadow-2xl border border-rose-100/50 p-8 sm:p-12 max-w-lg w-full text-center">
        {/* Premium Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-8 shadow-lg">
          <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
            <svg 
              className="w-2.5 h-2.5 text-white" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M10 3l2.5 5h5.5l-4.5 3.5 1.5 5.5L10 13l-4.5 4L7 11.5 2.5 8H8L10 3z" />
            </svg>
          </div>
          Premium Feature
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
          Subscription Required
        </h2>

        {/* Subheading */}
        <h3 className="text-lg text-rose-600 font-medium mb-6">
          Unlock Premium Features
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-8 leading-relaxed text-base sm:text-lg">
          Upgrade to the <span className="font-semibold text-rose-600">Basic Plan</span> or 
          <span className="font-semibold text-rose-600"> Pro Plan</span> to access this feature and unlock your full potential
          <span className="text-rose-500 ml-1">✨</span>
        </p>

        {/* Features Preview */}
        <div className="bg-rose-50/50 rounded-2xl p-6 mb-8 border border-rose-100/50">
          <h4 className="font-semibold text-gray-900 mb-4">What you'll get:</h4>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
              </div>
              <span>Unlimited access to premium features</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
              </div>
              <span>Priority support and updates</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
              </div>
              <span>Advanced analytics and insights</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/#pricing"
            className="flex-1 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2 group"
          >
            View Pricing Plans
            <svg 
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          
          <Link 
            href="/"
            className="flex-1 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-semibold px-6 py-3 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </Link>
        </div>

        {/* Trust indicator */}
        <p className="text-xs text-gray-500 mt-6">
          30-day money-back guarantee • Cancel anytime
        </p>
      </div>
  )
}

export default PromptSubscriptionCard