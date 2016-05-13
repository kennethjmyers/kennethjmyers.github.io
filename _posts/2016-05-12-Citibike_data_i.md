---
layout: post
title: "How are New Yorkers Utilizing Citibikes?"
author: Kenneth Myers
description: Diving into the Citibike data.
headline:
modified: 2016-05-12
category: Data Science
tags: [datascience, data science, data, citibike, nyc, ny, new york, bikes]
imagefeature:
mathjax:
chart:
comments: true
featured: true
---

<link rel="stylesheet" href="https://cdn.pydata.org/bokeh/release/bokeh-0.11.1.min.css" type="text/css" />

<script type="text/javascript" src="https://cdn.pydata.org/bokeh/release/bokeh-0.11.1.min.js"></script>
<script type="text/javascript">
    Bokeh.set_log_level("info");
</script>

New York's Citi Bikes make up the largest bike share program in the country. It began three years ago in May 2013 and currently consists of a fleet of 6,000 bikes, which the city plans to double by next year. Citi Bike's data is [publicly available](https://www.citibikenyc.com/system-data) and I was curious what I could extract from it. At first I wanted to examine the tourists' use of the Citi Bikes but couldn't find much that was interesting or other datasets that would make my findings more useful. So I pivoted and decided to look at how residents (including the permanent residents *and* tourists) utilized the bike stations in their area.

I looked at data from April 2015-March 2016 and it included over a million recorded trips. I narrowed data to only trips that started in the morning (between 5am-11:59:59am) when most people would be commuting so that I could reduce the trips of people returning from work in the evening (I considered this duplicate data and not representative of true departures from people's local bike stations). This cut the data down to just over 800k records.

From here I used the Google Maps API to search for the location of each bike station in order to get the zip code of each station. I did this because it reduces the number of locations from over 500 stations to just over 40 zip codes (a much easier number to look at on a chart and also to makes it easier to generalize locations that people live).

Below shows the movement from and two different zip codes in the morning. It may not be apparent right now why this is useful, but it will be meaningful later on.  

<div class="plotdiv" id="28a194ae-ae07-4768-8582-4b46d0dccb9d"></div>

<div class="plotdiv" id="12d96d0a-2e72-4be3-934f-ff7780b6e622"></div>

<div class="plotdiv" id="b348163b-35d6-46ad-b3ad-509154e18d50"></div>



<script type="text/javascript" src="assets/citibike_i/fig1.js"></script>
<script type="text/javascript" src="assets/citibike_i/fig2.js"></script>
<script type="text/javascript" src="assets/citibike_i/fig3.js"></script>
