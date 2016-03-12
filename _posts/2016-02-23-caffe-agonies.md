---
layout: post
title: "Caffe Agonies"
description: Setting up Caffe for a Python kernel in Jupyter.
headline:
modified: 2016-02-23
category: Libraries
tags: [datascience, data science, metis, caffe, installation, jupyter, ipython, kernel, python]
imagefeature:
mathjax:
chart:
comments: true
featured: true
---


The area of data science that interests me the most is computer vision. I've wanted to study computer vision for a while and felt that doing Metis would be a best ways of kickstarting me towards a CV program at a university and an alternative to immediately going back to school. Hoping to incorporate CV into my final project here at Metis, I decided I would spend the weekend trying to install Caffe<sup>4</sup>.

It was a nightmare.

When looking into which deep learning framework to go with I saw mostly two opinions: OpenCV is difficult to install, and Caffe is extremely popular right now. Unfortunately the comments I read raving about Caffe must have forgotten to include how difficult it is to install.

During my trials and tribulations I encountered a number of problems:
 1. Little support is provided for setting up Caffe with Python3. Too bad for me who has been working on Python3 for everything.
 2. After trying without luck to set up Caffe with Python3, i decided to call it quits and try to set it up with Python2. I got pretty far but then kept getting a segmentation fault error that refused to go away. I almost called it quits.
 3. I uninstalled and reinstalled Anaconda, installed py27 and py35 kernels and then, following the available tutorials out there, tried linking Caffe to the python that came with the computer. This finally worked! But for \*.py files only. Anytime I tried to import into a Jupyter notebook, the kernel would die. This was discouraging and I could not find a SINGLE explanation of this anywhere. No one else seemed to be having problems like this and I linked Caffe to my original python installation like the tutorials did. After two days and barely any sleep, I was ready to give up.

But then...

I gave it one last shot. One final attempt at linking Caffe to Python. I reasoned that if I couldn't import it into Jupyter then it probably needed to be linked to the kernel in Anaconda. I adjusted my Makefile.config file as follows and within 5 minutes I had it working:

        #USE_CUDNN := 1
        CUDA_DIR := /usr/local/cuda
        CUDA_ARCH := -gencode arch=compute_20,code=sm_20 \
                        -gencode arch=compute_20,code=sm_21 \
                        -gencode arch=compute_30,code=sm_30 \
                        -gencode arch=compute_35,code=sm_35 \
                        -gencode arch=compute_50,code=sm_50 \
                        -gencode arch=compute_50,code=compute_50
        CPU_ONLY := 1
        BLAS := open
        BLAS_INCLUDE := /usr/local/Cellar/openblas/0.2.15/include
        BLAS_LIB := /usr/local/Cellar/openblas/0.2.15/lib
        PYTHON_INCLUDE := /Users/kenn/anaconda/envs/py27/include/python2.7 \
                            /Users/kenn/anaconda/envs/py27/lib/python2.7/site-packages/numpy/core/include
        #/usr/include/python2.7 \
        #/usr/local/Cellar/numpy/1.10.4/lib/python2.7/site-packages/numpy/core/include
        PYTHON_LIB := /Users/kenn/anaconda/envs/py27/lib
        #/usr/local/Cellar/python/2.7.11/Frameworks/Python.framework/Versions/2.7/lib
        #PYTHON_INCLUDE += $(dir $(shell python -c 'import numpy.core; print(numpy.core.__file__)'))/include
        #PYTHON_LIB += $(shell brew --prefix numpy)/lib
        WITH_PYTHON_LAYER := 1
        INCLUDE_DIRS := $(PYTHON_INCLUDE) /Users/kenn/anaconda/envs/py27/include /usr/local/include
        LIBRARY_DIRS := $(PYTHON_LIB) /Users/kenn/anaconda/envs/py27/lib /usr/lib /usr/local/lib
        BUILD_DIR := build
        DISTRIBUTE_DIR := distribute
        TEST_GPUID := 0
        Q ?= @

It was quite the journey but it was finally over. Caffe was installed and I felt almost an expert on installing it.

Big thank you to all the blogs I read<sup>2,3,4</sup> that helped me up till the point I got stuck. Hopefully this helps anyone else who gets stuck on getting Caffe to work in Jupyter or iPython.


###### Resources:
 1. [Caffe](http://caffe.berkeleyvision.org/)
 2. [Christopher Bourez's blog](http://christopher5106.github.io/big/data/2015/07/16/deep-learning-install-caffe-cudnn-cuda-for-digits-python-on-mac-osx.html)
 3. [Hoondy](http://hoondy.com/2015/04/03/how-to-install-caffe-on-mac-os-x-10-10-for-dummies-like-me/)
 4. [This post](https://github.com/rainyear/lolita/issues/10)
