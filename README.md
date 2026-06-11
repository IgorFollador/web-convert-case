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

Configure o GitHub Pages em **Settings → Pages → Source: GitHub Actions**.

## Domínio customizado

| Tipo  | Nome           | Valor                    |
|-------|----------------|--------------------------|
| CNAME | `convert-case` | `igorfollador.github.io` |

No GitHub Pages, configure o domínio `convert-case.waykey.com.br` e ative **Enforce HTTPS**.

## Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS
