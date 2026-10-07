# Brique Flow — Landing Page Design Spec

## Objetivo

Landing page de conversão single-page para o Brique Flow, um SaaS de controle de
revenda/brique (preço, custo, lucro real). Objetivo primário: visitante clica em
"Começar grátis". Objetivo secundário: usuário que já percebeu valor escolhe o
plano Vitalício (R$29,90).

Contexto completo do produto, público, objeções e tom de marca está no histórico
da conversa (documento "CONTEXTO DO SAAS — BRIQUE FLOW" fornecido pelo usuário) —
não duplicado aqui; esta spec cobre a tradução desse contexto em página.

## Assets disponíveis

- **Board de marca**: `~/Downloads/ChatGPT Image 6 de out. de 2026, 21_40_09.png`
  — logo (ícone "b" + wordmark), paleta, tipografia, variações de logo, mockups de
  produto (celular/laptop/cartão).
- **Screenshots reais do app** (Lovable preview, `preview--brick-beat-dashboard.lovable.app`),
  em `~/Desktop/Captura de Tela 2026-10-06 às 21.4*.png` (7 arquivos):
  - Dashboard: cards de métricas (Faturamento, Lucro Total, Nº de Vendas, Briques,
    Ticket Médio, Margem Média, Em Estoque, Anúncios Ativos), barra de progresso
    de faturamento, gráfico Faturamento & Lucro, donut de estoque, Vendas Recentes,
    rankings Maior Lucro / Maior Margem.
  - Produtos: tabela com busca, Status (Vendido), Compra, Venda, Lucro, Margem,
    Tempo de Venda, ações (editar/compartilhar/excluir).
  - Calculadora de Lucro: "Descubra a rentabilidade real antes de fechar negócio" —
    custos detalhados (frete, combustível, transporte, manutenção, limpeza,
    acessórios, embalagem, taxas, outros), composição do investimento, preço
    pretendido vs. preço final, resultado (lucro líquido, margem, ROI, badge de
    qualidade do lucro), simulador de oferta/contraproposta.

**Tratamento necessário antes do uso:** cortar a chrome do navegador de todas as
capturas; remover/baurrar o e-mail de teste (`bilionariosporsche@gmail.com`)
visível na sidebar em todas elas; o app mostra "BriqueFlow Pro" no header — a LP
usa "Brique Flow" (conforme brand board) para consistência com a marca aprovada.

## Sistema visual

- Fundo: `#0B0F14` · Texto principal: `#FFFFFF` · Texto secundário: `#6B7280`
- Accent/CTA: `#00E676` (hover/active: `#00B362`)
- Fonte: **Sora** (Google Fonts), bold/semibold em headlines, regular no corpo
- Logo: recriado em SVG a partir do board (ícone "b" dobrado em gradiente verde +
  wordmark "Brique" branco / "Flow" verde), já que não há arquivo vetorial à parte
- Cards: fundo levemente mais claro que o bg (~`#12161C`), borda sutil, glow verde
  discreto no hero e no card do plano Vitalício
- Mockups de produto: screenshots reais tratados dentro de frames de
  browser/device — nunca ilustração genérica ou fake

## Estrutura da página (single-page, âncoras no menu)

1. **Hero** — headline "Pare de vender no achismo. Saiba exatamente quanto você
   ganha.", subheadline curta, CTA "Começar grátis", screenshot real do Dashboard.
2. **Problema** — lista de situações reconhecíveis (achismo de preço, esquecer
   frete/embalagem, confundir faturamento com lucro, contas na calculadora).
3. **Solução** — fluxo visual Compra → Gastos → Venda → Lucro real.
4. **Funcionalidades** — 3 cards com screenshots reais: Calculadora de Lucro
   (destacando o simulador de oferta como diferencial), Dashboard, Controle de
   Produtos. Sem inflar a lista além do que o produto realmente faz.
5. **Como Funciona** — 3 passos (cadastre a operação → informe custos e preço →
   veja o lucro real).
6. **Benefícios** — foco em resultado/transformação, não em feature.
7. **Planos** — Free (R$0) / Mensal (R$9,90) / Vitalício (R$29,90, destaque
   visual sem desvalorizar os outros dois). CTA em cada card.
8. **FAQ** — accordion com as 9 perguntas do briefing (pagamento, Free, mensal,
   vitalício, cancelamento, instalação, público, mobile, dados salvos).
9. **CTA final** — reforço da proposta + botão "Começar grátis".
10. **Footer** — logo, link de contato/suporte, ano.

Copy final de cada seção é escrita na implementação seguindo a skill
`copywriting` (sem clichês de IA, sem depoimento/estatística inventada, conforme
regra explícita do briefing).

## Técnico

- Arquivos: `index.html`, `styles.css`, `script.js`, `assets/` (logo SVG,
  screenshots tratados em WebP, favicon).
- Mobile-first, breakpoints para mobile/tablet/desktop; prioridade em boa
  experiência mobile (maioria do público provavelmente acessa pelo celular).
- CTA: uma única constante (`APP_URL` no topo do `script.js`) usada por todos os
  botões "Começar grátis"/planos — hoje aponta para um placeholder (`#`), troca
  fácil quando a URL final do app estiver definida.
- FAQ como accordion em JS vanilla, sem dependências externas.
- Imagens dos screenshots otimizadas (comprimidas, WebP) e com `loading="lazy"`
  abaixo da dobra.
- Sem frameworks/build step — HTML/CSS/JS puro, hospedável em qualquer static
  host (Vercel, Netlify, Cloudflare Pages).

## Fora de escopo

- Integração real com backend/signup (apenas placeholder de link).
- Depoimentos, estatísticas de usuários, logos de clientes — proibido pelo
  briefing (seção 15).
- Variante de tema claro — brand kit define dark como identidade primária.
- Página de FAQ ou pricing separadas — tudo em uma única página com âncoras.

## Riscos / pontos abertos

- Logo será recriado em SVG a partir da imagem flat do board (não há vetor
  original) — pequenas diferenças de proporção são esperadas e aceitáveis.
- Screenshots do app são de uma build de preview (Lovable); nomes de produtos
  nas capturas (ex: "iPhone 16") são dados de teste — serão usados como estão,
  já que são dados reais de uso do produto, não fabricados para a LP.
