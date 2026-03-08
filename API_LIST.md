# 📘 Writeora API Documentation

## 🌐 Base URLs

- **Frontend Base URL**: `http://localhost:5173` (Development) / `https://writeora.ai` (Production)
- **Backend Base URL**: `http://localhost:5000` (Default) / `import.meta.env.VITE_API_BASE_URL`

--------------------------------------------------

## 🔐 Authentication APIs

### POST /api/user/register
- **Description**: Register a new user.
- **Middleware**: None
- **Request Body**: `{ name, email, password }`
- **Response**: `{ _id, name, email, token, ... }`
- **Used in Frontend**: `userService.js` (via `registerUser` - *Note: inferred, function not visible in view but standard pattern*)

### POST /api/user/login
- **Description**: Authenticate a user and return a token.
- **Middleware**: None
- **Request Body**: `{ email, password }`
- **Response**: `{ _id, name, email, token, ... }`
- **Used in Frontend**: `userService.js` (via `loginUser` - *Note: inferred*)

### POST /api/user/logout
- **Description**: Log out the current user (clears cookies).
- **Middleware**: None
- **Response**: `{ message: "Logged out successfully" }`
- **Used in Frontend**: `userService.js` (via `logoutUser` - *Note: inferred*)

### POST /api/user/forgot-password
- **Description**: Initiate password reset process.
- **Middleware**: None
- **Request Body**: `{ email }`
- **Response**: `{ message: "Email sent" }`
- **Used in Frontend**: `userService.js` (via `forgotPassword` - *Note: inferred*)

### POST /api/user/reset-password/:resetToken
- **Description**: Reset password using a valid token.
- **Middleware**: None
- **Request Body**: `{ password }`
- **Response**: `{ message: "Password reset successful" }`
- **Used in Frontend**: `userService.js` (via `resetPassword` - *Note: inferred*)

--------------------------------------------------

## 📝 Post APIs

### GET /api/posts/
- **Description**: Get all public posts.
- **Protected**: No
- **Response**: `{ posts: [...] }`
- **Used in Frontend**: `postService.js` -> `getAllPosts`

### GET /api/posts/:slug
- **Description**: Get a single post by its slug.
- **Protected**: No (Optional Auth)
- **Middleware**: `optionalAuth`
- **Response**: `{ post: {...} }`
- **Used in Frontend**: `postService.js` -> `getPostBySlug`

### POST /api/posts/
- **Description**: Create a new blog post.
- **Protected**: **Yes**
- **Middleware**: `protect`
- **Request Body**: `{ title, content, description, tags, category, coverImage, ... }`
- **Response**: `{ post: {...} }`
- **Used in Frontend**: `postService.js` -> `createPost`

### GET /api/posts/user/my-posts
- **Description**: Get posts created by the logged-in user.
- **Protected**: **Yes**
- **Middleware**: `protect`
- **Response**: `{ posts: [...] }`
- **Used in Frontend**: `postService.js` -> `getMyPosts`

### GET /api/posts/category/:category
- **Description**: Get posts filtered by category.
- **Protected**: **Yes** (*Note: backend has `protect` middleware, but this seems like it should be public*)
- **Middleware**: `protect`
- **Response**: `{ posts: [...] }`
- **Used in Frontend**: `postService.js` -> `getPostByCategory`

### GET /api/posts/user/saved
- **Description**: Get posts saved by the user.
- **Protected**: **Yes**
- **Middleware**: `protect`
- **Response**: `{ savedPosts: [...] }`
- **Used in Frontend**: `postEngagement.js` -> `getUserSavedPosts`

### POST /api/posts/:slug/likes
- **Description**: Toggle like on a post.
- **Protected**: **Yes**
- **Middleware**: `protect`
- **Response**: `{ isLiked, likesCount }`
- **Used in Frontend**: `postEngagement.js` -> `toggleLikePost`

