
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Send, Mail } from "lucide-react";
import authService from "@/services/authService";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";

type Step = "email" | "otp";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [currentStep, setCurrentStep] = useState<Step>("email");
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Function to handle sending OTP
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.sendResetOtp(email);
      
      toast({
        title: "OTP Sent",
        description: response.message || "A 6-digit code has been sent to your email",
      });

      // Move to OTP step
      setCurrentStep("otp");
      
      // Set resend timeout (2 minutes)
      setResendDisabled(true);
      setResendCountdown(120);
      const countdownInterval = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
    } catch (error: any) {
      toast({
        title: "Failed to Send OTP",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to verify OTP and proceed to reset password
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit code sent to your email",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Navigate to reset password page with email and OTP as URL parameters
      navigate(`/auth/reset-password?email=${encodeURIComponent(email)}&otp=${otp}`);
    } catch (error: any) {
      toast({
        title: "Navigation Error",
        description: "Could not proceed to reset password page",
        variant: "destructive",
      });
    }
  };

  // Render the appropriate form based on current step
  const renderStepForm = () => {
    switch (currentStep) {
      case "email":
        return (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="mt-1 relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-manscara-black hover:bg-black"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Send className="mr-2 h-4 w-4" />
                  Send OTP
                </div>
              )}
            </Button>
            
            <div className="text-center mt-4">
              <Link to="/auth/login" className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center">
                <ArrowLeft className="mr-1 h-3 w-3" /> Back to login
              </Link>
            </div>
          </form>
        );
        
      case "otp":
        return (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <Label htmlFor="otp" className="block mb-2">Enter 6-Digit OTP Code</Label>
              <p className="text-sm text-muted-foreground mb-4">
                We've sent a code to {email}
              </p>
              <div className="flex justify-center mb-4">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  render={({ slots }) => (
                    <InputOTPGroup>
                      {slots && Array.isArray(slots) && slots.length > 0 ? (
                        slots.map((slot, i) => (
                          <InputOTPSlot key={i} {...slot} index={i} />
                        ))
                      ) : (
                        <div className="flex gap-2">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="w-10 h-10 border rounded-md flex items-center justify-center">
                              {i < otp.length ? otp[i] : ""}
                            </div>
                          ))}
                        </div>
                      )}
                    </InputOTPGroup>
                  )}
                />
              </div>
            </div>
            
            <Button 
              type="submit"
              disabled={otp.length !== 6 || isLoading}
              className="w-full bg-manscara-black hover:bg-black"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Verifying...
                </div>
              ) : (
                "Verify & Continue"
              )}
            </Button>
            
            <div className="flex justify-between items-center mt-4 text-sm">
              <button
                type="button"
                disabled={resendDisabled}
                onClick={() => handleSendOtp()}
                className="text-blue-600 hover:text-blue-800 disabled:text-gray-400"
              >
                {resendDisabled
                  ? `Resend OTP in ${resendCountdown}s`
                  : "Resend OTP"}
              </button>
              
              <button
                type="button" 
                onClick={() => setCurrentStep("email")}
                className="text-blue-600 hover:text-blue-800"
              >
                Change email
              </button>
            </div>
          </form>
        );
    }
  };

  // Helper function to get step-specific titles
  const getStepTitle = () => {
    switch (currentStep) {
      case "email": return "Forgot Password";
      case "otp": return "Verify OTP";
    }
  };
  
  // Helper function to get step-specific descriptions
  const getStepDescription = () => {
    switch (currentStep) {
      case "email": return "Enter your email to receive a password reset code";
      case "otp": return "Enter the 6-digit code we sent to your email";
    }
  };

  return (
    <div className="min-h-screen bg-manscara-offwhite flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <img
              src="/lovable-uploads/619af646-e154-42b0-91d9-8b80937da07b.png"
              alt="Manscara Logo"
              className="h-12 w-auto mx-auto"
            />
          </Link>
        </div>
        
        <Card className="bg-white shadow-md rounded-lg">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-center">
              {getStepTitle()}
            </CardTitle>
            <CardDescription className="text-center">
              {getStepDescription()}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {renderStepForm()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
