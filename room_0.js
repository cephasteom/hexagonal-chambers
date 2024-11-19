// ROOM 0
// d.fetch('https://zendata.cephasteom.co.uk/api/packets', 'hc')
// d.fetch('https://zendata.cephasteom.co.uk/api/packet', 'hc_last')

const book = d.hc[0]

z.bpm.set(180)

let loop = book.data.states.length; // length of book
loop = 4 * z.q; // custom length
let section = 32 // length of larger section
let smoothing = 4

let states = $set(book).fn(o => o.data.states)
let amps = $set(book).fn(o => o.data.amps)
let values = $set(book).fn(o => o.data.values)

let energy = $saw(0,1,0,1/section)
let space = $cc(1,10,0.5)
let fx0level = $cc(2,10,1)
let fx1level = $cc(3,10,0.5)

streams.slice(0,5).map((s,i) => {
  let t = $t().mod(loop)
  s.x.set(values).at(t).mtr(0,1,-Math.PI,Math.PI).subr(1)
  s.y.set(amps).at(t).at(i)
  s.e.set(states).at(t).at(i)
  s.m.n(s.e).and($every(2))
  s.p._vol.cc(4 + (i * 2),10,1)
});

fx0.set({re:1, rsize:0.75, rdamp:0.5, _track:6})
fx0.p.rtail.set(space)
fx0.p._level.set(fx0level)
fx0.e.set(1)

fx1.set({de:1, _track:7})
fx1.p.dtime.set(space).mtr(1.5,3.5).step(0.5).btms()
fx1.p.dfb.set(space)
fx1.p._level.set(fx1level)
fx1.e.set(1)

s0.set({in:2,ba:'design',a:ms(0.125)})
s0.p.i.random(0,4).step(1)
s0.p._vol.mul(0.75)
s0.px._hc.set(energy).mtr(0.75,0.125)
s0.px._grainrate.saw(4,12).step(1)
s0.px._rate.saw(0.5,1).step(0.125)
s0.px._fx0.saw(0,0.75)
s0.py._fx1.saw(0,0.75)
s0.py._grainsize.saw(1/4,1/12)
s0.py.dur.saw(4,16).step(1).btms()
s0.p._pan.noise()
s0.p.begin.random().step(1/8)
s0.m.reset().set(1)
// s0.e.set(0)

s1.set({in:2,ba:'rumble',dur:ms(16),snap:q*16,n:49,i:2,lag:ms(smoothing),a:100,
r:500,fx0:1,level:0.25,cut:1})
s1.px._hc.set(energy).mtr(1,0.75)
s1.px._grainrate.saw(4,12,1)
s1.py._grainsize.saw()
s1.p.begin.saw(0,1,0,1/16)
s1.e.reset().every(z.q*2)

s4.set({in:1,ba:'air',dur:ms(16),snap:z.q*2,i:3,lag:ms(smoothing),loop:1,fx0:1})
s4.px._hc.set(energy).mtr(1,0.5)
s4.py._pan.saw(0.3,0.7)
s4.p.begin.saw(0,1,0,1/2)
s4.e.reset().every(z.q*4)

s5.set({in:1,ba:'gm.static',dur:ms(2),i:3,lag:ms(smoothing),cut:2,fx0:1,fx1:1})
s5.py.n.v('Cdor%16..*16')
s5.px._pan.saw()
s5.p.begin.saw(0,0.5,0,1/4)