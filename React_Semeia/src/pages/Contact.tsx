import Footer from '../components/Footer';
import { iconesContato } from '../model/data';
import '../styles/Style_Contact.css';

function Contact() {
  return (
    <section className="contato" id="contato">
      <footer className="footer">
        <div className="area-contato">
          <div className="semeia-code">
            <div className="logo-semeia">
              <img src="/images/logos/Logo Semeia-Photoroom.png" alt="Semeia Code" />
              <h2>Semeia Code</h2>
            </div>
            <div className="texto-semeia">
              <p>
                Projeto de extensão universitária que ensina programação em escolas públicas, semeando
                talentos pela tecnologia.
              </p>
            </div>
          </div>

          <div className="fale-conosco">
            <h2>Fale conosco</h2>
            <div className="icones-contato">
                {iconesContato.whatsapp.url ? (
                  <a href={iconesContato.whatsapp.url} aria-label={iconesContato.whatsapp.label}>
                    <img src={iconesContato.whatsapp.image} alt="" />
                  </a>
                ) : null}
                {iconesContato.instagram.url ? (
                  <a href={iconesContato.instagram.url} aria-label={iconesContato.instagram.label}>
                    <img src={iconesContato.instagram.image} alt="" />
                  </a>
                ) : null}
            </div>
          </div>

          <div className="navegacao">
            <h2>Navegação</h2>
            <div className="elementos-navegacao">
              <nav className="nav-contato">
                <a href="#sobre">Sobre nós</a>
                <a href="#conteudo">Conteúdo</a>
                <a href="#dados">Dados</a>
                <a href="#historia">História</a>
              </nav>
            </div>
          </div>
        </div>

        <Footer />
      </footer>
    </section>
  );
}

export default Contact;
