// Sample data for Aja PMS — warm hospitality operations
// Context: short-term vacation rentals in Florianópolis, Brazil

const TENANTS = [
  { id: 'mar', name: 'Mar & Sal Properties', initial: 'M', city: 'Florianópolis', units: 24, color: 'oklch(0.58 0.14 40)' },
  { id: 'costao', name: 'Costão Rentals', initial: 'C', city: 'Balneário Camboriú', units: 12, color: 'oklch(0.58 0.10 210)' },
  { id: 'ilha', name: 'Ilha Boutique Stays', initial: 'I', city: 'Florianópolis', units: 8, color: 'oklch(0.58 0.10 150)' },
];

const PROPERTIES = [
  { id: 'p1', name: 'Villa Jurerê 07', neighborhood: 'Jurerê Internacional', units: 3, status: 'active', coverHue: 30 },
  { id: 'p2', name: 'Residencial Praia Mole', neighborhood: 'Praia Mole', units: 6, status: 'active', coverHue: 200 },
  { id: 'p3', name: 'Edifício Canasvieiras', neighborhood: 'Canasvieiras', units: 4, status: 'active', coverHue: 150 },
  { id: 'p4', name: 'Casa Lagoa Azul', neighborhood: 'Lagoa da Conceição', units: 2, status: 'active', coverHue: 50 },
  { id: 'p5', name: 'Cobertura Barra Sul', neighborhood: 'Barra da Lagoa', units: 1, status: 'out_of_service', coverHue: 20 },
  { id: 'p6', name: 'Conjunto Ingleses Beach', neighborhood: 'Ingleses', units: 8, status: 'active', coverHue: 260 },
];

const UNITS = [
  { id: 'u1', propertyId: 'p1', name: 'Villa Jurerê 07 — Suíte Master', capacity: 4, status: 'active' },
  { id: 'u2', propertyId: 'p1', name: 'Villa Jurerê 07 — Ala Leste', capacity: 2, status: 'active' },
  { id: 'u3', propertyId: 'p1', name: 'Villa Jurerê 07 — Ala Oeste', capacity: 2, status: 'active' },
  { id: 'u4', propertyId: 'p2', name: 'Mole 101', capacity: 4, status: 'active' },
  { id: 'u5', propertyId: 'p2', name: 'Mole 102', capacity: 4, status: 'active' },
  { id: 'u6', propertyId: 'p2', name: 'Mole 201', capacity: 6, status: 'active' },
  { id: 'u7', propertyId: 'p2', name: 'Mole 202', capacity: 6, status: 'out_of_service' },
  { id: 'u8', propertyId: 'p2', name: 'Mole 301', capacity: 2, status: 'active' },
  { id: 'u9', propertyId: 'p2', name: 'Mole 302', capacity: 2, status: 'active' },
  { id: 'u10', propertyId: 'p3', name: 'Canasvieiras A', capacity: 4, status: 'active' },
  { id: 'u11', propertyId: 'p3', name: 'Canasvieiras B', capacity: 4, status: 'active' },
  { id: 'u12', propertyId: 'p3', name: 'Canasvieiras C', capacity: 6, status: 'active' },
  { id: 'u13', propertyId: 'p3', name: 'Canasvieiras D', capacity: 2, status: 'active' },
  { id: 'u14', propertyId: 'p4', name: 'Lagoa Térreo', capacity: 6, status: 'active' },
  { id: 'u15', propertyId: 'p4', name: 'Lagoa Superior', capacity: 4, status: 'active' },
];

