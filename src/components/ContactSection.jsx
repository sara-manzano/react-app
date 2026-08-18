function ContactSection({ contactForm, contactStatus, onContactChange, onContactSubmit }) {
  return (
    <section className="section-block section-block--contact" id="contacto">
      <div className="section-heading fade-in">
        <div>
          <p className="section-heading__eyebrow">Contacto</p>
          <h2>Si quieres ayuda para elegir, escríbenos y te orientamos.</h2>
        </div>
        <p>También puedes usar este formulario para pedir una asesoría o reservar una atención más personalizada.</p>
      </div>

      <div className="contact-layout">
        <article className="contact-copy fade-in">
          <h3>¿En qué te podemos ayudar?</h3>
          <p>Maquillaje, cosmética y fragancias.</p>
          <div className="contact-highlights">
            <span className="product-pill">Respuesta en 24 horas</span>
          </div>
        </article>

        <form className="contact-form fade-in" onSubmit={onContactSubmit}>
          <label>
            Nombre
            <input
              type="text"
              required
              value={contactForm.name}
              onChange={(event) => onContactChange('name', event.target.value)}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              required
              value={contactForm.email}
              onChange={(event) => onContactChange('email', event.target.value)}
            />
          </label>

          <label>
            Tipo de servicio
            <select
              value={contactForm.service}
              onChange={(event) => onContactChange('service', event.target.value)}
            >
              <option>Maquillaje editorial</option>
              <option>Asesoría skincare</option>
              <option>Selección de fragancia</option>
              <option>Reserva para evento</option>
            </select>
          </label>

          <label>
            Mensaje
            <textarea
              rows="5"
              required
              value={contactForm.message}
              onChange={(event) => onContactChange('message', event.target.value)}
            />
          </label>

          <button type="submit" className="primary-button">
            Enviar mensaje
          </button>

          {contactStatus === 'success' && (
            <p className="feedback-message">Mensaje enviado. Te responderíamos por correo con los próximos pasos.</p>
          )}
        </form>
      </div>
    </section>
  )
}

export default ContactSection