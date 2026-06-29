/* ============================================================
   EDUSYNC — SMART CLASSROOM & TIMETABLE SCHEDULER
   script.js — Complete Application Logic
   ============================================================ */

'use strict';

// ============================================================
// DATA STORE
// ============================================================

const DB = {
  faculty: [
    { id: 'F001', fname: 'Dr. Ramesh',   lname: 'Kumar',     email: 'ramesh@edusync.edu',  dept: 'CSE',         desig: 'Professor',        subjects: ['CS301','CS401','CS501'], maxHours: 20, assignedHours: 18, status: 'active',   pref: ['morning'], initials: 'RK', color: '#E3F2FD', tc: '#1565C0', specialization: 'Algorithms' },
    { id: 'F002', fname: 'Prof. Ananya', lname: 'Sharma',    email: 'ananya@edusync.edu',  dept: 'ECE',         desig: 'Assoc. Professor', subjects: ['EC301','EC401'],         maxHours: 18, assignedHours: 16, status: 'active',   pref: ['morning'], initials: 'AS', color: '#F3E5F5', tc: '#6A1B9A', specialization: 'VLSI Design' },
    { id: 'F003', fname: 'Mr. Vijay',    lname: 'Nair',      email: 'vijay@edusync.edu',   dept: 'Mathematics', desig: 'Asst. Professor',  subjects: ['MA201','MA301'],         maxHours: 16, assignedHours: 14, status: 'active',   pref: ['afternoon'], initials: 'VN', color: '#E8F5E9', tc: '#2E7D32', specialization: 'Linear Algebra' },
    { id: 'F004', fname: 'Dr. Sunita',   lname: 'Pillai',    email: 'sunita@edusync.edu',  dept: 'IT',          desig: 'Professor',        subjects: ['IT301','IT401','IT501'], maxHours: 20, assignedHours: 20, status: 'active',   pref: ['morning','afternoon'], initials: 'SP', color: '#FFF8E1', tc: '#E65100', specialization: 'Machine Learning' },
    { id: 'F005', fname: 'Dr. Krishna',  lname: 'Tiwari',    email: 'krishna@edusync.edu', dept: 'Physics',     desig: 'Assoc. Professor', subjects: ['PH101','PH201'],         maxHours: 16, assignedHours: 12, status: 'active',   pref: ['morning'], initials: 'KT', color: '#E0F7FA', tc: '#006064', specialization: 'Quantum Physics' },
    { id: 'F006', fname: 'Ms. Deepa',    lname: 'Menon',     email: 'deepa@edusync.edu',   dept: 'CSE',         desig: 'Asst. Professor',  subjects: ['CS201','CS301'],         maxHours: 16, assignedHours: 16, status: 'active',   pref: ['afternoon'], initials: 'DM', color: '#FCE4EC', tc: '#880E4F', specialization: 'Data Structures' },
    { id: 'F007', fname: 'Dr. Arun',     lname: 'Bose',      email: 'arun@edusync.edu',    dept: 'ECE',         desig: 'Professor',        subjects: ['EC501','EC601'],         maxHours: 18, assignedHours: 0,  status: 'leave',   pref: ['morning'], initials: 'AB', color: '#F9FBE7', tc: '#558B2F', specialization: 'Signal Processing' },
    { id: 'F008', fname: 'Prof. Leela',  lname: 'Krishnan',  email: 'leela@edusync.edu',   dept: 'IT',          desig: 'Asst. Professor',  subjects: ['IT201','IT301'],         maxHours: 14, assignedHours: 14, status: 'active',   pref: ['evening'], initials: 'LK', color: '#EDE7F6', tc: '#4527A0', specialization: 'Web Technologies' },
  ],

  rooms: [
    { id: 'R001', num: 'A-101',       block: 'Block A',    type: 'Classroom',       cap: 60,  facilities: ['Projector','AC'],                           util: 88, status: 'available'   },
    { id: 'R002', num: 'A-204',       block: 'Block A',    type: 'Smart Classroom', cap: 60,  facilities: ['Smart Board','AC','Wi-Fi'],                  util: 95, status: 'available'   },
    { id: 'R003', num: 'B-102',       block: 'Block B',    type: 'Classroom',       cap: 80,  facilities: ['Projector'],                                 util: 72, status: 'available'   },
    { id: 'R004', num: 'Lab-1',       block: 'Lab Block',  type: 'Lab',             cap: 40,  facilities: ['Computers','AC','Projector'],                util: 90, status: 'available'   },
    { id: 'R005', num: 'Lab-2',       block: 'Lab Block',  type: 'Lab',             cap: 60,  facilities: ['Computers','AC','Smart Board'],              util: 85, status: 'maintenance' },
    { id: 'R006', num: 'Seminar Hall',block: 'Block C',    type: 'Seminar Hall',    cap: 200, facilities: ['Projector','AC','Video Conf'],               util: 45, status: 'available'   },
    { id: 'R007', num: 'B-Hall',      block: 'Block B',    type: 'Classroom',       cap: 120, facilities: ['Projector','AC'],                           util: 60, status: 'available'   },
    { id: 'R008', num: 'Smart Lab 1', block: 'Lab Block',  type: 'Smart Classroom', cap: 60,  facilities: ['Smart Board','Computers','AC','Wi-Fi'],      util: 92, status: 'available'   },
  ],

  subjects: [
    { id: 'S001', code: 'CS301',  name: 'Algorithms',              dept: 'CSE',         credits: 4, type: 'Theory',       sem: 5, hoursPerWeek: 4 },
    { id: 'S002', code: 'CS401',  name: 'Operating Systems',       dept: 'CSE',         credits: 4, type: 'Theory',       sem: 5, hoursPerWeek: 4 },
    { id: 'S003', code: 'CS501',  name: 'Machine Learning',        dept: 'CSE',         credits: 4, type: 'Theory',       sem: 7, hoursPerWeek: 3 },
    { id: 'S004', code: 'CS201',  name: 'Data Structures',         dept: 'CSE',         credits: 4, type: 'Theory',       sem: 3, hoursPerWeek: 4 },
    { id: 'S005', code: 'CSLAB1', name: 'DBMS Lab',                dept: 'CSE',         credits: 2, type: 'Lab/Practical', sem: 5, hoursPerWeek: 3 },
    { id: 'S006', code: 'EC301',  name: 'Digital Electronics',     dept: 'ECE',         credits: 4, type: 'Theory',       sem: 5, hoursPerWeek: 4 },
    { id: 'S007', code: 'IT301',  name: 'Web Technologies',        dept: 'IT',          credits: 3, type: 'Theory',       sem: 5, hoursPerWeek: 3 },
    { id: 'S008', code: 'MA201',  name: 'Engineering Mathematics', dept: 'Mathematics', credits: 4, type: 'Theory',       sem: 3, hoursPerWeek: 4 },
    { id: 'S009', code: 'PH101',  name: 'Engineering Physics',     dept: 'Physics',     credits: 4, type: 'Theory',       sem: 1, hoursPerWeek: 4 },
  ],

  students: [
    { roll: 'CS2001', name: 'Aarav Mehta',      dept: 'CSE', overall: 94, today: 'present' },
    { roll: 'CS2002', name: 'Priya Rajan',       dept: 'CSE', overall: 88, today: 'present' },
    { roll: 'CS2003', name: 'Karthik Suresh',    dept: 'CSE', overall: 76, today: 'absent'  },
    { roll: 'CS2004', name: 'Divya Nair',        dept: 'CSE', overall: 92, today: 'present' },
    { roll: 'CS2005', name: 'Arun Sharma',       dept: 'CSE', overall: 85, today: 'late'    },
    { roll: 'CS2006', name: 'Lakshmi Pillai',    dept: 'CSE', overall: 97, today: 'present' },
    { roll: 'CS2007', name: 'Vijay Kumar',       dept: 'CSE', overall: 70, today: 'absent'  },
    { roll: 'CS2008', name: 'Meera Krishnan',    dept: 'CSE', overall: 91, today: 'present' },
    { roll: 'CS2009', name: 'Rohan Das',         dept: 'CSE', overall: 83, today: 'present' },
    { roll: 'CS2010', name: 'Sneha Iyer',        dept: 'CSE', overall: 79, today: 'late'    },
    { roll: 'CS2011', name: 'Arjun Menon',       dept: 'CSE', overall: 95, today: 'present' },
    { roll: 'CS2012', name: 'Kavya Singh',       dept: 'CSE', overall: 68, today: 'absent'  },
  ],

  depts: [
    { name: 'Computer Science Engineering', code: 'CSE',  hod: 'Dr. Ramesh Kumar',    subjects: 42, faculty: 28, color: '#E3F2FD', tc: '#1565C0' },
    { name: 'Electronics & Communication',  code: 'ECE',  hod: 'Prof. Ananya Sharma', subjects: 38, faculty: 24, color: '#F3E5F5', tc: '#6A1B9A' },
    { name: 'Information Technology',       code: 'IT',   hod: 'Dr. Sunita Pillai',   subjects: 35, faculty: 20, color: '#E8F5E9', tc: '#2E7D32' },
    { name: 'Mathematics',                  code: 'MATH', hod: 'Mr. Vijay Nair',       subjects: 22, faculty: 14, color: '#FFF8E1', tc: '#E65100' },
    { name: 'Physics',                      code: 'PHY',  hod: 'Dr. Krishna Tiwari',  subjects: 18, faculty: 10, color: '#E0F7FA', tc: '#006064' },
  ],

  timetable: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    slots: [
      '08:00–09:00', '09:00–10:00', '10:00–11:00', '11:00–12:00',
      '12:00–01:00', '01:00–02:00', '02:00–03:00', '03:00–04:00', '04:00–05:00'
    ],
    // schedule[dayIndex][slotIndex] = 'cssClass|Subject|Faculty|Room' or '' or 'BREAK'
    schedule: [
      // Monday
      ['tt-blue|CS301: Algorithms|Dr. Ramesh|A-204', 'tt-purple|CS-Tutorial|Mr. Vijay|B-102', 'tt-blue|CS401: OS|Dr. Sunita|A-101', '', 'BREAK', '', 'tt-blue|CS201: DSA|Ms. Deepa|A-204', '', ''],
      // Tuesday
      ['tt-green|DBMS Lab|Dr. Ramesh|Lab-1', 'tt-blue|CS401: OS|Dr. Sunita|A-101', '', 'tt-blue|CS301: Algorithms|Dr. Ramesh|A-204', 'BREAK', 'tt-teal|ML Elective|Dr. Sunita|B-102', '', 'tt-purple|Tutorial|Mr. Vijay|A-101', ''],
      // Wednesday
      ['', 'tt-blue|CS201: DSA|Ms. Deepa|A-204', 'tt-blue|CS401: OS|Dr. Sunita|A-101', 'tt-green|DBMS Lab|Dr. Ramesh|Lab-1', 'BREAK', '', 'tt-blue|CS301: Algorithms|Dr. Ramesh|A-204', '', ''],
      // Thursday
      ['tt-blue|CS301: Algorithms|Dr. Ramesh|A-204', '', 'tt-blue|CS201: DSA|Ms. Deepa|A-101', '', 'BREAK', 'tt-green|Sys Lab|Dr. Sunita|Lab-2', '', 'tt-amber|Seminar|Dr. Krishna|S-Hall', ''],
      // Friday
      ['tt-purple|Tutorial|Mr. Vijay|A-204', 'tt-blue|CS401: OS|Dr. Sunita|A-101', '', 'tt-teal|ML Elective|Dr. Sunita|B-102', 'BREAK', '', 'tt-blue|CS201: DSA|Ms. Deepa|A-204', '', ''],
    ]
  },

  conflicts: [
    { type: 'Faculty Clash',   desc: 'Prof. Ananya Sharma double-booked on Monday 10:00 AM (ECE-301 & IT-201)', severity: 'error'   },
    { type: 'Room Overcapacity', desc: 'Room A-101 assigned 65 students but capacity is 60 on Thursday',        severity: 'warning' },
  ],

  notifications: [
    { id: 1, title: 'Timetable Conflict — CSE Sem 5',    desc: 'Room B-102 double-booked on Wednesday 11:00 AM.',        time: 'just now', type: 'danger',  unread: true  },
    { id: 2, title: 'Faculty Preference Submitted',       desc: 'Dr. Ananya Sharma submitted morning slot preferences.',   time: '5 min ago',  type: 'warning', unread: true  },
    { id: 3, title: 'Classroom Capacity Updated',         desc: 'Smart Lab 2 capacity updated from 45 to 60 students.',    time: '20 min ago', type: 'info',    unread: true  },
    { id: 4, title: 'Timetable Export Ready',             desc: 'ECE Sem 3 timetable is ready for download.',              time: '1 hr ago',   type: 'success', unread: false },
    { id: 5, title: 'Monthly Report Generated',           desc: 'Attendance report emailed to all HODs automatically.',    time: '2 hrs ago',  type: 'neutral', unread: false },
  ],

  activityLog: [
    { icon: 'ti-calendar-plus',    bg: '#E3F2FD', color: '#1565C0', text: 'Timetable generated for CSE Sem 5',        time: '2 mins ago' },
    { icon: 'ti-user-plus',        bg: '#E8F5E9', color: '#2E7D32', text: 'New faculty Dr. Priya Nair added to ECE',  time: '18 mins ago' },
    { icon: 'ti-building-plus',    bg: '#FFF8E1', color: '#E65100', text: 'Smart Lab 3 marked as available',           time: '1 hr ago' },
    { icon: 'ti-alert-triangle',   bg: '#FFEBEE', color: '#C62828', text: 'Conflict in IT Sem 3 — auto-resolved',     time: '2 hrs ago' },
    { icon: 'ti-clipboard-check',  bg: '#F3E5F5', color: '#6A1B9A', text: 'Attendance marked for 6 classes today',    time: '3 hrs ago' },
  ],

  nextId: { faculty: 9, room: 9, subject: 10 }
};


