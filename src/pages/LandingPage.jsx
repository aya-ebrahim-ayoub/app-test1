import React, { useState, useEffect } from 'react';
import {
  Clock,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Smartphone,
  Globe2,
  Briefcase,
  Building,
  Landmark,
  Layers,
  Phone,
  Mail,
  MapPin,
  Send,
  MonitorSmartphone,
  ShieldCheck,
  Building2,
  Users,
  Calendar,
  CreditCard,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import '../App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Smartphone size={32} />,
      title: 'بوابة الخدمة الذاتية',
      desc: 'تطبيق جوال يتيح للموظفين طلب الإجازات، استعراض كشوف الراتب، وتسجيل الحضور بسهولة.'
    },
    {
      icon: <Clock size={32} />,
      title: 'تتبع الحضور والانصراف',
      desc: 'ربط مباشر مع أجهزة البصمة والتعرف على الوجه، بالإضافة لتسجيل الحضور الجغرافي عبر الجوال.'
    },
    {
      icon: <Calendar size={32} />,
      title: 'إدارة الإجازات والورديات',
      desc: 'جدولة مرنة لورديات العمل، ونظام مؤتمت لطلبات الإجازات والموافقات الإدارية المتسلسلة.'
    },
    {
      icon: <CreditCard size={32} />,
      title: 'إدارة الرواتب والمسيرات',
      desc: 'حساب آلي للرواتب، الخصومات، البدلات، والعمل الإضافي مع إصدار كشوفات الرواتب بنقرة واحدة.'
    },
    {
      icon: <FileText size={32} />,
      title: 'تقارير وتقييم الأداء',
      desc: 'لوحات تحكم ذكية وتقارير شاملة لمتابعة أداء الموظفين ونسب الغياب والتأخير لاتخاذ قرارات أفضل.'
    },
    {
      icon: <Layers size={32} />,
      title: 'الأرشفة الإلكترونية',
      desc: 'ملف إلكتروني متكامل لكل موظف يحتوي على عقوده، مستنداته الرسمية، وتواريخ انتهاء إقاماته.'
    }
  ];

  const clients = [
    { name: 'الوطنية للتقنية', icon: <Globe2 size={28} /> },
    { name: 'مجموعة الأفق', icon: <Building2 size={28} /> },
    { name: 'مستشفيات النور', icon: <Briefcase size={28} /> },
    { name: 'وزارة التطوير', icon: <Landmark size={28} /> },
    { name: 'مؤسسة البناء', icon: <Building size={28} /> },
    { name: 'بنك المستقبل', icon: <Layers size={28} /> }
  ];

  // Duplicate clients array multiple times to guarantee no empty space
  const duplicatedClients = [...clients, ...clients, ...clients, ...clients];

  const faqs = [
    {
      question: 'هل يمكن ربط النظام مع أجهزة البصمة الحالية في شركتنا؟',
      answer: 'نعم، يدعم نظام انضباط الربط المباشر مع أكثر من 95% من أجهزة البصمة والتعرف على الوجه المتوفرة في السوق (مثل ZKTeco وغيرها) عبر شبكة الإنترنت أو الشبكة المحلية.'
    },
    {
      question: 'هل بيانات الموظفين آمنة ومحفوظة؟',
      answer: 'بالتأكيد. نستخدم أحدث تقنيات التشفير السحابي مع خوادم آمنة جداً لضمان سرية البيانات وعدم إمكانية الوصول إليها إلا من قبل الأشخاص المخولين في شركتك فقط.'
    },
    {
      question: 'هل يدعم النظام تسجيل الحضور الجغرافي عبر الجوال؟',
      answer: 'نعم، يمكن تفعيل ميزة "الحضور الجغرافي" للموظفين الميدانيين أو العاملين عن بُعد، بحيث يسجل الموظف حضوره من خلال التطبيق مع التحقق من موقعه الجغرافي (GPS).'
    },
    {
      question: 'كيف يتم حساب الرواتب والخصومات؟',
      answer: 'يقوم النظام بحساب الرواتب بشكل آلي نهاية كل شهر بناءً على سجلات الحضور والانصراف، الغيابات، التأخير، والإجازات، مع إمكانية تعديلها من قبل مدير الموارد البشرية قبل الاعتماد.'
    }
  ];

  const plans = [
    {
      name: 'الباقة الأساسية',
      price: '٩',
      users: 'للشركات الناشئة والصغيرة',
      popular: false,
      features: [
        'تسجيل الحضور والانصراف',
        'تطبيق الجوال للموظفين',
        'إدارة الإجازات',
        'دعم فني خلال أوقات العمل'
      ]
    },
    {
      name: 'الباقة المتقدمة',
      price: '١٥',
      users: 'للشركات المتوسطة والمتنامية',
      popular: true,
      features: [
        'كل ميزات الباقة الأساسية',
        'إدارة الرواتب والمسيرات',
        'الربط المباشر مع أجهزة البصمة',
        'التقييم وتقارير الأداء المتقدمة',
        'دعم فني على مدار الساعة'
      ]
    },
    {
      name: 'باقة المؤسسات',
      price: 'طلب تسعير',
      users: 'للكيانات الكبيرة (+500 موظف)',
      popular: false,
      features: [
        'كل ميزات الباقة المتقدمة',
        'ربط API مع أنظمة ERP',
        'صلاحيات مخصصة معقدة',
        'مدير حساب مخصص للشركة',
        'استضافة خاصة (Private Cloud)'
      ]
    }
  ];

  return (
    <div className="app bg-mesh">
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <div className="logo">
            <Users className="text-blue-500" />
            <span>نظام <span className="text-gradient-accent">انضباط</span></span>
          </div>

          <ul className="nav-links">
            <li><a href="#home" className="nav-link">الرئيسية</a></li>
            <li><a href="#features" className="nav-link">المميزات</a></li>
            <li><a href="#clients" className="nav-link">عملاؤنا</a></li>
            <li><a href="#pricing" className="nav-link">الأسعار</a></li>
            <li><a href="#contact" className="nav-link">اتصل بنا</a></li>
          </ul>

          <div className="nav-actions">
            <Link to="/login" className="btn btn-outline">تسجيل الدخول</Link>
            <button className="btn btn-primary">ابدأ تجربتك المجانية</button>
          </div>

          <button
            className="menu-toggle"
            aria-label="القائمة"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#home" className="nav-link" onClick={() => setMobileMenuOpen(false)}>الرئيسية</a>
          <a href="#features" className="nav-link" onClick={() => setMobileMenuOpen(false)}>المميزات</a>
          <a href="#clients" className="nav-link" onClick={() => setMobileMenuOpen(false)}>عملاؤنا</a>
          <a href="#pricing" className="nav-link" onClick={() => setMobileMenuOpen(false)}>الأسعار</a>
          <a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>اتصل بنا</a>
          <Link to="/login" className="btn btn-outline" onClick={() => setMobileMenuOpen(false)}>تسجيل الدخول</Link>
          <button className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>ابدأ تجربتك المجانية</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container hero-content">
          <div className="hero-text fade-in-up">
            <span className="hero-badge">نظام إدارة الموارد البشرية الأذكى</span>
            <h1 className="hero-title">
              إدارة شؤون موظفيك <br />
              <span className="text-gradient-accent">أكثر ذكاءً واحترافية</span>
            </h1>
            <p className="hero-description">
              المنصة السحابية المتكاملة لإدارة الحضور، الانصراف، الإجازات، والرواتب. وفر وقتك وأدر فريق عملك بكفاءة عالية ومن مكان واحد.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary">
                ابدأ الآن مجاناً <ChevronRight size={20} />
              </button>
              <button className="btn btn-outline">
                احجز عرضاً توضيحياً
              </button>
            </div>
          </div>
          <div className="hero-image fade-in-up delay-200">
            <div className="glass-card p-4">
              <div style={{
                background: 'linear-gradient(45deg, #1e293b, #0f172a)',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
                position: 'relative'
              }}>
                <img
                  src="/admin_dashboard.png"
                  alt="لوحة تحكم نظام انضباط"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    display: 'block'
                  }}
                />

                {/* Floating Element */}
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                  padding: '1rem',
                  borderRadius: '1rem',
                  boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <CheckCircle2 color="white" />
                  <span style={{ fontWeight: 'bold' }}>اكتمل حضور الموظفين 100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-wrapper">
        <div className="container">
          <div className="stats-floating-card">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon"><Briefcase size={28} /></div>
                <div className="stat-value">+٥٠٠</div>
                <div className="stat-label">شركة ومؤسسة</div>
              </div>
              <div className="stat-item">
                <div className="stat-icon"><Users size={28} /></div>
                <div className="stat-value">+٥٠,٠٠٠</div>
                <div className="stat-label">موظف نشط</div>
              </div>
              <div className="stat-item">
                <div className="stat-icon"><ShieldCheck size={28} /></div>
                <div className="stat-value">٩٩.٩%</div>
                <div className="stat-label">ضمان استقرار النظام</div>
              </div>
              <div className="stat-item">
                <div className="stat-icon"><Phone size={28} /></div>
                <div className="stat-value">٢٤/٧</div>
                <div className="stat-label">دعم فني متواصل</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header fade-in-up">
            <h2 className="section-title">كل ما تحتاجه لإدارة موظفيك <span className="text-gradient-accent">وأكثر</span></h2>
            <p className="section-desc">
              نقدم لك مجموعة متكاملة من الأدوات لتنظيم الموارد البشرية بكفاءة عالية، عبر واجهة مستخدم عصرية وسهلة الاستخدام.
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="feature-card-header">
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                </div>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="steps-section section-light">
        <div className="container">
          <div className="section-header fade-in-up">
            <h2 className="section-title">كيف يعمل <span className="text-gradient-accent">نظام انضباط؟</span></h2>
            <p className="section-desc">خطوات بسيطة وسريعة لأتمتة شؤون موظفيك بالكامل</p>
          </div>
          <div className="steps-grid">
            <div className="step-card fade-in-up">
              <div className="step-number">1</div>
              <h3 className="step-title">إنشاء الهيكل التنظيمي</h3>
              <p className="step-desc">سجل بيانات شركتك، أضف الأقسام، واستورد بيانات موظفيك بضغطة زر وبكل سهولة.</p>
            </div>
            <div className="step-card fade-in-up delay-100">
              <div className="step-number">2</div>
              <h3 className="step-title">تخصيص السياسات</h3>
              <p className="step-desc">حدد ساعات العمل والورديات، وصمم سياسات الإجازات ولوائح الخصومات والمكافآت الخاصة بك.</p>
            </div>
            <div className="step-card fade-in-up delay-200">
              <div className="step-number">3</div>
              <h3 className="step-title">الإدارة الذكية والمتابعة</h3>
              <p className="step-desc">دع النظام يحسب الرواتب والغيابات آلياً، وتابع التقارير الشاملة واستقبل طلبات موظفيك لحظياً.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="features" style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingBottom: '4rem' }}>
        <div className="container">
          <div className="section-header fade-in-up" style={{ marginBottom: '2rem' }}>
            <h2 className="section-title">شركاء <span className="text-gradient-accent">النجاح</span></h2>
            <p className="section-desc">نفخر بثقة أكثر من 500+ شركة ومؤسسة رائدة تعتمد على نظام انضباط يومياً لإدارة فرق عملها</p>
          </div>
        </div>

        <div className="clients-slider-wrapper fade-in-up delay-200">
          <div className="clients-track">
            {duplicatedClients.map((client, index) => (
              <div key={index} className="client-logo-card">
                <span className="client-icon">{client.icon}</span>
                <span>{client.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing">
        <div className="container">
          <div className="section-header fade-in-up">
            <h2 className="section-title">باقات مرنة تناسب حجم شركتك</h2>
            <p className="section-desc">أسعار شفافة وبدون تكاليف خفية، مع فترة تجريبية مجانية لمدة 14 يوماً</p>
          </div>
          <div className="pricing-grid">
            {plans.map((plan, index) => (
              <div key={index} className={`pricing-card glass-card fade-in-up ${plan.popular ? 'popular' : ''}`} style={{ animationDelay: `${index * 100}ms` }}>
                {plan.popular && <div className="popular-badge">الأكثر طلباً</div>}
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price">
                  {plan.price !== 'طلب تسعير' && <span>ريال/شهرياً للموظف</span>} {plan.price}
                </div>
                <p className="plan-desc">{plan.users}</p>
                <div className="plan-features">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="plan-feature">
                      <CheckCircle2 size={18} className="icon" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <button className={`btn w-100 ${plan.popular ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%' }}>
                  اشترك الآن
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section section-light">
        <div className="container">
          <div className="section-header fade-in-up" style={{ marginBottom: '4rem' }}>
            <h2 className="section-title">تواصل <span className="text-gradient-accent">معنا</span></h2>
            <p className="section-desc">فريق دعم العملاء جاهز للإجابة على كافة استفساراتك ومساعدتك في إعداد النظام</p>
          </div>

          <div className="contact-modern-grid">
            {/* Contact Form */}
            <div className="contact-form-modern fade-in-up">
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>أرسل رسالة</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-grid-2">
                  <input type="text" className="modern-input" placeholder="الاسم الكامل" />
                  <input type="tel" className="modern-input" placeholder="رقم الجوال" />
                </div>
                <input type="email" className="modern-input" placeholder="البريد الإلكتروني للشركة" style={{ width: '100%', marginBottom: '1.5rem' }} />
                <textarea className="modern-input" placeholder="كيف يمكننا مساعدة شركتك؟" rows="3" style={{ width: '100%', resize: 'none', marginBottom: '1.5rem' }}></textarea>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))' }}>
                  إرسال الاستفسار <Send size={18} />
                </button>
              </form>
            </div>

            {/* Contact Info Cards */}
            <div className="contact-info-cards fade-in-up delay-100">
              <div className="contact-card">
                <div className="contact-icon"><Phone /></div>
                <div>
                  <h4>المبيعات والاستفسارات</h4>
                  <p dir="ltr" style={{ fontFamily: 'Inter', textAlign: 'right' }}>050 667 1056</p>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon"><Mail /></div>
                <div>
                  <h4>البريد الإلكتروني</h4>
                  <p>admin@osusprog.com.sa</p>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon"><MapPin /></div>
                <div>
                  <h4>المقر الرئيسي</h4>
                  <p>الرياض، المملكة العربية السعودية</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="container fade-in-up" style={{ marginBottom: '6rem' }}>
        <div className="cta-banner">
          <h2 className="cta-title">مستعد للارتقاء بإدارة مواردك البشرية؟</h2>
          <p className="cta-desc">انضم إلى مئات الشركات التي تثق بنظام انضباط لتسهيل أعمالها اليومية، تحسين رضا موظفيها، وزيادة الإنتاجية.</p>
          <button className="btn btn-white">
            ابدأ تجربتك المجانية الآن <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section-white">
        <div className="container">
          <div className="section-header fade-in-up">
            <h2 className="section-title text-dark">الأسئلة <span className="text-gradient-accent">الشائعة</span></h2>
            <p className="section-desc text-gray">كل ما تحتاج لمعرفته حول نظام انضباط لإدارة الموارد البشرية</p>
          </div>
          <div className="faq-container fade-in-up delay-100">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item-clean ${activeFaq === index ? 'active' : ''}`}
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              >
                <div className="faq-question-clean">
                  <h3>{faq.question}</h3>
                  <ChevronDown className={`faq-icon-clean ${activeFaq === index ? 'rotate' : ''}`} size={24} />
                </div>
                <div className={`faq-answer-clean ${activeFaq === index ? 'open' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">
                <Users className="text-blue-500" />
                <span>نظام <span className="text-gradient-accent">انضباط</span></span>
              </div>
              <p className="footer-desc">
                النظام السحابي المتكامل لإدارة شؤون الموظفين، الحضور والانصراف، والرواتب في المملكة العربية السعودية.
              </p>
              <div className="footer-social">
                <a href="#" className="social-icon">X</a>
                <a href="#" className="social-icon">in</a>
                <a href="#" className="social-icon">f</a>
              </div>
            </div>

            <div>
              <h4 className="footer-heading">الروابط السريعة</h4>
              <div className="footer-links">
                <a href="#" className="footer-link">الرئيسية</a>
                <a href="#features" className="footer-link">المميزات والحلول</a>
                <a href="#clients" className="footer-link">شركاء النجاح</a>
                <a href="#pricing" className="footer-link">باقات الاشتراك</a>
              </div>
            </div>

            <div>
              <h4 className="footer-heading">النظام</h4>
              <div className="footer-links">
                <a href="#" className="footer-link">بوابة الموظفين</a>
                <a href="#" className="footer-link">الأجهزة المدعومة</a>
                <a href="#" className="footer-link">واجهة برمجة التطبيقات API</a>
                <a href="#" className="footer-link">تطبيق الجوال</a>
              </div>
            </div>

            <div>
              <h4 className="footer-heading">المساعدة والدعم</h4>
              <div className="footer-links">
                <a href="#" className="footer-link">مركز المساعدة</a>
                <a href="#" className="footer-link">شروط الخدمة</a>
                <a href="#" className="footer-link">سياسة الخصوصية</a>
                <a href="mailto:admin@osusprog.com.sa" className="footer-link">admin@osusprog.com.sa</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>جميع الحقوق محفوظة © {new Date().getFullYear()} نظام انضباط — تطوير شركة أسس البرمجيات</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
