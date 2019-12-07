/**
 * Returns the y-value of a sinusoidal wave.
 *
 * @params {float} t The current time
 * @params {float} A The amplitude of the wave
 * @params {float} omega The angular frequency
 * @params {float} phi The phase offset
 */
export function sineWave(t, A, omega, phi) {
    return A * Math.sin(omega * t + phi)
}

export default sineWave
