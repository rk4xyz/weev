import { Readable } from 'stream'
import { Buffer } from 'buffer'

/**
 * A Readable stream which produces a waveform from a given
 * function.
 *
 * @param {Object} options
 * - `fn` The function which produces the waveform with a signature of
 *        function fn(t)
 * - `duration` The amount of samples to produce, expressed in seconds (
 *              default: unlimited)
 * - `sampleRate` The rate in samples/s to produce data (default: 44100)
 * - `bitDepth` The number of bits per sample (multiple of 8, default 16)
 * - `bigEndian` If true, write bytes in big-endian format (default: false)
 * @api public
 */
class WaveSource extends Readable {
    constructor({
        fn,
        sampleRate = 44100,
        bitDepth = 16,
        bigEndian = false,
        duration = null,
        ...rest
    }) {
        super(rest)
        this._fn = fn
        this._sampleRateInv = 1.0 / sampleRate
        this._t = 0
        this._byteLength = bitDepth / 8
        this._max = (1 << (bitDepth - 1)) - 1
        this._buffer = Buffer.alloc(bitDepth / 8)
        this._bigEndian = bigEndian
        this._duration = duration
    }

    _read() {
        // Produce data until told to stop.
        let buffer
        do {
            // Check stopping condition
            if (this._duration !== null && this._t >= this._duration) {
                this.push(null)
                break
            }

            // Next sample
            const y = this._fn(this._t)

            // Clamp
            const clamped = Math.trunc(y * this._max)

            // Convert to bytes.
            buffer = Buffer.alloc(this._byteLength)
            if (this._bigEndian) {
                buffer.writeIntBE(clamped, 0, this._byteLength)
            }
            else {
                buffer.writeIntLE(clamped, 0, this._byteLength)
            }

            this._t += this._sampleRateInv
        } while(this.push(buffer))
    }
}

export default WaveSource