const GUESTS = [
  { id: 'g1', name: 'Mariana Albuquerque', email: 'mari.alb@gmail.com', phone: '+55 48 9 9812-3344', doc: 'RG 38.112.009', tags: ['VIP', 'Retornante'], lastStay: '2026-02-14' },
  { id: 'g2', name: 'João Pedro Ferraz', email: 'jpferraz@outlook.com', phone: '+55 11 9 8103-2211', doc: 'CPF 320.114.***-55', tags: ['Retornante'], lastStay: '2025-12-03' },
  { id: 'g3', name: 'Helena & Tomás Brandão', email: 'helena.brand@proton.me', phone: '+55 21 9 9402-1177', doc: 'Passport BR-EX 339', tags: ['Casal', 'Lua de mel'], lastStay: null },
  { id: 'g4', name: 'Carolina Setti', email: 'carol.setti@me.com', phone: '+55 41 9 9100-2284', doc: 'RG 49.002.814', tags: [], lastStay: '2025-09-20' },
  { id: 'g5', name: 'Rafael Nogueira', email: 'rafael.n@gmail.com', phone: '+55 48 9 8441-0082', doc: 'CPF 118.229.***-07', tags: ['Corporativo'], lastStay: '2026-01-08' },
  { id: 'g6', name: 'Família Okamoto', email: 'lucasoka@hotmail.com', phone: '+55 11 9 7720-4411', doc: 'RG 22.908.334', tags: ['Família', '4 adultos + 2 crianças'], lastStay: null },
  { id: 'g7', name: 'Beatriz Coelho', email: 'bia.coelho@gmail.com', phone: '+55 31 9 9018-4022', doc: 'CPF 800.112.***-22', tags: [], lastStay: '2025-06-11' },
  { id: 'g8', name: 'Guilherme Prado', email: 'gui.prado@gmail.com', phone: '+55 48 9 9223-1009', doc: 'RG 41.118.200', tags: ['VIP'], lastStay: '2026-03-22' },
];

// Today is 17 Apr 2026 for the demo
const TODAY = '2026-04-17';

const RESERVATIONS = [
  { id: 'r1024', code: 'AJA-1024', guestId: 'g1', unitId: 'u1', propertyId: 'p1',
    checkIn: '2026-04-17', checkOut: '2026-04-22', guests: 2, status: 'arriving_today',
    source: 'Airbnb', total: 4850, contractStatus: 'signed', eta: '15:30', pending: [] },
  { id: 'r1025', code: 'AJA-1025', guestId: 'g3', unitId: 'u4', propertyId: 'p2',
    checkIn: '2026-04-17', checkOut: '2026-04-21', guests: 2, status: 'arriving_today',
    source: 'Booking.com', total: 3120, contractStatus: 'draft', eta: '17:00', pending: ['contract', 'id'] },
  { id: 'r1026', code: 'AJA-1026', guestId: 'g5', unitId: 'u10', propertyId: 'p3',
    checkIn: '2026-04-17', checkOut: '2026-04-19', guests: 1, status: 'arriving_today',
    source: 'Direct', total: 980, contractStatus: 'signed', eta: '19:45', pending: [] },
  { id: 'r1018', code: 'AJA-1018', guestId: 'g2', unitId: 'u6', propertyId: 'p2',
    checkIn: '2026-04-12', checkOut: '2026-04-17', guests: 4, status: 'departing_today',
    source: 'Airbnb', total: 5400, contractStatus: 'signed', eta: '11:00', pending: [] },
  { id: 'r1019', code: 'AJA-1019', guestId: 'g8', unitId: 'u14', propertyId: 'p4',
    checkIn: '2026-04-10', checkOut: '2026-04-17', guests: 5, status: 'departing_today',
    source: 'Direct', total: 7800, contractStatus: 'signed', eta: '10:30', pending: ['damage_report'] },
  { id: 'r1020', code: 'AJA-1020', guestId: 'g4', unitId: 'u5', propertyId: 'p2',
    checkIn: '2026-04-14', checkOut: '2026-04-19', guests: 3, status: 'in_house',
    source: 'Booking.com', total: 3600, contractStatus: 'signed', eta: null, pending: [] },
  { id: 'r1021', code: 'AJA-1021', guestId: 'g7', unitId: 'u12', propertyId: 'p3',
    checkIn: '2026-04-15', checkOut: '2026-04-20', guests: 4, status: 'in_house',
    source: 'Airbnb', total: 4200, contractStatus: 'signed', eta: null, pending: [] },
  { id: 'r1030', code: 'AJA-1030', guestId: 'g6', unitId: 'u2', propertyId: 'p1',
    checkIn: '2026-04-18', checkOut: '2026-04-25', guests: 6, status: 'confirmed',
    source: 'Direct', total: 9200, contractStatus: 'generated', eta: '16:00', pending: ['contract'] },
  { id: 'r1031', code: 'AJA-1031', guestId: 'g3', unitId: 'u11', propertyId: 'p3',
    checkIn: '2026-04-19', checkOut: '2026-04-23', guests: 2, status: 'confirmed',
    source: 'Airbnb', total: 2800, contractStatus: 'signed', eta: '15:00', pending: [] },
  { id: 'r1032', code: 'AJA-1032', guestId: 'g1', unitId: 'u8', propertyId: 'p2',
    checkIn: '2026-04-20', checkOut: '2026-04-24', guests: 2, status: 'confirmed',
    source: 'Direct', total: 3200, contractStatus: 'draft', eta: null, pending: ['contract'] },
  { id: 'r1033', code: 'AJA-1033', guestId: 'g4', unitId: 'u15', propertyId: 'p4',
    checkIn: '2026-04-22', checkOut: '2026-04-28', guests: 3, status: 'confirmed',
    source: 'Booking.com', total: 5200, contractStatus: 'signed', eta: null, pending: [] },
  { id: 'r1034', code: 'AJA-1034', guestId: 'g2', unitId: 'u3', propertyId: 'p1',
    checkIn: '2026-04-25', checkOut: '2026-04-30', guests: 2, status: 'tentative',
    source: 'Direct', total: 3900, contractStatus: 'none', eta: null, pending: ['contract'] },
  { id: 'r1009', code: 'AJA-1009', guestId: 'g5', unitId: 'u13', propertyId: 'p3',
    checkIn: '2026-04-08', checkOut: '2026-04-12', guests: 1, status: 'completed',
    source: 'Direct', total: 1600, contractStatus: 'signed', eta: null, pending: [] },
  { id: 'r1010', code: 'AJA-1010', guestId: 'g7', unitId: 'u5', propertyId: 'p2',
    checkIn: '2026-04-05', checkOut: '2026-04-14', guests: 2, status: 'completed',
    source: 'Airbnb', total: 6300, contractStatus: 'signed', eta: null, pending: [] },
];

