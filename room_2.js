// ROOM 2
// d.fetch('https://zendata.cephasteom.co.uk/api/packets', 'hc')
// d.fetch('https://zendata.cephasteom.co.uk/api/packet', 'hc_last')

const book = d.hc[1]

z.bpm.set(180)

let loop = book.data.states.length; // length of book
let offset = 4
let smoothing = 1

let states = $set(book).fn(o => o.data.states)
let amps = $set(book).fn(o => o.data.amps)
let values = $set(book).fn(o => o.data.values)

let energy = $midicc(0,10,0.5)
let space = $cc(1,10,0.5)
let fx0level = $cc(2,10,0.5)
let fx1level = $cc(3,10,0.5)

streams.slice(0,5).map((s,i) => {
  let t = (offset = 0) => $t().add(offset).mod(loop)
  s.x.set(values).at(t((1 + i) * offset))
    .mtr(0,1,-Math.PI,Math.PI)
    .subr(1)
  s.y.set(amps).at(t((1 + i) * offset)).at(i)
  s.e.set(states).at(t((1 + i) * offset)).at(i)
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

s0.set({in:2,ba:'bd',dur:ms(4),s:0.125,grainrate:32,fx1:0.25,level:0,begin:0.9})
s0.p.fx0.set(energy).mtr(0.5,2)
s0.p.a.set(energy).mtr(2,1).btms()
s0.px.i.random(0,32,1)
s0.p.rate.set(-0.5)
s0.e.and($every('2?3*16|*2'))

s1.set({in:2,ba:'glass',s:0.25,snap:q*2,dur:ms(4),lc:0.5,a:ms(1),de:1,dtime:ms(1/16),dfb:0.8})
s1.px.dcolour.set(energy).mtr(0.5,0.75)
s1.px.i.noise(0,16,1)
s1.py.begin.random()
s1.e.and($every('1?2*16|*2').and($not(s0.e)))

s4.set({in:1,ba:'air',dur:ms(16),snap:z.q*2,i:3,lag:ms(smoothing),loop:1,
fx0:1})
s4.px._hc.set(energy).mtr(0.75,0.125)
s4.py._pan.saw(0.3,0.7)
s4.p.begin.saw(0,1,0,1/2)
s4.e.reset().every(q*4)

s5.set({in:1,ba:'gm.static',dur:ms(2),snap:z.q*32,i:54,lag:ms(smoothing),a:ms(0.25),cut:2,fx0:1,fx1:1})
s5.p._vol.mtr(0,0.1)
s5.py.n.set('Cdor%16..*16')
s5.px._pan.saw()
s5.p.begin.saw(0,0.5,0,1/4)