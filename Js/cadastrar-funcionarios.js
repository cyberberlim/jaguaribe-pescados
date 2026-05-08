const POCKETBASE_URL = 'https://pocketbase-production-bb88.up.railway.app';
const ADMIN_EMAIL    = 'danillonascimentoalves1@gmail.com';
const ADMIN_PASSWORD = '12345678Dn';

const funcionarios = [
  { nome: 'Ana Bethe',    cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Ana Paula',    cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Adriana F',    cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Arnaldo',      cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Cimeire M',    cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Cledna',       cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Cleiton',      cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Diana',        cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Elenita',      cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Eliete',       cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Eliane F',     cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Evilene',      cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Emille',       cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Jasmin',       cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Irenilde',     cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Itamara',      cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Jhonata',      cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Jaqueline',    cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Joanila',      cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Monalisa',     cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Marlene',      cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Marcivânia',   cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Maiza',        cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Marcia Fo',    cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Michelle',     cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Nayane',       cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Rosemeire F',  cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Rocida F',     cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Raquel',       cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Rosangela',    cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Sofia',        cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Sophia S',     cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Leonice',      cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Neuma',        cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Lely',         cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
  { nome: 'Jony',         cargo: 'produtor', telefone: '', pix: '', status: 'ativo' },
];

async function cadastrarTodos() {
  // Login
  const loginRes = await fetch(
    `${POCKETBASE_URL}/api/collections/_superusers/auth-with-password`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identity: ADMIN_EMAIL, password: ADMIN_PASSWORD })
    }
  );
  const login = await loginRes.json();

  if (!login.token) {
    console.error('❌ Login falhou!', login.message);
    return;
  }
  console.log('✅ Login feito!\n');

  let sucesso = 0;
  let erro = 0;

  for (const func of funcionarios) {
    const res = await fetch(
      `${POCKETBASE_URL}/api/collections/funcionarios/records`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': login.token
        },
        body: JSON.stringify(func)
      }
    );
    const data = await res.json();
    if (res.ok) {
      console.log(`✅ ${func.nome}`);
      sucesso++;
    } else {
      console.log(`❌ ${func.nome}: ${data.message}`);
      erro++;
    }
  }

  console.log(`\n🎉 Concluído! ${sucesso} cadastrados, ${erro} erros.`);
}

cadastrarTodos().catch(console.error);