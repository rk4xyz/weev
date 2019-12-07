/**
 * Returns the y-value of a sawtooth wave.
 *
 * @params {float} t The current time
 * @params {float} A The amplitude of the wave
 * @params {float} omega The angular frequency
 * @params {float} phi The phase offset
 */
export function sawtoothWave(t, A, omega, phi) {
    return 2 * A / Math.PI * Math.atan(1.0 / Math.tan(
        t * omega / 2 + phi
    ))
}

export default sawtoothWave
