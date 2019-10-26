# Firebase Mailjet Function

## How it works

This function triggers a transactional mail whenever a new user signs up via e-mail. Make sure you are using [Firebase Authentication](Firebase Authentication) and have [Mailjet](https://mailjet.com/) setup with a nice welcome template. Consider setting the optional Authentications `displayName` property to personalize your message.

## Configure & Use it

-   After the general setup above run `npm i`
-   See a list of mandatory environment variables in `/functions/src/config.ts`
-   Make sure you set all environment variables via `firebase functions:config:set variable="example"`
-   Log into your firebase project, deploy and start sending warm welcome mails
