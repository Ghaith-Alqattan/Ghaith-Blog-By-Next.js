import Head from 'next/head'
import ContactForm from '../components/contact/contact-form'

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact with Ghaith</title>
        <meta
          name="description"
          content="Contact Ghaith and send him messages!"
        />
      </Head>
      <ContactForm />
    </>
  )
}
