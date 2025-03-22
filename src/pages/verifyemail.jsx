import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Ensure this import is included

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow numeric input

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    const token = otp.join("");
    try {
      const response = await fetch(
        `http://localhost:3000/auth/verify-email?token=${token}`,
        {
          method: "POST",
        }
      );
      const result = await response.json();
      if (result.success) {
        navigate("/login"); 
      } else {
        setError("Invalid or expired OTP");
      }
    } catch (error) {
      navigate("/login"); 
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500 p-5">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">OTP Verification</h2>
        <p className="mb-4">Enter the OTP received on your email</p>
        <div className="flex space-x-4 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              className="w-16 h-16 bg-white text-blue-500 text-4xl text-center rounded-lg"
              type="text"
              maxLength={1}
              value={digit}
              autoFocus={index === 0}
              ref={(ref) => (inputRefs.current[index] = ref)}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit" // Change to submit to allow form submission handling
          className="bg-black text-white px-6 py-3 rounded-lg mb-4"
        >
          Verify with OTP
        </button>
        {/* Uncomment and implement resend logic if needed */}
        {/* <p className="text-red-500">Resend OTP in: <span className="text-red-700">00:30</span></p> */}
      </form>
      <div
        className="basis-1/2 hidden md:flex justify-center items-center bg-cover"
        style={{ backgroundImage: 'url(/Running.png)' }}
      ></div>
    </div>
  );
};

export default Otp;