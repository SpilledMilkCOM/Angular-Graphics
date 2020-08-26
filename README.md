# Angular From Scratch [(demo)](http://zrhoz.com)

## REF: [Using Angular in Visual Studio Code](https://code.visualstudio.com/docs/nodejs/angular-tutorial)

## :open_file_folder: Get the latest version of Node.js

Install the latest version of Node on their [website](https://nodejs.org/en/download/).

## Get the latest version of Node Package Manager (npm)

    npm install -g npm
    npm install npm@latest -g
    npm install node@latest -g
    npm install node@12.0

## Get the latest version of the [**Angular CLI**](https://cli.angular.io/) *(Command Line Interface)*

    npm install -g @angular/cli

## Create the project from your repo directory, run the following command which will create the folder `Angular-Graphics`

    c:\repositories> ng new Angular-Graphics
    Add Angular routing?    Yes
    Choose style:           CSS

## Get your initial creation into Git

Angular set up a preliminary git repo, but this should go into GitHub, or some remote server.  I typically use the brute force method. Rename Angular-Graphics to Angular-Graphics2.  Create a new repo in GitHub **without** the README since you already have one generated by `ng new`.

*NOTE: Using `ng new` will certainly generate a new template, but **BE** prepared to do a whole lotta updating to the proper versions to get **OTHER** stuff you might want to do (like material) up to snuff so you can start working.*

Use Git Bash to `git clone` your repo into your repository directory. Copy the contents of your renamed Angular-Graphics2 folder into your newly cloned Angular-Graphics folder, but **EXCLUDE** the .git folder that the Angular CLI created otherwise you'll have to change the remote in the folder you want to use.  Once the files are all copied to the cloned folder, then you can commit and push and you'll see your "initial commit" in your GitHub repo.

    git clone "https://github.com/yourID/yourNewRepo.git"

## Angular Material

* [Getting Started](https://material.angular.io/guide/getting-started)
  * `ng add @angular/material` *(you can also use npm)*
  * Choose a theme and import it into your styles.css file
  * Add the BrowserAnimationsModule *(required for most controls)*
  * [Material Components](https://material.angular.io/components)

## Publish to GitHub Pages

Note that **this** project is called "Angular-Graphics"; you will want to substitute **your** project name here.
Create a new branch called "gh-pages" in your GitHub repo.

    npm install -g gh-pages
    ng build --prod --base-href /Angular-Graphics/
    gh-pages -d dist

It just **WORKED**! (*not really*)  The code is there in the gh-pages branch, but there is an issue with GitHub Pages
that doesn't handle the Angular (or React) routing very well.  So you have to follow the link in the references below
to finish up.

Try it [HERE...](https://spilledmilkcom.github.io/Angular-Graphics/)

I couldn't really get the hack to work for a SPA, but in theory it's **supposed** to work for Git Hub Pages (not for me).
This hack is a MUST when deploying to a GoDaddy PLESK server.  THANK YOU DANIEL!!

## :1234: TODO

* Resizing **-started-**
* Animation **-started-**
  * Support a good frame rate
  * Possibly detect frame rate
  * Flocking Simulation [Boids](http://www.red3d.com/cwr/boids/)
* Fractals
  * Dragon
  * Koch
  * Tree
* Colors
* "Sprites"
* 3D
* Figure out how to package it all up and yet still keep it open.

## :information_source: References

* [Canvas Drawing API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
* [TypeScript Doc (commenting)](https://github.com/Microsoft/tsdoc)
* [Markdown Emojis](https://www.webfx.com/tools/emoji-cheat-sheet)
* [Angular @ViewChild: In-Depth Explanation](https://blog.angular-university.io/angular-viewchild/)
* [Angular Material flex-layout](https://github.com/angular/flex-layout/wiki/Declarative-API-Overview)
* [Angular Material Icon Font](https://material.io/resources/icons/?style=baseline)
* [Publish to GitHub Pages](https://www.telerik.com/blogs/quick-angular-2-hosting-angular-cli-github-pages)
* [SPA Hack '404 not found'](http://www.backalleycoder.com/2016/05/13/sghpa-the-single-page-app-hack-for-github-pages/)
* [Flocking Simulation](https://www.youtube.com/watch?v=mhjuuHl6qHM)
