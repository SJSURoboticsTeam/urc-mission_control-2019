[![Codacy Badge](https://api.codacy.com/project/badge/Grade/59b532d0adb04236993e83004b167bbb)](https://www.codacy.com/app/ariskoumis/missioncontrol2019?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=SJSURobotics2019/missioncontrol2019&amp;utm_campaign=Badge_Grade)

# Mission Control 2019

## Prerequisites
- [node.js](https://nodejs.org/en/)
- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Getting Started
1. Navigate to where you want to keep the folder (e.g. your desktop)
    - ```cd ~/Desktop```
2. Clone the respository: 
    - ```git clone https://github.com/SJSURobotics2019/missioncontrol2019```
3. Navigate into the repo
    - ```cd missioncontrol2019```
4. Install dependencies using Node Package Manager (npm)
    - ```npm install```
5. Serve the project into your browser
    - ```npm run start```
        -  This will run the 'start' script specfied in package.json
6. At this point your browser should automatically open up the project

## Development Workflow
1. In missioncontrol2019, create your own branch.
    - ```git checkout -b YOUR_BRANCH_NAME_HERE```
2. Checkout your new branch
    - ```git checkout YOUR_BRANCH_NAME_HERE```
3. Copy/Paste the ProtoModule folder located in ./src/modules
4. Start development, see the Science module for an example of the modifications you need to make to turn ProtoModule into your own.
5. Add your module's info to ./src/lib/moduleData.js. Look how the other modules are added there and do the same.
6. Import your component into ./src/modules/Common/ModuleContainer.jsx
    - For example, if you're importing the science module you would add this to the top:
         - ```import ScienceModule from "../Science/ScienceModule.jsx";```
7. Finally, in ./src/modules/Common/ModuleContainer.jsx add an additional case statement to the function ```chooseModule```
    - Using the ScienceModule as an example again,
         - ```case "science-module":```
                ```return <ScienceModule/>```

After all of that, you should be able to go to select your module from the dropdown menu and have it render successfully. 

## Correctly using Version Control
*On your branch*, commit your stuff as much as possible. Don't worry if it's not in a usable state - you can do whatever you want in your branch judgement-free.

### Important git commands:
- ```git add```:  Have git "track" changes made to a file
    - When you create a file, git does not care about it until you specify it should be tracking the file with ```git add FILE_NAME```
    - If you want to start tracking all files not currently being tracked, you can use ```git add .```
        - NOTE: this command will ignore any files listed in the .gitignore file.
- ```git commit```: Stage changes made in tracked files
    - Basically, "commiting" your changes takes all *tracked* files on your branch with changes since the last commit, and bundles those changes together. 
    - ```git commit -a -m "THIS IS WHERE I DESCRIBE THE CHANGES THIS COMMIT MAKES"```
        - ```-a```: Stage all tracked files with changes into this commit
        - ```-m```: Add a commit message. Adding this flag makes git expect a string that describes that commit. Be descriptive here so people know what your new code does.
- ```git push```: "Push" your commmit
    - There are two types of branches, local and remote. Local are on your machine, while remote is what everyone has access to. When you push your changes, you update the remote version of your branch with the commit you have on your local branch.
    - If this is your first time pushing changes from your local branch, you need to ```git push --set-upstream origin NAME_OF_YOUR_BRANCH```. Otherwise, just do ```git push```
- ```git pull```: This fetches all updated code that you don't have on your branch 
    - **DO THIS EVERY TIME YOU START WRITING CODE FOR THE DAY!** If you don't you will likely cause [merge conflicts](https://help.github.com/articles/about-merge-conflicts/) in the future.

## Done with a module?
[Submit a pull request](https://github.com/SJSURobotics2019/missioncontrol2019/compare?expand=1) to merge your branch into master. If it passes the tests and Evan approves of the changes, it will be merged.