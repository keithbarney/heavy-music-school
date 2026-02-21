import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./app-config.js";

const qs = (id) => document.getElementById(id);
const ui = {
  configNotice: qs("configNotice"),
  authCard: qs("authCard"),
  appCard: qs("appCard"),
  authMsg: qs("authMsg"),
  welcome: qs("welcome"),
  profileMeta: qs("profileMeta"),
  teacherArea: qs("teacherArea"),
  studentArea: qs("studentArea"),
  studentList: qs("studentList"),
  studentConnection: qs("studentConnection"),
  joinCode: qs("joinCode"),
};

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  ui.configNotice.classList.remove("hidden");
  ui.authCard.classList.add("hidden");
  ui.appCard.classList.add("hidden");
  throw new Error("Missing Supabase config");
}

ui.configNotice.classList.add("hidden");
ui.authCard.classList.remove("hidden");

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentProfile = null;

function msg(text, type = "") {
  ui.authMsg.className = type;
  ui.authMsg.textContent = text;
}

async function loadSession() {
  const { data } = await supabase.auth.getSession();
  if (data?.session?.user) {
    await loadProfile(data.session.user.id);
  } else {
    showAuth();
  }
}

function showAuth() {
  ui.authCard.classList.remove("hidden");
  ui.appCard.classList.add("hidden");
  currentProfile = null;
}

function showApp() {
  ui.authCard.classList.add("hidden");
  ui.appCard.classList.remove("hidden");
}

async function upsertProfile(userId, fullName, role) {
  const { error } = await supabase.from("profiles").upsert({
    id: userId,
    full_name: fullName,
    role,
  });
  if (error) throw error;
}

async function loadProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id,full_name,role,join_code")
    .eq("id", userId)
    .single();

  if (error) {
    msg(error.message, "err");
    showAuth();
    return;
  }

  currentProfile = data;
  renderDashboard();
}

async function renderDashboard() {
  showApp();
  const role = currentProfile.role;
  ui.welcome.textContent = `Welcome, ${currentProfile.full_name || "musician"}`;
  ui.profileMeta.innerHTML = `<span class="pill">${role}</span>`;

  ui.teacherArea.classList.toggle("hidden", role !== "teacher");
  ui.studentArea.classList.toggle("hidden", role !== "student");

  if (role === "teacher") {
    if (currentProfile.join_code) ui.joinCode.value = currentProfile.join_code;
    await loadTeacherStudents();
  }

  if (role === "student") {
    await loadStudentConnection();
  }
}

async function loadTeacherStudents() {
  const { data, error } = await supabase
    .from("teacher_student_links")
    .select("student:student_id(full_name)")
    .eq("teacher_id", currentProfile.id);

  if (error) {
    ui.studentList.innerHTML = `<li class='err'>${error.message}</li>`;
    return;
  }

  if (!data.length) {
    ui.studentList.innerHTML = "<li class='muted'>No students connected yet.</li>";
    return;
  }

  ui.studentList.innerHTML = data
    .map((row) => `<li>${row.student?.full_name || "Unknown student"}</li>`)
    .join("");
}

async function loadStudentConnection() {
  const { data, error } = await supabase
    .from("teacher_student_links")
    .select("teacher:teacher_id(full_name)")
    .eq("student_id", currentProfile.id)
    .maybeSingle();

  if (error) {
    ui.studentConnection.innerHTML = `<div class='err'>${error.message}</div>`;
    return;
  }

  if (!data) {
    ui.studentConnection.innerHTML = `<div class='muted' style='margin-top:8px;'>Not connected yet.</div>`;
    return;
  }

  ui.studentConnection.innerHTML = `<div class='ok' style='margin-top:8px;'>Connected to ${data.teacher?.full_name || "teacher"}.</div>`;
}

function getAuthFields() {
  return {
    email: qs("email").value.trim(),
    password: qs("password").value,
    fullName: qs("fullName").value.trim(),
    role: qs("role").value,
  };
}

qs("signupBtn").addEventListener("click", async () => {
  try {
    const { email, password, fullName, role } = getAuthFields();
    if (!email || !password || !fullName) return msg("Email, password, and full name are required.", "err");

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    if (data.user) {
      await upsertProfile(data.user.id, fullName, role);
      msg("Signup success. Check email if confirmation is enabled.", "ok");
      await loadProfile(data.user.id);
    }
  } catch (e) {
    msg(e.message, "err");
  }
});

qs("signinBtn").addEventListener("click", async () => {
  try {
    const { email, password } = getAuthFields();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    await loadProfile(data.user.id);
  } catch (e) {
    msg(e.message, "err");
  }
});

qs("magicBtn").addEventListener("click", async () => {
  try {
    const { email } = getAuthFields();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) throw error;
    msg("Magic link sent.", "ok");
  } catch (e) {
    msg(e.message, "err");
  }
});

qs("signoutBtn").addEventListener("click", async () => {
  await supabase.auth.signOut();
  showAuth();
});

qs("makeCodeBtn").addEventListener("click", async () => {
  if (!currentProfile || currentProfile.role !== "teacher") return;
  const code = Math.random().toString(36).slice(2, 8).toUpperCase();
  const { error } = await supabase
    .from("profiles")
    .update({ join_code: code })
    .eq("id", currentProfile.id);
  if (error) return alert(error.message);
  currentProfile.join_code = code;
  ui.joinCode.value = code;
});

qs("connectBtn").addEventListener("click", async () => {
  if (!currentProfile || currentProfile.role !== "student") return;
  const code = qs("teacherCodeInput").value.trim().toUpperCase();
  if (!code) return;

  const { data: teacher, error: findErr } = await supabase
    .from("profiles")
    .select("id")
    .eq("role", "teacher")
    .eq("join_code", code)
    .maybeSingle();

  if (findErr) return alert(findErr.message);
  if (!teacher) return alert("No teacher found for that code.");

  const { error: linkErr } = await supabase.from("teacher_student_links").upsert({
    teacher_id: teacher.id,
    student_id: currentProfile.id,
  });

  if (linkErr) return alert(linkErr.message);
  await loadStudentConnection();
});

supabase.auth.onAuthStateChange(async (_event, session) => {
  if (session?.user) {
    await loadProfile(session.user.id);
  } else {
    showAuth();
  }
});

loadSession();
