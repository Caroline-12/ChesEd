import React from "react";
import { Button } from "./ui/button";

const news = [
  {
    category: "Javascript",
    title: "Launched Digital Marketing Website",
    date: "July 18, 2021",
    views: 275,
    size: "small",
  },
  {
    category: "Online Education",
    title: "Identity Design for a New Courses Crusader Work",
    date: "July 22, 2021",
    views: 645,
    size: "large",
  },
  {
    category: "Python",
    title: "You can Now Listen to the Entire Library",
    date: "July 20, 2021",
    views: 348,
    size: "small",
  },

  {
    category: "UX Design",
    title: "How to Designer Taking the work",
    date: "July 25, 2021",
    views: 197,
    size: "small",
  },
  {
    category: "Finance",
    title: "How to Become UI/UX Designer?",
    date: "July 28, 2021",
    views: 472,
    size: "small",
  },
];

const NewsAndBlogsSection = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          News And Blogs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {news.map((item, index) => (
            <div
              key={index}
              className={`relative bg-gray-200 ${
                item.size === "large"
                  ? "md:col-span-2 md:row-span-2"
                  : "col-span-1"
              } p-4`}
            >
              <div className="absolute top-0 left-0 bg-orange-500 text-white px-2 py-1 text-sm">
                {item.category}
              </div>
              <div className="absolute bottom-0 left-0 bg-white p-2 shadow-lg">
                <p className="text-gray-800 font-semibold">{item.title}</p>
                <p className="text-gray-600 text-sm">
                  {item.date} • {item.views} views
                </p>
              </div>
              <div className="text-gray-600 flex items-center justify-center h-full text-4xl">
                {item.size === "large" ? "930X930" : "5X484"}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-orange-50 py-8 mt-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-2xl font-bold text-gray-800">
              Become An Instructor
            </h3>
            <p className="text-gray-600">
              Grursus mal suada faci lisis Lorem ipsum dolor sit ametion
              consectetur elit. Vesti at bulum et cons ectetur elit.
            </p>
            <Button className="mt-4 bg-yellow-500 text-white py-2 px-6 font-semibold">
              Apply Now
            </Button>
          </div>
          <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-2xl font-bold text-gray-800">
              Free Courses Ready!
            </h3>
            <p className="text-gray-600">
              Grursus mal suada faci lisis Lorem ipsum dolor sit ametion
              consectetur elit. Vesti at bulum et cons ectetur elit.
            </p>
            <Button className="mt-4 bg-orange-500 text-white py-2 px-6 font-semibold">
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsAndBlogsSection;
