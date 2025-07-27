import  express  from "express";
import usuariosRoutes from "./routes/usuariosRoutes";
import patentesRoutes from "./routes/patentesRoutes";
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/usuarios",usuariosRoutes);
app.use("/patentes",patentesRoutes);

app.listen(PORT,() => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});