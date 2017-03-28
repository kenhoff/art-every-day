# "Art Every Day" spec

## URLs

| Path                 | Authentication / Authorization states | View / Redirect           |
| -------------------- | ------------------------------------- | ------------------------- |
| `/`                  | unauthenticated                       | Dashboard                 |
| `/`                  | authenticated                         | Dashboard                 |
| `/create-account`    | unauthenticated                       | Create Account            |
| `/create-account`    | authenticated                         | redirect to `/`           |
| `/sign-in`           | unauthenticated                       | Sign In                   |
| `/sign-in`           | authenticated                         | redirect to `/`           |
| `/<date>`            | authenticated or unauthenticated      | Individual Day            |
| `/<username>`        | authenticated or unauthenticated      | Profile                   |
| `/<username>/edit`   | authenticated and authorized          | Profile Edit              |
| `/<username>/edit`   | unauthenticated or unauthorized       | redirect to `/<username>` |
| `/<username>/<date>` | authenticated or unauthenticated      | Individual Art            |
| `/forgot`            | authenticated                         | redirect to `/`           |
| `/forgot`            | unauthenticated                       | redirect to `/help`       |
| `/help`              | authenticated or unauthenticated      | Support                   |

## Views

### Landing Page View

![](spec-images/landing-page.jpg)

#### URL

`/` (unauthenticated)

#### React Components / Elements

