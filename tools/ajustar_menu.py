"""Aplica alterações mínimas de navegação no Hugo Toha; cria .bak antes de alterar.
Rodar na raiz do site: python tools/ajustar_menu.py
"""
from pathlib import Path
import re
import shutil
import sys

root = Path.cwd()
if not (root / 'hugo.yaml').exists():
    sys.exit('ERRO: execute na raiz do projeto, onde existe hugo.yaml.')

changes = (
    ('about.yaml', 1, True),
    ('skills.yaml', 2, True),
    ('projects.yaml', 3, True),
    ('experiences.yaml', 4, False),
    ('education.yaml', 5, False),
    ('accomplishments.yaml', 6, False),
    ('featured-posts.yaml', 7, False),
    ('recent-posts.yaml', 8, False),
)

def patch(path: Path, weight: int, show: bool):
    if not path.is_file():
        print('ATENÇÃO: arquivo ausente:', path)
        return
    data = path.read_text(encoding='utf-8')
    section = re.search(r'(?ms)^section:\s*\n(?P<body>(?:(?:[ \t]+[^\n]*|[ \t]*\#.*|[ \t]*)\n)*)', data)
    if not section:
        raise ValueError(f'Seção section: não encontrada em {path}')
    body = section.group('body')
    # Só altera chaves reais, não comentários nem conteúdo das experiências.
    if re.search(r'(?m)^  weight\s*:', body):
        body = re.sub(r'(?m)^(  weight:\s*)[^\n#]*(.*)$', f'  weight: {weight}', body, count=1)
    else:
        body += f'  weight: {weight}\n'
    value = 'true' if show else 'false'
    if re.search(r'(?m)^  showOnNavbar\s*:', body):
        body = re.sub(r'(?m)^  showOnNavbar:\s*[^\n#]*(.*)$', f'  showOnNavbar: {value}', body, count=1)
    else:
        body += f'  showOnNavbar: {value}\n'
    result = data[:section.start('body')] + body + data[section.end('body'):]
    if result != data:
        backup = path.with_suffix(path.suffix + '.bak')
        if not backup.exists(): shutil.copy2(path, backup)
        path.write_text(result, encoding='utf-8')
        print('ATUALIZADO:', path.relative_to(root))
    else:
        print('OK:', path.relative_to(root))

for lang in ['en', 'pt-br']:
    for filename, weight, show in changes:
        patch(root / 'data' / lang / 'sections' / filename, weight, show)

# Tradução da opção nativa Posts (sem criar um segundo link duplicado no menu).
for lang, translation in [('en', 'Articles'), ('pt-br', 'Artigos')]:
    path = root / 'i18n' / f'{lang}.toml'
    path.parent.mkdir(exist_ok=True)
    source = path.read_text(encoding='utf-8') if path.is_file() else ''
    pattern = r'(?ms)^\[posts\]\s*\n(?:(?!\[).*(?:\n|$))*'
    replacement = f'[posts]\nother = "{translation}"\n'
    if re.search(pattern, source):
        updated = re.sub(pattern, replacement, source, count=1)
    else:
        updated = source.rstrip() + ('\n\n' if source.strip() else '') + replacement
    if updated != source:
        if path.is_file() and not path.with_suffix('.toml.bak').exists():
            shutil.copy2(path, path.with_suffix('.toml.bak'))
        path.write_text(updated, encoding='utf-8')
        print('I18N ATUALIZADO:', path.relative_to(root))

print('\nPronto. Revisar git diff e depois rodar hugo --minify.')
