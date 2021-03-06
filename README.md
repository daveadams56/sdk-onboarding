# SDK Onboarding Project

### About
#### This project is for learning and development during the onboarding process to the ForgeRock SDK Engineering team

---
### Pre-requisites
1. Node.js (12+)
2. A tool for making locally-trusted certificates such as mkcert: https://github.com/FiloSottile/mkcert#installation
3. Vue CLI (3)
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
5. Run the app in "hot-reload" mode for development
`npm run serve`
6. Build and run the app in production mode for testing
`npm run build`
`node app.js`
7. Access the app in a browser at https://app.example.com:8000/

---
### Version History
- [v0.0.1](https://github.com/daveadams56/sdk-onboarding/commit/943c8dadafee673ced2289e26665f99eb5d3a058) (Sep 1st 2021) Created project 
- [v0.0.2](https://github.com/daveadams56/sdk-onboarding/commit/88b73117eca66fd59333b42292021a1f456b6510) (Sep 1st 2021) Added username and password authentication with ForgeRock SDK
- [v0.0.3](https://github.com/daveadams56/sdk-onboarding/commit/74d552ca404434affd24d73b8d23e92464ba28bf) (Sep 2nd 2021) Added OAuth flow to get tokens and retrieve user info
- [v0.0.4](https://github.com/daveadams56/sdk-onboarding/commit/03138e39010239230adb8ecaaaa4c7bbb66ffdd3) (Sep 3rd 2021) Basic SDK flows working
- [v0.0.5](https://github.com/daveadams56/sdk-onboarding/commit/dd0384844ca0e1722e703a0de059ee7ee385e4d4) (Sep 9th 2021) Feature parity using Vue.js 3 + typescript
- [v0.0.6](https://github.com/daveadams56/sdk-onboarding/commit/30b0a68afc9e0af2ecbd1df259584fbbf9659d59) (Sep 9th 2021) Enabled centralised login using ID Cloud
- [v0.0.7](https://github.com/daveadams56/sdk-onboarding/commit/99a3514ecdfbdde4b910e8d1205bf3ccafdc0ae2) (Sep 9th 2021) Completed centralised login flow using ID Cloud
- [v0.0.8](https://github.com/daveadams56/sdk-onboarding/commit/cc3faa6c1b9123c4f4bc0beb6e8896f8082c80df) (Sep 10th 2021) Fixed bugs on logout after centralised flow and on failure