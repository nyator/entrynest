import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { input, button } from "../constants/styles";
import { Link } from "react-router";
// import { Button } from '@headlessui/react'



const EmDashboard = () => {

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employer Dashboard</h1>
      <Link to="/create-job" className="text-white bg-primary rounded-xl p-2 hover:bg-primary-dark">Post a Job</Link>
    </div>
  );
};

export default EmDashboard;

