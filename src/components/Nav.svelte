<script>
  import FaInstagram from 'svelte-icons/fa/FaInstagram.svelte'
  import FaTwitterSquare from 'svelte-icons/fa/FaTwitterSquare.svelte'
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
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.2);
  }

  ul {
    margin: 0;
    padding: 0;
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
    width: calc(100% - 1em);
    height: 2px;
    background-color: #444;
    display: block;
    bottom: -1px;
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
</style>

<nav>
  <ul>
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
