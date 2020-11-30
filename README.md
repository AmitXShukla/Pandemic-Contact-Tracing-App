# Pandemic Contact Tracing, Visitor Management, Mobile Assets/Employee Attendance App

```diff
- If you like this project, please consider giving it a star (*) and follow me at GitHub & YouTube.
```
[<img src="https://github.com/AmitXShukla/AmitXShukla.github.io/blob/master/assets/icons/youtube.svg" width=40 height=50>](https://youtube.com/AmitShukla_AI)
[<img src="https://github.com/AmitXShukla/AmitXShukla.github.io/blob/master/assets/icons/github.svg" width=40 height=50>](https://github.com/AmitXShukla)
[<img src="https://github.com/AmitXShukla/AmitXShukla.github.io/blob/master/assets/icons/medium.svg" width=40 height=50>](https://medium.com/@Amit_Shukla)
[<img src="https://github.com/AmitXShukla/AmitXShukla.github.io/blob/master/assets/icons/twitter_1.svg" width=40 height=50>](https://twitter.com/ashuklax)


## Objective
An Electronic Visitor register App for storing Host & Guest Records, Picture Attendance with GPS Locations using user's mobile phone

## Privacy is key
The idea of contact tracing prompts some concerns regarding medical privacy, and public health officials take those concerns seriously.
They are ethically and, in most states, legally bound to protect the information and use it only for public health purposes.

<h2><a href="https://www.youtube.com/playlist?list=PLp0TENYyY8lHnfxOOzZ_hTnPF8Hh3eKDo">Video Tutorials!</a></h2>
<h2>This repository is updated to Angular 11</h2>

please don't forget to copy/update tsconfig.json as well.

<h2>Tools: </h2>
<b>front-end:</b> Angular 11<br/>
<b>back-end:</b> Google Firestore / Firebase<br/>
Pro Version: AI, Machine Learning Algorithm supported Advance features<br/>
<h3><i>send an email to info@elishconsulting.com for Pro version enquiries.</i></h3>
<h2>Features</h2>
<ol>
<li>Admin Panel Access</li>
<li>Paperless Records for Visitors, Contact Tree and Host</li>
<li>Save Visits with Pictures and GPS Locations</li>
<li>Online and/or Offline App</li>
<li>One App for multiple platforms (iOS, Android, Desktop, Cloud etc.)</li>
<li>Instant access to ALL guest/host historical records at guest check-in.</li>
<li>No Thumb expressions or card punching to verify identify.</li>
<li>Auto Face Recognition (Pro version only).</li>
<li>Live Contact instant Notifications (Pro version) </li>
<li>Social Authentication</li>
<li>Online and/or Offline (delayed capture) App</li>
<li>One App for multiple platforms (iOS, Android, Desktop, Cloud etc.)</li>
<li>Store and Access millions of records instantly</li>
<li>Paperless and Mobile on-premise/private cloud App deployement</li>
<li>Instant access to millions of current & historical records at anytime</li>
<li>iOS/Android app (notification enabled) / Advance Custom features (Pro version only)</li>
<li>Unlimited Storage (only limited to server/database hosting)</li>
</ol>

<h2>Let's get started :-</h2>

```ts

// Before we start, Please make sure you have latest version of node js installed.
// head out to https://nodejs.org/en/ and grab latest nodejs.
// Once you have nodejs installed, open command prompt/terminal window.

$ node -v // make sure, this command comes back with a node version
$ npm -v // make sure, this command comes back with a npm version

// How to Install NodeJS on Windows, Mac, Linux & ChromeOS
// First run
$ sudo apt-get update
// and then if needed
$ sudo apt-get install curl gnupg -y
// for nodejs version 14
$ curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
$ sudo apt-get install -y nodejs

// Install Angular CLI
$ npm install -g @angular/cli
$ ng -v // make sure, this command comes back with a npm version
$ mkdir app
$ cd app
$ ng new CTAPP
$ cd CTAPP
$ ng serve

```
<h2> Setup Google Firestore / Firebase Social Authentication</h2>

```ts
>> login to https://console.firebase.google.com
create a new project
choose Firestore as your database
Click on Authentication
>> Sign in Methods
>> enable Email/Password
>> enable Google
>> enable FaceBook Auth
  For Facebook authentication, you will need to create a new FaceBook App
  and create APPID and App Secret from Facebook Graph API
```
<h2> Setup Google Firestore / Firebase Database & Role / Rules</h2>

```ts
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  match /VMS_LICENSE/{document} {
  // FIX READ later, it should only allow if user knows doc id
  	allow read: if true;
   allow read: if false;
   }
  match /VMS_USERS/{document} {
   allow read, write: if isDocOwner() || isAdmin();
   }
   match /VMS_DATA/{document} {
   allow read, write: if isSignedIn();
   }
   match /VMS_EMPLOYEE/{document} {
   allow read, write: if isSignedIn();
   }
   match /VMS_REGISTER/{document} {
   allow read, write: if isSignedIn();
   }
   match /VMS_CONFIG/{document} {
   // allow read, write, update: if isSignedIn();
   allow read, write, update: if true;
   // change this to isAdmin() later
   }
      // helper functions
    function isDocOwner() {
    // assuming document has a field author which is uid
    // Only the authenticated user who authored the document can read or write
    	return request.auth.uid == resource.data.author;
      // This above read query will fail
    // The query fails even if the current user actually is the author of every story document.
    //  The reason for this behavior is that when Cloud Firestore applies your security rules, 
    //  it evaluates the query against its potential result set,
    //   not against the actual properties of documents in your database. 
    //   If a query could potentially include documents that violate your security rules, 
    //   the query will fail.
    //   on your client app, make sure to include following
    //   .where("author", "==", this.afAuth.auth.currentUser.uid)
    }
    function isSignedIn() {
    // check if user is signed in
          return request.auth.uid != null;
    }
    function isAdmin() {
    return get(/databases/$(database)/documents/VMS_USERS/$(request.auth.uid)).data.isAdmin == true;
    }
}
}
```

Firebase/Forestore Storage Rules
```ts
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      // fix these rules later to allow only authorized admin to read images
      allow read, write: if request.auth != null;
    }
  }
}
```