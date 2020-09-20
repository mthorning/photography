<script>
  import FaInstagram from 'svelte-icons/fa/FaInstagram.svelte'
  import FaTwitterSquare from 'svelte-icons/fa/FaTwitterSquare.svelte'
  import FaBars from 'svelte-icons/fa/FaBars.svelte'
  export let segment
</script>

<style>
  nav {
    border-bottom: 1px solid #444;
    font-weight: 300;
    padding: 0 1em;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    height: 57px;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.2);
  }

  ul {
    margin: 0;
    padding: 0;
  }

  .menu-items {
    display: none;
  }

  /* clearfix */
  ul::after {
    content: '';
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    position: absolute;
    content: '';
    width: calc(100% - 10px);
    height: 1px;
    background-color: #f0f0f0;
    display: block;
    bottom: -1px;
    left: 5px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
    display: inline-block;
  }
  .icon {
    width: 1em;
    padding-top: 18px;
    padding-bottom: 10px;
  }
  button {
    width: 3em;
    height: 3em;
    padding: 12px;
    color: #f0f0f0;
    background: rgba(255, 255, 255, 0.05);
    align-self: center;
    cursor: pointer;
    border: none;
    display: flex;
    align-items: center;
  }
  button:focus {
    outline: none;
  }

  @media (min-width: 400px) {
    button {
      display: none;
    }
    .menu-items {
      display: block;
    }
  }
</style>

<nav>
  <button>
    <FaBars />
  </button>
  <ul class="menu-items">
    <li>
      <a
        rel="prefetch"
        aria-current={segment === undefined ? 'page' : undefined}
        href="/">
        home
      </a>
    </li>
    <li />
    <li>
      <a
        rel="prefetch"
        aria-current={segment === 'gallery' ? 'page' : undefined}
        href="/gallery">
        gallery
      </a>
    </li>
    <li>
      <a
        rel="prefetch"
        aria-current={segment === 'about' ? 'page' : undefined}
        href="about">
        about
      </a>
    </li>
    <li>
      <a
        rel="prefetch"
        aria-current={segment === 'contact' ? 'page' : undefined}
        href="contact">
        contact
      </a>
    </li>
  </ul>
  <ul>
    <li>
      <a class="icon" href="https://www.instagram.com/matt.thorning/">
        <FaInstagram />
      </a>
    </li>
    <li>
      <a class="icon" href="https://twitter.com/MattThorning">
        <FaTwitterSquare />
      </a>
    </li>
  </ul>
</nav>
