---
author: Keonhee Lee
pubDatetime: 2023-03-11T9:40:44Z
title: How to minimize reflow and repaint in the browser
postSlug: minimize-reflow-repaint
featured: true
draft: false
tags:
  - browser
  - reflow
  - repaint
  - performance
description: How to minimize reflow and repaint in the browser ? / 브라우저 렌더링 최적화 영작 연습
---

In the previous post, I talked about how reflow and repaint work in the browser.

Since It causes re-render, We know now it is a expensive job for browser to do.

Then, how we avoid or minimize this expensive job ?

## Minimize reflow and repaint

There are many factors causes reflow and repaint

### `1. Update DOM in batch`

What is Batch then ?

I understood `a Batch` as in `a bunch(bundle) of similar items`

Instead of updating DOM in every each in a loop like below:

```js
const container = document.getElementById('container');

data.forEach(item => {
  const newElement = document.createElement('div');

  newElement.textContent = item.text;

  container.appendChild(newElement);
});
```

we can append each element to the DOM fragment then, we add the entire fragment to the new DOM elements by calling `appendChild`

```js
const container = document.getElementById('container');

const fragment = document.createDocumentFragment();

data.forEach(item => {
  const newElement = document.createElement('div');
  newElement.textContent = item.text;

  fragment.appendChild(newElement);
});

container.appendChild(fragment);
```

in the code above we can see something familiar `createDocumentFragment` method from `document`.

we saw this kind of an empty element in `React`.

It gives us a light weight container for a group of child element.

```jsx
// this is a Fragment
<React.Fragment>
  <element>
    <nestedElement />
  </element>
</React.Fragment>

// or

// this is a Fragment as well.
<>
  <element>
    <nestedElement />
  </element>
</>
```

`createDocumentFragment` is especially useful when adding create a group of DOM nodes before adding them to the document.

this allows lightweight container for a group of DOM nodes.

by using this built in API we can improve reducing number of reflows and repaints.

---

### `2. Minimize DOM depth`

If the depth of the DOM is too deep, it takes more calculation and more time to for browser to traverse the DOM tree when DOM is manipulated. which is expensive.

If we make a change to parent element, it affects the child elements as well.

Since DOM manipulation is necessary, We can minimize this works by reducing the depth of the DOM.

or also by separating big component to smaller components we can reduce the depth of the DOM as well.

```jsx
// App.js

function App() {
  return (
    <div>
      <div>
        <div>
          {/* Title Component*/}
          <h1>Title</h1>
          {/* Content Component*/}
          <p>Content</p>
          <button>Click Me</button>
        </div>
        {/* Image Component*/}
        <div>
          <img src="image.png" alt="Image" />
          {/* Items Component*/}
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
```

to smaller components like below,

```jsx
// Title.js
function Title() {
  return <h1>Title</h1>;
}

// Content.js
function Content() {
  return (
    <div>
      <p>Content</p>
      <button>Click Me</button>
    </div>
  );
}

// Items.js
function Items() {
  return (
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  );
}

// Image.js
function Image() {
  return (
    <div>
      <img src="image.png" alt="Image" />
      <Items />
    </div>
  );
}

// App.js
function App() {
  return (
    <div>
      <div>
        <Title />
        <Content />
        <Image />
      </div>
    </div>
  );
}
```

---

### `3. Manipulate the lowest depth of the DOM possible element ( might not be the best approach)`

By manipulating the lowest possible DOM element, we can minimize the scope of the reflow and repaint operations.

For example, if we have a nested layout with multiple containers, we can update the styles of the `innermost container` instead of the `outer containers.`.

This can help to reduce the number of elements that need to be recalculated and repainted, which can improve performance.

However,it's important to aware that manipulating the lowest possible DOM element is `not always the best approach`.

In some cases, it may be more efficient to make changes to a higher-level container, especially if the change affects a large number of child elements.

It's important to balance the benefits of reducing reflow and repaint with the potential costs of more complex code and increased maintenance.

---

### `4. Remove complex animations from the flow`

Animation is a for sure exhausting job for browser to do.

Removing them from the browser flow, by positioning `position : fixed;`, `position : absolute;`

This allows the dimensions and position to be changed without affecting other layouts of elements in the document.

`it repaints specific animated elements instead of reflowing entire page`

---

### `5. Avoid inline styling`

Inline styling increases size of HTML which can slow down performance of page.

---

### `6. Use Browser Dev Tools ( Inspector )`

---

### USEful content

[Causes of reflow and markup optimization tips - 2011 ( KR )](https://lists.w3.org/Archives/Public/public-html-ig-ko/2011Sep/att-0031/Reflow_____________________________Tip.pdf)
