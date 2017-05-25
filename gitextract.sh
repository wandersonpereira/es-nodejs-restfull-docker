#!/bin/bash

print_usage() {

    echo ""
    echo "============================================================================================================================"
    echo ""
    print_err " Uso: ./gitextract.sh                                                                                                  "
    echo ""
    print_err "    --tag    Opcional. Gera o pacote.zip a partir da TAG informada, senão informado gera a partir da ultima TAG        "    
    print_err "    --no-src Opcional. Gera o pacote.zip sem considerar o diretorio src, utilizado para gerar pacote do projeto images "    
    echo ""
    echo "============================================================================================================================"
    echo ""
    exit 1
}

print_err() {
    echo -e "\033[31m$1\033[0m"
}

print_info() {
    echo -e "\033[32m$1\033[0m"
}

print_debug() {
    echo -e "\033[1;33m$1\033[0m"
}

if [ "x$1" = "x--help" ] ; then
    print_usage
fi

if [ "x$1" = "x--tag" ] ; then
	tag_origem=$2
else
	tag_origem=$(git describe | cut -c1-17)
fi

project_name=$(basename `git rev-parse --show-toplevel`)

#echo $tag_origem

echo ""
print_info "Fazendo download de atualizações..."
echo ""

git pull 2>/dev/null

if [ "$?x" != "0x" ] ; then
    echo ""
    print_err "Erro ao atualizar o fonte!"
    echo ""
    exit 1
fi

# Verificando se a tag de origem existe.
tst=$(git tag | grep ^$tag_origem$)

if [ "x$tst" = "x" ] ; then
    echo ""
    print_err "A tag $tag_origem nao foi encontrada!"
    echo ""
    exit 1
fi

echo ""
print_info "Iniciando geracao de pacote."
echo ""

print_info "Atualizando repositorio..."

git checkout master 2>/dev/null

if [ "$?x" != "0x" ] ; then
    echo ""
    print_err "Erro ao realizar o switch para master!"
    echo ""
    exit 1
fi

git pull origin master 2>/dev/null

if [ "$?x" != "0x" ] ; then
    echo ""
    print_err "Erro ao atualizar o fonte!"
    echo ""
    exit 1
fi

hash_tag=$(git rev-parse $tag_origem)

echo ""
print_debug "---------- Arquivos ----------"
git diff-tree -r --no-commit-id --name-only --diff-filter=ACMRT $hash_tag HEAD
print_debug "------------------------------"
echo ""

dirsrc="src"

if [ "x$1" = "x--no-src" ] ; then
    dirsrc=""
fi

if [ "$(git diff-tree -r --no-commit-id --name-only --diff-filter=ACMRT $hash_tag HEAD | grep -e ^$dirsrc)x" = "x" ] ; then
    echo ""
    print_err "Nao ha arquivos para o pacote!"
    echo ""
    exit 1
fi

if [ "x$dirsrc" = "x" ] ;  then
    arqs=$(git diff-tree -r --no-commit-id --name-only --diff-filter=ACMRT $hash_tag HEAD | awk '{print "\""$0"\""}')
    echo $arqs | xargs git archive -o $project_name.zip HEAD
else
    arqs=$(git diff-tree -r --no-commit-id --name-only --diff-filter=ACMRT $hash_tag HEAD | grep -e ^$dirsrc | awk '{gsub(/^src\//, "", $0); print "\""$0"\""}')
    cd src
    echo $arqs | xargs git archive -o ../$project_name.zip HEAD
    cd ..
fi

if [ "$?x" != "0x" ] ; then
    echo ""
    print_err "Erro ao gerar o pacote!"
    echo ""
    exit 1
fi

# Nome nova tag.
nova_tag=v$(date +%Y-%m-%d_%H-%M)

echo -e "Nova tag: \033[32m$nova_tag\033[0m"

git tag -a $nova_tag -m "Tag gerada em: $(date +'%d/%m/%Y %H:%M:%S')"

echo ""

echo -e "Publicando tag \033[32m$nova_tag\033[0m..."

git push origin $nova_tag 2>/dev/null

if [ "$?x" != "0x" ] ; then
    echo ""
    print_err "Erro ao publicar a tag $nova_tag!"
    echo ""
    exit 1
fi

echo ""
print_info "Processo finalizado com sucesso!!!"
echo ""
