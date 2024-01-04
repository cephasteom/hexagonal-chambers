const { states, amps, values } = d.book_1
let hits = floor(states.length)
let smoothing = 4
states[0].map((_,i) => 
  streams[i]
    .set({cut:i,i})
    .x.v(t => s - (values[t%hits] * s))._
    .y.v(t => amps[t%hits][i] * s)._
    .e.v(t => +states[t%hits][i])._
    .m.n(streams[i].e).$and.every(2));

z.p.energy.cc(0,11,0)
z.p.space.cc(1,11,0)
z.e.set(1)
z.m.set(1)

fx0.set({re:1, rsize:0.75, rdamp:0.5})
fx0.p.rtail(z.p.space)
// fx0.p.rsize(z.p.space)
fx0.e(1)

fx1.set({de:1})
fx1.p.dtime(z.p.space).mtr(1.5,3.5).step(0.5).btms()
fx1.p.dfb(z.p.space)
fx1.e(1)

s0.set({in:2,ba:'rumble',dur:ms(16),snap:q*16,n:48,i:4,lag:ms(smoothing),a:10,r:500,vol:0.25,fx0:1.25})
s0.px._cutoff.saw(100,400).$mul.set(z.p.energy).mtr(1,8)
s0.p._res.set(z.p.energy).mtr(0.75,0.1)
s0.px._grainrate.saw(4,12,1)
s0.py._grainsize.saw()
s0.p.begin.saw(0,1,0,1/16)
s0.e.reset().every(q*2)

s1.set({in:1,ba:'air',dur:ms(16),snap:q*2,vol:0.125,i:3,lag:ms(smoothing),loop:1,fx0:0.5})
s1.px._cutoff.saw(2000,7000).$mul.set(z.p.energy).mtr(0.5,1)
s1.py._res.saw(0.1,0.9)
s1.py._pan.saw(0.3,0.7)
s1.p.begin.saw(0,1,0,1/2)
s1.e.reset().every(q*4)

s2.set({in:1,ba:'gm.static',dur:ms(2),snap:q*16,vol:0.25,i:3,lag:ms(smoothing),a:ms(0.25),cut:2,fx0:1.25,fx1:1})
s2.px._locut.saw(0.25,0.75)
s2.py.n.v('Cdor%16..*16')
s2.px._pan.saw()
s2.p.begin.saw(0,0.5,0,1/4)

s3.set({in:2,ba:'design',vol:0.35,res:0.1})
s3.p.i.random(0,4,1)
s3.px._cutoff.saw(1000,2000).$mul.set(z.p.energy).mtr(1,4)
s3.p._res.set(z.p.energy).mtr(0.3,0.1)
s3.px._grainrate.saw(4,12,1)
s3.px._rate.saw(0.125,1,0.125)
s3.px._fx0.saw()
s3.py._fx1.saw()
s3.py._grainsize.saw()
s3.py.dur.saw(4,16,1).btms()
s3.p._pan.noise()
s3.p.begin.saw(0,0.5,0,1/8)
s3.m.reset().set(1)
// s3.mute.set(1)
s3.e.reset().every(q*4)