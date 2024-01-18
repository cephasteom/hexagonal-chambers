const { states, amps, values } = d.book_1
let hits = floor(states.length)
let smoothing = 1
let offset = 0

states[0].map((_,i) => 
  streams[i]
    .set({cut:i,i})
    .x.v(t => s - (values[(t*(1+(i*offset)))%hits] * s))._
    .y.v(t => amps[(t*(1+(i*offset)))%hits][i] * s)._
    .e.v(t => +states[(t*(1+(i*offset)))%hits][i])._
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
fx1.p.dtime(z.p.space).mtr(2,0.5).btms()
fx1.p.dfb(z.p.space)
fx1.p._level(z.p.fx1level)
fx1.e(1)

s0.set({in:2,ba:'bd',dur:ms(4),s:0.125,grainrate:32,fx1:0.25,level:0,begin:0.9,hc:0.5})
s0.p.fx0.set(z.p.energy).mtr(0.5,2)
s0.p.a.set(z.p.energy).mtr(2,1).btms()
s0.px.i.random(0,32,1)
s0.p.rate(-0.5)
s0.e.$and.every('2?3*16|*2')

s1.set({in:2,ba:'glass',s:0.25,snap:q*2,dur:ms(4),lc:0.5,a:ms(1),de:1,dtime:ms(1/16),dfb:0.8})
s1.px.dcolour.set(z.p.energy).mtr(0.5,0.75)
s1.px.i.noise(0,16,1)
s1.py.begin.random()
s1.e.$and.every('1?2*16|*2').$and.not(s0.e)

s4.set({in:1,ba:'air',dur:ms(16),snap:q*2,i:3,lag:ms(smoothing),loop:1,
fx0:1})
s4.px._cutoff.saw(2000,7000).$mul.set(z.p.energy).mtr(0.5,1)
s4.py._res.saw(0.1,0.9)
s4.py._pan.saw(0.3,0.7)
s4.p.begin.saw(0,1,0,1/2)
s4.e.reset().every(q*4)

s5.set({in:1,ba:'gm.static',dur:ms(2),snap:q*32,i:54,lag:ms(smoothing),
a:ms(0.25),cut:2,fx0:1,fx1:1,hc:0.5,lc:0.5})
s5.p._vol.mtr(0,0.1)
s5.px._locut.saw(0.25,0.75)
s5.py.n.v('Cdor%16..*16')
s5.px._pan.saw()
s5.p.begin.saw(0,0.5,0,1/4)