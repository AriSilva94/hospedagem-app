// ─────────────────────────────────────────────────────────────
// 07. TASKS (my queue)
// ─────────────────────────────────────────────────────────────
const ScTasks = () => {
  const filters = ['Minhas', 'Limpeza', 'Manutenção', 'Urgentes'];
  const todo = TASKS.filter(t => t.status==='todo');
  const inProg = TASKS.filter(t => t.status==='in_progress');
  const done = TASKS.filter(t => t.status==='done');

  const TaskRow = ({ t }) => {
    const u = UNITS.find(x=>x.id===t.unitId);
    const checked = t.checklist.filter(c=>c.d).length;
    const total = t.checklist.length;
    const due = t.due.split('T');
    return (
      <div style={{
        padding:'12px 14px', display:'flex', alignItems:'flex-start', gap:12,
      }}>
        <div style={{
          width:32, height:32, borderRadius:10, flexShrink:0, marginTop:2,
          background: t.type==='cleaning' ? 'rgba(122,139,122,0.18)' : 'rgba(76,90,107,0.18)',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <IIco n={t.type==='cleaning'?'check':'wrench'} s={16} c={t.type==='cleaning'?iosC.sage:iosC.steel}/>
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            {t.priority==='high' && <div style={{ width:6, height:6, borderRadius:3, background:iosC.err }}/>}
            <div style={{ fontSize:14, fontWeight:600, color:iosC.ink, letterSpacing:-0.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{t.title}</div>
          </div>
          <div style={{ fontSize:12, color:iosC.ink3, marginTop:2, fontVariantNumeric:'tabular-nums' }}>
            {t.assignee} · {due[1].slice(0,5)}
          </div>
          {total > 0 && t.status!=='done' && (
            <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:8 }}>
              <div style={{ flex:1 }}><IOSProgress value={(checked/total)*100}/></div>
              <div style={{ fontSize:11, color:iosC.ink3, fontVariantNumeric:'tabular-nums' }}>{checked}/{total}</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <IOSScreen>
      <IOSLargeTitle title="Tarefas" sub="8 ativas · 2 atrasadas" accessoryRight={
        <IOSPill>
          <IIco n="plus" s={16} c={iosC.accent}/>
        </IOSPill>
      }/>
      {/* Filter chips */}
      <div style={{ padding:'0 20px 14px', display:'flex', gap:8 }}>
        {filters.map((f, i) => (
          <div key={f} style={{
            padding:'7px 12px', borderRadius:999,
            background: i===0 ? iosC.ink : 'rgba(60,50,40,0.06)',
            color: i===0 ? '#fff' : iosC.ink2,
            fontSize:13, fontWeight:600, letterSpacing:-0.2,
          }}>{f}</div>
        ))}
      </div>

      <IOSSection title={`Em progresso · ${inProg.length}`}>
        <IOSCard style={{ padding:0 }}>
          {inProg.map((t, i, arr) => (
            <div key={t.id} style={{ borderBottom: i<arr.length-1 ? `0.5px solid ${iosC.line}` : 'none' }}>
              <TaskRow t={t}/>
            </div>
          ))}
        </IOSCard>
      </IOSSection>

      <IOSSection title={`A fazer · ${todo.length}`}>
        <IOSCard style={{ padding:0 }}>
          {todo.slice(0, 4).map((t, i, arr) => (
            <div key={t.id} style={{ borderBottom: i<arr.length-1 ? `0.5px solid ${iosC.line}` : 'none' }}>
              <TaskRow t={t}/>
            </div>
          ))}
        </IOSCard>
      </IOSSection>

      <IOSSection title={`Concluídas hoje · ${done.length}`}>
        <IOSCard style={{ padding:0, opacity:0.7 }}>
          {done.map((t, i, arr) => (
            <div key={t.id} style={{ borderBottom: i<arr.length-1 ? `0.5px solid ${iosC.line}` : 'none' }}>
              <TaskRow t={t}/>
            </div>
          ))}
        </IOSCard>
      </IOSSection>
    </IOSScreen>
  );
};

// ─────────────────────────────────────────────────────────────
// 08. TASK DETAIL (checklist in progress)
// ─────────────────────────────────────────────────────────────
const ScTaskDetail = () => {
  const t = TASKS.find(x => x.id === 't4'); // pre check-in, partial progress
  const u = UNITS.find(x=>x.id===t.unitId);
  const p = PROPERTIES.find(pp=>pp.id===u.propertyId);
  const done = t.checklist.filter(c=>c.d).length;
  const total = t.checklist.length;
  return (
    <IOSScreen pad={false}>
      <IOSTopBar back rightIcon="camera"/>
      <div style={{ paddingTop:110, padding:'110px 20px 0' }}>
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          <IOSChip tone="warn" size="sm">Em progresso</IOSChip>
          <IOSChip tone="accent" size="sm">Alta prioridade</IOSChip>
        </div>
        <div style={{
          fontFamily:'Instrument Serif, serif', fontSize:30, letterSpacing:-0.4,
          color:iosC.ink, lineHeight:1.1, marginTop:12, textWrap:'balance',
        }}>{t.title}</div>
        <div style={{ fontSize:14, color:iosC.ink3, marginTop:6 }}>
          {u.name} · vinculada a <span style={{ color:iosC.accent, fontWeight:600 }}>AJA-1024</span>
        </div>
      </div>

      <IOSSection title="Progresso" first>
        <IOSCard>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
            <div style={{ fontSize:13, color:iosC.ink3 }}>Checklist</div>
            <div style={{ fontSize:13, fontWeight:600, color:iosC.ink, fontVariantNumeric:'tabular-nums' }}>{done} de {total}</div>
          </div>
          <div style={{ marginTop:8 }}><IOSProgress value={(done/total)*100}/></div>
        </IOSCard>
      </IOSSection>

      <IOSSection title="Itens">
        <IOSCard style={{ padding:0 }}>
          {t.checklist.map((c, i, arr) => (
            <div key={i} style={{
              padding:'14px 16px', display:'flex', alignItems:'center', gap:12,
              borderBottom: i<arr.length-1 ? `0.5px solid ${iosC.line}` : 'none',
            }}>
              <div style={{
                width:26, height:26, borderRadius:13, flexShrink:0,
                border: c.d ? 'none' : `2px solid ${iosC.line}`,
                background: c.d ? iosC.accent : 'transparent',
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                {c.d && <IIco n="check" s={15} c="#fff"/>}
              </div>
              <div style={{
                flex:1, fontSize:15, color: c.d ? iosC.ink3 : iosC.ink,
                textDecoration: c.d ? 'line-through' : 'none',
                letterSpacing:-0.3,
              }}>{c.t}</div>
              {!c.d && <div style={{ fontSize:12, color:iosC.accent, fontWeight:600 }}>Marcar</div>}
            </div>
          ))}
        </IOSCard>
      </IOSSection>

      <IOSSection title="Adicionar">
        <div style={{ display:'flex', gap:10 }}>
          <IOSCard tight style={{ flex:1, textAlign:'center' }}>
            <IIco n="camera" s={22} c={iosC.ink2}/>
            <div style={{ fontSize:12, color:iosC.ink3, marginTop:4, fontWeight:500 }}>Foto</div>
          </IOSCard>
          <IOSCard tight style={{ flex:1, textAlign:'center' }}>
            <IIco n="doc" s={22} c={iosC.ink2}/>
            <div style={{ fontSize:12, color:iosC.ink3, marginTop:4, fontWeight:500 }}>Nota</div>
          </IOSCard>
          <IOSCard tight style={{ flex:1, textAlign:'center' }}>
            <IIco n="user" s={22} c={iosC.ink2}/>
            <div style={{ fontSize:12, color:iosC.ink3, marginTop:4, fontWeight:500 }}>Reatribuir</div>
          </IOSCard>
        </div>
      </IOSSection>

      <div style={{ padding:'20px 20px 0' }}>
        <IOSButton primary icon={<IIco n="check" s={20} c="#fff"/>}>Concluir tarefa</IOSButton>
      </div>
    </IOSScreen>
  );
};

// ─────────────────────────────────────────────────────────────
// 09. MESSAGES LIST
// ─────────────────────────────────────────────────────────────
const ScMessages = () => {
  const threads = [
    { gid:'g1', last:'Chego à praia às 15:30. Posso deixar as malas antes?', time:'14:22', unread:1, source:'Airbnb' },
    { gid:'g3', last:'Obrigada! O contrato chegou. Vou assinar no voo.', time:'13:08', unread:0, source:'Direct' },
    { gid:'g5', last:'Bom dia. A chave do portão é a mesma do apto?', time:'11:54', unread:2, source:'WhatsApp' },
    { gid:'g6', last:'Precisamos de uma cama extra para criança de 5a.', time:'ontem', unread:0, source:'Direct' },
    { gid:'g2', last:'Tudo bem por aqui. Obrigado pela recomendação do restaurante!', time:'ontem', unread:0, source:'Airbnb' },
    { gid:'g8', last:'Vou sair um pouco mais tarde, às 11h está ok?', time:'qua.', unread:0, source:'Direct' },
    { gid:'g4', last:'Já cheguei. Muito obrigada pelo mimo!', time:'ter.', unread:0, source:'Booking' },
    { gid:'g7', last:'Enviei a confirmação da transferência por email.', time:'seg.', unread:0, source:'Direct' },
  ];
  const src = { Airbnb:'#FF5A5F', 'Booking':'#003B95', WhatsApp:'#25D366', Direct:iosC.accent };
  return (
    <IOSScreen>
      <IOSLargeTitle title="Mensagens" sub="12 hóspedes · 3 não lidas" accessoryRight={
        <IOSPill><IIco n="plus" s={16} c={iosC.accent}/></IOSPill>
      }/>
      <div style={{ padding:'0 20px 14px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(60,50,40,0.06)', borderRadius:12, padding:'10px 12px' }}>
          <IIco n="search" s={16} c={iosC.ink3}/>
          <div style={{ flex:1, fontSize:15, color:iosC.ink3 }}>Buscar hóspede...</div>
        </div>
      </div>
      <div style={{ padding:'0 16px' }}>
        <IOSCard style={{ padding:0 }}>
          {threads.map((th, i, arr) => {
            const g = GUESTS.find(x=>x.id===th.gid);
            return (
              <div key={th.gid} style={{
                padding:'12px 14px', display:'flex', alignItems:'center', gap:12,
                borderBottom: i<arr.length-1 ? `0.5px solid ${iosC.line}` : 'none',
              }}>
                <div style={{ position:'relative', flexShrink:0 }}>
                  <IOSAvatar name={g.name} size={44} hue={(i*60+40)%360}/>
                  <div style={{ position:'absolute', bottom:-2, right:-2, width:14, height:14, borderRadius:7, background:src[th.source], border:'2px solid #fff' }}/>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:8 }}>
                    <div style={{ fontSize:15, fontWeight: th.unread>0 ? 700 : 600, color:iosC.ink, letterSpacing:-0.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{g.name.split(' ')[0]} {g.name.split(' ').slice(-1)}</div>
                    <div style={{ fontSize:12, color: th.unread>0 ? iosC.accent : iosC.ink4, flexShrink:0 }}>{th.time}</div>
                  </div>
                  <div style={{
                    fontSize:13, color: th.unread>0 ? iosC.ink : iosC.ink3,
                    overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
                    marginTop:2,
                  }}>{th.last}</div>
                </div>
                {th.unread>0 && (
                  <div style={{
                    background:iosC.accent, color:'#fff', minWidth:22, height:22, borderRadius:11,
                    padding:'0 7px', display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:12, fontWeight:700,
                  }}>{th.unread}</div>
                )}
              </div>
            );
          })}
        </IOSCard>
      </div>
    </IOSScreen>
  );
};

// ─────────────────────────────────────────────────────────────
// 10. CHAT DETAIL
// ─────────────────────────────────────────────────────────────
const ScChat = () => {
  const g = GUESTS.find(x=>x.id==='g1');
  const msgs = [
    { from:'them', t:'Oi! Estou a caminho de Florianópolis agora. Avião pousa às 14:30.', time:'13:42' },
    { from:'us', t:'Seja bem-vinda, Mariana! 🌊 Tudo preparado para você. Qualquer coisa, me chama.', time:'13:44' },
    { from:'them', t:'Chego à praia às 15:30. Posso deixar as malas antes?', time:'14:22', unread:true },
    { from:'suggest', t:'Claro! Aviso o porteiro para guardar com você. O check-in oficial é a partir das 15h.' },
  ];
  return (
    <IOSScreen pad={false} hasTabs={false}>
      {/* Custom nav */}
      <div style={{ position:'absolute', top:58, left:0, right:0, zIndex:10,
        padding:'6px 16px', display:'flex', alignItems:'center', gap:10,
        background:'rgba(244,241,236,0.85)', backdropFilter:'blur(16px)',
      }}>
        <IOSPill>
          <IIco n="chevR" s={14} c={iosC.accent} style={{ transform:'rotate(180deg)' }}/>
          <span style={{ color:iosC.accent, fontWeight:500 }}>Inbox</span>
        </IOSPill>
        <div style={{ flex:1, display:'flex', alignItems:'center', gap:10 }}>
          <IOSAvatar name={g.name} size={32} hue={40}/>
          <div>
            <div style={{ fontSize:14, fontWeight:600, color:iosC.ink, letterSpacing:-0.2, lineHeight:1.1 }}>Mariana A.</div>
            <div style={{ fontSize:11, color:iosC.accent }}>AJA-1024 · chegando hoje</div>
          </div>
        </div>
        <IOSPill><IIco n="user" s={16} c={iosC.accent}/></IOSPill>
      </div>

      {/* Reservation context strip */}
      <div style={{ marginTop:110, padding:'0 16px 14px' }}>
        <IOSCard tight style={{ background:iosC.accentSoft, border:'none' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <div style={{ fontSize:12, fontWeight:600, color:iosC.accentInk, letterSpacing:0.1, textTransform:'uppercase' }}>Chegando em 1h15min</div>
              <div style={{ fontSize:13, color:iosC.accentInk, marginTop:2 }}>Villa Jurerê 07 · ETA 15:30</div>
            </div>
            <IOSPill style={{ background:'#fff' }}>
              <span style={{ color:iosC.accent, fontWeight:600 }}>Ver reserva</span>
            </IOSPill>
          </div>
        </IOSCard>
      </div>

      {/* Messages */}
      <div style={{ padding:'0 16px', display:'flex', flexDirection:'column', gap:10 }}>
        <div style={{ textAlign:'center', fontSize:11, color:iosC.ink4, margin:'4px 0 6px' }}>17 abr · Airbnb</div>
        {msgs.filter(m=>m.from!=='suggest').map((m, i) => (
          <div key={i} style={{ display:'flex', justifyContent: m.from==='us'?'flex-end':'flex-start' }}>
            <div style={{
              maxWidth:'78%', padding:'9px 13px', borderRadius:20,
              background: m.from==='us' ? iosC.accent : '#fff',
              color: m.from==='us' ? '#fff' : iosC.ink,
              fontSize:15, letterSpacing:-0.3, lineHeight:1.35,
              boxShadow: m.from==='us' ? 'none' : '0 1px 2px rgba(0,0,0,0.04)',
              borderBottomRightRadius: m.from==='us' ? 6 : 20,
              borderBottomLeftRadius: m.from==='us' ? 20 : 6,
            }}>{m.t}</div>
          </div>
        ))}
        {/* AI suggestion */}
        <div style={{
          margin:'8px 0 0', padding:12,
          border:`1px dashed ${iosC.accent}`, borderRadius:16,
          background:'rgba(194,90,62,0.04)',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
            <IIco n="star" s={13} c={iosC.accent}/>
            <div style={{ fontSize:11, fontWeight:600, color:iosC.accent, letterSpacing:0.2, textTransform:'uppercase' }}>Resposta sugerida · PT</div>
          </div>
          <div style={{ fontSize:14.5, color:iosC.ink, lineHeight:1.4, letterSpacing:-0.2 }}>
            {msgs.find(m=>m.from==='suggest').t}
          </div>
          <div style={{ display:'flex', gap:8, marginTop:10 }}>
            <div style={{ padding:'6px 12px', borderRadius:999, background:iosC.accent, color:'#fff', fontSize:12, fontWeight:600 }}>Enviar</div>
            <div style={{ padding:'6px 12px', borderRadius:999, background:'rgba(60,50,40,0.06)', color:iosC.ink2, fontSize:12, fontWeight:600 }}>Editar</div>
            <div style={{ padding:'6px 12px', borderRadius:999, background:'rgba(60,50,40,0.06)', color:iosC.ink2, fontSize:12, fontWeight:600 }}>Outra sugestão</div>
          </div>
        </div>
      </div>

      {/* Composer */}
      <div style={{
        position:'absolute', bottom:34, left:0, right:0, padding:'10px 16px 12px',
        background:'rgba(244,241,236,0.88)', backdropFilter:'blur(16px)',
        borderTop:`0.5px solid ${iosC.line}`,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:34, height:34, borderRadius:17, background:'rgba(60,50,40,0.06)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <IIco n="plus" s={18} c={iosC.ink2}/>
          </div>
          <div style={{
            flex:1, height:34, borderRadius:17, background:'#fff',
            padding:'0 14px', display:'flex', alignItems:'center',
            fontSize:14, color:iosC.ink4, border:`0.5px solid ${iosC.line}`,
          }}>Escreva uma mensagem...</div>
          <div style={{ width:34, height:34, borderRadius:17, background:iosC.accent, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <IIco n="arrIn" s={16} c="#fff"/>
          </div>
        </div>
      </div>
    </IOSScreen>
  );
};

// ─────────────────────────────────────────────────────────────
// 11. SETTINGS / TENANT SWITCH
// ─────────────────────────────────────────────────────────────
const ScSettings = () => (
  <IOSScreen>
    <IOSLargeTitle title="Mais" sub="Ana B. Oliveira" />
    {/* Profile card */}
    <div style={{ padding:'0 16px' }}>
      <IOSCard>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <IOSAvatar name="Ana Beatriz Oliveira" size={56} hue={40}/>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:17, fontWeight:600, color:iosC.ink, letterSpacing:-0.3 }}>Ana B. Oliveira</div>
            <div style={{ fontSize:13, color:iosC.ink3 }}>Ops Manager · ana@marsal.com.br</div>
          </div>
          <IIco n="chevR" s={14} c={iosC.ink4}/>
        </div>
      </IOSCard>
    </div>

    {/* Tenant switcher */}
    <IOSSection title="Organização ativa">
      <IOSCard style={{ padding:0 }}>
        {TENANTS.map((t, i, arr) => {
          const active = t.id==='mar';
          return (
            <div key={t.id} style={{
              padding:'12px 14px', display:'flex', alignItems:'center', gap:12,
              borderBottom: i<arr.length-1 ? `0.5px solid ${iosC.line}` : 'none',
            }}>
              <div style={{
                width:38, height:38, borderRadius:10, flexShrink:0,
                background: t.color, color:'#fff',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:17, fontWeight:700, letterSpacing:-0.4,
              }}>{t.initial}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:15, fontWeight:600, color:iosC.ink, letterSpacing:-0.3 }}>{t.name}</div>
                <div style={{ fontSize:12, color:iosC.ink3 }}>{t.city} · {t.units} unidades</div>
              </div>
              {active ? (
                <div style={{
                  width:22, height:22, borderRadius:11, background:iosC.accent,
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <IIco n="check" s={14} c="#fff"/>
                </div>
              ) : <IIco n="chevR" s={14} c={iosC.ink4}/>}
            </div>
          );
        })}
      </IOSCard>
    </IOSSection>

    <IOSSection title="Preferências">
      <IOSCard style={{ padding:0 }}>
        {[
          { icon:'bell', label:'Notificações', detail:'Imediatas' },
          { icon:'moon', label:'Tema', detail:'Sistema' },
          { icon:'map', label:'Idioma', detail:'Português (BR)' },
          { icon:'clock', label:'Fuso horário', detail:'São Paulo (UTC-3)' },
        ].map((row, i, arr) => (
          <div key={row.label} style={{
            padding:'12px 14px', display:'flex', alignItems:'center', gap:12,
            borderBottom: i<arr.length-1 ? `0.5px solid ${iosC.line}` : 'none',
          }}>
            <div style={{
              width:32, height:32, borderRadius:9, flexShrink:0,
              background:'rgba(60,50,40,0.06)',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <IIco n={row.icon} s={17} c={iosC.ink2}/>
            </div>
            <div style={{ flex:1, fontSize:15, color:iosC.ink, letterSpacing:-0.3 }}>{row.label}</div>
            <div style={{ fontSize:14, color:iosC.ink3 }}>{row.detail}</div>
            <IIco n="chevR" s={14} c={iosC.ink4}/>
          </div>
        ))}
      </IOSCard>
    </IOSSection>

    <IOSSection title="Equipe">
      <IOSCard style={{ padding:0 }}>
        {[
          { icon:'user', label:'Minha equipe', detail:'8 membros' },
          { icon:'keys', label:'Permissões', detail:'Ops Manager' },
          { icon:'doc', label:'Modelos de contrato', detail:'3 ativos' },
        ].map((row, i, arr) => (
          <div key={row.label} style={{
            padding:'12px 14px', display:'flex', alignItems:'center', gap:12,
            borderBottom: i<arr.length-1 ? `0.5px solid ${iosC.line}` : 'none',
          }}>
            <div style={{ width:32, height:32, borderRadius:9, flexShrink:0, background:'rgba(60,50,40,0.06)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <IIco n={row.icon} s={17} c={iosC.ink2}/>
            </div>
            <div style={{ flex:1, fontSize:15, color:iosC.ink, letterSpacing:-0.3 }}>{row.label}</div>
            <div style={{ fontSize:14, color:iosC.ink3 }}>{row.detail}</div>
            <IIco n="chevR" s={14} c={iosC.ink4}/>
          </div>
        ))}
      </IOSCard>
    </IOSSection>

    <div style={{ padding:'28px 20px 0', textAlign:'center' }}>
      <div style={{ fontSize:13, color:iosC.accent, fontWeight:600 }}>Sair da conta</div>
      <div style={{ fontSize:11, color:iosC.ink4, marginTop:8 }}>Aja Field v3.8 · Build 2260</div>
    </div>
  </IOSScreen>
);

window.ScTasks = ScTasks;
window.ScTaskDetail = ScTaskDetail;
window.ScMessages = ScMessages;
window.ScChat = ScChat;
window.ScSettings = ScSettings;
