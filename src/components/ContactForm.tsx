"use client";

import React, { type ChangeEvent, type FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "./ui/select";
import { useToast } from "@/hooks/use-toast";
import SuccessMsg from "./SuccessMsg";
import { sendContactEmail } from "@/lib/email";
import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";
import { services } from "@/app/services/services";
import { useSearchParams } from "next/navigation";
import {
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
  Briefcase,
} from "lucide-react";
import { PhoneInput } from "./phone-input";

// Create Zod schema for contact form
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email cannot exceed 255 characters"),
  phone: z
    .string()
    .refine(isValidPhoneNumber, {
      message: "Please provide a valid phone number",
    })
    .or(z.literal("")),
  subject: z
    .string()
    .min(2, "Subject must be at least 2 characters")
    .max(200, "Subject cannot exceed 200 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message cannot exceed 1000 characters"),
  service: z.string().min(2, "Please select a valid service"),
});

export default function ContactForm() {
  const { toast } = useToast();
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    service: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    service: "",
  });
  const searchParams = useSearchParams();
  const serviceParams = searchParams.get("service");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      phone: value || "",
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      phone: "",
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      service: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      service: "",
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = contactFormSchema.safeParse(formData);
      if (!result.success) {
        setErrors(
          result.error.issues.reduce(
            (acc, issue) => {
              acc[issue.path[0] as keyof typeof errors] = issue.message;
              return acc;
            },
            {
              name: "",
              email: "",
              phone: "",
              subject: "",
              message: "",
              service: "",
            },
          ),
        );
        setLoading(false);
        return;
      }
      const response = await sendContactEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        service: formData.service,
      });

      if (response.success) {
        setSuccess(true);
        setStatus("Success! Your message has been sent.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          service: "",
        });
      } else {
        toast({
          title: "Error: Unable to send message",
          description: response.error ?? "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Data submitting Error", error);
      setStatus("Error! Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          {"Let's work together"}
        </h2>
        <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
          {
            "I'm looking forward to working with you! Share your project details and I'll get back to you within 24 hours."
          }
        </p>
      </div>

      {success ? (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-8 dark:border-green-800 dark:bg-green-900/20">
          <SuccessMsg status={status} />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <User className="h-4 w-4" />
                Full Name
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
                className={`h-12 rounded-xl border-gray-300/50 bg-white/50 backdrop-blur-sm transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100/50 dark:border-gray-600/50 dark:bg-gray-800/50 dark:disabled:bg-gray-800/30 ${
                  errors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : ""
                }`}
                required
              />
              {errors.name && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                  <span className="h-1 w-1 rounded-full bg-red-500"></span>
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <Mail className="h-4 w-4" />
                Email Address
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className={`h-12 rounded-xl border-gray-300/50 bg-white/50 backdrop-blur-sm transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100/50 dark:border-gray-600/50 dark:bg-gray-800/50 dark:disabled:bg-gray-800/30 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : ""
                }`}
                required
              />
              {errors.email && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                  <span className="h-1 w-1 rounded-full bg-red-500"></span>
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1">
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <Phone className="h-4 w-4" />
                Phone Number
              </label>
              <PhoneInput
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handlePhoneChange}
                disabled={loading}
                className={errors.phone ? "min-h-full! border-red-500" : ""}
              />
              {errors.phone && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                  <span className="h-1 w-1 rounded-full bg-red-500"></span>
                  {errors.phone}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div className="space-y-2">
              <label
                htmlFor="subject"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <MessageSquare className="h-4 w-4" />
                Subject
              </label>
              <Input
                type="text"
                id="subject"
                name="subject"
                placeholder="What's this about?"
                value={formData.subject}
                onChange={handleChange}
                disabled={loading}
                className={`h-12 rounded-xl border-gray-300/50 bg-white/50 backdrop-blur-sm transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100/50 dark:border-gray-600/50 dark:bg-gray-800/50 dark:disabled:bg-gray-800/30 ${
                  errors.subject
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : ""
                }`}
                required
              />
              {errors.subject && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                  <span className="h-1 w-1 rounded-full bg-red-500"></span>
                  {errors.subject}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Briefcase className="h-4 w-4" />
              Service Required
            </label>
            <Select
              onValueChange={handleSelectChange}
              disabled={loading}
              defaultValue={
                serviceParams
                  ? services.find(
                      (service) =>
                        service.title === serviceParams?.replace("-", " "),
                    )
                    ? serviceParams?.replace("-", " ")
                    : "Other"
                  : ""
              }
            >
              <SelectTrigger
                className={`h-12 rounded-xl border-gray-300/50 bg-white/50 backdrop-blur-sm transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600/50 dark:bg-gray-800/50 ${
                  errors.service
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : ""
                }`}
              >
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent className="bg-background rounded-xl border-gray-200/50 backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-900/95">
                <SelectGroup>
                  <SelectLabel className="text-gray-500 dark:text-gray-400">
                    Available Services
                  </SelectLabel>
                  {services.map((service) => (
                    <SelectItem
                      key={service.title}
                      value={service.title}
                      className="rounded-lg transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      {service.title}
                    </SelectItem>
                  ))}
                  <SelectItem
                    value={"Other"}
                    className="rounded-lg transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    Other
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.service && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                <span className="h-1 w-1 rounded-full bg-red-500"></span>
                {errors.service}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <MessageSquare className="h-4 w-4" />
              Message
            </label>
            <Textarea
              name="message"
              id="message"
              placeholder="Tell me about your project, requirements, timeline, and any specific details..."
              rows={6}
              value={formData.message}
              onChange={handleChange}
              disabled={loading}
              className={`resize-none rounded-xl border-gray-300/50 bg-white/50 backdrop-blur-sm transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100/50 dark:border-gray-600/50 dark:bg-gray-800/50 dark:disabled:bg-gray-800/30 ${
                errors.message
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : ""
              }`}
              required
            />
            {errors.message && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                <span className="h-1 w-1 rounded-full bg-red-500"></span>
                {errors.message}
              </p>
            )}
          </div>

          <Button
            disabled={loading}
            type="submit"
            className="h-14 w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:from-blue-700 hover:to-purple-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                Sending message...
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Send className="h-5 w-5" />
                Send Message
              </div>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
