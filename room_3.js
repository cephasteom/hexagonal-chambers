const { states, amps, values } = d.book_0
let hits = floor(states.length)
let smoothing = 4
let offset = 0

let loop = 3
z.t.saw(0,q*loop,1,1/loop);
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
z.p.space.cc(1,10,0)
z.p.fx0level.cc(2,10,1)
z.p.fx1level.cc(3,10,1)
z.e.set(1)
z.m.set(1)

fx0({reverb:1,rtail:1,vol:0.5,rsize:1,rdamp:0,rspread:1,track:0,hicut:0.5})
fx0.p.level.noise(0.5,1,0,0.433)
fx0.p.rtail(z.p.space)
fx0.p._level(z.p.fx0level)
fx0.e(1)

fx1.set({de:1, _track: 7})
fx1.p.dtime(z.p.space).mtr(1.5,3.5).step(0.5).btms()
fx1.p.dfb(z.p.space)
fx1.p._level(z.p.fx1level)
fx1.e(1);

[s3,s4,s5].map((stream,i) => {
  stream.set({inst:'[0,1]',ba:'rs.808?toms.808*16',lag:ms(smoothing),mods:0.1,moda:0,modd:ms(1),s:0.125,r:ms(2),cutoff:2500,res:0.125})
  stream.p._n('Dpro%16..?*16|*4').add(12).sub(i*12)
  stream.p._level.add(i*12).noise()
  stream.p._pan.add(i*6).sine(0,1,0,0.3)
  stream.px._modi.saw(0,2)
  stream.py._harm.saw(1,15,1)
  stream.py.fx0.saw(0.01,0.05)
  stream.px.fx1.saw(0,0.1)
  stream.p.i.random(0,16,1)
  stream.p.amp.random(0.5,1)
  stream.p._ring.random(0.25,0.5)
  stream.m.reset().set(1)
})