import React, { useState } from 'react';
import { Mail, Lock, LogIn, ArrowRight, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee'); // Just for demo purposes
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login and redirect based on role
    navigate('/dashboard', { state: { role, email } });
  };

  return (
    <div className="login-container bg-mesh">
      <Link to="/" className="back-link">
        <ArrowRight size={20} /> العودة للرئيسية
      </Link>
      
      <div className="login-wrapper fade-in-up">
        <div className="login-card glass-card">
          <div className="login-header">
            <h2>تسجيل <span className="text-gradient-accent">الدخول</span></h2>
            <p>أهلاً بك مجدداً في نظام انضباط</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            {/* For demonstration purposes, allowing role selection */}
            <div className="form-group">
              <label>الدخول بصلاحية (للتجربة)</label>
              <div className="custom-select-wrapper">
                <select 
                  className="modern-input" 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  style={{ width: '100%', cursor: 'pointer', appearance: 'none' }}
                >
                  <option value="admin">مدير النظام (Admin)</option>
                  <option value="employee">موظف (Employee)</option>
                </select>
                <ChevronDown className="select-icon" size={18} />
              </div>
            </div>

            <div className="form-group">
              <label>البريد الإلكتروني</label>
              <div className="input-with-icon ltr-input">
                <Mail className="input-icon" size={20} />
                <input 
                  type="email" 
                  className="modern-input" 
                  placeholder="name@company.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  dir="ltr"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-row">
                <label>كلمة المرور</label>
                <Link to="/reset-password" className="forgot-password">نسيت كلمة المرور؟</Link>
              </div>
              <div className="input-with-icon ltr-input">
                <Lock className="input-icon" size={20} />
                <input 
                  type="password" 
                  className="modern-input" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  dir="ltr"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 login-btn">
              تسجيل الدخول <LogIn size={20} />
            </button>
          </form>
          
          <div className="login-footer">
            <p>تواجه مشكلة في تسجيل الدخول؟ <a href="#">تواصل مع الدعم الفني</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
