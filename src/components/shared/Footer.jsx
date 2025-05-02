const Footer = () => {
  return (
         <footer className=" text-white pt-24 pb-10">
          <div className="container px-4">
            {/* Newsletter Section */}
            <div className="text-center">
              <h2 className="text-xl font-medium mb-8 tracking-wide">
                Give us your email and we’ll keep you in the loop.*
              </h2>
              <div className="flex justify-center mb-6">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-72 p-3 text-gray-500 bg-white border border-white focus:outline-none"
                />
                <button className="bg-black text-white p-3 border border-white font-medium tracking-wider">
                  I'M IN.
                </button>
              </div>
              <p className="text-xs text-gray-400 mb-2">
                * I confirm that I have read, understand and agreed to the{' '}
                <a href="#" className="underline">
                  Privacy Policy
                </a>.
              </p>
              <p className="text-sm text-gray-400 mb-12 max-w-2xl mx-auto">
                By subscribing to our newsletter, you will receive news from Yardbird and the rest of our family of brands.
              </p>
            </div>

            {/* Links and Branding Section */}
            <div className="flex justify-between items-center">
              <div className="text-xs font-medium tracking-wider">
                <a href="#" className="hover:underline">TERMS OF USE</a> /{' '}
                <a href="#" className="hover:underline">PRIVACY POLICY</a> /{' '}
                <a href="#" className="hover:underline">FAQ</a> /{' '}
                <a href="#" className="hover:underline">CONTACT US</a>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-lg font-bold tracking-wider">ALWAYS JOY</span>
                <a href="https://instagram.com">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.326 2.633-1.301 3.608-.975.975-2.242 1.24-3.608 1.301-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.326-3.608-1.301-.975-.975-1.24-2.242-1.301-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.326-2.633 1.301-3.608.975-.975 2.242-1.24 3.608-1.301 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.67.014-4.947.072-1.627.074-3.042.414-4.144 1.516C1.807 2.69 1.467 4.105 1.393 5.732c-.058 1.277-.072 1.688-.072 4.947s.014 3.67.072 4.947c.074 1.627.414 3.042 1.516 4.144 1.102 1.102 2.517 1.442 4.144 1.516 1.277.058 1.688.072 4.947.072s3.67-.014 4.947-.072c1.627-.074 3.042-.414 4.144-1.516 1.102-1.102 1.442-2.517 1.516-4.144.058-1.277.072-1.688.072-4.947s-.014-3.67-.072-4.947c-.074-1.627-.414-3.042-1.516-4.144-1.102-1.102-2.517-1.442-4.144-1.516-1.277-.058-1.688-.072-4.947-.072z"/>
                    <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
  );
};

export default Footer;