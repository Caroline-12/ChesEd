import React from "react";

const partners = [
  { size: "135x135" },
  { size: "100x100" },
  { size: "150x150" },
  { size: "100x100" },
  { size: "135x135" },
  { size: "100x100" },
  { size: "110x110" },
  { size: "150x150" },
  { size: "100x100" },
];

const PartnersSection = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Our Partners
        </h2>
        <div className="flex flex-wrap justify-center items-center space-x-4">
          {partners.map((partner, index) => (
            <div
              key={index}
              className={`flex items-center justify-center bg-gray-200 ${
                partner.size.includes("135")
                  ? "w-32 h-32"
                  : partner.size.includes("150")
                  ? "w-36 h-36"
                  : partner.size.includes("110")
                  ? "w-28 h-28"
                  : "w-24 h-24"
              } mx-2 my-2`}
            >
              <div className="text-gray-600">{partner.size}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-blue-50 py-8 mt-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-blue-500">Let Us Help</p>
            <h3 className="text-2xl font-bold text-gray-800">
              Finding Your Right Courses
            </h3>
          </div>
          <div>
            <button className="bg-blue-500 text-white py-2 px-6 rounded-full font-semibold">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;
