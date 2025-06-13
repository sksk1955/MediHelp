import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="section-container">
        <h2 className="section-title">Support for Your Mental Wellbeing</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-700 mb-8">
            MindWell is your 24/7 AI mental health companion, providing supportive guidance
            and resources for emotional wellbeing. Whether you're dealing with stress,
            anxiety, or just need someone to talk to, we're here to help.
          </p>
          <p className="text-lg text-gray-700">
            Using advanced AI technology and evidence-based psychological principles,
            we offer a safe space for exploration and growth. Remember, while we provide
            support and information, we encourage professional help for serious concerns.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
