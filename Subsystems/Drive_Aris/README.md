# Drive Page
Mission control page used to control the rover's movement. Page is still incomplete, see "In Progress" section for remaining tasks

#Getting Started
1. Serve missioncontrol2018 by following the instructions in missioncontrol2018/README.md.
2. Open your browser and navigate to the port that missioncontrol2018 is served on.
3. You should see a file directory. Open ./Subsystems/Drive_Aris/

#Connecting to ESP32 / Mock Server
1. Once on the page, enter the IP address of your ESP32/Mock Server in the connection field at the top.
2. Click connect. If the icon next to "Connection" is a green check, connection was successful. If not, the IP address you entered was incorrect, or the server is not correctly set up.

#Usage
* Power must be on to control the rover. This button also acts as a kill switch in emergency situations

#In Progress
* Activate/deactivate buttons depending on connection and power states.
* A secondary, minimal UI for the driver.
* Compass
* 3D Rover Model reflecting actual rover's orientation.
* Wheel heading controllers
* Video Input
* Predective path overlay 