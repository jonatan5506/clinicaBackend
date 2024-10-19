import express, {Request,Response} from "express";
const app = express();

app.get('/',(req: Request,res: Response)=>{
    res.send('App de Clínicas em Desenvolvimento');
})

const port = 3333
app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`);
});
