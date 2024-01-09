z.bpm.set(180)
let loop = 3
// z.seed('18')
// z.t.saw(0,q*loop,0,1/loop)
  // .add(q)
const { states, amps, values } = d.book_0
let hits = floor(states.length)
let smoothing = 4

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
z.p.fx0.cc(2,10,1)
z.p.fx1.cc(3,10,1)
z.e.set(1)
z.m.set(1)

fx0.set({re:1, rsize:0.75, rdamp:0.5,_track:6})
fx0.p.rtail(z.p.space)
fx0.p._level(z.p.fx0)
fx0.e(1)

fx1.set({de:1, _track: 7})
fx1.p.dtime(z.p.space).mtr(1.5,3.5).step(0.5).btms()
fx1.p.dfb(z.p.space)
fx1.p._level(z.p.fx1)
fx1.e(1)

s0.set({inst:'2',bank:'breaks.archn',_snap:q*loop,cut:[2,3],fx0:1/8,d:ms(1/4),s:0.125,cutr:ms(1/2)})
s0.p.i.random(0,16,1)
s0.p._grainsize.set(z.p.energy).mtr(1,0.125)
s0.p.dur.set(z.p.energy).mtr(0.5,4).btms()
s0.px.begin.noise().gt(0.5).if(0).$else.t().noise().step(0.125)
s0.mute.noise(0,1).$gt.set(z.p.energy)
s0.solo.noise(0,1).$lt.set(z.p.energy)

s1.set({inst:2,bank:'gm.sine',cut:[0],dur:ms(1),fx0:0.25,_grainsize:1/6,grainrate:8,locut:0.5})
s1.p._vol.mul(0.5)
s1.p.i.random(0,16,1)
s1.p._pan.noise()
s1.p.begin.saw(0,1,1/12,1/16)
s1.p.$and.every(3)

// bass
s2.set({inst:6,ring:0,dur:ms(2),r:ms(4),lforate:1,lfodepth:0,fat:0.25})
s2.p.n.set(34)
s2.p._vol.mul(0.25)
s2.py.modi.saw(0.5,5)
s2.e.reset().set(s0.e).$and.c().mod(loop).lt(loop - 1)
s2.m.reset().set(1)
s2.solo.set(s0.solo)
s2.mute.set(s0.mute)

s3.set({inst:1,bank:'metal.vlong1',dur:ms(4),fx1:1,r:ms(1),lc:0.25,d:ms(1/4),snap:q*loop})
s3.p.i.random(0,16,1)
s3.px.begin.saw(0,1,1/8,1/16)
s3.px.s.set(z.p.intensity).mtr(0.25,0.7)
s3.e.$and.not(s1.e).$and.every(7)
