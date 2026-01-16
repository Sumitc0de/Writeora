import React from "react";

/* Footer link data */
const footerData = [
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "#" },
      { name: "Guides", href: "#" },
      { name: "Community", href: "#" },
      { name: "Support", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white px-6 sm:px-10 lg:px-28 py-12">
      <div className="max-w-7xl mx-auto">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          
          {/* BRAND + SUBSCRIBE */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-2 text-yellow-600">
              Writeora.
            </h3>
            <p className="text-sm text-gray-400 mb-6 max-w-md">
              Unlock your knowledge. Amplify your voice.
            </p>

            <div className="p-5 bg-[#262626] rounded-lg">
              <h4 className="text-base font-semibold mb-3 text-white">
                Stay Informed
              </h4>

              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 py-2 px-3 text-sm bg-black border border-gray-600 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-600"
                />

                <button
                  type="submit"
                  className="py-2 px-5 text-sm font-semibold rounded-md bg-yellow-600 text-black hover:bg-yellow-500 transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* LINK COLUMNS */}
          {footerData.map((section, index) => (
            <div
              key={index}
              className="bg-[#262626] p-5 rounded-lg"
            >
              <h4 className="text-base font-semibold mb-3 text-yellow-600">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-yellow-600 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <hr className="my-10 border-gray-700" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center text-sm text-gray-400">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Writeora Inc. All rights reserved.
          </p>

          <div className="flex justify-center sm:justify-end gap-4">
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-yellow-600 transition-colors"
            >
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.254 5.92c-.621.275-1.285.46-1.983.543.714-.429 1.259-1.109 1.517-1.917-.665.394-1.403.682-2.188.837-.628-.67-1.52-1.088-2.518-1.088-1.905 0-3.454 1.549-3.454 3.454 0 .27.03.535.087.79-2.87-1.44-5.414-3.04-7.143-5.385-.3.515-.474 1.11-.474 1.741 0 1.197.608 2.253 1.534 2.879-.566-.017-1.127-.174-1.603-.437v.043c0 1.678 1.195 3.085 2.784 3.402-.29.08-.598.125-.913.125-.224 0-.442-.022-.655-.062.441 1.385 1.725 2.392 3.243 2.624-1.187.932-2.684 1.49-4.316 1.49-.28 0-.55-.015-.818-.047 1.534.981 3.355 1.558 5.316 1.558 6.37 0 9.875-5.289 9.875-9.875 0-.15-.003-.3-.008-.448.674-.486 1.258-1.096 1.718-1.802z" /></svg>
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              className="hover:text-yellow-600 transition-colors"
            >
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.27 20.91H3.66V9h3.61v11.91zM5.46 7.64c-1.2 0-2.17-.97-2.17-2.17 0-1.2.97-2.17 2.17-2.17 1.2 0 2.17.97 2.17 2.17 0 1.2-.97 2.17-2.17 2.17zM20.34 20.91h-3.6V15.2c0-1.34-.02-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.81h-3.6V9h3.46v1.59h.05c.48-.91 1.66-1.87 3.4-1.87 3.64 0 4.31 2.39 4.31 5.5v5.69h-.01z" /></svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
