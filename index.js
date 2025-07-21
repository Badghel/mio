const express = require ("express");
const app= express();
const PORT = 3000;

app.use(express.json());

let usuarios= [
    {id:1,
    nombre:"Luciano",
    apellido: "Escalante"},
    {id:2,
        nombre:"miguelon",
        apellido: "angel",
    },
];


app.get("/usuarios", (req,res)=>{
    res.json(usuarios);
})

//get
app.get('/usuarios/:id',(req,res)=>{
    const id= parseInt(req.params.id);
    const usuario = usuarios.find(u=>u.id==id);
    if(usuario){
        res.json(usuario);
    }else{
        res.status(404).json({mensaje:"Usuario no encontrado"});
    }
})
//post
app.post('/usuarios',(req,res)=>{
      const { body } = req;
      if (!body || typeof body !== 'object') {
    return res.status(400).json({ 
      mensaje: 'No se envió ningún dato en el cuerpo de la solicitud'
    });
  }
    const {nombre, apellido} = req.body;

     if (!nombre || !apellido) {
        return res.status(400).json({ 
      mensaje: 'Faltan datos: nombre y email son obligatorios'
    })
  }
    const nuevoUsuario={
        id:usuarios.length+1,
        nombre,
        apellido,
    };
    usuarios.push(nuevoUsuario);
   
     res.status(201).json(nuevoUsuario);
})

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});