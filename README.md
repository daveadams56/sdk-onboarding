# SDK Onboarding Project

### About
#### This project is for learning and development during the onboarding process to the ForgeRock SDK Engineering team

---
### Pre-requisites
1. Node.js (12+)
2. A tool for making locally-trusted certificates such as mkcert: https://github.com/FiloSottile/mkcert#installation
---
### Installation
1. Clone the repo\
`git clone https://github.com/daveadams56/sdk-onboarding.git`
2. Install dependencies\
`npm install`
3. Add the following DNS alias to /etc/hosts
> `127.0.0.1 app.example.com`
4. Create Self-signed Certificates using mkcert\
`cd /path/to/project/certs`\
`mkcert -install`\
`mkcert example.com "*.example.com" example.test localhost 127.0.0.1 ::1`
5. Run the app\
`node app.js`
6. Access the app in a browser at https://app.example.com:8000/

---
### Version History
- v0.0.1 (Sep 1st 2021) Created project