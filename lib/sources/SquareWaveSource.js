import { Readable } from 'stream'
import { Buffer } from 'buffer'
import WaveSource from './WaveSource.js'
import squareWave from '../func/square-wave.js'

/**
 * A Readable stream which produces a square waveform.
 *
 * @param {Object} options WaveSource options
 * - `frequency` The frequency of the waveform
 * - `amplitude` The waveform amplitude in range [0, 1] (default 1)
 * - `phase` The phase or offset of the waveform (default: 0)
 * @api public
 */
class SquareWaveSource extends WaveSource {
    constructor({
        frequency,
        amplitude = 1,
        phase = 0,
        ...rest
    }) {
        const omega = 2 * Math.PI * frequency
        const fn = t => squareWave(t, amplitude, omega, phase)
        super({
            fn,
            ...rest
        })
    }
}

export default SquareWaveSource
