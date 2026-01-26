// ✅ Reusable component for login/signup buttons
import Button from "./Button";

const AuthButton = ({ handleLogin, handleSignup }) => (
  <div className="flex items-center gap-4">
    
      <div className="hidden sm:block">
        <Button
          onClick={handleLogin}
          className="relative px-5 py-2.5 rounded-lg font-medium text-black 
                     border border-yellow-400 bg-yellow-500 
                     hover:bg-yellow-600/30 hover:border-yellow-300
                     hover:shadow-[0_0_12px_rgba(234,179,8,0.6)] 
                     transition-all duration-300"
        >
          <span className="relative z-10">Login</span>
        </Button>
      </div>

      {/* 🚀 Get Started → always visible */}
    <Button
      onClick={handleSignup}
      className="relative px-6 py-2.5 rounded-lg font-semibold text-black 
                 bg-linear-to-r from-yellow-500 to-yellow-400 
                 border border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.5)] 
                 hover:shadow-[0_0_30px_rgba(234,179,8,0.8)] 
                 hover:scale-105 transition-all duration-300
                 whitespace-nowrap"
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.2),transparent_40%)] animate-pulse"></span>
      <span className="relative z-10">Get Started</span>
    </Button>

  </div>
);

export default AuthButton;
