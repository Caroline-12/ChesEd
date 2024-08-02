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
                  ? "md:col-span-2 md:row-span-2 h-80"
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
    </div>
  );
};

export default NewsAndBlogsSection;
