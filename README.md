onePageSystem
====================


---


## Button Syntax

```html

	<button class="pageBtn" data-page="2" data-task="">Open Page 2</button>
	
	<div class="pageBtn" data-page="2" data-task="myFunc">Open Page 2 with task</button>
	
	<a class="pageBtn" data-page="2" data-task="myFunc" data-content="myData">Open Page 2 with task and content</button>

```
---



To define your own function, edit the onPageSystem-tasks file.

To call the function, you need to add the data-task attribute.		

You can add a data-content="" attribute. After clicking the button you will have the content is in your task function.


---

## HTML Page Construction

```html

	<div id="pages">
		
		<div class="page" id="page_1">Content Page 1</div>
		<div class="page" id="page_2">Content Page 2</div>
		<div class="page" id="page_3">Content Page 3</div>
	</div>
```

---
---

### Autor

Christian Marienfeld

www.chrisland.de


### Licence

Licence MIT