// Stay Operations — Arrivals/Departures with check-in/out flows
const StayOps = ({ t, lang, onOpenRes }) => {
  const [tab, setTab] = React.useState('arrivals');
  const [activeFlow, setActiveFlow] = React.useState(null);
  const push = useToast();

  const arrivals = RESERVATIONS.filter(r => r.status === 'arriving_today');
  const departures = RESERVATIONS.filter(r => r.status === 'departing_today');
  const inHouse = RESERVATIONS.filter(r => r.status === 'in_house');

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">{t('stays')}</h1>
          <div className="page-subtitle">Execução de check-in, check-out e acompanhamento de hóspedes hospedados.</div>
        </div>
      </div>

      <div className="seg" style={{ alignSelf: 'flex-start' }}>
        <button className={tab==='arrivals'?'active':''} onClick={()=>setTab('arrivals')}>
          {t('arrivals_today')} · {arrivals.length}
        </button>
        <button className={tab==='departures'?'active':''} onClick={()=>setTab('departures')}>
          {t('departures_today')} · {departures.length}
        </button>
        <button className={tab==='inhouse'?'active':''} onClick={()=>setTab('inhouse')}>
          Hospedados · {inHouse.length}
        </button>
      </div>

      {tab === 'arrivals' && (
        <div className="stay-grid">
          {arrivals.map(r => {
            const g = GUESTS.find(x => x.id === r.guestId);
            const u = UNITS.find(x => x.id === r.unitId);
            const ready = r.pending.length === 0;
            return (
              <div key={r.id} className={`stay-card ${ready?'':'pending'}`}>
                <div className="stay-head">
                  <div className="row gap-3">
                    <Avatar name={g.name} size={40}/>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>{g.name}</div>
                      <div className="muted" style={{ fontSize: 12 }}>{r.code} · {r.guests} hósp · {r.source}</div>
                    </div>
                  </div>
                  <div className="stay-eta">
                    <div className="label">ETA</div>
                    <div className="mono" style={{ fontSize: 18, fontWeight: 600 }}>{r.eta}</div>
                  </div>
                </div>
                <div className="stay-info">
                  <div><Icon name="building" size={13}/> {u.name}</div>
                  <div><Icon name="calendar" size={13}/> {fmtDate(r.checkIn,{short:true,lang})} → {fmtDate(r.checkOut,{short:true,lang})}</div>
                </div>
                <div className="stay-checks">
                  <CheckRow ok label="Reserva confirmada"/>
                  <CheckRow ok={r.contractStatus === 'signed'} label="Contrato assinado"/>
                  <CheckRow ok={!r.pending.includes('id')} label="Documento do hóspede"/>
                  <CheckRow ok label="Mensagem pré-chegada enviada"/>
                  <CheckRow ok={false} pending label="Aguardando check-in"/>
                </div>
                <div className="stay-actions">
                  <button className="btn sm" onClick={() => onOpenRes(r)}>Ver detalhes</button>
                  <button className="btn sm"><Icon name="msg" size={13}/>Mensagem</button>
                  <button className="btn sm primary" onClick={() => setActiveFlow({ type: 'checkin', res: r })}>
                    <Icon name="key" size={13}/>Iniciar check-in
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'departures' && (
        <div className="stay-grid">
          {departures.map(r => {
            const g = GUESTS.find(x => x.id === r.guestId);
            const u = UNITS.find(x => x.id === r.unitId);
            const cleaningTask = TASKS.find(tk => tk.reservationId === r.id && tk.type === 'cleaning');
            return (
              <div key={r.id} className="stay-card">
                <div className="stay-head">
                  <div className="row gap-3">
                    <Avatar name={g.name} size={40}/>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>{g.name}</div>
                      <div className="muted" style={{ fontSize: 12 }}>{r.code} · {nightsBetween(r.checkIn, r.checkOut)} noites</div>
                    </div>
                  </div>
                  <div className="stay-eta">
                    <div className="label">Check-out</div>
                    <div className="mono" style={{ fontSize: 18, fontWeight: 600 }}>{r.eta || '11:00'}</div>
                  </div>
                </div>
                <div className="stay-info">
                  <div><Icon name="building" size={13}/> {u.name}</div>
                </div>
                <div className="stay-checks">
                  <CheckRow ok label="Hóspede hospedado"/>
                  <CheckRow ok={!r.pending.includes('damage_report')} label="Inspeção de danos"/>
                  <CheckRow ok={cleaningTask ? true : false} label={cleaningTask ? `Limpeza agendada (${cleaningTask.assignee})` : 'Limpeza a agendar'}/>
                </div>
                <div className="stay-actions">
                  <button className="btn sm" onClick={() => onOpenRes(r)}>Ver detalhes</button>
                  <button className="btn sm primary" onClick={() => setActiveFlow({ type: 'checkout', res: r })}>
                    <Icon name="check" size={13}/>Iniciar check-out
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'inhouse' && (
        <div className="card" style={{ padding: 0 }}>
          <table className="data-table">
            <thead><tr>
              <th>Hóspede</th><th>Unidade</th><th>Estadia</th><th>Dias restantes</th><th>Tarefas</th><th></th>
            </tr></thead>
            <tbody>
              {inHouse.map(r => {
                const g = GUESTS.find(x => x.id === r.guestId);
                const u = UNITS.find(x => x.id === r.unitId);
                const tasks = TASKS.filter(tk => tk.reservationId === r.id && tk.status !== 'done').length;
                const remaining = nightsBetween('2026-04-17', r.checkOut);
                return (
                  <tr key={r.id} onClick={() => onOpenRes(r)} className="clickable">
                    <td>
                      <div className="row gap-2"><Avatar name={g.name} size={26}/>
                        <div><div style={{fontWeight:500}}>{g.name}</div>
                          <div className="muted" style={{fontSize:11.5}}>{r.code}</div></div>
                      </div>
                    </td>
                    <td>{u.name}</td>
                    <td className="mono">{fmtDate(r.checkIn,{short:true,lang})} → {fmtDate(r.checkOut,{short:true,lang})}</td>
                    <td className="mono">{remaining}</td>
                    <td>{tasks > 0 ? <Pill variant="accent">{tasks} ativa{tasks>1?'s':''}</Pill> : <span className="muted">—</span>}</td>
                    <td><Icon name="chevronR" size={14}/></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {activeFlow && (
        <CheckInOutFlow flow={activeFlow} onClose={() => setActiveFlow(null)}
          onComplete={() => {
            push(activeFlow.type === 'checkin' ? 'Check-in concluído · mensagem de boas-vindas enviada' : 'Check-out concluído · tarefa de limpeza criada');
            setActiveFlow(null);
          }}/>
      )}
    </div>
  );
};

const CheckRow = ({ ok, pending, label }) => (
  <div className={`check-row ${ok?'ok':pending?'pending':'off'}`}>
    <div className="check-mark">
      {ok ? <Icon name="check" size={11}/> : pending ? <div className="pulse-dot"/> : <Icon name="x" size={11}/>}
    </div>
    <span>{label}</span>
  </div>
);

const CheckInOutFlow = ({ flow, onClose, onComplete }) => {
  const [step, setStep] = React.useState(0);
  const r = flow.res;
  const g = GUESTS.find(x => x.id === r.guestId);
  const u = UNITS.find(x => x.id === r.unitId);

  const isCheckIn = flow.type === 'checkin';
  const steps = isCheckIn
    ? [
        { title: 'Verificar identidade', desc: 'Confira o documento do hóspede.' },
        { title: 'Status do contrato', desc: 'Verifique assinatura ou gere o contrato.' },
        { title: 'Instruções de acesso', desc: 'Envie chaves, códigos e boas-vindas.' },
        { title: 'Finalizar check-in', desc: 'Marcar hóspede como hospedado.' },
      ]
    : [
        { title: 'Confirmar horário de saída', desc: 'Registre o horário real do check-out.' },
        { title: 'Inspeção de danos', desc: 'Registre qualquer problema encontrado.' },
        { title: 'Agendar limpeza', desc: 'Crie a tarefa para a equipe.' },
        { title: 'Finalizar check-out', desc: 'Marcar estadia como concluída.' },
      ];

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="wizard" onClick={e=>e.stopPropagation()} style={{ maxWidth: 640 }}>
        <div className="wizard-head">
          <div>
            <div style={{ fontWeight: 600, fontSize: 16 }}>
              {isCheckIn ? 'Check-in' : 'Check-out'} · {r.code}
            </div>
            <div className="muted" style={{ fontSize: 12.5 }}>{g.name} · {u.name}</div>
          </div>
          <button className="btn ghost icon" onClick={onClose}><Icon name="x" size={16}/></button>
        </div>
        <div className="progress"><div className="progress-fill" style={{ width: `${progress}%` }}/></div>

        <div className="wizard-body">
          <div className="flow-step fadeIn" key={step}>
            <div className="flow-num serif">{step + 1}</div>
            <div style={{ fontWeight: 600, fontSize: 18, margin: '8px 0 4px' }}>{steps[step].title}</div>
            <div className="muted" style={{ fontSize: 13.5, marginBottom: 18 }}>{steps[step].desc}</div>

            {isCheckIn && step === 0 && (
              <div className="col gap-3">
                <div className="field-grid-2">
                  <div><div className="label">Nome</div><input className="field" defaultValue={g.name}/></div>
                  <div><div className="label">Documento</div><input className="field" defaultValue={g.doc}/></div>
                  <div><div className="label">Email</div><input className="field" defaultValue={g.email}/></div>
                  <div><div className="label">Telefone</div><input className="field" defaultValue={g.phone}/></div>
                </div>
                <div className="upload-zone">
                  <Icon name="upload" size={16}/>
                  <span>Anexar foto/scan do documento</span>
                </div>
              </div>
            )}

            {isCheckIn && step === 1 && (
              <div className="col gap-3">
                <div className="contract-state">
                  <Icon name={r.contractStatus === 'signed' ? 'check' : 'alert'} size={16}
                    style={{ color: r.contractStatus === 'signed' ? 'var(--ok)' : 'var(--warn)' }}/>
                  <div className="grow">
                    <div style={{ fontWeight: 600 }}>
                      {r.contractStatus === 'signed' ? 'Contrato assinado' :
                       r.contractStatus === 'generated' ? 'Contrato gerado · aguardando assinatura' :
                       'Contrato ainda não gerado'}
                    </div>
                    <div className="muted" style={{ fontSize: 12 }}>
                      {r.contractStatus === 'signed' ? 'Versão 1 · assinada em 14 abr' : 'Enviar link por email e WhatsApp'}
                    </div>
                  </div>
                  {r.contractStatus !== 'signed' && <button className="btn sm primary">Enviar agora</button>}
                </div>
              </div>
            )}

            {isCheckIn && step === 2 && (
              <div className="col gap-3">
                <div className="field-grid-2">
                  <div><div className="label">Código do portão</div><input className="field mono" defaultValue="4721"/></div>
                  <div><div className="label">Código do apto</div><input className="field mono" defaultValue="2908#"/></div>
                </div>
                <div><div className="label">Instruções extras</div>
                  <textarea className="field" rows={3} defaultValue="O Wi-Fi está impresso na geladeira. Piscina aberta até 22h. Qualquer dúvida, fale com a Fernanda no WhatsApp."/>
                </div>
                <label className="row gap-2" style={{ fontSize: 13 }}>
                  <input type="checkbox" defaultChecked/> Enviar mensagem de boas-vindas automaticamente após check-in
                </label>
              </div>
            )}

            {isCheckIn && step === 3 && (
              <div className="success-state">
                <div className="success-ring"><Icon name="check" size={28}/></div>
                <div style={{ fontWeight: 600, fontSize: 16, marginTop: 14 }}>Tudo pronto</div>
                <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>
                  Ao finalizar, o status da reserva passa para <b>Hospedado</b> e a mensagem de boas-vindas é disparada.
                </div>
              </div>
            )}

            {!isCheckIn && step === 0 && (
              <div className="field-grid-2">
                <div><div className="label">Horário</div><input className="field" type="time" defaultValue={r.eta || '11:00'}/></div>
                <div><div className="label">Data</div><input className="field" type="date" defaultValue="2026-04-17"/></div>
              </div>
            )}

            {!isCheckIn && step === 1 && (
              <div className="col gap-3">
                <div className="row gap-2">
                  {['Sem problemas', 'Pequeno dano', 'Dano significativo'].map(opt => (
                    <label key={opt} className="radio-pill">
                      <input type="radio" name="damage" defaultChecked={opt==='Sem problemas'}/>
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
                <textarea className="field" rows={3} placeholder="Observações sobre o estado da unidade..."/>
              </div>
            )}

            {!isCheckIn && step === 2 && (
              <div className="col gap-3">
                <div className="field-grid-2">
                  <div><div className="label">Responsável</div>
                    <select className="field">
                      <option>Fernanda R.</option><option>Equipe Azul</option><option>Não atribuído</option>
                    </select>
                  </div>
                  <div><div className="label">Horário previsto</div>
                    <input className="field" type="time" defaultValue="13:00"/>
                  </div>
                </div>
                <div className="card" style={{ padding: 12, background: 'var(--panel)', border: 'none' }}>
                  <div className="row gap-2">
                    <Icon name="broom" size={14}/>
                    <div style={{ fontWeight: 500, fontSize: 13 }}>Limpeza padrão pós-estadia</div>
                  </div>
                  <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>
                    7 itens no checklist · tempo estimado 2h30
                  </div>
                </div>
              </div>
            )}

            {!isCheckIn && step === 3 && (
              <div className="success-state">
                <div className="success-ring"><Icon name="check" size={28}/></div>
                <div style={{ fontWeight: 600, fontSize: 16, marginTop: 14 }}>Check-out pronto para finalizar</div>
                <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>
                  Status passa para <b>Concluída</b> e a tarefa de limpeza é criada automaticamente.
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="wizard-foot">
          <button className="btn" onClick={step === 0 ? onClose : () => setStep(step - 1)}>
            {step === 0 ? 'Cancelar' : (<><Icon name="chevronL" size={14}/>Voltar</>)}
          </button>
          <div className="grow"/>
          {step < steps.length - 1 ? (
            <button className="btn primary" onClick={() => setStep(step + 1)}>
              Continuar<Icon name="chevronR" size={14}/>
            </button>
          ) : (
            <button className="btn primary" onClick={onComplete}>
              <Icon name="check" size={14}/>
              {isCheckIn ? 'Finalizar check-in' : 'Finalizar check-out'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { StayOps, CheckInOutFlow });
