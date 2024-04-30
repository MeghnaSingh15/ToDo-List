function domElement(str){
	const elemstr = str.split(" ");
	const element = document.createElement(elemstr[0]);
	elemstr.forEach(elem => {
		if(elem.indexOf("=") !== -1){
			const attr = elem.split("=");
			element.setAttribute(attr[0],attr[1]);
		}
	});
	return element;
}


function formLayout(className,button1,button2,val1=null,val2=null,submitted=null,time=null){
	const formObj = {};
	const li = domElement("li class="+className);
	const save = domElement("button id="+button1);
	save.innerText = button1;
	const cancel = domElement("button");
	cancel.innerText = button2;
	var title = null;
	var body = null;
	const buttons = createElem("div",[save,cancel]);
	buttons.setAttribute("class","buttons");
	if(time === 1){
		const t = domElement("span");
		t.innerText = returnTime(Date.now());
		formObj["time"] = t;
		li.appendChild(t);
	}
	
	if(submitted === 1){
		title = domElement("h2");
		body = domElement("p");
		title.innerText = val1;
		body.innerText = val2;
		li.appendChild(title);
		li.appendChild(body);
	}else{
		title = domElement("input placeholder=Title id=title type=text");
		body = domElement("textarea placeholder=Content id=body rows=5 cols=auto");
		body.style.resize= "none";
		if(val1 !== null && val2 !== null){
			title.value = val1;
			body.value = val2;
		}
		const inputs = createElem("div",[title,body]);
		li.appendChild(inputs);
	}
	
	cancel.onclick = function(e){
		const parent = e.target.parentElement.parentElement;
		parent.remove();
		if(parent.className.includes("list-items") && ! parent.className.includes("list-items-form")){
			setCount();
		}
		isinit = false;
	}
	li.appendChild(buttons);
	formObj[button1] = save;
	formObj[button2] = cancel;
	formObj["main"] = li;
	return formObj;
}
