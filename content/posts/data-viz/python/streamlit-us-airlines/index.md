---
title: "Airline Sentiment Analysis: Interactive Exploration with Streamlit"
date: 2025-02-22T06:00:16+06:00
lastmod: 2026-10-23
hero: /images/post3.png
description: "An interactive Streamlit case study of airline tweet sentiment, charts, location filters and word clouds."
theme: Toha
menu:
  sidebar:
    name: "Airline Sentiment with Streamlit"
    identifier: dataviz-py-streamus
    weight: 500
    parent: dataviz-py
categories: ["Data Analytics"]
tags: ["Python", "Streamlit", "Sentiment Analysis"]
---

## Executive summary

This case study describes an **interactive Streamlit app for exploring tweets about airlines**, grouped by **positive, negative and neutral sentiment**. Users can inspect sentiment distributions, filter by time and location, compare airlines and explore frequently used terms.

The project focuses on **exploratory analysis and visualization of sentiment-labeled tweets**. The original article does not document training or evaluating a new sentiment classification model. Its use of a tweet dataset should not be confused with verified real-time social media ingestion.

{{< project-overview title="Airline Sentiment Explorer — Streamlit" domain="Data Analytics / Sentiment Analysis" stack="Python · Streamlit · Pandas · Charts" focus="Exploratory analysis · Filtering · Visual communication" outputs="Interactive app · Charts · Map · Word cloud" status="Portfolio application" repo="https://github.com/diogo-dantas/us-airline-sentiment" >}}

## Problem and requirements

Airline-related social media data contains varied opinions. Reading posts individually makes it difficult to compare perceptions across companies, dates and locations.

The application aims to:

- explore tweets by sentiment category (positive, negative or neutral);
- compare distributions using bar charts and pie charts;
- filter activity over a selected time period;
- visualize geographic distribution on a map;
- compare sentiment across different airlines;
- summarize recurring terms through a word cloud.

## Architecture and data flow

```text
Tweet dataset with sentiment information
                │
                ▼
      Data selection / filtering
                │
                ▼
         Streamlit interface
       ┌────────┼─────────────┐
       ▼        ▼             ▼
  Sentiment  Timeline &    Airline comparison
   charts       map        and word cloud
```

**Input.** A collection of tweets and their associated sentiment labels and supporting fields.

**Processing.** The app filters the data according to user selections and aggregates observations for display.

**Output.** Interactive visualizations intended to help users explore customer sentiment patterns.

This is a logical overview derived from the documented application features, not an assertion about an undocumented data ingestion or model-training pipeline.

## Implementation decisions

**1. Streamlit interface.** A Python-first framework makes exploratory data views accessible through interactive components.

**2. Multiple visual encodings.** Bar and pie charts support different ways to inspect sentiment proportions. The word cloud provides a complementary, qualitative overview of frequent terms.

**3. Time, location and airline comparisons.** These filters let readers ask more focused questions than a global sentiment count alone.

**4. Distinguishing data labels from model predictions.** The original article does not establish how sentiment labels were generated, so this study does not claim supervised model training.

## Demo

The video below, originally recorded in Portuguese, shows the application:

{{< youtube c_dyIX5v_uk >}}

The original project also provides a [Streamlit app link](https://us-airline-sentiment.streamlit.app/). Availability of the hosted service may change.

## Testing and data quality

The following are **recommended checks**, not a statement that automated tests have already been implemented:

- inspect missing and duplicate tweet records;
- validate supported sentiment labels and filter values;
- compare plotted counts with source aggregations;
- check whether time and country fields are parsed consistently;
- test empty filter results and missing geographic information;
- verify that the Streamlit charts remain usable on smaller screens.

If model training is added in a future version, separate evaluation metrics and dataset leakage checks will be needed.

## Results and limitations

**Demonstrated outcome:** a Streamlit application with sentiment distributions, airline comparisons, temporal/geographic exploration and a word cloud.

**Limitations:** no verified classification accuracy, latency measurements, production monitoring or live-streaming pipeline is established by the available article. The current case study should be read as interactive analytics.

## Lessons learned and next steps

The project illustrates how interface design and filtering can make an analytical dataset easier to explore. A future technical iteration could add data-quality checks, explicit data lineage and, if appropriate, a separately documented sentiment classifier with proper train/test evaluation.

## Repository and references

- [Project repository](https://github.com/diogo-dantas/us-airline-sentiment)
- [Streamlit application](https://us-airline-sentiment.streamlit.app/)
- [Demonstration video](https://www.youtube.com/watch?v=c_dyIX5v_uk)

Cover illustration credit: [gstudioimagen / Freepik](https://www.freepik.com/).
