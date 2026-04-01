import ScrollReveal from "./ScrollReveal";
import { Calendar, Clock, ArrowUpLeft } from "lucide-react";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  url?: string;
}

const Blog = () => {
  const posts: BlogPost[] = [
    {
      title: "لماذا TypeScript هو مستقبل تطوير الويب؟",
      excerpt: "اكتشف كيف يحسّن TypeScript جودة الكود ويقلل الأخطاء ويجعل المشاريع الكبيرة أسهل في الصيانة والتطوير",
      date: "2024-12-15",
      readTime: "5 دقائق",
      category: "TypeScript",
    },
    {
      title: "أفضل ممارسات React في 2024",
      excerpt: "دليل شامل لأحدث أنماط React بما في ذلك Server Components وSuspense والتقنيات الحديثة لتحسين الأداء",
      date: "2024-11-20",
      readTime: "7 دقائق",
      category: "React",
    },
    {
      title: "كيف تبني تجربة مستخدم استثنائية",
      excerpt: "نصائح عملية لتصميم واجهات مستخدم جذابة وسهلة الاستخدام تزيد من تفاعل المستخدمين ورضاهم",
      date: "2024-10-08",
      readTime: "4 دقائق",
      category: "UI/UX",
    },
  ];

  return (
    <section className="py-24 px-6 bg-soft-gradient" id="blog">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              المدونة التقنية
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" style={{ textWrap: "balance" as any }}>
              مقالات ونصائح تقنية من خبرتي في تطوير الويب
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <ScrollReveal key={post.title} delay={i * 100} direction="up">
              <article className="group h-full p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 flex flex-col">
                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full self-start mb-4">
                  {post.category}
                </span>

                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 leading-snug">
                  {post.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/50 pt-4">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString("ar-EG", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <ArrowUpLeft className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