### POST /api/posts/:slug/comments
- **Description**: Add a comment to a post.
- **Protected**: **Yes**
- **Middleware**: `protect`
- **Request Body**: `{ text }`
- **Response**: `{ comment: {...} }`
- **Used in Frontend**: `postEngagement.js` -> `addComment`

### GET /api/posts/user/stats
- **Description**: Get engagement stats for the logged-in user.
- **Protected**: **Yes**
- **Middleware**: `protect`
- **Response**: `{ totalViews, totalLikes, ... }`
- **Used in Frontend**: `postEngagement.js` -> `getUserStats`

### GET /api/posts/user/stats/:userId
- **Description**: Get public stats for a specific user.
- **Protected**: No
- **Response**: `{ totalViews, totalLikes, ... }`
- **Used in Frontend**: `postEngagement.js` -> `getUserStatsById`

--------------------------------------------------

## 🎓 User Profile & Settings APIs

### GET /api/user/profile
- **Description**: Get current user's profile.
- **Protected**: **Yes**
- **Middleware**: `protect`
- **Response**: `{ user: {...} }`
- **Used in Frontend**: Not explicitly found in scanned service files (likely used in AuthContext or similar).

### GET /api/user/author/:id
- **Description**: Get a public profile by Author ID.
- **Protected**: No
- **Response**: `{ user: {...}, posts: [...] }`
- **Used in Frontend**: `userService.js` -> `getPublicProfile`

### PUT /api/user/settings/username
- **Description**: Update user's username.
- **Protected**: **Yes**
- **Middleware**: `protect`
- **Request Body**: `{ username }`
- **Used in Frontend**: `userService.js` -> `updateUsername`

### PUT /api/user/settings/bio
- **Description**: Update user's bio.
- **Protected**: **Yes**
- **Middleware**: `protect`
- **Request Body**: `{ bio }`
- **Used in Frontend**: `userService.js` -> `updateBio`

### PUT /api/user/settings/avatar
- **Description**: Update user's avatar.
- **Protected**: **Yes**
- **Middleware**: `protect`
- **Request Body**: `{ avatar }`
- **Used in Frontend**: `userService.js` -> `updateAvatar`

--------------------------------------------------

## 🤖 AI APIs

### POST /api/ai/expand
- **Description**: Expand a piece of text using AI.
- **Protected**: No (Middleware not explicitly checked in `ai.route.js` but likely open or handled in controller)
- **Request Body**: `{ content }`
- **Used in Frontend**: `aiService.js` -> `expandContent`

### POST /api/ai/shorten
- **Description**: Shorten a piece of text using AI.
- **Request Body**: `{ content }`
- **Used in Frontend**: `aiService.js` -> `shortenContent`

### POST /api/ai/fix-grammar
- **Description**: Fix grammar in text.
- **Request Body**: `{ content }`
- **Used in Frontend**: `aiService.js` -> `fixGrammar`

### POST /api/ai/generate
- **Description**: Generate new content based on a prompt.
- **Request Body**: `{ prompt, template }`
- **Used in Frontend**: `aiService.js` -> `generateContent`

--------------------------------------------------

--------------------------------------------------

## 🛑 Admin System APIs (Role: Admin Only)

### GET /api/admin/users
- **Description**: Get all registered users.
- **Protected**: **Yes**
- **Middleware**: `protect` + `adminProtect`
- **Response**: `[ { name, email, role, ... } ]`
- **Used in Frontend**: `adminService.js` -> `getAllUsers`

### DELETE /api/admin/user/:id
- **Description**: Delete a user.
- **Protected**: **Yes**
- **Middleware**: `protect` + `adminProtect`
- **Used in Frontend**: `adminService.js` -> `deleteUser`

### PUT /api/admin/user/:id/role
- **Description**: Update user role.
- **Protected**: **Yes**
- **Middleware**: `protect` + `adminProtect`
- **Request Body**: `{ role: "admin" | "user" }`
- **Used in Frontend**: `adminService.js` -> `updateUserRole`

--------------------------------------------------

