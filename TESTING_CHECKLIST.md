# 🧪 Testing Checklist: Learn System & Admin Panel

Follow this manual checklist to verify that the new routing and features are working correctly.

## 🎓 1. Public Learning System (No Login Required)

### A. Catalog Page
1.  Navigate to `http://localhost:5173/learn`
    - [ ] **Expect:** See the "Start Learning" header.
    - [ ] **Expect:** See at least 2 module cards ("AI Tools Mastery", "Modern React").
    - [ ] **Expect:** Clicking a card redirects to the module page.

### B. Module Page
1.  Navigate to `http://localhost:5173/learn/ai-tools-mastery`
    - [ ] **Expect:** See the module title, description, and list of lessons.
    - [ ] **Expect:** "Back to Courses" link works.
    - [ ] **Expect:** Clicking a lesson redirects to the lesson viewer.

### C. Lesson Viewer
1.  Navigate to `http://localhost:5173/learn/ai-tools-mastery/lesson/introduction-t![alt text](image.png)o-chatgpt`
    - [ ] **Expect:** See the sidebar with lessons on the left (desktop).
    - [ ] **Expect:** See content "What is ChatGPT?" in the main area.
    - [ ] **Expect:** Browser tab title should change (SEO check).

---

## 🛡️ 2. Admin Panel (Protection Check)

### A. Protected Route Limit
1.  **Clear LocalStorage** (Application tab -> Local Storage -> Clear).
2.  Navigate to `http://localhost:5173/admin/dashboard`
    - [ ] **Expect:** **Redirected** to `/admin/login`.
    - [ ] **Expect:** Should NOT see dashboard.

### B. Admin Login
1.  Navigate to `http://localhost:5173/admin/login`
    - [ ] **Expect:** See login form "Admin Access".
    - [ ] **Action:** Enter incorrect password `wrongpass` -> Alert/Error.
    - [ ] **Action:** Enter correct password `admin123`.
    - [ ] **Expect:** Redirected to `/admin/dashboard`.

### C. Dashboard Access (Logged In)
1.  Navigate to `http://localhost:5173/admin/dashboard`
    - [ ] **Expect:** See "Admin Dashboard" with stats.
    - [ ] **Expect:** **Header and Footer should be HIDDEN**.

### D. Content Manager
1.  Navigate to `http://localhost:5173/admin/learn`
    - [ ] **Expect:** See a table with "AI Tools Mastery" module.
    - [ ] **Action:** Click "Trash" icon -> Confirm -> **Expect:** Module removed from list (UI check only).

### E. Logout
1.  On Dashboard, click "Logout"
    - [ ] **Expect:** Redirected to `/admin/login`.
    - [ ] **Expect:** Trying to go back to `/admin/dashboard` fails (redirects to login).
