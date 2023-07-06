const Evento = require("../models/Evento");

const getEventos = async (req, res) => {
  const eventos = await Evento.find().populate("user", "name");
  res.status(200).json({
    ok: true,
    eventos,
  });
};

const crearEvento = async (req, res) => {
  const evento = new Evento(req.body);

  try {
    evento.user = req.uid;
    const eventoDB = await evento.save();

    res.status(201).json({
      ok: true,
      msg: "Evento creado exitosamente!",
      evento: eventoDB,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarEvento = async (req, res) => {
  const eventoId = req.params.id;
  const uid = req.uid;
  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "El evento no existe por ese id",
      });
    }

    if (evento.user != uid) {
      return res.status(401).json({
        ok: false,
        msg: "No puede editar este evento",
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );

    res.json({
      ok: true,
      eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const eliminarEvento = async (req, res) => {
  const eventoId = req.params.id;
  const uid = req.uid;
  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "El evento no existe por ese id",
      });
    }

    if (evento.user != uid) {
      return res.status(401).json({
        ok: false,
        msg: "No puede borrar este evento",
      });
    }

    await Evento.findByIdAndDelete(eventoId);

    res.json({
      ok: true,
      msg: "Evento eliminado exitosamente",
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
