<style>
  div {
    max-width: 56em;
    margin: auto;
  }
  .photo {
    width: 100%;
    border: 1px solid #f0f0f0;
    height: 300px;
    margin: 20px auto;
    background-image: url(/profile.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  p {
    text-align: justify;
  }
</style>

<svelte:head>
  <title>About</title>
</svelte:head>

<div>
  <h1>Hi, I'm Matt.</h1>
  <div class="photo" />

  <p>
    I'm a software developer who also enjoys taking photos; this site is for
    showing off some of my favourite shots. Perhaps one day I will sell prints
    from here, perhaps one day there will still only be a couple of mediocre
    images because I have magpied my way onto the next shiny thing that takes my
    interest!
  </p>

  <p>
    If you want to get in touch for any reason then please contact me on
    <a href="mailto:photos@matt-thorning.dev">photos@matt-thorning.dev</a>
    or through the social media links above. :)
  </p>
</div>
