const { states, amps, values } = d.book_0
let hits = floor(states.length)
let smoothing = 2

z.bpm.set(180)
let loop = 3
// z.seed('18')
z.t.saw(0,q*loop,0,1/loop)
  // .add(q)

states[0].map((_,i) => 
  streams[i]
    .set({cut:i,i})
    .x.v(t => s - (values[t%hits] * s))._
    .y.v(t => amps[t%hits][i] * s)._
    .e.v(t => +states[t%hits][i])._
    .m.n(streams[i].e).$and.every(2)._._
    .p._vol.cc(4 + (i * 2),10,1)
);

z.p.energy.midicc(0,10,0)
z.p.space.cc(1,10,0)
z.p.fx0level.cc(2,10,1)
z.p.fx1level.cc(3,10,1)
z.e.set(1)
z.m.set(1)

fx0.set({re:1, rsize:0.75, rdamp:0.5,_track:6})
fx0.p.rtail(z.p.space)
fx0.p._level(z.p.fx0level)
fx0.e(1)

fx1.set({de:1, _track: 7})
fx1.p.dtime(z.p.space).mtr(1.5,3.5).step(0.5).btms()
fx1.p.dfb(z.p.space)
fx1.p._level(z.p.fx1level)
fx1.e(1)

s0.set({inst:'2',bank:'breaks.archn',_snap:q*loop,cut:[3],fx0:1/8,d:ms(1/4),cutr:ms(1/2)})
s0.p.i.random(0,16,1)
s0.py._grainsize.saw(1/8,1/32)
s0.py._grainrate.set(32,8).add(4)
s0.px.begin.noise().gt(0.5).if(0).$else.t().noise().step(0.125)
s0.px.s.saw(0.125,0.75)
s0.p.dur.set(z.p.energy).mtr(0.25,4).btms()
// s0.e.$and.every(3)
s0.mute.noise(0,1).$gt.set(z.p.energy)
s0.solo.noise(0,1).$lt.set(z.p.energy)

s1.set({in:2,bank:'clap.808',dur:ms(1),cut:[0,2],fx0:0.1})
s1.e.reset().set('0*3 1 0*4| 0 | 0 | 0')
s1.solo.set(s0.e)

// bass
s2.set({dur:ms(4),r:ms(4),midi:2,mididelay:200,cut:2})
s2.py.n.set('Dmpent%6..*6').sub(12)
s2.p._vol.mul(0.25)
s2.px._cc2.saw(0,0.75)
s2.py._cc3.saw(1,0.1)
s2.e.reset().set(s0.e)
s2.m.reset().set(1)
s2.solo.set(s0.solo)
s2.mute.set(s0.mute)


s4.set({in:1,ba:'air',dur:ms(16),snap:q*2,i:3,lag:ms(smoothing),loop:1,
fx0:1})
s4.px._cutoff.saw(2000,7000).$mul.set(z.p.energy).mtr(0.5,1)
s4.py._res.saw(0.1,1)
s4.py._pan.saw(0.3,0.7)
s4.p.begin.saw(0,1,0,1/2)
s4.e.reset().every(q*4)
s4.solo.set(s0.e)