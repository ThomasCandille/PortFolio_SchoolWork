
"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
};

export default function AdmissionForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setIsSubmitting(true);
        try {
            // Here you would typically send the data to your backend
            console.log(data);
            setIsSubmitted(true);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-pink-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-8">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                        Apply for Admission
                    </h2>
                    
                    {isSubmitted ? (
                        <div className="text-center py-6">
                            <div className="mb-4 text-pink-600 text-5xl">✓</div>
                            <h3 className="text-xl font-medium text-gray-700 mb-2">Thank you for your application!</h3>
                            <p className="text-gray-600">We will contact you shortly to proceed with your admission.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                        First Name*
                                    </label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        {...register("firstName", { required: "First name is required" })}
                                        className={`w-full px-3 py-2 border ${
                                            errors.firstName ? "border-red-500" : "border-gray-300"
                                        } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300`}
                                    />
                                    {errors.firstName && (
                                        <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Name*
                                    </label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        {...register("lastName", { required: "Last name is required" })}
                                        className={`w-full px-3 py-2 border ${
                                            errors.lastName ? "border-red-500" : "border-gray-300"
                                        } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300`}
                                    />
                                    {errors.lastName && (
                                        <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address*
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    className={`w-full px-3 py-2 border ${
                                        errors.email ? "border-red-500" : "border-gray-300"
                                    } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300`}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number*
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    {...register("phone", {
                                        required: "Phone number is required",
                                    })}
                                    className={`w-full px-3 py-2 border ${
                                        errors.phone ? "border-red-500" : "border-gray-300"
                                    } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300`}
                                    placeholder="e.g. +33 6 12 34 56 78"
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                    Address*
                                </label>
                                <textarea
                                    id="address"
                                    {...register("address", { required: "Address is required" })}
                                    rows={3}
                                    className={`w-full px-3 py-2 border ${
                                        errors.address ? "border-red-500" : "border-gray-300"
                                    } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300`}
                                    placeholder="Enter your full address"
                                />
                                {errors.address && (
                                    <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                                )}
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-pink-400 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 transition-colors duration-200 ease-in-out disabled:opacity-70"
                                >
                                    {isSubmitting ? "Submitting..." : "Submit Application"}
                                </button>
                            </div>
                            
                            <div className="text-xs text-gray-500 text-center mt-4">
                                * All fields are required
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}