// ============================================================
// STATE
// ============================================================

const State = {
  currentPage: 'dashboard',
  chartsInitialized: { dashboard: false, analytics: false },
  chartInstances: {},
  notifPanelOpen: false,
  appInitialized: false,
  editingFacultyId: null,
  editingRoomId: null,
  searchDebounceTimer: null,
};


// ============================================================
// UTILITIES
// ============================================================

function qs(selector, ctx = document) { return ctx.querySelector(selector); }
function qsa(selector, ctx = document) { return [...ctx.querySelectorAll(selector)]; }

function show(el) { if (el) el.style.display = ''; }
function hide(el) { if (el) el.style.display = 'none'; }
function toggleClass(el, cls, force) { if (el) el.classList.toggle(cls, force); }

function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function getInitials(name) {
  return name.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);
}

function pct(val, max) { return Math.min(100, Math.round((val / max) * 100)); }

function debounce(fn, ms = 250) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

function animateValue(el, start, end, duration = 800) {
  if (!el) return;
  const range = end - start;
  const startTime = performance.now();
  const isFloat = String(end).includes('.');
  const step = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = start + range * ease;
    el.textContent = isFloat ? current.toFixed(1) : Math.round(current).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}


// ============================================================
// TOAST NOTIFICATIONS
// ============================================================

