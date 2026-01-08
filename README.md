# **DiskKnight** ⚔️

**DiskKnight** is a work-in-progress web application designed to help audiophiles keep track of, organize, and rank their favourite albums and artists, with a focus on personal physical music collections.

The goal of **DiskKnight** is to provide a fun experience that allows users to explore a large public music database, save albums they own, and build a personal library! Physical music collections are unique and personal, yet most modern music apps focus on streaming and algorithms. DiskKnight aims to give collectors a simple, respectful way to catalogue and share the music they own and value with others. 

**DiskKnight** is in early development.  Core architecture and API integration are in place, with UI, persistence, and PWA functionality currently under active development.

---

## Features (Current & Planned)

### In Current Development
- React-based frontend built with **Vite**
- Album and artist metadata fetched from the **MusicBrainz API**
- Album artwork retrieved via the **Cover Art Archive**
- No user accounts or authentication required
- Simple, fast development workflow

### Planned Features
- Search interface for albums and artists
- Ability to save albums to a personal collection
- Ranking and rating system for albums
- Offline-friendly storage using browser-based persistence
- Accounts for users to view others' profiles and rankings
- Progressive Web App (PWA) support for installation on mobile and desktop

---

## Tech Stack
- **React** – The UI framework
- **Vite** – The build tool and dev server
- **MusicBrainz API** – Music metadata
- **Cover Art Archive** – Album artwork
- **JavaScript (ES6+)**
- **HTML / CSS**

## APIs Used (currently chosen)
### MusicBrainz
Used to retrieve album and artist metadata such as:
- Album titles
- Artists
- Release dates

### Cover Art Archive
Used concurrently with the MusicBrainz API to display album artwork when available.

---

## Getting Started

```bash
npm install
npm run dev
