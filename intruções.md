# Instruções — Bloco "Nosso Propósito" (Seção Sobre)

---

## O que fazer

Melhorar visualmente o bloco "Nosso Propósito" já existente na seção `#sobre` do `index.html`.

---

## 1. Atualizar HTML do bloco

Localizar o bloco `.proposito-bloco` e substituir por:

```html
<div class="mt-4 proposito-bloco">
  <h4 class="proposito-titulo">
    <i class="bi bi-lightbulb me-2"></i>Nosso Propósito
  </h4>
  <p class="mb-0">
    Criar um relacionamento perene com os clientes, pautado pela ética,
    sustentabilidade e transparência, e sermos a primeira empresa na qual eles
    buscarão assessoria e orientação segura em nossas áreas de negócios.
  </p>
</div>
```

Repetir nos arquivos `/traducoes/en/index.html` e `/traducoes/es/index.html` com os respectivos textos traduzidos (já definidos no instrucoes.md principal).

---

## 2. Atualizar CSS

No arquivo `stylesRefactor.css`, localizar qualquer estilo existente para `.proposito-bloco` e substituir por:

```css
.proposito-bloco {
  border-left: 4px solid var(--cor-primaria, #E87722);
  background-color: rgba(232, 119, 34, 0.07);
  border-radius: 0 8px 8px 0;
  padding: 1.25rem 1.5rem;
}

.proposito-titulo {
  color: var(--cor-primaria, #E87722);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}
```

> Verificar o nome da variável CSS de cor laranja no `:root` do projeto (pode ser `--primary`, `--accent`, `--orange` ou similar) e substituir `--cor-primaria` pelo nome correto encontrado.

---

## Resultado esperado

- Fundo levemente laranja (quase imperceptível, só para diferenciar do fundo da página)
- Borda esquerda laranja sólida
- Cantos arredondados à direita
- Título em laranja, caixa alta, espaçado — com ícone de lâmpada à esquerda
- Texto do propósito em peso normal abaixo