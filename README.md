

# ✅ Clone the monorepo to your local machine
git clone https://github.com/mdadilkhan/Blog_services.git

# 📁 Go into the cloned repo directory
cd your-monorepo

# 🚀 Navigate into a specific microservice (e.g., User,Blog,Author)
cd services/auth-service

User service uses Mongodb databse
Blog Service use postgresql databse

# 📦 Install all required dependencies from package.json
# Why? → This installs all the node modules needed to run the service
```npm install```


# ⚙️ Setup environment variables (edit .env file)
# PORT=3000
# NODE_ENV=development
# APP_DEBUG=false
# LOG_LEVEL=debug
# SECRET_KEY=XXXXXXXX
# ISSUER="xxxxxx"
# DATABASE_URL=
# AWS_ACCESS_KEY=
# AWS_SECRET_KEY=
# AWS_REGION=
# AWS_BUCKET=
# AWS_CLOUD_FRONT=

# 🧪 Run test cases (if any)
```npm run test```
# Why? → To run unit/integration tests once and see the results

# 🧪 Run tests continuously in watch mode (optional)
```npm run test:watch```
# Why? → Useful during development to auto-run tests on file changes

# 🧑‍💻 Start the microservice in development mode with hot-reload
```npm run dev```
# Why? → Runs the app using nodemon, which restarts the server on code changes



# 🧹 (Optional) Clean the dist folder before rebuilding
```rm -rf dist```

# 🏗️ Compile TypeScript files into JavaScript
```npm run build```
# Why? → Converts all `.ts` files in `src/` to `.js` files in `dist/` for production

# 🚀 Start the production-ready app from the compiled JS
```npm run start```
# Why? → Runs the compiled version (JavaScript) in Node.js for deployment