const ToastIcons = {
  success: 'ti-circle-check',
  error:   'ti-circle-x',
  warning: 'ti-alert-triangle',
  info:    'ti-info-circle',
};

function showToast(message, type = 'info', duration = 4000) {
  const container = qs('#toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="ti ${ToastIcons[type] || 'ti-info-circle'} toast-icon" style="color:${
      type === 'success' ? 'var(--success)' :
      type === 'error'   ? 'var(--danger)'  :
      type === 'warning' ? 'var(--warning)' : 'var(--info)'
    }"></i>
    <div class="toast-body">
      <div class="toast-message">${escapeHtml(message)}</div>
    </div>
    <button class="toast-close" aria-label="Close"><i class="ti ti-x"></i></button>`;

  toast.querySelector('.toast-close').addEventListener('click', () => removeToast(toast));
  container.appendChild(toast);

  setTimeout(() => removeToast(toast), duration);
}

function removeToast(toast) {
  toast.style.opacity = '0';
  toast.style.transform = 'translateX(16px)';
  toast.style.transition = 'all 0.25s ease';
  setTimeout(() => toast.remove(), 250);
}


// ============================================================
// PAGE NAVIGATION
// ============================================================

function showLanding() {
  hide(qs('#page-login'));
  hide(qs('#page-app'));
  show(qs('#page-landing'));
  qs('#page-landing').style.display = 'block';
}

function showLogin() {
  hide(qs('#page-landing'));
  hide(qs('#page-app'));
  const loginPage = qs('#page-login');
  loginPage.style.display = 'flex';
}

function doLogin() {
  const email = qs('#login-email').value.trim();
  const pass  = qs('#login-pass').value.trim();

  if (!email || !pass) {
    showToast('Please enter your credentials', 'warning');
    return;
  }
  if (email !== 'admin@edusync.edu' || pass !== 'admin123') {
    showToast('Invalid credentials. Use admin@edusync.edu / admin123', 'error');
    qs('#login-pass').style.borderColor = 'var(--danger)';
    setTimeout(() => { qs('#login-pass').style.borderColor = ''; }, 2000);
    return;
  }

  hide(qs('#page-login'));
  qs('#page-app').style.display = 'block';

  if (!State.appInitialized) {
    initApp();
    State.appInitialized = true;
  }
  showPage('dashboard', qs('.nav-item.active'));
  showToast('Welcome back, Dr. Admin! 👋', 'success');
}

function doLogout() {
  hide(qs('#page-app'));
  show(qs('#page-landing'));
  qs('#page-landing').style.display = 'block';
  State.appInitialized = false;
  State.chartsInitialized = { dashboard: false, analytics: false };
  Object.values(State.chartInstances).forEach(c => { try { c.destroy(); } catch(e) {} });
  State.chartInstances = {};
  showToast('Logged out successfully', 'info');
}

function scrollFeatures() {
  qs('#features')?.scrollIntoView({ behavior: 'smooth' });
}


// ============================================================
// APP NAVIGATION (internal pages)
// ============================================================

const PAGE_TITLES = {
  dashboard:     'Dashboard',
  analytics:     'Analytics Dashboard',
  faculty:       'Faculty Management',
  classrooms:    'Classroom Management',
  subjects:      'Subjects & Courses',
  timetable:     'Timetable Generator',
  attendance:    'Attendance Management',
  reports:       'Reports & Exports',
  notifications: 'Notifications & Alerts',
  settings:      'Settings',
};

function showPage(pageId, navEl) {
  // Hide all page contents
  qsa('.page-content').forEach(p => p.classList.remove('active'));

  // Show target
  const target = qs(`#pg-${pageId}`);
  if (!target) return;
  target.classList.add('active');

  // Update sidebar active state
  qsa('.nav-item').forEach(n => n.classList.remove('active'));
  if (navEl) {
    navEl.classList.add('active');
  } else {
    // Find matching nav item by onclick attribute
    qsa('.nav-item').forEach(n => {
      if (n.getAttribute('onclick') && n.getAttribute('onclick').includes(`'${pageId}'`)) {
        n.classList.add('active');
      }
    });
  }

  // Update topbar title
  const titleEl = qs('#topbar-title');
  if (titleEl) titleEl.textContent = PAGE_TITLES[pageId] || pageId;

  State.currentPage = pageId;

  // Page-specific init
  switch (pageId) {
    case 'dashboard':
      if (!State.chartsInitialized.dashboard) {
        setTimeout(initDashboardCharts, 150);
        State.chartsInitialized.dashboard = true;
      }
      break;
    case 'analytics':
      if (!State.chartsInitialized.analytics) {
        setTimeout(initAnalyticsCharts, 150);
        State.chartsInitialized.analytics = true;
      }
      break;
    case 'faculty':     renderFacultyTable();    break;
    case 'classrooms':  renderRoomTable();       break;
    case 'subjects':    renderSubjectTable(); renderDeptList(); break;
    case 'timetable':   renderTimetable();       break;
    case 'attendance':  renderAttendanceTable(); break;
    case 'analytics':   renderUtilList();        break;
  }

  // Close notification panel if open
  closeNotifPanel();
}


// ============================================================
// INIT APP
// ============================================================

function initApp() {
  // Set today's date in dashboard header
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const subtitle = qs('#pg-dashboard .page-header p');
  if (subtitle) subtitle.textContent = `Here's what's happening at your institution today — ${dateStr}`;

  // Render all tables & lists
  renderFacultyTable();
  renderRoomTable();
  renderSubjectTable();
  renderDeptList();
  renderAttendanceTable();
  renderTimetable();
  renderUtilList();

  // Dashboard charts
  setTimeout(initDashboardCharts, 200);
  State.chartsInitialized.dashboard = true;

  // Global search
  const globalSearch = qs('#global-search');
  if (globalSearch) {
    globalSearch.addEventListener('input', debounce(handleGlobalSearch, 300));
  }

  // Modal close on backdrop click
  qsa('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', handleKeyboard);
}


// ============================================================
// KEYBOARD SHORTCUTS
// ============================================================

function handleKeyboard(e) {
  // Escape: close modals & panels
  if (e.key === 'Escape') {
    qsa('.modal-overlay.open').forEach(m => m.classList.remove('open'));
    closeNotifPanel();
  }
  // Ctrl/Cmd + K: focus global search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    qs('#global-search')?.focus();
  }
}


// ============================================================
// FACULTY TABLE
// ============================================================

