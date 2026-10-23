---
title: "Análise de Vendas e Devoluções: Dashboard em Power BI"
date: 2025-02-20T06:00:10+06:00
lastmod: 2026-10-23
hero: /images/post2.png
description: "Estudo de caso com Power Query, indicadores de vendas e análise de devoluções para um varejo fictício."
theme: Toha
menu:
  sidebar:
    name: "Power BI: Vendas e Devoluções"
    identifier: dataviz-pbi-etlsales
    weight: 600
    parent: dataviz-pbi
categories: ["Análise de Dados"]
tags: ["Power BI", "Power Query", "Dashboards"]
---

## Resumo executivo

Este projeto apresenta um **dashboard em Power BI para análise de vendas e devoluções** de uma **rede fictícia de lojas de eletrônicos**. A solução prepara arquivos XLSX com Power Query e organiza três perspectivas: desempenho geral, produtos e marcas, e devoluções.

O objetivo é facilitar a leitura de indicadores comerciais e apoiar discussões sobre desempenho e melhorias operacionais. Trata-se de um projeto demonstrativo de portfólio, **sem evidência de implantação real ou economia financeira mensurada**.

{{< project-overview title="Análise de Vendas e Devoluções — Power BI" domain="Análise de Dados / Business Intelligence" stack="Power BI · Power Query · XLSX" focus="Preparação de dados · KPIs · Análise interativa" outputs="Dashboard · Visões de vendas, produtos e devoluções" status="Estudo de caso (negócio fictício)" >}}

## Problema e requisitos

Informações de vendas, rentabilidade e produtos devolvidos se relacionam, mas quando são examinadas separadamente é mais difícil identificar padrões. O cenário fictício exige uma visualização reutilizável, explorável por usuários de negócio.

O dashboard deve:

- consolidar entradas de vendas e devoluções em arquivos XLSX;
- organizar os dados de origem para relatórios consistentes;
- apresentar faturamento, lucro e vendas em uma visão geral;
- permitir análises por produto, marca, período e localização;
- facilitar a investigação de padrões nas devoluções.

## Arquitetura e fluxo dos dados

```text
Arquivos XLSX
      │
      ▼
Power Query — extração, limpeza e normalização
      │
      ▼
Base analítica preparada / modelo de dados
      │
      ▼
Dashboard Power BI
      ├── Desempenho geral: vendas, faturamento e lucro
      ├── Produtos e marcas: filtros de período e localização
      └── Devoluções: distribuição e padrões recorrentes
```

**Entradas.** Registros de vendas e devoluções em planilhas.

**Processamento.** O Power Query realiza extração, limpeza e normalização para preparar as informações usadas no relatório.

**Consumo.** O Power BI disponibiliza visões interativas para as equipes de vendas e gestão.

## Decisões de implementação

**1. Três perspectivas de negócio.** Separar desempenho geral, produtos/marcas e devoluções ajuda o leitor a partir de um indicador geral e investigar uma questão específica.

**2. Filtros interativos.** Seleções por período e localização facilitam comparações que seriam mais trabalhosas em relatórios estáticos.

**3. Preparação anterior à visualização.** O tratamento dos arquivos no Power Query busca consistência quando as fontes são atualizadas.

O artigo original descreve essas perspectivas, mas não documenta medidas DAX específicas, modelo estrela ou infraestrutura de atualização. Esses detalhes só devem ser incluídos após verificar o `.pbix`.

## Demonstração

O vídeo original apresenta o dashboard implementado:

{{< youtube Jn5MxVGL2JQ >}}

## Testes e qualidade dos dados

Estas são **validações recomendadas**, e não uma afirmação de que já existe uma suíte automatizada de testes:

- conciliar os totais de vendas e devoluções com as planilhas de origem;
- validar campos numéricos, datas e formatos de moeda;
- conferir a interação dos filtros nas três visões;
- investigar produtos duplicados, identificadores ausentes e valores inconsistentes;
- confirmar o significado de lucro e devoluções antes das comparações;
- avaliar o dashboard em diferentes resoluções.

## Resultados e limitações

**Entrega demonstrada:** dashboard interativo com visões de desempenho geral, produtos/marcas e devoluções, usando um cenário fictício de varejo.

**Limitações:** não foram documentados resultados reais de negócio, redução de custos comprovada, SLA de implantação ou benchmark de atualização. O trabalho demonstra o processo analítico, não um rollout mensurado.

## Aprendizados e próximos passos

O estudo reforça que a preparação dos dados é parte essencial da confiabilidade dos KPIs. Como evolução, é possível documentar o modelo semântico, as fórmulas DAX e validações reproduzíveis, confrontando os números do dashboard com consultas de referência.

## Repositório e referências

O material disponível é o [vídeo de demonstração do Power BI](https://www.youtube.com/watch?v=Jn5MxVGL2JQ). O artigo original não informava um repositório de código.

Crédito da ilustração de capa: [gstudioimagen / Freepik](https://www.freepik.com/).
