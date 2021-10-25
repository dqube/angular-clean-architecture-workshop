# Testing RxJS Observables

- write maintainable tests efficiently
  - without Marble Diagrams
- Jan-Niklas Wortmann
  - @niklas_wortmann    
  - jan@niklas-wortmann.com
  - github: https://github.com/niklas-wortmann

```ts
export function syncEx(val: boolean): Observable<boolean> {
    return of(val);
}

// use the `done()` callback method in your test(s)
it('should', (done) => {
    syncEx(true).subscribe(val => {
        expect(val).toEqual(false);
        done();
    })
}
```

See: [https://github.com/hirezio/observer-spy](https://github.com/hirezio/observer-spy)

- automatic unsubscribe from subscriptions

Testing Observables with Subscription requires a different sequence:

1. arrange
2. assert
3. react

## Mocking an `Observable`

There are (6) steps

1. start with `NEVER`

```ts
() => NEVER
```

2. use `of` for single Objects

```ts
of(true)
```

3. use `of` + `delay` for async

```t
() => of(true).pipe(delay(1000))
```

4. use `from` for multiple sync Values

```ts
() => from ([1,2,3])
```

5. use `interval` for multiple async Values

```ts
() => interval(1000)
```

6. use a `Subject`|`BehaviorSubject` for more flexibility

```ts
() => login.asObservable()
```

## ASCII Marble Diagrams

> Find the syntax for marble diagrams

- use marble syntax to expect

```ts
expectObservable(forever$).toBe(..);
```

> Use to understand how the operators work in RxJS