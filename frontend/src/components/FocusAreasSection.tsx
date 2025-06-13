import React from "react";
import { Brain, Heart, Smile, Shield, Coffee, UserCircle, Sparkles, MessagesSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface FocusAreaCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
  animationDelay?: string; // Add animation delay property to the interface
}

const FocusAreaCard = ({ icon: Icon, title, description, className, animationDelay }: FocusAreaCardProps) => {
  return (
    <div 
      className={cn(
        "card-shadow p-6 flex flex-col items-center text-center animate-hover",
        className
      )}
      style={{ animationDelay }} // Use the animationDelay property here
    >
      <div className="w-16 h-16 rounded-full bg-mindwell-light flex items-center justify-center mb-4">
        <Icon className="text-mindwell w-8 h-8" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FocusAreasSection = () => {
  const focusAreas = [
    {
      icon: Brain,
      title: "Mental Health Support",
      description: "Understanding and managing anxiety, depression, stress, and other mental health concerns.",
    },
    {
      icon: Heart,
      title: "Emotional Wellbeing",
      description: "Building emotional resilience, self-awareness, and healthy coping mechanisms.",
    },
    {
      icon: Smile,
      title: "Self-Care Practices",
      description: "Developing daily routines and habits that promote mental wellness and balance.",
    },
    {
      icon: Shield,
      title: "Stress Management",
      description: "Techniques and strategies to handle stress, overwhelm, and life's challenges.",
    },
    {
      icon: Coffee,
      title: "Lifestyle Balance",
      description: "Creating harmony between work, relationships, and personal well-being.",
    },
    {
      icon: MessagesSquare,
      title: "Communication Skills",
      description: "Improving relationships and expressing emotions in healthy ways.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="section-container">
        <h2 className="section-title">Areas of Support</h2>
        <p className="section-subtitle">
          Our AI companion provides guidance across various aspects of mental wellbeing
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {focusAreas.map((area, index) => (
            <FocusAreaCard
              key={index}
              icon={area.icon}
              title={area.title}
              description={area.description}
              className="transform transition-all duration-300"
              animationDelay={`${index * 0.1}s`} // Pass animation delay as a prop
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusAreasSection;
