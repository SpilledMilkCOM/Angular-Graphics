# Angular From Scratch

## REF: [Using Angular in Visual Studio Code](https://code.visualstudio.com/docs/nodejs/angular-tutorial)

## Get the latest version of Node Package Manager

    npm install -g npm
    npm install npm@latest -g
    npm install node@latest -g

## Get the latest version of the [**Angular CLI**](https://cli.angular.io/) *(Command Line Interface)*

    npm install -g @angular/cli

## Create the From your repo directory, run the following command which will create the folder `Angular-Graphics`

    c:\repositories> ng new Angular-Graphics
    Add Angular routing?    Yes
    Choose style:           CSS

## Get your initial creation into Git

Angular set up a preliminary git repo, but this should go into GitHub, or some remote server.  I typically use the brute force method.
Rename Angular-Graphics to Angular-Graphics2.  Create a new repo in GitHub **without** the README since you already have one generated by `ng new`.  Use Git Bash to `git clone` your repo into your repository directory. Copy the contents of your renamed Angular-Graphics2 folder into your newly cloned Angular-Graphics folder, but **EXCLUDE** the .git folder that the Angular CLI created otherwise you'll have to change the remote in the folder you want to use.  Once the files are all copied to the cloned folder, then you can commit and push and you'll see your "initial commit" in your GitHub repo.

    git clone "https://github.com/yourID/yourNewRepo.git"

## TODO

* Resizing
* Animation
  * Support a good frame rate
  * Possibly detect frame rate
* Fractals
  * Dragon
  * Tree
  * Koch
* Colors
* "Sprites"
* 3D
* Figure out how to package it all up and yet still keep it open.

## :chart_with_upwards_trend: References :chart_with_downwards_trend:

* [Canvas Drawing API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
* [Markdown Emojis](https://www.webfx.com/tools/emoji-cheat-sheet)
