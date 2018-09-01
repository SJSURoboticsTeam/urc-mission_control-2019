# Arm

The arm page uses JavaScript modules, which Chrome requires be served over the
HTTP protocol. This means loading the arm page won’t work over a file:// URL.

The easiest way to launch the arm page is to launch an HTTP server at the root
directory of the missioncontrol2018 repo. On macOS this can be accomplished by
running `python -m SimpleHTTPServer` in the terminal while in the
missioncontrol2018 folder.

I’m not sure how to launch an HTTP server on Windows—sorry! You’ll have to
figure that out.

Open Chrome to the server you started and navigate it to the
Subsystems/Arm+Endeffector_Paul folder. This will open the arm page.

## Mock server

If you do not have a physical ESP32 microcontroller for the arm page to connect
to, you can still connect the arm page to our *mock ESP32 server* which
simulates the behavior of the robot arm’s ESP32.

To run the mock server, open a terminal to the “Mock server” folder and run
`node .`.
