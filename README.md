# ionic-restful-starter
A basic environment for an Ionic app to be integrated to a RESTful backend API.

### What's you'll get:
* Ionic + Cordova Project
* LESS
* FB login
* Gulp tasks (JSHint, Lint, Autoprefixer)
* HTML, JS Minification
* Makefile
* A *highly scalable* directory structure.

### Initial Set-up:
1. Make sure nodejs, npm are installed.
2. Clone this repository.
3. `cd` into the project's root directory.
4. Type the following commands into the terminal:
    * `make install` (Install the necessary project dependencies through npm and bower)
    * `make plugins` (Install the necessary Cordova plugins)
    * `make android` (Run Android specific tasks)
    * `gulp` (to generate the `www/dist/` directory).
    * `make serve` (Running this should navigate to `localhost:3000/` in your default web-browser)
5. Your app-specific code should always be present in `www/` directory.
6. Keep `gulp` running, as it would be watching for changes to your `.html`, `.less` and `.js` files inside the respective directories, and running it's tasks automatically.
7. Page reload should automatically be trigerred on any code-changes inside `www/` (not applicable to changes in `www/lib/`).

### FB login integration:

**Step 1**: Create a Facebook application

    Login to Facebook

    Access https://developers.facebook.com/apps, and click Add New App

    Select www as the platform

    Type a unique name for your app and click Create New Facebook App ID

    Specify a Category, and click Create App ID

    Click My Apps in the menu and select the app you just created

    Click Settings in the left navigation

    Click the Advanced Tab

    In the OAuth Settings section, add the following URLs in the Valid OAuth redirect URIs field:
        http://localhost:8100/oauthcallback.html (for access using ionic serve)
        https://www.facebook.com/connect/login_success.html (for access from Cordova)

    Click Save Changes


**Step 2**: Change `YOUR _APP_ID` to your application id, at the first line of `app.run`.

  `ngFB.init({appId: 'YOUR_APP_ID'});`
  
  
