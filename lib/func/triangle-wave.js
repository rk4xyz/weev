import sineWave from './sine-wave.js'

/**
 * Returns the y-value of a triangle wave.
 *
 * @params {float} t The current time
 * @params {float} A The amplitude of the wave
 * @params {float} omega The wave number
 * @params {float} phi The phase offset
 */
export function triangleWave(t, A, omega, phi) {
    return 2 * A / Math.PI * Math.asin(sineWave(t, 1, omega, phi))
}

export default triangleWave
