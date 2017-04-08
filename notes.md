how should I go about validating an email and username asynchronously?

for the login page, it's easy - if the form gets submitted, and a 401 gets returned, then the username or password is incorrect.

for the signup page, i _could_ hypothetically send back validation information. that would probably be appropriate, but that's kind of at a level in passport that I'm not sure that I control.

regardless, the way it's set up right now, validation only happens when the user submits the form. so I _could_ just set the error messages there, if there are any.

A couple things would happen:

-   user submits form
-   server checks if email is unique
-   server checks if username is unique
-	if they're both unique, then user is created as normal
-	if either of them are **not** unique, then set an error message and send a 400
-	on the client side, after the user gets a response back, if the response is 201, sign in the user and continue as normal
-	if the response is 400, set the errors and don't redirect
