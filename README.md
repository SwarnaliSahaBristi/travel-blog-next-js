# 🌍 TravelStory

TravelStory is a modern travel web application where users can explore destinations, share travel experiences, and create their own travel stories. The platform allows travelers to discover new places and document their journeys in one place.

---

## 🚀 Live Demo

🔗 Live Site: https://travel-blog-next-js-delta.vercel.app/
🔗 Client Repository: https://github.com/SwarnaliSahaBristi/travel-blog-next-js.git

---

## ✨ Features

* 🔐 **Authentication System**

  * User registration and login using NextAuth
  * Protected routes for authenticated users

* 🧭 **Explore Destinations**

  * Browse travel destinations
  * View detailed destination information

* 📝 **Travel Stories**

  * Users can read travel stories
  * Story details with full description

* ➕ **Add Destination**

  * Authenticated users can add new destinations

* 🛠 **Manage Destinations**

  * Users can view and manage their added destinations

* 🌗 **Dark / Light Mode**

  * Theme toggle with persistent storage

* 📱 **Responsive Design**

  * Fully responsive for desktop, tablet, and mobile

* ⏳ **Animated Loader**

  * Global loading animation for page transitions

---

## 🛠 Tech Stack

**Frontend**

* Next.js 16 (App Router)
* React
* Tailwind CSS
* ShadCN UI
* Lucide Icons

**Authentication**

* NextAuth.js

**Database**

* MongoDB

**Deployment**

* Vercel

---

## 📂 Project Structure

```
src
 ├── app
 │   ├── about
 │   ├── auth
 │   │   ├── login
 │   │   └── register
 │   ├── destinations
 │   ├── destinations-add
 │   ├── destinations-manage
 │   ├── stories
 │   └── api
 │
 ├── components
 │   ├── Home
 │   │   ├── Navbar
 │   │   └── Footer
 │   └── ui
 │
 ├── provider
 │   └── NextAuthProvider
 │
 └── proxy.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/SwarnaliSahaBristi/travel-blog-next-js.git
```

### 2️⃣ Go to the project folder

```bash
cd travelstory-client
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Setup environment variables

Create a `.env.local` file and add:

```

GOOGLE_CLIENT_ID=your_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=your_GOOGLE_CLIENT_SECRET
NEXTAUTH_SECRET=your_secret
MONGODB_URI=your_mongodb_connection_string
DB_NAME=your_db_name
CLIENT_SERVER=https://travel-blog-next-js-delta.vercel.app/

```

### 5️⃣ Run the project


Open:

```
https://travel-blog-next-js-delta.vercel.app/
```

---

## 🔐 Protected Routes

The following routes require authentication:

* `/destinations-add`
* `/destinations-manage`

Route protection is implemented using **Next.js proxy middleware with NextAuth token validation**.

---

## 📸 Screenshots

### Home Page
![Home](/public/screenshots/2026-03-13.png)

### Stories Page
![Stories](/public/screenshots/Screenshot%202026-03-13%20142352.png)

### Destinations Page
![Destinations](/public/screenshots/Screenshot%202026-03-13%20142352.png)

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

---

## 👩‍💻 Author

**Swarnali Saha Bristi**

* GitHub: https://github.com/SwarnaliSahaBristi
* LinkedIn: https://www.linkedin.com/in/swarnali-saha-bristi02/

---

## ⭐ Support

If you like this project, consider giving it a **star ⭐ on GitHub**.