## 📚 Learn System APIs

### GET /api/learn/modules
- **Description**: Get all learning modules.
- **Protected**: No
- **Response**: `[ { title, slug, level, image, createdBy: { name }, ... } ]`
- **Used in Frontend**: `learnService.js` -> `getModules`

### GET /api/learn/modules/:slug
- **Description**: Get a single module by slug (including lessons list).
- **Protected**: No
- **Response**: `{ title, ..., lessons: [ { title, slug, duration } ] }`
- **Used in Frontend**: `learnService.js` -> `getModuleBySlug`

### GET /api/learn/modules/:moduleSlug/lessons/:lessonSlug
- **Description**: Get lesson details.
- **Protected**: No
- **Response**: `{ title, content, resources: [...] }`
- **Used in Frontend**: `learnService.js` -> `getLesson`

### POST /api/learn/modules
- **Description**: Create a new module.
- **Protected**: **Yes** (Admin)
- **Middleware**: `protect` + `adminProtect`
- **Request Body**: `{ title, slug, description, image, level }`
- **Used in Frontend**: `learnService.js` -> `createModule`

### PUT /api/learn/modules/:id
- **Description**: Update a module.
- **Protected**: **Yes** (Admin)
- **Middleware**: `protect` + `adminProtect`
- **Request Body**: `{ ...data }`
- **Used in Frontend**: `learnService.js` -> `updateModule`

### DELETE /api/learn/modules/:id
- **Description**: Delete a module and its lessons.
- **Protected**: **Yes** (Admin)
- **Middleware**: `protect` + `adminProtect`
- **Used in Frontend**: `learnService.js` -> `deleteModule`

### POST /api/learn/lessons
- **Description**: Create a new lesson.
- **Protected**: **Yes** (Admin)
- **Middleware**: `protect` + `adminProtect`
- **Request Body**: `{ moduleId, title, slug, content, duration, resources }`
- **Used in Frontend**: `learnService.js` -> `createLesson`

### PUT /api/learn/lessons/:id
- **Description**: Update a lesson.
- **Protected**: **Yes** (Admin)
- **Middleware**: `protect` + `adminProtect`
- **Used in Frontend**: `learnService.js` -> `updateLesson`

### DELETE /api/learn/lessons/:id
- **Description**: Delete a lesson.
- **Protected**: **Yes** (Admin)
- **Middleware**: `protect` + `adminProtect`
- **Used in Frontend**: `learnService.js` -> `deleteLesson`

--------------------------------------------------

## 📂 Upload APIs

### POST /api/upload
- **Description**: Upload image (Cloudinary).
- **Protected**: **Yes**
- **Middleware**: `protect` + Multer
- **Used in Frontend**: `uploadImage.js`

### POST /api/upload/pdf
- **Description**: Upload PDF (Cloudinary Raw).
- **Protected**: **Yes** (Admin)
- **Middleware**: `protect` + `adminProtect` + Multer
- **Used in Frontend**: `uploadService.js` -> `uploadPdf`

--------------------------------------------------

## 🔄 Frontend API Mapping Table

| Frontend File | Method | Endpoint | Backend Match | Protected? |
| :--- | :--- | :--- | :--- | :--- |
| `postService.js` | GET | `/api/posts/` | `GET /api/posts/` | ❌ |
| `postService.js` | POST | `/api/posts/` | `POST /api/posts/` | ✅ |
| `postService.js` | GET | `/api/posts/:slug` | `GET /api/posts/:slug` | ⚠️ |
| `postService.js` | GET | `/api/posts/category/:cat` | `GET /api/posts/category/:cat` | ❌ |
| `adminService.js` | GET | `/api/admin/users` | `GET /api/admin/users` | ✅ (Admin) |
| `learnService.js` | POST | `/api/learn/modules` | `POST /api/learn/modules` | ✅ (Admin) |
| `uploadService.js` | POST | `/api/upload/pdf` | `POST /api/upload/pdf` | ✅ (Admin) |

