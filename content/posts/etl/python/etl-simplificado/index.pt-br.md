---
title: "Pipeline ETL em Python: unificando dados CSV, JSON e XML"
date: 2024-09-20T06:00:23+06:00
lastmod: 2026-10-23
hero: /images/post1.jpg
description: "Estudo de caso de ETL com múltiplos formatos, padronização dos dados e geração de saídas rastreáveis."
theme: Toha
menu:
  sidebar:
    name: "ETL Python: CSV, JSON e XML"
    identifier: etl-py-etlsimp
    weight: 500
    parent: etl-py
categories:
  - Engenharia de Dados
tags: ["Python", "ETL", "Qualidade de Dados"]
---

## Resumo executivo

Este projeto demonstra um fluxo **ETL (Extract, Transform, Load)** desenvolvido em Python para consolidar registros armazenados em arquivos **CSV, JSON e XML**. O processamento padroniza os dados e gera dois artefatos: `transformed_data.csv` e `log_file.txt`.

O estudo de caso apresenta as principais decisões de engenharia: integração de formatos diferentes, regras de transformação, execução reproduzível e rastreabilidade por logs. Trata-se de um pipeline didático de pequeno porte, e não de uma plataforma de produção.

{{< project-overview title="Pipeline ETL em Python — Dados Unificados" domain="Engenharia de Dados" stack="Python · pandas · glob · ElementTree · datetime" focus="Extração · padronização · logging" outputs="transformed_data.csv · log_file.txt" status="Projeto demonstrativo" repo="https://github.com/diogo-dantas/ETL-simplificado-CSV-JSON-e-XML-" >}}

## Problema e requisitos

Organizações frequentemente recebem dados de diferentes sistemas em arquivos com formatos distintos. Mesmo quando essas fontes representam informações semelhantes, processar cada arquivo manualmente aumenta o trabalho e o risco de inconsistências.

Neste exemplo, os registros contêm **nome, altura e peso**. O objetivo é ler as fontes disponíveis, uniformizar a estrutura e as unidades de medida e gerar um CSV único para análises ou posterior carregamento em banco de dados.

O fluxo deve:

- ler arquivos CSV, JSON e XML;
- reunir registros compatíveis em uma estrutura tabular padronizada;
- aplicar regras explícitas de conversão de unidades;
- registrar eventos de execução e salvar a base resultante.

## Arquitetura e fluxo dos dados

```text
Arquivos CSV ─┐
Arquivos JSON ├──► EXTRAÇÃO ──► TRANSFORMAÇÃO ──► CARGA ──► transformed_data.csv
Arquivos XML ─┘      │               │             │
                      └───────────────┴─────────────┴──► log_file.txt
```

**Extração.** O Python identifica e lê os arquivos de entrada. `pandas` apoia o tratamento tabular e `ElementTree` pode interpretar registros XML.

**Transformação.** Os registros são combinados em uma tabela comum. O exemplo contempla a conversão de altura de **polegadas para metros** e peso de **libras para quilogramas**, quando essas são as unidades dos arquivos de origem. É importante confirmar as unidades de entrada antes de aplicar as fórmulas.

**Carga.** A base transformada é salva como `transformed_data.csv`; o arquivo `log_file.txt` registra eventos de execução e auxilia na investigação de problemas.

## Decisões de implementação

O projeto privilegia ferramentas conhecidas do ecossistema Python, sem exigir infraestrutura desnecessária:

| Componente | Finalidade |
|---|---|
| `glob` | Localizar arquivos pelos padrões esperados |
| `pandas` | Concatenar e transformar registros estruturados |
| `xml.etree.ElementTree` | Interpretar entradas XML |
| `datetime` | Registrar horários no log |
| Saída CSV | Disponibilizar a base consolidada |

A escolha principal é entre simplicidade e extensibilidade: a solução atende entradas didáticas controladas, mas exigiria validações de esquema, tratamento de exceções e orquestração para uma carga de produção.

## Demonstração

O vídeo original apresenta o funcionamento do projeto:

{{< youtube mzjJOHLFCJM >}}

## Testes e qualidade dos dados

Um pipeline confiável deve ser avaliado além da simples geração do arquivo de saída. Os itens abaixo representam **validações recomendadas**, e não uma declaração de que já existe uma suíte automatizada implementada:

- Verificar campos esperados nas leituras de CSV, JSON e XML.
- Conferir tipos de dados após a transformação.
- Validar conversões com casos conhecidos (por exemplo, 70 polegadas = 1,778 metro; 150 libras ≈ 68,04 kg).
- Comparar quantidades de registros de entrada e saída, considerando eventuais exclusões.
- Testar arquivos vazios, colunas ausentes e valores inválidos.
- Conferir registros de início, conclusão e falha no log.

Uma próxima versão pode incluir `pytest`, validação de esquemas e verificações em CI.

## Resultados e limitações

A implementação descrita gera **um CSV consolidado** e **um log de execução**, permitindo reunir fontes heterogêneas em uma estrutura única para análise. O projeto não apresenta medições verificadas de tempo de execução, throughput ou economia percentual de esforço.

As limitações incluem esquemas de entrada restritos, ausência de suíte de testes automatizados documentada e falta de uma camada de orquestração e monitoramento. São oportunidades de evolução, não funcionalidades já demonstradas.

## Aprendizados e próximos passos

Mesmo em tarefas simples, as regras de transformação devem ser explícitas, as saídas precisam ser rastreáveis e o processamento deve ser reproduzível. Como evolução, o projeto pode incorporar testes automatizados, parâmetros de configuração, logs estruturados e execução agendada.

## Repositório e referências

**[Acessar o repositório no GitHub](https://github.com/diogo-dantas/ETL-simplificado-CSV-JSON-e-XML-)**

Crédito da ilustração de capa: [gstudioimagen / Freepik](https://www.freepik.com/).
