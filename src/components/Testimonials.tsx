
const testimonials = [
  {
    name: "Sarah Thompson",
    title: "Senior Software Engineer at TechCorp",
    avatar: "/reviews/01386c523d6d79ddb54c293d1d629cf2.jpg",
    testimonial:
      "Found my remote dream job through JobNext! Working from home while earning six figures - couldn't ask for more!",
  },
  {
    name: "Michael Chen",
    title: "Hiring Manager at Innovate LLC",
    testimonial:
      "We exclusively hire remote talent through JobNext. The platform connects us with top professionals worldwide who earn well from home.",
    avatar: "/reviews/11a230173b404cb563bf3ef9c489667e.jpg",
  },
  {
    name: "Jessica Rodriguez",
    title: "UX Designer at Creative Solutions",
    testimonial:
      "Working from home while making great money! JobNext found me remote opportunities I didn't even know existed.",
    avatar: "/reviews/25e237f6265285bcf521f725f3e03bfc.jpg",
  },
  {
    name: "David Johnson",
    title: "Product Manager at StartupXYZ",
    testimonial:
      "Transitioned to full remote work and doubled my income! JobNext's remote job matches are incredible for making money from home.",
    avatar: "/reviews/809763cb15765cd65b557f1221803ca6.jpg",
  },
  {
    name: "Emily Wilson",
    title: "Marketing Director at BrandCo",
    testimonial:
      "Hired my entire remote team through JobNext. Everyone's earning well while working from home - it's the future!",
    avatar: "/reviews/d0cbd1380c72ddf3750c896433b2dea1.jpg",
  },
  {
    name: "Alex Martinez",
    title: "Frontend Developer at WebTech",
    testimonial:
      "Making great money working remotely! JobNext connected me with high-paying remote opportunities I can do from anywhere.",
    avatar: "/reviews/e68f18d180d01a1787873e5e031bdd59.jpg",
  },
  {
    name: "Olivia Davis",
    title: "HR Specialist at Enterprise Inc",
    testimonial:
      "Our remote hiring success rate skyrocketed with JobNext. Candidates love earning competitive salaries while working from home.",
    avatar: "/reviews/f21690e94ba2c973f0be8a718c3473c3.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 lg:py-24 bg-slate-900 text-white">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Real stories from professionals who found success with JobNext
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 mb-4 rounded-full overflow-hidden border-2 border-primary/30">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-slate-300 mb-4 italic flex-grow">
                  "{item.testimonial}"
                </p>
                <div className="font-semibold text-white text-sm">{item.name}</div>
                <div className="text-xs text-primary mt-1">{item.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
