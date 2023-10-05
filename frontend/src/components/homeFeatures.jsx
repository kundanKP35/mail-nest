import React from "react";
import { GoNorthStar } from "react-icons/go";
import { joinUs, notification } from "../assets/index";

const FeaturesSection = () => {
    return (
        <>
            <div className="w-full px-10 flex flex-col md:flex-row items-start font-poppins mt-8">
                <div className="flex flex-col md:w-1/2 justify-start">
                    <h1 className="text-2xl font-bold font-poppins text-gray-900 mb-4">
                        Template Management
                    </h1>
                    <div className="flex flex-col md:flex-row gap-x-4">
                        <span className="my-auto text-justify">
                            Create, edit, and manage personalized email templates tailored to your needs. Maintain consistent communication effortlessly.
                        </span>
                        <img src={joinUs} alt="Join Us" className="h-[10rem] rounded-2xl" />
                    </div>
                </div>

            </div>

            <div className="w-full px-10 flex flex-col md:flex-row items-start font-poppins mt-8">

                <div className="flex flex-col md:w-1/2 justify-start">
                    <h1 className="text-2xl font-bold font-poppins text-gray-900 mb-4">
                        Pre-made Templates Library                </h1>
                    <div className="flex flex-col md:flex-row gap-x-4">
                        <span className="my-auto text-justify">
                            Explore a vast library of professionally designed pre-made email templates. Choose from various categories to find the perfect template for your purpose.                    </span>
                        <img src={joinUs} alt="Join Us" className="h-[10rem] rounded-2xl" />
                    </div>
                </div>
            </div>

            <div className="w-full px-10 flex flex-col md:flex-row items-start font-poppins mt-8">

                <div className="flex flex-col md:w-1/2 justify-start">
                    <h1 className="text-2xl font-bold font-poppins text-gray-900 mb-4">
                    Template Customization                </h1>
                    <div className="flex flex-col md:flex-row gap-x-4">
                        <span className="my-auto text-justify">
                        Customize your own templates. Add dynamic content, adjust subjects, and modify layouts to align with your brand identity.                    </span>
                        <img src={joinUs} alt="Join Us" className="h-[10rem] rounded-2xl" />
                    </div>
                </div>
            </div>

            <div className="w-full px-10 flex flex-col md:flex-row items-start font-poppins mt-8">

                <div className="flex flex-col md:w-1/2 justify-start">
                    <h1 className="text-2xl font-bold font-poppins text-gray-900 mb-4">
                        Email Sending Integration
                    </h1>
                    <div className="flex flex-col md:flex-row gap-x-4">
                        <span className="my-auto text-justify">
                            Seamlessly integrate with your email services. Send emails directly from MailNest using your configured email accounts, streamlining your workflow.
                        </span>
                        <img src={joinUs} alt="Join Us" className="h-[10rem] rounded-2xl" />
                    </div>
                </div>
            </div>
        </>

    );
};

export default FeaturesSection;
