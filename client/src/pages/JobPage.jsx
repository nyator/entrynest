import React from 'react'
import { useAuthStore } from '../store/authStore'

function JobPage() {
  const { user } = useAuthStore()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Job Opportunities</h1>
      <div className="space-y-4">
        {user?.role === 'jobseeker' ? (
          <>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">Frontend Developer</h2>
              <p className="text-gray-600 mt-2">Join our team as a frontend developer...</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">UI/UX Designer</h2>
              <p className="text-gray-600 mt-2">We're looking for a creative UI/UX designer...</p>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-red-500">You must be a jobseeker to view job opportunities.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default JobPage
