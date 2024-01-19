// ROOM 1
d.fetch

s6.set({midi:3,n:13})
// s6.e.once()

const { states, amps, values } = d.book_2
let hits = floor(states.length)
let smoothing = 2

z.bpm.set(180)
let loop = 3
z.t.saw(0,q*loop,0,1/loop)

states[0].map((_,i) => 
  streams[i]
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

s0.set({inst:'2',bank:'breaks.archn',_snap:q*loop,cut:[2,3],fx0:1/8,d:ms(1/4),s:0.125,cutr:ms(1/2)})
s0.p.i.random(0,16,1)
s0.p._grainsize.set(z.p.energy).mtr(1,0.125)
s0.p.dur.set(z.p.energy).mtr(0.5,4).btms()
s0.px.begin.noise().gt(0.5).if(0).$else.t().noise().step(0.125)
s0.mute.noise(0,1).$gt.set(z.p.energy)
s0.solo.noise(0,1).$lt.set(z.p.energy)

s1.set({inst:2,bank:'gm.sine',cut:[0],dur:ms(1)})
s1.p._vol.mul(0.5)
s1.p.i.random(0,12,1)
s1.p._pan.noise()
s1.px.begin.saw(0,1,1/8,1/8)
s1.px._grainsize.saw(1/6,1/16)
s1.px._grainrate.saw(6,32)
s1.py._rate.saw(1,4).mul(-1)
s1.py._level.saw()
s1.py._fx0.saw(1,0)
s1.py.a.saw(0,2).btms()
s1.p.$and.every(3)

s2.set({inst:6,dur:ms(2),r:ms(4),lforate:1,lfodepth:0,fat:0.25})
s2.p.n.set(38)
s2.p._vol.mul(0.5)
s2.e.reset().set(s0.e).$and.c().mod(loop).lt(loop - 1)
s2.m.reset().set(1)
s2.solo.set(s0.solo)
s2.mute.set(s0.mute)

s4.set({inst:1,bank:'metal.vlong1',dur:ms(4),fx0:1,fx1:1,r:ms(1),d:ms(1/4)})
s4.p.i.random(0,16,1)
s4.px.begin.saw(0,1,1/8,1/16)
s4.p.s.set(z.p.intensity).mtr(0.75,0.25)
s4.p._level.set(1).sub(s1.py._level)
s4.p._pan.set(1).sub(s1.p._pan)
