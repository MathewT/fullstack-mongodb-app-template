<div align="center">

# 🚀 Full Stack MongoDB, NodeJS Application Template

### A production-ready, cloud-native full-stack starter kit

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![AWS Lambda](https://img.shields.io/badge/AWS-Lambda-FF9900?style=for-the-badge&logo=aws-lambda&logoColor=white)](https://aws.amazon.com/lambda/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

---

**A complete, containerized full-stack solution** with Node.js backend (AWS Lambda-compatible), MongoDB database, and Bootstrap frontend. Everything runs locally using Docker and Docker Compose with hot reload for rapid development.

[Quick Start](#-quick-start) • [Features](#-features) • [API Docs](#-api-endpoints) • [Deployment](#-aws-deployment)

</div>

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [API Endpoints](#-api-endpoints)
- [Development](#-development)
- [Environment Variables](#-environment-variables)
- [Troubleshooting](#-troubleshooting)
- [Production](#-production-considerations)

---

## 🛠️ Tech Stack

<table>
<tr>
<td width="33%" valign="top">

### 🎨 Frontend
- 🖼️ **Framework**: Bootstrap 5
- ⚡ **JavaScript**: Vanilla JS
- 🔧 **Build Tool**: Gulp 4
- 🎨 **Styling**: Sass/SCSS
- 📦 **Package Manager**: Yarn

</td>
<td width="33%" valign="top">

### ⚙️ Backend
- 🟢 **Runtime**: Node.js 18
- 🔷 **Architecture**: AWS Lambda
- 🗄️ **Database**: MongoDB + Mongoose
- 📝 **Language**: JavaScript
- 📦 **Package Manager**: Yarn

</td>
<td width="33%" valign="top">

### 🏗️ Infrastructure
- 🐳 **Container**: Docker
- 🎼 **Orchestration**: Docker Compose
- 💾 **Database**: MongoDB 7.0
- ☁️ **Cloud Ready**: AWS Lambda

</td>
</tr>
</table>

---

## ✨ Features

<div align="center">

| Feature | Description |
|---------|-------------|
| 🎯 **Single Lambda Function** | All API routes handled by one AWS Lambda function |
| 🔄 **RESTful API** | Complete CRUD operations with clean architecture |
| 💾 **MongoDB + Mongoose** | Powerful ODM with schema validation |
| 📱 **Responsive UI** | Bootstrap 5 mobile-first design |
| ⚡ **Fast Build System** | Gulp with Sass compilation & hot reload |
| 🔥 **Hot Reload** | Live updates for both frontend & backend |
| 🐳 **Fully Dockerized** | One command to rule them all |
| 🌐 **CORS Enabled** | Ready for cross-origin requests |
| 🛡️ **Error Handling** | Comprehensive validation & error management |
| 📦 **Clean Architecture** | Modular, maintainable code structure |

</div>

---

## 📁 Project Structure

```
.
├── 🔧 backend/                 # Backend Lambda function
│   ├── src/
│   │   ├── index.js           # 🎯 Main Lambda handler
│   │   ├── local.js           # 💻 Local development server
│   │   ├── db/
│   │   │   └── connection.js  # 🔌 Database connection
│   │   └── models/
│   │       └── Item.js        # 📊 Mongoose models
│   ├── Dockerfile             # 🐳 Backend container
│   └── package.json
│
├── 🎨 frontend/               # Frontend application
│   ├── src/
│   │   ├── index.html         # 🏠 Main HTML
│   │   ├── js/
│   │   │   └── app.js         # ⚡ Vanilla JavaScript
│   │   └── scss/
│   │       └── main.scss      # 🎨 Sass styles
│   ├── gulpfile.js            # 🔧 Build configuration
│   ├── Dockerfile             # 🐳 Frontend container
│   └── package.json
│
├── 🎼 docker-compose.yml      # Orchestration config
├── 💾 mongo-init.js           # Database initialization
└── 📖 README.md
```

---

## 📋 Prerequisites

<table>
<tr>
<td align="center" width="25%">
<img src="https://raw.githubusercontent.com/docker-library/docs/c350af05d3fac7b5c3f6327ac82fe4d990d8729c/docker/logo.png" width="60px" /><br />
<strong>Docker Desktop</strong><br />
or Docker Engine + Compose
</td>
<td align="center" width="25%">
<img src="https://yarnpkg.com/img/yarn-kitten-circle.svg" width="60px" /><br />
<strong>Yarn</strong><br />
Package Manager
</td>
<td align="center" width="25%">
<img src="https://nodejs.org/static/images/logo.svg" width="60px" /><br />
<strong>Node.js 18+</strong><br />
For local development
</td>
<td align="center" width="25%">
<img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" width="60px" /><br />
<strong>Git</strong><br />
Version Control
</td>
</tr>
</table>

---

## 🚀 Quick Start

### 1️⃣ Clone and Setup

```bash
# 📥 Copy environment variables
cp .env.example .env

# 📦 Install dependencies (optional, Docker will handle this)
yarn install:all
```

### 2️⃣ Run with Docker

```bash
# 🚀 Start all services
yarn dev

# 🔨 Or with rebuild
yarn dev:build

# 📋 View logs
yarn logs
```

### 3️⃣ Access the Application

<div align="center">

| Service | URL | Description |
|---------|-----|-------------|
| 🎨 **Frontend** | http://localhost:3000 | Web Interface |
| ⚙️ **Backend API** | http://localhost:9000 | REST API |
| 💾 **MongoDB** | localhost:27017 | Database |

</div>

### 4️⃣ Stop Services

```bash
# ⏹️ Stop containers
yarn down

# 🧹 Stop and remove volumes (clean database)
yarn clean
```

---

## 🌐 API Endpoints

### 💚 Health Check

<table>
<tr>
<td width="20%"><strong>Method</strong></td>
<td><code>GET</code></td>
</tr>
<tr>
<td><strong>Endpoints</strong></td>
<td><code>/health</code> or <code>/</code></td>
</tr>
<tr>
<td><strong>Response</strong></td>
<td>

```json
{ "status": "ok" }
```
</td>
</tr>
</table>

### 📦 Items Resource

#### 📋 Get All Items

```http
GET /items
```

<details>
<summary><strong>Response Example</strong></summary>

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Item name",
    "description": "Item description",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```
</details>

#### 🔍 Get Single Item

```http
GET /items/:id
```

#### ➕ Create Item

```http
POST /items
Content-Type: application/json
```

<details>
<summary><strong>Request Body</strong></summary>

```json
{
  "name": "Item name",
  "description": "Item description"
}
```
</details>

#### ✏️ Update Item

```http
PUT /items/:id
Content-Type: application/json
```

<details>
<summary><strong>Request Body</strong></summary>

```json
{
  "name": "Updated name",
  "description": "Updated description"
}
```
</details>

#### 🗑️ Delete Item

```http
DELETE /items/:id
```

---

## 💻 Development

### 🎨 Frontend Development

```bash
cd frontend

# 📦 Install dependencies
yarn install

# 🔥 Development mode with watch
yarn dev

# 🏗️ Build for production
yarn build

# 🌐 Serve built files
yarn serve
```

**🔧 Gulp Build System Features:**
- ✅ Compiles Sass to CSS
- ✅ Minifies CSS and JavaScript
- ✅ Generates source maps
- ✅ Auto-reloads browser on changes
- ✅ Optimizes assets

### ⚙️ Backend Development

```bash
cd backend

# 📦 Install dependencies
yarn install

# 🔥 Development mode with nodemon
yarn dev

# 🚀 Production mode
yarn start
```

### 💻 Local Development (without Docker)

#### 🐳 Start MongoDB
```bash
docker run -d -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password123 \
  mongo:7.0
```

#### ⚙️ Start Backend
```bash
cd backend
export MONGODB_URI="mongodb://admin:password123@localhost:27017/appdb?authSource=admin"
yarn dev
```

#### 🎨 Start Frontend
```bash
cd frontend
yarn dev
```

---

## ⚡ Lambda Function Structure

The backend is designed to run as an **AWS Lambda function** but includes a local server wrapper for development.

### 🎯 Key Features:
- 🔹 Single handler function for all routes
- 🔹 Event-driven architecture
- 🔹 Stateless design
- 🔹 Connection pooling for MongoDB
- 🔹 Environment-based configuration

### 🚀 Deploying to AWS Lambda

**1️⃣ Package the backend code:**
```bash
cd backend
docker run --rm -ti -v "$(pwd)":/usr/src/app exp2-backend:latest /bin/sh
cd /usr/src/app
yarn install --production
exit
./deploy.sh
```

**2️⃣ Create Lambda function** in AWS Console or using AWS CLI

**3️⃣ Set environment variables:**
- `MONGODB_URI`: Your MongoDB connection string
- `NODE_ENV`: production

**4️⃣ Configure API Gateway** or Lambda Function URL

---

## 🔐 Environment Variables

Create a `.env` file based on `.env.example`:

```env
# 💾 MongoDB
MONGODB_URI=mongodb://mongodb:27017/appdb
MONGODB_USER=admin
MONGODB_PASSWORD=password123

# 🔧 Application
NODE_ENV=development
PORT=3000
API_URL=http://localhost:9000
```

---

## 🐳 Docker Services

<table>
<tr>
<td align="center" width="33%">

### 💾 MongoDB Service
- **Image**: mongo:7.0
- **Port**: 27017
- **Volume**: Persistent data
- **Health**: ✅ Enabled

</td>
<td align="center" width="33%">

### ⚙️ Backend Service
- **Built**: backend/Dockerfile
- **Port**: 9000
- **Hot Reload**: ✅ nodemon
- **Depends**: MongoDB

</td>
<td align="center" width="33%">

### 🎨 Frontend Service
- **Built**: frontend/Dockerfile
- **Port**: 3000
- **Hot Reload**: ✅ BrowserSync
- **Depends**: Backend

</td>
</tr>
</table>

---

## 💿 Database Schema

### 📦 Item Model

```javascript
{
  name: String (required),        // ✏️ Item name
  description: String,            // 📝 Item description
  createdAt: Date,               // 📅 Creation timestamp
  updatedAt: Date                // 🔄 Update timestamp
}
```

---

## 🔧 Troubleshooting

### ⚠️ MongoDB Connection Issues
```bash
# 🔍 Check MongoDB is running
docker-compose ps

# 📋 View MongoDB logs
docker-compose logs mongodb

# 🔄 Reset database
docker-compose down -v
docker-compose up -d mongodb
```

### 🚫 Port Already in Use
```bash
# ✏️ Change ports in docker-compose.yml
ports:
  - "3001:3000"  # Frontend
  - "9001:9000"  # Backend
```

### 🧹 Clear All and Restart
```bash
# ⏹️ Stop all containers
docker-compose down -v

# 🗑️ Remove all images
docker-compose rm -f

# 🔨 Rebuild and start
docker-compose up --build
```

---

## 🧪 Testing API with curl

```bash
# 💚 Health check
curl http://localhost:9000/health

# ➕ Create item
curl -X POST http://localhost:9000/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Item","description":"Test description"}'

# 📋 Get all items
curl http://localhost:9000/items

# 🔍 Get single item
curl http://localhost:9000/items/{item_id}

# ✏️ Update item
curl -X PUT http://localhost:9000/items/{item_id} \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Item"}'

# 🗑️ Delete item
curl -X DELETE http://localhost:9000/items/{item_id}
```

---

## 🚀 Production Considerations

### 🔐 Security
- [ ] 🔑 Add authentication (JWT, OAuth)
- [ ] 🚦 Implement rate limiting
- [ ] 🛡️ Add input validation and sanitization
- [ ] 🔒 Use environment variables for secrets
- [ ] 🔐 Enable HTTPS/TLS

### ⚡ Performance
- [ ] 🚀 Add Redis for caching
- [ ] 📄 Implement pagination for list endpoints
- [ ] 📊 Optimize MongoDB indexes
- [ ] 🌐 Add CDN for static assets
- [ ] 📦 Implement compression

### 📊 Monitoring
- [ ] 📝 Add logging (Winston, Pino)
- [ ] 💚 Implement health checks
- [ ] 🐛 Add error tracking (Sentry)
- [ ] 📈 Monitor performance metrics

### ☁️ AWS Deployment
- [ ] ⚡ Set up Lambda function
- [ ] 🌐 Configure API Gateway
- [ ] 💾 Set up MongoDB Atlas
- [ ] 📋 Configure CloudWatch logs
- [ ] 🔍 Add AWS X-Ray tracing

---

## 🤖 AI-Generated Project

This application was created using AI assistance with the following prompts:

<details>
<summary><strong>📝 Initial Setup Prompt</strong></summary>

```
You are an expert full stack software engineer. You are an expert in Nodejs, 
MongoDB and AWS. Create a full stack application template. Frontend requirements: 
Bootstrap 5 or above framework; vanillajs; Gulp; saas. Backend requirements: 
Single AWS lambda function in Nodejs; pure JavaScript; MongoDB with Mongoose; 
the Lambda function handles all the API resource requests. Everything runs 
locally in Docker and docker compose. Use yarn instead of npm.
```

</details>

<details>
<summary><strong>🔄 Follow-up Prompts</strong></summary>

1. **Continue**: "Continue to iterate?" - To complete the remaining tasks

2. **Build Fix**: Error resolution for ES Module compatibility issues with gulp-autoprefixer
   - Fixed by downgrading `gulp-autoprefixer` from v9 to v8
   - Downgraded `browser-sync` from v3 to v2.29.3
   - Updated Dockerfiles to handle dependencies properly

</details>

---

<div align="center">

## 📄 License

**MIT License** - Feel free to use this template for your projects!

---

## 👨‍💻 Author

**Mathew T**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yourusername)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/yourusername)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/yourusername)

---

## 💬 Support

💡 **Found a bug?** [Open an issue](https://github.com/mathewt/repo/issues)  
⭐ **Like this project?** Give it a star!  
🤝 **Want to contribute?** Pull requests are welcome!

---

### 🌟 Show Your Support

If this template helped you, please consider giving it a ⭐!

---

**Made with ❤️ and ☕**

</div>
