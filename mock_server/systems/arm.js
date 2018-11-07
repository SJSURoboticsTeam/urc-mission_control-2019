const Delay = require('../delay');
const system = require('../system');

const SPEED = 10;  // 10 degrees per second or open/close the claw by 10% per second

// State
let cameraId = 0;
const cameraShoulder = new Delay(0, 90, SPEED);
const cameraElbow = new Delay(0, 90, SPEED);

let gimbalState = 0;

const baseDelay = new Delay(-150, 150, SPEED);
const shoulderDelay = new Delay(0, 180, SPEED);
const elbowDelay = new Delay(-150, 150, SPEED);
const wristDelay = new Delay(-130, 130, SPEED);
const wristRotDelay = new Delay(0, 360, SPEED, true);
let clawMotion = 0;
let clawTorque = 100;

let stuck = 0;

let printCounter = 0;

// Arm API
const arm = new system.System('arm');

arm.addXHR('/state', (req, res) => {
    const {
        camera_id,
        camera_shoulder_rotation,
        camera_elbow_rotation,
        gimbal,
        base,
        shoulder,
        elbow,
        wrist,
        wrist_rot,
        claw_motion,
        claw_torque,
    } = req.body;

    cameraId = camera_id;
    cameraShoulder.set(camera_shoulder_rotation);
    cameraElbow.set(camera_elbow_rotation);
    gimbalState = gimbal;
    baseDelay.set(base);
    shoulderDelay.set(shoulder);
    elbowDelay.set(elbow);
    wristDelay.set(wrist);
    wristRotDelay.set(wrist_rot);
    clawMotion = claw_motion;
    clawTorque = claw_torque;

    console.log('arm /state');
    res.send('OK');
});

arm.addOnConnectSSE('hello', makeHello);
arm.addOnConnectSSE('ping',  makePing);
arm.addSSE('ping',  1000, makePing);
arm.addSSE('print', 3500, makePrint);

function makeHello() {
    return {
        camera_id: cameraId,

        camera_shoulder_rotation_desired: cameraShoulder.destination,
        camera_elbow_rotation_desired: cameraElbow.destination,

        gimbal: gimbalState,

        base_desired: baseDelay.destination,
        shoulder_desired: shoulderDelay.destination,
        elbow_desired: elbowDelay.destination,
        wrist_desired: wristDelay.destination,
        wrist_rot_desired: wristRotDelay.destination,

        claw_torque: clawTorque,
    };
}

function makePing() {
    const getPosition = (delay) => { delay.update(1000); return delay.position; };

    const isMoving = (delay) => delay.position !== delay.destination;

    const current = 1
                  + (cameraId !== 0 ? 4 : 0)
                  + (isMoving(cameraShoulder) ? 1 : 0)
                  + (isMoving(cameraElbow) ? 1 : 0)
                  + (isMoving(baseDelay) ? 5 : 0)
                  + (isMoving(shoulderDelay) ? 5 : 0)
                  + (isMoving(elbowDelay) ? 5 : 0)
                  + (isMoving(wristDelay) ? 5 : 0)
                  + (isMoving(wristRotDelay) ? 5 : 0)
                  + (clawMotion !== 0 ? 5 : 0);

    return {
        current,

        camera_shoulder_rotation: getPosition(cameraShoulder),
        camera_elbow_rotation: getPosition(cameraElbow),

        base: getPosition(baseDelay),
        shoulder: getPosition(shoulderDelay),
        elbow: getPosition(elbowDelay),
        wrist: getPosition(wristDelay),
        wrist_rot: getPosition(wristRotDelay),
    };
}

function makePrint() {
   return `Example print message #${printCounter++}`;
}
