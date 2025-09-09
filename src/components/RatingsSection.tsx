import React from "react";

const RatingsSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Trusted by Remote Professionals
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of professionals working from home and earning well through our platform
          </p>
        </div>

        {/* Image Logos Only */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-32">
            <img
              src="/Trustpilot.png"
              alt="TrustPilot"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="flex items-center justify-center h-32">
            <img
              src="/google.png"
              alt="Google Reviews"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="flex items-center justify-center h-32">
            <img
              src="/G2.png"
              alt="G2 Crowd"
              className="h-full w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RatingsSection;