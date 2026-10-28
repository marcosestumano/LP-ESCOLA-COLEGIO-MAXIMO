# Colégio Máximo — Redesign do site

Redesign do site do [Colégio Máximo](https://colegiomaximo.com.br/), escola do Infantil ao Ensino Médio no Jardim Aeroporto, São Paulo.

O objetivo foi deixar o site **mais limpo, leve e fácil de navegar**, mantendo o conteúdo e a identidade visual da escola. Em resumo:

- menos poluição visual e menos animações de scroll;
- hierarquia clara;
- foco na matrícula.

## ✨ O que mudou em relação ao site original

| Antes | Depois |
|---|---|
| Quase todos os elementos animavam ao rolar a página | Uma única animação discreta nos títulos, que roda uma vez só e respeita o "reduzir movimento" do sistema |
| Diferenciais em blocos longos empilhados | Diferenciais organizados em abas |
| Carrossel com 34 fotos da estrutura (várias repetidas) | Grade fixa com 6 fotos selecionadas, sem espaços vazios |
| Depoimentos longos em carrossel | 3 trechos curtos lado a lado |
| Documentos de matrícula em listas enormes | Documentos separados por segmento, em abas |
| Layout com pouca adaptação ao celular | Layout responsivo, com menu mobile em acordeão |

## 📄 Páginas

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Home: carrossel de banners, números, quem somos, segmentos, diferenciais, estrutura, depoimentos e contato |
| `historia.html` | Linha do tempo de 1993 até hoje e galeria de memórias |
| `diferenciais.html` | Sistema Objetivo, Programa Bilíngue, salas e atividades |
| `infantil.html` | Educação Infantil |
| `fundamental.html` | Ensino Fundamental I |
| `fundamental-2.html` | Ensino Fundamental II |
| `medio.html` | Ensino Médio, com itinerários formativos e grade de aulas |
| `matricula.html` | Formulário de matrícula, passo a passo e documentos necessários |
| `trabalhe-conosco.html` | Formulário com envio de currículo |

## 🧩 Recursos

- **Menu com submenus.** No computador, abre ao passar o mouse; no celular, abre com um toque, em acordeão.
- **Carrossel de banners** em largura total, com:
  - troca automática a cada 6 s;
  - setas, indicadores, arrastar no celular e setas do teclado;
  - pausa ao passar o mouse e quando a aba fica oculta;
  - altura que se ajusta a cada banner, sem cortar nem distorcer a imagem.
- **Botão flutuante de WhatsApp** em todas as páginas.
- **Acessibilidade:**
  - `aria-*` nos menus, abas e carrossel;
  - foco visível;
  - suporte a `prefers-reduced-motion`.
- **Imagens com fallback:** se uma imagem não carregar, aparece um bloco neutro no lugar, sem quebrar o layout.
- **Sem dependências.** Só HTML, CSS e JavaScript puros, sem build e sem framework.

## 🎨 Identidade visual

As cores vêm do logo da escola e ficam centralizadas em variáveis no início do `styles.css`:

```css
:root{
  --ink:#151D4F;     /* texto */
  --brand:#2337A3;   /* azul do logo */
  --accent:#F5D90A;  /* amarelo do logo */
}
```

Alterar uma variável muda a cor no site inteiro. Como o amarelo fica ilegível sobre fundo claro, ele é usado só como destaque e fundo, nunca como cor de texto.

**Tipografia** (Google Fonts):

- [Fraunces](https://fonts.google.com/specimen/Fraunces) nos títulos;
- [Inter](https://fonts.google.com/specimen/Inter) nos textos.

## 📁 Estrutura

```
.
├── index.html
├── historia.html
├── diferenciais.html
├── infantil.html
├── fundamental.html
├── fundamental-2.html
├── medio.html
├── matricula.html
├── trabalhe-conosco.html
├── styles.css      # estilos de todas as páginas
├── main.js         # menu, abas, carrossel e animações
└── img/            # banners do carrossel
```

## ⚠️ Observações

- **Imagens:** os banners do carrossel estão na pasta `img/`. As demais fotos (estrutura, segmentos, diferenciais, depoimentos e logo) ainda são carregadas do servidor do site original. Para um projeto totalmente independente, baixe essas imagens para `img/` e atualize os caminhos.
- **Formulários:** contato, matrícula e trabalhe conosco são apenas visuais por enquanto. Ao enviar, mostram uma confirmação, mas não mandam os dados para lugar nenhum. Para funcionar de verdade, é preciso ligá-los a um serviço como [Formspree](https://formspree.io/) ou a um backend próprio.
- **Conteúdo:** textos, imagens, logo e marcas pertencem ao Colégio Máximo. Este repositório é uma proposta de redesign da interface.

