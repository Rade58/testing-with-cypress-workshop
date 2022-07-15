<script context="module" lang="ts">

  import type { Load} from '@sveltejs/kit'


  // OK, I'M HERE GOING TO DEAL WITH sessions OBJECT
  // THING I NEED YET TO DO IS TO FIND OUT
  // WHERE AN HOW user IS GOING TO BE INSERTED IN THIS
  // session OBJECT

  // I THINK THAT WE NEED TO DEFINE getSession HOOK WHERE WE WOLULD
  // HANDLE COOKIE, AND WHERE WE WOULD INSERT user
  // INTO session

  // WE WOULD DO THIS HERE:    src/hooks.ts


  // SEE THIS:     https://kit.svelte.dev/docs/hooks#getsession


  export const load: Load = async ({fetch, session}) => {

    const endpoint = "/echo-chamber/api/users"

    const response = await fetch(endpoint)

    const {user} = session as {user: {id: string; email: string}}

    if(response.ok){
      const {users} = await response.json() as {users: UserType[]}
    
      return {
        props: {
          users,user
        },
        // THIS MEANS THAT IF YOU CREATED __layout COMPONENTS
        // THAT ARE NESTED BELLOW THIS ONE, THE staff
        // WILL BE AVAILABLE INSIDE load FUNCTIONS OF THOSE
        // "NESTED DOWN" COMPONENTS
        stuff: {users, user}
      }
    }

    return {
      status: response.status,
      error: new Error("Something went wrong, coud't obtain users")
    }

  }

</script>

<script lang="ts">

  import {page, session} from '$app/stores'
  // A helper for sending post requests
  import {post} from '$util/post'


  import CreatePost from './posts/_create-post.svelte'

  export let user: UserType;

  const signOut = async () => {
    await post('/echo-chamber/api/sign-out')

    // WE CAN USE SESSION AS WRITABLE STORE
    // eslint-disable-next-line
    // @ts-ignore
    $session.user = null
  }

  $: signedIn = user? true : false;

</script>


<svelte:head>
  <title>Echo Chamber - Cypress workshop</title>
</svelte:head>



<nav class="navbar mt-4 bg-base-300">
  {#if !signedIn}
  <div class="navbar-start">
    <div class="dropdown">
      <label tabindex="0" class="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </label>
      <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <!-- <li><a>Homepage</a></li> -->
        <li><a
            href="/echo-chamber/sign-in"
            data-test="sign-in"
            class:active={$page.url.pathname.endsWith("sign-in")}
          >Sign In</a></li>
        <li><a
            href="/echo-chamber/sign-up"
            data-test="sign-up"
            class:active={$page.url.pathname.endsWith("sign-up")}
          >Sign Up</a></li>
      </ul>
    </div>
  </div>
  {/if}
  <div class="navbar-center">
    <h2 data-test="application-title" class="btn btn-ghost normal-case text-xl">
      <a href="/echo-chamber">

        Echo Chamber  
      </a>  
    
    </h2>
    <p data-test="application-blurb" style="font-size: 10px;"
      class="mx-8"
    >
      A safe place to talk to yourself. Because the thought aren't going to led themselves.
    </p>
  </div>
  {#if signedIn}
  <div class="dropdown dropdown-end"
    data-test="current-user"
  >
    <label tabindex="0" class="btn btn-ghost btn-circle avatar">
      <div class="w-10 rounded-full">
        <img src="https://placeimg.com/80/80/people" />
      </div>
    </label>
    <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
      <li>
        <span class="justify-between">
          Profile
          <span class="badge"
            data-test="current-user-email"
          > {user.email}</span>
        </span>
      </li>
      <!-- <li><a>Settings</a></li> -->
      <li>
        <button 
        data-test="sign-out"
        on:click={signOut}
        class="btn btn-secondary"
        >Logout</button></li>
    </ul>
  </div>
  {/if}
</nav>


<slot />

<CreatePost user={{email: "hello@email.com", id: 1}} />