function renderFacultyTable() {
  const tbody = qs('#faculty-tbody');
  if (!tbody) return;

  if (!DB.faculty.length) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><i class="ti ti-users empty-state-icon"></i><h4 class="empty-state-title">No faculty found</h4><p class="empty-state-desc">Add your first faculty member to get started.</p></div></td></tr>`;
    return;
  }

  tbody.innerHTML = DB.faculty.map(f => {
    const usedPct = pct(f.assignedHours, f.maxHours);
    const barColor = usedPct >= 100 ? '#C62828' : usedPct >= 80 ? '#F57F17' : '#2E7D32';
    const statusBadge = f.status === 'active'
      ? '<span class="badge-pill badge-green">Active</span>'
      : '<span class="badge-pill badge-amber">On Leave</span>';

    return `
    <tr data-faculty-id="${f.id}">
      <td>
        <div class="avatar-cell">
          <div class="avatar-xs" style="background:${f.color};color:${f.tc}">${f.initials}</div>
          <div>
            <div class="avatar-name">${escapeHtml(f.fname + ' ' + f.lname)}</div>
            <div class="avatar-sub">${escapeHtml(f.email)}</div>
          </div>
        </div>
      </td>
      <td><span class="badge-pill badge-blue">${escapeHtml(f.dept)}</span></td>
      <td>${escapeHtml(f.desig)}</td>
      <td><span style="font-size:12px;color:var(--text-muted)">${f.subjects.join(', ')}</span></td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div class="progress-wrap" style="width:60px">
            <div class="progress-fill" style="width:${usedPct}%;background:${barColor}"></div>
          </div>
          <span style="font-size:12px;font-weight:600;color:${barColor}">${f.assignedHours}/${f.maxHours}h</span>
        </div>
      </td>
      <td>${statusBadge}</td>
      <td>
        <div class="action-btns">
          <div class="action-btn edit" onclick="openEditFaculty('${f.id}')" title="Edit faculty"><i class="ti ti-edit"></i></div>
          <div class="action-btn del"  onclick="deleteFaculty('${f.id}')" title="Delete faculty"><i class="ti ti-trash"></i></div>
          <div class="action-btn"      onclick="showToast('Preference form sent to ${escapeHtml(f.fname)}','success')" title="Send preference form"><i class="ti ti-mail"></i></div>
        </div>
      </td>
    </tr>`;
  }).join('');
}

function filterTable(tableId, query) {
  const table = qs(`#${tableId}`);
  if (!table) return;
  const q = query.toLowerCase().trim();
  qsa('tbody tr', table).forEach(row => {
    row.style.display = (!q || row.textContent.toLowerCase().includes(q)) ? '' : 'none';
  });
}

// Add Faculty Modal — open
function openModal(id) {
  const m = qs(`#${id}`);
  if (m) m.classList.add('open');
}

function closeModal(id) {
  const m = qs(`#${id}`);
  if (m) m.classList.remove('open');
}

// Add Faculty — submit
function submitAddFaculty() {
  const modal = qs('#modal-add-faculty');
  const inputs = {
    fname:  qs('[placeholder="Dr. / Prof."]',   modal)?.value.trim(),
    lname:  qs('[placeholder="Surname"]',        modal)?.value.trim(),
    email:  qs('[type="email"]',                 modal)?.value.trim(),
    dept:   qsa('select', modal)[0]?.value,
    desig:  qsa('select', modal)[1]?.value,
    maxH:   parseInt(qsa('input[type="number"]', modal)[0]?.value) || 20,
    spec:   qs('[placeholder*="Machine Learning"]', modal)?.value.trim(),
    subjects: qs('[placeholder*="CS301"]',       modal)?.value.trim(),
  };

  if (!inputs.fname || !inputs.lname) {
    showToast('Please enter first and last name', 'warning');
    return;
  }

  const preferred = qsa('input[type="checkbox"]:checked', modal)
    .filter(c => ['Morning (8–12)','Afternoon (12–4)','Evening (4–6)'].some(l => c.parentElement.textContent.includes(l.split(' ')[0])))
    .map(c => c.parentElement.textContent.trim());

  const newFaculty = {
    id: `F00${DB.nextId.faculty++}`,
    fname: inputs.fname,
    lname: inputs.lname,
    email: inputs.email || `${inputs.fname.toLowerCase()}@edusync.edu`,
    dept:  inputs.dept,
    desig: inputs.desig,
    subjects: inputs.subjects ? inputs.subjects.split(',').map(s => s.trim()) : [],
    maxHours: inputs.maxH,
    assignedHours: 0,
    status: 'active',
    pref: preferred,
    initials: getInitials(inputs.fname + ' ' + inputs.lname),
    color: '#E3F2FD', tc: '#1565C0',
    specialization: inputs.spec || '',
  };

  DB.faculty.push(newFaculty);
  closeModal('modal-add-faculty');
  renderFacultyTable();
  showToast(`Faculty ${inputs.fname} ${inputs.lname} added successfully`, 'success');

  // Reset form
  qsa('input[type="text"], input[type="email"], input[type="number"]', modal)
    .forEach(i => { if (!i.type.includes('number')) i.value = ''; else if (i.placeholder !== '60') i.value = '20'; });
}

// Edit Faculty
function openEditFaculty(id) {
  const f = DB.faculty.find(x => x.id === id);
  if (!f) return;
  State.editingFacultyId = id;

  // Reuse add modal as edit modal (populate fields)
  const modal = qs('#modal-add-faculty');
  qs('.modal-header h3', modal).innerHTML = `<i class="ti ti-user-edit" style="color:var(--brand-blue);margin-right:8px"></i>Edit Faculty`;

  const inputs = qsa('input[type="text"], input[type="email"]', modal);
  if (inputs[0]) inputs[0].value = f.fname;
  if (inputs[1]) inputs[1].value = f.lname;
  const emailInput = qs('input[type="email"]', modal);
  if (emailInput) emailInput.value = f.email;

  const selects = qsa('select', modal);
  if (selects[0]) selects[0].value = f.dept;
  if (selects[1]) selects[1].value = f.desig;

  const numInputs = qsa('input[type="number"]', modal);
  if (numInputs[0]) numInputs[0].value = f.maxHours;

  const submitBtn = qs('.modal-footer .btn-primary', modal);
  if (submitBtn) {
    submitBtn.onclick = () => saveEditFaculty(id);
    submitBtn.innerHTML = '<i class="ti ti-check"></i> Save Changes';
  }

  openModal('modal-add-faculty');
}

function saveEditFaculty(id) {
  const idx = DB.faculty.findIndex(x => x.id === id);
  if (idx < 0) return;
  const modal = qs('#modal-add-faculty');
  const inputs = qsa('input[type="text"]', modal);
  DB.faculty[idx].fname = inputs[0]?.value.trim() || DB.faculty[idx].fname;
  DB.faculty[idx].lname = inputs[1]?.value.trim() || DB.faculty[idx].lname;
  const emailEl = qs('input[type="email"]', modal);
  if (emailEl?.value) DB.faculty[idx].email = emailEl.value.trim();
  const selects = qsa('select', modal);
  if (selects[0]) DB.faculty[idx].dept  = selects[0].value;
  if (selects[1]) DB.faculty[idx].desig = selects[1].value;
  const numInputs = qsa('input[type="number"]', modal);
  if (numInputs[0]) DB.faculty[idx].maxHours = parseInt(numInputs[0].value) || 20;

  closeModal('modal-add-faculty');
  renderFacultyTable();
  resetFacultyModal();
  showToast('Faculty updated successfully', 'success');
}

function resetFacultyModal() {
  const modal = qs('#modal-add-faculty');
  qs('.modal-header h3', modal).innerHTML = `<i class="ti ti-user-plus" style="color:var(--brand-blue);margin-right:8px"></i>Add New Faculty`;
  const submitBtn = qs('.modal-footer .btn-primary', modal);
  if (submitBtn) {
    submitBtn.onclick = () => { closeModal('modal-add-faculty'); submitAddFaculty(); };
    submitBtn.innerHTML = '<i class="ti ti-check"></i> Add Faculty';
  }
  State.editingFacultyId = null;
}

