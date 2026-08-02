import React from 'react'
import styled from 'styled-components'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Snackbar } from '@mui/material';

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
position: relative;
z-index: 1;
align-items: center;
@media (max-width: 960px) {
    padding: 0px;
}
`

const Wrapper = styled.div`
position: relative;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
width: 100%;
max-width: 1350px;
padding: 0px 0px 80px 0px;
gap: 12px;
@media (max-width: 960px) {
    flex-direction: column;
}
`

const Title = styled.h2`
font-size: 42px;
text-align: center;
font-weight: 600;
margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
      margin-top: 12px;
      font-size: 32px;
  }
`;

const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`;


const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(210, 100%, 15%, 1); /* Darker navy blue */
  background: linear-gradient(225deg, hsla(210, 100%, 15%, 1) 0%, hsla(220, 80%, 60%, 1) 100%); 
  background: -moz-linear-gradient(225deg, hsla(210, 100%, 15%, 1) 0%, hsla(220, 80%, 60%, 1) 100%); 
  background: -webkit-linear-gradient(225deg, hsla(210, 100%, 15%, 1) 0%, hsla(220, 80%, 60%, 1) 100%); 
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  /* The gradient is dark in both themes, so the label is always white —
     theme.text_primary made this dark-on-dark and unreadable in light mode. */
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: progress;
  }
`

// EmailJS browser credentials are public by design — they ship in every client
// bundle. Reading them from env keeps them out of git, but the control that
// actually matters is the domain allowlist in the EmailJS dashboard. The rebuild
// replaces this with a server-side send.
const EMAILJS_SERVICE = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

const Contact = () => {

  //hooks
  const [status, setStatus] = React.useState(null); // 'success' | 'error' | null
  const [sending, setSending] = React.useState(false);
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    emailjs
      .sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, form.current, EMAILJS_PUBLIC_KEY)
      .then(
        () => {
          setStatus("success");
          form.current.reset();
        },
        () => {
          setStatus("error");
        }
      )
      .finally(() => setSending(false));
  }



  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>Feel free to reach out to me for any questions or opportunities!</Desc>
        <ContactForm ref={form} onSubmit={handleSubmit} method='POST' netlify netlify-honeypot='bot-field'>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput type="email" required placeholder="Your Email" aria-label="Your email address" name="from_email" />
          <ContactInput required placeholder="Your Name" aria-label="Your name" name="from_name" />
          <ContactInput required placeholder="Subject" aria-label="Subject" name="subject" />
          <ContactInputMessage required placeholder="Message" aria-label="Message" rows="4" name="message" />
          <ContactButton type="submit" disabled={sending} value={sending ? "Sending…" : "Send"} />
          <p aria-live="polite" role="status" style={{ minHeight: "1.2em", fontSize: "0.9rem" }}>
            {status === "success" && "Thanks — your message is on its way."}
            {status === "error" && "Something went wrong. Email me directly at galen.myburgh46@gmail.com."}
          </p>
          <p style={{display: 'none'}}>
        <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
    </p>
        </ContactForm>
        <Snackbar
          open={status === "success"}
          autoHideDuration={6000}
          onClose={() => setStatus(null)}
          message="Email sent successfully!"
        />
      </Wrapper>
    </Container>
  )
}

export default Contact