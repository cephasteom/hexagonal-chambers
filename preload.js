// PRELOAD
[s0,s1,s2,s3,s4,s5,fx0,fx1].map(stream => stream.e.every(4))

s0({inst:2,bank:'breaks.hp?breaks.archn*16'})
s1({inst:2,bank:'rumble',i:4,de:0.5,lc:0.5})
s2({inst:6})
s3({inst:0,midi:2,lc:0.5})
s4({in:1,bank:'air'})
s5({in:1,bank:'gm.static'})
fx0({re:1, rsize:0.75, rdamp:0.5,_track:6})
fx1({de:1, _track: 7})