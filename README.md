# subleasing
Code and related artifacts to the student subleasing app



To use this project, follow the steps below:
1) create a new project directory
2) in that directory, create a new angular project
3) copy the files from this git repository from the top of your project directory (aka the directory from step 1) and replace any existing files in the destination with the new versions from the git repo
4) from within the angular project directory, run ng "build"
5) from within the overall project directory, run "npm install" and then "node server"
6) access http://localhost:3000 from a browser
7) voila! The project displays itself on the page and you can interact with it

Lab6
For this lab, the biggest (and most surprising) obstacle that the team ran into was the gathering of the initial data set for our database. Kolby, Aliza, Ted and Deena all looked for various API's or datasets that could be used to gather the information we wanted, but everything found was either useless data, not what we were looking for, or required money to access. In the end, Kolby bit the bullet and just bought a database's worth of information on all of Rensselaer County, NY which ended up being mostly cut out for various reasons anyway.

The contents of the lab can be located on the "Visulazations" page of the website, or by diving into the "datavis" component in the angular project. 

Aliza - For this lab I performed some of the intial ETL actions that gave us our initial data set: in particular, I modified the CSV to only show data rows that had a city of "troy". My first visualization "Styles of Structures in Troy, NY" is a bar graph comparing all of the different types of Structures that were in the final "Troy only" data set. The second, "Average Market Value of properties built in each Year" shows what it says in the title. For creativity, I made sure to make both of my visuallizations colorful and "visually similar" (aka I built each graph using the same set of basic parameters to make them look, stylistically, the same). 

I had a bit of trouble with the second graph: I've never worked with aggrations of data in R before, and it took me a while of doing research and trying different methods to figure out what worked. What I ended up doing was creating a seperate "variable" that contained the results of applying a "mean" function to different "groups" of data based on year, and displayed that data in the plot instead of attempting to visualize the mean of the years directly. 

Kolby- I found the dataset to use, and worked with the group to do some transformations to it, removing a variety of extraneous information. For my first visualization, I made a bar plot of the bedroom to bathroom ratio in buildings, remniscient of RPI's regulations for COVID-19. For my second visualization, I made a smooth scatterplot of the year that buildings in Troy were built vs the number of stories they have. One difficulty I ran into was that with so many data points, a normal scatterplot was far too dense to have any useful value as a visualization. By using a scatter plot, I was able to display the data in more of a "heat map" kind of way, showing density of datapoints.
