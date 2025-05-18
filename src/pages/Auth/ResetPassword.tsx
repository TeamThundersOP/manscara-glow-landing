
import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { KeyRound, ArrowLeft } from "lucide-react";
import authService from "@/services/authService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const email = searchParams.get("email") || "";
  const otp = searchParams.get("otp") || "";
  
  // Function to reset password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input fields
    if (!email || !otp) {
      toast({
        title: "Missing Information",
        description: "Required information is missing",
        variant: "destructive",
      });
      return;
    }
    
    // Validate password
    if (newPassword.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }
    
    // Confirm passwords match
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please ensure both passwords match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await authService.resetPassword(email, otp, newPassword);
      
      toast({
        title: "Password Reset Successful",
        description: response.message || "You can now log in with your new password",
      });
      
      // Navigate to login page after a short delay
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
      
    } catch (error: any) {
      toast({
        title: "Password Reset Failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
              Create New Password
            </CardTitle>
            <CardDescription className="text-center">
              Create and confirm your new password
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <div className="mt-1 relative">
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="pl-10"
                    minLength={8}
                  />
                  <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Password must be at least 8 characters
                </p>
              </div>
              
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="mt-1 relative">
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="pl-10"
                  />
                  <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
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
                    Resetting Password...
                  </div>
                ) : (
                  "Reset Password"
                )}
              </Button>
              
              <div className="text-center mt-4">
                <Link 
                  to="/auth/login"
                  className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center"
                >
                  <ArrowLeft className="mr-1 h-3 w-3" /> Back to login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
