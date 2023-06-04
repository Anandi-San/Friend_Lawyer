import React from "react";
import img from "../../img/foto.svg";


const KonsultasiChat = () => {
    return(
        <div className="container landing-page">
        <section className="section">
          <h2 className="title">Daftar Pengacara Profesional</h2>
          <div className="columns">
            <div className="column">
              <div className="card">
                <div className="card-image">
                  <figure className="image">
                    <img src={img} alt="Layanan 1" />
                  </figure>
                </div>
                <div className="card-content">
                 <h4 className="title is-4">Prof. Budi</h4> 
                  <li>Kasus Penistaan Agama</li>
                  <li>Kasus Merendahkan Perumpuan</li>
                  <li>Kasus Mogok Kerja</li>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="card">
                <div className="card-image">
                  <figure className="image">
                    <img src={img} alt="Layanan 2" />
                  </figure>
                </div>
                <div className="card-content">
                <h4 className="title is-4"> Prof. soetarno</h4> 
                  <li>Kasus Penganiayaan</li>
                  <li>Kasus Pelanggaran Ham</li>
                  <li>Kasus Pembullyan 1 ras</li>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="card">
                <div className="card-image">
                  <figure className="image">
                    <img src={img} alt="Layanan 3" />
                  </figure>
                </div>
                <div className="card-content">
                <h4 className="title is-4">Prof. titler</h4> 
                    <li>Kasus Pelanggaran Ham</li>
                    <li>Kasus </li>
                    <li>Kasus </li>
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>
    )
}

export default KonsultasiChat