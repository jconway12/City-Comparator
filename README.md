# javascript-project

## Overview

There are many ways one could measure the quality of a location, either through economic, environmental, or social factors. The AirVisual, Teleport, and World Bank API's offer data in relation to this information, allowing users to draw potential insights regarding places around the world. Specifically, AirVisual offers data on air quality, while Teleport offers a score out of 10 relating to 14 categories such as cost of living.


## Functionality & MVP 

Users are able to:

 See data summary of air quality and quality of life data
 See breakdown of scores and air quality information by city
 Toggle data between categories
 Search specific location and narrow by categories 
 View data as interactive chart
 
In addition, this project contains:

 An informational page describing methodology with links to raw data
 A production README

## Data & APIs
Data comes from Teleport and AirVisual API  
  
## Wireframe
The visualization consists of a main page with a global map, with links to more specific data through geographic location/ category. 

Guide bar - information on air quality colors 
Control pannel - allow you to toggle categories 
Map - map with color visualization of air quality and numerical visualization of other categories
City details page - bars representing rating for each category out of 10 + air quality visualization map of area
Average information - average data for each category for comparison

https://github.com/jconway12/javascript-project/issues/1#issue-506870435
https://github.com/jconway12/javascript-project/issues/2#issue-506870931

## Design
Colors correlate to air quality while numbers represent quality of life scores. Update dynamically based on which categories are highlighted.

## Architecture & Technologies
Project is built with:

JavaScript for data visualization and management,
D3 and CSS for interactive visualization, and 
Webpack to bundle javascript files.
