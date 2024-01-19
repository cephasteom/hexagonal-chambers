// ROOM 2
d.fetch
const { states, amps, values } = d.book_0
let hits = floor(states.length)
let smoothing = 4
let offset = 0

let loop = 3
z.t.saw(0,q*loop*2,1,1/(loop*2));
z.q = 16;

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
z.p.space.cc(1,10,0.5)
z.p.fx0level.cc(2,10,1)
z.p.fx1level.cc(3,10,1)
z.e.set(1)
z.m.set(1)

fx0({reverb:1,rtail:1,vol:0.5,rsize:1,rdamp:0,rspread:1,_track:6})
fx0.p.level.noise(0.5,1,0,0.433)
fx0.p.rtail(z.p.space)
fx0.p._level(z.p.fx0level)
fx0.e(1)

fx1.set({de:1, _track: 7})
fx1.p.dtime.random(0.25,2,0.5).btms()
fx1.p.dfb(z.p.space)
fx1.p._level(z.p.fx1level)
fx1.e.every(3);

[s3,s4].map((stream,i) => {
  stream.set({inst:0,bank:'ma.808?bd*16',lag:ms(smoothing),mods:0.1,moda:0,modd:ms(1),s:0.125,r:ms(4),res:0.125,cut:5})
  stream.p._n(`Daeo%16..?*16|*${loop} Bblyd%16..?*16|*${loop}`).add(0).sub(i*12)
  stream.p._level.add(i*12).noise()
  stream.p._cutoff.set(z.p.space).mtr(5000,2000)
  stream.py._pan.saw(0.2,0.8)
  stream.px._modi.saw(0,10).mul(z.p.energy)
  stream.py._harm.saw(1,(i+1),1)
  stream.py.fx0.saw(0.01,0.1)
  stream.px.fx1.saw(1,0.5)
  stream.p.i.set(0)
  stream.p.amp.random(0.25,0.75)
  stream.m.reset().set('1?0*16')
})

s5.set({in:1,bank:'gm.static',dur:ms(2),i:3,lag:ms(smoothing),fx0:1,fx1:1})
s5.py.n.v('Cdor%16..*16')
s5.px._pan.saw()
s5.p.begin.saw(0,0.5,0,1/4)