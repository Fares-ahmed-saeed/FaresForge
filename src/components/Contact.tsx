import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Code, MapPin, Mail, Globe, ExternalLink } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const Contact = () => {
  const personalInfo = [
    { icon: User, label: "الاسم", value: "Fares Ahmed", color: "text-primary" },
    { icon: Code, label: "التخصص", value: "Frontend Developer", color: "text-primary" },
    { icon: MapPin, label: "الموقع", value: "Egypt", color: "text-primary" },
    { icon: Mail, label: "البريد الإلكتروني", value: "faresahmed2004424@gmail.com", color: "text-primary", href: "mailto:faresahmed2004424@gmail.com" },
    { icon: Globe, label: "المعاينة المباشرة", value: "my-portfolio-site-delta-sand.vercel.app", color: "text-primary", href: "https://my-portfolio-site-delta-sand.vercel.app/" },
  ];

  return (
    <section className="py-24 px-6 bg-background" id="contact">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">لنتواصل</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" style={{ textWrap: "balance" }}>
              هل لديك مشروع رائع في ذهنك؟ دعنا نحوله إلى واقع!
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h3 className="text-2xl lg:text-3xl font-bold text-center text-foreground mb-8">
            معلومات شخصية
          </h3>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {personalInfo.map((info, index) => (
            <ScrollReveal key={info.label} direction={index % 2 === 0 ? "left" : "right"} delay={index * 80} distance={20}>
              <Card className="border-0 shadow-card hover:shadow-hero/20 transition-all duration-500 hover:-translate-y-1 bg-card group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <info.icon className={`w-6 h-6 ${info.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} target="_blank" rel="noopener noreferrer" className="text-foreground font-semibold hover:text-primary transition-colors duration-300 flex items-center gap-2 group/link">
                          <span className="break-all">{info.value}</span>
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                        </a>
                      ) : (
                        <p className="text-foreground font-semibold">{info.value}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
