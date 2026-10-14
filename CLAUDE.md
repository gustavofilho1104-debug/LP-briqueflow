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
- `script.js`: ano do rodapé, menu mobile, animações de entrada (GSAP, desligadas para quem pede menos movimento), accordion do FAQ e `APP_URL`. Todo link com a classe `js-app-link` recebe `APP_URL` (hoje `https://briqueflow.pages.dev/login`).
- `assets/images/`: logo e screenshots reais do app (`.webp`). Estão desatualizadas, ver "Planos e links".
- `design-system/brique-flow/MASTER.md`: paleta, tipografia (Sora) e regras visuais. Seguir ao mexer no visual.
- `docs/superpowers/specs/`: spec original. **Está desatualizada** no plano Free e nos botões "Começar grátis", que foram removidos.

Para ver localmente: `python3 -m http.server 8765` na pasta e abrir http://127.0.0.1:8765.

## Planos e links

- Só **Mensal** (R$ 14,90/mês, checkout `https://pay.cakto.com.br/w8qn83q_863323`) e **Vitalício** (R$ 47,90 único, checkout `https://pay.cakto.com.br/ue6i54i_925936`, em destaque). Os mesmos links estão no `Paywall.tsx` do app.
- **Não existe plano grátis.** O dono quer criar um no futuro. Ele precisa existir no app antes de voltar para a LP.
- O acesso é liberado pelo e-mail: o cliente cria a conta em `https://briqueflow.pages.dev/cadastro` com o mesmo e-mail da compra. O FAQ "Como acesso depois de comprar?" explica isso.
- Só prometer o que o app tem. Em 14/10/2026 ele tem: calculadora de lucro (margem, ROI, veredito, preço mínimo e simulador de negociação), produtos e vendas, dashboard (lucro comparado com o período anterior, gráfico, campeões de venda, estoque), meta do mês (de lucro ou de faturamento, com ritmo e projeção), dinheiro parado (produtos parados há mais de 15 dias), imagem para compartilhar o resultado do mês, anúncios gerados com IA (limite de 10 por dia, nunca prometer ilimitado), tema claro e escuro e instalar no celular como app.
- A LP ainda não mostra meta do mês, dinheiro parado nem instalar como app (pendência do dono). O FAQ "Preciso instalar alguma coisa?" diz que funciona no navegador, o que continua certo, mas não cita que dá para instalar.
- As screenshots de `assets/images/` são de 06/10/2026, de antes do redesenho do Dashboard (13/10). Trocar por prints novos do app ao atualizar a LP.

## Regras combinadas com o usuário

- Não commitar nem dar push sem o usuário pedir. Se o `git push` for bloqueado, o usuário roda `! git push origin main`.
- Login em serviços (Cloudflare, GitHub, Cakto) é feito pelo usuário.
- Quem importa é o dono do produto: dar recomendação clara, sem listar mil opções.
