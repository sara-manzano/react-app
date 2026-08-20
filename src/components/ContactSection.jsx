function ContactSection({
  contactForm,
  contactStatus,
  onContactChange,
  onContactSubmit,
}) {
  return (
    <section className="section-block section-block--contact" id="contacto">
      <div className="section-heading fade-in">
        <div>
          <span className="section-heading__eyebrow">Atención al cliente</span>
          <h2>¿Tienes dudas con tu pedido o necesitas asesoría?</h2>
        </div>
        <p>Escríbenos y nuestro equipo te ayudará</p>
      </div>

      <div className="contact-layout">
        <article className="contact-copy fade-in">
          <h3>Soporte SkinScent</h3>
          <p>Maquillaje, Cosmética y Fragancias.</p>
          <div className="contact-highlights">
            <span className="product-pill">Respuesta en 24 horas</span>
            <span className="product-pill">🚚 Seguimiento de envíos</span>
            <span className="product-pill">🛡️ Devoluciones y Garantía</span>
          </div>
        </article>

        <form className="contact-form fade-in" onSubmit={onContactSubmit}>
          <label>
            Nombre Completo
            <input
              type="text"
              required
              placeholder="Tu nombre completo"
              value={contactForm.name}
              onChange={(event) => onContactChange("name", event.target.value)}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              required
              placeholder="tuemail@ejemplo.com"
              value={contactForm.email}
              onChange={(event) => onContactChange("email", event.target.value)}
            />
          </label>

          <label>
            Tipo de servicio
            <select
              value={contactForm.service}
              onChange={(event) =>
                onContactChange("service", event.target.value)
              }
            >
              <option value="pedido">
                Estado de mi pedido / Envío
              </option>
              <option value="asesoria-skin">
                Recomendación de Skincare
              </option>
              <option value="asesoria-makeup">
                Asesoría de Maquillaje
              </option>
              <option value="perfumes">
                Recomendación de Perfumes y Fragancias
              </option>
              <option value="devolucion">
                Devoluciones y Reclamaciones
                </option>
              <option value="otro">
                Otras consultas
              </option>
            </select>
          </label>

          <label>
            Consulta
            <textarea
              rows="5"
              required
              placeholder="Escribe aquí tu consulta o el número de referencia de tu compra..."
              value={contactForm.message}
              onChange={(event) =>
                onContactChange("message", event.target.value)
              }
            />
          </label>

          <button 
            type="submit"
            className="primary-button"
          >
            Enviar mensaje
          </button>

          {contactStatus === "success" && (
            <p className="feedback-message">
              Mensaje enviado. Te responderíamos en un plazo de 24 horas. ¡Gracias por contactarnos!
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default ContactSection;