-   [Navbar](#navbar)
-   ["Create Account" / "Sign In" buttons](#create-account--sign-in-buttons)
-   [Inspiration Image](#inspiration-image) with today's image
-   [Image grid](#image-grid), "individual day" version. (each photo links to `/<username>/<current-date>`)

--------------------------------------------------------------------------------

### Dashboard View

![](spec-images/dashboard.jpg)

#### URL

`/` (authenticated)

#### React Components / Elements

-   [Navbar](#navbar)
-   [Inspiration Image](#inspiration-image) with today's image

-   "Upload your creation" button (links to links to `/<username>/<current-date>`)
-   [Image grid](#image-grid), "individual day" version. (each photo links to `/<username>/<current-date>`)

--------------------------------------------------------------------------------

### Create Account View

![](spec-images/create-account.jpg)

#### URL

`/create-account` (unauthenticated)

#### React Components / Elements

-   [Navbar](#navbar)
-   Email input field (must be unique, validate eventually)
-   Password field (must be at least 8 characters, but I don't care what's in it)
-   Repeat password field (must match) (but we might not need that, with reset password flow)
-   Pick a username field (must be unique in the system - will have to check)
-   "Create account" button (grayed out until all fields are satisfied)

#### UI States

##### Blank

"Create Account" button grayed out

##### Partial

"Create Account" button grayed out

##### Ideal

All input fields filled in and validated

"Create Account" button active

##### Loading

Spinner next to email, username fields

"Create Account" button grayed out

##### Error

Red outline with error message next to email, password, or username fields

"Create Account" button grayed out

#### API Calls

-   `POST` to `/api/users`
    -   email
    -   password
    -   username

--------------------------------------------------------------------------------

### Sign In View

![](spec-images/sign-in.jpg)

#### URL

`/sign-in` (unauthenticated)

#### React Components / Elements

-   [Navbar](#navbar)
-   Email input field (must be validated)
-   Password input field
-   "Sign in" button
-   "Need to create an account" button (links to `/create-account`)
-   "Forgot password?" button (links to `/forgot`)

**TODO: blank, partial, ideal, loading, error states**

--------------------------------------------------------------------------------

### Support View

This is where we'll direct users for features that we haven't ended up building yet (password reset is the big one)

#### URL

`/help`

#### React Components / Elements

-   [Navbar](#navbar)
-   "Yikes! We haven't built that yet :("
-   "Need some help? Email ken@hoff.tech and he'll be able to help you out right away."

--------------------------------------------------------------------------------

### Individual Day View

![](spec-images/individual-day.jpg)

#### URL

`/<date>` (authenticated and unauthenticated)

#### React Components / Elements

-   [Navbar](#navbar)
-   [Inspiration Image](#inspiration-image) with the specified day's image
-   "Upload your creation" button - **only displays if user is authenticated** - (links to `/<username>/<current-date>`)
-   [Image grid](#image-grid), "individual day" version. (each photo links to `/<username>/<current-date>`) - alternate text depending on if it's "today" or "Jan 1st, 2017"

-   "Today's creations" with photo grid (each photo links to `/<username>/<current-date>`) -

**TODO: clean up the button state, and if that should be reused, or if we should just consider it a different view altogether - same thing with today's date**

--------------------------------------------------------------------------------

### Profile View

![](spec-images/profile.jpg)

#### URL

`/<username>` (authenticated and unauthenticated)

#### React Components / Elements

-   [Navbar](#navbar)
-   User's profile picture
-   Username
-   (if authenticated and authorized) button for "Edit" (links to `/<username>/edit`)
-   (if authenticated and authorized) button for "sign out" (links to `/sign-out`)
-   [Image grid](#image-grid), "individual user" version. (each photo links to `/<username>/<current-date>`)

**TODO: break this into two views, one with edit profile/sign out buttons and one without (authorized and unauthorized)**

--------------------------------------------------------------------------------

### Profile Edit View

![](spec-images/profile-edit.jpg)

#### URL

`/<username>/edit` (authenticated and authorized - otherwise, redirected to `/<username>`)

#### React Components / Elements

-   [Navbar](#navbar)
-   Username field (verify that it's unique, confirm change)
-   Photo upload/change form input
-   Email input field (need to re-auth) **TODO**
-   Change password input field (need to re-auth) **TODO**
-   Delete my account (includes confirmation - doesn't actually delete the account's data, just sets flag on user)

--------------------------------------------------------------------------------

### Individual Art View

![](spec-images/individual-art-authed-not-uploaded.jpg)
![](spec-images/individual-art-authed.jpg)
![](spec-images/individual-art-not-uploaded.jpg)
![](spec-images/individual-art-unauthed-not-uploaded-past.jpg)
![](spec-images/individual-art-unauthed.jpg)

#### App states

Ugh........this one sucks so much

-   authorized user vs unauthorized user
-   uploaded vs not uploaded yet
-   is current date vs is in the past

#### URL

`/<username>/<date>` (authenticated or unauthenticated)

#### React Components / Elements

-   [Navbar](#navbar)
-   User image component (links to image asset)
-   [Inspiration Image](#inspiration-image) with the specified day's image
-   User "card" component (links to `/<username>`)
-   Countdown indicating how much time a user has left to upload some art
-   Upload button for the user to upload an image

--------------------------------------------------------------------------------

### Upload View

--------------------------------------------------------------------------------

## React Components

### App

The main app wrapper, including most state information (user) and routing

When the App component mounts, it grabs information about the currently authenticated user and the browser's date.

#### State

-   **date**: (string), the browser's current date in `YYYY-MM-DD` format
-   **user**: (object), information about the currently authenticated user (via cookie/session). If there is no currently authenticated user, the app clears the cookie and refreshes the page (to force the landing page to show)

#### Children

-   [Navbar](#navbar)
-   Whatever view is currently displayed (Dashboard, Individual Day, Profile/Individual User, Profile Edit, Individual Art, etc)

--------------------------------------------------------------------------------

### Navbar

The little navbar that sits at the top of the page on every view

#### App states

**Unauthenticated**

![](spec-images/navbar-unauthenticated.jpg)

App name, "create account" button, "sign in" button, and link to support

**Authenticated**

![](spec-images/navbar-authenticated.jpg)

App name, user profile image, authenticated user's username, and link to support

#### Props

-   **user**: (string) username of signed in user, or `null` if no user is authenticated.

#### Children

-   App name (Art Every Day)
-   ["Create Account" / "Sign In" buttons](#create-account--sign-in-buttons)
-   Username of authenticated user (links to `/<username>`)
-   Profile image thumbnail of authenticated user (links to `/<username>`)
-   "help" support link (links to `/support`)

--------------------------------------------------------------------------------

### Image Grid

![](spec-images/image-grid.jpg)

#### Props

-   **date**: string in the format `YYYY-MM-DD`
-   **user**: username string

Must provide one or the other, but not both.

#### State

If **date** is in props:

Displays all of the images that have been uploaded for that single day

If **user** is in props

Displays all of the images that user has uploaded, ordered from most recent to least recent. If the user didn't upload an image for a certain day, just make that day transparent (but clickable).

#### Children

-   Flexbox grid, centered, responsive
-   Each photo links to `/<username>/<date>`

**TODO: UI states, (blank, loading, partial, error, ideal)**

--------------------------------------------------------------------------------

### "Create Account" / "Sign In" buttons

#### Children

-   Create Account button (links to `/create-account`)
-   Sign in button (links to `/sign-in`)

--------------------------------------------------------------------------------

### Inspiration Image

Displays inspiration image for current date or specified date

Links to `/<current-date>` or `/<specified-date>`

alternate text depending on if it's "today" or "Jan 1st, 2017"

#### Props

-   **date**: string in the format `YYYY-MM-DD`. Optional - defaults to the current date

#### State

#### Children

--------------------------------------------------------------------------------

### "Upload your art" call-to-action section

#### State

If the user hasn't uploaded art for the day yet:

Primary Button: "Upload your art" links to `/upload`

If the user has already uploaded art for the day:

Text with links: "You've already uploaded your art for today. You can [upload something different] (links to `/upload`), [see all of your art] (links to `/<username>`), or [check out what other artists have created today] (links to `/<current-date>`)."

--------------------------------------------------------------------------------

### Email Input

Part of the [Create Account](#create-account-view) form.

#### Children

-   "Email" label
-   Text input with type `email`
-   Error message - "Not a valid email" that shows onBlur

--------------------------------------------------------------------------------

### Password Input

Part of the [Create Account](#create-account-view) form.

#### Children

-   Two text inputs with type `password`
-   First with a label of "Password"
-   Error message on the first "Must be more than 8 characters" that shows onBlur
-   Second with a label of "Repeat Password"
-   Error message on the second "Passwords do not match" that shows onBlur

--------------------------------------------------------------------------------

### Username Input

Part of the [Create Account](#create-account-view) form.

#### Children

-   "Username" label
-   Text input with type `text`
-   Error message with "Username has already been taken" that shows onBlur

--------------------------------------------------------------------------------

### Create Account Button

Part of the [Create Account](#create-account-view) form.

#### Children

-   "Create Account" button that's grayed out / disabled if any of the form has an error state, or if any field is currently untouched / blank

--------------------------------------------------------------------------------

## API Routes

**Prefix:** `/api`

-   `/me`
    -   `GET`: returns information about currently authenticated user, or 401
    -   `POST`: updates the user?
-   `/users`
    -   `POST`: creates a new user
        -   email
        -   password
        -   username

--------------------------------------------------------------------------------

## Database Schema

-   `users`
    -   `id`: primary, increments
    -   `email`: string
    -   `password`: string (`bcrypt`ed)

--------------------------------------------------------------------------------

## Closing thoughts
