# Variables
	
# XHR
	/power_off
	/power_on
	/set_mode?mode
		mode = car | spin | crab | debug
	/lock_drive_mode
	/lock_heading
	/set_drive?speed&direction
		speed = 0..100 (percent)
		direction = 0..360 (degree)
	/rotate_wheel?number&direction
		number = [optional] 1 | 2 | 3 | 4
		direction = 0..360
	/reset_wheel_dir
	/set_speed?speed&number
		speed = 0..100 (percentages)
		number = [optional - possibly for debugging] 1 | 2 | 3 | 4 (can set speed of one wheel, if needed.)

# Events
	event ping
		timestamp: milliseconds since epoch
		power: on | off
		current = 0.0 .. 100.0?

		temperature
		speed
		rpm 
		trajectory_1 = 0 .. 360
		trajectory_2 = 0 .. 360
		trajectory_3 = 0 .. 360
		trajectory_4 = 0 .. 360
		current_wheel_1
		current_wheel_2
		current_wheel_3
		current_wheel_4
		heading = 0 .. 360

	event print
		timestamp: milliseconds since epoch
    	msg: error code







# UI / Overall Requirements 
Current-sensing
Temperature
Speed/RPM
Individual Wheel Trajectory

GPS
Compass Sensor for Heading Direction

Drive Modes
	Car Mode
	Spin Mode
	Crab Modes

Lock Steering Mode
Locked Heading (Compass)

Displays
	Compass Heading Wheel Video Overlay
	Predictive Path Video Overlay
	Top=down view of rover w/ wheel direction