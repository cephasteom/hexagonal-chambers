(
s.options.sampleRate = 44100;
s.options.device = "Zen";
s.options.numOutputBusChannels = 24;
s.boot;

// Define the path to your samples
~samples = [
Buffer.read(s, "/Users/peterthomas/Documents/code/ct-samples/samples/vox.babel/01.wav"),
Buffer.read(s, "/Users/peterthomas/Documents/code/ct-samples/samples/vox.babel/02.wav"),
Buffer.read(s, "/Users/peterthomas/Documents/code/ct-samples/samples/vox.babel/03.wav"),
Buffer.read(s, "/Users/peterthomas/Documents/code/ct-samples/samples/vox.babel/04.wav"),
Buffer.read(s, "/Users/peterthomas/Documents/code/ct-samples/samples/vox.babel/05.wav"),
Buffer.read(s, "/Users/peterthomas/Documents/code/ct-samples/samples/vox.babel/06.wav"),
Buffer.read(s, "/Users/peterthomas/Documents/code/ct-samples/samples/vox.babel/07.wav"),
Buffer.read(s, "/Users/peterthomas/Documents/code/ct-samples/samples/vox.babel/08.wav"),
Buffer.read(s, "/Users/peterthomas/Documents/code/ct-samples/samples/vox.babel/09.wav"),
Buffer.read(s, "/Users/peterthomas/Documents/code/ct-samples/samples/vox.babel/10.wav"),
Buffer.read(s, "/Users/peterthomas/Documents/code/ct-samples/samples/vox.babel/11.wav"),
];

MIDIClient.init;
MIDIIn.connectAll;

// Define a function to play a sample when a MIDI note is received
~playSample = { |bufNum=0, amp = 0.5, pan = 0|
    var src = PlayBuf.ar(2, ~samples[bufNum], BufRateScale.kr(~samples[bufNum]), doneAction: 2);
	{ Out.ar(16, 
		PlayBuf.ar(2, ~samples[bufNum], BufRateScale.kr(~samples[bufNum]), doneAction: 2) 
	)}.play;
};

MIDIdef.noteOn(\playSample, { |veloc, num, chan, src|

    var bufNum = num % ~samples.size;
	var endpoint = MIDIClient.sources.detect { |endpoint| 
		endpoint.uid == src;
		
	};
	if(endpoint.name == "zen2" && chan == 0) {
		~playSample.value(bufNum, 1);
	};
});

)
// 
// s.quit
// 
// // s.options.device
// ServerOptions.devices;