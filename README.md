<div align="center">
   <img  src="./assets/icon.svg" width=300 />
</div>

<p align="center">
 <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
 <img src="https://img.shields.io/badge/typescript-%23323330.svg?style=for-the-badge&logo=typescript&logoColor=FFFFFF&color=2F74C0">
 <img src="https://img.shields.io/badge/pnpm-6DA55F?style=for-the-badge&logo=pnpm&logoColor=white&color=F69220">
 <img src="https://img.shields.io/endpoint?url=https%3A%2F%2Ftwbadges.glitch.me%2Fbadges%2Fv2&style=for-the-badge">
 <img src="https://img.shields.io/endpoint?url=https%3A%2F%2Ftwbadges.glitch.me%2Fbadges%2Fstandard&style=for-the-badge">
</p>
<div align="center">
   <h1>Twitter Banner Followers</h1>
Coloca as últimas pessoas que te seguiram no Twitter dentro do banner da sua conta ;D
</br>
</br>
<img = src="./assets/print-perfil-twitter.png">
</br>
</br>
</div>

## 📦 Instalação:

Estou assumindo que você possui [Git](https://git-scm.com/) e [NodeJS](https://nodejs.org/en/) em seu sistema.

Usei pnpm neste projeto, então digite: (caso não tenha instalado)

```bash
npm install -g pnpm
```

Download do código:

```bash
 git clone https://github.com/pedroperegrinaa/twitter-banner-followers.git
```

"Download dos módulos:

```bash
pnpm install
```
## 🔒 .env

Crie um arquivo .env e preencha com os seguintes valores:

```env
API_KEY=
API_KEY_SECRET=
ACCESS_TOKEN=    
ACCESS_TOKEN_SECRET=
BEARER_TOKEN=

USER_ID=
```

**TOKENS DE ACESSO:** Pegue os seus tokens na [pagina de devs do Twitter](https://developer.twitter.com/en/portal/dashboard). Você precisa de acesso a API v1.1 e v2 do Twitter, então é necessário ter a permissão Elevated (como eles chamam)

![](./assets/permissoes.png)

**USER_ID:**  Você precisa definir o ID da conta que deseja coletar os seguidores. Para conseguir o ID do usuario, use este site: https://tweeterid.com/ 

## ⌨ Iniciando

```bash
pnpm start
```

Isso iniciará o monitoramento. Ao final do arquivo `src/server.js` temos a seguinte função:

```js
setInterval(() => {
init()
}, 65000)
```
O limite do endpoint consultado é de 15 requisições a cada 15 minutos, então o ideal é deixar em 65000 (5 segundos a mais só pra garantir que a aplicação não vai crashar)

## 🐳 Docker

Super simples, apenas dê um build e um run.

```bash
 docker build -t banner:1.0 .
```

```bash
 docker run --name banner-teste -d <ID-da-imagem>
```


