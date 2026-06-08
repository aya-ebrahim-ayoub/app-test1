import React, { useState } from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Clock, 
  CreditCard, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  FileText,
  ShieldAlert,
  UserCheck,
  User,
  Fingerprint,
  CheckCircle2,
  Lock,
  MapPin,
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  Plus,
  Check,
  Trash2,
  Pencil,
  Download,
  Activity,
  Building2,
  ChevronDown,
  BarChart3,
  Filter,
  MoreHorizontal,
  UserPlus,
  AlertTriangle
} from 'lucide-react';
import '../Dashboard.css';

const Dashboard = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLeaveModalOpen, setLeaveModalOpen] = useState(false);
  const [isPermissionModalOpen, setPermissionModalOpen] = useState(false);
  const [isAddEmployeeOpen, setAddEmployeeOpen] = useState(false);
  const [isAddBranchOpen, setAddBranchOpen] = useState(false);
  const [adminTab, setAdminTab] = useState('overview');
  
  // Get role and email from login state. If not present, default to employee or redirect.
  // In a real app, you would check a token or global auth context.
  const role = location.state?.role || 'employee';
  const email = location.state?.email || 'user@company.com';

  if (!location.state?.role) {
    // If accessed directly without logging in, redirect to login
    // return <Navigate to="/login" />;
  }

  // Define permissions/menus based on roles
  const getSidebarMenu = () => {
    const menus = {
      admin: [
        { title: 'الرئيسية', icon: <LayoutDashboard size={20} />, path: '#' },
        { title: 'إدارة النظام', icon: <Settings size={20} />, path: '#' },
        { title: 'الصلاحيات والمستخدمين', icon: <ShieldAlert size={20} />, path: '#' },
        { title: 'سجلات النظام', icon: <FileText size={20} />, path: '#' },
      ],
      hr: [
        { title: 'الرئيسية', icon: <LayoutDashboard size={20} />, path: '#' },
        { title: 'دليل الموظفين', icon: <Users size={20} />, path: '#' },
        { title: 'الحضور والانصراف', icon: <Clock size={20} />, path: '#' },
        { title: 'طلبات الإجازات', icon: <Calendar size={20} />, path: '#' },
        { title: 'مسيرات الرواتب', icon: <CreditCard size={20} />, path: '#' },
      ],
      manager: [
        { title: 'الرئيسية', icon: <LayoutDashboard size={20} />, path: '#' },
        { title: 'فريق العمل', icon: <Users size={20} />, path: '#' },
        { title: 'موافقات الإجازات', icon: <UserCheck size={20} />, path: '#' },
        { title: 'تقييم الأداء', icon: <FileText size={20} />, path: '#' },
      ],
      employee: [
        { title: 'الرئيسية', icon: <LayoutDashboard size={20} />, id: 'home' },
        { title: 'الحضور والانصراف', icon: <Clock size={20} />, id: 'attendance' },
        { title: 'الإجازات', icon: <Calendar size={20} />, id: 'leaves' },
        { title: 'الاستئذانات', icon: <Bell size={20} />, id: 'permissions' },
        { title: 'الملف الشخصي', icon: <User size={20} />, id: 'profile' },
      ]
    };

    return menus[role] || menus.employee;
  };

  const menuItems = getSidebarMenu();

  const getRoleLabel = () => {
    switch(role) {
      case 'admin': return 'مدير النظام';
      case 'hr': return 'موظف موارد بشرية';
      case 'manager': return 'مدير قسم';
      default: return 'موظف';
    }
  };

  /* ============================================================
     ADMIN CONTROL PANEL  (Sidebar dashboard)
     ============================================================ */
  if (role === 'admin') {
    const adminMenu = [
      { id: 'overview', title: 'نظرة عامة', icon: <LayoutDashboard size={20} /> },
      { id: 'employees', title: 'إدارة الموظفين', icon: <Users size={20} /> },
      { id: 'attendance', title: 'الحضور والانصراف', icon: <Clock size={20} /> },
      { id: 'leaves', title: 'طلبات الإجازات', icon: <Calendar size={20} />, badge: 3 },
      { id: 'permissions', title: 'طلبات الاستئذان', icon: <Bell size={20} />, badge: 2 },
      { id: 'departments', title: 'الأقسام والفروع', icon: <Building2 size={20} /> },
      { id: 'reports', title: 'التقارير والإحصائيات', icon: <BarChart3 size={20} /> },
      { id: 'settings', title: 'إعدادات النظام', icon: <Settings size={20} /> },
    ];

    const employees = [
      { name: 'أحمد محمد', id: 'EMP-2026-094', dept: 'تقنية المعلومات', role: 'مهندس برمجيات', status: 'نشط', statusType: 'success' },
      { name: 'سارة عبدالله', id: 'EMP-2026-061', dept: 'الموارد البشرية', role: 'أخصائي توظيف', status: 'نشط', statusType: 'success' },
      { name: 'خالد العتيبي', id: 'EMP-2026-045', dept: 'المالية', role: 'محاسب', status: 'في إجازة', statusType: 'warning' },
      { name: 'نورة القحطاني', id: 'EMP-2026-088', dept: 'التسويق', role: 'مصمم جرافيك', status: 'نشط', statusType: 'success' },
      { name: 'عبدالرحمن سالم', id: 'EMP-2026-102', dept: 'المبيعات', role: 'مندوب مبيعات', status: 'موقوف', statusType: 'danger' },
    ];

    const adminTitle = adminMenu.find(m => m.id === adminTab)?.title || 'لوحة التحكم';

    /* --- Chart helpers --- */
    const smoothPath = (pts) => {
      if (pts.length < 2) return '';
      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i - 1] || pts[i];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2] || p2;
        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;
        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
      }
      return d;
    };

    // Weekly attendance area chart
    const attChart = [
      { d: 'الأحد', v: 92 }, { d: 'الإثنين', v: 88 }, { d: 'الثلاثاء', v: 95 },
      { d: 'الأربعاء', v: 80 }, { d: 'الخميس', v: 87 },
    ];
    const CW = 660, CH = 240, CP = 36;
    const stepX = (CW - CP * 2) / (attChart.length - 1);
    const yOf = (v) => CH - CP - (v / 100) * (CH - CP * 1.6);
    const cPts = attChart.map((p, i) => ({ x: CP + i * stepX, y: yOf(p.v) }));
    const lineD = smoothPath(cPts);
    const areaD = `${lineD} L ${cPts[cPts.length - 1].x} ${CH - CP} L ${cPts[0].x} ${CH - CP} Z`;

    // Attendance donut
    const donut = [
      { label: 'حاضر', val: 112, color: '#16a34a' },
      { label: 'متأخر', val: 6, color: '#d97706' },
      { label: 'غائب', val: 10, color: '#dc2626' },
    ];
    const donutTotal = donut.reduce((s, d) => s + d.val, 0);
    const R = 70, CIRC = 2 * Math.PI * R;
    let donutOffset = 0;
    const donutSegs = donut.map(d => {
      const len = (d.val / donutTotal) * CIRC;
      const seg = { ...d, dash: `${len} ${CIRC - len}`, offset: -donutOffset, pct: Math.round((d.val / donutTotal) * 100) };
      donutOffset += len;
      return seg;
    });

    return (
      <div className="admin-layout">
        {/* Mobile sidebar overlay */}
        <div
          className={`admin-sidebar-overlay ${sidebarOpen ? 'show' : ''}`}
          onClick={() => setSidebarOpen(false)}
        ></div>

        {/* Sidebar */}
        <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="admin-brand">
            <Users size={26} />
            <span>نظام <span className="text-gradient-accent">انضباط</span></span>
          </div>

          <div className="admin-nav-label">القائمة الرئيسية</div>
          <nav className="admin-nav">
            {adminMenu.map(item => (
              <button
                key={item.id}
                onClick={() => { setAdminTab(item.id); setSidebarOpen(false); }}
                className={`admin-nav-item ${adminTab === item.id ? 'active' : ''}`}
              >
                <span className="ani-icon">{item.icon}</span>
                <span className="ani-title">{item.title}</span>
                {item.badge && <span className="ani-badge">{item.badge}</span>}
              </button>
            ))}
          </nav>

          <div className="admin-sidebar-footer">
            <div className="admin-mini-profile">
              <div className="amp-avatar">{email.charAt(0).toUpperCase()}</div>
              <div className="amp-text">
                <strong>{email.split('@')[0]}</strong>
                <span>مدير النظام</span>
              </div>
            </div>
            <Link to="/" className="admin-logout"><LogOut size={18} /> تسجيل الخروج</Link>
          </div>
        </aside>

        {/* Main */}
        <main className="admin-main">
          {/* Topbar */}
          <header className="admin-topbar">
            <div className="admin-topbar-start">
              <button
                className="admin-menu-toggle"
                aria-label="القائمة"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu size={22} />
              </button>
              <div>
                <h1 className="admin-page-title">{adminTitle}</h1>
                <p className="admin-breadcrumb">لوحة تحكم المدير / {adminTitle}</p>
              </div>
            </div>
            <div className="admin-topbar-actions">
              <div className="admin-search">
                <Search size={18} />
                <input type="text" placeholder="بحث سريع..." />
              </div>
              <button className="admin-icon-btn"><Bell size={20} /><span className="badge">5</span></button>
            </div>
          </header>

          <div className="admin-content">

            {/* ===== OVERVIEW ===== */}
            {adminTab === 'overview' && (
              <div className="admin-fade">
                <div className="admin-stats-grid">
                  {[
                    { label: 'إجمالي الموظفين', value: '128', icon: <Users size={22} />, trend: '+4', up: true, color: 'blue' },
                    { label: 'الحاضرون اليوم', value: '112', icon: <UserCheck size={22} />, trend: '87%', up: true, color: 'green' },
                    { label: 'طلبات معلقة', value: '7', icon: <FileText size={22} />, trend: '+3', up: false, color: 'orange' },
                    { label: 'في إجازة', value: '9', icon: <Calendar size={22} />, trend: '-1', up: true, color: 'purple' },
                  ].map((s, i) => (
                    <div key={i} className={`admin-stat-card ${s.color}`}>
                      <div className="asc-head">
                        <div className="asc-icon">{s.icon}</div>
                        <span className="asc-label">{s.label}</span>
                      </div>
                      <div className="asc-bottom">
                        <div className="asc-value">{s.value}</div>
                        <span className={`asc-trend ${s.up ? 'up' : 'down'}`}>
                          {s.up ? <TrendingUp size={13} /> : <TrendingDown size={13} />} {s.trend}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="admin-chart-grid">
                  {/* Weekly attendance area chart */}
                  <div className="admin-panel">
                    <div className="admin-panel-head">
                      <div>
                        <h3><Activity size={20} /> معدل الحضور الأسبوعي</h3>
                      </div>
                      <button className="admin-ghost-btn"><Download size={16} /> تصدير</button>
                    </div>
                    <div className="admin-chart-body">
                      <div className="chart-kpi">
                        <span className="ck-num">88.4%</span>
                        <span className="ck-tag up"><TrendingUp size={13} /> +2.3% عن الأسبوع الماضي</span>
                      </div>
                      <svg className="area-chart" viewBox={`0 0 ${CW} ${CH}`} preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                          </linearGradient>
                          <linearGradient id="lineG" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#fbbf24" />
                            <stop offset="100%" stopColor="#d97706" />
                          </linearGradient>
                        </defs>
                        {/* grid lines */}
                        {[0, 25, 50, 75, 100].map((g, i) => (
                          <g key={i}>
                            <line x1={CP} y1={yOf(g)} x2={CW - CP} y2={yOf(g)} stroke="#eef2f7" strokeWidth="1" />
                            <text x={CP - 8} y={yOf(g) + 4} textAnchor="end" fontSize="11" fill="#94a3b8" fontFamily="Cairo">{g}%</text>
                          </g>
                        ))}
                        <path d={areaD} fill="url(#areaFill)" />
                        <path d={lineD} fill="none" stroke="url(#lineG)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                        {cPts.map((p, i) => (
                          <g key={i}>
                            <circle cx={p.x} cy={p.y} r="5.5" fill="#fff" stroke="#d97706" strokeWidth="3" />
                            <text x={p.x} y={p.y - 14} textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a" fontFamily="Cairo">{attChart[i].v}%</text>
                            <text x={p.x} y={CH - CP + 22} textAnchor="middle" fontSize="12" fill="#64748b" fontFamily="Cairo">{attChart[i].d}</text>
                          </g>
                        ))}
                      </svg>
                    </div>
                  </div>

                  {/* Attendance donut */}
                  <div className="admin-panel">
                    <div className="admin-panel-head">
                      <h3><BarChart3 size={20} /> توزيع الحضور اليوم</h3>
                    </div>
                    <div className="donut-wrap">
                      <svg viewBox="0 0 200 200" className="donut-svg">
                        <circle cx="100" cy="100" r={R} fill="none" stroke="#f1f5f9" strokeWidth="22" />
                        {donutSegs.map((s, i) => (
                          <circle key={i} cx="100" cy="100" r={R} fill="none" stroke={s.color} strokeWidth="22"
                            strokeDasharray={s.dash} strokeDashoffset={s.offset} strokeLinecap="butt"
                            transform="rotate(-90 100 100)" />
                        ))}
                        <text x="100" y="92" textAnchor="middle" fontSize="34" fontWeight="800" fill="#0f172a" fontFamily="Cairo">{donutTotal}</text>
                        <text x="100" y="118" textAnchor="middle" fontSize="13" fill="#64748b" fontFamily="Cairo">إجمالي</text>
                      </svg>
                      <div className="donut-legend">
                        {donutSegs.map((s, i) => (
                          <div key={i} className="dl-item">
                            <span className="dl-dot" style={{ background: s.color }}></span>
                            <span className="dl-label">{s.label}</span>
                            <span className="dl-val">{s.val} <small>({s.pct}%)</small></span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="admin-grid-2">
                  {/* Pending approvals */}
                  <div className="admin-panel">
                    <div className="admin-panel-head">
                      <h3><AlertTriangle size={20} /> طلبات بانتظار الموافقة</h3>
                      <span className="badge-status warning">7 طلبات</span>
                    </div>
                    <div className="admin-approval-list">
                      {[
                        { name: 'أحمد محمد', type: 'إجازة سنوية - 5 أيام', icon: <Calendar size={18} />, c: '#d97706' },
                        { name: 'سارة عبدالله', type: 'خروج مبكر - ساعتان', icon: <Bell size={18} />, c: '#2563eb' },
                        { name: 'خالد العتيبي', type: 'إجازة مرضية - يومان', icon: <Calendar size={18} />, c: '#dc2626' },
                      ].map((a, i) => (
                        <div key={i} className="admin-approval-item">
                          <div className="aai-icon" style={{ color: a.c, background: `${a.c}1a` }}>{a.icon}</div>
                          <div className="aai-text">
                            <strong>{a.name}</strong>
                            <span>{a.type}</span>
                          </div>
                          <div className="aai-actions">
                            <button className="aai-approve"><Check size={16} /></button>
                            <button className="aai-reject"><X size={16} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Department distribution */}
                  <div className="admin-panel">
                    <div className="admin-panel-head">
                      <h3><Building2 size={20} /> توزيع الموظفين على الأقسام</h3>
                      <span className="badge-status" style={{ background: '#eff6ff', color: '#2563eb' }}>128 موظف</span>
                    </div>
                    <div className="admin-dept-list">
                      {[
                        { d: 'التسويق والمبيعات', v: 38, icon: <TrendingUp size={18} />, c: '#9333ea', bg: '#f3e8ff' },
                        { d: 'تقنية المعلومات', v: 32, icon: <Settings size={18} />, c: '#2563eb', bg: '#dbeafe' },
                        { d: 'المالية', v: 21, icon: <CreditCard size={18} />, c: '#d97706', bg: '#fef3c7' },
                        { d: 'الموارد البشرية', v: 14, icon: <Users size={18} />, c: '#16a34a', bg: '#dcfce7' },
                      ].map((p, i) => {
                        const pct = Math.round((p.v / 128) * 100);
                        return (
                          <div key={i} className="admin-dept-row">
                            <div className="adr-icon" style={{ color: p.c, background: p.bg }}>{p.icon}</div>
                            <div className="adr-body">
                              <div className="adr-head">
                                <span className="adr-name">{p.d}</span>
                                <span className="adr-count">{p.v} <small>موظف</small></span>
                              </div>
                              <div className="adr-track">
                                <div className="adr-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${p.c}, ${p.c}cc)` }}></div>
                              </div>
                            </div>
                            <span className="adr-pct" style={{ color: p.c }}>{pct}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Recent activity */}
                <div className="admin-panel">
                  <div className="admin-panel-head">
                    <h3><Activity size={20} /> آخر النشاطات في النظام</h3>
                    <button className="admin-ghost-btn">عرض الكل</button>
                  </div>
                  <div className="table-container" style={{ padding: 0 }}>
                    <table className="modern-table" style={{ margin: 0 }}>
                      <thead>
                        <tr><th>الموظف</th><th>النشاط</th><th>القسم</th><th>الوقت</th><th>الحالة</th></tr>
                      </thead>
                      <tbody>
                        <tr><td style={{fontWeight:600}}>أحمد محمد</td><td>تسجيل حضور</td><td>تقنية المعلومات</td><td>08:02 ص</td><td><span className="badge-status success">مكتمل</span></td></tr>
                        <tr><td style={{fontWeight:600}}>سارة عبدالله</td><td>طلب استئذان</td><td>الموارد البشرية</td><td>09:15 ص</td><td><span className="badge-status warning">معلق</span></td></tr>
                        <tr><td style={{fontWeight:600}}>خالد العتيبي</td><td>طلب إجازة</td><td>المالية</td><td>أمس</td><td><span className="badge-status success">تمت الموافقة</span></td></tr>
                        <tr><td style={{fontWeight:600}}>نورة القحطاني</td><td>تسجيل انصراف</td><td>التسويق</td><td>أمس 05:01 م</td><td><span className="badge-status success">مكتمل</span></td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ===== EMPLOYEES ===== */}
            {adminTab === 'employees' && (
              <div className="admin-fade">
                <div className="admin-panel">
                  <div className="admin-panel-head">
                    <h3><Users size={20} /> قائمة الموظفين ({employees.length})</h3>
                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                      <button className="admin-ghost-btn"><Filter size={16} /> تصفية</button>
                      <button className="btn btn-primary" onClick={() => setAddEmployeeOpen(true)} style={{ padding: '0.6rem 1.2rem', borderRadius: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><UserPlus size={16} /> إضافة موظف</button>
                    </div>
                  </div>
                  <div className="table-container" style={{ padding: 0 }}>
                    <table className="modern-table" style={{ margin: 0 }}>
                      <thead>
                        <tr><th>الموظف</th><th>الرقم الوظيفي</th><th>القسم</th><th>المسمى الوظيفي</th><th>الحالة</th><th>إجراءات</th></tr>
                      </thead>
                      <tbody>
                        {employees.map((e, i) => (
                          <tr key={i}>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                                <div className="admin-row-avatar">{e.name.charAt(0)}</div>
                                <span style={{ fontWeight: 700 }}>{e.name}</span>
                              </div>
                            </td>
                            <td style={{ color: '#64748b' }}>{e.id}</td>
                            <td>{e.dept}</td>
                            <td style={{ color: '#64748b' }}>{e.role}</td>
                            <td><span className={`badge-status ${e.statusType}`}>{e.status}</span></td>
                            <td>
                              <div className="admin-row-actions">
                                <button title="تعديل"><Pencil size={15} /></button>
                                <button title="حذف" className="danger"><Trash2 size={15} /></button>
                                <button title="المزيد"><MoreHorizontal size={15} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ===== ATTENDANCE ===== */}
            {adminTab === 'attendance' && (
              <div className="admin-fade">
                <div className="admin-stats-grid">
                  {[
                    { label: 'حاضر', value: '112', icon: <UserCheck size={24} />, color: 'green' },
                    { label: 'متأخر', value: '6', icon: <Clock size={24} />, color: 'orange' },
                    { label: 'غائب', value: '10', icon: <X size={24} />, color: 'red' },
                    { label: 'انصراف مبكر', value: '4', icon: <LogOut size={24} />, color: 'purple' },
                  ].map((s, i) => (
                    <div key={i} className={`admin-stat-card ${s.color}`}>
                      <div className="asc-top"><div className="asc-icon">{s.icon}</div></div>
                      <div className="asc-value">{s.value}</div>
                      <div className="asc-label">{s.label} اليوم</div>
                    </div>
                  ))}
                </div>
                <div className="admin-panel">
                  <div className="admin-panel-head">
                    <h3><Clock size={20} /> سجل حضور اليوم</h3>
                    <button className="admin-ghost-btn"><Download size={16} /> تصدير التقرير</button>
                  </div>
                  <div className="table-container" style={{ padding: 0 }}>
                    <table className="modern-table" style={{ margin: 0 }}>
                      <thead>
                        <tr><th>الموظف</th><th>القسم</th><th>وقت الدخول</th><th>وقت الخروج</th><th>الحالة</th></tr>
                      </thead>
                      <tbody>
                        <tr><td style={{fontWeight:600}}>أحمد محمد</td><td>تقنية المعلومات</td><td>08:02 ص</td><td>--:--</td><td><span className="badge-status success">حاضر</span></td></tr>
                        <tr><td style={{fontWeight:600}}>سارة عبدالله</td><td>الموارد البشرية</td><td>08:25 ص</td><td>--:--</td><td><span className="badge-status warning">متأخر</span></td></tr>
                        <tr><td style={{fontWeight:600}}>خالد العتيبي</td><td>المالية</td><td>--:--</td><td>--:--</td><td><span className="badge-status danger">غائب</span></td></tr>
                        <tr><td style={{fontWeight:600}}>نورة القحطاني</td><td>التسويق</td><td>07:58 ص</td><td>--:--</td><td><span className="badge-status success">حاضر</span></td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ===== LEAVES & PERMISSIONS (approvals) ===== */}
            {(adminTab === 'leaves' || adminTab === 'permissions') && (
              <div className="admin-fade">
                <div className="admin-panel">
                  <div className="admin-panel-head">
                    <h3>{adminTab === 'leaves' ? <><Calendar size={20} /> طلبات الإجازات</> : <><Bell size={20} /> طلبات الاستئذان</>}</h3>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <span className="badge-status warning">معلق</span>
                      <span className="badge-status success">مقبول</span>
                      <span className="badge-status danger">مرفوض</span>
                    </div>
                  </div>
                  <div className="table-container" style={{ padding: 0 }}>
                    <table className="modern-table" style={{ margin: 0 }}>
                      <thead>
                        <tr><th>الموظف</th><th>النوع</th><th>التاريخ</th><th>المدة</th><th>الحالة</th><th>قرار</th></tr>
                      </thead>
                      <tbody>
                        {(adminTab === 'leaves' ? [
                          { n: 'أحمد محمد', t: 'إجازة سنوية', d: '01 - 05 نوفمبر', dur: '5 أيام', s: 'معلق', st: 'warning' },
                          { n: 'خالد العتيبي', t: 'إجازة مرضية', d: '10 - 11 سبتمبر', dur: 'يومان', s: 'مقبول', st: 'success' },
                          { n: 'نورة القحطاني', t: 'إجازة اضطرارية', d: '20 أكتوبر', dur: 'يوم', s: 'مرفوض', st: 'danger' },
                        ] : [
                          { n: 'سارة عبدالله', t: 'خروج مبكر', d: '24 أكتوبر', dur: 'ساعتان', s: 'معلق', st: 'warning' },
                          { n: 'أحمد محمد', t: 'تأخير صباحي', d: '15 أكتوبر', dur: 'ساعتان', s: 'مقبول', st: 'success' },
                        ]).map((r, i) => (
                          <tr key={i}>
                            <td style={{fontWeight:700}}>{r.n}</td>
                            <td>{r.t}</td>
                            <td style={{color:'#64748b'}}>{r.d}</td>
                            <td><span style={{background:'#f1f5f9',padding:'0.2rem 0.5rem',borderRadius:'6px',fontSize:'0.85rem'}}>{r.dur}</span></td>
                            <td><span className={`badge-status ${r.st}`}>{r.s}</span></td>
                            <td>
                              {r.s === 'معلق' ? (
                                <div className="aai-actions">
                                  <button className="aai-approve"><Check size={16} /></button>
                                  <button className="aai-reject"><X size={16} /></button>
                                </div>
                              ) : <span style={{color:'#94a3b8',fontSize:'0.85rem'}}>تم الإجراء</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ===== DEPARTMENTS ===== */}
            {adminTab === 'departments' && (
              <div className="admin-fade">
                <div className="admin-stats-grid">
                  {[
                    { label: 'تقنية المعلومات', value: '32', color: 'blue' },
                    { label: 'الموارد البشرية', value: '14', color: 'green' },
                    { label: 'المالية', value: '21', color: 'orange' },
                    { label: 'التسويق والمبيعات', value: '38', color: 'purple' },
                  ].map((s, i) => (
                    <div key={i} className={`admin-stat-card ${s.color}`}>
                      <div className="asc-top"><div className="asc-icon"><Building2 size={24} /></div></div>
                      <div className="asc-value">{s.value}</div>
                      <div className="asc-label">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="admin-panel">
                  <div className="admin-panel-head">
                    <h3><Building2 size={20} /> الفروع</h3>
                    <button className="btn btn-primary" onClick={() => setAddBranchOpen(true)} style={{ padding: '0.6rem 1.2rem', borderRadius: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Plus size={16} /> إضافة فرع</button>
                  </div>
                  <div className="table-container" style={{ padding: 0 }}>
                    <table className="modern-table" style={{ margin: 0 }}>
                      <thead><tr><th>الفرع</th><th>المدينة</th><th>عدد الموظفين</th><th>المدير</th></tr></thead>
                      <tbody>
                        <tr><td style={{fontWeight:600}}>الفرع الرئيسي</td><td>الرياض</td><td>78</td><td>محمد الأحمد</td></tr>
                        <tr><td style={{fontWeight:600}}>فرع جدة</td><td>جدة</td><td>34</td><td>علي الزهراني</td></tr>
                        <tr><td style={{fontWeight:600}}>فرع الدمام</td><td>الدمام</td><td>16</td><td>فهد العنزي</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ===== REPORTS ===== */}
            {adminTab === 'reports' && (
              <div className="admin-fade">
                <div className="admin-grid-2">
                  {[
                    { t: 'تقرير الحضور الشهري', d: 'ملخص حضور وانصراف جميع الموظفين خلال الشهر', icon: <Clock size={22} />, c: '#2563eb' },
                    { t: 'تقرير الإجازات', d: 'إحصائيات الإجازات المستخدمة والمتبقية', icon: <Calendar size={22} />, c: '#d97706' },
                    { t: 'تقرير الأداء', d: 'مؤشرات الالتزام والانضباط الوظيفي', icon: <TrendingUp size={22} />, c: '#16a34a' },
                    { t: 'تقرير الرواتب', d: 'كشوف الرواتب والخصومات الشهرية', icon: <CreditCard size={22} />, c: '#9333ea' },
                  ].map((r, i) => (
                    <div key={i} className="admin-report-card">
                      <div className="arc-icon" style={{ color: r.c, background: `${r.c}1a` }}>{r.icon}</div>
                      <div className="arc-text">
                        <h4>{r.t}</h4>
                        <p>{r.d}</p>
                      </div>
                      <button className="admin-ghost-btn"><Download size={16} /> تحميل</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== SETTINGS ===== */}
            {adminTab === 'settings' && (
              <div className="admin-fade">
                <div className="admin-panel">
                  <div className="admin-panel-head"><h3><Settings size={20} /> الإعدادات العامة</h3></div>
                  <div className="admin-settings-list">
                    {[
                      { t: 'مواعيد الدوام الرسمي', d: 'تحديد وقت بداية ونهاية الدوام', v: '08:00 ص - 05:00 م' },
                      { t: 'مدة السماح بالتأخير', d: 'الحد الأقصى للتأخير دون احتساب', v: '15 دقيقة' },
                      { t: 'رصيد الإجازات السنوي', d: 'عدد أيام الإجازة المسموحة سنوياً', v: '21 يوم' },
                      { t: 'رصيد ساعات الاستئذان', d: 'الحد الأقصى لساعات الاستئذان شهرياً', v: '8 ساعات' },
                    ].map((s, i) => (
                      <div key={i} className="admin-setting-row">
                        <div>
                          <strong>{s.t}</strong>
                          <span>{s.d}</span>
                        </div>
                        <div className="admin-setting-val">{s.v} <Pencil size={15} /></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>

        {/* Add Employee Modal */}
        {isAddEmployeeOpen && (
          <div className="modal-overlay" onClick={() => setAddEmployeeOpen(false)}>
            <div className="modal-content professional-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>إضافة موظف جديد</h3>
                <button className="close-btn" onClick={() => setAddEmployeeOpen(false)}><X size={24} /></button>
              </div>
              <div className="modal-body" style={{ padding: '1.5rem 2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>الاسم الكامل</label>
                    <input type="text" className="professional-input" placeholder="مثال: أحمد محمد" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontFamily: 'Cairo', fontSize: '0.95rem', color: '#0f172a', backgroundColor: '#f8fafc' }} />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>الرقم الوظيفي</label>
                    <input type="text" className="professional-input" placeholder="EMP-2026-000" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontFamily: 'Cairo', fontSize: '0.95rem', color: '#0f172a', backgroundColor: '#f8fafc' }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>القسم</label>
                    <select className="professional-input" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontFamily: 'Cairo', fontSize: '0.95rem', color: '#0f172a', backgroundColor: '#f8fafc' }}>
                      <option>تقنية المعلومات</option>
                      <option>الموارد البشرية</option>
                      <option>المالية</option>
                      <option>التسويق والمبيعات</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>المسمى الوظيفي</label>
                    <input type="text" className="professional-input" placeholder="مثال: مهندس برمجيات" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontFamily: 'Cairo', fontSize: '0.95rem', color: '#0f172a', backgroundColor: '#f8fafc' }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>البريد الإلكتروني</label>
                    <input type="email" className="professional-input" placeholder="name@company.com" dir="ltr" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontFamily: 'Cairo', fontSize: '0.95rem', color: '#0f172a', backgroundColor: '#f8fafc' }} />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>رقم الجوال</label>
                    <input type="tel" className="professional-input" placeholder="05xxxxxxxx" dir="ltr" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontFamily: 'Cairo', fontSize: '0.95rem', color: '#0f172a', backgroundColor: '#f8fafc' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <button className="btn btn-outline" onClick={() => setAddEmployeeOpen(false)} style={{ padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 'bold' }}>إلغاء</button>
                  <button className="btn btn-primary" onClick={() => { setAddEmployeeOpen(false); alert('تمت إضافة الموظف بنجاح!'); }} style={{ padding: '0.75rem 2rem', borderRadius: '10px', fontWeight: 'bold' }}>حفظ الموظف</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Branch Modal */}
        {isAddBranchOpen && (
          <div className="modal-overlay" onClick={() => setAddBranchOpen(false)}>
            <div className="modal-content professional-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '550px' }}>
              <div className="modal-header">
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>إضافة فرع جديد</h3>
                <button className="close-btn" onClick={() => setAddBranchOpen(false)}><X size={24} /></button>
              </div>
              <div className="modal-body" style={{ padding: '1.5rem 2rem' }}>
                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>اسم الفرع</label>
                  <input type="text" className="professional-input" placeholder="مثال: فرع الدمام" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontFamily: 'Cairo', fontSize: '0.95rem', color: '#0f172a', backgroundColor: '#f8fafc' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>المدينة</label>
                    <input type="text" className="professional-input" placeholder="مثال: الدمام" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontFamily: 'Cairo', fontSize: '0.95rem', color: '#0f172a', backgroundColor: '#f8fafc' }} />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>مدير الفرع</label>
                    <input type="text" className="professional-input" placeholder="مثال: فهد العنزي" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontFamily: 'Cairo', fontSize: '0.95rem', color: '#0f172a', backgroundColor: '#f8fafc' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <button className="btn btn-outline" onClick={() => setAddBranchOpen(false)} style={{ padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 'bold' }}>إلغاء</button>
                  <button className="btn btn-primary" onClick={() => { setAddBranchOpen(false); alert('تمت إضافة الفرع بنجاح!'); }} style={{ padding: '0.75rem 2rem', borderRadius: '10px', fontWeight: 'bold' }}>حفظ الفرع</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="portal-layout">
      {/* Top Navigation Bar */}
      <header className="portal-header">
        <div className="container portal-header-inner">
          <div className="logo">
            <Users className="text-blue-500" size={28} />
            <span>نظام <span className="text-gradient-accent">انضباط</span></span>
          </div>

          <nav className="portal-nav">
            <ul>
              {menuItems.map((item, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => setActiveTab(item.id || 'home')} 
                    className={`portal-nav-link ${activeTab === (item.id || 'home') ? 'active' : ''}`}
                  >
                    <span>{item.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="portal-user-actions" style={{position: 'relative'}}>
            <button className="icon-btn" onClick={() => setShowNotifications(!showNotifications)}>
              <Bell size={20} />
              <span className="badge">3</span>
            </button>
            
            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="notifications-dropdown">
                <div className="notifications-header">
                  <h4>الإشعارات</h4>
                  <span style={{fontSize: '0.85rem', color: '#3b82f6', cursor: 'pointer'}}>تحديد كمقروء</span>
                </div>
                <div className="notifications-list">
                  <div className="notification-item unread">
                    <div className="notif-icon success"><CheckCircle2 size={16}/></div>
                    <div className="notif-content">
                      <p>تمت الموافقة على طلب الاستئذان الخاص بك ليوم الغد.</p>
                      <span>منذ ساعتين</span>
                    </div>
                  </div>
                  <div className="notification-item unread">
                    <div className="notif-icon warning"><Bell size={16}/></div>
                    <div className="notif-content">
                      <p>تذكير: يرجى تسجيل الحضور، لقد بدأ وقت الدوام.</p>
                      <span>اليوم 08:05 ص</span>
                    </div>
                  </div>
                  <div className="notification-item">
                    <div className="notif-icon blue"><Calendar size={16}/></div>
                    <div className="notif-content">
                      <p>تم تحديث رصيد الإجازات السنوي، لديك الآن 18 يوم متبقي.</p>
                      <span>منذ 3 أيام</span>
                    </div>
                  </div>
                </div>
                <div className="notifications-footer">
                  <button>عرض كل الإشعارات</button>
                </div>
              </div>
            )}

            <div className="portal-user-menu">
              <div className="avatar-small">{email.charAt(0).toUpperCase()}</div>
              <div className="user-text-info">
                <span className="user-name">{email.split('@')[0]}</span>
                <span className="user-role">{getRoleLabel()}</span>
              </div>
            </div>
            <Link to="/" className="portal-logout-btn">
              <LogOut size={18} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="portal-main">
        <div className="container">
          {/* Welcome Banner - Always visible or per tab? Let's show it only on home */}
          {activeTab === 'home' && (
            <div className="portal-welcome-banner">
              <div className="welcome-content">
                <h2>مرحباً بك، {email.split('@')[0]} 👋</h2>
                <p>مساحتك الشخصية لإدارة كافة مهامك الوظيفية بسهولة.</p>
              </div>
              <div className="welcome-search">
                <div className="search-input-wrapper">
                  <Search size={20} className="search-icon" />
                  <input type="text" placeholder="ابحث عن موظف، إجازة، تقرير..." className="professional-search" />
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats Based on Role */}
          {activeTab === 'home' && (
            <div className="home-portal-wrapper">
              
              {/* Employee Dashboard */}
              {role === 'employee' && (
                <>
                  {/* Quick Stats Row - Now at the top with 4 items */}
                  <div className="quick-stats-row" style={{marginBottom: '2rem'}}>
                    <div className="stat-card modern-glass-card">
                      <div className="stat-icon-wrapper orange"><Calendar size={28} /></div>
                      <div className="stat-details">
                        <p className="stat-label">رصيد الإجازات</p>
                        <h3 className="stat-value">18 <span className="stat-unit">يوم</span></h3>
                      </div>
                    </div>
                    
                    <div className="stat-card modern-glass-card">
                      <div className="stat-icon-wrapper blue"><Clock size={28} /></div>
                      <div className="stat-details">
                        <p className="stat-label">ساعات العمل (الأسبوع)</p>
                        <h3 className="stat-value">32 <span className="stat-unit">ساعة</span></h3>
                      </div>
                    </div>

                    <div className="stat-card modern-glass-card">
                      <div className="stat-icon-wrapper green"><Bell size={28} /></div>
                      <div className="stat-details">
                        <p className="stat-label">رصيد الاستئذان</p>
                        <h3 className="stat-value">6 <span className="stat-unit">ساعات</span></h3>
                      </div>
                    </div>

                    <div className="stat-card modern-glass-card">
                      <div className="stat-icon-wrapper" style={{background: '#fee2e2', color: '#ef4444'}}><FileText size={28} /></div>
                      <div className="stat-details">
                        <p className="stat-label">طلبات معلقة</p>
                        <h3 className="stat-value">2 <span className="stat-unit">طلب</span></h3>
                      </div>
                    </div>
                  </div>

                  <div className="employee-home-grid">
                  
                  {/* Main Left/Top Section: Action & Stats */}
                  <div className="home-main-col">
                    
                    {/* The Check In Hero Widget */}
                    <div className="checkin-hero-card">
                      {/* Decorative Background Icon */}
                      <div className="checkin-bg-icon">
                        <Fingerprint size={350} />
                      </div>
                      
                      <div className="checkin-hero-centered">
                        
                        {/* Top Bar: Status and Date */}
                        <div className="hero-top-bar">
                          <div className="checkin-status-badge pending">
                            <span className="status-pulse"></span>
                            <span>حالة الدوام: <strong>لم يتم تسجيل الحضور اليوم</strong></span>
                          </div>
                          
                          <div className="date-subtitle-wrapper">
                            <Calendar size={18} />
                            <p className="date-subtitle">الخميس، 24 أكتوبر 2026</p>
                          </div>
                        </div>

                        {/* Center: Massive Time */}
                        <div className="hero-time-center">
                          <h2 className="massive-time">08:00 <span className="am-pm">ص</span></h2>
                        </div>

                        {/* Shift Info Inline */}
                        <div className="hero-shift-inline">
                          <div className="shift-detail-pill">
                             <MapPin size={16} /> <span>الموقع: <strong>الفرع الرئيسي</strong></span>
                          </div>
                          <div className="shift-detail-pill">
                             <Clock size={16} /> <span>الوردية: <strong>08:00 ص - 05:00 م</strong></span>
                          </div>
                        </div>

                        {/* Bottom: Massive Action Button */}
                        <div className="punch-action-center">
                          <button className="btn-massive-punch green-glow">
                            <div className="punch-icon-circle">
                              <Fingerprint size={32} />
                            </div>
                            <div className="punch-text">
                              <strong>تسجيل حضور</strong>
                              <span>بصمة الدخول الآن</span>
                            </div>
                          </button>
                        </div>
                        
                      </div>
                    </div>



                  </div>

                  {/* Side Column: Quick Actions & Notice */}
                  <div className="home-side-col">
                    <div className="dashboard-content-panel quick-actions-panel">
                      <h3 style={{fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        <div style={{width: '4px', height: '20px', background: 'var(--accent)', borderRadius: '4px'}}></div>
                        إجراءات سريعة
                      </h3>
                      <div className="quick-action-list">
                        
                        <button className="quick-action-row-btn" onClick={() => setActiveTab('leaves')}>
                          <div className="qa-icon" style={{background: '#fffbeb', color: '#d97706'}}><Calendar size={22} /></div>
                          <div className="qa-text">
                            <strong>طلب إجازة</strong>
                            <span>تقديم ومتابعة طلبات الإجازة</span>
                          </div>
                          <ChevronLeft className="qa-arrow" size={20} style={{color: '#d97706'}} />
                        </button>
                        
                        <button className="quick-action-row-btn" onClick={() => setActiveTab('permissions')}>
                          <div className="qa-icon" style={{background: '#eff6ff', color: '#2563eb'}}><Bell size={22} /></div>
                          <div className="qa-text">
                            <strong>طلب استئذان</strong>
                            <span>تأخير، خروج مبكر، شخصي</span>
                          </div>
                          <ChevronLeft className="qa-arrow" size={20} style={{color: '#2563eb'}} />
                        </button>

                        <button className="quick-action-row-btn" onClick={() => setActiveTab('attendance')}>
                          <div className="qa-icon" style={{background: '#f0fdf4', color: '#16a34a'}}><FileText size={22} /></div>
                          <div className="qa-text">
                            <strong>سجل الحضور</strong>
                            <span>عرض تقارير الدوام والانصراف</span>
                          </div>
                          <ChevronLeft className="qa-arrow" size={20} style={{color: '#16a34a'}} />
                        </button>

                        <button className="quick-action-row-btn" onClick={() => setActiveTab('profile')}>
                          <div className="qa-icon" style={{background: '#f8fafc', color: '#475569'}}><Lock size={22} /></div>
                          <div className="qa-text">
                            <strong>إعدادات الحساب</strong>
                            <span>تغيير كلمة المرور والبيانات</span>
                          </div>
                          <ChevronLeft className="qa-arrow" size={20} style={{color: '#475569'}} />
                        </button>

                      </div>
                    </div>
                  </div>

                </div>
                
                {/* Recent Activity Table (Full Width) */}
                <div className="dashboard-content-panel" style={{marginTop: '2rem'}}>
                  <div className="panel-header">
                    <h3>أحدث النشاطات</h3>
                    <button className="btn-link">عرض السجل الكامل</button>
                  </div>
                  <div className="table-container">
                    <table className="modern-table">
                      <thead>
                        <tr>
                          <th>النشاط</th>
                          <th>التاريخ</th>
                          <th>الوقت</th>
                          <th>الحالة</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                              <div style={{width: 8, height: 8, borderRadius: '50%', background: '#16a34a'}}></div>
                              <span style={{fontWeight: 600, color: '#0f172a'}}>تسجيل حضور</span>
                            </div>
                          </td>
                          <td style={{color: '#475569'}}>اليوم</td>
                          <td style={{color: '#475569'}}>08:02 ص</td>
                          <td><span className="badge-status success">تم بنجاح</span></td>
                        </tr>
                        <tr>
                          <td>
                            <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                              <div style={{width: 8, height: 8, borderRadius: '50%', background: '#ef4444'}}></div>
                              <span style={{fontWeight: 600, color: '#0f172a'}}>تسجيل انصراف</span>
                            </div>
                          </td>
                          <td style={{color: '#475569'}}>أمس</td>
                          <td style={{color: '#475569'}}>05:05 م</td>
                          <td><span className="badge-status success">تم بنجاح</span></td>
                        </tr>
                        <tr>
                          <td>
                            <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                              <div style={{width: 8, height: 8, borderRadius: '50%', background: '#f59e0b'}}></div>
                              <span style={{fontWeight: 600, color: '#0f172a'}}>طلب استئذان (خروج مبكر)</span>
                            </div>
                          </td>
                          <td style={{color: '#475569'}}>22 أكتوبر</td>
                          <td style={{color: '#475569'}}>03:00 م</td>
                          <td><span className="badge-status warning">قيد الانتظار</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                </>
              )}
              
              {/* Admin/HR/Manager Dashboard Views omitted for brevity but preserved structure */}
              {role !== 'employee' && (
                <>
                  <div className="dashboard-stats-grid">
                    {/* Same as before... just dummy for other roles */}
                  </div>
                  <div className="dashboard-content-panel">
                    <h3>نظرة عامة</h3>
                    <div className="empty-state">
                      <FileText size={48} style={{ color: 'var(--gray-500)', marginBottom: '1rem' }} />
                      <p>لا توجد بيانات لعرضها حالياً. هذه الشاشة للعرض التوضيحي لصلاحيات <strong>{getRoleLabel()}</strong>.</p>
                    </div>
                  </div>
                </>
              )}

            </div>
          )}

          {/* Employee Attendance Tab */}
          {activeTab === 'attendance' && role === 'employee' && (
            <div className="attendance-tab-wrapper" style={{ animation: 'fadeRise 0.4s ease-out' }}>
              
              <div className="panel-header" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem 0' }}>تسجيل الحضور والانصراف</h2>
                  <p style={{ color: '#64748b', margin: 0, fontSize: '1.05rem' }}>قم بتسجيل أوقات عملك بدقة، أو استعرض سجل أيامك السابقة.</p>
                </div>
              </div>

              {/* Action Cards */}
              <div className="dual-card-grid">
                {/* Check In */}
                <div className="modern-glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#ffffff', borderColor: '#bbf7d0', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }}></div>
                  
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', marginBottom: '1.5rem', width: '100%', zIndex: 1 }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(34, 197, 94, 0.12)', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 8px 20px -4px rgba(34,197,94,0.15)' }}>
                      <Fingerprint size={30} />
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem 0' }}>تسجيل الدخول</h3>
                      <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>تأكيد بدء يوم عملك واحتساب الساعات</p>
                    </div>
                  </div>

                  <button className="btn btn-primary" style={{ background: '#22c55e', borderColor: '#22c55e', width: '100%', padding: '0.85rem', fontSize: '1rem', borderRadius: '12px', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(34,197,94,0.25)', zIndex: 1 }}>بصمة الدخول الآن</button>
                </div>

                {/* Check Out */}
                <div className="modern-glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#ffffff', borderColor: '#fecaca', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }}></div>
                  
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', marginBottom: '1.5rem', width: '100%', zIndex: 1 }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.12)', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 8px 20px -4px rgba(239,68,68,0.15)' }}>
                      <LogOut size={30} />
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem 0' }}>تسجيل الخروج</h3>
                      <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>إنهاء يوم عملك وحفظ التقارير في السجل</p>
                    </div>
                  </div>

                  <button className="btn btn-primary" style={{ background: '#ef4444', borderColor: '#ef4444', width: '100%', padding: '0.85rem', fontSize: '1rem', borderRadius: '12px', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(239,68,68,0.25)', zIndex: 1 }}>بصمة الخروج الآن</button>
                </div>
              </div>

              {/* Table Card */}
              <div className="modern-glass-card" style={{ flexDirection: 'column', alignItems: 'stretch', padding: '0', overflow: 'hidden' }}>
                <div className="panel-header" style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 0 }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#0f172a', fontWeight: 800 }}>سجل الحضور للشهر الحالي</h3>
                  <button className="btn btn-outline" style={{ borderRadius: '10px', fontSize: '0.9rem', padding: '0.5rem 1rem' }}>تحميل تقرير (PDF)</button>
                </div>
                <div className="table-container" style={{ padding: '0' }}>
                  <table className="modern-table" style={{ margin: 0, width: '100%' }}>
                    <thead>
                      <tr>
                        <th style={{ paddingRight: '2rem' }}>اليوم</th>
                        <th>وقت الدخول</th>
                        <th>وقت الخروج</th>
                        <th>ساعات العمل</th>
                        <th style={{ paddingLeft: '2rem' }}>ملاحظات</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ paddingRight: '2rem', fontWeight: 600 }}>الخميس 24 أكتوبر</td>
                        <td>08:02 ص</td>
                        <td>--:--</td>
                        <td>--</td>
                        <td style={{ paddingLeft: '2rem' }}>-</td>
                      </tr>
                      <tr>
                        <td style={{ paddingRight: '2rem', fontWeight: 600 }}>الأربعاء 23 أكتوبر</td>
                        <td>08:00 ص</td>
                        <td>05:05 م</td>
                        <td><span style={{background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.85rem'}}>9 ساعات</span></td>
                        <td style={{ paddingLeft: '2rem' }}>-</td>
                      </tr>
                      <tr>
                        <td style={{ paddingRight: '2rem', fontWeight: 600 }}>الثلاثاء 22 أكتوبر</td>
                        <td>08:15 ص</td>
                        <td>05:00 م</td>
                        <td><span style={{background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.85rem'}}>8 ساعات و 45 دقيقة</span></td>
                        <td style={{ paddingLeft: '2rem' }}><span className="badge-status warning">تأخير 15 دقيقة</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* Employee Leaves Tab */}
          {activeTab === 'leaves' && role === 'employee' && (
            <div className="attendance-tab-wrapper" style={{ animation: 'fadeRise 0.4s ease-out' }}>
              
              <div className="panel-header" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem 0' }}>إدارة الإجازات</h2>
                  <p style={{ color: '#64748b', margin: 0, fontSize: '1.05rem' }}>استعرض رصيد إجازاتك وقدم طلبات جديدة بسهولة.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setLeaveModalOpen(true)} style={{ padding: '0.85rem 1.5rem', fontSize: '1.05rem', borderRadius: '12px', fontWeight: 'bold', display: 'flex', gap: '0.5rem', alignItems: 'center', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.25)' }}>
                  تقديم طلب إجازة +
                </button>
              </div>

              {/* Balance Cards */}
              <div className="dual-card-grid">

                {/* Annual Leave */}
                <div className="modern-glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, #ffffff 0%, #fffbeb 100%)', borderColor: '#fde68a', overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }}></div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <h4 style={{ fontSize: '1.15rem', color: '#64748b', margin: 0, fontWeight: 700 }}>الرصيد السنوي المتبقي</h4>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                      <span style={{ fontSize: '3rem', fontWeight: 900, color: '#d97706', lineHeight: 1 }}>18</span>
                      <span style={{ fontSize: '1.1rem', color: '#92400e', fontWeight: 600 }}>يوم</span>
                    </div>
                    <p style={{ color: '#b45309', margin: 0, fontSize: '0.9rem' }}>من أصل 21 يوم لهذا العام</p>
                  </div>
                  <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'rgba(245, 158, 11, 0.15)', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px -5px rgba(245, 158, 11, 0.2)', zIndex: 1 }}>
                    <Calendar size={40} />
                  </div>
                </div>

                {/* Sick Leave */}
                <div className="modern-glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, #ffffff 0%, #eff6ff 100%)', borderColor: '#bfdbfe', overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }}></div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <h4 style={{ fontSize: '1.15rem', color: '#64748b', margin: 0, fontWeight: 700 }}>الإجازات المرضية</h4>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                      <span style={{ fontSize: '3rem', fontWeight: 900, color: '#2563eb', lineHeight: 1 }}>5</span>
                      <span style={{ fontSize: '1.1rem', color: '#1e40af', fontWeight: 600 }}>أيام</span>
                    </div>
                    <p style={{ color: '#1d4ed8', margin: 0, fontSize: '0.9rem' }}>رصيد الحالات الطارئة المتاح</p>
                  </div>
                  <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'rgba(59, 130, 246, 0.15)', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.2)', zIndex: 1 }}>
                    <FileText size={40} />
                  </div>
                </div>

              </div>

              {/* Table Card */}
              <div className="modern-glass-card" style={{ flexDirection: 'column', alignItems: 'stretch', padding: '0', overflow: 'hidden' }}>
                <div className="panel-header" style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 0 }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#0f172a', fontWeight: 800 }}>سجل طلبات الإجازة</h3>
                </div>
                <div className="table-container" style={{ padding: '0' }}>
                  <table className="modern-table" style={{ margin: 0, width: '100%' }}>
                    <thead>
                      <tr>
                        <th style={{ paddingRight: '2rem' }}>نوع الإجازة</th>
                        <th>من تاريخ</th>
                        <th>إلى تاريخ</th>
                        <th>المدة</th>
                        <th style={{ paddingLeft: '2rem' }}>الحالة</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ paddingRight: '2rem', fontWeight: 600 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></div>
                            إجازة سنوية
                          </div>
                        </td>
                        <td>01 نوفمبر 2026</td>
                        <td>05 نوفمبر 2026</td>
                        <td><span style={{background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.85rem'}}>5 أيام</span></td>
                        <td style={{ paddingLeft: '2rem' }}><span className="badge-status warning">قيد الانتظار</span></td>
                      </tr>
                      <tr>
                        <td style={{ paddingRight: '2rem', fontWeight: 600 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></div>
                            إجازة مرضية
                          </div>
                        </td>
                        <td>10 سبتمبر 2026</td>
                        <td>11 سبتمبر 2026</td>
                        <td><span style={{background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.85rem'}}>يومان</span></td>
                        <td style={{ paddingLeft: '2rem' }}><span className="badge-status success">تمت الموافقة</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* Employee Permissions Tab */}
          {activeTab === 'permissions' && role === 'employee' && (
            <div className="attendance-tab-wrapper" style={{ animation: 'fadeRise 0.4s ease-out' }}>

              <div className="panel-header" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem 0' }}>الاستئذانات</h2>
                  <p style={{ color: '#64748b', margin: 0, fontSize: '1.05rem' }}>قدّم طلبات التأخير أو الخروج المبكر وتابع رصيد ساعاتك الشهري.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setPermissionModalOpen(true)} style={{ padding: '0.85rem 1.5rem', fontSize: '1.05rem', borderRadius: '12px', fontWeight: 'bold', display: 'flex', gap: '0.5rem', alignItems: 'center', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.25)' }}>
                  طلب استئذان جديد +
                </button>
              </div>

              {/* Balance Cards */}
              <div className="triple-card-grid">

                {/* Remaining Hours */}
                <div className="modern-glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, #ffffff 0%, #eff6ff 100%)', borderColor: '#bfdbfe', overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '140px', height: '140px', background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }}></div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <h4 style={{ fontSize: '1rem', color: '#64748b', margin: 0, fontWeight: 700 }}>الرصيد المتبقي (هذا الشهر)</h4>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                      <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#2563eb', lineHeight: 1 }}>6</span>
                      <span style={{ fontSize: '1rem', color: '#1e40af', fontWeight: 600 }}>ساعات</span>
                    </div>
                    <p style={{ color: '#1d4ed8', margin: 0, fontSize: '0.85rem' }}>من أصل 8 ساعات مسموحة</p>
                  </div>
                  <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'rgba(59, 130, 246, 0.15)', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.2)', zIndex: 1, flexShrink: 0 }}>
                    <Bell size={32} />
                  </div>
                </div>

                {/* Used Hours */}
                <div className="modern-glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, #ffffff 0%, #fffbeb 100%)', borderColor: '#fde68a', overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '140px', height: '140px', background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }}></div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <h4 style={{ fontSize: '1rem', color: '#64748b', margin: 0, fontWeight: 700 }}>الساعات المستخدمة</h4>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                      <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#d97706', lineHeight: 1 }}>2</span>
                      <span style={{ fontSize: '1rem', color: '#92400e', fontWeight: 600 }}>ساعة</span>
                    </div>
                    <p style={{ color: '#b45309', margin: 0, fontSize: '0.85rem' }}>خلال الشهر الحالي</p>
                  </div>
                  <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'rgba(245, 158, 11, 0.15)', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px -5px rgba(245, 158, 11, 0.2)', zIndex: 1, flexShrink: 0 }}>
                    <Clock size={32} />
                  </div>
                </div>

                {/* Requests Count */}
                <div className="modern-glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)', borderColor: '#bbf7d0', overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '140px', height: '140px', background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }}></div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <h4 style={{ fontSize: '1rem', color: '#64748b', margin: 0, fontWeight: 700 }}>الطلبات المقبولة</h4>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                      <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#16a34a', lineHeight: 1 }}>2</span>
                      <span style={{ fontSize: '1rem', color: '#15803d', fontWeight: 600 }}>طلب</span>
                    </div>
                    <p style={{ color: '#16a34a', margin: 0, fontSize: '0.85rem' }}>من إجمالي طلباتك هذا الشهر</p>
                  </div>
                  <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'rgba(34, 197, 94, 0.15)', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px -5px rgba(34, 197, 94, 0.2)', zIndex: 1, flexShrink: 0 }}>
                    <CheckCircle2 size={32} />
                  </div>
                </div>

              </div>

              {/* Table Card */}
              <div className="modern-glass-card" style={{ flexDirection: 'column', alignItems: 'stretch', padding: '0', overflow: 'hidden' }}>
                <div className="panel-header" style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 0 }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#0f172a', fontWeight: 800 }}>سجل الاستئذانات</h3>
                </div>
                <div className="table-container" style={{ padding: '0' }}>
                  <table className="modern-table" style={{ margin: 0, width: '100%' }}>
                    <thead>
                      <tr>
                        <th style={{ paddingRight: '2rem' }}>نوع الاستئذان</th>
                        <th>التاريخ</th>
                        <th>من الوقت</th>
                        <th>إلى الوقت</th>
                        <th>المدة</th>
                        <th style={{ paddingLeft: '2rem' }}>الحالة</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ paddingRight: '2rem', fontWeight: 600 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div>
                            خروج مبكر (ظرف عائلي)
                          </div>
                        </td>
                        <td>22 أكتوبر 2026</td>
                        <td>03:00 م</td>
                        <td>05:00 م</td>
                        <td><span style={{background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.85rem'}}>ساعتان</span></td>
                        <td style={{ paddingLeft: '2rem' }}><span className="badge-status success">تمت الموافقة</span></td>
                      </tr>
                      <tr>
                        <td style={{ paddingRight: '2rem', fontWeight: 600 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></div>
                            تأخير صباحي (موعد طبي)
                          </div>
                        </td>
                        <td>15 أكتوبر 2026</td>
                        <td>08:00 ص</td>
                        <td>10:00 ص</td>
                        <td><span style={{background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.85rem'}}>ساعتان</span></td>
                        <td style={{ paddingLeft: '2rem' }}><span className="badge-status success">تمت الموافقة</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* Employee Profile Tab */}
          {activeTab === 'profile' && role === 'employee' && (
            <div className="attendance-tab-wrapper" style={{ animation: 'fadeRise 0.4s ease-out' }}>

              <div className="panel-header" style={{ marginBottom: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>الملف الشخصي</h2>
                </div>
              </div>

              <div className="profile-pro-grid">

                {/* Details + Password Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

                  {/* Personal Info Card */}
                  <div className="profile-section-card">
                    <div className="profile-section-head">
                      <span className="psh-bar"></span>
                      <h3><User size={20} style={{ color: '#d97706' }} /> المعلومات الوظيفية</h3>
                    </div>
                    <div className="profile-info-grid">
                      {[
                        { icon: <User size={18} />, label: 'البريد الإلكتروني', value: email },
                        { icon: <Settings size={18} />, label: 'القسم', value: 'قسم تقنية المعلومات (IT)' },
                        { icon: <MapPin size={18} />, label: 'الفرع', value: 'الفرع الرئيسي - الرياض' },
                        { icon: <Calendar size={18} />, label: 'تاريخ الالتحاق', value: '01 يناير 2025' },
                        { icon: <Clock size={18} />, label: 'نظام الدوام', value: '08:00 ص - 05:00 م' },
                        { icon: <UserCheck size={18} />, label: 'حالة الموظف', value: 'دوام كامل' },
                      ].map((item, i) => (
                        <div key={i} className="profile-info-row">
                          <div className="pi-icon">{item.icon}</div>
                          <div className="pi-text">
                            <div className="pi-label">{item.label}</div>
                            <div className="pi-value">{item.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Password Change Card */}
                  <div className="profile-section-card">
                    <div className="profile-section-head">
                      <span className="psh-bar"></span>
                      <h3><Lock size={20} style={{ color: '#d97706' }} /> تغيير كلمة المرور</h3>
                    </div>
                    <div className="profile-pass-body">
                      <div className="profile-pass-grid">
                        <div className="form-group">
                          <label>كلمة المرور الحالية</label>
                          <div className="profile-pass-input-wrap">
                            <Lock size={16} className="pi-lead" />
                            <input type="password" placeholder="••••••••" />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>كلمة المرور الجديدة</label>
                          <div className="profile-pass-input-wrap">
                            <Lock size={16} className="pi-lead" />
                            <input type="password" placeholder="••••••••" />
                          </div>
                        </div>
                      </div>
                      <p className="profile-pass-hint"><ShieldAlert size={14} /> يفضّل أن تتكون من 8 أحرف على الأقل وتحتوي على أرقام ورموز.</p>
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="btn btn-primary" style={{ padding: '0.8rem 2.25rem', borderRadius: '12px', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.25)' }}>حفظ التعديلات</button>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Profile Identity Card */}
                <div className="profile-id-card">
                  <div className="profile-cover"></div>
                  <div className="profile-id-body">
                    <div className="profile-avatar-ring">
                      {email.charAt(0).toUpperCase()}
                      <span className="verify-dot"><CheckCircle2 size={14} /></span>
                    </div>
                    <h4 className="profile-id-name">أحمد محمد</h4>
                    <p className="profile-id-role">مهندس برمجيات</p>
                    <span className="profile-id-chip"><Fingerprint size={14} /> EMP-2026-094</span>
                    <div className="profile-id-stats">
                      <div className="profile-mini-stat">
                        <div className="pm-num">18</div>
                        <div className="pm-label">رصيد إجازات</div>
                      </div>
                      <div className="profile-mini-stat">
                        <div className="pm-num">6</div>
                        <div className="pm-label">ساعات استئذان</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </main>
      {/* Leave Request Modal */}
      {isLeaveModalOpen && (
        <div className="modal-overlay" onClick={() => setLeaveModalOpen(false)}>
          <div className="modal-content professional-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>تقديم طلب إجازة</h3>
              <button className="close-btn" onClick={() => setLeaveModalOpen(false)}><X size={24} /></button>
            </div>
            <div className="modal-body" style={{ padding: '1.5rem 2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>نوع الإجازة</label>
                  <select className="professional-input" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontFamily: 'Cairo', fontSize: '0.95rem', color: '#0f172a', backgroundColor: '#f8fafc' }}>
                    <option>إجازة سنوية</option>
                    <option>إجازة مرضية</option>
                    <option>إجازة اضطرارية</option>
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>من تاريخ</label>
                  <input type="date" className="professional-input" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontFamily: 'Cairo', fontSize: '0.95rem', color: '#0f172a', backgroundColor: '#f8fafc' }} />
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>إلى تاريخ</label>
                  <input type="date" className="professional-input" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontFamily: 'Cairo', fontSize: '0.95rem', color: '#0f172a', backgroundColor: '#f8fafc' }} />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>سبب الإجازة (اختياري)</label>
                <textarea className="professional-input" rows="2" placeholder="اكتب ملاحظاتك أو سبب الإجازة هنا..." style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontFamily: 'Cairo', fontSize: '0.95rem', resize: 'vertical', color: '#0f172a', backgroundColor: '#f8fafc' }}></textarea>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button className="btn btn-outline" onClick={() => setLeaveModalOpen(false)} style={{ padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 'bold' }}>إلغاء</button>
                <button className="btn btn-primary" onClick={() => { setLeaveModalOpen(false); alert('تم إرسال الطلب بنجاح!'); }} style={{ padding: '0.75rem 2rem', borderRadius: '10px', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.25)' }}>إرسال الطلب</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Permission Request Modal */}
      {isPermissionModalOpen && (
        <div className="modal-overlay" onClick={() => setPermissionModalOpen(false)}>
          <div className="modal-content professional-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>طلب استئذان جديد</h3>
              <button className="close-btn" onClick={() => setPermissionModalOpen(false)}><X size={24} /></button>
            </div>
            <div className="modal-body" style={{ padding: '1.5rem 2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>نوع الاستئذان</label>
                  <select className="professional-input" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontFamily: 'Cairo', fontSize: '0.95rem', color: '#0f172a', backgroundColor: '#f8fafc' }}>
                    <option>خروج مبكر</option>
                    <option>تأخير صباحي</option>
                    <option>استئذان شخصي</option>
                    <option>مهمة عمل خارجية</option>
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>التاريخ</label>
                  <input type="date" className="professional-input" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontFamily: 'Cairo', fontSize: '0.95rem', color: '#0f172a', backgroundColor: '#f8fafc' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>من الوقت</label>
                  <input type="time" className="professional-input" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontFamily: 'Cairo', fontSize: '0.95rem', color: '#0f172a', backgroundColor: '#f8fafc' }} />
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>إلى الوقت</label>
                  <input type="time" className="professional-input" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontFamily: 'Cairo', fontSize: '0.95rem', color: '#0f172a', backgroundColor: '#f8fafc' }} />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>سبب الاستئذان</label>
                <textarea className="professional-input" rows="2" placeholder="اكتب سبب الاستئذان هنا..." style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontFamily: 'Cairo', fontSize: '0.95rem', resize: 'vertical', color: '#0f172a', backgroundColor: '#f8fafc' }}></textarea>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button className="btn btn-outline" onClick={() => setPermissionModalOpen(false)} style={{ padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 'bold' }}>إلغاء</button>
                <button className="btn btn-primary" onClick={() => { setPermissionModalOpen(false); alert('تم إرسال طلب الاستئذان بنجاح!'); }} style={{ padding: '0.75rem 2rem', borderRadius: '10px', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.25)' }}>إرسال الطلب</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
