---
title: "Boutique Manager: Automação de Operações com Bash"
date: 2024-10-31T06:00:23+06:00
lastmod: 2026-10-23
hero: /images/post2.jpg
description: "Estudo de caso em Bash e Cron para estoque, vendas, relatórios, logs e backups agendados."
theme: Toha
menu:
  sidebar:
    name: "Boutique Manager — Bash"
    identifier: task-automation-shell-script-cron
    weight: 500
    parent: task-automation-shell-script
categories: ["Automação"]
tags: ["Bash", "Shell Script", "Cron"]
---

## Resumo executivo

O **Boutique Manager** é um **projeto em shell script para o cenário de uma pequena loja de roupas**. Seu menu em terminal reúne cadastro de produtos, controle de estoque, vendas, alertas de reposição, relatórios, logs e backups.

O trabalho surgiu da aplicação dos conceitos do curso [Hands-on Introduction to Linux Commands and Shell Scripting](https://www.coursera.org/account/accomplishments/verify/30JGE2RZY8T4). É um exercício prático de automação, sem alegação de implantação em um varejista real.

{{< project-overview title="Boutique Manager — Automação com Bash" domain="Automação / Shell Scripting" stack="Bash · Linux · awk · sort · uniq · Cron" focus="Estoque · Vendas · Operações com arquivos · Auditoria" outputs="Menu de terminal · Relatórios · Logs · Backups agendados" status="Projeto demonstrativo" repo="https://github.com/diogo-dantas/boutique-manager" >}}

## Problema e requisitos

Uma loja de pequeno porte precisa manter cadastro de produtos e estoque, registrar vendas e reduzir o risco de perda de informações. Atualizações manuais de arquivos podem gerar inconsistências e dificultar a auditoria das operações.

A solução em terminal busca:

- cadastrar produtos e agrupar itens por categoria;
- registrar transações com data, hora e valores;
- atualizar o estoque após as vendas, validando quantidades disponíveis;
- apontar baixos níveis de estoque e gerar relatórios por categoria e período;
- manter logs de operação e backups agendados;
- reunir as funcionalidades em um menu simples.

## Arquitetura e fluxo dos dados

```text
Menu de terminal (Bash)
       │
       ├── Cadastro de produtos ──► Arquivos de estoque
       ├── Vendas ────────────────► Atualização + registros
       ├── Relatórios ────────────► Totais por período/categoria
       └── Operações ─────────────► Logs com data e hora
                                          │
Cron ────────────────────────────────────► Backups / checagem de estoque
```

**Entrada.** Seleções no terminal e dados de produtos e vendas informados pelo usuário.

**Processamento.** Funções de shell manipulam arquivos, validam quantidades e produzem resumos.

**Saída.** Registros de estoque e vendas, relatórios, logs de operações e cópias de segurança.

### Diagrama do projeto

![Resumo visual do projeto](./images/BM_layout.png)

*Dica: abra a imagem em uma nova aba para ampliar.*

## Decisões de implementação

**1. Modularização e fluxo de controle.** O projeto usa funções, parâmetros, `if/then/else`, `case`, `while` e iteração sobre categorias para organizar o menu interativo.

**2. Processamento de texto.** Pipes e filtros como `awk`, `sort` e `uniq` apoiam a geração de estatísticas e relatórios de estoque e vendas.

**3. Configuração e entrada/saída.** Variáveis como `LOJA_DIR` e `DATA`, `export`, padrões de arquivos, substituição de comandos e redirecionamentos organizam caminhos e registros de execução.

**4. Integridade e rastreabilidade.** O artigo descreve verificação de quantidades antes das vendas, atualizações com arquivos temporários e logs datados.

**5. Agendamento.** Cron é usado para backups e verificações recorrentes. O texto descreve backups diários e checagens semanais de estoque.

## Demonstração

O projeto disponibiliza o diagrama de arquitetura acima e o [repositório de código-fonte](https://github.com/diogo-dantas/boutique-manager). A implementação pode ser explorada pelos scripts do repositório.

## Testes e qualidade dos dados

As verificações a seguir são **testes recomendados**, sem afirmar que existe uma suíte automatizada já documentada:

- impedir vendas superiores à quantidade disponível;
- validar cadastros com campos ausentes ou inválidos;
- conferir a consistência entre vendas registradas e estoque atualizado;
- comparar totais de relatórios com uma base pequena conhecida;
- testar falhas durante a escrita de arquivos temporários;
- conferir presença e interpretação das datas nos logs;
- verificar tarefas Cron e restauração de backups gerados.

## Resultados e limitações

**Entrega demonstrada:** fluxo de gerenciamento em Bash para o cenário descrito, integrando vendas, estoque, relatórios, logs e backups.

**Limitações:** não foram documentados usuários em produção, economia de tempo medida, garantias de concorrência ou benchmarks de restauração. O controle de estado por arquivos exigiria reforços para vários usuários simultâneos.

## Aprendizados e próximos passos

O estudo demonstra como utilitários simples de shell podem formar um sistema coeso. Evoluções possíveis incluem lint com `shellcheck`, testes automatizados, configurações explícitas e um procedimento documentado de restauração de backups.

## Repositório e referências

- [Repositório Boutique Manager](https://github.com/diogo-dantas/boutique-manager)
- [Certificado do curso de Linux e Shell Scripting](https://www.coursera.org/account/accomplishments/verify/30JGE2RZY8T4)

Crédito da ilustração de capa: [gstudioimagen / Freepik](https://www.freepik.com/).
