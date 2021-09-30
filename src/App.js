import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  IconButton,
  Checkbox,
  ListItemIcon,
} from "@mui/material/";
import DeleteIcon from "@mui/icons-material/Delete";
import "./index.css";

export default function App() {
  const [elementosTodo, setElementosTodo] = useState([]);
  const [contadorElementos, setContadorElementos] = useState(0);
  const [nuevoElemento, setNuevoElemento] = useState("");
  const añadirElemento = (event) => {
    const todoItem = {
      id: contadorElementos,
      text: nuevoElemento,
      done: false,
    };
    const nuevoElementosTodo = [...elementosTodo];
    nuevoElementosTodo.push(todoItem);
    setElementosTodo(nuevoElementosTodo);
    setContadorElementos(contadorElementos + 1);
    setNuevoElemento("");
  };
  const modificarNuevoElemento = (event) => {
    setNuevoElemento(event.target.value);
  };
  const elementoDone = (id) => () => {
    const newList = [...elementosTodo];
    const todoItem = newList.find((element) => element.id === id);
    todoItem.done = !todoItem.done;
    setElementosTodo(newList);
  };
  const deleteElement = (id) => () => {
    const newList = [...elementosTodo];
    const deletedElement = newList.find((element) => element.id === id);
    const index = newList.indexOf(deletedElement);
    newList.splice(index, 1);
    setElementosTodo(newList);
  };
  const deleteAllDoneElements = (event) => {
    const deletingElements = [...elementosTodo];
    deletingElements
      .filter((element) => element.done === true)
      .map((elemento) => {
        const index = deletingElements.indexOf(elemento);
        console.log(elementosTodo);
        console.log(index);
        deletingElements.splice(index, 1);
        setElementosTodo(deletingElements);
        return index;
      });
  };
  return (
    <main>
      <Typography
        variant="h1"
        sx={{
          padding: 5,
          color: "white",
          backgroundColor: "blue",
          paddingBottom: 0,
          borderRadius: 5,
        }}
      >
        Lista ToDo
      </Typography>
      <Box display="flex" alignItems="center" sx={{ paddingTop: 3 }}>
        <TextField
          label="Añadir a lista ToDo:"
          placeholder="Escribe aquí..."
          type="text"
          value={nuevoElemento}
          sx={{ marginRight: 2 }}
          onChange={modificarNuevoElemento}
        />
        <Button onClick={añadirElemento} variant="contained" color="secondary">
          Add
        </Button>
      </Box>
      <Typography variant="h2">ToDo</Typography>
      <List
        sx={{
          width: "35%",
          height: "30%",
          position: "relative",
          overflow: "auto",
          maxHeight: 200,
        }}
      >
        {elementosTodo
          .filter((element) => element.done === false)
          .map((elemento) => {
            return (
              <ListItem
                key={elemento.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={deleteElement(elemento.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemButton onClick={elementoDone(elemento.id)}>
                  <ListItemIcon>
                    <Checkbox />
                  </ListItemIcon>
                  <ListItemText>{elemento.text}</ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
      <Typography variant="h2">Done</Typography>
      <List>
        {elementosTodo
          .filter((element) => element.done === true)
          .map((elemento) => {
            return (
              <ListItem
                key={elemento.id}
                className="done"
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={deleteElement(elemento.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemButton onClick={elementoDone(elemento.id)}>
                  <ListItemIcon>
                    <Checkbox checked />
                  </ListItemIcon>
                  <ListItemText>{elemento.text}</ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
      <Button
        onClick={deleteAllDoneElements}
        variant="contained"
        color="secondary"
      >
        Delete All Done Elements
      </Button>
    </main>
  );
}
