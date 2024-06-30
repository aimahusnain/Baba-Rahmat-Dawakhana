"use client";

import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ContactFormData {
  email: string;
}

const initialContactFormData: ContactFormData = {
  email: "",
};

const StayInTouch = () => {
  const [formData, setFormData] = useState(initialContactFormData);
  const [formValid, setFormValid] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form data sent successfully");
        setSubmissionSuccess(true);
        setFormData(initialContactFormData);
        validateForm();
        toast.success("Form submitted successfully!");
      } else {
        console.error("Error sending form data");
        toast.error("Error submitting form data. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateForm(value);
  };

  const validateForm = (email?: string) => {
    const isEmailValid = !email || email.trim() !== ""; // Make email validation optional
    setFormValid(isEmailValid);
  };
  return (
    <div className="to-[#E2BBB4] via-[#E7C1BA] from-[#E2BBB4] bg-gradient-to-b grid sm:grid-cols-2 mt-10 mb-5 -mx-4">
      <div className="w-full flex-col flex px-8 rounded-none space-y-3 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto text-black shadow-lg justify-center">
        <p className="font-sans uppercase">Newsletter</p>
        <h2 className="text-4xl lg:text-5xl">Let&apos;s Stay in Touch</h2>
        <p>
          Join Our Community for Exclusive Beauty Tips, Offers, and Expert
          Advice&apos;s.
        </p>

        <form onSubmit={handleFormSubmit} className="flex h-fit">
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            className="rounded-none rounded-l-md text-black"
            onChange={handleInputChange}
            required
            onBlur={handleInputChange} // Add onBlur event handler
          />

          <Button
            type="submit"
            className="h-full rounded-none font-sans rounded-r-full  focus:outline-none font-bold"
            disabled={!formValid || isLoading}
          >
            {isLoading ? "Submitting..." : "Subscribe"}
          </Button>
        </form>
      </div>
      <div className="h-full">
        <Image
          src="https://raw.githubusercontent.com/aimahusnain/Beauty-Bugz-products-Images/main/_e3eeca33-6aae-4ee6-a7b5-cc55c3f783c0-removebg-preview.png"
          className="object-cover h-full object-top "
          alt="We are here to Help"
          width={1024}
          height={1024}
        />
      </div>
    </div>
  );
};

export default StayInTouch;
