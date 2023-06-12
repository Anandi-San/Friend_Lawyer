import Notifcation from "../models/NotifcationModel.js";

// Metode sync akan membuat tabel dalam database jika belum ada
Notifcation.sync()// force: true akan menghapus tabel yang sudah ada dan membuat yang baru
  .then(() => {
    console.log("Tabel berhasil dibuat");
  })
  .catch((error) => {
    console.error("Terjadi kesalahan:", error);
  });
