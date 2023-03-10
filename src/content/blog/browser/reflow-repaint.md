---
author: Keonhee Lee
pubDatetime: 2023-03-09T10:40:44Z
title: How reflow and repaint work
postSlug: browser-reflow-repaint
featured: true
draft: false
tags:
  - browser
  - reflow
  - repaint
  - performance
description: How reflow and repaint works in JS and Browser ? / 브라우저 리플로우 리페인트 과정 영작 연습
---

### First off, what is `Repaint` and `Reflow` in the Browser

<dl>
  <dt><strong>Repaint</strong></dt>
  <dd>It occurs when changes are made to the appearance of the elements that changes visibility, but doesn't effect the layout
</dd>
<br>
  <dt><strong>Reflow</strong></dt>
  <dd>It re-calculates the position and geometries of the elements in the document.
  Reflow happens when changes are made to the elements, that effects partial or the whole page.

Most importantly `Reflow of the element will cause the subsequent reflow of all the child and ancestor elements in the DOM`</dd>

</dl>

to understand this concept we need to get into how browser renders the website forehead

---

### This is a brief explanation of how browser renders the website.

![Browser rendering](https://res.cloudinary.com/practicaldev/image/fetch/s--gCp3mv5T--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/vbtr2gfaitr0am5nl4io.png 'browser rendering')

- when the users enter the URL, it will fetch the HTML source code from the server
- Browser parse the HTML source code and convert into token <br>
  `< TagName, Attribute, AttributeValue, >`
- These tokens will converted into nodes and will construct `DOM Tree`
- The `CSSOM Tree` will be generated from CSS rules
- The `DOM` and `CSSOM Tree` will combine into the `Render Tree`
- The Render Tree are constructed as below:
  - Start from the root of the DOM Tree and compute `which elements are visible` and `their computed styles`
  - `Render Tree` will ignore the not visible elements like `(meta, script, link) and display:none`
  - It will match the visible node to the appropriate CSSOM rules and apply them
- `Reflow`: Calculate the position and size of each visible node
- `Repaint`: Now, The browser will `paint` the `Render Tree` on the screen

---

### So, Why `reflow` and `repaint` is so important ??

> Reflows are very expensive in terms of performance, and is one of the main causes of slow DOM scripts, especially on devices with low
> processing power, such as phones. In many cases, they are equivalent to laying out the entire page again.

Basically, most `reflows` essentially cause page to be `re-rendered`

which is very expensive work for browser to do if it happens so many times and so often as well as `repaint` ( not exactly the same tho )

#### These are the lists of what causes browser to reflow and repaint

- When `adding`, `removing`, `updating` the DOM nodes.
- `display : none`: causes both reflow and repaint
- `visibility : hidden`: causes only repaint ( no layout or position change)
- `Adjusting`, `Animating` Dom node will trigger reflow and repaint
- `Resizing` the window trigger reflow
- Changing `font-style` alters geometry of the element which it affects the position or size of the other element on the page,
  - The browser to perform reflow. Once those layout operations have completed any damaged pixels will need to be a repaint
- `Adding` or `Removing` Stylesheet will cause the reflow and repaint
- `Script manipulating` the DOM is the expensive operation to be made
  - They have re-calculated each time the document, or part of document modified.
  - It can occur so many times( like thousands of ) per second

##### In the following post we are going to get into

<a href='./minimize-reflow-repaint'>`How we minimize reflow and repaint`</a>
