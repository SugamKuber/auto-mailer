# Auto Mailer

## Backend setups

- Step 1 : Provide all the required creds in backend root/.env

```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK=

FONTEND_REDIRECT=

MONGO_URI=
```
- Step 2 :
```
npm i
npm run dev (for development server)
npm run build (to build with tsc)
npm run start (to start with build dir)
```

## Frontend setup

- Step 1 : Provide BACKEND_URL = " "  in /check.js file && /googlebutton.js file
- Step 2 : 
```
npm i
npm run dev (for development server)
npm run build (to build with vite)
npm run preview (to run with vite build)
```

## Creds on Google
- Use [google console](https://console.cloud.google.com/) >> Api & Services ( Create a project is you dont have) >> Sidebar Oauth Consent Screen >> Credentials >> Create and copy the creds
- [IMP] Input your gmail for test account
- [IMP] Input you domains/urls for redirection
