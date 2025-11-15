// ✅ Reusable component for login/signup buttons
import Button from "./Button";

const AuthButton = ({ handleLogin, handleSignup }) => (
  <div className="flex items-center gap-4">
    <Button
      onClick={handleLogin}
      className="relative px-5 py-2.5 rounded-lg font-medium text-yellow-400 
                 border border-yellow-400/70 bg-yellow-500/10 backdrop-blur-sm
                 hover:bg-yellow-500/20 hover:border-yellow-400
                 hover:shadow-[0_0_12px_rgba(234,179,8,0.5)] 
                 transition-all duration-300"
    >
      <span className="relative z-10 text-black">Login</span>
    </Button>

    <Button
      onClick={handleSignup}
      className="relative px-7 py-2.5 rounded-lg font-semibold text-black 
                 bg-linear-to-r from-yellow-500 to-yellow-400 
                 border border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.5)] 
                 hover:shadow-[0_0_30px_rgba(234,179,8,0.8)] 
                 hover:scale-105 transition-all duration-300"
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.2),transparent_40%)] animate-pulse"></span>
      <span className="relative z-10">Get Started</span>
    </Button>
  </div>
);

export default AuthButton