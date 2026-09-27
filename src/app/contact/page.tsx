"use client";

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from './page.module.css';
import Window from '@/components/Window';

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
      <h1 className="pageTitle animate-fade-in">Drop Me a Line!</h1>
      <p className="pageSubtitle animate-fade-in delay-100">
        Looking for a software engineer to build your APIs and applications, set up cloud infrastructure, or streamline your DevOps?
        Let&apos;s connect — I&apos;m always open to new challenges and collaborations.
      </p>

      <div className={`${styles.content} animate-fade-in delay-200`}>
        <Window title="New Message - Sign my Guestbook!" icon="✉️">
          <form ref={form} onSubmit={sendEmail} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Name:</label>
              <input type="text" name="user_name" id="name" placeholder="Your name" required />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">E-mail:</label>
              <input type="email" name="user_email" id="email" placeholder="john@example.com" required />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="message">Message:</label>
              <textarea name="message" id="message" rows={6} placeholder="Hello..." required></textarea>
            </div>

            <div className={styles.actions}>
              <button type="submit" className="btnPrimary" disabled={isSubmitting}>
                {isSubmitting ? '⌛ Sending...' : 'Send Message'}
              </button>
              <button type="reset" className="btnSecondary" disabled={isSubmitting}>Clear</button>
            </div>
            {statusMessage && (
              <p
                role="status"
                className={`${styles.statusMessage} ${statusMessage.includes('successfully') ? styles.statusSuccess : styles.statusError} sunken`}
              >
                <span aria-hidden="true">{statusMessage.includes('successfully') ? 'ℹ️' : '⚠️'}</span>
                {statusMessage}
              </p>
            )}
          </form>
        </Window>

        <Window title="Contact Info" icon="📇" inactive bodyClassName={styles.contactInfo}>
          <div className={styles.infoBlock}>
            <h3>E-mail</h3>
            <a href="mailto:sauravrijal1011@gmail.com">sauravrijal1011@gmail.com</a>
          </div>

          <div className={styles.infoBlock}>
            <h3>Find me on the Web</h3>
            <ul className={styles.socialLinks}>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            </ul>
          </div>

          <p className={styles.note}>
            <span className="newTag">HOT</span> I usually reply within 24 hours!
          </p>
        </Window>
      </div>
    </div>
  );
}
