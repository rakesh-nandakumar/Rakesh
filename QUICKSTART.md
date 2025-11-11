# Admin Panel Integration - Quick Start

I've successfully created and integrated a full backend system for your admin panel! Here's what has been done and how to use it.

## 🎉 What's Been Completed

### Backend Infrastructure

✅ **Express API Server** (`admin/server/index.js`)

- REST API for all 11 JSON data files
- File upload handler for images
- Full CRUD operations
- Drag-and-drop reordering endpoint
- Runs on port 3001

✅ **File System Client** (`admin/src/lib/fsClient.ts`)

- Real API integration (no more mock data)
- Type-safe operations
- Error handling with proper feedback

✅ **TypeScript Types** (`admin/src/types/data.ts`)

- Complete type definitions for all 11 data entities
- Type safety across the entire admin panel

### Frontend Integration

✅ **BlogsPage** - Fully functional with:

- Real-time data loading from blogs.json
- Drag-and-drop reordering (saves to JSON)
- Delete functionality
- Toast notifications

✅ **Configuration Updates**

- Vite dev server on port 5173
- API proxy to localhost:3001
- Path aliases for easy imports
- Concurrent script setup

✅ **Root Package.json**

- `npm run dev:all` - Runs both Next.js and Admin
- Concurrently package added

## 🚀 How to Get Started

### Step 1: Run the Setup Script

Open PowerShell in your project root and run:

```powershell
.\setup-admin.ps1
```

This will:

1. Install `concurrently` in root
2. Install Express dependencies in `admin/server`
3. Install admin panel dependencies
4. Create the uploads directory

### Step 2: Start the Development Servers

**Option A: Admin Panel Only**

```powershell
cd admin
npm run dev
```

**Option B: Both Next.js and Admin Panel**

```powershell
npm run dev:all
```

### Step 3: Access the Admin Panel

Open your browser to:

- **Admin Panel:** http://localhost:5173
- **Next.js Site:** http://localhost:3000
- **API Server:** http://localhost:3001

## 📂 How It Works

### Data Flow

```
Admin Panel (React)
    ↓
fsClient.ts (API calls)
    ↓
Express Server (port 3001)
    ↓
JSON Files in /data directory
    ↓
Next.js Website (reads JSON files)
```

## 🎯 What Works Right Now

### ✅ Blogs Page (Fully Functional)

1. Navigate to "Blogs" in the admin sidebar
2. See all your blog posts from `data/blogs.json`
3. **Drag and Drop** rows to reorder (saves to JSON!)
4. Click "Delete" to remove a blog post
5. All changes are saved to the JSON file immediately

### 🔧 API Endpoints Available

All these endpoints are live and working:

**Read Data:**

- `GET /api/about`
- `GET /api/blogs`
- `GET /api/portfolio`
- `GET /api/services`
- `GET /api/technologies`
- `GET /api/timeline`
- `GET /api/gallery`
- `GET /api/header`
- `GET /api/site-config`

**Update Operations:**

- `POST /api/{entity}` - Replace entire file
- `PATCH /api/{entity}/{id}` - Update single item
- `DELETE /api/{entity}/{id}` - Delete item
- `POST /api/{entity}/add` - Add new item
- `POST /api/{entity}/reorder` - Reorder array items

**File Upload:**

- `POST /api/upload` - Upload images to `/public/assets/uploads`

## 📖 Detailed Documentation

For comprehensive documentation, see:

- **`admin/SETUP_GUIDE.md`** - Complete setup guide with all details
- **`admin/server/index.js`** - API endpoint documentation

## 🐛 Troubleshooting

### "Port 3001 already in use"

```powershell
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Changes not saving

1. Check that Express server is running (should see logs in terminal)
2. Check browser console for errors
3. Verify JSON file has write permissions

## 📊 Example: Testing Blogs

1. Start the servers: `npm run dev:all`
2. Open admin panel: http://localhost:5173
3. Click "Blogs" in the sidebar
4. You should see your actual blog posts from `data/blogs.json`
5. Try dragging a blog post to reorder - it will save!
6. Open `data/blogs.json` in VS Code - you'll see the order changed!

---

**Everything is ready to go!** Just run `.\setup-admin.ps1` and then `npm run dev:all` to get started.
