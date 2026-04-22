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
        Looking for a backend developer to build your APIs, set up cloud infrastructure, or streamline your DevOps?
        Let&apos;s connect — I&apos;m always open to new challenges and collaborations.
      </p>

      <div className={`${styles.content} animate-fade-in delay-200`}>
        <div className={`${styles.formContainer} card`}>
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
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {statusMessage && <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: statusMessage.includes('successfully') ? 'var(--accent)' : 'red' }}>{statusMessage}</p>}
          </form>
        </div>

        <div className={styles.contactInfo}>
          <div className={styles.infoBlock}>
            <h3>Email</h3>
            <p>hello@example.com</p>
          </div>

          <div className={styles.infoBlock}>
            <h3>Socials</h3>
            <div className={styles.socialLinks}>
              <a href="https://twitter.com">Twitter</a>
              <a href="https://github.com">GitHub</a>
              <a href="https://linkedin.com">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
