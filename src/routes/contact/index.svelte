<script>
  import { goto } from '@sapper/app'
  import Spinner from '../../components/Spinner.svelte'

  let submitting = false
  let error = false

  function onError() {
    error = true
    submitting = false
  }

  function onSuccess() {
    goto('/thankyou?type=message')
  }

  async function submit({ target }) {
    submitting = true

    const {
      name: { value: name },
      email: { value: email },
      message: { value: message },
    } = target

    console.log(name, email, message)
    try {
      const response = await fetch('/contact', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      })
      if (Number(response.status) >= 400) return onError()

      const data = await response.json()
      onSuccess(data)
    } catch (e) {
      return onError()
    }
  }
</script>

<style>
  div {
    max-width: 56em;
    margin: auto;
  }
  form {
    display: flex;
    flex-direction: column;
    margin: 56px auto;
  }
  label {
    margin-bottom: 12px;
  }
  input,
  textarea {
    margin-bottom: 24px;
    min-height: 35px;
  }
  button[type='submit'] {
    align-self: flex-end;
    width: 75px;
    height: 30px;
    cursor: pointer;
  }
  .spinner {
    display: inline-block;
    height: 10px;
    width: 10px;
  }
</style>

<div>
  <h1>Contact</h1>
  <p>
    Please leave your details in the form below and I will get back to you as
    soon as possible.
  </p>
  <form on:submit|preventDefault={submit}>
    <label for="name">Name</label>
    <input required id="name" />
    <label for="email">Email</label>
    <input required id="email" type="email" />
    <label for="message">Message</label>
    <textarea required rows="10" id="message" />
    {#if error}
      <p>
        There has been an error submitting this form, please contact
        <a href="mailto:matthewthorning@gmail.com">matthewthorning@gmail.com</a>
        for assistance.
      </p>
    {/if}
    <button type="submit" disabled={submitting}>
      Submit
      {#if submitting}
        <div class="spinner">
          <Spinner />
        </div>
      {/if}
    </button>
  </form>
</div>
