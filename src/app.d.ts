/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
// declare namespace App {
// interface Locals {}
// interface Platform {}
// interface Session {}
// interface Stuff {}
// }

import type { Post } from '@prisma/client';

// THIS I ALLOWED, POPULATE THESE INTERFACS
// TO GET TYPE SAFTY
declare namespace App {
  interface Locals {
    user: UserType;
  }

  // interface Platform {}

  interface Session {
    user: UserType;
  }

  interface Stuff {
    posts: Post[];
  }
}

type CoinType = {
  id: number;
  title: string;
  shitcoin: boolean;
};

// POPULATE THIS
