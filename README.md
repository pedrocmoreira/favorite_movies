# Favorite Movies

![GitHub repo size](https://img.shields.io/github/repo-size/pedrocmoreira/favorite_movies?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/pedrocmoreira/favorite_movies?style=for-the-badge)


## 🚀 Instalando o Favorite Movies

Para instalar o Favorite Movies, siga estas etapas:

- Adicione as variáveis de ambiente para o frontend (.env.local) e para o backend (.env)
- Inscreva-se no The movie Database para ter acesso a um access_token.

Linux e macOS:
```
git clone https://github.com/pedrocmoreira/favorite_movies.git
cd favorite_movies
docker compose up -d

# ou

-- backend
git clone https://github.com/pedrocmoreira/favorite_movies.git
cd favorite_movies
cd backend 
npm install
npx migrate dev
npm run dev

--frontend
cd frontend 
npm install
npm run dev

```

Windows:
```
git clone https://github.com/pedrocmoreira/favorite_movies.git
cd favorite_movies
docker compose up -d

# ou

-- backend
git clone https://github.com/pedrocmoreira/favorite_movies.git
cd favorite_movies
cd backend 
npm install
npx prisma migrate dev
npm run dev

--frontend
cd frontend 
npm install
npm run dev
```

## ☕ Usando o Favorite Movies

Para usar o Favorite Movies, siga estas etapas:

- Executar o comando do docker para que o banco seja criado (necessário docker instalado na máquina)
- Configurar as credenciais de desenvolvedor do discord no arquivo .env.example

## 🤝 Colaboradores
Este projeto foi codificado por: 

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/40441565?v=4" width="100px;" alt="Foto de Pedro Moreira no GitHub"/><br>
        <sub>
          <b>Pedro Moreira</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

[⬆ Voltar ao topo](#favorite_movies)<br>