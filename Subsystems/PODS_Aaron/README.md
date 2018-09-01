# PODS Page
Mission control page used to control the Pods.  

# Set up
1. Serve missioncontrol2018 to your browser:
    * Navigate to missioncontrol2018 directory in terminal.
    * For windows machines:
        * Make sure python is installed and can be used from command line
        * For python 3.x enter in terminal:
          ```
          python -m http.server 8000
          ```
        * For python 2.x enter in terminal:
          ```
          python -m SimpleHTTPServer 8000
          ```
    * For macs, just enter the following in terminal:
          ```
          python -m SimpleHTTPServer 8000
          ```
2. Open your browser and navigate to the port that missioncontrol2018 is served on.
    * e.g. localhost:8000
3. You should see a file directory. Open ./Subsystems/PODS_Aaron/

# How to use
* The pods page is mostly intuitive. There are a couple things worth noting though:
    1. Pod selection is to switch between the pods. It does this using the saved IP addresses for each pod. If the IP addresses are wrong, or for the sake of testing, then you can connect manually to a specified IP address by entering it into the field above and hitting the 'Update' button.
    2. The Main Process refers to the automated drill process. This process will automatically drill down, collect sensor data, and then drill back up. It will notify when done.
    3. The manual drill control is meant to be used if the Main Process doesn't want to be used for some reason. This part of the page becomes disabled when the Main Process is running. The drill encoder value is meant to give a picture of how far down the drill is.
    4. The buttons labeled 'Unlock Scroll Bar' and 'Print Pod Feedback' deal with settings related to the console. Unlock scroll bar will unlock the scroll bar from the bottom of the console, which could be useful if too much data is being printed at once. Print pod feedback will switch between printing and not printing all of the variables being received from the pod.
    5. Lastly, the graphs will display the sensor data when they are received. You must download the sensor data in order to save it. Do this buy hitting the 'Download Sensor Data' button, and then saving the text file to your computer. You can then easily upload the text file into a google sheets file and it will be able to format it automatically.
