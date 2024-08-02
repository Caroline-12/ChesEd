import { GrUserExpert } from "react-icons/gr";
import { SlNotebook } from "react-icons/sl";
import { IoAlarm } from "react-icons/io5";
import { LiaIndustrySolid } from "react-icons/lia";
import { Link } from "react-router-dom";
const CTA = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-semibold text-gray-800 mb-4">
              Find out more about us
            </h2>
            <h3 className="text-4xl font-semibold text-gray-800 mb-4">
              E - Learning Experience
            </h3>
            <p className="text-gray-600 mb-6">
              Grursus mal suada faci lisis Lorem ipsum ametion consectetur elit.
              Vesti at bulum the dumm ipsum ipsum that fadolorit that
              consectetur more the ready works elit.
            </p>
            <img
              src="https://via.placeholder.com/520x300"
              alt="Placeholder"
              className="mb-6"
            />
          </div>
          <div className="w-full md:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start flex-col gap-3 mt-4">
                <div className="bg-green-100 p-4 rounded-md">
                  <GrUserExpert className="text-green-500" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">
                    Learn with Experts
                  </h4>
                  <p className="text-gray-600">
                    Grursus mal suada faci lisis that ipsum ameti consecte.
                  </p>
                </div>
              </div>
              <div className="flex items-start flex-col gap-3 mt-4">
                <div className="bg-yellow-100 p-4 rounded-md">
                  <SlNotebook className="text-yellow-500" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">
                    Learn Anything
                  </h4>
                  <p className="text-gray-600">
                    Grursus mal suada faci lisis that ipsum ameti consecte.
                  </p>
                </div>
              </div>
              <div className="flex items-start flex-col gap-3 mt-4">
                <div className="bg-orange-100 p-4 rounded-md">
                  <IoAlarm className="text-orange-500" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">
                    Flexible Learning
                  </h4>
                  <p className="text-gray-600">
                    Grursus mal suada faci lisis that ipsum ameti consecte.
                  </p>
                </div>
              </div>
              <div className="flex items-start flex-col gap-3 mt-4">
                <div className="bg-orange-100 p-4 rounded-md">
                  <LiaIndustrySolid className="text-orange-500" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">
                    Industrial Standard
                  </h4>
                  <p className="text-gray-600">
                    Grursus mal suada faci lisis that ipsum ameti consecte.
                  </p>
                </div>
              </div>
            </div>
            <button className="bg-orange-500 text-white px-6 py-2 mt-10 rounded">
              <Link to="/register">Get Started</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
