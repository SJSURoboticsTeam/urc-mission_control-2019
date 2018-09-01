# Dial Documentation

## Intro
The Dial control provides a JavaScript-powered UI element inspired by a physical dial. It displays a needle that rotates around a central pin which can be dragged by a mouse or moved around with custom JavaScript.

## Overview

The Dial has TWO Needles, one that displays the **local** input from the user (black), and the other displays where the **remote** value of what the dial is controlling. This is useful when manipulating a physical object, such as the arm's elbow position or tracker camera's angle.


## Getting Started
1. In your HTML file, create an empty div. The dial will place itself in this div.
```
    <div id="dial-1"></div>
```
2. At the bottom of your HTML file, import the files dial.js, and eventemitter.js.
```
    <script src="../../Core/js/dial.js"></script>
    <script src="../../Core/js/eventemitter.js"></script>

```
3. In your js, call the dial constructor (explained below).
```
    let dial_1 = new Dial({container: '#dial-1', min: 0, max: 360})    
```
4. (Also in your js) add event listeners. (see 'Events' below.)
```
   dial_1.addEventListener('move', dialMoved);
   
   function dialMoved() {
       //do something... for example log its local and remote values
       console.log(dial_1.local, dial_1.remote);

        //after any maniuplation of dial, make sure to rerender it.
        dial_1.render();
   }
```
5. (In your js) After instantiating the Dial class (Step 3), make sure to render the dial so it's visible on your page.
```
    dial_1.render()
```

## API summary
    ⁃    new Dial({ container: ‘#dial-cam-shoulder’, min: 0, max: 90 })
    ⁃    dial.addEventListener(‘move’, dialMoved)
    ⁃    dial.render()
    ⁃    dial.local
    ⁃    dial.remote
    -    dial.disabled
### Constructor
The constructor takes three parameters:

1. container: The ID of the div that will contain the dial.
2. min: The minimum value of the dial. (Range 0-360) 
3. max: The maximum value of the dial.  (Range 0-360)
    
    - The min and max values identify 0 as the very top (like a clock) and values increment 
    clockwise.

As shown in step 3 of "Getting Started" above, calling the constructor must be assigned to a variable. This is a necessary step because it allows you to perform manipulations on the dial after you've instantiated it. It is reccomended to make this variable global to all your js files, so you don't have to limit your control of the dials to whatever scope you instantiated it in. For an example of doing this, see Paul's solution in Subsystems/Arm+Endeffector_Paul/js/index.js.


### Reading
At any time, the value of the dials can be read by accessing 

    dial.local
    dial.remote

It is recommended to round these values using ```Math.round()```. Not doing so will return a value that is precise to the 14th decimal point, which is unnecessary.


### Updating
The values of the local and and remote can be directly reassigned.

    //Example: User clicks a button titled "reset dials"
    dial.local = 0;
    dial.remote = 0;

This is also useful when manipulating a physical object remotely. For example, if the user inputs the a value onto a dial, this value would be sent via XHR to the robot, and the object's orientation should be sent back to the mission control page via SSE. Once that SSE is recieved, the page should **update the remote needle on the dial by reassigning it**.

**NOTE**: By default, the dials are *disabled*! You can change this using the following line:
```
dial.diabled = false
```

### Events
Similar to common UI elements, Dials emit events. The Dial's events are:

    move: User moves dial needle
    mouseDown: User clicks
    mouseUp: User lets go of click

These events can be used in combination with ```dial.AddEventListener(event_name, callbackFunction)```

### Rendering
After any manipulation, the dials should be rendered using ```dial.render()```. Not doing so will result in changes to the dial not reflecting on your page.
    
## Conclusion
This section is currently empty.

