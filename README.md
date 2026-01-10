# Estilo Livre — Site da Barbearia

Projeto estático para a Barbearia Estilo Livre com experiência moderna, acessível e rápida. Inclui alternância suave de tema, modal de agendamento com resumo e validações, galeria otimizada e melhorias de UX.

## Visão Geral

- **Stack:** HTML5, CSS3, JavaScript (Vanilla), Bootstrap 5.3 (CDN), Font Awesome (CDN)
- **Tema Claro/Escuro:** Persistência em localStorage, respeito a `prefers-color-scheme` e `prefers-reduced-motion`, sem flash inicial
- **Transições:** Classe temporária `.theme-transition` e variáveis CSS para duração e easing
- **Galeria:** Overlay escuro suavizado, transição de opacidade agradável
- **Modal de Agendamento:** Form com resumo de dados e agradecimento, máscara leve para telefone, validações

## Estrutura

- [index.html](index.html): Estrutura das seções, scripts e links de CDN
- [css/style.css](css/style.css): Variáveis, temas, transições e componentes
- [js/advanced.js](js/advanced.js): Interações (tema, modal de agendamento, lazy loading, analytics básico)
- [images/](images/): Recursos visuais
- [.gitignore](.gitignore): Itens ignorados no repositório

## Executando Localmente

### Abrir direto (Windows)

```powershell
Start-Process "$PWD/index.html"
```

### Servidor simples (Python)

```powershell
python -m http.server 5500
# Depois acesse http://localhost:5500
```

## Tema Claro/Escuro

- **Sem flash:** Script no `<head>` de [index.html](index.html) aplica o tema antes do primeiro paint
- **Toggle confiável:** Botão flutuante recriado por [js/advanced.js](js/advanced.js) e sincronizado em `html` e `body`
- **Transição suave:** Duração via `--theme-transition-duration` e easing via `--theme-transition-ease` em [css/style.css](css/style.css)
- **Acessibilidade:** Transições desativadas quando `prefers-reduced-motion: reduce`

## Agendamento (Modal)

- **Abertura robusta:** Botões “Agende Agora” e links de contato abrem o modal via atributos do Bootstrap
- **Campos:** Nome, telefone (com máscara), serviço, data, horário, barbeiro, observações
- **Data:** `min` definido para amanhã; envio só permite data estritamente futura
- **Telefone:** exige no mínimo 11 dígitos (DDD + número)
- **Calendário:** botão de ícone ao lado do campo de data abre o seletor nativo
- **Confirmação:** ao enviar, exibe um resumo com agradecimento (sem ícone de coração)
- **Fechamento:** restaura o formulário ao fechar e limpa qualquer backdrop residual

## Galeria

- Overlay centralizado com opacidade moderada
- Transições suaves de hover e estilo consistente

## Boas Práticas

- Otimize imagens em [images/](images/)
- Centralize estilos em [css/style.css](css/style.css)
- Evite inline-styles para manter consistência de tema e transições

## Notas de Mudança (Recentes)

- Adicionado botão de calendário no campo de data
- Imposta data mínima como amanhã e validação de data futura no envio
- Validação de telefone para mínimo 11 dígitos
- Corrigida inicialização imediata das features e robustez do modal
- Ajustado smooth scrolling para não interceptar links de modal

## Screenshots

Breve print do sistema:

- (images\screenshots\Estilo.png)

### Checklist de Captura

- Tema: transição suave visível e sem flash inicial
- Modal: tamanho `modal-lg` centralizado, abertura e fechamento sem travar
- Resumo: texto de agradecimento correto e sem ícones extras
- Telefone: máscara e validação (11 dígitos) funcionando
- Data: seletor abre pelo botão e validação de futura ativa
