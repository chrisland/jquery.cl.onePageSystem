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

## HTML Page Construction

```html

	<div id="pages">
		
		<div class="page" id="page_1">Content Page 1</div>
		<div class="page" id="page_2">Content Page 2</div>
		<div class="page" id="page_3">Content Page 3</div>
	</div>
```



## Task Example


```js
	myFunc: function (page, content, e) {
		
		// paste your code here...
		
		console.log('myFunc !','page:',page,'content:',content,'e:',e);
		
		return true;
	}
```		

You can add new functions comma seperated.
The name of you function is the data-task attribute you have to set.
In this Example it is data-task"myFunc"


---
---




	
		
### Autor

Christian Marienfeld

www.chrisland.de


### Licence

Licence MIT