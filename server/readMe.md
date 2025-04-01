This version of the accounts feature implements all the endpoints needed for the accounts and sufficient for testing the front end.

In order to use this branch for testing the front end:

1. run `node seedUser.js` on terminal to create the user on the database
2. change the id on mockAuthMiddleware.js line 7 with the user id generated for the created user in the database. This will bypass the authentication step and you can continue with using the endpoints.
3. run `npm run dev` on terminal
4. use the endpoints. the urls and json data for endpoints are provided in the account_routes.js file above each route as a comment.

What to do next:

1. Incorporate the Plaid application to link the accounts
2. Merge with authenticate feature (user login and signup)
3. check the authentication of the user who are trying to access/edit the accounts
4. include encryption? with bcrypt and use jwt token for auth
5. update the middleware after the merge to the authentication feature
6. remove seedUser and user models which injected a user data to the database to enable
