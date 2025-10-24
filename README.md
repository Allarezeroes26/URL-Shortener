# 🔗 URL Shortener

A fast, reliable, and minimalistic **URL Shortener** built with **Node.js**, **Express**, and **MongoDB**.  
It integrates the **Bitly API** to generate short links and provides a responsive, clean frontend using **HTML**, **CSS**, and **JavaScript**.

---

# 🚀 Features

- Shorten long URLs in one click  
- Copy the shortened link easily  
- URLs stored securely in MongoDB  
- Responsive, minimalistic UI design  

---

# 🛠️ Technologies Used

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, Express  
- **Database:** MongoDB (via Mongoose)  
- **API Integration:** Bitly API  
- **Deployment:** Render  

---

# ⚙️ Setup Instructions (Local Development)

### 1. Clone the repository
```
git clone https://github.com/Allarezeroes26/URL-Shortener.git
cd URL-shortener
```
### 2. Install dependencies
npm install

### 3. Create a .env file
In the root directory of the project, create a file named '.env' and add your environment variables:

BITLY_API_KEY=your_api_key_here
MONGO_URI=your_mongodb_connection_string
PORT=3000

# 4. Run the app
- npm start

then visit:
http://localhost:3000

---

# 🔎 API Endpoint

POST /shorten
Request body (JSON):
{
	"url": "https://example.com"
}
Response: 
{
	"shortUrl": "https://bitly/abc123"
}

---

## 🌐 Demo

Live Demo: https://comingsoon.p
