import React, { useState } from 'react';

// User stories data mapped to screens
const userStories = {
  'teacher-dashboard': [
    { id: 'T1', text: 'Create assignment with videos, sheet music, instructions', priority: 'Must' },
    { id: 'T3', text: 'See which students have submitted work', priority: 'Must' },
  ],
  'create-assignment': [
    { id: 'T1', text: 'Create assignment with videos and instructions', priority: 'Must' },
    { id: 'T1b', text: 'Attach links (YouTube) or upload files', priority: 'Must' },
    { id: 'T1c', text: 'Assign to a student with due date', priority: 'Must' },
  ],
  'student-profile': [
    { id: 'T8', text: 'See student activity (assignments + messages)', priority: 'Must' },
    { id: 'T8b', text: 'Set student ability level', priority: 'Must' },
    { id: 'T8c', text: 'Filter and sort activity list', priority: 'Should' },
    { id: 'T8d', text: 'See and manage student band membership', priority: 'Should' },
  ],
  'student-dashboard': [
    { id: 'S1', text: 'See assignments in a unified list (current + past)', priority: 'Must' },
    { id: 'S2', text: 'Click assignment to see detail page', priority: 'Must' },
    { id: 'S3', text: 'Prominent message teacher button', priority: 'Must' },
    { id: 'S4', text: 'Calendar view of lessons and rehearsals', priority: 'Should' },
    { id: 'S5', text: 'Profile info (instrument, level, bands)', priority: 'Should' },
  ],
  'submit-assignment': [
    { id: 'S2', text: 'Mark assignments complete and add notes/recordings', priority: 'Must' },
    { id: 'S9', text: 'Record and submit video directly in app', priority: 'Could' },
  ],
  'assignment-detail': [
    { id: 'AD1', text: 'See instructions from teacher', priority: 'Must' },
    { id: 'AD2', text: 'Access all links (YouTube, etc.)', priority: 'Must' },
    { id: 'AD3', text: 'Download/view attached files', priority: 'Must' },
    { id: 'AD4', text: 'See teacher notes', priority: 'Should' },
    { id: 'AD5', text: 'Navigate to submit practice', priority: 'Must' },
  ],
  'schedule': [
    { id: 'T5', text: 'Set available hours for booking', priority: 'Must' },
    { id: 'T9', text: 'Manage band program roster and rehearsals', priority: 'Should' },
    { id: 'S6', text: 'Student can book or reschedule lessons', priority: 'Should' },
    { id: 'P2', text: 'Parent can book and manage child lesson schedule', priority: 'Must' },
  ],
  'book-lesson': [
    { id: 'S6', text: 'Student can book or reschedule lessons', priority: 'Should' },
    { id: 'P2', text: 'Parent can book and manage child lesson schedule', priority: 'Must' },
  ],
  'parent-dashboard': [
    { id: 'P1', text: 'See child\'s assigned homework and due dates', priority: 'Must' },
    { id: 'P2', text: 'Book and manage child\'s lesson schedule', priority: 'Must' },
    { id: 'P3', text: 'Receive notifications about assignments and changes', priority: 'Must' },
    { id: 'P4', text: 'Message the teacher about scheduling or concerns', priority: 'Should' },
    { id: 'P5', text: 'See child\'s progress over weeks/months', priority: 'Should' },
    { id: 'P7', text: 'Manage multiple children from one account', priority: 'Could' },
  ],
  'notifications': [
    { id: 'P3', text: 'Receive notifications about assignments and changes', priority: 'Must' },
  ],
  'messaging': [
    { id: 'T6', text: 'Message students/parents within the app', priority: 'Should' },
    { id: 'S7', text: 'Student can message teacher with questions', priority: 'Should' },
    { id: 'P4', text: 'Parent can message teacher', priority: 'Should' },
  ],
  'admin-dashboard': [
    { id: 'A1', text: 'Add/remove teachers and assign to students', priority: 'Must' },
    { id: 'A2', text: 'Enroll new students and assign to teachers', priority: 'Must' },
    { id: 'A3', text: 'See school-wide metrics (students, lessons, retention)', priority: 'Should' },
    { id: 'A4', text: 'Create and manage band programs with rosters', priority: 'Should' },
    { id: 'A5', text: 'View and manage all teacher schedules', priority: 'Should' },
    { id: 'A6', text: 'Send announcements to all students/parents', priority: 'Could' },
  ],
  'admin-reports': [
    { id: 'A3', text: 'See school-wide metrics (students, lessons, retention)', priority: 'Should' },
    { id: 'A7', text: 'Generate reports on student progress and teacher activity', priority: 'Could' },
  ],
  'band-management': [
    { id: 'B1', text: 'See list of bands I\'m assigned to', priority: 'Must' },
    { id: 'B2', text: 'Create a new band', priority: 'Must' },
    { id: 'B3', text: 'Delete a band', priority: 'Must' },
    { id: 'B4', text: 'View a band profile', priority: 'Must' },
  ],
  'band-profile': [
    { id: 'B5', text: 'See rehearsal schedule (rehearsals + performances)', priority: 'Must' },
    { id: 'B6', text: 'Manage band roster', priority: 'Must' },
    { id: 'B7', text: 'Invite students to band', priority: 'Must' },
    { id: 'B8', text: 'Manage setlist', priority: 'Should' },
  ],
};

