<script>
  import Checkout from './Checkout.svelte'
  export let printSizes, title

  $: selectedPrint = printSizes[0]
  function select(print) {
    selectedPrint = print
  }
</script>

<style>
  div {
    margin: 50px auto;
    max-width: 450px;
    width: 100%;
  }
  table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    margin-bottom: 50px;
  }
  td {
    padding: 8px;
    border-top: 1px solid #777;
  }
  input[type='radio'] {
    cursor: pointer;
  }
</style>

<div>
  <table>
    <thead>
      <th />
      <th>Size (in)</th>
      <!--
      <th>Pixels</th>
      -->
      <th>Size (mm)</th>
      <th>Price</th>
      <!--
      <th>Img Ratio</th>
      <th>Print Ratio</th>
      <th>DPI</th>
      -->
    </thead>
    <tbody>
      {#each printSizes as print}
        <tr>
          <td>
            <input
              type="radio"
              checked={print === selectedPrint}
              on:change={() => select(print)} />
          </td>
          <td>{print.x} x {print.y}</td>
          <!--
          <td>{print.cropSize}</td>
           -->
          <td>{Math.round(print.x * 25.4)} x {Math.round(print.y * 25.4)}</td>
          <td>£{print.price}</td>
          <!--
          <td>{print.imgRatio}</td>
          <td>{print.paperRatio}</td>
          <td>{print.dpi}</td>
            -->
        </tr>
      {/each}
    </tbody>
  </table>
  <Checkout selectedPrint={{ ...selectedPrint, title }} />
</div>