const TASKS = [
  { id: 't1', title: 'Limpeza pós check-out — Mole 301', unitId: 'u6', type: 'cleaning', priority: 'high',
    due: '2026-04-17T12:00', status: 'todo', assignee: 'Fernanda R.', reservationId: 'r1018',
    checklist: [{t:'Trocar roupa de cama', d:false},{t:'Limpeza profunda banheiro', d:false},{t:'Reposição amenities', d:false},{t:'Check geladeira', d:false}] },
  { id: 't2', title: 'Limpeza pós check-out — Lagoa Térreo', unitId: 'u14', type: 'cleaning', priority: 'high',
    due: '2026-04-17T11:30', status: 'todo', assignee: 'Equipe Azul', reservationId: 'r1019',
    checklist: [{t:'Inspeção de danos', d:false},{t:'Limpeza cozinha completa', d:false},{t:'Piscina', d:false}] },
  { id: 't3', title: 'Ar-condicionado sala — barulho', unitId: 'u4', type: 'maintenance', priority: 'medium',
    due: '2026-04-17T16:00', status: 'in_progress', assignee: 'Carlos M.', reservationId: 'r1020',
    checklist: [{t:'Diagnóstico',d:true},{t:'Substituir filtro',d:false},{t:'Teste final',d:false}] },
  { id: 't4', title: 'Check amenities pré check-in', unitId: 'u1', type: 'cleaning', priority: 'high',
    due: '2026-04-17T14:00', status: 'in_progress', assignee: 'Fernanda R.', reservationId: 'r1024',
    checklist: [{t:'Itens de boas-vindas',d:true},{t:'Aromatizador',d:true},{t:'Toalhas extras',d:false}] },
  { id: 't5', title: 'Vazamento pia cozinha', unitId: 'u12', type: 'maintenance', priority: 'low',
    due: '2026-04-18T10:00', status: 'todo', assignee: 'Carlos M.', reservationId: null,
    checklist: [{t:'Verificar sifão',d:false},{t:'Trocar vedação',d:false}] },
  { id: 't6', title: 'Troca de lâmpadas — escadas', unitId: 'u11', type: 'maintenance', priority: 'low',
    due: '2026-04-19T09:00', status: 'todo', assignee: 'Não atribuído', reservationId: null,
    checklist: [{t:'Comprar LED 12w',d:false},{t:'Substituir 3 pontos',d:false}] },
  { id: 't7', title: 'Limpeza profunda — Canasvieiras B', unitId: 'u11', type: 'cleaning', priority: 'medium',
    due: '2026-04-18T12:00', status: 'in_progress', assignee: 'Equipe Azul', reservationId: null,
    checklist: [{t:'Janelas',d:true},{t:'Cortinas',d:false},{t:'Estofados',d:false}] },
  { id: 't8', title: 'Inspeção piscina — Villa Jurerê', unitId: 'u1', type: 'maintenance', priority: 'medium',
    due: '2026-04-16T10:00', status: 'done', assignee: 'Carlos M.', reservationId: null,
    checklist: [{t:'pH',d:true},{t:'Cloro',d:true},{t:'Bomba',d:true}] },
  { id: 't9', title: 'Preparação check-in Okamoto', unitId: 'u2', type: 'cleaning', priority: 'medium',
    due: '2026-04-18T13:00', status: 'todo', assignee: 'Fernanda R.', reservationId: 'r1030',
    checklist: [{t:'Cama extra',d:false},{t:'Kit infantil',d:false}] },
  { id: 't10', title: 'Limpeza pós check-out Mole 101', unitId: 'u4', type: 'cleaning', priority: 'high',
    due: '2026-04-16T13:00', status: 'done', assignee: 'Fernanda R.', reservationId: 'r1010',
    checklist: [{t:'Tudo',d:true}] },
];

