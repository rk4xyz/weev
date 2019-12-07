import wav from 'wav'
import TriangleWaveSource from '../lib/sources/TriangleWaveSource.js'

const common = {
    bitDepth: 16,
    sampleRate: 44100
}

const fstream = new wav.FileWriter('./example.wav', {
    channels: 1,
    ...common
})

let tones = 0

const emitRandomTone = (end=false) => {
    const frequency = Math.random() * 320 + 120
    const source = new TriangleWaveSource({
        frequency,
        duration: 0.1,
        ...common
    })
    source.pipe(fstream, { end })
    source.on('end', () => {
        if (tones < 25) {
            emitRandomTone(++tones===50)
        }
    })
}

emitRandomTone()
