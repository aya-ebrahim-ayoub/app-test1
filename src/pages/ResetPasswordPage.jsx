import React, { useState } from 'react';
import { Mail, KeyRound, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../App.css';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
    // Simulate API call to send reset link
    setIsSubmitted(true);
  };

  return (
    <div className="login-container bg-mesh">
      <Link to="/login" className="back-link">
        <ArrowRight size={20} /> العودة لتسجيل الدخول
      </Link>
      
      <div className="login-wrapper fade-in-up">
        <div className="login-card glass-card">
          <div className="login-header">
            <h2>استعادة <span className="text-gradient-accent">كلمة المرور</span></h2>
            <p>أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور</p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleReset} className="login-form">
              <div className="form-group">
                <label>البريد الإلكتروني المسجل</label>
                <div className="input-with-icon">
                  <Mail className="input-icon" size={20} />
                  <input 
                    type="email" 
                    className="modern-input" 
                    placeholder="name@company.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100 login-btn">
                إرسال رابط الاستعادة <KeyRound size={20} />
              </button>
            </form>
          ) : (
            <div className="success-message text-center">
              <div className="success-icon" style={{ 
                background: 'rgba(34, 197, 94, 0.1)', 
                color: '#22c55e', 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>تم إرسال الرابط بنجاح!</h3>
              <p style={{ color: 'var(--gray-400)', marginBottom: '2rem' }}>
                يرجى التحقق من صندوق الوارد في بريدك الإلكتروني <strong>{email}</strong> واتباع التعليمات لإعادة تعيين كلمة المرور.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)} 
                className="btn btn-outline w-100"
              >
                إرسال مرة أخرى
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Assuming CheckCircle2 might be needed for the success state, we import it
import { CheckCircle2 } from 'lucide-react';

export default ResetPasswordPage;
