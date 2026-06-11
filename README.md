# **DiskKnight** ⚔️

**DiskKnight** is a web application designed to help audiophiles keep track of, organize, and rank their favourite albums and artists, with a focus on personal physical music collections.

The goal of **DiskKnight** is to provide a fun experience that allows users to explore a large public music database, save albums they own, and build a personal library! Physical music collections are unique and personal, yet most modern music apps focus on streaming and algorithms. DiskKnight aims to give collectors a simple, respectful way to catalogue and share the music they own and value with others. 

---

## Features

### 🔍 Search
- Search albums by title and artist via the MusicBrainz API
- Album artwork fetched automatically with each result

### 📀 Collection Management
- Save albums to your personal **Collection**
- Mark albums as **Listened**
- Add albums to a **Listen Later** list
- Add albums to a **Want** list

### ⭐ Rating System
- Rate albums you've listened to using a word-based scale:
  - Perfect, Excellent, Amazing, Great, Good, Mid, Bad
- Ratings display as colored badges on album cards
- Change your rating at any time

### 📊 Sorting
- Sort any collection by Date Added, Title, or Rating

### 👤 User Profiles
- Public profile page with username, bio, and profile photo
- Edit your profile bio and upload a profile photo
- View follower and following counts
- Follow and unfollow other users
- Browse other users' Collections and Listened lists

### 🔎 User Search
- Search for other users by username

### 🔐 Authentication
- Email and password sign up with email verification
- Secure sign in and sign out

### 📱 Progressive Web App
- Installable on desktop and mobile
- Optimized for mobile screen sizes

---

## Tech Stack
- **React** — UI framework
- **Vite** — build tool and dev server
- **React Router** — client side routing
- **Supabase** — authentication, database, and file storage
- **MusicBrainz API** — album metadata
- **Cover Art Archive** — album artwork
- **vite-plugin-pwa** — PWA support
