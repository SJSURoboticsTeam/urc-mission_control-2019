# Variable definitions

timestamp = milliseconds since epoch
power = 0 | 1
current = 0 .. 1000 (deci-amps)

camera_id = 0 | 1 | 2 (0 is no camera | 1 is elbow | 2 is claw)
camera_shoulder = 0..90
camera_elbow = 0..90

gimbal = 0 | 1

link = base | shoulder | elbow | wrist | claw

base = -150..150
shoulder = 0..180
elbow = -150..150
wrist = -90..90
wrist_rot = 0..359
claw = 0..100 (0 is closed, 100 is open)
claw_torque = 0..100 (N cm)

stuck = 0 .. 63 each of the 6 bits represents:
  base 0x1
  shoulder 0x2
  elbow 0x4
  wrist 0x8
  wrist_rot 0x10
  claw 0x20

# XHR

GET /power/off
GET /power/on
GET /latency?timestamp
  response body should be the same timestamp that was passed in
GET /camera/select?id
GET /camera/move?camera_shoulder&camera_elbow
  all query parameters optional
GET /arm/gimbal/off
GET /arm/gimbal/on
GET /arm/move?base&shoulder&elbow&wrist&wrist_rot&claw
  all query parameters optional
GET /arm/torque?claw_torque

# SSEs

event ping

  timestamp
  power
  current

  When power == 1, also include:

    camera_id
    camera_shoulder
    camera_elbow

    camera_shoulder_desired
    camera_elbow_desired

    gimbal

    base
    shoulder
    elbow
    wrist
    wrist_rot
    claw
    claw_torque

    base_desired
    shoulder_desired
    elbow_desired
    wrist_desired
    wrist_rot_desired
    claw_desired

    stuck

event print

  SSE's data property is just a string with no \r or \n

# Mimic -> MC

gimbal on

gimbal off

base
<base>

shoulder
<shoulder>

elbow
<elbow>

wristroll
<wrist>

clawposition
<claw>

clawtorque
<claw_torque>

# MC -> Mimic

stuck:<link>

unstuck:<link>

# RTSP

/arm

# UI design

## Connection

Input hostname
Icon arm_connection status
Icon mimic_connection status

## Power

Radio subsystem [off/on]

Link camera rtsp
Radio camera id [none/elbow/wrist]
Dial camera_shoulder
Dial camera_elbow

## Health

Chart current

Textbox arm/mimic log

## Control

Radio mode [mouse/mimic preview/mimic]

Radio wrist gimble [off/on]

Button reset

Button wrist_rot calibrate

Dial base
Dial shoulder
Dial elbow
Dial wrist
Dial wrist_rot
Slider+Buttons claw
Slider claw_torque

## 3D render? maybe

Top-down view?
Perspective view?

## Reverse kinematics? no

Move claw in raw XYZ coordinate, reverse kinematics to make it happen
smoothly.

Implementation of reverse kinematics is known to be hard.

Multiple solutions. Need no-go zones. Don't break through your leg.

# UI behaviors

Dial & Slider
  show desired & actual positions

Button wrist_rot calibrate
  wrist_rot offset -= current wrist_rot reading
  Makes current wrist_rot reading appear as 0.

Button reset
  Sends /move with everything set to 0

Icon connection status
  Shows whether we are connecting or connected

Radio mode = mimic preview
  Shows readings from mimic without sending them to real arm

Radio wrist gimble = on
  Forces mimic preview on for the wrist_rot

# UI implementation

Button
Icon
Input
Radio
Slider
Textbox
  HTML + JS

Chart
  Highcharts or Highstocks

Dial
  <svg>

3D render
  <canvas>
