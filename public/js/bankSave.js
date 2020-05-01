const unfade = element => {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

const fade = element => {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

const saveBank = () => {
	let bankValue = document.querySelector("#bankValue");
	let currType = document.querySelector("#currType");

	$.ajax({
		type: "POST",
		url: "/api/v1/bank/save",
		data: { bankValue: bankValue.value, currType: currType.value },
		success: status_code => {
			let code = JSON.parse(status_code);
			if ( code.status_code == 301 ) {
				let success = document.querySelector("#success");
				success.innerText = "Your record saved successfully";
				success.classList.remove("hidden");

				fade(document.querySelector("#bankSpan"));

				setTimeout(() => {
					document.querySelector("#bankForm").innerHTML = `<button type="button" class="btn btn-primary" onclick="bankInputs();">Update or create your bank</button>`;
					document.querySelector("#bankSpan").innerText = `${ bankValue.value } ${ currType.value }`;
					unfade(document.querySelector("#bankSpan"));
					success.innerText = "";
					success.classList.add("hidden");
					document.location.reload(true);
				}, 3000);
			} else {
				let fail = document.querySelector("#fail");
				fail.innerText = "Something went wrong!";
				fail.classList.remove("hidden");

				document.querySelector("#bankForm").innerHTML = `<button type="button" class="btn btn-primary" onclick="bankInputs();">Update or create your bank</button>`;

				setTimeout(() => {
					fail.innerText = "";
					fail.classList.add("hidden");
				}, 3000);
			}
		}
	});
}


const recalcBank = () => {
	let tbody = document.querySelector("#tbody");
	obj = [...tbody.children];
	let arr = new Array();

	obj.forEach(item => {
		let price = item.children[3].innerText.split('\n')[0];
		let count = item.children[2].innerText;
		// console.log(price.split('\n'));
		let nowBank = parseFloat(price) * parseInt(count);
		arr.push(nowBank);
	});

	let finishBank = parseFloat(bb) - arr.reduce((a, b) => a + b, 0);
	document.querySelector("#bankSpan").innerText = `${ finishBank.toFixed(2) } ${ bankCurrInform }`;
}

setInterval(recalcBank, 2000);
