# Implementacao: Cursos gratuitos x pagos

## Objetivo
Adicionar um indicador de gratuidade no Curso, permitir cadastro/edicao com selecao gratis/pago e ajustar exibicao e logica de preco.

## Backlog de tarefas
- [ ] **Prisma/Banco**: adicionar campo `gratuito Boolean @default(false)` no modelo `Curso`; gerar migration; atualizar seeds para preencher `gratuito`.
- [ ] **Tipos/Store**: incluir `gratuito` nos tipos compartilhados (ex.: `types/index.ts`, slices que usam `Curso`).
- [ ] **APIs**:
  - [ ] Rotas de criacao/edicao de curso (admin) aceitam `gratuito`; se `gratuito` for true, persistir preco/null; se false, validar preco > 0.
  - [ ] Rotas de listagem/detalhe (`/api/cursos/*`) retornam `gratuito`.
- [ ] **Admin UI (form curso)**:
  - [ ] Adicionar radio "Gratuito / Pago".
  - [ ] Se "Pago": mostrar input de preco (e opcional preco original/desconto).
  - [ ] Se "Gratuito": esconder/desabilitar inputs de preco e limpar valores.
- [ ] **Catalogo/Dashboard/Player**: ajustar exibicao de preco/selos (mostrar "Gratis" quando `gratuito`).
- [ ] **Validacoes/UX**: impedir submit de curso pago sem preco; manter consistencia nos toasts/mensagens.
- [ ] **QA**: rodar migration, rodar seeds se necessario, testar criacao/edicao/listagem e fluxo de player/redirecionamento.

## Notas de implementacao
- `gratuito = true` deve ignorar `preco/precoOriginal/desconto` no backend e UI.
- Campos monetarios continuam decimais; apenas aplicaveis quando pago.
- Revisar componentes reutilizados de preco para nao quebrar renderizacao quando `preco` vier `null`.
