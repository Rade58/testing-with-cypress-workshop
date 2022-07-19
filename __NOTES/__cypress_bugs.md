# Bugs when using typing

SOMETIMES THE FULL THEXT DOESN'T GET TYPED IN

SO BEFORE TYPING EXECUTE THIS

```js
cy.wait(500)
```

WHEN TYPING YOU CAN ADD A DELAY OR TIMEOUT, LIKE THIS

```js
cy.get('[data-test=new-coin-input]').type(val, {
  delay: 100,
  timeout: 100
});
```



