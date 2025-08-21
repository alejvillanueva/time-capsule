# Memora - a digital time capsule

## Project Description

Memora is a digital time capsule app that helps users capture and preserve special memories, then revisit them later to spark nostalgia. Whether it’s a message to your future self, a collection of photos, or a memory you want to “lock away,” Memora brings the concept of a time capsule into the digital age.

The goal is to create an emotional experience: not just storing content, but transporting users back to a meaningful time and place in their lives.

## Tech Stack

Frontend:

- React (Vite)
- TypeScript
- Cloudinary

Backend:

- Node.js
- Express.js
- PostgreSQL

## Local Setup Instructions

1. Clone repository and install backend dependencies
   ```
   git clone <repo-link>
   cd time-capsule
   npm install
   ```
2. Duplicate the backend `.env.sample` file and edit the file name to be `.env`
3. Edit the environmental variables in `.env` accordingly:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=time_capsule
   DB_USER=postgres
   DB_PASSWORD=<your-DB-password>
   PORT=3000
   ```
4. Navigate to the client directory and install frontend dependencies
   ```
   cd /client
   npm install
   ```
5. Duplicate the frontend `.env.sample` file and edit the file name to be `.env`
6. Sign up with [Cloudinary](https://cloudinary.com/users/register_free) and add your details to `.env` accordingly, ensure no spaces:
   ```
   VITE_PRESET_NAME=<your-cloudinary-preset-name>
   VITE_CLOUD_NAME=<your-cloudinary-cloud-name>
   ```
7. Start the server `npm run dev` and enjoy!

**Note:** Current release is optimized for **desktop only.** Responsive design will be added in future sprints.

## Features

- Create a Time Capsule – Write a note and upload images or videos.
- Lock & Unlock Capsules – Set a future date to open a capsule.
- Media Support – Store images and videos in the cloud using Cloudinary.
- User Accounts – Capsules are tied to specific users. (coming soon)
- Sharing & Prompts – Share capsules with friends/family, get AI memory prompts. (coming soon)

## Sitemap

```
Home
├── Create Capsule
│   ├── Set Capsule Settings
├── Edit Capsule
│   ├── Edit Capsule Settings
│   └── Create Memory
│       ├── Write Message
│       ├── Upload Images
│       └── Upload Videos
├── Locked Capsules
├── Open Capsules
│   └── Share with Friends/Family
└── Future Capsules (Coming Soon)
    └── AI Memory Prompts
```

## Credits

- Alejandra Villanueva: backend development + frontend coordination
- Freedom Stone: design + frontend development

## Future Improvements

- Responsive design
- Authentication & authorization
- Capsule sharing & collaboration
- AI-generated memory prompts
- Push notifications for capsule unlock dates
