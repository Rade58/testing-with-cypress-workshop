<script lang="ts">

	import {page} from '$app/stores'

	import '../app.css';



	let applications = [

    { name: 'Jetsetter', path: '/jetsetter', active: false },
    { name: 'Secret Menu', path: '/secret-menu', active: false },
    { name: 'Input Obstacles', path: '/obstacle-course', active: false },
    { name: 'Echo Chamber', path: '/echo-chamber', active: false },
    { name: 'Pokémon Search', path: '/pokemon-search', active: false },
    { name: 'Dog Facts', path: '/dog-facts', active: false },
  ];

	const navigation: typeof applications[0][][] = []

	applications.reduce((prev, curr,i) => {
		
		if($page.url.pathname === prev.path){
			prev.active = true;
		}
		if($page.url.pathname === curr.path){
			curr.active = true;
		}

		if(i%2){
			navigation.push([prev, curr])

		}

		return curr
	})

	console.log(navigation)



</script>





<div class="navbar bg-base-100">
  <div class="flex-1">
    <span class="btn normal-case text-xl">Cypress Workshop</span>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal p-0">
      <li><a>Item 1</a></li>
      <li tabindex="0">
        <a>
          Parent
          <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
        </a>
        <ul class="p-2 bg-base-100">
          <li><a>Submenu 1</a></li>
          <li><a>Submenu 2</a></li>
        </ul>
      </li>
      <li><a>Item 3</a></li>
    </ul>
  </div>
</div>


<slot />
