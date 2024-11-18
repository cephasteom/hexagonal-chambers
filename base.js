// d.fetch('https://zendata.cephasteom.co.uk/api/packets', 'hc')
// d.fetch('https://zendata.cephasteom.co.uk/api/packet', 'hc_last')

const book = d.hc[0]

z.bpm.set(180)

let loop = book.data.states.length; // length of book
// loop = 4 * z.q; // custom length
let section = 32 // length of larger section

let states = $set(book).fn(o => o.data.states)
let amps = $set(book).fn(o => o.data.amps)
let values = $set(book).fn(o => o.data.values)

let energy = $saw(0,1,0,1/section)
let space = $cc(1,10,0)
let fx0level = $cc(2,10,0.5)
let fx1level = $cc(3,10,0.5)

streams.slice(0,5).map((s,i) => {
  let t = $t().mod(loop)
  s.x.set(values).at(t).subr(1)
  s.y.set(amps).at(t).at(i)
  s.e.set(states).at(t).at(i)
  s.m.n(s.e).and($every(2))
  s.p._vol.cc(4 + (i * 2),10,0)
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