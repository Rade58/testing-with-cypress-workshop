<script lang="ts">

	import {page} from '$app/stores'
  import {SvelteToast} from '@zerodevx/svelte-toast'

	import '../app.css';



	let applications = [

    { name: 'Crypto Pooper', path: '/crypto-pooper', active: false },
    { name: 'Secret Menu', path: '/secret-menu', active: false },
    { name: 'Input Obstacles', path: '/obstacle-course', active: false },
    { name: 'Echo Chamber', path: '/echo-chamber', active: false },
    { name: 'Pokémon Search', path: '/pokemon-search', active: false },
    { name: 'Dog Facts', path: '/dog-facts', active: false },
  ];

  let navs: typeof applications[0][][] = []
  
  $: {
    
    if(navs.length === 0){

      
      applications.reduce((prev, curr,i) => {
      
        if($page.url.pathname === prev.path){
          prev.active = true;
        }
        if($page.url.pathname === curr.path){
          curr.active = true;
        }

        if(i%2){
          navs.push([prev, curr])

        }
      
        return curr
      })
    }
  }


  $: {

    const {url: {pathname}} = $page

    // console.log({pathname})

    navs = navs.map(group => {

      const arrGroup = group.map(ob => {
        if(ob.path === pathname){
          ob.active = true;
        }else{
          ob.active=false
        }

        return ob
      })

      // console.log({arrGroup})
      return arrGroup

    })

    // console.log({neuNavs})

  }

  

</script>





<div class="navbar bg-base-100 sticky top-0">
  <div class="flex-1">
    <a href="/" class="btn normal-case text-xl">Cypress Workshop</a>
    <span class="inline-block ml-6">Select your apps -></span>
  </div>
  <div class="flex-none mr-8">
    <ul class="menu menu-horizontal p-0">

			{#each navs as nav, i}

      <li tabindex="0">
        <a>
          app group {i + 1}
          <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
        </a>
        <ul class="p-2 bg-base-100">
          {#each nav as n}
          <li class:bg-primary={n.active}><a href={n.path}>{n.name}</a></li>

					{/each}
        </ul>
      </li>
			{/each}
    </ul>
  </div>
</div>

<main>
  <slot />
  <SvelteToast />
</main>
