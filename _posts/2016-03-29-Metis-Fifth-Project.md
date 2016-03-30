---
layout: post
title: "Solving 4x4 KenKen Puzzles with Computer Vision"
author: Kenneth Myers
description: Outline of my Fifth Metis Project
headline:
modified: 2016-03-29
category: Data Science
tags: [datascience, data science, metis, computer vision, tensor flow, tensorflow, skimage, sci-kit image, cv, kenken]
imagefeature:
mathjax:
chart:
comments: true
featured: true
---


In one of my previous posts I talked about my interest in computer vision. It was a no brainer for me to explore that in my latest Metis project since I didn't get a chance previously to apply deep learning. I wanted to do something that was challenging but not beyond my skills for a first project. As I was browsing [college websites](https://sites.google.com/a/eng.ucsd.edu/cse-155-spring-2012/home/projects/suggested-research-projects) for ideas I found a [blog post](http://sudokugrab.blogspot.com/2009/07/how-does-it-all-work.html) which described the process of solving Sudoku puzzles with computer vision. It seemed a bit too easy and seemed to have been done by many in the past so I wanted to do something more difficult and original. I resolved to solve KenKen puzzles instead (totally and completely not because my name is also in the name of the puzzle).

For those unfamiliar with KenKens, they are puzzles originally created in [2004 by Tetsuya Miyamoto](https://en.wikipedia.org/wiki/KenKen). They are similar to Sudoku in that they involve an nxn grid and only unique numbers from 1 to n can exist in any single row and column but differ in having 'cages'. The cagings are groupings of cells that must also satisfy a mathematical operations.

<div align="center">
    <img style="max-height:400px;max-width:400px;" src="/assets/metis_fifth_project/kenken_example.png">
    <p style="font-style:italic;font-size:.8em;">Example of a 9x9 KenKen puzzle from <a href="http://www.kenkenpuzzle.com/">KenKenPuzzle.com</a></p>
</div>


<h2>Creating a KenKen Solver</h2>
I approached this project in 4 parts:

1. Finding groupings of connected boxes making up a mathematical operation (cages).
2. Isolating numbers and math symbols in the image and using a neural net to read what those characters are.
3. Using an algorithm to solve the puzzle.
4. Creating an application with Flask for visual demonstrations.

<h3>Finding Cages</h3>

To identify the cages I needed to remove the thinner lines that separate cells that are meaningless to cages. To do this I removed all of the numbers and symbols from each page and used dilation methods from sci-kit image to wash out the thinner lines. This is, in my opinion, the most limiting aspect of solving a puzzle because it depends on the meaningless lines being thin enough to be washed out and the cage lines being thick enough to withstand dilation. Possible solutions to this would be to use different dilation sizes and seeing which one produces a solution. However, this would be slow, especially for larger puzzles because it would require running over the entire code multiple times over.

After the dilations, I run an algorithm that groups the cells by their cages and assigns a label to each cage. This is done by starting at the midpoint of a cell and recursively finding paths to other cells and finding which paths are blocked and which aren't. Unblocked paths are part of the same cage.

<div align="center">
    <img src="/assets/metis_fifth_project/find_cages.png">
    <p style="font-style:italic;font-size:.8em;">Steps to find cages. L: Original KenKen Puzzle. M: Removal of number operations and meaningless lines. R: Labeling of cages.</p>
</div>

<h3>Reading Math Operations</h3>

The next problem was reading the numbers and and symbols. It would have been nice to just use the MNIST dataset to predict all of the numbers and symbols but unfortunately the MNIST data doesn't include pictures of symbols. Instead I collected 10-30 samples of each number and symbol from real puzzles and applied a number of transformations to each sample. In the end I had about 15,000 sample images to use in training and testing a model. I used a LeNet architecture for my neural net.

In the puzzle image that is being read, I loop over each cell and isolate the top half of the cell. I then find the contours of each image, removing contours that are within contours, and get a bounding box of the contours. Because division signs appear as three separate images, I also merged contours that shared a horizontal midpoint (give or take a few pixels). Then, each of these sub-images are fed to the neural network to get a prediction of the character.

<div align="center">
    <img style="height:200px;width:300px;" src="/assets/metis_fifth_project/bboxes.png">
    <p style="font-style:italic;font-size:.8em;">Example of finding the bounding boxes of numbers and symbols.</p>
</div>

<div align="center">
    <img style="height:300px;width:400px;" src="/assets/metis_fifth_project/predictions.png">
    <p style="font-style:italic;font-size:.8em;">Images of each cell from the original puzzle image with character predictions annotated.</p>
</div>

<h3>Solving the Puzzle</h3>
Now I knew what cells were in which cages and what operations were in which cells. Transitively I know what operations are in each cage. I found an algorithm for solving KenKen puzzles on [Reddit](https://www.reddit.com/r/dailyprogrammer/comments/3snorf/20151113_challenge_240_hard_kenken_solver/) and so I converted this information into the necessary format. Lastly, I annotated the solution to the original image for a final product.

<div align="center">
    <img style="height:300px;width:300px;" src="/assets/metis_fifth_project/solution.png">
    <p style="font-style:italic;font-size:.8em;">Final solution to the original KenKen Puzzle.</p>
</div>

<h3>Web App</h3>
The only thing left to do was creating the web application. This may have been the most frustrating thing as I am not much of a web developer. The final product incorporates various javascript and jquery as well as the libraries Bootstrap, Dropzone, and Cropper. I had many difficulties getting the final image to dynamically update in the output box but eventually succeeded. It's not perfect but it will do for now. The first thing I would need to change in the future is to not hard save the inputed image. Right now I think the app may only be usable by one person at a time because the puzzle gets saved to 'puzzle.jpg' each time so multiple people using it may get different results (or I just don't understand how web serving works which is entirely possible).

The web app can be found below or at [this link](http://kenkensolver.herokuapp.com/). Some limitations to keep in mind is that it only works on 4x4 puzzles. I would have liked to make it for any sized puzzle but due to time crunches I could only make an MVP. Also, I have not tested this on camera images but I expect it could work depending on the lighting and if the angle is perpendicular (there is no polygon correction in my code).

Overall I think it was a good project. It may seem simple but a lot of work did go into it. Thanks for reading this and checking out the project! If you would like to learn more, check it out on [Github](https://github.com/kennmyers/Metis-Projects/tree/master/kojak/kenken_solver).



<iframe
 src="https://kenkensolver.herokuapp.com/"
 width="100%" height="800">
  <p>
    <a href="https://kenkensolver.herokuapp.com/">
      Fallback link for browsers that, unlikely, don't support frames
    </a>
  </p>
</iframe>
