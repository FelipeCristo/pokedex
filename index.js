import express from "express";
import path from "path";

const __dirname = path.resolve(path.dirname(""));


const app = express();
app.use(express.urlencoded({extended: true})); // O corpo (body) da requisição
app.use(express.json()); // converter para JSON

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
const port = 3001;
app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});

let message;

let pokedex = [
  {
    id: 1,
    numero: 1,
    nome: "Bulbasaur",
    tipo: 'Grama e Veneno',
    altura:"1 m",
    peso:"13,0 kg",
    categoria:'Seed',
    habilidade:'Superar',
    descricao:"Há uma semente de planta nas costas desde o dia em que este Pokémon nasce. A semente cresce lentamente",
    img:"https://www.pngmart.com/files/11/Pokemon-Bulbasaur-PNG-Pic.png",
  },
  {
    id: 2,
    numero: 2,
    nome: "Ivysaur",
    tipo: 'Grama e Veneno',
    altura:"1 m",
    peso:"13,0 kg",
    categoria:'Seed',
    habilidade:'Superar',
    descricao:"Quando o bulbo nas costas cresce, parece perder a capacidade de ficar em pé nas patas traseiras.",
    img:"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1f619ed0-b566-4538-8392-bf02ca7a76cd/dck5jo1-0fc1c9aa-9f74-47bd-8580-b1441fdaf694.png/v1/fill/w_900,h_815,strp/002_ivysaur_png___3__by_andersonaas107_dck5jo1-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODE1IiwicGF0aCI6IlwvZlwvMWY2MTllZDAtYjU2Ni00NTM4LTgzOTItYmYwMmNhN2E3NmNkXC9kY2s1am8xLTBmYzFjOWFhLTlmNzQtNDdiZC04NTgwLWIxNDQxZmRhZjY5NC5wbmciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.GTMMY53mnNIsvFVK1qYfoaXLVSbAPrL_AjxdOiGWnPU",
  },
  {
    id: 3,
    numero: 3,
    nome: "Venusaur",
    tipo: 'Grama e Veneno',
    altura:"2 m",
    peso:"100,0 kg",
    categoria:'Seed',
    habilidade:'Superar',
    descricao:"Sua planta floresce quando está absorvendo energia solar. Ele permanece em movimento para buscar a luz do sol",
    img:"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1f619ed0-b566-4538-8392-bf02ca7a76cd/dck5piz-3e9c725a-c76b-4203-8695-df0446ff5ecc.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzFmNjE5ZWQwLWI1NjYtNDUzOC04MzkyLWJmMDJjYTdhNzZjZFwvZGNrNXBpei0zZTljNzI1YS1jNzZiLTQyMDMtODY5NS1kZjA0NDZmZjVlY2MucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.DGJcu_QyjTNGqY2elh-xPh0S7s5gg7ISybX4K0-v8BM",
  }

 
];

app.get("/", (req, res) => {
  setTimeout(() => {
    message = "Bem vindo";
  }, 1000);
  res.render("index.ejs", {
    pokedex, message
  });
});

app.get("/detalhes/:id", (req, res) => {
  let pokemons
  pokedex.filter((element) =>{
    if( element.id == req.params.id){
      pokemons = element
    } 
  });
  res.render("detalhes.ejs",{
    pokemons, message
  }); 
});

app.get('/cadastro', (req, res) => {
  res.render('cadastro.ejs', {
      message
  });
});

app.post('/cadastro', (req, res) => {
  const value = pokedex[pokedex.length-1].id + 1;
  const {numero,nome,tipo,altura,peso,categoria,habilidade,descricao,img} = req.body;
  pokedex.push({id: value,numero,nome,tipo,altura,peso,categoria,habilidade,descricao,img});
  message = `Pokémon cadastrado!`;
  res.redirect("/");
});