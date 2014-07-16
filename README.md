freqbuddiez
===========

Freqbuddiez is a proof of concept music collaboration application that was developed during a 24-hour hackathon. The single-page app allows multiple users to connect to a musical instrument interface and play sounds together in (nearly) real time. The included instruments are a synthesizer, a bass, and a drum, all of which generate sound using web audio API oscillators. When a connected user plays an instrument, a signal is sent to a central Node.js server via a Socket.io connection and immediately broadcast to all other connected users. When a signal arrives from a remote source, a client-side event handler produces sounds according to the signal. Additionally, a canvas-based color-coded frequency visualizer shows a spectrogram of all played sounds.
