<script lang="ts">

  const avengers = [
    'Iron Man',
    'Black Widow',
    'Thor',
    'Hulk',
    'Captain America',
    'Hawkeye',
  ] as const

  const toppingChoices = [
    'Lettuce', 'Tomato', 'Onion', 'Sardines'
  ] as const;
  
  const beatles = ['John', 'Paul', 'George', 'Ringo'];


  type AvengerType = typeof avengers[number]
  type ToppingType = typeof toppingChoices[number]
  // THIS SHOULD BE ONLY string TYPE
  type BeatleType = typeof beatles[number]

  let text: string = "";
  let favoriteAvenger: AvengerType = "Hawkeye";
  let toppings: ToppingType[] = [];
  let favoriteBeatle: BeatleType = "Ringo"
  let color: string = "#9281a3"
  let date = '2022-7-12';
  let rating = '4';
  let file: string;

  $: console.log({favoriteAvenger})

</script>

<svelte:head>
  <title>Input Obstacle Course</title>
</svelte:head>

<div class="grid grid-cols-2 gap-4 mt-8 mx-4 mb-12">
  <div class="p-2 border-2 border-primary">
    <label for="deep-thought" class="mb-1 inline-block">Deep Thought</label>
    <br />
    <input
      id="deep-thought"
      type="text" 
      placeholder="Some text..."
      bind:value={text}
      data-test="text-input"
      class="input input-bordered input-secondary w-full max-w-xs"
    />
  </div>
  <div class="p-2 border-2 border-primary">
    <p
      data-test="text-result"
    >{text}</p>
  </div>
  <div class="p-2 border-2 border-primary">
    <label for="avenger" class="mb-1 inline-block">Favorite Avenger</label>
    <br />
    <select 
      id="avenger"
      class="select select-secondary w-full max-w-xs"
      bind:value={favoriteAvenger}
      data-test="select-input"
    >
      <option disabled selected>Pick your favorite avenger</option>
      {#each avengers as ave}
        <option value={ave}>{ave}</option>
      {/each}
    </select>
  </div>
  <div class="p-2 border-2 border-primary">
    <p
      data-test="select-result"
    >{favoriteAvenger || "No one"}</p>
  </div>
  <div class="p-2 border-2 border-primary">
    <h3>Toppings</h3>
    {#each toppingChoices as topping}
    <div class="form-control">
      <label class="cursor-pointer label">
        <span class="label-text">{topping}</span>
        <input type="checkbox"
          value={topping}
          class="checkbox checkbox-secondary"
          bind:group={toppings}
          name="toppings"
          data-test="checkbox-{topping.toLowerCase()}"
        />
      </label>
    </div>
    {/each}
  </div>
  <div class="p-2 border-2 border-primary">
    <p data-test="checkbox-result">
      {toppings.join(", ") || '(None)'}
    </p>
  </div>
  <div class="p-2 border-2 border-primary">
    <h3>Favorite Beatle</h3>
    {#each beatles as beat}
    <label class="label cursor-pointer max-w-sm flex justify-end">
      <span class="label-text mr-20">{beat}</span> 
      <input 
        type="radio"
        name="beatles"
        class="radio checked:bg-secondary mr-12"
        value={beat}
        bind:group={favoriteBeatle}
        data-test="radio-{beat.toLowerCase()}"
       />
    </label>
    {/each}
  </div>
  <div class="p-2 border-2 border-primary">
    <p data-test="radio-result">{favoriteBeatle}</p>
  </div>
  <div class="p-2 border-2 border-primary">
    <label for="color" class="mb-1 inline-block">Favorite Color</label>
    <br />
    <input type="color" 
      bind:value={color}
      id="color"
      data-test="color-input"
      class="input input-secondary w-28"
    />
  </div>
  <div class="p-2 border-2 border-primary">
    <p data-test="color-result">{color}</p>
    <div class="p-4 w-10 h-5" style="background-color: {color};"></div>
  </div>
  <div class="p-2 border-2 border-primary">
    <label for="date" class="inline-block mb-1">Date</label>
    <br />
    <input type="date" name="date"
      id="date"
      bind:value={date}
      data-test="date-input"
      class="input input-secondary"

    />
  </div>
  <div class="p-2 border-2 border-primary">
    <p data-test="date-result">{date}</p>
  </div>
  <div class="p-2 border-2 border-primary">
    <label for="rating"
      class="inline-block mb-1"
    >
      Rating
    </label>

    <input type="range" id="rating" name="rating"
      min="1"
      max="10"
      class="block range range-secondary"
      bind:value={rating}
      step="1"
      data-test="range-input"
    />
    <div class="w-full flex justify-between text-xs px-2">
      <span>|</span>
      <span>|</span>
      <span>|</span>
      <span>|</span>
      <span>|</span>
      <span>|</span>
      <span>|</span>
      <span>|</span>
      <span>|</span>
      <span>|</span>
    </div>
  </div>
  <div class="p-2 border-2 border-primary">
    <p data-test="range-result">{rating}</p>
  </div>
  <div class="p-2 border-2 border-primary">
    <label for="resume" class="inline-block mb-1">Resume</label>
    <br />
    <input type="file" name="resume" id="resume" 
      bind:value={file}
      data-test="file-input"
      class="input input-secondary pt-1"

    />
  </div>
  <div class="p-2 border-2 border-primary">
    <p data-test="file-result">{file || ""}</p>
  </div>
</div>






