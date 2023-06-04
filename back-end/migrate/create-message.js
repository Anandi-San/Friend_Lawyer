import Message from "../models/MessageModel.js";

// Metode sync akan membuat tabel dalam database jika belum ada
Message.sync({ force: true }) // force: true akan menghapus tabel yang sudah ada dan membuat yang baru
  .then(() => {
    console.log("Tabel berhasil dibuat");
  })
  .catch((error) => {
    console.error("Terjadi kesalahan:", error);
  });
