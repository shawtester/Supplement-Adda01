import React, { useState } from "react";
import { getAuth,RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";

const OtpVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);

  const setupRecaptcha = () => {
    const auth = getAuth();
    auth.settings.appVerificationDisabledForTesting = true;
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible", // or 'normal' if you're using a visible reCAPTCHA
          callback: (response) => {
            // reCAPTCHA solved, allow user to proceed with phone sign-in.
          },
        }
      
      );
    }
  };
  
  





  
  
  const onSignInSubmit = (e) => {
    e.preventDefault();
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
  
    // Ensure the phone number is in E.164 format (+1234567890)
    const formattedPhoneNumber = `+1${phoneNumber}`;
    signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      });
  };
  
  const verifyOtp = (e) => {
    e.preventDefault();
    if (!verificationId || !otp) {
      console.error("Verification ID or OTP is missing.");
      return;
    }
    const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
    signInWithCredential(auth, credential)
      .then((result) => {
        console.log("User signed in successfully:", result.user);
      })
      .catch((error) => {
        console.error("Error during OTP verification:", error);
      });
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={onSignInSubmit} className="flex flex-col space-y-4">
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send OTP
        </button>
      </form>

      {verificationId && (
        <form onSubmit={verifyOtp} className="flex flex-col space-y-4 mt-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Verify OTP
          </button>
        </form>
      )}

      <div id="recaptcha-container"></div>
    </div>
  );
};

export default OtpVerification;
