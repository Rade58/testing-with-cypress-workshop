<script context="module" lang="ts">
  import type {Load} from '@sveltejs/kit'

  export const load: Load = async ({url: {searchParams}, session}) => {

    const error = searchParams.get("error");

    const {user} = session as {user: UserType}

    if(user){
      return {
        status: 302,
        redirect: '/echo-chamber/posts'
      }
    }

    return {
      props: {error}

    }

  }

</script>

<script lang="ts">
  export let error: string;
</script>


{#if error}
<div class="alert alert-error shadow-lg">
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>Error! {error}</span>
  </div>
</div>
{/if}

<form action="/echo-chamber/api/sign-in" method="post"
  data-test="sign-in-form"
  class="max-w-2xl mx-auto"
>
  <label for="email" class="inline-block mb-8 mt-12">
    Email Address
    <br />
    <input id="email" type="email" name="email" data-test="sign-in-email"
      required placeholder="Enter email"
      class="input input-bordered input-primary w-full max-w-xs" />
  </label>
  <br/>
  <label for="password">
    Password <br/>
    <input type="password" name="password" id="password"
    data-test="password" required 
    placeholder="Enter password" 
    class="input input-bordered input-primary w-full max-w-xs" />
  </label>
  <br/>
  <button type="submit"
    data-test="sign-in-submit"
    class="btn btn-primary mt-16"
  >Sign In</button>
</form>