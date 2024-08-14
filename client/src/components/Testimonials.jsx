import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaQuoteLeft } from "react-icons/fa";
const testimonials = [
  {
    quote:
      "Nostrud tempor sunt fugiat. Dolor in sint dolore labore non occaecat adipisicing Lorem labore ullamco enim excepteur. In fugiat Lorem sit velit id veniam esse eiusmod non ea voluptate cupidatat reprehenderit ullamco dolore. Mollit laborum occaecat aliquip.",
    name: "Rose Roberson",
    role: "CEO at Company",
    imgSrc: "https://i.pravatar.cc/120?img=1",
  },
  {
    quote:
      "Eiusmod dolor aute ut nulla pariatur officia consequat aute amet exercitation. Culpa consectetur dolor pariatur commodo aliqua amet tempor nisi enim deserunt elit cillum.",
    name: "Chace Rodgers",
    role: "CEO at Company",
    imgSrc: "https://i.pravatar.cc/120?img=10",
  },
  {
    quote:
      "Id duis velit enim officia ad nisi incididunt magna ex dolor minim deserunt dolor.",
    name: "Cornelius Sheppard",
    role: "CEO at Company",
    imgSrc: "https://i.pravatar.cc/120?img=9",
  },
  {
    quote:
      "Consectetur voluptate pariatur dolore laboris. Eiusmod dolor aute ut nulla pariatur officia consequat aute amet exercitation.",
    name: "Chace Rodgers",
    role: "CEO at Company",
    imgSrc: "https://i.pravatar.cc/120?img=7",
  },
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur voluptate pariatur dolore laboris. Eiusmod dolor aute ut nulla pariatur officia consequat aute amet exercitation.",
    name: "Cornelius Sheppard",
    role: "CEO at Company",
    imgSrc: "https://i.pravatar.cc/120?img=8",
  },
  {
    quote:
      "Consectetur voluptate pariatur dolore laboris. Eiusmod dolor aute ut nulla pariatur officia consequat aute amet exercitation.",
    name: "Chace Rodgers",
    role: "CEO at Company",
    imgSrc: "https://i.pravatar.cc/120?img=2",
  },
  {
    quote:
      "Id duis velit enim officia ad nisi incididunt magna ex dolor minim deserunt dolor.",
    name: "Cornelius Sheppard",
    role: "CEO at Company",
    imgSrc: "https://i.pravatar.cc/120?img=3",
  },
];

export default function Testimonials() {
  return (
    <>
      <section className="w-full py-4 bg-gray-50">
        <div className="mx-auto lg:max-w-6xl px-3">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex justify-center items-center">
            <span className="border-t border-yellow-500 w-16 mr-2"></span>
            Our Instructors
            <span className="border-t border-yellow-500 w-16 ml-2"></span>
          </h2>
          <Carousel
            opts={{
              loop: true,
              align: "start",
            }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent className="relative">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 p-4"
                >
                  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
                    <div className="text-4xl text-orange-600 m-4">
                      <FaQuoteLeft />
                    </div>
                    <div className="flex items-start m-4">
                      <p className="text-gray-600">{testimonial.quote}</p>
                    </div>
                    <div className="flex items-center mt-6">
                      <div className="bg-gray-200 rounded-full w-14 h-14 flex items-center justify-center mr-4">
                        <img
                          className="h-10 w-10 rounded-full"
                          height={40}
                          width={40}
                          alt={testimonial.name}
                          src={testimonial.imgSrc}
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">
                          {testimonial.name}
                        </p>
                        <p className="text-gray-600">{testimonial.role}</p>
                        <div className="flex items-center mt-2 text-yellow-500">
                          {Array.from({ length: 5 }, (_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.618 4.985c.164.503.66.847 1.194.847h5.273c.969 0 1.371 1.24.588 1.81l-4.28 3.11c-.416.302-.608.847-.445 1.35l1.618 4.985c.3.921-.755 1.688-1.54 1.11l-4.28-3.11c-.416-.302-1-.302-1.417 0l-4.28 3.11c-.785.578-1.84-.189-1.54-1.11l1.618-4.985c.164-.503-.029-1.048-.445-1.35l-4.28-3.11c-.784-.57-.381-1.81.588-1.81h5.273c.534 0 1.03-.344 1.194-.847l1.618-4.985z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 fill-black" />
            <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 fill-black" />
          </Carousel>
        </div>
      </section>
    </>
  );
}
