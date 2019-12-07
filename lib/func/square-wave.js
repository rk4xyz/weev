import sineWave from './sine-wave.js'

/**
 * Returns the y-value of a square wave.
 *
 * @params {float} t The current time
 * @params {float} A The amplitude of the wave
 * @params {float} omega The angular frequency
 * @params {float} phi The phase offset
 */
export function squareWave(t, A, omega, phi) {
    return A * Math.sign(sineWave(t, 1, omega, phi))
}

export default squareWave
