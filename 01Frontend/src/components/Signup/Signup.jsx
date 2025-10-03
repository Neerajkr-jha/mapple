import bgImage from "../../assets/bg.jpg";

export default function SignupPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-sm bg-white/90 rounded-2xl shadow-xl p-6 sm:p-8">
        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4">
          Create an Account
        </h3>

        {/* Signup Form */}
        <form className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              placeholder="Choose a username"
              className="w-full mt-1 px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Usertype */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Usertype
            </label>
            <select
              className="w-full mt-1 px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select user type</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="guest">Guest</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 rounded-xl shadow-md hover:from-blue-700 hover:to-purple-700 transition duration-300"
          >
            Continue
          </button>
        </form>

        {/* Already have an account */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
