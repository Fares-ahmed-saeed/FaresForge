import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  text: string;
  isBot: boolean;
  isLink?: boolean;
  href?: string;
}

const WHATSAPP_NUMBER = "+201004298934";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}`;

const qaPairs: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["front-end", "frontend", "فرونت", "واجهات", "يعني ايه", "مين انت", "عن نفسك", "بتعمل ايه"],
    answer: "أنا فارس أحمد 👨‍💻، Front-End Developer متخصص في تصميم وتطوير واجهات المواقع باستخدام تقنيات حديثة زي HTML وCSS وJavaScript وReact.\n\nمطور الواجهات هو الشخص المسؤول عن بناء الجزء اللي المستخدم بيشوفه ويتفاعل معاه في الموقع.",
  },
  {
    keywords: ["خدمات", "بتقدم", "تقدمها", "شغلك", "بتعمل"],
    answer: "أقدم خدمات كتير 💼:\n\n✅ تصميم واجهات مواقع احترافية\n✅ تحويل التصميم (Figma/PSD) إلى موقع تفاعلي\n✅ تحسين سرعة وأداء المواقع\n✅ تطوير مواقع باستخدام React\n✅ ربط الموقع بالـ API أو الـ Backend\n✅ مواقع متوافقة مع كل الأجهزة",
  },
  {
    keywords: ["موقع كامل", "كامل", "فل ستاك"],
    answer: "أيوا طبعاً! 💪 أقدر أصمم وأطور واجهة الموقع بالكامل وأربطها بالسيرفر أو قواعد البيانات.\n\nلو عايز تبدأ، ابعتلي التفاصيل وهنتكلم 😊",
  },
  {
    keywords: ["تقنيات", "بتستخدم", "تستخدم", "لغات", "أدوات"],
    answer: "بستخدم أحدث التقنيات 🚀:\n\n⚡ HTML5 & CSS3\n⚡ JavaScript (ES6+)\n⚡ React.js\n⚡ TypeScript\n⚡ Tailwind CSS\n⚡ Git & GitHub\n⚡ خدمات Backend زي Supabase\n\nوبتابع كل جديد في المجال!",
  },
  {
    keywords: ["موبايل", "responsive", "متوافق", "جوال", "تابلت"],
    answer: "أكيد! 📱 كل المواقع اللي بطورها بتكون Responsive 100% وبتشتغل بشكل ممتاز على:\n\n• الموبايل 📱\n• التابلت 📟\n• الكمبيوتر 💻\n\nالتوافق مع كل الأجهزة أولوية عندي!",
  },
  {
    keywords: ["سعر", "بكام", "أسعار", "تكلفة", "فلوس", "ثمن"],
    answer: "السعر بيختلف حسب حجم المشروع والمتطلبات 💰\n\nعشان أقدر أديك عرض سعر مناسب، ابعتلي تفاصيل المشروع على الواتساب:\n📱 " + WHATSAPP_NUMBER + "\n\nأو اضغط على زر الواتساب في الأسفل 👇",
  },
  {
    keywords: ["وقت", "مدة", "قد ايه", "كام يوم", "امتى"],
    answer: "⏰ المدة بتعتمد على حجم المشروع:\n\n• موقع بسيط: 3-5 أيام\n• موقع متوسط: أسبوع - أسبوعين\n• موقع كبير: حسب المتطلبات\n\nبلتزم بالمواعيد وبسلم الشغل في الوقت المحدد! ✅",
  },
  {
    keywords: ["نشر", "رفع", "استضافة", "انترنت", "هوستنج", "دومين"],
    answer: "أيوا! 🌐 بقدر أنشر الموقع على:\n\n• Vercel\n• Netlify\n• أي استضافة تانية\n\nوكمان بقدر أساعدك في حجز الدومين وإعداد كل حاجة!",
  },
  {
    keywords: ["تواصل", "ابدأ", "مشروع", "اتواصل", "كلم", "رقم", "واتساب", "whatsapp"],
    answer: "يلا نبدأ! 🚀\n\nتقدر تتواصل معايا من خلال:\n\n📱 واتساب: " + WHATSAPP_NUMBER + "\n📧 إيميل: faresahmed2004424@gmail.com\n\nابعتلي تفاصيل مشروعك وهرد عليك في أسرع وقت! 💬",
  },
  {
    keywords: ["شكرا", "شكراً", "تمام", "حلو", "ممتاز", "جميل"],
    answer: "العفو! 😊 لو عندك أي سؤال تاني أنا موجود.\n\nتقدر تتواصل معايا في أي وقت على الواتساب:\n📱 " + WHATSAPP_NUMBER,
  },
  {
    keywords: ["سلام", "اهلا", "هاي", "hi", "hello", "مرحبا"],
    answer: "أهلاً وسهلاً! 😄👋\n\nأنا بوت فارس، هنا عشان أساعدك.\n\nممكن تسألني عن:\n• خدماتي\n• التقنيات اللي بستخدمها\n• الأسعار\n• طريقة التواصل\n\nاسأل براحتك! 💬",
  },
];

const quickQuestions = [
  "ايه الخدمات اللي بتقدمها؟",
  "بتستخدم ايه في التطوير؟",
  "بكام الموقع؟",
  "ازاي أتواصل معاك؟",
];

function findAnswer(input: string): string {
  const lower = input.toLowerCase();
  for (const qa of qaPairs) {
    if (qa.keywords.some((kw) => lower.includes(kw))) {
      return qa.answer;
    }
  }
  return "مش فاهم السؤال ده 🤔\n\nممكن تسألني عن:\n• الخدمات\n• التقنيات\n• الأسعار\n• التواصل\n\nأو كلمني على الواتساب مباشرة: 📱 " + WHATSAPP_NUMBER;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "أهلاً! 👋 أنا بوت فارس.\nمطور واجهات مواقع محترف.\n\nاسألني أي حاجة عن خدماتي أو ابعتلي على الواتساب! 💬", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages((prev) => [...prev, { text: msg, isBot: false }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { text: findAnswer(msg), isBot: true }]);
    }, 800);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 md:bottom-6 right-4 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
        aria-label="فتح البوت"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-7 h-7" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-36 md:bottom-24 right-2 left-2 sm:left-auto sm:right-6 z-50 sm:w-[340px] max-h-[65vh] sm:max-h-[520px] rounded-2xl border border-border bg-card shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-primary px-4 py-3 text-primary-foreground flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <div>
                <p className="font-bold text-sm">بوت فارس</p>
                <p className="text-xs opacity-80">متاح الآن • يرد فوراً</p>
              </div>
            </div>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded-full px-2.5 py-1 text-xs transition-colors"
            >
              <Phone className="w-3 h-3" />
              واتساب
            </a>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-[220px] max-h-[320px]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                {msg.isBot && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-1.5 mt-1 shrink-0">
                    <Bot className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[78%] px-3 py-2 rounded-xl text-sm whitespace-pre-line leading-relaxed ${
                    msg.isBot
                      ? "bg-secondary text-secondary-foreground rounded-tl-none"
                      : "bg-primary text-primary-foreground rounded-tr-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-1.5 mt-1 shrink-0">
                  <Bot className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
                <div className="bg-secondary text-secondary-foreground px-4 py-2.5 rounded-xl rounded-tl-none text-sm flex gap-1">
                  <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 2 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-xs px-2.5 py-1.5 rounded-full border border-border bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* WhatsApp Bar */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3 mb-2 flex items-center justify-center gap-2 bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-white text-xs font-semibold py-2 rounded-lg transition-colors"
          >
            📱 تواصل واتساب مباشر: {WHATSAPP_NUMBER}
          </a>

          {/* Input */}
          <div className="p-3 border-t border-border flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="اكتب سؤالك..."
              className="flex-1 bg-muted text-foreground text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
              dir="rtl"
            />
            <Button size="icon" onClick={() => handleSend()} className="shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
