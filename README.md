# Convert Case

Conversor de caixa de texto online, gratuito e 100% local no navegador.

**[Acessar convert-case.waykey.com.br](https://convert-case.waykey.com.br/)**

## Funcionalidades

### Caixa de texto
- Caixa alta (UPPERCASE)
- Caixa baixa (lowercase)
- Sentence case
- Title case
- Caixa alternada (aLtErNaDa)
- Inverter caixa (maiúsculas ↔ minúsculas)

### Desenvolvimento
- camelCase
- PascalCase
- snake_case
- kebab-case

### Utilitários
- Limpar espaços extras
- Trim
- Inverter texto
- Mascaramento com asteriscos
- Caracteres aleatórios

### Ações
- Copiar para área de transferência
- Limpar editor
- Upload de arquivos `.txt`

## Desenvolvimento local

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
npm run preview
```

## Deploy

O deploy é feito automaticamente via GitHub Actions ao fazer push na branch `main`.

### Configuração obrigatória do GitHub Pages

Em **Settings → Pages → Build and deployment**:

1. **Source** deve ser **GitHub Actions** (não use "Deploy from a branch" / branch `main`)
2. Se estiver em "Deploy from a branch", o site publica o código-fonte (`index.html` com `/src/main.tsx`) em vez do build — isso causa erro de MIME type e `icon.png` 404

Após alterar para GitHub Actions, rode novamente o workflow **Deploy to GitHub Pages** em **Actions** (ou faça um push em `main`).

### Verificar se o deploy está correto

No código-fonte da página em produção deve aparecer algo como:

```html
<script type="module" src="/assets/index-XXXXX.js">
```

Se aparecer `/src/main.tsx`, a source do Pages ainda está errada.

## Domínio customizado

| Tipo  | Nome           | Valor                    |
|-------|----------------|--------------------------|
| CNAME | `convert-case` | `igorfollador.github.io` |

No GitHub Pages, configure o domínio `convert-case.waykey.com.br` e ative **Enforce HTTPS**.

## Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS
