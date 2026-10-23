"""DiogoDATA: corrige apenas pesos/visibilidade do menu e maxVisibleSections.
Não substitui os textos das experiências, estudos, seções ou imagens.
Não produz .bak dentro de data/, evitando erro de build do Hugo.
Execute: python tools/corrigir_menu.py
"""
from pathlib import Path
import re
import sys

root = Path.cwd()
config = root / 'hugo.yaml'
if not config.is_file():
    sys.exit('ERRO: abra o terminal na pasta que contém hugo.yaml.')

# showOnNavbar controla somente o link da navegação (não a visibilidade da seção).
menu = {
    'about.yaml': (1, True),
    'skills.yaml': (2, True),
    'projects.yaml': (3, True),
    'experiences.yaml': (4, True),
    'education.yaml': (5, True),
    'accomplishments.yaml': (6, True),
    'featured-posts.yaml': (7, False), # seção antiga, permanece desativada
    'recent-posts.yaml': (8, False),  # link Articles/Artigos já aparece separado
}

def replace_property(section: str, key: str, value: str) -> str:
    pattern = rf'(?m)^([ \t]+{re.escape(key)}:[ \t]*)[^\n]*$'
    if re.search(pattern, section):
        return re.sub(pattern, lambda m: m.group(1) + value, section, count=1)
    return section.rstrip('\n') + f'\n  {key}: {value}\n'

for lang in ('en', 'pt-br'):
    for name, (weight, visible) in menu.items():
        path = root / 'data' / lang / 'sections' / name
        if not path.exists():
            print('Aviso: não encontrado:', path.relative_to(root))
            continue
        content = path.read_text(encoding='utf-8')
        match = re.search(r'(?m)^section:\s*\n', content)
        if not match:
            print('Aviso: section não encontrada em', path.relative_to(root))
            continue
        start = match.end()
        # fim das propriedades da seção é a próxima chave YAML na coluna 1
        next_key = re.search(r'(?m)^[A-Za-z_][A-Za-z0-9_-]*:', content[start:])
        end = start + next_key.start() if next_key else len(content)
        before, body, after = content[:start], content[start:end], content[end:]
        body = replace_property(body, 'weight', str(weight))
        body = replace_property(body, 'showOnNavbar', str(visible).lower())
        if name == 'projects.yaml':
            body = replace_property(body, 'name', 'Projects' if lang == 'en' else 'Projetos')
        modified = before + body + after
        if modified != content:
            path.write_text(modified, encoding='utf-8')
            print('Corrigido:', path.relative_to(root))

content = config.read_text(encoding='utf-8')
# Valor 4: Home + About + Skills + Projects no menu superior, conforme layout do Toha.
pattern = r'(?m)^(\s*maxVisibleSections:\s*)\d+\s*$'
if re.search(pattern, content):
    updated = re.sub(pattern, r'\g<1>4', content, count=1)
    if updated != content:
        config.write_text(updated, encoding='utf-8')
        print('Corrigido: hugo.yaml -> topNavbar.maxVisibleSections: 4')
else:
    print('ATENÇÃO: parâmetro maxVisibleSections não encontrado. Adicione-o no bloco params.topNavbar.')
print('\nConcluído. Revise as alterações com git diff antes de publicar.')
