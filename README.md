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
- [v0.0.1](https://github.com/daveadams56/sdk-onboarding/commit/943c8dadafee673ced2289e26665f99eb5d3a058) (Sep 1st 2021) Created project 
- [v0.0.2](https://github.com/daveadams56/sdk-onboarding/commit/88b73117eca66fd59333b42292021a1f456b6510) (Sep 1st 2021) Added username and password authentication with ForgeRock SDK
- [v0.0.3](https://github.com/daveadams56/sdk-onboarding/commit/74d552ca404434affd24d73b8d23e92464ba28bf) (Sep 2nd 2021) Added OAuth flow to get tokens and retrieve user info
- [v0.0.4]() (Sep 3rd 2021) Basic SDK flows working