onload = () => {
  const celm = (e) => document.createElementNS('http://www.w3.org/2000/svg', e);
  const s = document.querySelector('svg');
  const vb_en = 480, vb_boy = 480,   // viewBox en ve boyu
        kırmızı = "rgb(227,10,23)",  // (bayrak projesinden)
        ay_dış_yçap = 60,     // ay dış çember yarıçapı (bayrak projesinden)
        ay_iç_yçap = 48,      // ay iç çember yarıçapı (bayrak projesinden)
        ay_dış_iç_uzk = 15,   // ay iç çember merkezinin ay dış çember merkezine uzaklığı (bayrak projesinden)

        // ay dış çember merkezinin amblem çember merkezine uzaklığı
        ay_dış_amblem_uzk =  ay_dış_yçap / Math.sin(Math.PI/5),  // 36 deg == Math.PI/5 rad

        // iç çemberin uçkur yönünde ekseni kesen noktasından bayrak eninin üçte biri uzaklıktadır (bayrak projesinden)
        yıldız_köşesi_y = vb_boy/2 - ay_dış_amblem_uzk + ay_dış_iç_uzk - ay_iç_yçap + 80 + 4,
        
        yıldız_yçap = vb_boy/2 - yıldız_köşesi_y,       // yıldız çemberinin yarıçapı
        amblem_yçap = ay_dış_amblem_uzk + ay_dış_yçap,  // amblem çemberinin yarıçapı
        kontur_yçap = ay_dış_yçap + 8,                  // kontur çemberinin yarıçapı

        // yıldızın köşe koordinatları, saat yönünde
        köşeler = [
          {x: vb_en/2, y: yıldız_köşesi_y},
          {x: vb_en/2 + Math.sin(2*Math.PI/5)*yıldız_yçap, y: vb_boy/2 - Math.cos(2*Math.PI/5)*yıldız_yçap},
          {x: vb_en/2 + Math.sin(Math.PI/5)*yıldız_yçap,   y: vb_boy/2 + Math.cos(Math.PI/5)*yıldız_yçap},
          {x: vb_en/2 - Math.sin(Math.PI/5)*yıldız_yçap,   y: vb_boy/2 + Math.cos(Math.PI/5)*yıldız_yçap},
          {x: vb_en/2 - Math.sin(2*Math.PI/5)*yıldız_yçap, y: vb_boy/2 - Math.cos(2*Math.PI/5)*yıldız_yçap}
        ];

  s.setAttribute("viewBox", `0 0 ${vb_en} ${vb_boy}`);

  // kontur çemberlerinin çizimi
  for (let i=0; i<5; ++i) {
    const tt = celm('circle');
    tt.setAttribute('cx', '50%');
    tt.setAttribute('cy', `${vb_boy/2 - ay_dış_amblem_uzk}`);
    tt.setAttribute('r', `${kontur_yçap}`);
    tt.setAttribute('fill', `${kırmızı}`);
    i && tt.setAttribute('transform', `rotate(${72*i},${vb_en/2},${vb_boy/2})`);
    s.appendChild(tt);
  }

  // ayların çizimi
  for (let i=0; i<5; ++i) {
    const dış = celm('circle');
    dış.setAttribute('cx', '50%');
    dış.setAttribute('cy', `${vb_boy/2 - ay_dış_amblem_uzk}`);
    dış.setAttribute('r', `${ay_dış_yçap}`);
    dış.setAttribute('fill', 'white');
    i && dış.setAttribute('transform', `rotate(${72*i},${vb_en/2},${vb_boy/2})`);
    s.appendChild(dış);

    const iç = celm('circle');
    iç.setAttribute('cx', '50%');
    iç.setAttribute('cy', `${vb_boy/2 - ay_dış_amblem_uzk + ay_dış_iç_uzk}`);
    iç.setAttribute('r', `${ay_iç_yçap}`);
    iç.setAttribute('fill', `${kırmızı}`);
    i && iç.setAttribute('transform', `rotate(${72*i},${vb_en/2},${vb_boy/2})`);
    s.appendChild(iç);
  }

  // ortadaki boşluğu dolduran kırmızı daire
  const tt = celm('circle');
  tt.setAttribute('cx', '50%');
  tt.setAttribute('cy', '50%');
  tt.setAttribute('r', `${yıldız_yçap}`);
  tt.setAttribute('fill', `${kırmızı}`);
  s.appendChild(tt);

  // yıldızın çizimi
  const po = celm('polygon');
  po.setAttribute('points',
    `${köşeler[0].x},${köşeler[0].y}`.concat(
    ` ${köşeler[2].x},${köşeler[2].y}`,
    ` ${köşeler[4].x},${köşeler[4].y}`,
    ` ${köşeler[1].x},${köşeler[1].y}`,
    ` ${köşeler[3].x},${köşeler[3].y}`)
  );
  po.setAttribute('fill', 'white');
  s.appendChild(po);

  // yazılar
  const df = celm('defs');
  s.appendChild(df);

  const yz_offset = 16;
  let pa = celm('path');
  pa.setAttribute('id', 'üstyazı');
  pa.setAttribute('d', `M${vb_en/2 - amblem_yçap - yz_offset},${vb_boy/2} a1,1 0 0 1 ${2*amblem_yçap + 2*yz_offset},0`);
  df.appendChild(pa);
  
  pa = celm('path');
  pa.setAttribute('id', 'altyazı');
  pa.setAttribute('d', `M${vb_en/2 - amblem_yçap - 3*yz_offset},${vb_boy/2} a1,1 0 0 0 ${2*amblem_yçap + 6*yz_offset},0`);
  df.appendChild(pa);

  let tp = celm('textPath');
  tp.setAttribute('href', `#üstyazı`);
  tp.textContent = 'TÜRKİYE  CUMHURİYETİ';
  tp.setAttribute('startOffset', '-4px');
  let tx = celm('text');
  // tx.setAttribute('style', 'font-family: serif; font-weight: bold; font-size: 6.2ex; white-space: pre;');
  tx.setAttribute('style', 'font-family: "Orelega One", serif; font-size: 52px; word-spacing: 10px; letter-spacing: -2.4px;');
  s.appendChild(tx).appendChild(tp);

  tp = celm('textPath');
  tp.setAttribute('href', '#altyazı');
  tp.innerHTML = '  \u2981  1923  <tspan style="word-spacing: normal; font-size: 56px;">50 YIL</tspan>  1973  \u2981  ';   // \u25CF
  tp.setAttribute('startOffset', '32px');
  tx = celm('text');
  // tx.setAttribute('style', 'font-family: serif; font-weight: bold; font-size: 6.6ex; white-space: pre; letter-spacing: 0.15ex;');
  tx.setAttribute('style', 'font-family: "Orelega One", serif; font-size: 52px; word-spacing: 16px; letter-spacing: 1.8px;');
  s.appendChild(tx).appendChild(tp);
}
