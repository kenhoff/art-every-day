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

## Views

### Landing Page View

![](spec-images/landing-page.jpg)

#### URL

`/` (unauthenticated)

#### Components

-   [Navbar component](#navbar-component)
-   "create account" and "sign in" buttons (link to `/create-account` and `/sign-in`)
-   "Today's inspiration" with today's image (links to `/<current-date>`)
-   "Today's creations" with photo grid (each photo links to `/<username>/<current-date>`)

--------------------------------------------------------------------------------

### Dashboard View

![](spec-images/dashboard.jpg)

#### URL

`/` (authenticated)

#### Components

-   [Navbar component](#navbar-component)
-   "Today's inspiration" with today's image (links to `/<current-date>`)
-   "Upload your creation" button (links to links to `/<username>/<current-date>`)
-   "Today's creations" with photo grid (each photo links to `/<username>/<current-date>`)

--------------------------------------------------------------------------------

### Create Account View

![](spec-images/create-account.jpg)

#### URL

`/create-account` (unauthenticated)

#### Components

-   [Navbar component](#navbar-component)
-   Email input field (must be validated)
-   Password field (must be at least 8 characters, but I don't care what's in it)
-   Repeat password field (must match) (but we might not need that, with reset password flow)
-   Pick a username field (must be unique in the system - will have to check)
-   "Create account" button (grayed out until all fields are satisfied)

--------------------------------------------------------------------------------

### Sign In View

![](spec-images/sign-in.jpg)

#### URL

`/sign-in` (unauthenticated)

#### Components

-   [Navbar component](#navbar-component)
-   Email input field (must be validated)
-   Password input field
-   "Sign in" button
-   "Need to create an account" button (links to `/create-account`)
-   "Forgot password?" button (links to `/forgot`)

**TODO: blank, partial, ideal, loading, error states**

--------------------------------------------------------------------------------

### Individual Day View

![](spec-images/individual-day.jpg)

#### URL

`/<date>` (authenticated and unauthenticated)

#### Components

-   [Navbar component](#navbar-component)
-   "Today's inspiration" with today's image (links to `/<current-date>`) - alternate text depending on if it's "today" or "Jan 1st, 2017"
-   "Upload your creation" button - **only displays if user is authenticated** - (links to `/<username>/<current-date>`)
-   "Today's creations" with photo grid (each photo links to `/<username>/<current-date>`) - alternate text depending on if it's "today" or "Jan 1st, 2017"

**TODO: clean up the button state, and if that should be reused, or if we should just consider it a different view altogether - same thing with today's date**

--------------------------------------------------------------------------------

### Profile View

![](spec-images/profile.jpg)

#### URL

`/<username>` (authenticated and unauthenticated)

#### Components

-   [Navbar component](#navbar-component)
-   User's profile picture
-   Username
-   (if authenticated and authorized) button for "Edit" (links to `/<username>/edit`)
-   (if authenticated and authorized) button for "sign out" (links to `/sign-out`)
-   Photo grid component

**TODO: break this into two views, one with edit profile/sign out buttons and one without (authorized and unauthorized)**

--------------------------------------------------------------------------------

### Profile Edit View

![](spec-images/profile-edit.jpg)

#### URL

`/<username>/edit` (authenticated and authorized - otherwise, redirected to `/<username>`)

#### Components

-   [Navbar component](#navbar-component)
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

#### Components

-   [Navbar component](#navbar-component)
-   User image component (links to image asset)
-   Inspiration image component (links to `/<date>`)
-   User "card" component (links to `/<username>`)
-   Countdown indicating how much time a user has left to upload some art
-   Upload button for the user to upload an image

--------------------------------------------------------------------------------

## Components

### Navbar Component

--------------------------------------------------------------------------------

### Image Grid Component

--------------------------------------------------------------------------------

## Closing thoughts