function deleteFaculty(id) {
  const f = DB.faculty.find(x => x.id === id);
  if (!f) return;
  if (!confirm(`Delete ${f.fname} ${f.lname} from the system? This cannot be undone.`)) return;
  DB.faculty = DB.faculty.filter(x => x.id !== id);
  renderFacultyTable();
  showToast(`${f.fname} ${f.lname} removed`, 'error');
}


// ============================================================
// ROOM TABLE
// ============================================================

const TYPE_BADGE = {
  'Classroom':       'badge-blue',
  'Lab':             'badge-green',
  'Smart Classroom': 'badge-purple',
  'Seminar Hall':    'badge-teal',
};

function renderRoomTable() {
  const tbody = qs('#room-tbody');
  if (!tbody) return;

  tbody.innerHTML = DB.rooms.map(r => {
    const utilColor = r.util >= 85 ? '#C62828' : r.util >= 70 ? '#F57F17' : '#2E7D32';
    const typeBadge = TYPE_BADGE[r.type] || 'badge-gray';
    const statusBadge = r.status === 'available'
      ? '<span class="badge-pill badge-green">Available</span>'
      : '<span class="badge-pill badge-amber">Maintenance</span>';
    const facilitiesHtml = r.facilities.map(f =>
      `<span style="background:#F0F4FF;color:#1565C0;padding:2px 6px;border-radius:4px;font-size:11px">${escapeHtml(f)}</span>`
    ).join(' ');

    return `
    <tr data-room-id="${r.id}">
      <td>
        <div class="avatar-cell">
          <div class="avatar-xs" style="background:#EFF6FF;color:#1565C0;border-radius:8px;font-size:11px">${escapeHtml(r.num)}</div>
          <div><div class="avatar-name">${escapeHtml(r.num)}</div><div class="avatar-sub">Floor 1</div></div>
        </div>
      </td>
      <td>${escapeHtml(r.block)}</td>
      <td><span class="badge-pill ${typeBadge}">${escapeHtml(r.type)}</span></td>
      <td><i class="ti ti-users" style="font-size:13px;color:var(--text-muted)"></i> ${r.cap}</td>
      <td><div style="display:flex;gap:4px;flex-wrap:wrap">${facilitiesHtml}</div></td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div class="util-bar" style="width:60px">
            <div class="util-bar-fill" style="width:${r.util}%;background:${utilColor}"></div>
          </div>
          <span style="font-size:12px;font-weight:700;color:${utilColor}">${r.util}%</span>
        </div>
      </td>
      <td>${statusBadge}</td>
      <td>
        <div class="action-btns">
          <div class="action-btn edit" onclick="showToast('Edit room ${escapeHtml(r.num)} opened','info')" title="Edit"><i class="ti ti-edit"></i></div>
          <div class="action-btn del"  onclick="deleteRoom('${r.id}')" title="Delete"><i class="ti ti-trash"></i></div>
        </div>
      </td>
    </tr>`;
  }).join('');
}

function deleteRoom(id) {
  const r = DB.rooms.find(x => x.id === id);
  if (!r) return;
  if (!confirm(`Remove room ${r.num}?`)) return;
  DB.rooms = DB.rooms.filter(x => x.id !== id);
  renderRoomTable();
  updateTabCounts();
  showToast(`Room ${r.num} removed`, 'error');
}

function submitAddRoom() {
  const modal = qs('#modal-add-room');
  const numInput = qs('[placeholder="e.g. A-204"]', modal);
  const capInput = qs('[placeholder="60"]', modal);
  const selects   = qsa('select', modal);

  const num   = numInput?.value.trim();
  const block = selects[0]?.value;
  const type  = selects[1]?.value;
  const cap   = parseInt(capInput?.value) || 60;

  if (!num) { showToast('Room number is required', 'warning'); return; }

  const facilities = qsa('input[type="checkbox"]:checked', modal)
    .map(c => c.parentElement.textContent.trim())
    .filter(Boolean);

  DB.rooms.push({
    id: `R00${DB.nextId.room++}`,
    num, block, type, cap, facilities,
    util: 0, status: 'available'
  });

  closeModal('modal-add-room');
  renderRoomTable();
  updateTabCounts();
  showToast(`Classroom ${num} added successfully`, 'success');
  if (numInput) numInput.value = '';
  if (capInput) capInput.value = '';
}

function updateTabCounts() {
  const total = DB.rooms.length;
  const labs   = DB.rooms.filter(r => r.type === 'Lab').length;
  const smart  = DB.rooms.filter(r => r.type === 'Smart Classroom').length;
  const classrooms = DB.rooms.filter(r => r.type === 'Classroom').length;

  const tabs = qsa('.tab-btn', qs('#pg-classrooms'));
  if (tabs[0]) tabs[0].textContent = `All Rooms (${total})`;
  if (tabs[1]) tabs[1].textContent = `Classrooms (${classrooms})`;
  if (tabs[2]) tabs[2].textContent = `Labs (${labs})`;
  if (tabs[3]) tabs[3].textContent = `Smart Rooms (${smart})`;
}


// ============================================================
// SUBJECT TABLE & DEPT LIST
// ============================================================

function renderSubjectTable() {
  const tbody = qs('#subj-tbody');
  if (!tbody) return;

  const TYPE_COLORS = {
    'Theory':       'badge-blue',
    'Lab/Practical':'badge-green',
    'Tutorial':     'badge-purple',
    'Elective':     'badge-amber',
  };

  tbody.innerHTML = DB.subjects.map(s => `
    <tr>
      <td><span style="font-family:monospace;background:#F0F4FF;color:#1565C0;padding:2px 8px;border-radius:5px;font-size:12px">${escapeHtml(s.code)}</span></td>
      <td><div class="avatar-name">${escapeHtml(s.name)}</div></td>
      <td><span class="badge-pill badge-blue">${escapeHtml(s.dept)}</span></td>
      <td><span class="badge-pill badge-gray">${s.credits} cr</span></td>
      <td><span class="badge-pill ${TYPE_COLORS[s.type] || 'badge-gray'}">${escapeHtml(s.type)}</span></td>
      <td>
        <div class="action-btns">
          <div class="action-btn edit" onclick="showToast('Edit subject ${escapeHtml(s.name)}','info')"><i class="ti ti-edit"></i></div>
          <div class="action-btn del"  onclick="deleteSubject('${s.id}')"><i class="ti ti-trash"></i></div>
        </div>
      </td>
    </tr>`).join('');
}

function deleteSubject(id) {
  const s = DB.subjects.find(x => x.id === id);
  if (!s) return;
  if (!confirm(`Remove subject ${s.name}?`)) return;
  DB.subjects = DB.subjects.filter(x => x.id !== id);
  renderSubjectTable();
  showToast(`Subject "${s.name}" removed`, 'error');
}

function submitAddSubject() {
  const modal   = qs('#modal-add-subject');
  const inputs  = qsa('input', modal);
  const selects = qsa('select', modal);

  const code = inputs[0]?.value.trim();
  const name = inputs[2]?.value.trim();   // Subject Name field
  const credits = parseInt(inputs[1]?.value) || 4;

  if (!code || !name) { showToast('Subject code and name are required', 'warning'); return; }

  DB.subjects.push({
    id:   `S0${DB.nextId.subject++}`,
    code, name,
    dept:         selects[0]?.value || 'CSE',
    sem:          parseInt(selects[1]?.value) || 1,
    type:         selects[2]?.value || 'Theory',
    credits,
    hoursPerWeek: parseInt(inputs[3]?.value) || 4,
  });

  closeModal('modal-add-subject');
  renderSubjectTable();
  showToast(`Subject "${name}" added successfully`, 'success');
}

