# Setup do Sistema de Estoques - PocketBase

## Collections Necessárias

### 1. Atualizar Collection `estoque`

A collection `estoque` precisa ser atualizada para remover campos antigos e adicionar o novo campo `nome_lote`.

**Campos:**
- `id` (ID) - Auto
- `nome_lote` (Text) - Obrigatório, Index
- `status` (Select) - Opções: `ativo`, `inativo`
- `data_criacao` (DateTime) - Auto now

**Remover campos antigos:**
- `tipo_lote` (se existir)
- `gramatura` (se existir)
- `peso` (se existir)
- `data_lote` (se existir)

---

### 2. Criar Nova Collection `estoque_gramaturas`

Esta collection armazenará as gramaturas de cada lote.

**Campos:**
- `id` (ID) - Auto
- `lote_id` (Relation) - Relação com `estoque`, Obrigatório, Index
- `gramatura` (Text) - Obrigatório (ex: 12g, 15g, 20g)
- `peso` (Number) - Obrigatório, Decimal
- `data_criacao` (DateTime) - Auto now

**Índices:**
- `lote_id` (índice único ou múltiplo)
- `gramatura` (índice opcional)

---

## Como Atualizar as Collections

### Via PocketBase Admin:

1. **Acesse o PocketBase Admin:**
   - URL: `https://pocketbase-production-bb88.up.railway.app/_/`

2. **Para atualizar `estoque`:**
   - Vá para Collections
   - Clique em `estoque`
   - Remova os campos: `tipo_lote`, `gramatura`, `peso`, `data_lote`
   - Adicione o campo `nome_lote` (Text, Required)
   - Adicione o campo `status` (Select: ativo, inativo)
   - Adicione o campo `data_criacao` (DateTime, Auto now)
   - Salve as mudanças

3. **Para criar `estoque_gramaturas`:**
   - Clique em "New Collection"
   - Nome: `estoque_gramaturas`
   - Adicione os campos:
     - `lote_id` (Relation) → Relação com `estoque`
     - `gramatura` (Text)
     - `peso` (Number - decimal)
     - `data_criacao` (DateTime)
   - Salve

---

## Estrutura de Dados - Antes e Depois

### Antes (Sistema Antigo):
```
estoque:
  - id: "abc123"
  - tipo_lote: "Lote 65"
  - gramatura: "12g"
  - peso: 10.5
  - data_lote: "2025-01-15"
  
estoque:
  - id: "def456"
  - tipo_lote: "Lote 65"
  - gramatura: "15g"
  - peso: 8.3
  - data_lote: "2025-01-15"
  
estoque:
  - id: "ghi789"
  - tipo_lote: "Lote 65"
  - gramatura: "20g"
  - peso: 15.2
  - data_lote: "2025-01-15"
```

### Depois (Novo Sistema):
```
estoque:
  - id: "lote_001"
  - nome_lote: "Lote 65"
  - status: "ativo"
  - data_criacao: "2025-01-15"

estoque_gramaturas:
  - id: "grama_001"
  - lote_id: "lote_001" (relacionado com estoque)
  - gramatura: "12g"
  - peso: 10.5
  - data_criacao: "2025-01-15"

estoque_gramaturas:
  - id: "grama_002"
  - lote_id: "lote_001"
  - gramatura: "15g"
  - peso: 8.3
  - data_criacao: "2025-01-15"

estoque_gramaturas:
  - id: "grama_003"
  - lote_id: "lote_001"
  - gramatura: "20g"
  - peso: 15.2
  - data_criacao: "2025-01-15"
```

---

## Features do Novo Sistema

✅ **Cada lote é um card separado** (como na página de produção)
✅ **Dentro de cada lote:** múltiplas gramaturas com seus pesos
✅ **Adição de gramaturas:** modal dedicado
✅ **Remoção individual:** de gramaturas ou lotes inteiros
✅ **Peso total calculado:** automático por lote
✅ **Sincronização realtime:** mudanças aparecem instantaneamente
✅ **Responsivo:** funciona em mobile e desktop

---

## Funcionalidades Disponíveis

### Página de Estoque:
- **Novo Lote:** cria um lote vazio
- **Adicionar Gramatura:** abre modal para adicionar gramatura ao lote
- **Excluir Gramatura:** remove apenas a gramatura (o lote continua)
- **Excluir Lote:** remove o lote e TODAS as suas gramaturas
- **Editar Lote:** clique no nome do lote para editar

---

## Notas Importantes

1. **Migração de Dados:** Se você tem dados antigos em `estoque`, será necessário fazer uma migração manual ou via script.

2. **Relacionamento:** A collection `estoque_gramaturas` tem uma relação `1:N` com `estoque` (um lote pode ter múltiplas gramaturas).

3. **Realtime:** O sistema está configurado para atualizar em tempo real quando mudanças são feitas em qualquer dispositivo.

4. **Validação:** O sistema valida se a gramatura e peso estão preenchidos antes de salvar.

---

## Teste o Sistema

1. Acesse a página de Estoque
2. Clique em "Novo Lote"
3. Digite um nome (ex: "Lote 65")
4. Clique em "Criar Lote"
5. No card do lote, clique em "+ Gramatura"
6. Adicione gramaturas (ex: 12g com 10kg)
7. Veja o peso total atualizar automaticamente

**Enjoy! 🎉**
