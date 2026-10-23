---
title: "Sales and Returns Analytics: Building a Power BI Dashboard"
date: 2025-02-20T06:00:10+06:00
lastmod: 2026-10-23
hero: /images/post2.png
description: "A practical Power BI case study covering data preparation, sales KPIs and returns analysis for a fictional retail business."
theme: Toha
menu:
  sidebar:
    name: "Power BI: Sales & Returns"
    identifier: dataviz-pbi-etlsales
    weight: 500
    parent: dataviz-pbi
categories: ["Data Analytics"]
tags: ["Power BI", "Power Query", "Dashboards"]
---

## Executive summary

This project explores a **Power BI dashboard for sales and product returns** at a **fictional electronics retail chain**. The solution transforms XLSX source files with Power Query and organizes three complementary analytical views: overall performance, product and brand performance, and returns.

The objective is to make business indicators easier to explore and support discussions about commercial performance and operational improvements. The project is a portfolio case study; it does **not** report production adoption or independently measured savings.

{{< project-overview title="Sales & Returns Analytics — Power BI" domain="Data Analytics / Business Intelligence" stack="Power BI · Power Query · XLSX" focus="Data preparation · KPI reporting · Interactive analysis" outputs="Interactive dashboard · Sales, product and returns views" status="Portfolio case study (fictional business)" >}}

## Problem and requirements

Sales, profitability and returned products are closely related, but reviewing these dimensions separately makes it difficult to understand what is happening in a store network. The fictional retail scenario calls for a reusable analytical view that can be explored by business users.

The dashboard should:

- consolidate sales and returns inputs from XLSX files;
- organize the source data for consistent reporting;
- provide an overview of revenue, profit and sales;
- allow analysis by product, brand, period and geographic area;
- surface return patterns for investigation.

## Architecture and data flow

```text
XLSX source files
       │
       ▼
Power Query — extraction, cleanup and normalization
       │
       ▼
Prepared analytical dataset / data model
       │
       ▼
Power BI dashboard
       ├── Overall performance: sales, revenue and profit
       ├── Product & brand: period and location filters
       └── Returns: distribution and recurring patterns
```

**Inputs.** Sales and returns records are stored as spreadsheets.

**Processing.** Power Query applies extraction, cleaning and normalization to prepare data for dashboard analysis.

**Consumption.** Power BI provides interactive views intended for sales and management users.

## Implementation decisions

**1. Three business perspectives.** The dashboard separates the global view from product/brand detail and returns. This helps readers navigate from a high-level indicator to a specific business question.

**2. Interactive filters.** Period and location filters make comparisons more useful than static exports.

**3. Data preparation before visualization.** Cleaning and normalizing input files in Power Query reduces ambiguity when the dashboard is refreshed from the prepared sources.

The original write-up describes the analytical views but does not document detailed DAX measures, a star schema or refresh infrastructure. Those details should only be added after reviewing the `.pbix` implementation.

## Demo

The original demonstration is in Portuguese and walks through the implemented dashboard:

{{< youtube Jn5MxVGL2JQ >}}

## Testing and data quality

The following are **recommended validation checks**, not a claim that a formal automated test suite was implemented:

- reconcile total sales and returns against the source spreadsheets;
- verify number, date and currency fields after import;
- check whether filters interact correctly across the three views;
- test duplicate, missing and inconsistent product identifiers;
- validate the meaning of profit and return indicators before comparing them;
- inspect dashboard usability at common screen sizes.

## Results and limitations

**Demonstrated deliverable:** an interactive dashboard with views for overall performance, product/brand analysis and returns, based on a fictional retail scenario.

**Limitations:** no independently documented business impact, verified savings, deployment SLA or refresh benchmark. The work illustrates an analytical workflow, rather than a measured operational rollout.

## Lessons learned and next steps

The project demonstrates the value of structuring the data before presenting KPIs. A future revision could document the semantic model, DAX definitions and reproducible validation rules, then compare dashboard calculations against reference queries.

## Repository and references

The available artifact is the [Power BI dashboard demonstration video](https://www.youtube.com/watch?v=Jn5MxVGL2JQ). No source repository was linked in the original article.

Cover illustration credit: [gstudioimagen / Freepik](https://www.freepik.com/).