function renderDeptList() {
  const el = qs('#dept-list');
  if (!el) return;

  el.innerHTML = DB.depts.map(d => `
    <div style="display:flex;align-items:center;gap:12px;padding:12px 20px;border-bottom:1px solid var(--border);cursor:pointer;transition:background .15s"
         onmouseenter="this.style.background='#F8FAFE'" onmouseleave="this.style.background=''">
      <div style="width:36px;height:36px;border-radius:10px;background:${d.color};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:${d.tc}">${escapeHtml(d.code)}</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:600;color:var(--text-main);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(d.name)}</div>
        <div style="font-size:11.5px;color:var(--text-muted)">${d.faculty} faculty · ${d.subjects} subjects</div>
      </div>
      <i class="ti ti-chevron-right" style="font-size:14px;color:var(--text-muted)"></i>
    </div>`).join('');
}


// ============================================================
// TIMETABLE RENDERER
// ============================================================

function renderTimetable() {
  const table = qs('#main-timetable');
  if (!table) return;

  const { days, slots, schedule } = DB.timetable;

  let html = `<thead><tr>
    <th style="min-width:90px;text-align:left;padding-left:12px">Time</th>
    ${days.map(d => `<th>${d}</th>`).join('')}
  </tr></thead><tbody>`;

  slots.forEach((slot, si) => {
    const isBreak = si === 4; // Lunch slot index
    html += '<tr>';
    html += `<td class="tt-time${isBreak ? ' break-cell' : ''}">${isBreak ? 'Lunch' : slot}</td>`;

    days.forEach((_, di) => {
      const cell = schedule[di]?.[si] || '';

      if (isBreak) {
        html += `<td class="break-cell" style="text-align:center;vertical-align:middle;font-size:11px;color:#9E9E9E;background:#FAFAFA">— Lunch Break —</td>`;
        return;
      }

      if (!cell) {
        html += `<td><div class="tt-slot empty" style="min-height:56px;cursor:pointer" onclick="showToast('Click to add a class in this slot','info')" title="Add class"></div></td>`;
        return;
      }

      const parts  = cell.split('|');
      const cls    = parts[0];
      const subj   = parts[1] || '';
      const faculty = parts[2] || '';
      const room   = parts[3] || '';

      html += `
        <td>
          <div class="tt-slot ${cls}" onclick="showToast('${escapeHtml(subj)} — ${escapeHtml(faculty)}','info')" title="${escapeHtml(subj)}">
            <div class="subj">${escapeHtml(subj)}</div>
            <div class="faculty"><i class="ti ti-user" style="font-size:10px"></i> ${escapeHtml(faculty)}</div>
            <div class="room"><i class="ti ti-building" style="font-size:10px"></i> ${escapeHtml(room)}</div>
          </div>
        </td>`;
    });

    html += '</tr>';
  });

  html += '</tbody>';
  table.innerHTML = html;
}

function generateTimetable() {
  showToast('AI is analyzing faculty preferences and room capacity…', 'info');

  setTimeout(() => {
    // Simulate AI conflict check
    const hasConflicts = Math.random() < 0.3;
    if (hasConflicts) {
      showToast('Conflict detected: Room B-102 double-booked on Wednesday. Auto-resolving…', 'warning');
      setTimeout(() => {
        showToast('Timetable generated successfully! All conflicts resolved.', 'success');
        renderTimetable();
      }, 1500);
    } else {
      showToast('Timetable generated! 0 conflicts detected.', 'success');
      renderTimetable();
    }
  }, 1800);
}


// ============================================================
// ATTENDANCE TABLE
// ============================================================

function renderAttendanceTable() {
  const tbody = qs('#att-tbody');
  if (!tbody) return;

  tbody.innerHTML = DB.students.map(s => {
    const overallColor = s.overall >= 85 ? '#2E7D32' : s.overall >= 75 ? '#F57F17' : '#C62828';
    return `
    <tr data-roll="${s.roll}">
      <td><input type="checkbox" ${s.today === 'present' ? 'checked' : ''} onchange="updateAttCount()"></td>
      <td><span style="font-family:monospace;font-weight:600;font-size:12px">${s.roll}</span></td>
      <td><div class="avatar-name">${escapeHtml(s.name)}</div></td>
      <td><span class="badge-pill badge-blue">${s.dept}</span></td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div class="progress-wrap" style="width:50px">
            <div class="progress-fill" style="width:${s.overall}%;background:${overallColor}"></div>
          </div>
          <span style="font-size:12px;font-weight:700;color:${overallColor}">${s.overall}%</span>
        </div>
      </td>
      <td>
        <select style="background:none;border:none;font-size:12px;font-weight:600;cursor:pointer;outline:none;color:inherit"
                onchange="handleAttChange(this, '${s.roll}')">
          <option value="present" ${s.today === 'present' ? 'selected' : ''}>Present</option>
          <option value="absent"  ${s.today === 'absent'  ? 'selected' : ''}>Absent</option>
          <option value="late"    ${s.today === 'late'    ? 'selected' : ''}>Late</option>
        </select>
      </td>
    </tr>`;
  }).join('');

  updateAttCount();
}

function handleAttChange(sel, roll) {
  const student = DB.students.find(s => s.roll === roll);
  if (student) student.today = sel.value;
  // Sync checkbox
  const row = sel.closest('tr');
  const cb  = row?.querySelector('input[type="checkbox"]');
  if (cb) cb.checked = (sel.value === 'present');
  updateAttCount();
  showToast(`${roll} marked as ${sel.value}`, 'success');
}

function markAllPresent() {
  DB.students.forEach(s => s.today = 'present');
  qsa('#att-tbody select').forEach(s => s.value = 'present');
  qsa('#att-tbody input[type="checkbox"]').forEach(c => c.checked = true);
  updateAttCount();
  showToast('All students marked present', 'success');
}

function toggleAll(masterCb) {
  qsa('#att-tbody input[type="checkbox"]').forEach(c => c.checked = masterCb.checked);
  updateAttCount();
}

function updateAttCount() {
  // Visual feedback only — actual save would call API
}