const Wireframes = () => {
  const [activeScreen, setActiveScreen] = useState('teacher-dashboard');
  const [activeTab, setActiveTab] = useState('needs review');
  const [showStories, setShowStories] = useState(true);
  const [completedStories, setCompletedStories] = useState({});
  const [selectedStudents, setSelectedStudents] = useState(['Emma Wilson', 'James Park']);

  const screens = [
    { id: 'teacher-dashboard', label: 'Teacher Home', persona: '👩‍🏫', group: 'Teacher' },
    { id: 'teacher-profile', label: 'Teacher Profile', persona: '👤', group: 'Teacher' },
    { id: 'create-assignment', label: 'Create Assignment', persona: '➕', group: 'Teacher' },
    { id: 'student-profile', label: 'Student Profile', persona: '👤', group: 'Teacher' },
    { id: 'band-management', label: 'Bands', persona: '🎷', group: 'Teacher' },
    { id: 'band-profile', label: 'Band Profile', persona: '🎸', group: 'Teacher' },
    { id: 'schedule', label: 'Teacher Schedule', persona: '📆', group: 'Teacher' },
    { id: 'student-dashboard', label: 'Student Home', persona: '🎸', group: 'Student' },
    { id: 'assignment-detail', label: 'Assignment', persona: '📝', group: 'Student' },
    { id: 'submit-assignment', label: 'Submit Work', persona: '📤', group: 'Student' },
    { id: 'book-lesson', label: 'Schedule', persona: '📅', group: 'Student' },
    { id: 'parent-dashboard', label: 'Parent Home', persona: '👪', group: 'Parent' },
    { id: 'admin-dashboard', label: 'Admin Home', persona: '🏫', group: 'Admin' },
    { id: 'admin-reports', label: 'Reports', persona: '📊', group: 'Admin' },
    { id: 'notifications', label: 'Notifications', persona: '🔔', group: 'Shared' },
    { id: 'messaging', label: 'Messages', persona: '💬', group: 'Shared' },
  ];

  const groups = ['Teacher', 'Student', 'Parent', 'Admin', 'Shared'];

  const toggleStory = (storyId) => {
    setCompletedStories(prev => ({
      ...prev,
      [storyId]: !prev[storyId]
    }));
  };

  const currentStories = userStories[activeScreen] || [];
  const completedCount = currentStories.filter(s => completedStories[s.id]).length;

  const priorityColor = {
    'Must': 'bg-red-100 text-red-700',
    'Should': 'bg-amber-100 text-amber-700',
    'Could': 'bg-gray-100 text-gray-600',
  };

  // Sidebar component based on user type
  const Sidebar = ({ userType, onNotifications }) => {
    const navItems = {
      teacher: ['Dashboard', 'Assignments', 'Schedule', 'Students', 'Bands'],
      student: ['Home', 'Assignments', 'Schedule'],
      parent: ['Home', 'Schedule', 'Billing'],
      admin: ['Overview', 'Teachers', 'Students', 'Programs', 'Reports'],
    };
    const items = navItems[userType] || navItems.teacher;
    const names = {
      teacher: { name: 'Sarah Chen', role: 'Teacher' },
      student: { name: 'Emma Wilson', role: 'Student' },
      parent: { name: 'Maria Garcia', role: 'Parent' },
      admin: { name: 'David Park', role: 'Admin' },
    };
    const user = names[userType] || names.teacher;

    return (
      <div className="w-44 bg-gray-50 border-r border-gray-200 p-3 flex flex-col">
        <div className="text-base font-bold text-gray-900 mb-4">🎵 MusicDesk</div>
        <nav className="space-y-1 flex-1 text-sm">
          {items.map((item, i) => (
            <div key={item} className={`px-2 py-1.5 rounded cursor-pointer ${i === 0 ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-200'}`}>
              {item}
            </div>
          ))}
          {/* Notifications - app-wide */}
          <div onClick={onNotifications} className="px-2 py-1.5 rounded cursor-pointer text-gray-600 hover:bg-gray-200 flex items-center justify-between">
            <span>🔔 Notifications</span>
            <span className="bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">3</span>
          </div>
        </nav>
        <div className="pt-3 border-t border-gray-200 mt-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gray-300" />
            <div className="text-xs">
              <div className="font-medium text-gray-900">{user.name}</div>
              <div className="text-gray-500">{user.role}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3 font-sans">
      {/* Screen Selector - Grouped */}
      <div className="mb-3 space-y-2">
        {groups.map(group => (
          <div key={group} className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-500 w-16">{group}</span>
            {screens.filter(s => s.group === group).map(s => (
              <button
                key={s.id}
                onClick={() => setActiveScreen(s.id)}
                className={`px-2 py-1 rounded text-xs font-medium transition flex items-center gap-1 ${
                  activeScreen === s.id ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span>{s.persona}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        ))}
        <div className="flex justify-end">
          <button
            onClick={() => setShowStories(!showStories)}
            className={`px-2 py-1 rounded text-xs font-medium ${showStories ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
          >
            📋 Stories {showStories ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        {/* Wireframe Container */}
        <div className={`bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 ${showStories ? 'flex-1' : 'w-full'}`}>
          <div className="flex min-h-[580px]">
            {/* Dynamic Sidebar */}
            <Sidebar
              userType={
                ['teacher-dashboard', 'create-assignment', 'student-profile', 'band-management', 'band-profile', 'schedule', 'messaging'].includes(activeScreen) ? 'teacher' :
                ['student-dashboard', 'submit-assignment', 'book-lesson', 'assignment-detail'].includes(activeScreen) ? 'student' :
                ['parent-dashboard'].includes(activeScreen) ? 'parent' :
                ['admin-dashboard', 'admin-reports'].includes(activeScreen) ? 'admin' : 'teacher'
              }
              onNotifications={() => setActiveScreen('notifications')}
            />

            {/* Main Content */}
            <div className="flex-1 p-4 overflow-auto">

              {/* ============ TEACHER DASHBOARD ============ */}
              {activeScreen === 'teacher-dashboard' && (
                <div className="relative">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-300" />
                      <div>
                        <h1 className="text-lg font-bold text-gray-900">Sarah Chen</h1>
                        <div className="text-sm text-gray-500">24 students</div>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">🎹 Piano</span>
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">🎸 Guitar</span>
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">🎤 Voice</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setActiveScreen('create-assignment')} className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium">
                        + New Assignment
                      </button>
                      <button onClick={() => setActiveScreen('messaging')} className="bg-gray-100 px-3 py-2 rounded-lg text-sm flex items-center gap-1.5 hover:bg-gray-200">
                        <span>💬</span> Messages
                      </button>
                    </div>
                  </div>

                  {/* Calendar Section */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="font-bold text-gray-900 text-sm">February 2026</h2>
                      <div className="flex gap-1">
                        <button className="text-xs text-gray-500 px-2">←</button>
                        <button className="text-xs text-gray-500 px-2">→</button>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                          <div key={i} className="p-1.5 text-xs text-gray-500 text-center font-medium">{d}</div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 text-xs">
                        {[26, 27, 28, 29, 30, 31, 1].map((d, i) => (
                          <div key={i} className={`p-1 text-center border-b border-r border-gray-100 min-h-[32px] ${d > 25 ? 'text-gray-300' : ''}`}>
                            <span>{d}</span>
                          </div>
                        ))}
                        {[2, 3, 4, 5, 6, 7, 8].map((d, i) => (
                          <div key={i} className={`p-1 text-center border-b border-r border-gray-100 min-h-[32px] ${d === 3 ? 'bg-blue-50' : ''} ${d === 6 ? 'bg-orange-50' : ''}`}>
                            <span className={d === 3 || d === 6 ? 'font-bold' : ''}>{d}</span>
                            {d === 3 && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mx-auto mt-0.5"></div>}
                            {d === 6 && <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mx-auto mt-0.5"></div>}
                          </div>
                        ))}
                        {[9, 10, 11, 12, 13, 14, 15].map((d, i) => (
                          <div key={i} className={`p-1 text-center border-b border-r border-gray-100 min-h-[32px] ${d === 10 ? 'bg-blue-50' : ''} ${d === 13 ? 'bg-orange-50' : ''}`}>
                            <span className={d === 10 || d === 13 ? 'font-bold' : ''}>{d}</span>
                            {d === 10 && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mx-auto mt-0.5"></div>}
                            {d === 13 && <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mx-auto mt-0.5"></div>}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> Lessons</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 bg-orange-500 rounded-full"></span> Rehearsals</span>
                    </div>
                  </div>

                  {/* Assignments with Filter/Sort/Search */}
                  <div className="mb-20">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="font-bold text-gray-900 text-sm">Assignments</h2>
                      <div className="flex items-center gap-2">
                        <input type="text" placeholder="Search..." className="text-xs border border-gray-200 rounded px-2 py-1 w-24" />
                        <select className="text-xs border border-gray-200 rounded px-2 py-1">
                          <option>All Status</option>
                          <option>Needs Review</option>
                          <option>Approved</option>
                          <option>Redo</option>
                        </select>
                        <select className="text-xs border border-gray-200 rounded px-2 py-1">
                          <option>Due Date</option>
                          <option>Student</option>
                          <option>Created</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[
                        { student: 'Emma Wilson', task: 'Scales - G Major', due: 'Jan 27', status: 'Needs Review' },
                        { student: 'James Park', task: 'Bach Prelude in C', due: 'Jan 25', status: 'Needs Review' },
                        { student: 'Lucas Garcia', task: 'Chord Transitions', due: 'Jan 29', status: 'Needs Review' },
                        { student: 'Emma Wilson', task: 'Finger Positioning', due: 'Jan 22', status: 'Approved' },
                        { student: 'James Park', task: 'Music Theory', due: 'Jan 20', status: 'Approved' },
                      ].map((item, i) => (
                        <div key={i} onClick={() => setActiveScreen('assignment-detail')} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-300" />
                            <div>
                              <div className="font-medium text-gray-900 text-sm">{item.student}</div>
                              <div className="text-xs text-gray-500">{item.task}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              item.status === 'Approved' ? 'bg-green-100 text-green-700' :
                              item.status === 'Redo' ? 'bg-amber-100 text-amber-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>{item.status}</span>
                            <span className="text-xs text-gray-400">Due {item.due}</span>
                            <span className="text-gray-400">→</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Persistent Chat Window */}
                  <div className="absolute bottom-0 right-0 w-64 bg-white border border-gray-200 rounded-t-lg shadow-lg">
                    <div className="flex items-center justify-between p-2 bg-gray-900 text-white rounded-t-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-400" />
                        <span className="text-sm font-medium">Emma Wilson</span>
                      </div>
                      <button className="text-gray-400 hover:text-white">−</button>
                    </div>
                    <div className="h-32 p-2 space-y-2 overflow-auto bg-gray-50">
                      <div className="flex justify-start">
                        <div className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs max-w-[80%]">
                          How did I do on the scales?
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-gray-900 text-white rounded-lg px-2 py-1 text-xs max-w-[80%]">
                          Great job! Keep practicing.
                        </div>
                      </div>
                    </div>
                    <div className="p-2 border-t border-gray-200">
                      <div className="flex gap-1">
                        <input type="text" placeholder="Type a message..." className="flex-1 border border-gray-200 rounded px-2 py-1 text-xs" />
                        <button className="bg-gray-900 text-white px-2 py-1 rounded text-xs">Send</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ============ TEACHER PROFILE ============ */}
              {activeScreen === 'teacher-profile' && (
                <div>
                  <button onClick={() => setActiveScreen('teacher-dashboard')} className="text-sm text-gray-500 mb-3">← Back to Dashboard</button>

                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-300" />
                    <div className="flex-1">
                      <h1 className="text-lg font-bold text-gray-900">Sarah Chen</h1>
                      <div className="text-sm text-gray-500">Teaching since 2015 • 24 students</div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">🎹 Piano</span>
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">🎸 Guitar</span>
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">🎤 Voice</span>
                      </div>
                    </div>
                    <button className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm">✏️ Edit Profile</button>
                  </div>

                  {/* About Section */}
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 text-sm mb-2">About</h3>
                    <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
                      I've been teaching music for over 10 years with a focus on jazz piano and contemporary styles. I believe music should be fun and accessible to everyone. My teaching philosophy emphasizes building strong fundamentals while exploring the music you love.
                    </div>
                  </div>

                  {/* Favorites Section */}
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 text-sm mb-2">Favorites</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-xs text-gray-500 mb-1">Bands</div>
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-gray-900">Bill Evans Trio</div>
                          <div className="text-xs font-medium text-gray-900">Hiromi</div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-xs text-gray-500 mb-1">Songs</div>
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-gray-900">Autumn Leaves</div>
                          <div className="text-xs font-medium text-gray-900">Blue in Green</div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-xs text-gray-500 mb-1">Albums</div>
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-gray-900">Kind of Blue</div>
                          <div className="text-xs font-medium text-gray-900">Sunday at Village Vanguard</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-gray-900">24</div>
                      <div className="text-xs text-gray-500">Students</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-gray-900">3</div>
                      <div className="text-xs text-gray-500">Bands</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-gray-900">156</div>
                      <div className="text-xs text-gray-500">Lessons</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-green-600">4.9</div>
                      <div className="text-xs text-gray-500">Rating</div>
                    </div>
                  </div>

                  {/* Bands Taught */}
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm mb-2">Bands</h3>
                    <div className="space-y-2">
                      {[
                        { name: 'Jazz Band', level: 'Intermediate', students: 8 },
                        { name: 'Rock Band', level: 'Beginner', students: 6 },
                        { name: 'Classical Ensemble', level: 'Advanced', students: 4 },
                      ].map((band, i) => (
                        <div key={i} onClick={() => setActiveScreen('band-profile')} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                          <div className="flex items-center gap-2">
                            <span>🎷</span>
                            <span className="font-medium text-gray-900 text-sm">{band.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{band.level}</span>
                            <span className="text-xs text-gray-400">{band.students} students</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ============ CREATE ASSIGNMENT ============ */}
              {activeScreen === 'create-assignment' && (
                <div>
                  <button onClick={() => setActiveScreen('teacher-dashboard')} className="text-sm text-gray-500 mb-3">← Back</button>
                  <h1 className="text-lg font-bold text-gray-900 mb-4">Create Assignment</h1>

                  {/* Assign To */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Student</label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                      <option>Emma Wilson</option>
                      <option>James Park</option>
                      <option>Lucas Garcia</option>
                      <option>Mia Chen</option>
                      <option>Alex Kim</option>
                    </select>
                  </div>

                  {/* Title */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Title</label>
                    <input type="text" placeholder="e.g., G Major Scale Practice" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                  </div>

                  {/* Instructions */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Instructions</label>
                    <textarea className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm h-24" placeholder="What should the student do?" />
                  </div>

                  {/* Materials */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Materials (optional)</label>
                    <div className="space-y-2">
                      {/* Link input */}
                      <div className="flex gap-2">
                        <input type="text" placeholder="Paste a link (YouTube, etc.)" className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                        <button className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm">Add</button>
                      </div>

                      {/* Added links */}
                      <div className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm">
                        <span>▶️</span>
                        <span className="flex-1 truncate">youtube.com/watch?v=abc123</span>
                        <button className="text-red-400 hover:text-red-600 text-lg leading-none">×</button>
                      </div>
                      <div className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm">
                        <span>▶️</span>
                        <span className="flex-1 truncate">youtube.com/watch?v=xyz789</span>
                        <button className="text-red-400 hover:text-red-600 text-lg leading-none">×</button>
                      </div>

                      {/* Added files */}
                      <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm">
                        <span>📄</span>
                        <span className="flex-1 truncate">G_Major_Scale.pdf</span>
                        <button className="text-blue-400 hover:text-blue-600 text-lg leading-none">×</button>
                      </div>

                      {/* Upload button */}
                      <button className="w-full text-sm bg-gray-50 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 border border-dashed border-gray-300">
                        📁 Upload file
                      </button>
                    </div>
                  </div>

                  {/* Due Date */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Due</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input type="radio" name="due" defaultChecked className="text-gray-900" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">Next lesson</div>
                          <div className="text-xs text-gray-500">Monday, Feb 3 at 4:00 PM</div>
                        </div>
                      </label>
                      <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input type="radio" name="due" className="text-gray-900" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">Pick a date</div>
                        </div>
                        <input type="date" className="border border-gray-200 rounded px-2 py-1 text-sm" />
                      </label>
                    </div>
                  </div>

                  {/* Action */}
                  <button className="w-full bg-gray-900 text-white py-3 rounded-lg text-sm font-medium">
                    Assign
                  </button>
                </div>
              )}

              {/* ============ STUDENT PROFILE ============ */}
              {activeScreen === 'student-profile' && (
                <div>
                  <button onClick={() => setActiveScreen('teacher-dashboard')} className="text-sm text-gray-500 mb-3">← Back to Dashboard</button>

                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-300" />
                    <div className="flex-1">
                      <h1 className="text-lg font-bold text-gray-900">Emma Wilson</h1>
                      <div className="text-sm text-gray-500">🎹 Piano • Started Sep 2024</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Intermediate</span>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">Jazz Band</span>
                      </div>
                    </div>
                    <button onClick={() => setActiveScreen('messaging')} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm">💬 Message</button>
                  </div>

                  {/* About Section */}
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 text-sm mb-2">About</h3>
                    <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
                      I'm a 15-year-old who started learning piano after hearing jazz at a local café. My goal is to play in a real band someday! I practice every day after school.
                    </div>
                  </div>

                  {/* Favorites Section */}
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 text-sm mb-2">Favorites</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-xs text-gray-500 mb-1">Bands</div>
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-gray-900">The Beatles</div>
                          <div className="text-xs font-medium text-gray-900">Snarky Puppy</div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-xs text-gray-500 mb-1">Songs</div>
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-gray-900">Take Five</div>
                          <div className="text-xs font-medium text-gray-900">Fly Me to the Moon</div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-xs text-gray-500 mb-1">Albums</div>
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-gray-900">Kind of Blue</div>
                          <div className="text-xs font-medium text-gray-900">Abbey Road</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-gray-900">18</div>
                      <div className="text-xs text-gray-500">Lessons</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-gray-900">47</div>
                      <div className="text-xs text-gray-500">Assigned</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-gray-900">41</div>
                      <div className="text-xs text-gray-500">Completed</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-green-600">87%</div>
                      <div className="text-xs text-gray-500">Avg. Score</div>
                    </div>
                  </div>

                  {/* Activity */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900 text-sm">Activity</h3>
                    <div className="flex gap-2">
                      <select className="text-xs border border-gray-200 rounded px-2 py-1">
                        <option>All</option>
                        <option>Assignments</option>
                        <option>Messages</option>
                      </select>
                      <select className="text-xs border border-gray-200 rounded px-2 py-1">
                        <option>Newest first</option>
                        <option>Oldest first</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { type: 'assignment', item: 'Scales - G Major', date: 'Today', status: 'Pending review' },
                      { type: 'assignment', item: 'Chord Transitions', date: 'Jan 25', status: 'Approved' },
                      { type: 'assignment', item: 'Music Theory Quiz', date: 'Jan 22', status: 'Approved' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">📝</span>
                          <span className="font-medium text-gray-900">{item.item}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded ${item.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{item.status}</span>
                          <span className="text-xs text-gray-400">{item.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ============ BANDS LIST ============ */}
              {activeScreen === 'band-management' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-lg font-bold text-gray-900">Bands</h1>
                    <button className="bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm font-medium">+ Create Band</button>
                  </div>

                  {/* Band List */}
                  <div className="space-y-2 mb-4">
                    {[
                      { name: 'Jazz Band', level: 'Intermediate', students: 8 },
                      { name: 'Rock Band', level: 'Beginner', students: 6 },
                      { name: 'Classical Ensemble', level: 'Advanced', students: 4 },
                    ].map((band, i) => (
                      <div key={i} onClick={() => setActiveScreen('band-profile')} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-300 flex items-center justify-center text-lg">🎷</div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{band.name}</div>
                            <div className="text-xs text-gray-500">{band.level} • {band.students} members</div>
                          </div>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); }} className="text-gray-400 hover:text-red-500 text-sm">🗑️</button>
                      </div>
                    ))}
                  </div>

                  {/* Upcoming Calendar */}
                  <h2 className="font-bold text-gray-900 text-sm mb-2">Upcoming</h2>
                  <div className="space-y-2">
                    {[
                      { band: 'Jazz Band', type: 'rehearsal', title: 'Rehearsal', date: 'Thu, Feb 6', time: '5:00 PM' },
                      { band: 'Rock Band', type: 'rehearsal', title: 'Rehearsal', date: 'Sat, Feb 8', time: '10:00 AM' },
                      { band: 'Jazz Band', type: 'rehearsal', title: 'Rehearsal', date: 'Thu, Feb 13', time: '5:00 PM' },
                      { band: 'Classical Ensemble', type: 'performance', title: 'Spring Concert', date: 'Sat, Feb 15', time: '7:00 PM' },
                    ].map((event, i) => (
                      <div key={i} className={`flex items-center justify-between p-2 rounded-lg text-sm ${event.type === 'performance' ? 'bg-purple-50 border border-purple-200' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-2">
                          <span>{event.type === 'performance' ? '🎤' : '🎵'}</span>
                          <div>
                            <span className="font-medium text-gray-900">{event.band}</span>
                            <span className="text-gray-500 ml-1">— {event.title}</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">{event.date}, {event.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ============ BAND PROFILE ============ */}
              {activeScreen === 'band-profile' && (
                <div>
                  <button onClick={() => setActiveScreen('band-management')} className="text-sm text-gray-500 mb-3">← Back to Bands</button>

                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-lg bg-gray-300 flex items-center justify-center text-2xl">🎷</div>
                    <div className="flex-1">
                      <h1 className="text-lg font-bold text-gray-900">Jazz Band</h1>
                      <div className="text-sm text-gray-500">8 members • Est. 2024</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Intermediate</span>
                      </div>
                    </div>
                    <button className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm">✏️ Edit</button>
                  </div>

                  {/* About Section */}
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 text-sm mb-2">About</h3>
                    <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
                      We're a student jazz ensemble focused on learning classic standards and contemporary jazz. We rehearse weekly and perform at school events and local venues. All skill levels welcome!
                    </div>
                  </div>

                  {/* Influences / Favorites */}
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 text-sm mb-2">Influences</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-xs text-gray-500 mb-1">Bands</div>
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-gray-900">Dave Brubeck Quartet</div>
                          <div className="text-xs font-medium text-gray-900">Snarky Puppy</div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-xs text-gray-500 mb-1">Songs We Love</div>
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-gray-900">Take Five</div>
                          <div className="text-xs font-medium text-gray-900">So What</div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-xs text-gray-500 mb-1">Albums</div>
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-gray-900">Time Out</div>
                          <div className="text-xs font-medium text-gray-900">Kind of Blue</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Schedule Section */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 text-sm">Schedule</h3>
                      <button className="text-xs text-blue-600">+ Add Event</button>
                    </div>
                    <div className="space-y-2">
                      {[
                        { type: 'rehearsal', title: 'Weekly Rehearsal', date: 'Thu, Feb 6', time: '5:00 PM', note: 'Working on "Take Five"' },
                        { type: 'rehearsal', title: 'Weekly Rehearsal', date: 'Thu, Feb 13', time: '5:00 PM', note: '' },
                        { type: 'performance', title: 'Spring Concert', date: 'Sat, Mar 15', time: '7:00 PM', note: 'Main auditorium' },
                      ].map((event, i) => (
                        <div key={i} className={`flex items-center justify-between p-2 rounded-lg text-sm ${event.type === 'performance' ? 'bg-purple-50 border border-purple-200' : 'bg-gray-50'}`}>
                          <div className="flex items-center gap-2">
                            <span>{event.type === 'performance' ? '🎤' : '🎵'}</span>
                            <div>
                              <span className="font-medium text-gray-900">{event.title}</span>
                              {event.note && <span className="text-gray-500 ml-1">— {event.note}</span>}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">{event.date}, {event.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Roster Section */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 text-sm">Roster</h3>
                      <button className="text-xs text-blue-600">+ Invite Student</button>
                    </div>
                    <div className="border border-gray-200 rounded-lg divide-y divide-gray-100">
                      {[
                        { name: 'Emma Wilson', instrument: 'Piano' },
                        { name: 'James Park', instrument: 'Guitar' },
                        { name: 'Sophie Chen', instrument: 'Bass' },
                        { name: 'Marcus Lee', instrument: 'Drums' },
                      ].map((member, i) => (
                        <div key={i} className="flex items-center justify-between p-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gray-300" />
                            <div>
                              <div className="font-medium text-gray-900 text-sm">{member.name}</div>
                              <div className="text-xs text-gray-500">{member.instrument}</div>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600 text-xs">Remove</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Setlist Section */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 text-sm">Setlist</h3>
                      <button className="text-xs text-blue-600">+ Add Song</button>
                    </div>
                    <div className="space-y-1">
                      {[
                        { title: 'Take Five', artist: 'Dave Brubeck', status: 'Learning' },
                        { title: 'So What', artist: 'Miles Davis', status: 'Ready' },
                        { title: 'Autumn Leaves', artist: 'Standard', status: 'Ready' },
                      ].map((song, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                          <div>
                            <span className="font-medium text-gray-900">{song.title}</span>
                            <span className="text-xs text-gray-500 ml-2">— {song.artist}</span>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded ${song.status === 'Ready' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                            {song.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ============ STUDENT DASHBOARD ============ */}
              {activeScreen === 'student-dashboard' && (
                <div className="relative">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-300" />
                      <div>
                        <h1 className="text-lg font-bold text-gray-900">Emma Wilson</h1>
                        <div className="text-sm text-gray-500">🎹 Piano • 1.5 years • Intermediate</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">Jazz Band</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setActiveScreen('messaging')} className="bg-gray-100 px-3 py-2 rounded-lg text-sm flex items-center gap-1.5 hover:bg-gray-200">
                      <span>💬</span> Message Sarah
                    </button>
                  </div>

                  {/* Calendar Section */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="font-bold text-gray-900 text-sm">February 2026</h2>
                      <div className="flex gap-1">
                        <button className="text-xs text-gray-500 px-2">←</button>
                        <button className="text-xs text-gray-500 px-2">→</button>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                          <div key={i} className="p-1.5 text-xs text-gray-500 text-center font-medium">{d}</div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 text-xs">
                        {[26, 27, 28, 29, 30, 31, 1].map((d, i) => (
                          <div key={i} className={`p-1 text-center border-b border-r border-gray-100 min-h-[32px] ${d > 25 ? 'text-gray-300' : ''}`}>
                            <span>{d}</span>
                          </div>
                        ))}
                        {[2, 3, 4, 5, 6, 7, 8].map((d, i) => (
                          <div key={i} className={`p-1 text-center border-b border-r border-gray-100 min-h-[32px] ${d === 3 ? 'bg-blue-50' : ''} ${d === 6 ? 'bg-orange-50' : ''}`}>
                            <span className={d === 3 || d === 6 ? 'font-bold' : ''}>{d}</span>
                            {d === 3 && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mx-auto mt-0.5"></div>}
                            {d === 6 && <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mx-auto mt-0.5"></div>}
                          </div>
                        ))}
                        {[9, 10, 11, 12, 13, 14, 15].map((d, i) => (
                          <div key={i} className={`p-1 text-center border-b border-r border-gray-100 min-h-[32px] ${d === 10 ? 'bg-blue-50' : ''} ${d === 13 ? 'bg-orange-50' : ''}`}>
                            <span className={d === 10 || d === 13 ? 'font-bold' : ''}>{d}</span>
                            {d === 10 && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mx-auto mt-0.5"></div>}
                            {d === 13 && <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mx-auto mt-0.5"></div>}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> Lesson</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 bg-orange-500 rounded-full"></span> Rehearsal</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 bg-purple-500 rounded-full"></span> Performance</span>
                    </div>
                  </div>

                  {/* Assignments with Filter/Sort/Search */}
                  <div className="mb-20">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="font-bold text-gray-900 text-sm">Assignments</h2>
                      <div className="flex items-center gap-2">
                        <input type="text" placeholder="Search..." className="text-xs border border-gray-200 rounded px-2 py-1 w-24" />
                        <select className="text-xs border border-gray-200 rounded px-2 py-1">
                          <option>All Status</option>
                          <option>To Do</option>
                          <option>Approved</option>
                          <option>Redo</option>
                        </select>
                        <select className="text-xs border border-gray-200 rounded px-2 py-1">
                          <option>Due Date</option>
                          <option>Newest</option>
                          <option>Status</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[
                        { task: 'Scales - G Major', due: 'Due tomorrow', status: 'To Do', hasVideo: true },
                        { task: 'Watch: Finger Positioning', due: 'Due in 3 days', status: 'To Do', hasVideo: true },
                        { task: 'Jazz Band - Learn Part A', due: 'Due Thu', status: 'To Do', hasVideo: false },
                        { task: 'Chord Transitions', due: 'Jan 25', status: 'Approved', hasVideo: false },
                        { task: 'Music Theory Quiz', due: 'Jan 22', status: 'Approved', hasVideo: false },
                        { task: 'Finger Exercises', due: 'Jan 15', status: 'Redo', hasVideo: true },
                      ].map((item, i) => (
                        <div
                          key={i}
                          onClick={() => setActiveScreen('assignment-detail')}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300"
                        >
                          <div>
                            <div className="font-medium text-sm text-gray-900">{item.task}</div>
                            <div className="text-xs text-gray-500">{item.due}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              item.status === 'Approved' ? 'bg-green-100 text-green-700' :
                              item.status === 'Redo' ? 'bg-amber-100 text-amber-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>{item.status}</span>
                            {item.hasVideo && <span className="text-sm">🎥</span>}
                            <span className="text-gray-400">→</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Persistent Chat Window */}
                  <div className="absolute bottom-0 right-0 w-64 bg-white border border-gray-200 rounded-t-lg shadow-lg">
                    <div className="flex items-center justify-between p-2 bg-gray-900 text-white rounded-t-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-400" />
                        <span className="text-sm font-medium">Sarah Chen</span>
                      </div>
                      <button className="text-gray-400 hover:text-white">−</button>
                    </div>
                    <div className="h-32 p-2 space-y-2 overflow-auto bg-gray-50">
                      <div className="flex justify-start">
                        <div className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs max-w-[80%]">
                          Great job on the scales! Keep practicing.
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-gray-900 text-white rounded-lg px-2 py-1 text-xs max-w-[80%]">
                          Thanks! 🎹
                        </div>
                      </div>
                    </div>
                    <div className="p-2 border-t border-gray-200">
                      <div className="flex gap-1">
                        <input type="text" placeholder="Type a message..." className="flex-1 border border-gray-200 rounded px-2 py-1 text-xs" />
                        <button className="bg-gray-900 text-white px-2 py-1 rounded text-xs">Send</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ============ SUBMIT ASSIGNMENT ============ */}
              {activeScreen === 'submit-assignment' && (
                <div>
                  <button onClick={() => setActiveScreen('assignment-detail')} className="text-sm text-gray-500 mb-3">← Back</button>

                  <div className="mb-4">
                    <h1 className="text-lg font-bold text-gray-900">Submit Work</h1>
                    <div className="text-sm text-gray-500">Scales - G Major</div>
                  </div>

                  {/* Links */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Links (optional)</label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input type="text" placeholder="Paste a link (YouTube, etc.)" className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                        <button className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm">Add</button>
                      </div>
                      {/* Added link example */}
                      <div className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm">
                        <span>▶️</span>
                        <span className="flex-1 truncate">youtube.com/watch?v=my-practice</span>
                        <button className="text-red-400 hover:text-red-600 text-lg leading-none">×</button>
                      </div>
                    </div>
                  </div>

                  {/* Files */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Files (optional)</label>
                    <div className="space-y-2">
                      {/* Added file example */}
                      <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm">
                        <span>📄</span>
                        <span className="flex-1 truncate">practice_recording.mp4</span>
                        <button className="text-blue-400 hover:text-blue-600 text-lg leading-none">×</button>
                      </div>
                      {/* Upload button */}
                      <button className="w-full text-sm bg-gray-50 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 border border-dashed border-gray-300">
                        📁 Upload file
                      </button>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Notes for teacher (optional)</label>
                    <textarea className="w-full border border-gray-200 rounded-lg p-3 text-sm h-24" placeholder="How did practice go? Any questions?" />
                  </div>

                  {/* Submit */}
                  <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium text-sm">
                    Submit
                  </button>
                </div>
              )}

              {/* ============ BOOK LESSON ============ */}
              {activeScreen === 'book-lesson' && (
                <div>
                  <button onClick={() => setActiveScreen('student-dashboard')} className="text-sm text-gray-500 mb-3">← Back</button>
                  <h1 className="text-lg font-bold text-gray-900 mb-4">Schedule</h1>

                  {/* Calendar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="font-bold text-gray-900 text-sm">February 2026</h2>
                      <div className="flex gap-1">
                        <button className="text-xs text-gray-500 px-2">←</button>
                        <button className="text-xs text-gray-500 px-2">→</button>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      {/* Calendar Header */}
                      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                          <div key={i} className="p-1.5 text-xs text-gray-500 text-center font-medium">{d}</div>
                        ))}
                      </div>
                      {/* Calendar Days */}
                      <div className="grid grid-cols-7 text-xs">
                        {/* Week 1: Jan 26 - Feb 1 */}
                        {[26, 27, 28, 29, 30, 31, 1].map((d, i) => (
                          <div key={i} className={`p-1 text-center border-b border-r border-gray-100 min-h-[40px] ${d > 25 ? 'text-gray-300' : ''}`}>
                            <span>{d}</span>
                          </div>
                        ))}
                        {/* Week 2: Feb 2-8 */}
                        {[2, 3, 4, 5, 6, 7, 8].map((d, i) => (
                          <div key={i} className="p-1 text-center border-b border-r border-gray-100 min-h-[40px]">
                            <span className={d === 3 || d === 6 ? 'font-bold' : ''}>{d}</span>
                            {d === 3 && <div className="w-full bg-blue-100 text-blue-700 text-[9px] rounded mt-0.5 truncate">🎹 Lesson</div>}
                            {d === 6 && <div className="w-full bg-orange-100 text-orange-700 text-[9px] rounded mt-0.5 truncate">🎷 Jazz</div>}
                          </div>
                        ))}
                        {/* Week 3: Feb 9-15 */}
                        {[9, 10, 11, 12, 13, 14, 15].map((d, i) => (
                          <div key={i} className="p-1 text-center border-b border-r border-gray-100 min-h-[40px]">
                            <span className={d === 10 || d === 13 || d === 15 ? 'font-bold' : ''}>{d}</span>
                            {d === 10 && <div className="w-full bg-blue-100 text-blue-700 text-[9px] rounded mt-0.5 truncate">🎹 Lesson</div>}
                            {d === 13 && <div className="w-full bg-orange-100 text-orange-700 text-[9px] rounded mt-0.5 truncate">🎷 Jazz</div>}
                            {d === 15 && <div className="w-full bg-purple-100 text-purple-700 text-[9px] rounded mt-0.5 truncate">🎤 Concert</div>}
                          </div>
                        ))}
                        {/* Week 4: Feb 16-22 */}
                        {[16, 17, 18, 19, 20, 21, 22].map((d, i) => (
                          <div key={i} className="p-1 text-center border-b border-r border-gray-100 min-h-[40px]">
                            <span className={d === 17 || d === 20 ? 'font-bold' : ''}>{d}</span>
                            {d === 17 && <div className="w-full bg-blue-100 text-blue-700 text-[9px] rounded mt-0.5 truncate">🎹 Lesson</div>}
                            {d === 20 && <div className="w-full bg-orange-100 text-orange-700 text-[9px] rounded mt-0.5 truncate">🎷 Jazz</div>}
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Calendar Legend */}
                    <div className="flex gap-3 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> Lesson</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 bg-orange-500 rounded-full"></span> Rehearsal</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 bg-purple-500 rounded-full"></span> Performance</span>
                    </div>
                  </div>

                  {/* Upcoming Events List */}
                  <h2 className="font-bold text-gray-900 text-sm mb-2">Upcoming</h2>
                  <div className="space-y-2">
                    {[
                      { type: 'lesson', title: 'Piano Lesson', date: 'Mon, Feb 3', time: '4:00 PM', with: 'Sarah Chen' },
                      { type: 'rehearsal', title: 'Jazz Band Rehearsal', date: 'Thu, Feb 6', time: '5:00 PM', with: '' },
                      { type: 'lesson', title: 'Piano Lesson', date: 'Mon, Feb 10', time: '4:00 PM', with: 'Sarah Chen' },
                      { type: 'performance', title: 'Spring Concert', date: 'Sat, Feb 15', time: '7:00 PM', with: 'Jazz Band' },
                    ].map((event, i) => (
                      <div key={i} className={`flex items-center justify-between p-2 rounded-lg text-sm ${
                        event.type === 'performance' ? 'bg-purple-50 border border-purple-200' :
                        event.type === 'rehearsal' ? 'bg-orange-50 border border-orange-200' :
                        'bg-blue-50 border border-blue-200'
                      }`}>
                        <div className="flex items-center gap-2">
                          <span>{event.type === 'performance' ? '🎤' : event.type === 'rehearsal' ? '🎷' : '🎹'}</span>
                          <div>
                            <span className="font-medium text-gray-900">{event.title}</span>
                            {event.with && <span className="text-gray-500 ml-1">— {event.with}</span>}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">{event.date}, {event.time}</div>
                      </div>
                    ))}
                  </div>

                  {/* Book New Lesson */}
                  <button className="w-full mt-4 bg-gray-900 text-white py-3 rounded-lg text-sm font-medium">
                    + Book New Lesson
                  </button>
                </div>
              )}

              {/* ============ PARENT DASHBOARD ============ */}
              {activeScreen === 'parent-dashboard' && (
                <div className="relative">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-300" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h1 className="text-lg font-bold text-gray-900">Lucas Garcia</h1>
                          <select className="text-xs border border-gray-200 rounded px-1 py-0.5">
                            <option>Lucas</option>
                            <option>Sofia</option>
                          </select>
                        </div>
                        <div className="text-sm text-gray-500">🎸 Guitar • 8 months • Beginner</div>
                      </div>
                    </div>
                    <button onClick={() => setActiveScreen('messaging')} className="bg-gray-100 px-3 py-2 rounded-lg text-sm flex items-center gap-1.5 hover:bg-gray-200">
                      <span>💬</span> Message Sarah
                    </button>
                  </div>

                  {/* Calendar Section */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="font-bold text-gray-900 text-sm">February 2026</h2>
                      <div className="flex gap-1">
                        <button className="text-xs text-gray-500 px-2">←</button>
                        <button className="text-xs text-gray-500 px-2">→</button>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                          <div key={i} className="p-1.5 text-xs text-gray-500 text-center font-medium">{d}</div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 text-xs">
                        {[26, 27, 28, 29, 30, 31, 1].map((d, i) => (
                          <div key={i} className={`p-1 text-center border-b border-r border-gray-100 min-h-[32px] ${d > 25 ? 'text-gray-300' : ''}`}>
                            <span>{d}</span>
                          </div>
                        ))}
                        {[2, 3, 4, 5, 6, 7, 8].map((d, i) => (
                          <div key={i} className={`p-1 text-center border-b border-r border-gray-100 min-h-[32px] ${d === 3 ? 'bg-blue-50' : ''}`}>
                            <span className={d === 3 ? 'font-bold' : ''}>{d}</span>
                            {d === 3 && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mx-auto mt-0.5"></div>}
                          </div>
                        ))}
                        {[9, 10, 11, 12, 13, 14, 15].map((d, i) => (
                          <div key={i} className={`p-1 text-center border-b border-r border-gray-100 min-h-[32px] ${d === 10 ? 'bg-blue-50' : ''}`}>
                            <span className={d === 10 ? 'font-bold' : ''}>{d}</span>
                            {d === 10 && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mx-auto mt-0.5"></div>}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> Lesson</span>
                    </div>
                  </div>

                  {/* Assignments with Filter/Sort/Search */}
                  <div className="mb-20">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="font-bold text-gray-900 text-sm">Assignments</h2>
                      <div className="flex items-center gap-2">
                        <input type="text" placeholder="Search..." className="text-xs border border-gray-200 rounded px-2 py-1 w-24" />
                        <select className="text-xs border border-gray-200 rounded px-2 py-1">
                          <option>All Status</option>
                          <option>To Do</option>
                          <option>Approved</option>
                          <option>Redo</option>
                        </select>
                        <select className="text-xs border border-gray-200 rounded px-2 py-1">
                          <option>Due Date</option>
                          <option>Newest</option>
                          <option>Status</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[
                        { task: 'Learn "Twinkle Twinkle"', due: 'Due tomorrow', status: 'To Do' },
                        { task: 'Finger exercises', due: 'Due in 3 days', status: 'To Do' },
                        { task: 'Watch: Basic Chords', due: 'Jan 28', status: 'Approved' },
                      ].map((item, i) => (
                        <div key={i} onClick={() => setActiveScreen('assignment-detail')} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                          <div>
                            <div className="font-medium text-sm text-gray-900">{item.task}</div>
                            <div className="text-xs text-gray-500">{item.due}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              item.status === 'Approved' ? 'bg-green-100 text-green-700' :
                              item.status === 'To Do' ? 'bg-blue-100 text-blue-700' :
                              'bg-amber-100 text-amber-700'
                            }`}>{item.status}</span>
                            <span className="text-gray-400">→</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Persistent Chat Window - Parent sees Teacher/Student messages */}
                  <div className="absolute bottom-0 right-0 w-64 bg-white border border-gray-200 rounded-t-lg shadow-lg">
                    <div className="flex items-center justify-between p-2 bg-gray-900 text-white rounded-t-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-400" />
                        <div>
                          <span className="text-sm font-medium">Sarah ↔ Lucas</span>
                          <span className="text-xs text-gray-400 ml-1">(You're included)</span>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-white">−</button>
                    </div>
                    <div className="h-32 p-2 space-y-2 overflow-auto bg-gray-50">
                      <div className="flex justify-start">
                        <div className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs max-w-[80%]">
                          <span className="text-gray-400 text-[10px]">Sarah:</span> Great job on practice!
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-blue-100 text-blue-800 rounded-lg px-2 py-1 text-xs max-w-[80%]">
                          <span className="text-blue-500 text-[10px]">Lucas:</span> Thanks! 🎸
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-green-100 text-green-800 rounded-lg px-2 py-1 text-xs max-w-[80%]">
                          <span className="text-green-500 text-[10px]">You:</span> He's been practicing daily!
                        </div>
                      </div>
                    </div>
                    <div className="p-2 border-t border-gray-200">
                      <div className="flex gap-1">
                        <input type="text" placeholder="Type a message..." className="flex-1 border border-gray-200 rounded px-2 py-1 text-xs" />
                        <button className="bg-gray-900 text-white px-2 py-1 rounded text-xs">Send</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ============ NOTIFICATIONS ============ */}
              {activeScreen === 'notifications' && (
                <div>
                  <button onClick={() => setActiveScreen('parent-dashboard')} className="text-sm text-gray-500 mb-3">← Back</button>
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-lg font-bold text-gray-900">Notifications</h1>
                    <button className="text-xs text-blue-600">Mark all read</button>
                  </div>

                  <div className="space-y-2">
                    {[
                      { type: 'assignment', title: 'New assignment', desc: 'Sarah assigned "Finger exercises" to Lucas', time: '2 hours ago', unread: true },
                      { type: 'reminder', title: 'Homework due tomorrow', desc: '"Twinkle Twinkle" is due tomorrow', time: '5 hours ago', unread: true },
                      { type: 'schedule', title: 'Lesson reminder', desc: 'Lucas has a lesson Monday at 4:00 PM', time: '1 day ago', unread: true },
                      { type: 'progress', title: 'Weekly summary', desc: 'Lucas completed 4 of 5 assignments this week', time: '2 days ago', unread: false },
                      { type: 'message', title: 'New message', desc: 'Sarah Chen sent you a message', time: '3 days ago', unread: false },
                    ].map((notif, i) => (
                      <div key={i} className={`flex items-start gap-3 p-3 rounded-lg ${notif.unread ? 'bg-blue-50' : 'bg-gray-50'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                          notif.type === 'assignment' ? 'bg-purple-100 text-purple-600' :
                          notif.type === 'reminder' ? 'bg-amber-100 text-amber-600' :
                          notif.type === 'schedule' ? 'bg-blue-100 text-blue-600' :
                          notif.type === 'progress' ? 'bg-green-100 text-green-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {notif.type === 'assignment' && '📝'}
                          {notif.type === 'reminder' && '⏰'}
                          {notif.type === 'schedule' && '📅'}
                          {notif.type === 'progress' && '📊'}
                          {notif.type === 'message' && '💬'}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div className="font-medium text-gray-900 text-sm">{notif.title}</div>
                            {notif.unread && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                          </div>
                          <div className="text-xs text-gray-600">{notif.desc}</div>
                          <div className="text-xs text-gray-400 mt-1">{notif.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Notification Settings */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h3 className="font-medium text-gray-900 text-sm mb-2">Notification Preferences</h3>
                    <div className="space-y-2 text-sm">
                      {['New assignments', 'Due date reminders', 'Lesson reminders', 'Weekly progress'].map(pref => (
                        <label key={pref} className="flex items-center justify-between">
                          <span className="text-gray-600">{pref}</span>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ============ ASSIGNMENT DETAIL ============ */}
              {activeScreen === 'assignment-detail' && (
                <div>
                  <button onClick={() => setActiveScreen('student-dashboard')} className="text-sm text-gray-500 mb-3">← Back</button>

                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h1 className="text-lg font-bold text-gray-900">Scales - G Major</h1>
                      <div className="text-sm text-gray-500">From Sarah Chen • Due Jan 28</div>
                    </div>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">In Progress</span>
                  </div>

                  {/* Instructions */}
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 text-sm mb-2">Instructions</h3>
                    <div className="bg-gray-50 rounded-lg p-3 text-gray-600 text-sm">
                      Practice the G Major scale ascending and descending. Focus on even tempo and clean transitions between notes. Record yourself playing at 80 BPM minimum.
                    </div>
                  </div>

                  {/* Links */}
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 text-sm mb-2">Links</h3>
                    <div className="space-y-2">
                      <a href="#" className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="w-16 h-10 bg-red-100 rounded flex items-center justify-center">
                          <span className="text-red-600 text-lg">▶️</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm">G Major Scale Tutorial</div>
                          <div className="text-xs text-gray-500">youtube.com • 4:32</div>
                        </div>
                        <span className="text-gray-400">↗</span>
                      </a>
                      <a href="#" className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="w-16 h-10 bg-red-100 rounded flex items-center justify-center">
                          <span className="text-red-600 text-lg">▶️</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm">Proper Hand Position Demo</div>
                          <div className="text-xs text-gray-500">youtube.com • 2:15</div>
                        </div>
                        <span className="text-gray-400">↗</span>
                      </a>
                    </div>
                  </div>

                  {/* Files */}
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 text-sm mb-2">Files</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                          <span className="text-blue-600">📄</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm">G_Major_Scale.pdf</div>
                          <div className="text-xs text-gray-500">Sheet music • 245 KB</div>
                        </div>
                        <button className="text-blue-600 text-sm">View</button>
                      </div>
                      <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center">
                          <span className="text-green-600">🎸</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm">G_Major_Tab.gp</div>
                          <div className="text-xs text-gray-500">Guitar Pro tab • 12 KB</div>
                        </div>
                        <button className="text-blue-600 text-sm">View</button>
                      </div>
                    </div>
                  </div>

                  {/* Teacher Notes */}
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 text-sm mb-2">Teacher Notes</h3>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
                      💡 Remember to keep your wrist relaxed. We worked on this last lesson!
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button onClick={() => setActiveScreen('submit-assignment')} className="w-full bg-gray-900 text-white py-3 rounded-lg text-sm font-medium">
                    Submit Practice
                  </button>
                </div>
              )}

              {/* ============ SCHEDULE ============ */}
              {activeScreen === 'schedule' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-lg font-bold text-gray-900">Schedule</h1>
                    <button className="bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm font-medium">+ Block Time</button>
                  </div>
                  <div className="flex items-center justify-between mb-3 text-sm">
                    <button className="text-gray-500">← Prev</button>
                    <span className="font-medium">Feb 3-9, 2026</span>
                    <button className="text-gray-500">Next →</button>
                  </div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden text-xs mb-4">
                    <div className="grid grid-cols-8 bg-gray-50 border-b border-gray-200">
                      <div className="p-2 text-gray-500"></div>
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                        <div key={day} className="p-2 text-gray-500 text-center border-l border-gray-200">{day}</div>
                      ))}
                    </div>
                    {['3 PM', '4 PM', '5 PM', '6 PM'].map((time, rowIdx) => (
                      <div key={time} className="grid grid-cols-8 border-b border-gray-100">
                        <div className="p-2 text-gray-400">{time}</div>
                        {[0,1,2,3,4,5,6].map(colIdx => (
                          <div key={colIdx} className="p-1 border-l border-gray-100 min-h-[36px]">
                            {rowIdx === 1 && colIdx === 0 && <div className="bg-blue-100 text-blue-700 p-1 rounded text-xs">Emma W.</div>}
                            {rowIdx === 1 && colIdx === 1 && <div className="bg-green-100 text-green-700 p-1 rounded text-xs">Lucas G.</div>}
                            {rowIdx === 0 && colIdx === 2 && <div className="bg-purple-100 text-purple-700 p-1 rounded text-xs">James P.</div>}
                            {rowIdx === 2 && colIdx === 3 && <div className="bg-orange-100 text-orange-700 p-1 rounded text-xs">Jazz Band</div>}
                            {rowIdx === 0 && colIdx === 5 && <div className="bg-pink-100 text-pink-700 p-1 rounded text-xs">Rock Band</div>}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div className="bg-gray-50 rounded p-2"><div className="font-bold">6</div><div className="text-xs text-gray-500">Today</div></div>
                    <div className="bg-gray-50 rounded p-2"><div className="font-bold">12</div><div className="text-xs text-gray-500">Open Slots</div></div>
                    <div className="bg-gray-50 rounded p-2"><div className="font-bold text-amber-600">2</div><div className="text-xs text-gray-500">Requests</div></div>
                  </div>
                </div>
              )}

              {/* ============ MESSAGING ============ */}
              {activeScreen === 'messaging' && (
                <div className="flex flex-col h-full">
                  <h1 className="text-lg font-bold text-gray-900 mb-3">Messages</h1>
                  <div className="flex flex-1 border border-gray-200 rounded-lg overflow-hidden min-h-[400px]">
                    <div className="w-40 border-r border-gray-200 bg-gray-50">
                      {[
                        { name: 'Emma Wilson', msg: 'Thanks!', time: '2m', unread: true },
                        { name: 'Maria Garcia', msg: 'Can we reschedule?', time: '1h', unread: true },
                        { name: 'James Park', msg: 'Got it', time: '3h', unread: false },
                      ].map((c, i) => (
                        <div key={i} className={`p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 ${i === 0 ? 'bg-white' : ''}`}>
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gray-300" />
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-900 text-xs truncate">{c.name}</span>
                                <span className="text-xs text-gray-400">{c.time}</span>
                              </div>
                              <div className="text-xs text-gray-500 truncate">{c.msg}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="p-2 border-b border-gray-200 bg-white">
                        <div className="font-medium text-gray-900 text-sm">Emma Wilson</div>
                        <div className="text-xs text-gray-500">Student • Piano</div>
                      </div>
                      <div className="flex-1 p-3 space-y-2 overflow-auto bg-gray-50">
                        <div className="flex justify-start">
                          <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 max-w-xs text-sm">
                            How did I do on the scales?
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-gray-900 text-white rounded-lg px-3 py-2 max-w-xs text-sm">
                            Great job! Tempo was good. Work on transitions.
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 max-w-xs text-sm">
                            Thanks! 🎹
                          </div>
                        </div>
                      </div>
                      <div className="p-2 border-t border-gray-200 bg-white">
                        <div className="flex gap-2">
                          <input type="text" placeholder="Type a message..." className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                          <button className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm">Send</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ============ ADMIN DASHBOARD ============ */}
              {activeScreen === 'admin-dashboard' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-lg font-bold text-gray-900">School Overview</h1>
                    <div className="flex gap-2">
                      <button className="bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm font-medium">+ Add Teacher</button>
                      <button className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">+ Enroll Student</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {[
                      { label: 'Teachers', value: '8' },
                      { label: 'Students', value: '147', trend: '+12' },
                      { label: 'Lessons/Week', value: '89' },
                      { label: 'Retention', value: '94%', trend: '+2%' },
                    ].map(stat => (
                      <div key={stat.label} className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                        {stat.trend && <div className="text-xs text-green-600">{stat.trend}</div>}
                      </div>
                    ))}
                  </div>

                  <h2 className="font-bold text-gray-900 text-sm mb-2">Teachers</h2>
                  <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left p-2 font-medium text-gray-600">Name</th>
                          <th className="text-left p-2 font-medium text-gray-600">Students</th>
                          <th className="text-left p-2 font-medium text-gray-600">This Week</th>
                          <th className="text-left p-2 font-medium text-gray-600">Completion</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: 'Sarah Chen', students: 24, lessons: 18, completion: '87%' },
                          { name: 'Mike Johnson', students: 22, lessons: 16, completion: '92%' },
                          { name: 'Lisa Wong', students: 19, lessons: 14, completion: '85%' },
                        ].map((t, i) => (
                          <tr key={i} className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer">
                            <td className="p-2 font-medium">{t.name}</td>
                            <td className="p-2 text-gray-600">{t.students}</td>
                            <td className="p-2 text-gray-600">{t.lessons}</td>
                            <td className="p-2 text-gray-600">{t.completion}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <h2 className="font-bold text-gray-900 text-sm mb-2">Band Programs</h2>
                      <div className="space-y-2">
                        {[
                          { name: 'Jazz Band', students: 8, day: 'Thu 5pm' },
                          { name: 'Rock Band', students: 6, day: 'Sat 10am' },
                        ].map((b, i) => (
                          <div key={i} className="border border-gray-200 rounded-lg p-2">
                            <div className="font-medium text-gray-900 text-sm">{b.name}</div>
                            <div className="text-xs text-gray-500">{b.students} students • {b.day}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-900 text-sm mb-2">Quick Actions</h2>
                      <div className="space-y-2">
                        <button onClick={() => setActiveScreen('admin-reports')} className="w-full border border-gray-200 rounded-lg p-2 text-sm text-left hover:bg-gray-50">📊 View Reports</button>
                        <button className="w-full border border-gray-200 rounded-lg p-2 text-sm text-left hover:bg-gray-50">📢 Send Announcement</button>
                        <button className="w-full border border-gray-200 rounded-lg p-2 text-sm text-left hover:bg-gray-50">📅 View All Schedules</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ============ ADMIN REPORTS ============ */}
              {activeScreen === 'admin-reports' && (
                <div>
                  <button onClick={() => setActiveScreen('admin-dashboard')} className="text-sm text-gray-500 mb-3">← Back</button>
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-lg font-bold text-gray-900">Reports</h1>
                    <select className="border border-gray-200 rounded-lg px-2 py-1 text-sm">
                      <option>Last 30 days</option>
                      <option>Last 3 months</option>
                      <option>Last year</option>
                    </select>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-xl font-bold text-green-700">89%</div>
                      <div className="text-xs text-green-600">Avg Completion</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-xl font-bold text-blue-700">356</div>
                      <div className="text-xs text-blue-600">Lessons Given</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <div className="text-xl font-bold text-purple-700">94%</div>
                      <div className="text-xs text-purple-600">Retention Rate</div>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-3">
                      <div className="text-xl font-bold text-amber-700">12</div>
                      <div className="text-xs text-amber-600">New Students</div>
                    </div>
                  </div>

                  {/* Charts */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 text-sm mb-2">Student Growth</h3>
                      <div className="h-28 flex items-end gap-1">
                        {[120, 125, 128, 135, 138, 142, 147].map((val, i) => (
                          <div key={i} className="flex-1 bg-blue-500 rounded-t" style={{ height: `${(val/147)*100}%` }} />
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 text-sm mb-2">Completion by Teacher</h3>
                      <div className="space-y-2">
                        {[
                          { name: 'Mike J.', pct: 92 },
                          { name: 'Sarah C.', pct: 87 },
                          { name: 'Lisa W.', pct: 85 },
                          { name: 'Tom R.', pct: 82 },
                        ].map((t, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="text-xs w-14 text-gray-600">{t.name}</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${t.pct}%` }} />
                            </div>
                            <span className="text-xs text-gray-600 w-8">{t.pct}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Export */}
                  <div className="flex gap-2">
                    <button className="flex-1 border border-gray-200 rounded-lg p-2 text-sm hover:bg-gray-50">📊 Export as CSV</button>
                    <button className="flex-1 border border-gray-200 rounded-lg p-2 text-sm hover:bg-gray-50">📄 Generate PDF Report</button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* User Story Checklist Panel */}
        {showStories && (
          <div className="w-64 bg-white rounded-xl shadow-lg border border-gray-200 p-3 h-fit max-h-[620px] overflow-auto">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-gray-900 text-sm">User Stories</h2>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {completedCount}/{currentStories.length}
              </span>
            </div>
            <div className="text-xs text-gray-500 mb-2">
              Check off as you verify
            </div>
            <div className="space-y-1">
              {currentStories.map(story => (
                <label key={story.id} className={`flex items-start gap-2 p-1.5 rounded cursor-pointer hover:bg-gray-50 ${completedStories[story.id] ? 'bg-green-50' : ''}`}>
                  <input type="checkbox" checked={completedStories[story.id] || false} onChange={() => toggleStory(story.id)} className="mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="text-xs font-mono text-gray-400">{story.id}</span>
                      <span className={`text-xs px-1 py-0.5 rounded ${priorityColor[story.priority]}`}>{story.priority}</span>
                    </div>
                    <div className={`text-xs text-gray-700 ${completedStories[story.id] ? 'line-through text-gray-400' : ''}`}>{story.text}</div>
                  </div>
                </label>
              ))}
            </div>
            {currentStories.length === 0 && (
              <div className="text-xs text-gray-400 text-center py-4">No stories for this screen</div>
            )}
          </div>
        )}
      </div>

      <div className="mt-3 text-xs text-gray-500 text-center">
        MusicDesk Wireframes • 15 screens • 40+ user stories
      </div>
    </div>
  );
};

export default Wireframes;