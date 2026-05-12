import React from 'react';
import { authStore } from "../store/authStore";

function AdminProfile() {
  const { currentUser } = authStore();

  if (!currentUser) return null;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-sm border border-[#f5f5f7] text-center">
      <h1 className="text-2xl font-semibold text-[#1d1d1f] mb-4">Admin Profile</h1>
      <div className="space-y-3 text-left">
        <p className="text-[#1d1d1f]"><span className="font-medium text-[#86868b]">Name:</span> {currentUser.firstName + " " + currentUser.lastName} </p>
        <p className="text-[#1d1d1f]"><span className="font-medium text-[#86868b]">Email:</span> {currentUser.email} </p>
        <p className="text-[#1d1d1f]"><span className="font-medium text-[#86868b]">Role:</span> <span className="px-2 py-0.5 rounded-full text-xs bg-[#e8f2ff] text-[#0066cc] uppercase">{currentUser.role}</span></p>
      </div>
    </div>
  )
}

export default AdminProfile;