function selectAttClass(el) {
  qsa('.att-class-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  const subj = el.querySelector('h4')?.textContent || 'Class';
  showToast(`Selected: ${subj}`, 'info');
}

function switchTab(btn, tabId) {
  const bar = btn.closest('.tab-bar');
  if (bar) qsa('.tab-btn', bar).forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // Tab content switching (if tab panels exist)
  const page = btn.closest('.page-content');
  if (page) {
    qsa('[data-tab]', page).forEach(panel => {
      panel.style.display = panel.dataset.tab === tabId ? '' : 'none';
    });
  }
}


// ============================================================
// UTILIZATION LIST (Analytics page)
// ============================================================

function renderUtilList() {
  const el = qs('#util-list');
  if (!el) return;

  const rooms = DB.rooms
    .map(r => ({ name: r.num, pct: r.util }))
    .sort((a, b) => b.pct - a.pct);

  el.innerHTML = rooms.map(r => {
    const color = r.pct >= 85 ? '#C62828' : r.pct >= 70 ? '#F57F17' : '#2E7D32';
    return `
    <div class="util-row">
      <div class="util-name">${escapeHtml(r.name)}</div>
      <div class="util-bar"><div class="util-bar-fill" style="width:${r.pct}%;background:${color};transition:width .8s ease"></div></div>
      <div class="util-pct" style="color:${color}">${r.pct}%</div>
    </div>`;
  }).join('');
}


// ============================================================
// NOTIFICATION PANEL
// ============================================================

function toggleNotifPanel() {
  State.notifPanelOpen = !State.notifPanelOpen;
  // The HTML notification list already exists in dashboard; toggle a visual panel
  showToast(State.notifPanelOpen ? 'Notifications panel opened' : 'Notifications panel closed', 'info');
}

function closeNotifPanel() {
  State.notifPanelOpen = false;
}


// ============================================================
// GLOBAL SEARCH
// ============================================================

function handleGlobalSearch(e) {
  const q = e.target.value.toLowerCase().trim();
  if (!q) return;

  const facultyMatch = DB.faculty.filter(f =>
    `${f.fname} ${f.lname} ${f.dept} ${f.email}`.toLowerCase().includes(q)
  );
  const roomMatch = DB.rooms.filter(r =>
    `${r.num} ${r.block} ${r.type}`.toLowerCase().includes(q)
  );
  const subjectMatch = DB.subjects.filter(s =>
    `${s.code} ${s.name} ${s.dept}`.toLowerCase().includes(q)
  );

  const total = facultyMatch.length + roomMatch.length + subjectMatch.length;
  if (total === 0) {
    showToast(`No results for "${q}"`, 'info');
  } else {
    showToast(`Found ${total} result${total !== 1 ? 's' : ''} for "${q}"`, 'success');
  }
}


// ============================================================
// DASHBOARD CHARTS
// ============================================================

function initDashboardCharts() {
  // Destroy existing to avoid duplication
  ['utilizationChart', 'attendanceTrendChart'].forEach(id => {
    if (State.chartInstances[id]) {
      State.chartInstances[id].destroy();
      delete State.chartInstances[id];
    }
  });

  const utilCanvas = qs('#utilizationChart');
  if (utilCanvas) {
    State.chartInstances['utilizationChart'] = new Chart(utilCanvas, {
      type: 'bar',
      data: {
        labels: ['CSE', 'ECE', 'IT', 'Mech', 'Civil', 'Math'],
        datasets: [{
          label: 'Utilization %',
          data: [88, 76, 82, 65, 58, 71],
          backgroundColor: ['#1976D2','#8E24AA','#43A047','#FB8C00','#00897B','#E53935'],
          borderRadius: 6,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true, max: 100,
            grid: { color: '#F0F4FF' },
            ticks: { callback: v => v + '%', font: { size: 11 } }
          },
          x: {
            grid: { display: false },
            ticks: { font: { size: 11 } }
          }
        }
      }
    });
  }

  const attCanvas = qs('#attendanceTrendChart');
  if (attCanvas) {
    State.chartInstances['attendanceTrendChart'] = new Chart(attCanvas, {
      type: 'line',
      data: {
        labels: ['1','3','5','7','9','11','13','15','17','19','21','23','25'],
        datasets: [{
          label: 'Attendance %',
          data: [91,89,93,88,94,92,95,91,96,93,94,92,94],
          borderColor: '#1976D2',
          backgroundColor: 'rgba(25,118,210,0.07)',
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#1976D2',
          pointRadius: 3,
          pointHoverRadius: 5,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            min: 80, max: 100,
            grid: { color: '#F0F4FF' },
            ticks: { callback: v => v + '%', font: { size: 11 } }
          },
          x: {
            grid: { display: false },
            ticks: { font: { size: 11 } }
          }
        }
      }
    });
  }
}


// ============================================================
// ANALYTICS CHARTS
// ============================================================

function initAnalyticsCharts() {
  const defs = [
    {
      id: 'roomTypeChart',
      config: {
        type: 'doughnut',
        data: {
          labels: ['Classrooms 57%', 'Labs 29%', 'Smart Rooms 14%'],
          datasets: [{
            data: [57, 29, 14],
            backgroundColor: ['#1976D2','#43A047','#8E24AA'],
            borderWidth: 0,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 12 } }
          },
          cutout: '65%'
        }
      }
    },
    {
      id: 'deptAttChart',
      config: {
        type: 'bar',
        data: {
          labels: ['CSE','ECE','IT','Mech','Math','Physics'],
          datasets: [{
            label: 'Attendance %',
            data: [94, 89, 91, 86, 92, 88],
            backgroundColor: '#00ACC1',
            borderRadius: 5,
            borderSkipped: false,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { min: 80, max: 100, ticks: { callback: v => v + '%', font: { size: 11 } }, grid: { color: '#F0F4FF' } },
            x: { grid: { display: false }, ticks: { font: { size: 11 } } }
          }
        }
      }
    },
    {
      id: 'weekLoadChart',
      config: {
        type: 'bar',
        data: {
          labels: ['Mon','Tue','Wed','Thu','Fri'],
          datasets: [{
            label: 'Classes',
            data: [42, 38, 45, 40, 32],
            backgroundColor: ['#1976D2','#1976D2','#8E24AA','#1976D2','#43A047'],
            borderRadius: 6,
            borderSkipped: false,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, grid: { color: '#F0F4FF' }, ticks: { font: { size: 11 } } },
            x: { grid: { display: false }, ticks: { font: { size: 11 } } }
          }
        }
      }
    },
    {
      id: 'facultyLoadChart',
      config: {
        type: 'bar',
        data: {
          labels: ['CSE','ECE','IT','Mech','Math','Physics','Civil'],
          datasets: [{
            label: 'Avg hrs/week',
            data: [17, 15, 18, 14, 13, 12, 11],
            backgroundColor: '#1976D2',
            borderRadius: 4,
            borderSkipped: false,
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { beginAtZero: true, max: 22, ticks: { font: { size: 11 } }, grid: { color: '#F0F4FF' } },
            y: { grid: { display: false }, ticks: { font: { size: 11 } } }
          }
        }
      }
    }
  ];

  defs.forEach(({ id, config }) => {
    if (State.chartInstances[id]) {
      State.chartInstances[id].destroy();
    }
    const canvas = qs(`#${id}`);
    if (canvas) {
      State.chartInstances[id] = new Chart(canvas, config);
    }
  });

  renderUtilList();
}


// ============================================================
// LANDING PAGE — NAVBAR SCROLL EFFECT
// ============================================================

function initLandingNav() {
  const nav = qs('.landing-nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
}


// ============================================================
// SETTINGS PAGE
// ============================================================

function initSettingsNav() {
  const navItems = qsa('.settings-nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      showToast(`Settings section: ${item.textContent.trim()}`, 'info');
    });
  });
}


// ============================================================
// CONFLICT ALERTS — AI SUGGESTIONS
// ============================================================

function applyAISuggestion(btn, message) {
  showToast(message, 'success');
  btn.textContent = '✓ Applied';
  btn.disabled = true;
  btn.style.color = 'var(--success)';
}

function dismissConflict(btn) {
  const alert = btn.closest('.conflict-alert');
  if (alert) {
    alert.style.opacity = '0';
    alert.style.transform = 'translateX(16px)';
    alert.style.transition = 'all 0.3s ease';
    setTimeout(() => alert.remove(), 300);
  }
  showToast('Conflict dismissed', 'info');
}

function autoFixConflict(btn) {
  const alert = btn.closest('.conflict-alert');
  showToast('Auto-fix applied — moved to B-Hall (capacity 120)', 'success');
  setTimeout(() => {
    if (alert) {
      alert.className = 'conflict-alert info';
      const icon = alert.querySelector('i');
      if (icon) icon.className = 'ti ti-check-circle';
      const title = alert.querySelector('.al-title');
      if (title) title.textContent = '✓ Room Conflict Resolved';
      const desc = alert.querySelector('.al-desc');
      if (desc) desc.textContent = 'Class moved to B-Hall automatically. No further action needed.';
      btn.remove();
    }
  }, 500);
}