const USERS = [
  { id: 'usr1', name: 'Ana Beatriz Oliveira', email: 'ana@marsal.com.br', role: 'admin', status: 'active', initials: 'AO' },
  { id: 'usr2', name: 'Diego Campos', email: 'diego@marsal.com.br', role: 'ops', status: 'active', initials: 'DC' },
  { id: 'usr3', name: 'Luísa Tavares', email: 'luisa@marsal.com.br', role: 'agent', status: 'active', initials: 'LT' },
  { id: 'usr4', name: 'Fernanda Ribeiro', email: 'fernanda@marsal.com.br', role: 'staff', status: 'active', initials: 'FR' },
  { id: 'usr5', name: 'Carlos Menezes', email: 'carlos@marsal.com.br', role: 'staff', status: 'active', initials: 'CM' },
  { id: 'usr6', name: 'Rodrigo Sá', email: 'rodrigo@marsal.com.br', role: 'finance', status: 'active', initials: 'RS' },
  { id: 'usr7', name: 'Juliana Veras', email: 'ju.veras@marsal.com.br', role: 'agent', status: 'pending', initials: 'JV' },
  { id: 'usr8', name: 'Paulo Henrique', email: 'paulo@marsal.com.br', role: 'agent', status: 'inactive', initials: 'PH' },
];

const ROLES = [
  { id: 'admin', name: 'Admin', desc: 'Acesso total ao tenant' },
  { id: 'ops',   name: 'Ops Manager', desc: 'Reservas, operações, equipe' },
  { id: 'agent', name: 'Front Desk', desc: 'Check-in, guests, comms' },
  { id: 'staff', name: 'Cleaning/Maint', desc: 'Apenas tarefas atribuídas' },
  { id: 'finance', name: 'Finance', desc: 'Contratos e relatórios' },
];

// Permission matrix — true = full, 'read' = read only, false = hidden
const PERMISSIONS = {
  admin:   { dashboard: true, reservations: true, calendar: true, properties: true, stays: true, maint: true, settings: true, users: true },
  ops:     { dashboard: true, reservations: true, calendar: true, properties: true, stays: true, maint: true, settings: 'read', users: 'read' },
  agent:   { dashboard: true, reservations: true, calendar: true, properties: 'read', stays: true, maint: 'read', settings: false, users: false },
  staff:   { dashboard: 'read', reservations: 'read', calendar: false, properties: false, stays: false, maint: true, settings: false, users: false },
  finance: { dashboard: true, reservations: 'read', calendar: 'read', properties: 'read', stays: false, maint: false, settings: 'read', users: 'read' },
};

const ACTIVITY = [
  { id:'a1', at:'há 4 min', who:'Diego C.', text:'confirmou reserva', target:'AJA-1031' },
  { id:'a2', at:'há 12 min', who:'Fernanda R.', text:'concluiu tarefa', target:'Inspeção piscina — Villa Jurerê' },
  { id:'a3', at:'há 27 min', who:'Ana O.', text:'enviou contrato a', target:'Família Okamoto' },
  { id:'a4', at:'há 1h', who:'Sistema', text:'detectou atraso de check-out em', target:'AJA-1019' },
  { id:'a5', at:'há 2h', who:'Luísa T.', text:'registrou hóspede', target:'Helena & Tomás Brandão' },
  { id:'a6', at:'há 3h', who:'Carlos M.', text:'iniciou manutenção', target:'Ar-condicionado sala — Mole 101' },
];

Object.assign(window, {
  TENANTS, PROPERTIES, UNITS, GUESTS, RESERVATIONS, TASKS, USERS, ROLES, PERMISSIONS, ACTIVITY, TODAY
});
