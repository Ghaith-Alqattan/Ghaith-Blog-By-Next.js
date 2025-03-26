import { useEffect, useState } from 'react'
import Notification from '../ui/notification'
import classes from './contact-form.module.css'

async function sendContactData(contactDetails) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error('something went wrong')
  }
}

export default function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredName, setEnteredName] = useState('')
  const [enteredMessage, setEnteredMessage] = useState('')
  const [reqStatus, setReqStatus] = useState()
  const [errorReq, setErrorReq] = useState()

  useEffect(() => {
    if (reqStatus === 'success' || reqStatus === 'error') {
      let timer = setTimeout(() => {
        setReqStatus(null)
        setErrorReq(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [reqStatus])

  async function sendMessageHandler(event) {
    event.preventDefault()
    setReqStatus('pending')

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      })
      setReqStatus('success')
    } catch (error) {
      setErrorReq(error.message)
      setReqStatus('error')
    }
  }

  let note

  if (reqStatus === 'pending') {
    note = {
      status: 'pending',
      title: 'Sending Message...',
      message: 'Your Message is on it way',
    }
  }

  if (reqStatus === 'success') {
    note = {
      status: 'success',
      title: 'Message Send successfully.',
      message: 'Your Message is Done',
    }
  }

  if (reqStatus === 'error') {
    note = {
      status: 'error',
      title: 'Message Failed.',
      message: errorReq,
    }
  }

  return (
    <section className={classes.contact}>
      <h1>How can I Help You?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
              type="email"
              id="email"
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
              type="text"
              id="name"
              required
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Name</label>
          <textarea
            value={enteredMessage}
            onChange={(event) => setEnteredMessage(event.target.value)}
            rows="5"
            id="message"
            required
          />
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {note && (
        <Notification
          status={note.status}
          title={note.title}
          message={note.message}
        />
      )}
    </section>
  )
}