// ============================================================
// MODAL: Wire up submit buttons on modal footers
// ============================================================

function wireModalButtons() {
  // Add Faculty
  const addFacultyBtn = qs('#modal-add-faculty .modal-footer .btn-primary');
  if (addFacultyBtn && !addFacultyBtn.dataset.wired) {
    addFacultyBtn.dataset.wired = '1';
    addFacultyBtn.addEventListener('click', () => {
      if (State.editingFacultyId) {
        saveEditFaculty(State.editingFacultyId);
      } else {
        submitAddFaculty();
      }
    });
  }

  // Add Room
  const addRoomBtn = qs('#modal-add-room .modal-footer .btn-primary');
  if (addRoomBtn && !addRoomBtn.dataset.wired) {
    addRoomBtn.dataset.wired = '1';
    addRoomBtn.addEventListener('click', submitAddRoom);
  }

  // Add Subject
  const addSubjectBtn = qs('#modal-add-subject .modal-footer .btn-primary');
  if (addSubjectBtn && !addSubjectBtn.dataset.wired) {
    addSubjectBtn.dataset.wired = '1';
    addSubjectBtn.addEventListener('click', submitAddSubject);
  }
}


// ============================================================
// AI SUGGESTIONS — APPLY BUTTONS
// ============================================================

function wireAISuggestions() {
  qsa('.apply-btn').forEach(btn => {
    if (!btn.dataset.wired) {
      btn.dataset.wired = '1';
      const text = btn.getAttribute('onclick') || '';
      // onclick already defined in HTML — leave as is
    }
  });

  // Conflict alert buttons
  const dismissBtns = qsa('.conflict-alert .btn-danger');
  dismissBtns.forEach(btn => {
    if (!btn.dataset.wired) {
      btn.dataset.wired = '1';
      btn.addEventListener('click', () => dismissConflict(btn));
    }
  });

  const autoFixBtns = qsa('.conflict-alert .btn-secondary');
  autoFixBtns.forEach(btn => {
    if (!btn.dataset.wired) {
      btn.dataset.wired = '1';
      btn.addEventListener('click', () => autoFixConflict(btn));
    }
  });
}


// ============================================================
// PERIOD TABS (Chart period selectors on dashboard)
// ============================================================

function initPeriodTabs() {
  qsa('.period-tabs').forEach(group => {
    qsa('.period-tab', group).forEach(tab => {
      tab.addEventListener('click', () => {
        qsa('.period-tab', group).forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        showToast(`View changed to: ${tab.textContent.trim()}`, 'info');
      });
    });
  });
}


// ============================================================
// STAT COUNTER ANIMATION (runs once on dashboard load)
// ============================================================

function animateDashboardStats() {
  const statValues = qsa('#pg-dashboard .stat-body .value');
  statValues.forEach(el => {
    const raw = el.textContent.trim().replace(/[^0-9.]/g, '');
    if (!raw) return;
    const end = parseFloat(raw);
    if (isNaN(end)) return;
    const isPercent = el.textContent.includes('%');
    const isSuffix = el.textContent.replace(raw, '').trim();
    const startVal = 0;
    const duration = 900 + Math.random() * 400;
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (end - startVal) * ease;
      const display = end % 1 !== 0 ? current.toFixed(1) : Math.round(current).toLocaleString();
      el.textContent = display + (isPercent ? '%' : '');
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}


// ============================================================
// RESPONSIVE: MOBILE SIDEBAR TOGGLE
// ============================================================

function initMobileSidebar() {
  // Create overlay if not present
  let overlay = qs('.mobile-sidebar-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'mobile-sidebar-overlay';
    qs('#page-app')?.prepend(overlay);
  }

  overlay.addEventListener('click', closeMobileSidebar);
}

function toggleMobileSidebar() {
  const sidebar = qs('.sidebar');
  const overlay = qs('.mobile-sidebar-overlay');
  sidebar?.classList.toggle('mobile-open');
  overlay?.classList.toggle('show');
}

function closeMobileSidebar() {
  qs('.sidebar')?.classList.remove('mobile-open');
  qs('.mobile-sidebar-overlay')?.classList.remove('show');
}


// ============================================================
// TIMETABLE CONTROLS: Department/week selection
// ============================================================

function handleTimetableSelectChange() {
  renderTimetable();
  showToast('Timetable updated for selected section', 'info');
}

function initTimetableControls() {
  qsa('.tt-select', qs('#pg-timetable')).forEach(sel => {
    sel.addEventListener('change', handleTimetableSelectChange);
  });
}


// ============================================================
// LANDING NAV — scroll spy
// ============================================================

function initLandingScrollSpy() {
  const nav = qs('.landing-nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}


// ============================================================
// AUTO BOOTSTRAP ON DOM READY
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // 1. Landing page — navbar scroll effect
  initLandingScrollSpy();

  // 2. Wire modal submit buttons (in HTML inline onclick still works,
  //    but we also support programmatic wiring)
  wireModalButtons();

  // 3. AI suggestion buttons
  wireAISuggestions();

  // 4. Mobile sidebar
  initMobileSidebar();

  // 5. Keyboard handler
  document.addEventListener('keydown', handleKeyboard);

  // 6. Global search in topbar
  const globalSearch = qs('#global-search');
  if (globalSearch) {
    globalSearch.addEventListener('input', debounce(handleGlobalSearch, 350));
  }

  // 7. Settings nav
  initSettingsNav();

  // 8. Period tabs
  initPeriodTabs();

  // 9. Timetable selects (init after app loads)
  // Done lazily in initApp()

  // 10. Login on Enter key
  const loginPass = qs('#login-pass');
  if (loginPass) {
    loginPass.addEventListener('keydown', e => {
      if (e.key === 'Enter') doLogin();
    });
  }
  const loginEmail = qs('#login-email');
  if (loginEmail) {
    loginEmail.addEventListener('keydown', e => {
      if (e.key === 'Enter') qs('#login-pass')?.focus();
    });
  }

  // 11. Close modal on overlay click (re-wire for dynamically opened modals)
  document.addEventListener('click', e => {
    if (e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('open');
    }
  });

  // 12. Topbar notification bell
  const notifBtn = qs('.topbar-icon-btn[title="Notifications"]');
  if (notifBtn) {
    notifBtn.addEventListener('click', () => {
      showPage('notifications', null);
    });
  }
});


// ============================================================
// EXPORT — expose needed functions to global scope
// (called from inline onclick attributes in HTML)
// ============================================================

Object.assign(window, {
  // Auth
  showLanding,
  showLogin,
  doLogin,
  doLogout,
  scrollFeatures,

  // Navigation
  showPage,

  // Faculty
  openEditFaculty,
  deleteFaculty,
  submitAddFaculty,
  resetFacultyModal,

  // Rooms
  deleteRoom,
  submitAddRoom,
  updateTabCounts,

  // Subjects
  deleteSubject,
  submitAddSubject,

  // Timetable
  renderTimetable,
  generateTimetable,

  // Attendance
  handleAttChange,
  markAllPresent,
  toggleAll,
  selectAttClass,

  // UI
  switchTab,
  filterTable,
  openModal,
  closeModal,
  showToast,
  toggleMobileSidebar,
  applyAISuggestion,
  dismissConflict,
  autoFixConflict,
});
