import Footer from '../components/Footer';
import { iconesContato } from '../model/DataCard';
import '../styles/Style_Contact.css';

function Contact() {
  return (
    <section className="contato" id="contato">
      <div className="footer">
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
              <img src={iconesContato.whatsapp} alt="WhatsApp" />
              <img src={iconesContato.instagram} alt="Instagram" />
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
      </div>
    </section>
  );
}

export default Contact;
