---
layout: post
title: "How are New Yorkers Utilizing Citi Bikes?"
author: Kenneth Myers
description: Diving into the Citi Bike data.
headline:
modified: 2016-05-12
category: Data Science
tags: [datascience, data science, data, citibike, citi bike, nyc, ny, new york, bikes]
imagefeature:
mathjax:
chart:
comments: true
featured: true
---

New York's Citi Bikes make up the largest bike share program in the country. It began three years ago in May 2013 and currently consists of a fleet of 6,000 bikes, which the city plans to double by next year. Citi Bike's data is [publicly available](https://www.citibikenyc.com/system-data) and I was curious what I could extract from it. I wanted to see how balanced the use of the stations were and decided to look at how residents (including the permanent residents *and* tourists) utilized the bike stations in their local area.

Ideally we would want to see that the relative use of bikes is balanced across all areas. But, in the event that they are unbalanced, how could we redistribute the bike stations.

### The Data

I looked at data from April 2015-March 2016 and it included over a million recorded trips. I narrowed data to only trips that started in the morning (between 5am-11:59:59am) when most people would be commuting so that I could reduce the trips of people returning from work in the evening (I considered this duplicate data and not representative of true departures from one's local bike stations). This cut the data down to just over 800k records.

From here I used the Google Maps API to search for the location of each bike station in order to get the zip code of each station. I did this because it reduces the number of locations from over 500 stations to just over 40 zip codes (a much easier number to look at on a chart and also makes it easier to generalize locations that people live).

Below shows the movement from and to zip codes in the morning. Right now it may not be apparent why this is useful, it is not normalized across zip codes and doesn't tell us how balanced an area is, but it will be meaningful later on.  

<iframe frameBorder="0"
 src="/assets/citibike_i/fig1.html"
 width="850px" height="550px">
  <p>
    <a href="/assets/citibike_i/fig1.html">
      Fallback link for browsers that, unlikely, don't support frames
    </a>
  </p>
</iframe>
<div style="text-align:center;margin-top:-40px;">
    <p style="font-size:.8em">This graph shows the total number of departures from and arrivals at each zip code between April 2015 and March 2016. (Hint: you can use the tools to zoom in mouse over the data for values)</p>
    <br>
</div>

<div style="text-align:center">
    <img style="width:110px;display:inline" src='/assets/citibike_i/top10departurezips.png'>
    <img style="width:110px;display:inline" src='/assets/citibike_i/top10arrivalzips.png'>
    <br>
    <p style="font-size:.8em">Listed here are the top 10 zip codes for departures(left) and arrivals(right) between 5am and 11:59:59am.</p>
</div>

Next I merged the Citi bike data with 2010 census data which had the populations of each zip code. I then estimated the number of rides per day at a station in a zip code (rides/day/station) and divided it by the population of that zip code to create a normalized value across the different zip codes (rides/day/station/capita = **RDSC**). The results of this, along with the number of stations in each zip code can be found in the accompanying chart.

<iframe frameBorder="0"
 src="/assets/citibike_i/fig2.html"
 width="850px" height="550px">
  <p>
    <a href="/assets/citibike_i/fig2.html">
      Fallback link for browsers that, unlikely, don't support frames
    </a>
  </p>
</iframe>
<div style="text-align:center;margin-top:-40px;">
    <p style="font-size:.8em">The rides/day/station/capita (RDSC) for each zip code along with the number of Citi Bike stations in that zip code. Averages for RDSC and # of stations are also shown to give a better idea of what the upper and lower halves look like. **Note:** Data points may be hidden by the legend so try panning the chart to see everything.</p>
    <br>
</div>

I figured someone might be interested in the same graph as above but with rides/day/capita (**RDC**) rather than RDSC (in case you wanted to look at many rides an area uses per day, regardless of the number of stations there).

<iframe frameBorder="0"
 src="/assets/citibike_i/fig3.html"
 width="850px" height="550px">
  <p>
    <a href="/assets/citibike_i/fig3.html">
      Fallback link for browsers that, unlikely, don't support frames
    </a>
  </p>
</iframe>
<div style="text-align:center;margin-top:-40px;">
    <p style="font-size:.8em">The rides/day/capita (RDC) for each zip code along with the number of Citi Bike stations in that zip code. Again the averages are shown for RDC and # of stations.</p>
    <br>
</div>

### What does any of this mean?

These results were more interesting than I expected. We see some areas like 10282 (an area near the WTC) that get a lot of use out of their available bike stations (2 total) or 10018 which gets a lot of use based on the number of people there. However, there are other zip codes like 11201 (located in Brooklyn) which has the most stations at 32 and very low RDSC. Comparing this with the earlier data, we see that 11201 isn't even in the top 10 places to depart from or arrive at. **So why does it have the most bike stations?**

I also want to point out that areas with high RDSC (high usage per station) also tend to be on the lower end of the amount of stations (ex: 10282, 10018, 10280, 10006, 10069, 10004). This is indicative of areas that could use more stations/bikes. This is less apparent for high RDC and for both lower RDSC and RDC the number of stations appears more random.

We do not have a baseline of what constitutes a surplus or deficit of bikes at a location (it is not possible to obtain that from this data, at least not without knowing how many bikes are at a location to start). Because of this we cannot say for certain that there is a deficit of bikes at 10282 or a surplus at 10211, despite what RDSC may suggest. Instead, what we are seeing is where stations are being utilized significantly  and places where they are underutilized.

Two immediate reactions to these findings come to mind:

1. Either more promotion needs to be done in the underutilized areas to get people using the bikes, or
2. Less bike stations are needed in these areas and they can be moved more popular areas.

While it would appear that either of these would be good actions to take, the second option is better because most people in the city are already aware of the bikes.  To support this, we should look for more data:

1. As stated before, where are the true deficits and surpluses? Could we poll people for that, or perhaps use angry tweets and scrape peoples' location data to determine what zip code they are in.
2. What other factors might be preventing people from using the bikes in these zip codes?
    1. Are people wealthy enough that they own bikes?
    2. Do people not have enough disposable income to purchase memberships?
    3. Are people less healthy in these areas?
    4. Are people less likely to know how to ride a bike?
    5. Do the people living in these areas commute far enough that using a bike is impractical.
    6. etc.
3. Does each bike station hold the same number of bikes? If so, what is that number, and if not what are the numbers at each station? This is crucial because do we know if the 32 stations in 11201 only hold 1 bike each (it is doubtful but these variables should be accounted for).

For now we have found a place to start analyzing the underutilization of Citi Bikes. We know areas where residents use them the most and areas where they use them the least. Even without the above questions answered, NYC Bike Share could still use information like this to redistribute bike stations and see how it balances out the residents' use.

If you would like to learn more about this project check out my [Github repo](https://github.com/kennmyers/Citi_Bike_Analysis), especially the [Jupyter NB](https://github.com/kennmyers/Citi_Bike_Analysis/blob/master/citibike_analysis.ipynb).
