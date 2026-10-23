---
title: "Análise de Sentimentos em Companhias Aéreas com Streamlit"
date: 2025-02-22T06:00:16+06:00
lastmod: 2026-10-23
hero: /images/post3.png
description: "Estudo de caso em Streamlit para explorar sentimentos em tweets, gráficos, filtros, mapa e nuvem de palavras."
theme: Toha
menu:
  sidebar:
    name: "Sentimentos de Companhias Aéreas"
    identifier: dataviz-py-streamus
    weight: 600
    parent: dataviz-py
categories: ["Análise de Dados"]
tags: ["Python", "Streamlit", "Análise de Sentimentos"]
---

## Resumo executivo

Este estudo de caso apresenta um **aplicativo interativo em Streamlit para explorar tweets sobre companhias aéreas**, organizados por sentimentos **positivo, negativo e neutro**. É possível examinar distribuições, selecionar períodos e regiões, comparar empresas e observar termos recorrentes.

O foco é a **análise exploratória e visualização de tweets com rótulos de sentimento**. O artigo original não documenta o treinamento ou a avaliação de um novo classificador de sentimentos. Tampouco devemos interpretar o conjunto de tweets como uma integração em tempo real sem evidência dessa funcionalidade.

{{< project-overview title="Explorador de Sentimentos — Streamlit" domain="Análise de Dados / Análise de Sentimentos" stack="Python · Streamlit · Pandas · Gráficos" focus="Exploração de dados · Filtros · Visualização" outputs="Aplicação interativa · Gráficos · Mapa · Nuvem de palavras" status="Projeto de portfólio" repo="https://github.com/diogo-dantas/us-airline-sentiment" >}}

## Problema e requisitos

Publicações em redes sociais reúnem percepções variadas sobre companhias aéreas. A leitura individual de cada postagem dificulta identificar padrões entre empresas, datas e localidades.

A aplicação foi organizada para:

- explorar tweets por sentimento positivo, negativo ou neutro;
- comparar distribuições em gráficos de barras e pizza;
- filtrar publicações em intervalos de tempo;
- visualizar distribuição geográfica em mapa interativo;
- comparar sentimentos entre companhias aéreas;
- analisar termos recorrentes com uma nuvem de palavras.

## Arquitetura e fluxo dos dados

```text
Conjunto de tweets com informações de sentimento
                      │
                      ▼
            Seleção e filtragem
                      │
                      ▼
              App Streamlit
          ┌───────────┼──────────┐
          ▼           ▼          ▼
       Gráficos    Linha do   Comparações e
     de sentimento tempo/mapa nuvem de palavras
```

**Entrada.** Conjunto de tweets, rótulos de sentimento e atributos complementares.

**Processamento.** O app seleciona dados conforme as opções do usuário e agrega observações para apresentação.

**Saída.** Visualizações interativas que apoiam a exploração das percepções expressas na base.

O diagrama representa o fluxo lógico descrito no artigo original; não afirma a existência de ingestão contínua ou pipeline de treinamento não documentado.

## Decisões de implementação

**1. Interface em Streamlit.** A ferramenta permite publicar análises desenvolvidas em Python em uma interface com componentes interativos.

**2. Gráficos complementares.** Barras e pizzas facilitam a inspeção das proporções de sentimentos. A nuvem de palavras oferece uma perspectiva qualitativa dos termos frequentes.

**3. Comparação temporal, geográfica e entre empresas.** Os filtros ajudam a responder perguntas mais específicas que uma contagem global.

**4. Separação entre rótulos e previsões.** Como o texto original não explica a origem dos rótulos, não atribuímos ao projeto o treinamento de um classificador supervisionado.

## Demonstração

O vídeo original apresenta o funcionamento do aplicativo:

{{< youtube c_dyIX5v_uk >}}

O projeto também disponibilizou um [link do aplicativo Streamlit](https://us-airline-sentiment.streamlit.app/). A disponibilidade do serviço hospedado pode variar.

## Testes e qualidade dos dados

As verificações abaixo são **recomendadas**, e não uma afirmação de que já foram implementadas em testes automatizados:

- verificar valores ausentes e tweets duplicados;
- validar as categorias de sentimentos e as opções dos filtros;
- comparar as contagens dos gráficos com agregações da base;
- conferir o tratamento de datas e países;
- testar resultados vazios e ausência de localização;
- avaliar a usabilidade dos gráficos em telas pequenas.

Caso um modelo de classificação seja desenvolvido posteriormente, será necessário avaliar métricas específicas e riscos de vazamento de dados.

## Resultados e limitações

**Entrega demonstrada:** aplicação Streamlit com gráficos de sentimentos, comparações entre companhias, análises temporais e geográficas e nuvem de palavras.

**Limitações:** o conteúdo disponível não comprova acurácia de classificação, métricas de latência, monitoramento de produção ou streaming em tempo real. O estudo deve ser entendido como analytics interativo.

## Aprendizados e próximos passos

O projeto evidencia o papel dos filtros e da experiência de uso na exploração de dados. Uma próxima versão pode incluir testes de qualidade, rastreabilidade da origem das informações e, se pertinente, um classificador documentado com avaliação adequada.

## Repositório e referências

- [Repositório do projeto](https://github.com/diogo-dantas/us-airline-sentiment)
- [Aplicativo Streamlit](https://us-airline-sentiment.streamlit.app/)
- [Vídeo de demonstração](https://www.youtube.com/watch?v=c_dyIX5v_uk)

Crédito da ilustração de capa: [gstudioimagen / Freepik](https://www.freepik.com/).
