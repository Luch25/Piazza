# Piazza
Web Development Class assignment


First, run 
```shell
npm init
``` 
and install the necessary packages

```shell
$ npm install express nodemon mongoose body-parser dotenv joi bcryptjs jsonwebtoken
```

Of course, I have a .env file and a package-lock.json file & node_modules which I git ignored, but the package.json file has the updated npm start command which I felt the need to include, as well as the verisons of packages I used.

The only variables in my .env file were `DB_CONNECTOR`, which I used to attach to my MongoDB cluster, and `TOKEN_SECRET`, which was a random seed I used for my tokenization.

Otherwise, Everything is here!

Attached Below are my postman images along with descriptions of them.

![title](Images/1.png)
This is a register attempt, without a body, so it throws an error.

![title](Images/2.png)
This is a register attempt, without an accurate email, so it throws an error.

![title](Images/3.png)
This is a correct register attempt, so it returns the registry with the hashed password and a user_id

![title](Images/4.png)
This is an attempt to log in with an incorrect password, so it denies access.

![title](Images/5.png)
This is a correct login, so it returns an auth-token that is specially hashed using `TOKEN_SECRET`.

![title](Images/6.png)
This is a request for all posts, I only put a manually added one in at this point.

![title](Images/7.png)
This is an attempt to post with a bad auth-token, so they are rejected.

![title](Images/8.png)
This is an attempt to post without a body (not shown but it was empty), so they are told to fix.

![title](Images/9.png)
This is a correct post request, so it returns the post with it's id. Notice the created by uses the user_id given at registration.

![title](Images/10.png)
This is a correct update request (it works for title, description, or both). It has its own verification of body as well.

![title](Images/11.png)
This is an attempt to delete a post that does not exist.

![title](Images/12.png)
This is a correct deleted post.