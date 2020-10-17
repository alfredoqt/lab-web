import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CreateOrderDialog from "./CreateOrderDialog.react";
import { useDrop, useDrag } from "react-dnd";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const STATUS = {
  SALIDA_DE_PLANTA: "SALIDA_DE_PLANTA",
  LDC: "LDC",
  PROCESO_ENTREGA: "PROCESO_ENTREGA",
  COMPLETADO: "COMPLETADO",
  FALLIDO: "FALLIDO",
};

const statusList = [
  "SALIDA_DE_PLANTA",
  "LDC",
  "PROCESO_ENTREGA",
  "COMPLETADO",
  "FALLIDO",
];

const statusToTitle = {
  SALIDA_DE_PLANTA: "Salida de Planta",
  LDC: "Local Delivery Center",
  PROCESO_ENTREGA: "En Proceso de Entrega",
  COMPLETADO: "Completado",
  FALLIDO: "Fallido",
};

function ListSection({ status, children, changeOrderStatus }) {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "card",
    drop(item) {
      changeOrderStatus(item.id, status);
    },
    canDrop(item, monitor) {
      if (item.current_status === STATUS.COMPLETADO) {
        return false;
      }
      if (
        item.current_status !== STATUS.SALIDA_DE_PLANTA &&
        status === STATUS.SALIDA_DE_PLANTA
      ) {
        return false;
      }
      console.log("here");
      return true;
    },
  });
  drop(ref);
  return <div ref={ref}>{children}</div>;
}

function ListItemDraggable({ current_status, id, children }) {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    item: { type: "card", id, current_status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(ref);
  return (
    <div ref={ref} style={{ opacity }}>
      {children}
    </div>
  );
}

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
  card: {
    padding: 8,
  },
  cardTitle: {
    width: "100%",
  },
  column: {
    height: "80vh",
  },
}));

function groupOrdersByStatus(orders) {
  return orders.reduce(
    (acc, current) => {
      const status = current.current_status;
      if (acc.hasOwnProperty(status)) {
        acc[status] = [...acc[status], current];
      } else {
        acc[status] = [];
      }
      return acc;
    },
    {
      SALIDA_DE_PLANTA: [],
      LDC: [],
      PROCESO_ENTREGA: [],
      COMPLETADO: [],
      FALLIDO: [],
    }
  );
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

  function handleChangeOrderStatus(id, status) {
    fetch(`http://localhost:4001/orders/${id}`, {
      method: "put",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ newStatus: status }),
    })
      .then((response) => response.json())
      .then((json) => {
        const indexFound = orders.findIndex(
          (order) => order.id === json.data.id
        );
        if (indexFound !== -1) {
          setOrders([
            ...orders.slice(0, indexFound),
            { ...orders[indexFound], current_status: status },
            ...orders.slice(indexFound + 1),
          ]);
        }
      });
  }

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
            {statusList.map((statusName) => (
              <Paper elevation={2} className={classes.card}>
                <Typography
                  className={classes.cardTitle}
                  variant="h4"
                  gutterBottom
                  align="center"
                >
                  {statusToTitle[statusName]}
                </Typography>
                <ListSection
                  status={statusName}
                  changeOrderStatus={handleChangeOrderStatus}
                >
                  <List className={classes.column}>
                    {groupedByStatus[statusName].map((order) => (
                      <ListItemDraggable
                        key={order.id}
                        current_status={order.current_status}
                        id={order.id}
                      >
                        <ListItem>
                          <Paper elevation={4} className={classes.card}>
                            <Typography>{order.name}</Typography>
                          </Paper>
                        </ListItem>
                      </ListItemDraggable>
                    ))}
                  </List>
                </ListSection>
              </Paper>
            ))}
          </div>
        </main>
      )}
      <CreateOrderDialog onSave={onAdd} onClose={onClose} open={open} />
    </>
  );
}
