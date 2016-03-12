---
layout: post
title: "Metis-Fourth Project: Recommending Anime Through Natural Language Processing of Descriptions"
description: Outline of my Fourth Metis Project
headline:
modified: 2016-03-04
category: Data Science
tags: [datascience, data science, metis, project, nlp, nltk, kmeans, clustering, anime, recommender, recommendation]
imagefeature:
mathjax:
chart:
comments: true
featured: true
---

I decided to do something a bit more fun for my fourth project at Metis. I've always been a huge fan of anime. It started when I was five with Pokémon and Sailor Moon. By the time I was nine I was setting an alarm so I could wake up at 1AM to watch Yu Yu Hakusho, Cowboy Bebop, Trigun and Lupin III. So when it came to deciding what I should apply NLP techniques to I decided to make something that would help me to discover anime I hadn't watched before.

<div align="center">
    <img src="/assets/metis_fourth_project/umaru.gif">
    <p>Me watching anime.</p>
</div>

I created an <a href="https://anime-recommender.herokuapp.com/">**Anime Recommender**</a> (also shown at the bottom of this page). I scraped anime from <a href="http://myanimelist.net/">MyAnimeList</a> (MAL) using their <a href="http://myanimelist.net/modules.php?go=api">API</a>. Firstly, if you are interested in anime more than the techniques I used I must tell you that it does not dynamically pull anime info from MAL, nor does the internal models have data on anime created after ~2014 (I was on a time crunch and to save time on writing a scraper for MAL's full list of anime, I used a previously scraped list found on <a href="https://www.reddit.com/r/anime/comments/2meyo4/myanimelist_data_analysis/">Reddit</a>).

<div align="center">
    <img src="/assets/metis_fourth_project/edatcomputer.gif">
    <p>Me going to work.</p>
</div>

After scraping the information from MAL, I cleaned it up using NLTK. I tokenized the anime descriptions, lemmatized each word, removed stop words and applied a tf-idf vectorizer to this data. The vectorizer used a max document frequency of 0.2 and a min document frequency of 0.01 and n-grams of size 1-3. With just under 9000 anime this meant that words had to appear in between 90 and 360 of the anime. This may seem low but with <a href="http://myanimelist.net/anime.php">all the diversity</a> in anime it seemed like a good range to choose from. Then I clustered the data by K-means. I came to find many stop words specific just to anime, such as 'special', 'edition', 'aired', 'based', and 'manga'. I removed nearly 100 of these and cut out descriptions that were less than 25 words (due to many synopses only describing when they aired or what they were adapted from). This cut my anime down to about two-thirds of what it previoiusly was.

I examined the total inertias of different cluster sizes (shown below) and was unable to find a definitive cluster to use for analysis. I arbitrarily chose a cluster size of 9 after failing to apply gap statistics to the data.

<div align="center">
    <img src="/assets/metis_fourth_project/inertias.png">
</div>

The top words in each of the 9 clusters are as follows:

    0. earth, space, planet, alien, pilot
    1. father, family, mother, live, life
    2. world, mysterious, girl, know, power
    3. school, high, high school, student, girls
    4. love, girl, fall love, fall, day
    5. make, girl, work, come, time
    6. music, song, single, band, produce
    7. power, war, fight, city, battle
    8. team, match, play, girls, join

I then began programming the app to allow people to find the most similar anime to selected anime. Using a [guide](http://brandonrose.org/clustering) I created a MPLD3 plot of the multidimensional scalability of the cosine distances between the data points. Because this is a very slow process with large data, I set the maximum number of recommendations to 20. I also gave the user the option to get the nearest neighbors overall, or just from members of their own cluster. I did this because the anime on the edge of a cluster may have more in common with those in a neighboring cluster than those in their own cluster, and vice-versa.

After this a programmed a tabular output of the results so that the user can see stats on the anime selected, the full synopsis, and also be linked back to the anime's page on MAL.

<div align="center">
    <img src="/assets/metis_fourth_project/girlasleepatcomputer.gif">
    <p>After a hard days work.</p>
</div>

Overall I am very satisfied with the results that I obtained. It is not perfect for all anime but it is great for others. Sports anime, for example, always seems to offer up other sports animes.

Unfortunately my app and the analysis falls short in a lot of places:

* As I said previously, the app does not update dynamically. It would be nice to get new updates from anime as people search them or to run periodic searches of all anime. Unfortunately that wouldn't have fit into my time constraint and was a little beyond my expertise.
* Even if I did update it dynamically, MAL's API is not the greatest (though I have read they are working on it) and does not pull out all of the information I would want (such as genre and content rating).
* Because I can't filter by content rating, the app currently doesn't have a way to filter out the porn...
* Currently the app is running off of a free account on Heroku, which means if you access the app for the first time in 30 minutes, it has to reboot. The boot time is slow, about 15 seconds because it has to unpickle some large files.
* Heroku also wasn't the most ideal to host because I had to remove all of the NLTK processes due to the large size of the NLTK corpora. If I were to add dynamic updates, I would have to change how I host it.
* Searching on the app can only currently be done by with the default title listed on MAL but it would be nice to add a way to search by the English names.
* Due to my own shortsightedness I missed a great opportunity to include American TV shows in the clustering. It would be a great way to introduce people who have never watched anime to the medium.

If I revisit this project in the future I would start with the above problems.

In the meantime I hope you enjoy this project and feel free to poke around it on [Github](https://github.com/kennmyers/Metis-Projects/tree/master/fletcher/anime_clusterer)!


<iframe
 src="https://anime-recommender.herokuapp.com/"
 width="100%" height="800">
  <p>
    <a href="https://anime-recommender.herokuapp.com">
      Fallback link for browsers that, unlikely, don't support frames
    </a>
  </p>
</iframe>
