# Introduction 
Front-end react template

# Getting Started
To locally run project:
1. Have npm installed
2. ```npm install webpack -g```
3. Clone repo and navigate to root of project (where webpack.config.js is)
4. ```npm install```
5. Start development server: ```npm run start:build```

# Manual/Local Build
To build code and deploy:
1. Run ```npm run start:build```
2. Deploy resulting "dist" folder contents to static storage account, web server, or any other publically accessible address.

# Continuous Build
This repo continuously builds on master update (whether direct or pull request). Steps to build include:
1. Scan source code against Static Code Analysis tool (Checkmarx). If High or Medium vulnerabilities exist, fail build.
2. npm install
3. npm run start:build
4. Zip resuling /dist folder

# Continuous Deploy
Deployments will automatically occur when a build succeeds. Steps to deployment include:
1. Use Zip Deploy to bsnconnectb2b Web App staging slot. The sole purpose of this slot is to avoid downtime in production.
2. The staging slot is automatically hot swapped and new code goes right to production. If error is found after deployment go into the Azure Portal to quickly roll back to earlier release.