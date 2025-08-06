# Portfolio Site
#### Welcome to my first project README, this is the place where from now on, I will post an overview of what I made, why I made it, and how I made it.

#### Now for this project, the portfolio site. It began when I wanted to record my projects in some way—mostly for myself, so I could look back at the weird stuff I built. But I also wanted to share my projects, so I decided to build a site. I looked for inspiration (thank you [Karam Haddad](karamhaddad.com), and started working. For this project I used a lot of AI (thanks ChatGPT), I am just not good enough at web disign to do it all on my own (And to be honest, I prefer to spend my time on learning other things ;-) That said, you still learn a lot by debugging, and prompting is also a great skill to have!



## The making
I originally planned to make a separate HTML page for each project, but that would've become repetitive and a pain to maintain. So I tried dynamically loading project data from a JSON file, that actually got pretty far, I had most of it working. But I eventually realized I was just reinventing Markdown parsing. 

After that, I switched to loading the README.md files directly from each project's GitHub repository and rendering them. That worked, but then I came to the realization that it's a lot easier to link directly to the GitHub repository, so that is what I did.

In the end, I went with a simple approach: the “Projects” tab just links directly to each project’s GitHub page. It’s less fancy, but easier to maintain, and that is far more important.


## How it works
I am not going to explain the whole site here, but here are a few features I like to share:

1. First off, the navbar and footer aren't duplicated in code for every separate page, instead they are dynamically loaded into the page. This makes it very easy to make changes to both of them without having to do that for each separate page.
2. The home page carousel and the projects page tiles both load their content via GitHub API, so when I make a new repository or edit the description, it just gets loaded in automatically. Because github API has a rate limit, I wanted to minimize the amount of calls per user, so I added Session Storage for the project titles, descriptions and images. This way all the github data doesn't have to get re-fetched when going to another tab.
3. The terminal (playground page) took the most Vibecoding, it was a mess to make and I barely understand the code... From what I understand, when a command is "executed" it checks which command was entered and then runs the function of that command. That function checks for arguments and throws an error, or continues executing the actual command. Although the making was a mess, the result is very cool if I may say so, please try it out if you have some spare time ;-). 


## What I Learned
Even though this wasn't my favourite project (I am more into electronics than web development), here's a list, because who doesn't like a list, right?

* Basic HTML, CSS, and JavaScript structuring
* Using fetch() to load remote content
* Working with the GitHub API to fetch README files
* How to persuade an AI to make a website
* How not to over-engineer something that doesn’t need it
* That Markdown is good actually
* That I definitely don’t want to be a web developer.


