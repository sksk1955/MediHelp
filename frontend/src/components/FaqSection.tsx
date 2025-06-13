import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqSection = () => {
  const faqs = [
    {
      question: "Is MindBridge a licensed therapist?",
      answer:
        "No, MindBridge is an AI assistant designed to provide emotional support and general mental health information. It is not a substitute for professional therapy or counseling. If you're experiencing serious mental health concerns, please seek help from a licensed mental health professional.",
    },
    {
      question: "How can MindBridge help me?",
      answer:
        "MindBridge can provide emotional support, share coping strategies, offer relaxation techniques, and provide information about mental health topics. It's here to listen without judgment, help you explore your feelings, and suggest self-care practices for better emotional wellbeing.",
    },
    {
      question: "Is my conversation private?",
      answer:
        "Yes, your privacy is important to us. All conversations are confidential and anonymized. We use industry-standard encryption and don't store any personally identifiable information. You can chat freely knowing your data is protected.",
    },
    {
      question: "What should I do in a mental health crisis?",
      answer:
        "If you're experiencing a mental health crisis or having thoughts of self-harm, please reach out to emergency services or contact mental health crisis helplines immediately:\n\n" +
        "• National Crisis Helpline: 988\n" +
        "• Crisis Text Line: Text HOME to 741741\n" +
        "• National Suicide Prevention Lifeline: 1-800-273-8255\n\n" +
        "MindWell is not equipped to handle crisis situations. Always seek professional help in emergencies.",
    },
    {
      question: "Can I use this instead of therapy?",
      answer:
        "No, MindWell is not a replacement for professional therapy. While we can provide support and information, we recommend working with licensed mental health professionals for clinical treatment, diagnosis, or ongoing therapy. We can help you understand different therapy options and encourage seeking professional help when needed.",
    },
    {
      question: "How accurate is the information provided?",
      answer:
        "Our responses are based on well-established mental health resources and evidence-based practices. However, everyone's mental health journey is unique. We encourage you to verify information with mental health professionals and use our suggestions as general guidance rather than specific medical advice.",
    },
  ];

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="section-container">
        <h2 className="section-title">Common Questions</h2>
        <p className="section-subtitle">
          Learn more about how MindWell can support your mental health journey
        </p>

        <div className="max-w-3xl mx-auto mt-8">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="card-shadow rounded-xl border-none"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:text-medical">
                  <span className="text-lg font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
