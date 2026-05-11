// Create reservation wizard — 4 steps, inline availability
const NewReservationWizard = ({ onClose, onCreate, t, lang }) => {
  const [step, setStep] = React.useState(0);
  const [checkIn, setCheckIn] = React.useState('2026-04-24');
  const [checkOut, setCheckOut] = React.useState('2026-04-28');
  const [guests, setGuests] = React.useState(2);
  const [unitId, setUnitId] = React.useState(null);
  const [guestId, setGuestId] = React.useState(null);
  const [newGuest, setNewGuest] = React.useState(null);
  const [notes, setNotes] = React.useState('');
  const [status, setStatus] = React.useState('confirmed');

  const push = useToast();

  const nights = nightsBetween(checkIn, checkOut);
  const selectedUnit = UNITS.find(u => u.id === unitId);
  const selectedGuest = newGuest || GUESTS.find(g => g.id === guestId);
  const pricePerNight = selectedUnit ? 620 + (selectedUnit.capacity * 90) : 0;
  const subtotal = pricePerNight * nights;
  const cleaningFee = 180;
  const total = subtotal + cleaningFee;

  const steps = [
    { id: 0, icon: 'calendar', label: t('step_dates') },
    { id: 1, icon: 'building', label: t('step_unit') },
    { id: 2, icon: 'users',    label: t('step_guest') },
    { id: 3, icon: 'check_sq', label: t('step_review') },
  ];

  const canNext = () => {
    if (step === 0) return nights > 0 && guests > 0;
    if (step === 1) return !!unitId;
    if (step === 2) return !!(guestId || newGuest);
    return true;
  };

  const handleFinish = () => {
    push(`Reserva criada · ${selectedGuest.name}`, { icon: 'check' });
    onCreate({ unitId, guestId: guestId || 'new', checkIn, checkOut, guests, status });
  };

  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="wizard" onClick={e => e.stopPropagation()}>
        <div className="wizard-head">
          <div>
            <div style={{ fontWeight: 600, fontSize: 16 }}>Nova reserva</div>
            <div className="muted" style={{ fontSize: 12.5 }}>Mar & Sal Properties · {steps[step].label}</div>
          </div>
          <button className="btn ghost icon" onClick={onClose}><Icon name="x" size={16}/></button>
        </div>

        <div className="wizard-stepper">
          {steps.map((s, i) => (
            <React.Fragment key={s.id}>
              <button className={`step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}
                onClick={() => i < step && setStep(i)}>
                <div className="step-num">
                  {i < step ? <Icon name="check" size={13}/> : <Icon name={s.icon} size={13}/>}
                </div>
                <span>{s.label}</span>
              </button>
              {i < steps.length - 1 && <div className={`step-sep ${i < step ? 'done' : ''}`}/>}
            </React.Fragment>
          ))}
        </div>

        <div className="wizard-body">
          {step === 0 && (
            <div className="wiz-step fadeIn">
              <div className="field-grid">
                <div>
                  <div className="label">Check-in</div>
                  <input className="field" type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)}/>
                </div>
                <div>
                  <div className="label">Check-out</div>
                  <input className="field" type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)}/>
                </div>
                <div>
                  <div className="label">Hóspedes</div>
                  <div className="stepper">
                    <button onClick={() => setGuests(Math.max(1, guests - 1))}>−</button>
                    <span className="mono" style={{ fontWeight: 600 }}>{guests}</span>
                    <button onClick={() => setGuests(guests + 1)}>+</button>
                  </div>
                </div>
              </div>
              <div className="muted" style={{ fontSize: 13, marginTop: 14 }}>
                <Icon name="clock" size={12}/> {nights} {t('nights')} · {fmtDate(checkIn, {lang})} → {fmtDate(checkOut, {lang})}
              </div>
              <div className="card" style={{ padding: 14, marginTop: 20, background: 'var(--panel)', border: 'none' }}>
                <div className="row gap-2">
                  <Icon name="sparkle" size={14} style={{ color: 'var(--accent)' }}/>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 13 }}>12 unidades disponíveis nesse período</div>
                    <div className="muted" style={{ fontSize: 12 }}>2 imóveis com alta demanda — considere reservar logo.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="wiz-step fadeIn">
              <div className="muted" style={{ fontSize: 13, marginBottom: 10 }}>
                Unidades com capacidade ≥ {guests} e disponíveis de {fmtDate(checkIn,{short:true,lang})} a {fmtDate(checkOut,{short:true,lang})}.
              </div>
              <div className="unit-list">
                {UNITS.filter(u => u.status === 'active' && u.capacity >= guests).slice(0, 7).map(u => {
                  const p = PROPERTIES.find(pp => pp.id === u.propertyId);
                  const price = 620 + u.capacity * 90;
                  const selected = unitId === u.id;
                  const hasConflict = u.id === 'u8';
                  return (
                    <button key={u.id} className={`unit-row ${selected?'selected':''} ${hasConflict?'disabled':''}`}
                      onClick={() => !hasConflict && setUnitId(u.id)}>
                      <div className="unit-thumb" style={{ background: `oklch(0.88 0.06 ${p.coverHue})` }}>
                        <Icon name="building" size={14} style={{ color: `oklch(0.40 0.10 ${p.coverHue})` }}/>
                      </div>
                      <div className="grow">
                        <div style={{ fontWeight: 600 }}>{u.name}</div>
                        <div className="muted" style={{ fontSize: 12 }}>{p.neighborhood} · {u.capacity} hóspedes · Wi-Fi, cozinha</div>
                      </div>
                      {hasConflict && <Pill variant="err" dot>Conflito em 22/04</Pill>}
                      <div style={{ textAlign: 'right' }}>
                        <div className="mono" style={{ fontWeight: 600 }}>R$ {price.toLocaleString('pt-BR')}</div>
                        <div className="muted" style={{ fontSize: 11 }}>por noite</div>
                      </div>
                      <div className={`radio ${selected?'on':''}`}/>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="wiz-step fadeIn">
              <div className="label" style={{ marginBottom: 8 }}>Hóspedes recentes</div>
              <div className="field-search" style={{ marginBottom: 12 }}>
                <Icon name="search" size={14}/>
                <input placeholder="Buscar por nome, email, telefone ou documento..."/>
              </div>
              <div className="guest-list">
                {GUESTS.slice(0, 5).map(g => (
                  <button key={g.id} className={`guest-row ${guestId===g.id?'selected':''}`}
                    onClick={() => { setGuestId(g.id); setNewGuest(null); }}>
                    <Avatar name={g.name} size={32}/>
                    <div className="grow">
                      <div style={{ fontWeight: 500 }}>{g.name}</div>
                      <div className="muted" style={{ fontSize: 12 }}>{g.email} · {g.phone}</div>
                    </div>
                    <div className="row gap-2">
                      {g.tags.slice(0,2).map(tg => <Pill key={tg}>{tg}</Pill>)}
                    </div>
                    <div className={`radio ${guestId===g.id?'on':''}`}/>
                  </button>
                ))}
              </div>
              <div className="divider" style={{ margin: '16px 0' }}/>
              <div className="label" style={{ marginBottom: 8 }}>Ou cadastrar novo hóspede</div>
              <div className="field-grid-2">
                <div><div className="label">Nome completo</div>
                  <input className="field" placeholder="Ex: Mariana Silva"
                    onChange={e => setNewGuest({ ...(newGuest||{}), name: e.target.value, email: newGuest?.email || '' })}/></div>
                <div><div className="label">Email</div>
                  <input className="field" placeholder="exemplo@email.com" type="email"/></div>
                <div><div className="label">Telefone</div><input className="field" placeholder="+55..."/></div>
                <div><div className="label">Documento</div><input className="field" placeholder="CPF / RG / Passaporte"/></div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="wiz-step fadeIn">
              <div className="review-grid">
                <div className="review-section">
                  <div className="label">Datas</div>
                  <div style={{ fontWeight: 600, fontSize: 16, marginTop: 4 }}>
                    {fmtDate(checkIn, {lang})} → {fmtDate(checkOut, {lang})}
                  </div>
                  <div className="muted" style={{ fontSize: 12.5 }}>{nights} {t('nights')} · {guests} hóspedes</div>
                </div>
                <div className="review-section">
                  <div className="label">Unidade</div>
                  <div style={{ fontWeight: 600, fontSize: 16, marginTop: 4 }}>{selectedUnit?.name}</div>
                  <div className="muted" style={{ fontSize: 12.5 }}>
                    {PROPERTIES.find(p=>p.id===selectedUnit?.propertyId)?.neighborhood}
                  </div>
                </div>
                <div className="review-section">
                  <div className="label">Hóspede principal</div>
                  <div style={{ fontWeight: 600, fontSize: 16, marginTop: 4 }}>{selectedGuest?.name || '—'}</div>
                  <div className="muted" style={{ fontSize: 12.5 }}>{selectedGuest?.email || ''}</div>
                </div>
                <div className="review-section">
                  <div className="label">Status inicial</div>
                  <div className="row gap-2" style={{ marginTop: 6 }}>
                    <button className={`pill ${status==='tentative'?'warn':''}`} onClick={() => setStatus('tentative')}
                      style={{ cursor: 'pointer', borderColor: status==='tentative'?'var(--warn)':'transparent' }}>
                      {t('tentative')}
                    </button>
                    <button className={`pill ${status==='confirmed'?'accent':''}`} onClick={() => setStatus('confirmed')}
                      style={{ cursor: 'pointer', borderColor: status==='confirmed'?'var(--accent)':'transparent' }}>
                      {t('confirmed')}
                    </button>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: 14, marginTop: 16 }}>
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <span className="muted">R$ {pricePerNight.toLocaleString('pt-BR')} × {nights} {t('nights')}</span>
                  <span className="mono">R$ {subtotal.toLocaleString('pt-BR')}</span>
                </div>
                <div className="row" style={{ justifyContent: 'space-between', marginTop: 6 }}>
                  <span className="muted">Taxa de limpeza</span>
                  <span className="mono">R$ {cleaningFee.toLocaleString('pt-BR')}</span>
                </div>
                <div className="divider" style={{ margin: '10px 0' }}/>
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 600 }}>Total</span>
                  <span className="mono" style={{ fontWeight: 700, fontSize: 18 }}>R$ {total.toLocaleString('pt-BR')}</span>
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <div className="label" style={{ marginBottom: 6 }}>Notas internas</div>
                <textarea className="field" rows={2} value={notes} onChange={e=>setNotes(e.target.value)}
                  placeholder="Pedidos especiais, early check-in, preferências..."/>
              </div>

              <div className="row gap-2" style={{ marginTop: 12, color: 'var(--ink-3)', fontSize: 12.5 }}>
                <Icon name="check" size={12}/> Gerar contrato automaticamente após criação
              </div>
            </div>
          )}
        </div>

        <div className="wizard-foot">
          <button className="btn" onClick={step === 0 ? onClose : () => setStep(step - 1)}>
            {step === 0 ? t('cancel') : (<><Icon name="chevronL" size={14}/>{t('back')}</>)}
          </button>
          <div className="grow"/>
          {step < 3 ? (
            <button className="btn primary" disabled={!canNext()} onClick={() => setStep(step + 1)}>
              {t('continue')}<Icon name="chevronR" size={14}/>
            </button>
          ) : (
            <button className="btn primary" onClick={handleFinish}>
              <Icon name="check" size={14}/>Criar reserva
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { NewReservationWizard });
