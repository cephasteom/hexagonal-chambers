// ROOM 5
const { states, amps, values } = d.book_1
let hits = floor(states.length)
let smoothing = 2

z.bpm.set(160)
let loop = 4

states[0].map((_,i) => 
  streams[i]
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
s0.set({inst:2,bank:'breaks.hp?breaks.archn*16',snap:q*loop,cut:[0,1],fx0:1/8,d:ms(1/4),s:0.25,cutr:ms(1/2),r:ms(2),res:0.25,lag:ms(smoothing)})
s0.p.i.random(0,6,1)
s0.px.n.set('50 Dmi%6..?*15')
s0.px._cutoff.saw().add(1).$mul.set(z.p.energy).mtr(400,5000)
s0.p.dur.set(z.p.energy).mtr(4,8).btms()
s0.px.begin.noise().gt(0.5).if(0).$else.t().noise().step(0.25)
s0.e.$or.every(q*2)

s1.set({inst:2,bank:'hh2',cut:'0?1*16',lc:0.25,dur:ms(1/16)})
s1.p.i.random(0,32,1)
s1.p.amp.random()
s1.py.pan.noise()
s1.e.$and.every(1).$and.not(s0.e)

s5.set({in:1,ba:'atmos',dur:ms(2),i:'4?5*16',lag:ms(smoothing),
  fx0:1,fx1:1,
  detune: 0.1,
  cutr:ms(0.5),
  level:0.5,
  a:ms(1/8)
})
s5.p.n.set('65|60|65')
s5.px._pan.saw()
s5.px.a.saw(0.1,4).btms()
s5.p.begin.saw(0,1,0,1)