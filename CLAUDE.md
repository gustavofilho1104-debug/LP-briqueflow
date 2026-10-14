# Brique Flow (LP de vendas)

Landing page de vendas do BriqueFlow Pro, controle de revenda para quem faz "brique" no Marketplace do Facebook. Textos em português do Brasil.

O app em si é outro repositório (`brick-beat-dashboard`, pasta `~/brique flow SAAS`), com o próprio `CLAUDE.md`.

## Conhecer o app antes de escrever

- A pasta do app está liberada só para leitura (`.claude/settings.json`: `additionalDirectories` + `deny` de edição). Nunca editar o app daqui, nem por comando no terminal.
- Antes de escrever ou mudar texto, prometer funcionalidade ou citar número (preço, limite, prazo), ler `~/brique flow SAAS/CLAUDE.md`. Ele é a fonte da verdade do que o app faz. Para detalhes de uma tela, ler o código dela em `src/pages/` e `src/components/`.
- Se este arquivo e o do app discordarem sobre o que o app faz, vale o do app.

## Onde roda

- **Cloudflare Pages:** projeto `briqueflowpro`, plano grátis (permite uso comercial). Produção: https://briqueflowpro.pages.dev. Cada push na `main` faz deploy.
- Build: `mkdir -p dist && cp -r index.html script.js styles.css assets dist/`, saída `dist`. Só esses arquivos vão ao ar. `docs/` e `design-system/` ficam fora de propósito (são anotações internas). Arquivo novo que a página usa precisa entrar nesse comando, no painel da Cloudflare.
- Saiu da Vercel (o plano Hobby proíbe uso comercial). Não voltar para lá.

## Estrutura

HTML, CSS e JS puros, sem npm. A única biblioteca é o GSAP, carregado do cdnjs no `index.html`.

- `index.html`: a página inteira. Seções: hero, benefícios, problema, solução, funcionalidades, como funciona, planos, FAQ, CTA final.
- `styles.css`: estilos, mobile-first.
- `script.js`: ano do rodapé, menu mobile, botão fixo de compra no celular (`.sticky-cta`, aparece depois do topo e some nos planos, no CTA final e no rodapé), cabeçalho mais sólido ao rolar, motion de rolagem (GSAP), accordion do FAQ e `APP_URL`. Todo link com a classe `js-app-link` recebe `APP_URL` (hoje `https://briqueflow.pages.dev/login`).
- Motion: a entrada do topo é CSS (`styles.css`), pra rodar no primeiro quadro sem piscar enquanto o GSAP carrega. O resto é GSAP com `once: true` (revela uma vez e devolve o elemento ao CSS). Tudo desligado para quem pede menos movimento no sistema. Animar só `transform` e `opacity`; o pulso dos botões fica em `::before`/`::after` por isso.
- Cabeçalho: menu completo só a partir de 1024px (abaixo disso, hambúrguer). O botão "Ver planos" do topo aparece a partir de 600px.
- `assets/images/og-image.jpg`: prévia do link no WhatsApp/Facebook (1200x630). Sem preço de propósito, pra não ficar velha quando o preço mudar.
- `assets/images/`: logo e screenshots reais do app (`.webp`). Cada print tem duas versões num `<picture>`: a de computador (`app-*.webp`, janela de navegador) e a de celular (`app-*-mobile.webp`, moldura de aparelho), trocadas abaixo de 760px.
- `design-system/brique-flow/MASTER.md`: paleta, tipografia (Sora) e regras visuais. Seguir ao mexer no visual.
- `docs/cakto/`: banners do checkout da Cakto (`banner-vitalicio.png`, `banner-mensal.png`, 1536x1024) e imagem do produto (`produto.png`, 1024x1024). A fonte é `banners.html` (abrir em http://127.0.0.1:8765/docs/cakto/banners.html). Os banners têm o preço: se o preço mudar, trocar ali, gerar os PNGs de novo e o dono sobe no painel da Cakto.
- `docs/superpowers/specs/`: spec original. **Está desatualizada** no plano Free e nos botões "Começar grátis", que foram removidos.

Para ver localmente: `python3 -m http.server 8765` na pasta e abrir http://127.0.0.1:8765.

## Planos e links

- Só **Mensal** (R$ 14,90/mês, checkout `https://pay.cakto.com.br/w8qn83q_863323`) e **Vitalício** (R$ 47,90 único, checkout `https://pay.cakto.com.br/ue6i54i_925936`, em destaque). Os mesmos links estão no `Paywall.tsx` do app.
- **Não existe plano grátis.** O dono quer criar um no futuro. Ele precisa existir no app antes de voltar para a LP.
- Garantia de 7 dias e pagamento por Pix ou cartão: vêm do checkout da Cakto (os banners do checkout também mostram "7 dias de garantia"). Aparecem no topo, abaixo dos planos, no FAQ e no CTA final. Se mudar na Cakto, mudar na LP.
- O CTA final e o botão fixo do celular levam direto ao checkout do Vitalício; o Mensal aparece como link logo abaixo do CTA final.
- O acesso é liberado pelo e-mail: o cliente cria a conta em `https://briqueflow.pages.dev/cadastro` com o mesmo e-mail da compra. O FAQ "Como acesso depois de comprar?" explica isso.
- Só prometer o que o app tem. Em 14/10/2026 ele tem: calculadora de lucro (margem, ROI, veredito e simulador de negociação), produtos e vendas, dashboard (lucro comparado com o período anterior, gráfico, campeões de venda, estoque), meta do mês (de lucro ou de faturamento, com ritmo e projeção), dinheiro parado (produtos parados há mais de 15 dias), imagem para compartilhar o resultado do mês, anúncios gerados com IA (limite de 10 por dia, nunca prometer ilimitado), tema claro e escuro e instalar no celular como app.
- Meta do mês e dinheiro parado aparecem como item curto nos cards de planos, e o dinheiro parado também no benefício "Mais giro". Nenhum dos dois tem seção própria. Instalar como app aparece só no FAQ; a imagem do resultado do mês ainda não aparece. Os cards de planos são de propósito curtos (6 itens de poucas palavras): o dono quer leitura rápida até o botão.
- Os banners e a imagem do produto de `docs/cakto/` estão no ar nos dois checkouts desde 14/10/2026 (conferido: as imagens do checkout são idênticas aos arquivos). O checkout cobra R$ 0,99 de taxa de serviço além do preço da LP.
- O app calcula um preço mínimo (`minPrice` em `profit.ts`), mas a tela não mostra. Não prometer na LP.
- As screenshots de `assets/images/` são de 14/10/2026, já com o Dashboard novo. Os dados são de exemplo, cadastrados na conta do dono. Naquele dia a conta tinha 20 produtos sem custos extras. Depois, ainda em 14/10, a conta ganhou mais 38 produtos (roupas, calçados, perfumes, relógios, eletrônicos, desde junho) e custos de frete, combustível e limpeza em todos, para gravar conteúdo orgânico. Por isso as prints da LP não batem mais com a conta (lucro dos 30 dias passou de R$ 3.440 para R$ 4.260). Se for refazer prints, as da LP e as da conta vão divergir: decidir qual manter. Os produtos não têm foto.

## Regras combinadas com o usuário

- Não commitar nem dar push sem o usuário pedir. Se o `git push` for bloqueado, o usuário roda `! git push origin main`.
- Login em serviços (Cloudflare, GitHub, Cakto) é feito pelo usuário.
- Quem importa é o dono do produto: dar recomendação clara, sem listar mil opções.
