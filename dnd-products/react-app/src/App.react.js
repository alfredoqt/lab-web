import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CreateOrderDialog from "./CreateOrderDialog.react";

const STATUS = {
  SALIDA_DE_PLANTA: "SALIDA_DE_PLANTA",
  LDC: "LDC",
  PROCESO_ENTREGA: "PROCESO_ENTREGA",
  COMPLETADO: "COMPLETADO",
  FALLIDO: "FALLIDO",
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  creation: {
    display: "flex",
    padding: 16,
    width: "100%",
  },
  cardsContainer: {
    width: "100%",
    display: "flex",
    "& > *": {
      marginRight: 16,
      marginLeft: 16,
      flexGrow: 1,
    },
  },
  cardTitle: {
    width: "100%",
  },
}));

function groupOrdersByStatus(orders) {
  return orders.reduce((acc, current) => {
    const status = current.current_status;
    if (acc.hasOwnProperty(status)) {
      acc[status] = [...acc[status], current];
    } else {
      acc[status] = [];
    }
    return acc;
  }, {});
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:4001/orders");
      const json = await response.json();
      setOrders(json.data);
      setLoading(false);
    }
    fetchData();
  }, [setOrders, setLoading]);

  function onAdd(name) {
    setOpen(false);
    fetch("http://localhost:4001/orders", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      });
  }

  function onClose() {
    setOpen(false);
  }

  function onOpen() {
    setOpen(true);
  }

  const classes = useStyles();

  const groupedByStatus = groupOrdersByStatus(orders);

  return (
    <>
      {loading ? (
        <Typography>Cargando...</Typography>
      ) : (
        <main className={classes.root}>
          <div className={classes.creation}>
            <Button variant="contained" color="primary" onClick={onOpen}>
              Crear Pedido
            </Button>
          </div>
          <div className={classes.cardsContainer}>
            <Paper elevation={2}>
              <Typography
                className={classes.cardTitle}
                variant="h4"
                gutterBottom
                align="center"
              >
                Salida de Planta
              </Typography>
            </Paper>
            <Paper elevation={2}>
              <Typography
                className={classes.cardTitle}
                variant="h4"
                gutterBottom
                align="center"
              >
                Local Delivery Center
              </Typography>
            </Paper>
            <Paper elevation={2}>
              <Typography
                className={classes.cardTitle}
                variant="h4"
                gutterBottom
                align="center"
              >
                En Proceso de Entrega
              </Typography>
            </Paper>
            <Paper elevation={2}>
              <Typography
                className={classes.cardTitle}
                variant="h4"
                gutterBottom
                align="center"
              >
                Entregado
              </Typography>
            </Paper>
          </div>
        </main>
      )}
      <CreateOrderDialog onSave={onAdd} onClose={onClose} open={open} />
    </>
  );
}
