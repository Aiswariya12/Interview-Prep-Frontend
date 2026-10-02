import React, { useEffect, useState } from 'react';
import { adminApi, subjectApi, questionApi } from '../../services/api';
import {
  ShieldAlert,
  Users,
  BookOpen,
  HelpCircle,
  TrendingUp,
  Plus,
  Edit3,
  Trash2,
  Search,
  CheckCircle2,
  X,
  Code,
  Sparkles,
  Layers,
  AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('questions'); // 'questions', 'subjects', 'students'
  const [stats, setStats] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [students, setStudents] = useState([]);

  // Question Filter & Pagination
  const [filterSubjectId, setFilterSubjectId] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Question Modal State
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [qFormTopics, setQFormTopics] = useState([]);
  const [qForm, setQForm] = useState({
    subjectId: '',
    topicId: '',
    difficulty: 'MEDIUM',
    questionText: '',
    codeSnippet: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: 'A',
    explanation: '',
    marks: 1.0,
    negativeMarks: 0.25,
    active: true,
  });

  // Subject & Topic Modal State
  const [newSubject, setNewSubject] = useState({ name: '', description: '', icon: 'Code2', color: '#4f46e5' });
  const [selectedSubForTopic, setSelectedSubForTopic] = useState(null);
  const [newTopic, setNewTopic] = useState({ name: '', description: '' });

  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    loadInitialAdminData();
  }, []);

  useEffect(() => {
    loadQuestions();
  }, [filterSubjectId, filterDifficulty, page]);

  const loadInitialAdminData = async () => {
    setLoading(true);
    try {
      const [dashRes, subRes, stuRes] = await Promise.allSettled([
        adminApi.getDashboard(),
        subjectApi.getAllActive(),
        adminApi.getStudents(),
      ]);

      if (dashRes.status === 'fulfilled') setStats(dashRes.value.data.data);
      if (subRes.status === 'fulfilled') {
        const sList = subRes.value.data.data || [];
        setSubjects(sList);
        if (sList.length > 0) setSelectedSubForTopic(sList[0].id);
      }
      if (stuRes.status === 'fulfilled') setStudents(stuRes.value.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadQuestions = async () => {
    try {
      const params = {
        page,
        size: 8,
      };
      if (filterSubjectId) params.subjectId = filterSubjectId;
      if (filterDifficulty) params.difficulty = filterDifficulty;
      if (searchQuery) params.search = searchQuery;

      const res = await questionApi.getQuestions(params);
      const pageData = res.data.data;
      setQuestions(pageData.content || []);
      setTotalPages(pageData.totalPages || 1);
    } catch (err) {
      console.error(err);
    }
  };

  // Load topics when question form subject changes
  useEffect(() => {
    if (qForm.subjectId) {
      subjectApi.getTopics(qForm.subjectId)
        .then((res) => setQFormTopics(res.data.data || []))
        .catch(() => setQFormTopics([]));
    } else {
      setQFormTopics([]);
    }
  }, [qForm.subjectId]);

  const openAddQuestionModal = () => {
    setEditingQuestion(null);
    const defaultSub = subjects.length > 0 ? subjects[0].id : '';
    setQForm({
      subjectId: defaultSub,
      topicId: '',
      difficulty: 'MEDIUM',
      questionText: '',
      codeSnippet: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctOption: 'A',
      explanation: '',
      marks: 1.0,
      negativeMarks: 0.25,
      active: true,
    });
    setQuestionModalOpen(true);
  };

  const openEditQuestionModal = (q) => {
    setEditingQuestion(q);
    setQForm({
      subjectId: q.subject?.id || '',
      topicId: q.topic?.id || '',
      difficulty: q.difficulty || 'MEDIUM',
      questionText: q.questionText || '',
      codeSnippet: q.codeSnippet || '',
      optionA: q.optionA || '',
      optionB: q.optionB || '',
      optionC: q.optionC || '',
      optionD: q.optionD || '',
      correctOption: q.correctOption || 'A',
      explanation: q.explanation || '',
      marks: q.marks || 1.0,
      negativeMarks: q.negativeMarks || 0.25,
      active: q.active !== false,
    });
    setQuestionModalOpen(true);
  };

  const handleSaveQuestion = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...qForm,
        subjectId: parseInt(qForm.subjectId),
        topicId: qForm.topicId ? parseInt(qForm.topicId) : null,
        marks: parseFloat(qForm.marks),
        negativeMarks: parseFloat(qForm.negativeMarks),
      };

      if (editingQuestion) {
        await adminApi.updateQuestion(editingQuestion.id, payload);
        showToast('Question updated successfully!');
      } else {
        await adminApi.createQuestion(payload);
        showToast('New question added to bank!');
      }

      setQuestionModalOpen(false);
      loadQuestions();
      loadInitialAdminData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving question');
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question permanently?')) return;
    try {
      await adminApi.deleteQuestion(id);
      showToast('Question deleted.');
      loadQuestions();
      loadInitialAdminData();
    } catch (err) {
      alert('Failed to delete question.');
    }
  };

  const handleCreateSubject = async (e) => {
    e.preventDefault();
    if (!newSubject.name) return;
    try {
      await adminApi.createSubject(newSubject);
      setNewSubject({ name: '', description: '', icon: 'Code2', color: '#4f46e5' });
      showToast('Subject created!');
      loadInitialAdminData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create subject');
    }
  };

  const handleCreateTopic = async (e) => {
    e.preventDefault();
    if (!selectedSubForTopic || !newTopic.name) return;
    try {
      await adminApi.createTopic(selectedSubForTopic, newTopic);
      setNewTopic({ name: '', description: '' });
      showToast('Topic added under subject!');
      loadInitialAdminData();
    } catch (err) {
      alert('Failed to create topic');
    }
  };

  const showToast = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(''), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      {/* Top Admin Header */}
      <div className="bg-slate-900 text-white py-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Administrator Control Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              InterviewPrep Management Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Manage question banks, subjects, topics, explanations, and monitor student performance.
            </p>
          </div>

          <button
            onClick={openAddQuestionModal}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-950/50 flex items-center gap-2 self-start md:self-auto transition-all"
          >
            <Plus className="w-4 h-4" />
            Add New Question
          </button>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 text-white text-xs font-semibold shadow-xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{feedback}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Platform Overview Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1.5">
              <span className="text-xs font-semibold text-slate-500">Total Students</span>
              <Users className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900">{stats?.totalStudents || 0}</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1.5">
              <span className="text-xs font-semibold text-slate-500">Total Questions</span>
              <HelpCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-extrabold text-emerald-600">{stats?.totalQuestions || 0}</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1.5">
              <span className="text-xs font-semibold text-slate-500">Completed Tests</span>
              <BookOpen className="w-4 h-4 text-violet-600" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900">{stats?.totalMockTests || 0}</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1.5">
              <span className="text-xs font-semibold text-slate-500">Active Subjects</span>
              <Layers className="w-4 h-4 text-sky-600" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900">{stats?.totalSubjects || 0}</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-slate-400 mb-1.5">
              <span className="text-xs font-semibold text-slate-500">Platform Avg</span>
              <TrendingUp className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-extrabold text-amber-600">{stats?.averagePlatformScore || 0}%</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'questions'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            Question Bank Management
          </button>
          <button
            onClick={() => setActiveTab('subjects')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'subjects'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            Subjects &amp; Topics
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'students'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            Registered Students ({students.length})
          </button>
        </div>

        {/* TAB 1: QUESTION BANK MANAGEMENT */}
        {activeTab === 'questions' && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-6">
            {/* Search and Filter Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="sm:col-span-2 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && loadQuestions()}
                  placeholder="Search questions by keyword and press Enter..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <select
                value={filterSubjectId}
                onChange={(e) => {
                  setFilterSubjectId(e.target.value);
                  setPage(0);
                }}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-white"
              >
                <option value="">All Subjects</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>

              <select
                value={filterDifficulty}
                onChange={(e) => {
                  setFilterDifficulty(e.target.value);
                  setPage(0);
                }}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-white"
              >
                <option value="">All Difficulties</option>
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>

            {/* Questions List */}
            <div className="divide-y divide-slate-100">
              {questions.map((q) => (
                <div key={q.id} className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5 max-w-3xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                        {q.subject?.name}
                      </span>
                      {q.topic && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {q.topic.name}
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          q.difficulty === 'EASY'
                            ? 'bg-emerald-50 text-emerald-700'
                            : q.difficulty === 'MEDIUM'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {q.difficulty}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Correct: <strong className="text-emerald-600">Option {q.correctOption}</strong>
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-bold text-slate-900">{q.questionText}</p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] text-slate-500">
                      <span className={q.correctOption === 'A' ? 'text-emerald-700 font-semibold' : ''}>A: {q.optionA}</span>
                      <span className={q.correctOption === 'B' ? 'text-emerald-700 font-semibold' : ''}>B: {q.optionB}</span>
                      <span className={q.correctOption === 'C' ? 'text-emerald-700 font-semibold' : ''}>C: {q.optionC}</span>
                      <span className={q.correctOption === 'D' ? 'text-emerald-700 font-semibold' : ''}>D: {q.optionD}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => openEditQuestionModal(q)}
                      className="p-2 rounded-xl border border-slate-200 hover:border-indigo-400 text-slate-600 hover:text-indigo-600 transition-colors"
                      title="Edit Question"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="p-2 rounded-xl border border-slate-200 hover:border-rose-400 text-slate-600 hover:text-rose-600 transition-colors"
                      title="Delete Question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Page {page + 1} of {totalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    disabled={page === 0}
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40 font-semibold"
                  >
                    Previous
                  </button>
                  <button
                    disabled={page >= totalPages - 1}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40 font-semibold"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SUBJECTS & TOPICS */}
        {activeTab === 'subjects' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Create Subject Form */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900">Add New Subject</h3>
              <form onSubmit={handleCreateSubject} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject Name</label>
                  <input
                    type="text"
                    required
                    value={newSubject.name}
                    onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                    placeholder="e.g. System Design"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    required
                    value={newSubject.description}
                    onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
                    placeholder="Scalability, Load Balancing, Caching, Sharding..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Brand Color</label>
                    <input
                      type="color"
                      value={newSubject.color}
                      onChange={(e) => setNewSubject({ ...newSubject, color: e.target.value })}
                      className="w-full h-9 rounded-xl border border-slate-300 p-1"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Icon Key</label>
                    <select
                      value={newSubject.icon}
                      onChange={(e) => setNewSubject({ ...newSubject, icon: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                    >
                      <option value="Coffee">Coffee (Java)</option>
                      <option value="Leaf">Leaf (Spring)</option>
                      <option value="Atom">Atom (React)</option>
                      <option value="Code2">Code2 (JS)</option>
                      <option value="Database">Database (SQL)</option>
                      <option value="Server">Server (Backend)</option>
                      <option value="Cpu">Cpu (OS)</option>
                      <option value="Brain">Brain (Aptitude)</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors"
                >
                  Save Subject
                </button>
              </form>
            </div>

            {/* Create Topic Form */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900">Add Sub-Topic to Subject</h3>
              <form onSubmit={handleCreateTopic} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Parent Subject</label>
                  <select
                    value={selectedSubForTopic || ''}
                    onChange={(e) => setSelectedSubForTopic(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Topic Name</label>
                  <input
                    type="text"
                    required
                    value={newTopic.name}
                    onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
                    placeholder="e.g. Garbage Collection & Heap"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Topic Description</label>
                  <textarea
                    rows={2}
                    value={newTopic.description}
                    onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
                    placeholder="Key concepts covered in this topic..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
                >
                  Add Topic to Subject
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: REGISTERED STUDENTS */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-6 pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Registered Student Directory</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3.5">Student Name</th>
                    <th className="px-6 py-3.5">Email</th>
                    <th className="px-6 py-3.5">College / Institution</th>
                    <th className="px-6 py-3.5">Degree &amp; Branch</th>
                    <th className="px-6 py-3.5">Streak</th>
                    <th className="px-6 py-3.5">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-bold text-slate-900">{s.name}</td>
                      <td className="px-6 py-4 text-slate-600">{s.email}</td>
                      <td className="px-6 py-4 text-slate-700 font-medium">{s.college || 'N/A'}</td>
                      <td className="px-6 py-4 text-slate-500">
                        {s.degree} {s.branch ? `(${s.branch})` : ''} • {s.graduationYear || ''}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold">
                          🔥 {s.streakDays || 0}d
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : 'Active'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ADD / EDIT QUESTION MODAL */}
      {questionModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {editingQuestion ? 'Edit Interview Question' : 'Add New Interview Question'}
              </h3>
              <button
                onClick={() => setQuestionModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject *</label>
                  <select
                    required
                    value={qForm.subjectId}
                    onChange={(e) => setQForm({ ...qForm, subjectId: e.target.value, topicId: '' })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Topic</label>
                  <select
                    value={qForm.topicId}
                    onChange={(e) => setQForm({ ...qForm, topicId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="">General / All</option>
                    {qFormTopics.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Difficulty *</label>
                  <select
                    value={qForm.difficulty}
                    onChange={(e) => setQForm({ ...qForm, difficulty: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="EASY">EASY</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HARD">HARD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Question Prompt *</label>
                <textarea
                  rows={2}
                  required
                  value={qForm.questionText}
                  onChange={(e) => setQForm({ ...qForm, questionText: e.target.value })}
                  placeholder="Enter the technical question..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Code Snippet (Optional)</label>
                <textarea
                  rows={2}
                  value={qForm.codeSnippet}
                  onChange={(e) => setQForm({ ...qForm, codeSnippet: e.target.value })}
                  placeholder="Optional code block for output prediction questions..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Option A *</label>
                  <input
                    type="text"
                    required
                    value={qForm.optionA}
                    onChange={(e) => setQForm({ ...qForm, optionA: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Option B *</label>
                  <input
                    type="text"
                    required
                    value={qForm.optionB}
                    onChange={(e) => setQForm({ ...qForm, optionB: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Option C *</label>
                  <input
                    type="text"
                    required
                    value={qForm.optionC}
                    onChange={(e) => setQForm({ ...qForm, optionC: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Option D *</label>
                  <input
                    type="text"
                    required
                    value={qForm.optionD}
                    onChange={(e) => setQForm({ ...qForm, optionD: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Correct Option *</label>
                  <select
                    value={qForm.correctOption}
                    onChange={(e) => setQForm({ ...qForm, correctOption: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-emerald-50 font-bold text-emerald-900"
                  >
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Marks</label>
                  <input
                    type="number"
                    step="0.5"
                    value={qForm.marks}
                    onChange={(e) => setQForm({ ...qForm, marks: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Negative Marks</label>
                  <input
                    type="number"
                    step="0.05"
                    value={qForm.negativeMarks}
                    onChange={(e) => setQForm({ ...qForm, negativeMarks: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Detailed Explanation *</label>
                <textarea
                  rows={3}
                  required
                  value={qForm.explanation}
                  onChange={(e) => setQForm({ ...qForm, explanation: e.target.value })}
                  placeholder="Explain why the correct answer is right and why others are wrong..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setQuestionModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-200"
                >
                  {editingQuestion ? 'Update Question' : 'Create Question'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
