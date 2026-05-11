// Guest-facing check-in — warm, welcoming, hospitality-first
const aja2 = 'oklch(0.58 0.14 40)';
const ajaSoft2 = 'oklch(0.94 0.035 40)';
const ajaInk2 = 'oklch(0.32 0.10 40)';
const ajaDeep = 'oklch(0.25 0.05 40)';
const cream = 'oklch(0.97 0.02 50)';
const sand = 'oklch(0.94 0.03 55)';
const sage2 = 'oklch(0.58 0.07 150)';
const muted2 = 'rgba(60,60,67,0.6)';
const text2 = '#000';

const GuestStep = ({ n, total }) => (
  <div style={{ display:'flex', gap: 6, padding: '0 20px' }}>
    {Array.from({length: total}).map((_, i) => (
      <div key={i} style={{
        flex: 1, height: 3, borderRadius: 2,
        background: i < n ? aja2 : 'rgba(0,0,0,0.08)',
        transition: 'background 200ms',
      }}/>
    ))}
  </div>
);

// Screen 1 — Welcome / landing
const GuestWelcomeScreen = () => (
  <div style={{
    minHeight: '100%', position: 'relative',
    background: `
      radial-gradient(ellipse at 20% 100%, oklch(0.82 0.14 40 / 0.35), transparent 55%),
      radial-gradient(ellipse at 100% 0%, oklch(0.84 0.10 70 / 0.45), transparent 55%),
      ${cream}
    `,
    display: 'flex', flexDirection: 'column',
  }}>
    {/* Hero mark */}
    <div style={{ padding: '64px 24px 0' }}>
      <div style={{ fontFamily:'Inter', fontSize: 12, fontWeight: 600, letterSpacing: '.14em', textTransform:'uppercase', color: aja2, marginTop: 40 }}>
        Mar &amp; Sal Properties
      </div>
    </div>
    <div style={{ padding: '20px 24px 0', flex: 1 }}>
      <h1 style={{
        fontFamily: 'Instrument Serif, serif',
        fontSize: 52, fontWeight: 400, letterSpacing: -0.8, color: ajaDeep,
        lineHeight: 1.02, margin: 0, textWrap: 'balance',
      }}>
        Mariana, seja<br/>
        <em style={{ fontStyle:'italic', color: aja2 }}>bem-vinda</em> a Jurerê.
      </h1>
      <div style={{ fontFamily:'Inter', fontSize: 16, color: ajaInk2, marginTop: 20, lineHeight: 1.5, letterSpacing: -0.15, maxWidth: 320 }}>
        Seu check-in na <b>Villa Jurerê 07 — Suíte Master</b> já está agendado para hoje às 15:30.
      </div>

      {/* Stay card */}
      <div style={{
        marginTop: 32, background: 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderRadius: 20, padding: 18,
        border: '0.5px solid rgba(0,0,0,0.06)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap: 12, marginBottom: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: 'linear-gradient(135deg, oklch(0.82 0.10 40), oklch(0.68 0.14 40))',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 21V10l9-6 9 6v11" stroke="#fff" strokeOpacity=".9" strokeWidth="1.8" strokeLinejoin="round"/></svg>
          </div>
          <div>
            <div style={{ fontFamily:'Inter', fontSize: 14, fontWeight: 600, color: ajaDeep }}>Villa Jurerê 07</div>
            <div style={{ fontFamily:'Inter', fontSize: 12, color: muted2 }}>Suíte Master · Jurerê Internacional</div>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 10, paddingTop: 14, borderTop: '0.5px solid rgba(0,0,0,0.08)' }}>
          <div>
            <div style={{ fontFamily:'Inter', fontSize: 11, fontWeight: 600, color: muted2, textTransform:'uppercase', letterSpacing:'.06em' }}>Chegada</div>
            <div style={{ fontFamily:'Inter', fontSize: 15, fontWeight: 600, color: text2, marginTop: 2 }}>17 abr · 15:30</div>
          </div>
          <div>
            <div style={{ fontFamily:'Inter', fontSize: 11, fontWeight: 600, color: muted2, textTransform:'uppercase', letterSpacing:'.06em' }}>Partida</div>
            <div style={{ fontFamily:'Inter', fontSize: 15, fontWeight: 600, color: text2, marginTop: 2 }}>22 abr · 11:00</div>
          </div>
          <div>
            <div style={{ fontFamily:'Inter', fontSize: 11, fontWeight: 600, color: muted2, textTransform:'uppercase', letterSpacing:'.06em' }}>Noites</div>
            <div style={{ fontFamily:'Inter', fontSize: 15, fontWeight: 600, color: text2, marginTop: 2 }}>5</div>
          </div>
          <div>
            <div style={{ fontFamily:'Inter', fontSize: 11, fontWeight: 600, color: muted2, textTransform:'uppercase', letterSpacing:'.06em' }}>Código</div>
            <div style={{ fontFamily:'JetBrains Mono, monospace', fontSize: 14, fontWeight: 500, color: text2, marginTop: 2 }}>AJA-1024</div>
          </div>
        </div>
      </div>

      {/* What's next */}
      <div style={{ marginTop: 28, fontFamily:'Inter', fontSize: 12, fontWeight: 600, letterSpacing:'.08em', textTransform:'uppercase', color: muted2 }}>
        Antes de sua chegada
      </div>
      <div style={{ marginTop: 10, display:'flex', flexDirection:'column', gap: 8 }}>
        {[
          { n: 1, t: 'Documento de identidade', s: '~ 30 segundos' },
          { n: 2, t: 'Assinar o contrato de hospedagem', s: '~ 1 minuto' },
          { n: 3, t: 'Receber as instruções de acesso', s: 'Entregamos no dia' },
        ].map(i => (
          <div key={i.n} style={{
            display:'flex', alignItems:'center', gap: 14,
            background:'rgba(255,255,255,0.55)', borderRadius: 14,
            padding: 14,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 14, background: ajaSoft2, color: ajaInk2,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:'Instrument Serif, serif', fontSize: 18,
            }}>
              {i.n}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily:'Inter', fontSize: 14, fontWeight: 600, color: ajaDeep }}>{i.t}</div>
              <div style={{ fontFamily:'Inter', fontSize: 12, color: muted2 }}>{i.s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* CTA */}
    <div style={{ padding: '20px 20px 40px' }}>
      <div style={{
        background: aja2, color: '#fff', borderRadius: 16, padding: '18px 0',
        textAlign: 'center', fontFamily:'Inter', fontSize: 17, fontWeight: 600, letterSpacing: -0.2,
        boxShadow: '0 10px 24px oklch(0.58 0.14 40 / 0.3)',
      }}>
        Começar check-in
      </div>
      <div style={{ textAlign: 'center', fontFamily:'Inter', fontSize: 13, color: muted2, marginTop: 14 }}>
        Precisa de ajuda? <span style={{ color: aja2, fontWeight: 600 }}>Fale com a equipe</span>
      </div>
    </div>
  </div>
);

// Screen 2 — ID capture
const GuestIDScreen = () => (
  <div style={{ background: cream, minHeight: '100%', paddingBottom: 40 }}>
    <div style={{ paddingTop: 54, padding: '54px 20px 10px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
      <div style={{ display:'flex', alignItems:'center', gap: 4, color: aja2, fontFamily:'Inter', fontSize: 16, fontWeight: 500 }}>
        <svg width="10" height="16" viewBox="0 0 11 18" fill="none"><path d="M9 1L2 9l7 8" stroke={aja2} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Voltar
      </div>
      <div style={{ fontFamily:'Inter', fontSize: 13, fontWeight: 600, color: muted2 }}>Passo 1 de 3</div>
    </div>
    <div style={{ padding: '6px 0 20px' }}>
      <GuestStep n={1} total={3}/>
    </div>

    <div style={{ padding: '4px 24px 0' }}>
      <h2 style={{ fontFamily: 'Instrument Serif, serif', fontSize: 36, fontWeight: 400, color: ajaDeep, letterSpacing: -0.4, margin: 0, lineHeight: 1.1 }}>
        Fotografe seu<br/>documento.
      </h2>
      <div style={{ fontFamily:'Inter', fontSize: 14, color: ajaInk2, marginTop: 12, lineHeight: 1.5 }}>
        Usamos para verificar a identidade do hóspede principal. Seu documento é criptografado e apagado após o check-out.
      </div>
    </div>

    {/* Camera viewport placeholder */}
    <div style={{
      margin: '24px 24px 0',
      aspectRatio: '85/55',
      borderRadius: 18,
      background: `linear-gradient(135deg, ${sand}, oklch(0.88 0.04 45))`,
      border: `2px dashed oklch(0.72 0.06 40)`,
      position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Cutout corner guides */}
      {[['0','0','2'],['0','100%','3'],['100%','0','1'],['100%','100%','0']].map(([y,x,r], i) => (
        <div key={i} style={{
          position:'absolute', top: y, left: x, width: 22, height: 22,
          borderTop: `3px solid ${aja2}`, borderLeft: `3px solid ${aja2}`,
          transform: `translate(-50%, -50%) rotate(${parseInt(r)*90}deg)`,
        }}/>
      ))}
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 58, height: 58, borderRadius: 29, background: '#fff',
          display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto',
          boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M4 7h3l2-3h6l2 3h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2z" stroke={aja2} strokeWidth="1.8"/><circle cx="12" cy="13" r="4" stroke={aja2} strokeWidth="1.8"/></svg>
        </div>
        <div style={{ fontFamily:'Inter', fontSize: 13, color: ajaInk2, marginTop: 12, fontWeight: 500 }}>Toque para fotografar</div>
      </div>
    </div>

    {/* Options row */}
    <div style={{ display:'flex', gap: 10, padding: '16px 24px 0' }}>
      <div style={{ flex: 1, padding: '12px 14px', background: '#fff', borderRadius: 12, display:'flex', alignItems:'center', gap: 10, border: '0.5px solid rgba(0,0,0,0.06)' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 6h16v12H4z" stroke={aja2} strokeWidth="1.8"/><path d="M8 10h8M8 14h5" stroke={aja2} strokeWidth="1.8" strokeLinecap="round"/></svg>
        <div style={{ fontFamily:'Inter', fontSize: 13, fontWeight: 500, color: text2 }}>RG ou CNH</div>
      </div>
      <div style={{ flex: 1, padding: '12px 14px', background: '#fff', borderRadius: 12, display:'flex', alignItems:'center', gap: 10, border: '0.5px solid rgba(0,0,0,0.06)' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z" stroke={aja2} strokeWidth="1.8"/><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" stroke={aja2} strokeWidth="1.8"/></svg>
        <div style={{ fontFamily:'Inter', fontSize: 13, fontWeight: 500, color: text2 }}>Passaporte</div>
      </div>
    </div>

    {/* Extra guests */}
    <div style={{ margin: '24px 24px 0', padding: 16, background: ajaSoft2, borderRadius: 14 }}>
      <div style={{ fontFamily:'Inter', fontSize: 13, fontWeight: 600, color: ajaInk2 }}>Hóspede adicional</div>
      <div style={{ fontFamily:'Inter', fontSize: 12, color: ajaInk2, opacity: 0.7, marginTop: 3, lineHeight: 1.4 }}>
        Sua reserva tem 2 hóspedes. Adicione o documento do segundo hóspede após concluir o seu.
      </div>
    </div>
  </div>
);

// Screen 3 — Contract / signature
const GuestContractScreen = () => (
  <div style={{ background: cream, minHeight: '100%', paddingBottom: 120, position: 'relative' }}>
    <div style={{ paddingTop: 54, padding: '54px 20px 10px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
      <div style={{ display:'flex', alignItems:'center', gap: 4, color: aja2, fontFamily:'Inter', fontSize: 16, fontWeight: 500 }}>
        <svg width="10" height="16" viewBox="0 0 11 18" fill="none"><path d="M9 1L2 9l7 8" stroke={aja2} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Voltar
      </div>
      <div style={{ fontFamily:'Inter', fontSize: 13, fontWeight: 600, color: muted2 }}>Passo 2 de 3</div>
    </div>
    <div style={{ padding: '6px 0 20px' }}>
      <GuestStep n={2} total={3}/>
    </div>
    <div style={{ padding: '0 24px' }}>
      <h2 style={{ fontFamily:'Instrument Serif, serif', fontSize: 34, fontWeight: 400, color: ajaDeep, letterSpacing: -0.4, margin: 0, lineHeight: 1.1 }}>
        Contrato de<br/>hospedagem.
      </h2>
      <div style={{ fontFamily:'Inter', fontSize: 14, color: ajaInk2, marginTop: 12, lineHeight: 1.5 }}>
        Revise as condições abaixo e assine para concluir.
      </div>
    </div>

    {/* Contract card */}
    <div style={{ margin: '20px 20px 0', background: '#fff', borderRadius: 18, padding: 18, border: '0.5px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
      <div style={{ fontFamily:'Instrument Serif, serif', fontSize: 22, color: ajaDeep, letterSpacing: -0.2 }}>
        Villa Jurerê 07 — Suíte Master
      </div>
      <div style={{ fontFamily:'JetBrains Mono, monospace', fontSize: 11, color: muted2, marginTop: 2 }}>
        AJA-1024 · 5 noites · R$ 4.850,00
      </div>
      <div style={{ borderTop: '0.5px solid rgba(0,0,0,0.08)', marginTop: 14, paddingTop: 14 }}>
        {[
          ['Check-in', 'A partir das 15:00 · 17 abr'],
          ['Check-out', 'Até às 11:00 · 22 abr'],
          ['Hóspedes', '2 adultos'],
          ['Caução', 'R$ 500,00 (bloqueio)'],
          ['Política', 'Cancelamento flexível'],
        ].map(([l, v], i, arr) => (
          <div key={l} style={{
            display:'flex', justifyContent:'space-between',
            padding: '10px 0',
            borderBottom: i < arr.length-1 ? '0.5px solid rgba(0,0,0,0.05)' : 'none',
          }}>
            <span style={{ fontFamily:'Inter', fontSize: 13, color: muted2 }}>{l}</span>
            <span style={{ fontFamily:'Inter', fontSize: 13, color: text2, fontWeight: 500 }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 14, padding: '10px 12px', background: ajaSoft2,
        borderRadius: 10, fontFamily:'Inter', fontSize: 12, color: ajaInk2, lineHeight: 1.45,
      }}>
        Regras da casa: não é permitido fumar, festas ou animais. Check-out tardio sujeito a taxa.
      </div>
    </div>

    {/* Signature pad */}
    <div style={{ margin: '20px 20px 0' }}>
      <div style={{ fontFamily:'Inter', fontSize: 12, fontWeight: 600, color: muted2, textTransform:'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>
        Sua assinatura
      </div>
      <div style={{
        height: 120, background: '#fff', borderRadius: 14,
        border: `0.5px solid rgba(0,0,0,0.08)`,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start',
        padding: 16, position: 'relative', overflow: 'hidden',
      }}>
        {/* The signature itself — hand-drawn SVG */}
        <svg viewBox="0 0 320 80" style={{ position:'absolute', inset: 0, width: '100%', height: '100%' }}>
          <path d="M24 54 C 36 30, 50 22, 60 40 S 80 60, 96 36 L 100 52 M 108 32 c 6 -4, 14 2, 10 10 s -14 4, -12 -6 M 132 46 l 8 -14 m -6 6 h 10 M 158 44 q 8 -16 18 0 M 182 48 c 10 -18, 24 -14, 22 4 M 218 42 q 6 -10 14 0" stroke={ajaDeep} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 252 42 c 6 6, 18 -6, 16 8 c -2 10, -14 6, -16 -2 M 284 38 l 10 14 M 296 36 l -12 18" stroke={ajaDeep} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div style={{ position:'absolute', bottom: 8, right: 14, fontFamily:'Inter', fontSize: 11, color: muted2 }}>
          Toque para apagar
        </div>
        <div style={{ position:'absolute', bottom: 34, left: 16, right: 16, height: 0.5, background: 'rgba(0,0,0,0.2)' }}/>
        <div style={{ position:'absolute', bottom: 20, left: 16, fontFamily:'Inter', fontSize: 10, color: muted2 }}>
          × Assine acima
        </div>
      </div>
    </div>

    <div style={{ display:'flex', gap: 10, padding: '14px 20px 0' }}>
      <div style={{ width: 20, height: 20, borderRadius: 5, background: aja2, display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0, marginTop: 1 }}>
        <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5l3.5 3.5L11 1" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <div style={{ fontFamily:'Inter', fontSize: 13, color: ajaInk2, lineHeight: 1.4 }}>
        Eu li e aceito os termos. Autorizo o bloqueio de R$ 500,00 como caução.
      </div>
    </div>

    {/* Fixed CTA */}
    <div style={{
      position:'absolute', bottom: 0, left: 0, right: 0,
      padding: '14px 20px 34px',
      background: `linear-gradient(to top, ${cream} 70%, transparent)`,
    }}>
      <div style={{
        background: aja2, color: '#fff', borderRadius: 16, padding: '18px 0',
        textAlign: 'center', fontFamily:'Inter', fontSize: 17, fontWeight: 600, letterSpacing: -0.2,
        boxShadow: '0 10px 24px oklch(0.58 0.14 40 / 0.3)',
      }}>
        Confirmar e assinar
      </div>
    </div>
  </div>
);

// Screen 4 — Keys / arrival instructions (post-verify)
const GuestKeysScreen = () => (
  <div style={{
    minHeight: '100%', position: 'relative',
    background: `
      radial-gradient(ellipse at 50% 0%, oklch(0.88 0.08 40 / 0.6), transparent 55%),
      ${cream}
    `,
    paddingBottom: 40,
  }}>
    <div style={{ paddingTop: 54, padding: '54px 20px 20px', display:'flex', alignItems:'center', justifyContent:'flex-end' }}>
      <div style={{ fontFamily:'Inter', fontSize: 13, fontWeight: 600, color: sage2, display:'flex', alignItems:'center', gap: 6 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill={sage2}/><path d="M7 12l3 3 7-7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"/></svg>
        Check-in pronto
      </div>
    </div>

    <div style={{ padding: '0 24px', textAlign: 'center' }}>
      <div style={{ fontFamily:'Inter', fontSize: 12, fontWeight: 600, letterSpacing: '.14em', textTransform:'uppercase', color: aja2 }}>
        Suas chaves
      </div>
      <h2 style={{ fontFamily:'Instrument Serif, serif', fontSize: 40, fontWeight: 400, color: ajaDeep, letterSpacing: -0.5, margin: '10px 0 0', lineHeight: 1.05, textWrap: 'balance' }}>
        Villa Jurerê 07<br/>
        <em style={{ fontStyle:'italic', color: aja2 }}>te espera.</em>
      </h2>
    </div>

    {/* Code card — hero */}
    <div style={{ margin: '28px 24px 0', background:'#fff', borderRadius: 22, padding: 24, boxShadow: '0 8px 24px rgba(0,0,0,0.05)', border: '0.5px solid rgba(0,0,0,0.04)' }}>
      <div style={{ fontFamily:'Inter', fontSize: 12, fontWeight: 600, letterSpacing:'.08em', textTransform:'uppercase', color: muted2, textAlign:'center' }}>
        Código da fechadura
      </div>
      <div style={{
        marginTop: 14,
        fontFamily:'JetBrains Mono, monospace', fontSize: 56, fontWeight: 500, color: ajaDeep,
        letterSpacing: 10, textAlign:'center', lineHeight: 1,
      }}>
        2847
      </div>
      <div style={{ fontFamily:'Inter', fontSize: 12, color: muted2, textAlign:'center', marginTop: 10 }}>
        Ativo a partir das 15:00 · válido até 22 abr
      </div>
      <div style={{
        marginTop: 18, padding: '12px 14px',
        background: ajaSoft2, borderRadius: 12,
        display:'flex', alignItems:'center', gap: 10,
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M12 2L3 7v6c0 5 4 9 9 9s9-4 9-9V7l-9-5z" stroke={ajaInk2} strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke={ajaInk2} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <div style={{ fontFamily:'Inter', fontSize: 12, color: ajaInk2, lineHeight: 1.4 }}>
          Digite o código no teclado da porta principal e pressione <b>✓</b>.
        </div>
      </div>
    </div>

    {/* Address + map placeholder */}
    <div style={{ margin: '14px 24px 0', background:'#fff', borderRadius: 18, overflow: 'hidden', border: '0.5px solid rgba(0,0,0,0.04)' }}>
      <div style={{
        height: 120,
        background: `
          linear-gradient(180deg, oklch(0.92 0.04 200), oklch(0.86 0.05 180)),
          oklch(0.90 0.04 200)
        `,
        position:'relative',
      }}>
        {/* Fake streets */}
        <svg style={{ position:'absolute', inset: 0 }} viewBox="0 0 340 120" preserveAspectRatio="none">
          <path d="M0 80 Q 100 60, 180 75 T 340 70" stroke="#fff" strokeWidth="6" fill="none" opacity="0.8"/>
          <path d="M80 0 L 110 120" stroke="#fff" strokeWidth="4" fill="none" opacity="0.6"/>
          <path d="M220 0 L 250 120" stroke="#fff" strokeWidth="4" fill="none" opacity="0.6"/>
          <circle cx="190" cy="55" r="14" fill={aja2}/>
          <circle cx="190" cy="55" r="14" fill="none" stroke={aja2} strokeOpacity="0.3" strokeWidth="12"/>
          <path d="M190 50v-8" stroke="#fff" strokeWidth="2"/>
        </svg>
      </div>
      <div style={{ padding: 14, display:'flex', alignItems:'center', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily:'Inter', fontSize: 14, fontWeight: 600, color: text2 }}>Rua dos Pelicanos, 07</div>
          <div style={{ fontFamily:'Inter', fontSize: 12, color: muted2 }}>Jurerê Internacional, Florianópolis</div>
        </div>
        <div style={{ padding: '8px 14px', borderRadius: 10, background: ajaSoft2, color: ajaInk2, fontFamily:'Inter', fontSize: 13, fontWeight: 600 }}>
          Rota
        </div>
      </div>
    </div>

    {/* Quick actions */}
    <div style={{ padding: '16px 24px 0', display:'grid', gridTemplateColumns:'1fr 1fr', gap: 10 }}>
      {[
        { l: 'Wi-Fi', v: 'MarSal-Guest', ic: <><path d="M2 8.5C5.5 5.5 10 4 12 4s6.5 1.5 10 4.5M5 12.5c2.5-2 5-3 7-3s4.5 1 7 3M8.5 16c1.5-1 2.5-1.5 3.5-1.5s2 .5 3.5 1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="19" r="1.3" fill="currentColor"/></> },
        { l: 'Guia', v: 'Praia, cafés, mercados', ic: <><path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1.8"/><path d="M4 9h16M9 4v16" stroke="currentColor" strokeWidth="1.8"/></> },
      ].map(a => (
        <div key={a.l} style={{
          padding: 14, background: '#fff', borderRadius: 14, border: '0.5px solid rgba(0,0,0,0.04)',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ color: aja2 }}>
            {a.ic}
          </svg>
          <div style={{ fontFamily:'Inter', fontSize: 14, fontWeight: 600, color: text2, marginTop: 10 }}>{a.l}</div>
          <div style={{ fontFamily:'Inter', fontSize: 12, color: muted2, marginTop: 2 }}>{a.v}</div>
        </div>
      ))}
    </div>

    <div style={{ padding: '16px 24px 0' }}>
      <div style={{
        background: '#fff', borderRadius: 14, padding: '14px 16px',
        display:'flex', alignItems:'center', gap: 12,
        border: '0.5px solid rgba(0,0,0,0.04)',
      }}>
        <div style={{ width: 38, height: 38, borderRadius: 19, background: 'oklch(0.88 0.05 40)', color: ajaInk2, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Inter', fontSize: 13, fontWeight: 700 }}>LT</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily:'Inter', fontSize: 14, fontWeight: 600, color: text2 }}>Luísa · sua anfitriã</div>
          <div style={{ fontFamily:'Inter', fontSize: 12, color: muted2 }}>Disponível das 8h às 22h</div>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: 18, background: sage2, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 5c0 9 6 15 15 15l2-4-5-2-2 2c-3 0-6-3-6-6l2-2-2-5-4 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="currentColor"/></svg>
        </div>
      </div>
    </div>
  </div>
);

Object.assign(window, { GuestWelcomeScreen, GuestIDScreen, GuestContractScreen, GuestKeysScreen });
