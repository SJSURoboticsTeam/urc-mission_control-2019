// Holds a "current" value and slowly interpolates it to a "destination"
// value over time. This mimics the behavior of the physical arm after
// it has been given a move command.
//
// A value is circular if it wraps around at the min and max values, such
// as if we are imitating a rotating object whose value wraps around from
// 360 back to 0.
//
// Velocity is the rate of change in the value per second.
class Delay {
    constructor(min, max, velocity, circular) {
        this.min = min;
        this.max = max;
        this.velocity = velocity;
        this.circular = circular;

        this.reset();
    }

    reset() {
        this.position = this.destination = this.min;
    }

    set(destination) {
        destination = Math.min(destination, this.max);
        destination = Math.max(destination, this.min);
        this.destination = destination;
    }

    update(millisecondsPast) {
        const travel = this.velocity * millisecondsPast / 1000.0;

        if (Math.abs(this.position - this.destination) < travel) {
            this.position = this.destination;
            return;
        }

        const direction = this.circular ? this.circularDirection(millisecondsPast)
                                        : this.linearDirection(millisecondsPast);

        this.position += travel * direction;

        if (this.circular) {
            this.position = wrap(this.position, 0, 360);
        }
    }

    linearDirection(millisecondsPast) {
        return this.position < this.destination ? 1 : -1;
    }

    circularDirection(millisecondsPast) {
        const positiveDistance = wrap(this.destination - this.position, 0, 360);
        const negativeDistance = 360 - positiveDistance;
        return positiveDistance < negativeDistance ? 1 : -1;
    }
}

function wrap(x, min, max) {
    const range = max - min;
    while (x < min) {
        x += range;
    }
    while (x > max) {
        x -= range;
    }
    return x;
}

module.exports = Delay;
