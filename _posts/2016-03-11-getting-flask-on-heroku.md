---
layout: post
title: "How To Get A Flask App On Heroku"
description:
headline:
modified: 2016-03-11
category: Tutorial
tags: [heroku, flask, datascience, data science, metis]
imagefeature: heroku_guide/heroku_logo.png
mathjax:
chart:
comments: true
featured: true
---

I spent this entire past weekend trying to get my latest project onto Heroku. I found the tutorial Heroku provides wasn't clear or, perhaps, not concise enough for me to get my app onto their site. I encountered one issue after another, most of which involved a shortage of file space or packages not installing. I hope that this guide will help people to save some time and avoid the issues that I had.

1. First, if you haven't done so already, create an account at [Heroku](https://heroku.com).

2. Next download and install the [Heroku Toolbelt](https://toolbelt.heroku.com/). This will add the Heroku commands for your terminal.

3. Type ```$ heroku login``` into the terminal and enter your information you used to sign up. If you are having firewall issues and/or can't connect [see this](https://devcenter.heroku.com/articles/using-the-cli#using-an-http-proxy).

4. Now go to your repo where the Flask app is contained. If your app uses NLTK you may want to make a copy of the repo and work on that (you may need to make a bunch of changes to your app if you're using NLTK, or use another hosting service).

5. If you do not already have git set up in the repository, initialize git with ```$ git init``` . Make sure the '.git' folder is located in the same directory as your Flask app.

6. Type ```$ heroku create``` . This will create a repo for your app on your Heroku account and add a remote connection from your local repo to Heroku. To see this type ```$ git remote -v``` .

7. Make sure that in your ```flask_app.py``` file (the one that executes the app) this is at the bottom instead of whatever you might have used earlier:

        
        if __name__ == '__main__':
            app.debug = True
            port = int(os.environ.get("PORT", 5000))
            app.run(host='0.0.0.0', port=port)
        

8. Next you will add some crucial files to your repo:
    
    - **Procfile** : name this file exactly like this, WITHOUT any '.txt' extension. Inside you should have:
  

        web: python flask_app.py

    
    You should replace flask_app.py with the name of your flask app. Note that I dont have gunicorn because I don't use that as the webserver and am not familiar with it.
   
    - **requirements.txt** : This file and the following two HAVE the '.txt' extension. In this file you will list the packages that pip should install for you. Most tutorials recommend that you should do ```$ pip freeze > requirements.txt``` but I think you should only do this if you are working on a virtual environment that only has the necessary packages installed. Otherwise that command will add every package you have installed which will rapidly take up your apps size. For mine I only added the packages that I knew were necessary and pip took care of their dependencies. Here's an example:
  
        
                Flask==0.10.1
                Jinja2==2.8
                matplotlib==1.5.1
                mpld3==0.2
       
    
    - **runtime.txt** : This file is necessary if you use a python installation that is NOT 2.7.X (3.5.1 for example). Inside you would write:
    
    
        python-3.5.1
    
    
    - **conda-requirements.txt** : In this file you list packages that require non-python dependencies (for excample C/C++). If later you find that you are going over your build size when you try pushing, look to see if Heroku is trying to build ```MKL``` . MKL is an Intel package that speeds up numpy/scipy computations. However, the file size is relatively huge and it is not completely necessary to run an app. If you need, add ```nomkl``` to this file. Here's an example:
    
        
        nomkl
        numpy
        pandas
        scipy
        scikit-learn

    
9. Now you've got all the necessary files. However, there are still a few things you have to do before you're app will build. You have to add the build packs:
    
    - [The Python Buildpack](https://github.com/heroku/heroku-buildpack-python) : This will set the current buildpack to python and ensure that the it builds properly.


        $ heroku buildpacks:set heroku/python

        
    - The Conda Buildpack [2.7.X](https://github.com/kennethreitz/conda-buildpack) \| [3.5.X](https://github.com/buildingspeak/conda-buildpack) : I use python 3.5 and I used the 3.5.X buildpack linked above and it worked for me. A friend who uses 2.7.X used its respective pack and it worked for him.
    
    __3.5.X__ 
    

        $ heroku config:add BUILDPACK_URL=https://github.com/buildingspeak/conda-buildpack.git

        
    __2.7.X__
    

        $ heroku config:add BUILDPACK_URL=https://github.com/kennethreitz/conda-buildpack.git

        
    - Also, I do not recall if this is necessary but both and me and my friend added this to the apps config variables and it didn't break anything (as far as we can tell) :
    
        
        $ heroku config:add LD_LIBRARY_PATH=/app/.heroku/vendor/lib/atlas-base/atlas:/app/.heroku/vendor/lib/atlas-base:/app/.heroku/vendor/lib/
        
        
    If anything it seems to be adding the path to Atlas, the alternative to MKL that I removed earlier in the 'conda-requirements.txt' step.
    
10. You're almost there! Do the following:


        $ git add .
        $ git commit -m 'some message'
        $ git push heroku master

    
    Watch it build the 'slug' and make sure there aren't any errors. As I said before, I had many problems at this step. You may find that you need to clear your Heroku cache which can be done if you add the [Heroku repo plugin](https://github.com/heroku/heroku-repo#purge_cache). I also said before that I could not get NLTK to work. This is because NLTK's corpora is enormous, over 2GB. I had read of a [solution to add the TextBlob corpora](https://github.com/sloria/TextBlob/issues/59) using the ```post-compile``` method but when I tried to apply this to NLTK, it still didn't work (it still tried to include it in the slug). The only solution for me was to load pickles of my preprocessing into my app but another alternative would be to put everything on AWS (a project for another day).
    
11. Once it has built properly, deploy the app:


        $ heroku ps:scale web=1
        $ heroku open

    
12. That's it! If for some reason it won't load, type ```$ heroku logs``` to see where the error occured. One last useful command is ```$ heroku ps``` to check the status of the dyno. 


If you get any other errors then either this tutorial has gotten out of date or they might be more specific to your own code. Good luck!
  
  
  
  





