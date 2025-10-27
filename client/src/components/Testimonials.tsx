import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import testimonial1 from "@assets/generated_images/Professional_woman_headshot_testimonial_4f2c6feb.png";
import testimonial2 from "@assets/generated_images/Professional_man_headshot_testimonial_e69138b9.png";
import testimonial3 from "@assets/generated_images/Professional_woman_with_glasses_headshot_b2a078bc.png";

const testimonials = [
  {
    quote: "This tool completely transformed my resume. Within two weeks of implementing the suggestions, I landed three interviews and accepted my dream role at a Fortune 500 company.",
    name: "Sarah Chen",
    role: "Marketing Manager → Senior Product Marketing Manager",
    image: testimonial1
  },
  {
    quote: "The skills gap analysis was eye-opening. I focused on the recommended certifications and within 6 months transitioned from support engineer to cloud architect.",
    name: "Marcus Johnson",
    role: "Support Engineer → Cloud Solutions Architect",
    image: testimonial2
  },
  {
    quote: "I was applying to jobs for months with no response. After optimizing my resume with these insights, my callback rate increased by 300%. Now I'm a data scientist at a leading tech firm.",
    name: "Elena Rodriguez",
    role: "Data Analyst → Senior Data Scientist",
    image: testimonial3
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Success Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of professionals who transformed their careers
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6" data-testid={`card-testimonial-${index}`}>
              <p className="text-muted-foreground mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
