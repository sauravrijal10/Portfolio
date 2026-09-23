"use client";

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from './page.module.css';

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    setIsSubmitting(true);
    setStatusMessage('');

    // NOTE: You need to replace these with your actual EmailJS IDs
    // Create an account at emailjs.com and follow the setup guide
    const SERVICE_ID = 'service_ch3lpdk';
    const TEMPLATE_ID = 'template_m4ik5f9';
    const PUBLIC_KEY = 'qpeLkgkCOAB6j_xEZ';

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          setStatusMessage('Message sent successfully!');
          setIsSubmitting(false);
          form.current?.reset();
        },
        (error) => {
          setStatusMessage('Failed to send message. Please try again.');
          console.error('EmailJS Error:', error.text);
          setIsSubmitting(false);
        },
      );
  };

  return (
    <div className={styles.container}>
      <h1 className="pageTitle animate-fade-in">Get in Touch</h1>
      <p className="pageSubtitle animate-fade-in delay-100">
        Looking for a software engineer to build your APIs and applications, set up cloud infrastructure, or streamline your DevOps?
        Let&apos;s connect — I&apos;m always open to new challenges and collaborations.
      </p>

      <div className={`${styles.content} animate-fade-in delay-200`}>
        <div className={`${styles.formContainer} card`}>
          <h2 className={styles.formTitle}>Send a Message</h2>
          <form ref={form} onSubmit={sendEmail} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Name</label>
              <input type="text" name="user_name" id="name" placeholder="Your name" required />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" name="user_email" id="email" placeholder="john@example.com" required />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="message">Message</label>
              <textarea name="message" id="message" rows={5} placeholder="Hello..." required></textarea>
            </div>

            <button type="submit" className="btnPrimary" disabled={isSubmitting}>
              {isSubmitting && <span className={styles.spinner}></span>}
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {statusMessage && (
              <p className={`${styles.statusMessage} ${statusMessage.includes('successfully') ? styles.statusSuccess : styles.statusError} animate-fade-in`}>
                {statusMessage}
              </p>
            )}
          </form>
        </div>

        <div className={styles.contactInfo}>
          <div className={styles.infoBlock}>
            <h3>Email</h3>
            <a href="mailto:sauravrijal1011@gmail.com" className={styles.emailLink}>sauravrijal1011@gmail.com</a>
          </div>

          <div className={styles.infoBlock}>
            <h3>Socials</h3>
            <div className={styles.socialLinks}>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
