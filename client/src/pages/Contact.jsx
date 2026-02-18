// useMemo - stores form values + status
// useState - touched fields for validation feedback
import { useMemo, useState } from "react";
// import styles
import "../styles/contact.css";

// validation
function validate(values) {
  // collects validation errors
  const errors = {};

  // if name is empty or only whitespace , add error message to errors object
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email.";
  // if email is not empty but doesn't match a basic email regex pattern , add error message to errors object
  else if (!/^\S+@\S+\.\S+$/.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";

  // if message is empty or only whitespace , add error message to errors object
  if (!values.message.trim()) errors.message = "Tell us what you need.";
  // if topic is not selected ( empty string ) , add error message to errors object
  if (!values.topic) errors.topic = "Please choose a topic.";

  // return errors object
  return errors;
}

// create functional component for contact page ; exported so App.jsx can use it in the route
export default function Contact() {
  // values - holds the current values of the form fields
  // setValues - function to update the values state
  // starts as an object with empty strings for text fields and true for the subscribe checkbox
  const [values, setValues] = useState({
    name: "",
    email: "",
    topic: "",
    order: "",
    subscribe: true,
    message: "",
  });

  // touched - keeps track of which fields have been interacted with ( focused and blurred ) to determine when to show validation errors ; starts as an empty object
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ type: "idle", msg: "" }); // idle | success | error

  // useMemo to recalculate validation only when values change
  const errors = useMemo(() => validate(values), [values]);
  // only show error if user has touched field or there is an error for it
  const showError = (field) => touched[field] && errors[field];

  // destructuring event target
  function onChange(e) {
    const { name, type, value, checked } = e.target;
    setValues((v) => ({
      // copies previous values and updates the one that changed based on the input type ( checkbox uses checked property , others use value )
      ...v,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // when a field loses focus , mark it as touched to enable error display if there are validation issues
  function onBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  // handle form submission
  async function onSubmit(e) {
    e.preventDefault();

    // mark all fields as touched to show errors for any invalid fields that haven't been interacted with yet
    setTouched({
      name: true,
      email: true,
      topic: true,
      message: true,
    });

    // validate form values and if there are errors , set status to error with a message and stop submission
    const currentErrors = validate(values);
    if (Object.keys(currentErrors).length > 0) {
      // if there are any validation errors , set status to error with a message and stop submission
      setStatus({ type: "error", msg: "Please fix the highlighted fields." });
      return;
    }

    try {
      // reset status to idle before attempting submission to clear any previous messages
      setStatus({ type: "idle", msg: "" });

      // send form data to the backend server using fetch API ; the endpoint is /api/messages and we use POST method to create a new message ; the request body is a JSON stringified version of the form values
      const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

      await fetch(`${API_BASE}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      // if the response is not ok , attempt to parse the error message from the response and throw an error to be caught in the catch block ; if parsing fails , throw a generic error with the HTTP status code
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      setStatus({
        // if the submission is successful , set status to success with a confirmation message
        type: "success",
        msg: "Message sent! We’ll get back to you within 1–2 business days.",
      });

      // reset form values to initial state and clear touched fields to reset the form after successful submission
      setValues({
        name: "",
        email: "",
        topic: "",
        order: "",
        subscribe: true,
        message: "",
      });
      // clear touched fields to hide validation errors on the reset form
      setTouched({});
    } catch (err) {
      // if any error occurs during submission , log it to the console for debugging and set status to error with message
      console.error(err);
      setStatus({
        type: "error",
        msg: "Something went wrong sending your message. Please try again.",
      });
    }
  }

  return (
    <>
      <section className="section-contact">
        <div className="page-shell contact-hero-wrapper">
          <div className="contact-video-wrapper">
            <video
              className="contact-hero-video"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/media/pancake_video2.mp4" type="video/mp4" />
            </video>

            <div className="contact-video-overlay" />

            <div className="contact-video-text">
              <p className="eyebrow">Customer care</p>
              <h1>Let’s talk brunch.</h1>
              <p>
                Questions about an order, ingredients, or wholesale? Send us a
                note — we’re happy to help.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-quote-section">
        <div className="contact-quote-inner">
          <img
            className="contact-quote-image"
            src="/media/quotestack2.PNG"
            alt=""
            aria-hidden="true"
          />
          <p className="contact-quote">“Good mornings start here.”</p>
          <p className="contact-quote-sub">
            Our small team reads every message. If it’s about an order, include
            your order number so we can move faster.
          </p>
        </div>
      </section>

      <section className="page-shell">
        <div className="contact-panel">
          <div className="contact-layout">
            {/* FORM */}
            <div className="contact-form-wrapper">
              <header className="contact-header">
                <h2>Send a message</h2>
                <p>
                  We typically respond within 1–2 business days (often sooner).
                </p>
              </header>

              <form className="contact-form" onSubmit={onSubmit} noValidate>
                <div className="field">
                  <label htmlFor="name">
                    Name <span className="field-required">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={onChange}
                    onBlur={onBlur}
                    aria-invalid={showError("name") ? "true" : "false"}
                    autoComplete="name"
                  />
                  <div className="error-message" role="status">
                    {showError("name") ? errors.name : ""}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="email">
                    Email <span className="field-required">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={onChange}
                    onBlur={onBlur}
                    aria-invalid={showError("email") ? "true" : "false"}
                    autoComplete="email"
                  />
                  <p className="field-help">
                    We’ll only use this to respond to your message.
                  </p>
                  <div className="error-message" role="status">
                    {showError("email") ? errors.email : ""}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="topic">
                    Topic <span className="field-required">*</span>
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    value={values.topic}
                    onChange={onChange}
                    onBlur={onBlur}
                    aria-invalid={showError("topic") ? "true" : "false"}
                  >
                    <option value="">Select one…</option>
                    <option value="order">Order help</option>
                    <option value="ingredients">Ingredients</option>
                    <option value="wholesale">Wholesale</option>
                    <option value="press">Press</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="error-message" role="status">
                    {showError("topic") ? errors.topic : ""}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="order">
                    Order number{" "}
                    <span className="field-optional">(optional)</span>
                  </label>
                  <input
                    id="order"
                    name="order"
                    value={values.order}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="e.g., BB-10482"
                  />
                  <p className="field-note">
                    If your message is about an order, adding this helps us help
                    you faster.
                  </p>
                </div>

                <div className="field">
                  <label htmlFor="message">
                    Message <span className="field-required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={values.message}
                    onChange={onChange}
                    onBlur={onBlur}
                    aria-invalid={showError("message") ? "true" : "false"}
                  />
                  <div className="error-message" role="status">
                    {showError("message") ? errors.message : ""}
                  </div>
                </div>

                <div className="field field-inline">
                  <div className="checkbox-wrapper">
                    <input
                      id="subscribe"
                      name="subscribe"
                      type="checkbox"
                      checked={values.subscribe}
                      onChange={onChange}
                    />
                    <label htmlFor="subscribe">
                      Yes, send me product drops and seasonal releases.
                    </label>
                  </div>
                </div>

                <div className="contact-submit">
                  <button className="btn primary" type="submit">
                    Send message
                  </button>

                  {status.type !== "idle" && (
                    <p
                      className={`form-status ${
                        status.type === "success"
                          ? "form-status--success"
                          : "form-status--error"
                      }`}
                      role="status"
                    >
                      {status.msg}
                    </p>
                  )}
                </div>
              </form>
            </div>

            {/* ASIDE CARD */}
            <aside className="contact-aside">
              <div className="contact-card">
                <h2>Customer care</h2>
                <p>
                  We’re here for order questions, ingredient info, and anything
                  brunch-related.
                </p>

                <dl className="contact-details">
                  <div>
                    <dt>Email</dt>
                    <dd>
                      <a href="mailto:hello@bakebrunch.co">
                        hello@bakebrunch.co
                      </a>
                    </dd>
                  </div>

                  <div>
                    <dt>Hours</dt>
                    <dd>Mon–Fri • 9am–5pm</dd>
                  </div>

                  <div>
                    <dt>Wholesale</dt>
                    <dd>
                      <a href="mailto:wholesale@bakebrunch.co">
                        wholesale@bakebrunch.co
                      </a>
                    </dd>
                  </div>
                </dl>

                <p className="aside-note">
                  Tip: If you’re asking about shipping, include your zip code so
                  we can estimate delivery time.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
