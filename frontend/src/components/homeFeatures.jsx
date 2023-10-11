import React from "react";
import { joinUs, notification } from "../assets/index";

const Feature = ({ image, heading, description }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-start text-center">
   <div className="flex items-center gap-x-4">
   <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
      <img src={image} alt="Feature Icon" className="w-full h-full object-cover" />
    </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 font-poppins">{heading}</h3>
   </div>
    <p className="text-gray-700 text-start">{description}</p>
  </div>
);

const FeaturesSection = () => {
  return (
    <div className="bg-gray-100 py-16 m-4 rounded-3xl">
      <div className="container mx-auto px-8">
      <div className="w-full px-10 font-poppins text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            KEY FEATURES OF <span className="font-bold text-blue-600 font-poppins">MAIL NEST</span>
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Feature
            image={joinUs}
            heading="Template Management"
            description="Create, edit, and manage personalized email templates tailored to your needs. Maintain consistent communication effortlessly."
          />
          <Feature
            image={joinUs}
            heading="Pre-made Templates Library"
            description="Explore a vast library of professionally designed pre-made email templates. Choose from various categories to find the perfect template for your purpose."
          />
          <Feature
            image={joinUs}
            heading="Template Customization"
            description="Customize your own templates. Add dynamic content, adjust subjects, and modify layouts to align with your brand identity."
          />
          <Feature
            image={joinUs}
            heading="Email Sending Integration"
            description="Seamlessly integrate with your email services. Send emails directly from MailNest using your configured email accounts, streamlining your workflow."
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
