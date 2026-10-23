# DiogoDATA — Padrão editorial e taxonomia

## Organização

- **Categoria:** uma por artigo; descreve a **área de atuação** (e não uma ferramenta).
- **Tags:** idealmente três por artigo; descrevem **tecnologias ou tópicos pesquisáveis**.
- **Caminho:** preserve `content/posts/...` e os campos `menu.sidebar.identifier` e `parent` para evitar quebrar a navegação existente.
- **Idioma:** as categorias editoriais e termos descritivos são traduzidos; tecnologias mantêm grafia padronizada.

## Categorias atuais

| Português | Inglês | Para qual conteúdo |
|---|---|---|
| Engenharia de Dados | Data Engineering | Pipelines, ETL, qualidade e tratamento de dados |
| Análise de Dados | Data Analytics | BI, dashboards, EDA, estudos exploratórios |
| Automação | Automation | Bash, scripts operacionais e automação de tarefas |

**Futuro:** usar *Machine Learning Engineering* e *MLOps* apenas quando houver artigos reais dessas áreas; não criar etiquetas vazias.

## Tags atuais

| Post | Categoria PT-BR | Tags PT-BR | Tags EN |
|---|---|---|---|
| ETL Python | Engenharia de Dados | Python · ETL · Qualidade de Dados | Python · ETL · Data Quality |
| Dashboard Power BI | Análise de Dados | Power BI · Power Query · Dashboards | Power BI · Power Query · Dashboards |
| Streamlit Sentimentos | Análise de Dados | Python · Streamlit · Análise de Sentimentos | Python · Streamlit · Sentiment Analysis |
| Boutique Manager | Automação | Bash · Shell Script · Cron | Bash · Shell Script · Cron |

### Recomendações

1. Não usar tags duplicando a categoria (por exemplo, `Engenharia de Dados` na categoria e nas tags do mesmo post).
2. Evitar tags genéricas ou pouco úteis (`Outros`, `EDA` quando não agrega uma trilha clara, `NumPy` para um post que não a destaca).
3. Uma nova tag deve ser reutilizável ou representar um tema técnico pesquisável.
4. Evitar chamar o Streamlit de modelo de ML treinado sem código e métricas que comprovem isso.
5. Separar explicitamente **testes executados** de **testes recomendados**, e **resultados medidos** de hipóteses ou benefícios potenciais.
6. Não inventar métricas, produção, clientes reais, endpoints públicos ou evidências ausentes.
7. Preferir títulos `##` para as seções do artigo, alimentando o índice lateral já configurado no Toha.
8. Não alterar datas originais de publicação; use `lastmod` ao atualizar o texto.

## Roteiro do artigo

1. Resumo executivo
2. Project Overview (shortcode instalado na etapa anterior)
3. Problema e requisitos
4. Arquitetura e fluxo dos dados
5. Decisões de implementação
6. Demonstração
7. Testes e qualidade dos dados
8. Resultados e limitações
9. Aprendizados e próximos passos
10. Repositório e referências

## SEO e URLs

A mudança de tags/categorias pode alterar os endereços de páginas de **taxonomia**, apesar de os endereços dos **posts** permanecerem iguais. Se já houver links externos para arquivos antigos de tags, avalie redirecionamentos `aliases` ou mantenha a taxonomia até migrar os links.
