# CS 307 Project
Created by Team 4

## Getting Started
To deploy new changes to the Heroku frontend site:
1. Clone frontend repository from git
2. Make and test changes locally
3. Commit and push new changes to backend repo
4. Login to Heroku by running
'''
heroku login
'''
and following the instructions in the terminal. The email address is gilber61@purdue.edu, and the password is cs307CIRCLE
5. Add Heroku remote frontend app to the local frontend repo by running
'''
heroku git:remote -a cs307circle-frontend
'''
6. Push changes to Heroku frontend app by running
'''
git push heroku master
'''
7. Test changes on Heroku frontend app by running
''
heroku open
'''
or going to https://cs307circle-frontend.herokuapp.com/
