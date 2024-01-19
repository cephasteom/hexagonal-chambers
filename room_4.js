// ROOM 4
d.fetch

s6.set({midi:3,n:21})
// s6.e.once()

const { states, amps, values } = d.book_3
let hits = floor(states.length)
let smoothing = 4

z.bpm.set(160)
let loop = 4

states[0].map((_,i) => 
  streams[i]
    .set({cut:i,i})
    .x.v(t => s - (values[t%hits] * s))._
    .y.v(t => amps[t%hits][i] * s)._
    .e.v(t => +states[t%hits][i])._
    .m.n(streams[i].e).$and.every(2)._._
    .p._vol.cc(4 + (i * 2),10,1)
);

z.p.energy.midicc(0,10,0.75)
z.p.space.cc(1,10,0.25)
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

s0.t.saw(0,q*loop,0,1/loop)
s0.set({inst:2,bank:'breaks.hp',_snap:q*loop,cut:2,fx0:1/8,d:ms(1/4),s:0.25,cutr:ms(1/2),r:ms(2),res:0.8})
s0.p._vol.mul(0.5)
s0.p.i.random(0,6,1)
s0.p.n.set('50 Dmi%6..?*15')
s0.p.cutoff.set(z.p.energy).mtr(400,10000)
s0.p.res.set(z.p.energy).mtr(0.9,0.1)
s0.p._grainsize.set(z.p.energy).mtr(0.5,0.125)
  .$mul.noise().mtr(0.5,1)
s0.p.dur.set(z.p.energy).mtr(4,8).btms()
s0.px.begin.noise().gt(0.5).if(0).$else.t().noise().step(0.125)
s0.py._grainrate.saw(2,64,16).sub(5)
s0.py.rate.saw(0.25,0.5,0.25)
s0.e.$or.every(q*2)
s0.mute.noise(0,1).$gt.set(z.p.energy)
s0.solo.noise(0,1).$lt.set(z.p.energy)

s1.set({in:2,bank:'oriki',snap:q,lc:0.75,cut:1,dur:ms(1/16),r:0,dtime:50,dfb:0.85})
s1.p.nudge.sine(0,1/8,0,1/6).btms()
s1.px.res.noise(0.5,0.99,0,1/3)
s1.px.begin.saw(0,1/64)
s1.py._cutoff.saw(2000,5000)
s1.p._dcolour.noise(0.5,1,0,1/6)
s1.p._delay.set(1).$sub.set(s1.p._dcolour).mul(0.125)
s1.p._pan.noise(0.25,0.75,0,1/3)
s1.p._vol.mul(4)
s1.e.reset().every(1)

s2.t.saw(0,q*loop,0,1/loop)
s2.set({inst:6,r:ms(4),vol:0.125})
s2.p.dist(z.p.energy).mtr(0,0.25)
s2.p.dur(s0.p.dur)
s2.p.n.set('38')
s2.p._fat.noise().mul(0.125)
s2.p._drive.set(1).sub(s2.p._fat).mul(0.5)
s2.px.lforate.saw()
s2.py.lfodepth.saw()
s2.e.reset()
  .set(s0.e).$and.every('1*2 1?2*14')
  .$and.c().mod(loop).lt(loop - 1)
s2.m.reset().set(1)
s2.solo.set(s0.solo)
s2.mute.set(s0.mute)

s3({inst:0,fx0:1,fx1:1,level:0.5,dur:ms(2),a:ms(4),cut:3,lag:ms(4),moda:ms(4),strum:ms(1),lc:0.5})
s3.p.n('Dmi').sub(12)
s3.py._modi.saw(1,2).$mul.set(z.p.energy).mtr(1,4)
s3.solo.set(s0.solo)

s4.set({in:1,bank:'air',dur:ms(16),snap:q*2,i:3,lag:ms(smoothing),loop:1})
s4.py._pan.saw(0.3,0.7)
s4.p.begin.saw(0,1,0,1/2)
s4.p._vol.$mul.set(2)
s4.e.reset().every(q)

s5.set({in:1,bank:'atmos',dur:ms(2),i:0,lag:ms(smoothing),
fx0:1,fx1:1,cutr:ms(0.5),loop:1,level:0.25})
s5.p._vol.mtr(0,0.5)
s5.p.n.set('65|60|65')
s5.px._pan.saw()
s5.px.a.saw(0.1,4).btms()
s5.p.begin.saw(0,0.5,0,1)