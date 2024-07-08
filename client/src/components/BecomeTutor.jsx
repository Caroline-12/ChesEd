import { useEffect } from "react";
import Navbar from "./Navbar";
import { FaSackDollar } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { SiCrowdsource } from "react-icons/si";
import { Button } from "./ui/button";
import Footer from "./Footer";
const BecomeTutor = () => {
  useEffect(() => {
    fetch("become-instructor-navbar.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("navbar").innerHTML = data;
      });
  }, []);

  return (
    <div id="wrapper" className="wrapper">
      <Navbar />
      <section
        className="call-to-action-wrap-style-7 py-20 bg-cover bg-center"
        style={{ backgroundImage: "url(media/banner/banner24.jpg)" }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-black mb-4">
            Become an Instructor Today
          </h2>
          <p className="text-xs font-normal text-black mb-8">
            Join the world's largest online learning marketplace.
          </p>
          <Button>Become a Tutor</Button>
        </div>
      </section>

      <section className="become-instructor-wrap-style-2 py-10 ">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full xl:w-1/2 px-4 mb-8 xl:mb-0">
              <div className=" bg-slate-200 m-4 p-6 rounded shadow-md">
                <h3 className="text-xl font-medium mb-4">
                  Become an Instructor
                </h3>
                <div className="content-box mb-6">
                  <h4 className=" text-sm font-medium mb-2">
                    Plan Your Course
                  </h4>
                  <p className=" text-xs font-normal">
                    Grursus mal suada faci lisis Lorem ipsum dolarorit more
                    ametion consectetur elit. Vesti at bulum nec odio aea the
                    dumm ipsumm ipsum that dolocons rsus mal suada and
                    consectetur elit. All the Lorem Ipsum generators on the
                    Internet tend predefined chunks as necessary this first true
                    dummy.
                  </p>
                </div>
                <div className="content-box">
                  <h4 className=" text-sm font-medium mb-2">
                    Plan Your Course
                  </h4>
                  <p className=" text-xs font-normal">
                    Grursus mal suada faci lisis Lorem ipsum dolarorit more
                    ametion consectetur elit. Vesti at bulum nec odio aea the
                    dumm ipsumm mal suada and consectetur elit.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full xl:w-1/2 px-4 mb-8 xl:mb-0">
              <div className=" bg-slate-200 m-4 p-6 rounded shadow-md">
                <h3 className="text-xl font-medium mb-4">Instructor Rules</h3>
                <div className="content-box mb-6">
                  <h4 className=" text-sm font-medium mb-2">
                    Plan Your Course
                  </h4>
                  <p className=" text-xs font-normal">
                    Grursus mal suada faci lisis Lorem ipsum dolarorit more
                    ametion consectetur elit. Vesti at bulum nec odio aea the
                    dumm ipsumm ipsum that dolocons rsus mal suada and
                    consectetur elit. All the Lorem Ipsum generators on the
                    Internet tend predefined chunks as necessary this first true
                    dummy.
                  </p>
                </div>
                <div className="content-box">
                  <h4 className=" text-sm font-medium mb-2">
                    Plan Your Course
                  </h4>
                  <p className=" text-xs font-normal">
                    Grursus mal suada faci lisis Lorem ipsum dolarorit more
                    ametion consectetur elit. Vesti at bulum nec odio aea the
                    dumm ipsumm mal suada and consectetur elit.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full xl:w-1/2 px-4 mb-8 xl:mb-0">
              <div className=" bg-slate-200 m-4 p-6 rounded shadow-md">
                <h3 className="text-xl font-medium mb-4">Start with Courses</h3>
                <div className="content-box mb-6">
                  <h4 className=" text-sm font-medium mb-2">
                    Plan Your Course
                  </h4>
                  <p className=" text-xs font-normal">
                    Grursus mal suada faci lisis Lorem ipsum dolarorit more
                    ametion consectetur elit. Vesti at bulum nec odio aea the
                    dumm ipsumm ipsum that dolocons rsus mal suada and
                    consectetur elit. All the Lorem Ipsum generators on the
                    Internet tend predefined chunks as necessary this first true
                    dummy.
                  </p>
                </div>
                <div className="content-box">
                  <h4 className=" text-sm font-medium mb-2">
                    Plan Your Course
                  </h4>
                  <p className=" text-xs font-normal">
                    Grursus mal suada faci lisis Lorem ipsum dolarorit more
                    ametion consectetur elit. Vesti at bulum nec odio aea the
                    dumm ipsumm mal suada and consectetur elit.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full xl:w-1/2 px-4">
              <div className=" bg-slate-200 m-4 p-6 rounded shadow-md flex items-center">
                <div className="mr-6">
                  <h3 className="text-xl font-medium mb-4">
                    We're here to help
                  </h3>
                  <p className=" text-xs font-normal mb-4">
                    Grursus mal suada faci lisis Lorem ipsum dolarorit more
                    consectetur elit. Vesti at bulum nec odio aea the dumm
                    ipsumm ipsum dolocons ad rsus mal suada fadolorit dummy at
                    consectetur elit.
                  </p>
                  <p className=" text-xs font-normal">
                    Vesti at bulum nec odio the dumm ipsumm ipsum dolocons ad
                    rsus mal suada fadolorit dummy at the consectetur elit.
                  </p>
                </div>
                <img src="chesed-logo.png" alt="banner" className="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="become-instructor-wrap-style-1 py-10">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold">Professional Skill</h2>
            <p className="text-xs font-normal mt-4">
              Grursus mal suada faci lisis Lorem ipsum dolarorit more ametion
              consectetur elit. Vesti bulum fadolorit to the consectetur elit.
            </p>
          </div>
          <div className="flex justify-center items-center ">
            <div className="w-full hover:h-60 h-full transition duration-500 md:w-1/4 bg-blue-600 mb-8 md:mb-0 rounded-bl-xl rounded-tl-xl">
              <div className="text-white p-6 rounded text-start">
                <div className="icon-box mb-4">
                  <FaSackDollar className=" w-10 h-10" />
                </div>
                <h3 className="text-xl font-medium mb-2">Earn Money</h3>
                <p className=" text-xs font-normal">
                  Grursus mal suada faci lisis Lorem ipsum dolarorit more
                  ametion consecte elit. The fadolorit consectetur elit.
                </p>
              </div>
            </div>
            <div className="w-full hover:h-60 h-full transition duration-500 md:w-1/4 bg-blue-600 mb-8 md:mb-0">
              <div className="text-white p-6 rounded text-start">
                <div className="icon-box mb-4">
                  <PiStudentFill className=" w-10 h-10" />
                </div>
                <h3 className="text-xl font-medium mb-2">Inspire Students</h3>
                <p className=" text-xs font-normal">
                  Grursus mal suada faci lisis Lorem ipsum dolarorit more
                  ametion consecte elit. The fadolorit consectetur elit.
                </p>
              </div>
            </div>
            <div className="w-full hover:h-60 h-full transition duration-500 md:w-1/4 bg-blue-600 rounded-br-xl rounded-tr-xl animate_animated animate__pulse">
              <div className="text-white p-6 rounded text-start ">
                <div className="icon-box mb-4">
                  <SiCrowdsource className=" w-10 h-10" />
                </div>
                <h3 className="text-xl font-medium mb-2">Join Our Community</h3>
                <p className=" text-xs font-normal">
                  Grursus mal suada faci lisis Lorem ipsum dolarorit more
                  ametion consecte elit. The fadolorit consectetur elit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BecomeTutor;
