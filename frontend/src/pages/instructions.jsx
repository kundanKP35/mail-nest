import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import { step1, step2, step3, step4 } from "../assets/Steps/index.js";

const steps = [
  {
    title: "Visit Google Account Security",
    body: (
      <>
        Visit{" "}
        <Link
          to="https://myaccount.google.com/security"
          target="_blank"
          className="text-blue-700 underline hover:cursor-pointer"
        >
          Google Account Security
        </Link>{" "}
        and navigate to 2-step verification under <span className="font-bold">How you sign in to Google</span>.{" "}
        <img src={step1} alt="Google Account Security" className=" rounded-xl p-4 border border-gray-600 shadow-xl" />
      </>
    ),
  },
  {
    title: "Enable 2FA",
    body: (
      <>
        Enable and set-up 2FA if not enabled by clicking on Get Started .{" "}
        <img src={step2} alt="Enable 2FA" className="h-1/2 w-1/2 mx-auto rounded-xl p-4 border border-gray-600 shadow-xl" />
      </>
    ),
  },
  {
    title: "Create App Password for Email",
    body: (
      <>
        Navigate to App Passwords under 2FA .Create an app password for your
        email account.<br/>To create a app specific password, type a name for it .{" "}
        <img
          src={step3}
          alt="Create App Password for Email"
          className="h-1/2 w-1/2 mx-auto rounded-xl p-4 border border-gray-600 shadow-xl"
        />
      </>
    ),
  },
  {
    title: "Get your 16 character app password",
    body: (
      <>
        Copy the 16 character app password and use it in the password field .Do not share this password with anyone.{" "}
        <img
          src={step4}
          alt="Get your 16 character app password"
          className="h-1/2 w-1/2 mx-auto rounded-xl p-4 border border-gray-600 shadow-xl" 
        />
      </>
    )
  },
];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="w-1/2 h-[90vh] mx-auto font-poppins">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.title}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re good to go. Now use your app password while sending emails .
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
              <Button variant="contained" component={Link} to="/dashboard" sx={{ ml: 1 }}>Start Emailing !</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}><span className="font-bold">Step {activeStep + 1}</span></Typography>
            <Typography sx={{ mt: 2, mb: 1 }} >
              {steps[activeStep].body}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}
