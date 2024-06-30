"use client";

import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const initialContactFormData: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

const HelpingSection = () => {
  const [formData, setFormData] = useState(initialContactFormData);
  const [formValid, setFormValid] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true); // Set loading state to true

      const response = await fetch("/api/contact", {
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
      setIsLoading(false); // Reset loading state
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
    validateForm();
  };
  
  const validateForm = () => {
    const isFormValid = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    setFormValid(isFormValid);
  };
  return (
    <div className="grid sm:grid-cols-2 mt-10 mb-5 -mx-4">
      <div className="w-full flex-col flex px-8 gap-8 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto bg-gray-100 text-gray-900 rounded-lg shadow-lg">
        <div>
          <h2 className="text-4xl mb-1 lg:text-5xl font-bold leading-tight">
            We&apos;re Here to Help
          </h2>
          <p className="">Reach out to us with any questions or concerns</p>
        </div>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name:
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-primary bg-transparent border-white"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email:
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-primary bg-transparent border-white"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              Message:
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-primary bg-transparent border-white"
            />
          </div>

          <div className="text-center">
            <Button
              type="submit"
              className="mt-1 font-sans w-full focus:outline-none font-bold"
              disabled={!formValid || isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Contact Form"}
            </Button>
          </div>
        </form>
      </div>
      <div className="h-full bg-red-400">
        <Image
          src="/Help.jfif"
          className="object-cover h-full object-top"
          alt="We are here to Help"
          width={1024}
          height={1024}
        />
      </div>
    </div>
  );
};

export default HelpingSection;
