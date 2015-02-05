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

The class 'pageBtn' is a mandatory disclosure.

To change the page, you must specify the data-page attribute.
To perform a task, add the data-task attribute.
You can also combine them.


---

## HTML Page Construction

```html
	
	<head>
		<style>	
			.page {
				display: none;
			}
		</style>
	</head
	<body>
		
		<div class="page" id="page_1">Content Page 1</div>
		<div class="page" id="page_2">Content Page 2</div>
		<div class="page" id="page_3">Content Page 3</div>
		
		<script src="js/onPageSystem-min.js"></script>
		<script src="js/onPageSystem-tasks.js"></script>
		
		<script>
			window.onload = function() {
				OPS.page.initialize();
			};
		</script>
		
	</body>
```



---


## Task Example


```js
	myFunc: function (page, content, e) {
		
		// paste your code here...
		
		console.log('myFunc !','page:',page,'content:',content,'e:',e);
		
		return true; // if false or missing, the page will not change!
	}
```		

To define your own function, edit the onPageSystem-tasks file.
You can add new functions comma seperated.
The name of you function is the data-task attribute you have to set.
In this Example it is data-task"myFunc"

You can add a data-content="" attribute to the button elements.
After clicking the button you will have the content in your task function.


---
---




	
		
### Autor

Christian Marienfeld

www.chrisland.de


### Licence

Licence MIT