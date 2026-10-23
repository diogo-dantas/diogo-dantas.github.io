---
title: "Building a Python ETL Pipeline: Unifying CSV, JSON and XML Data"
date: 2024-09-20T06:00:23+06:00
lastmod: 2026-10-23
hero: /images/post1.jpg
description: "A practical ETL case study: ingesting heterogeneous files, standardizing data and producing auditable outputs."
theme: Toha
menu:
  sidebar:
    name: "Python ETL: CSV, JSON & XML"
    identifier: etl-py-etlsimp
    weight: 500
    parent: etl-py
categories:
  - Data Engineering
tags: ["Python", "ETL", "Data Quality"]
---

## Executive summary

This project demonstrates a straightforward **Extract, Transform, Load (ETL)** workflow written in Python. It consolidates records stored in **CSV, JSON and XML** files into a consistent dataset and produces two artifacts: `transformed_data.csv` and `log_file.txt`.

The case study focuses on the core engineering considerations behind the implementation: heterogeneous inputs, standardization rules, repeatable execution and traceability through logs. It is a small-scale educational pipeline, rather than a production platform.

{{< project-overview title="Python ETL — Unified Data Pipeline" domain="Data Engineering" stack="Python · pandas · glob · ElementTree · datetime" focus="Extraction · standardization · logging" outputs="transformed_data.csv · log_file.txt" status="Demonstration project" repo="https://github.com/diogo-dantas/ETL-simplificado-CSV-JSON-e-XML-" >}}

## Problem and requirements

Operational data frequently arrives from several systems and in different file formats. Even when files contain similar fields, ingesting each source separately increases manual work and the risk of inconsistent transformations.

For this example, records contain **name, height and weight** fields. The goal is to read the available files, harmonize their structure and measurement units, and write a single CSV suitable for subsequent analysis or database ingestion.

The workflow should:

- read files in CSV, JSON and XML formats;
- combine compatible records in a standardized tabular structure;
- apply explicit transformation rules to measurement units;
- save a unified dataset and record execution events in a log file.

## Architecture and data flow

```text
CSV files ─┐
JSON files ├──► EXTRACT ──► TRANSFORM ──► LOAD ──► transformed_data.csv
XML files ─┘       │             │          │
                   └─────────────┴──────────┴──► log_file.txt
```

**Extract.** Python discovers and reads source files. `pandas` handles tabular data and `ElementTree` can parse XML records.

**Transform.** Records are combined into a consistent table. The example includes conversion of height from **inches to meters** and weight from **pounds to kilograms**, according to the source units. Verify that each input uses those units before applying a conversion.

**Load.** The transformed dataset is written to `transformed_data.csv`, while `log_file.txt` records execution events and supports troubleshooting.

## Implementation choices

The project uses widely available Python tools rather than adding unnecessary infrastructure:

| Component | Role |
|---|---|
| `glob` | Discover files matching expected patterns |
| `pandas` | Combine and transform structured records |
| `xml.etree.ElementTree` | Read XML input |
| `datetime` | Add timestamps to execution logs |
| CSV output | Create a reusable dataset |

The main design trade-off is simplicity versus extensibility. This solution fits a controlled set of sample input files; it would need stronger schemas, error handling and orchestration for a production workload.

## Demo

The original walkthrough is available below (video in Portuguese):

{{< youtube mzjJOHLFCJM >}}

## Validation and testing

For a reliable ETL pipeline, quality checks should cover more than whether an output file exists. The following is a **recommended validation checklist**, not a claim that an automated test suite has already been implemented:

- Confirm that CSV, JSON and XML readers return the expected fields.
- Check that records have consistent field types after transformation.
- Validate unit conversions with known examples (e.g., 70 inches = 1.778 meters; 150 pounds ≈ 68.04 kg).
- Compare input and output record counts, accounting for intentional exclusions.
- Check behavior for empty files, missing columns and invalid values.
- Confirm that the log records start, completion and failure events.

A future iteration could add `pytest`, schema validation and CI checks before publishing new outputs.

## Results and limitations

The described implementation produces a **unified CSV file** and an **execution log**, reducing the need to manually open each source format before analysis. No runtime benchmark, throughput measurement or percentage reduction in effort has been reported for this demonstration.

Key limitations include limited input schemas, absence of a documented automated test suite and no orchestration or monitoring layer. These are opportunities for future development, not capabilities already demonstrated.

## Lessons learned and next steps

Even small ETL tasks benefit from clear transformation rules, auditable outputs and reproducible processing. A natural progression toward production-grade Data Engineering would be to add automated testing, configuration management, structured logging and scheduled execution.

## Repository and references

**[View the source repository on GitHub](https://github.com/diogo-dantas/ETL-simplificado-CSV-JSON-e-XML-)**

Cover illustration credit: [gstudioimagen / Freepik](https://www.freepik.com/).
