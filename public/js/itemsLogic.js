class Items {
	constructor (itemName, itemCount, boughtPrice, expPrice, finishPrice, index, itemId) {
		this.name = itemName;
		this.count = itemCount;
		this.boughtPrice = boughtPrice;
		this.expPrice = expPrice;
		this.finishPrice = finishPrice;
		this.index = index;
		this.id = itemId;
	}

	toHtml() {
		return (`
		<tr style="text-align: center;" id="tr_${ this.id }">
			<th scope="row" id="indexOfItem"><span class="price">${ this.index + 1 }</span></th>
			<td><span class="price" style="width: 60%;" id="name_${ this.id }">${ this.name }</span></td>
			<td><span class="price">${ this.count }</span></td>

			<td style="font-size: 16px; color: #dc3544;" id="bought_${ this.id }">
				<div class="numbers price">
					${ this.boughtPrice } <br>
					<span style="font-size: 12px; !important;">
						${ parseInt(this.count) * parseFloat(this.boughtPrice) }	
					</span>
				</div>
			</td>

			<td style="font-size: 16px; color: #3aa745;">
				<div class="numbers price">
					${ this.expPrice }<br>
					<span style="font-size: 12px; !important;">
						${ parseInt(this.count) * parseFloat(this.expPrice) }
					</span>
				</div>
			</td>

			<td id="market_${ this.id }"></td>
			<td><button class="btn btn-danger" onclick="deleteItem(this.id);" id="${ this.id }">Delete</button></td>
	    </tr>
		`)
	}
}


const saveItem = () => {
	let itemName = document.querySelector("#item-Name");
	let boughtPrice = document.querySelector("#item-boughtPrice");
	let expPrice = document.querySelector("#item-expPrice");
	let itemCount = document.querySelector("#item-Count");

	$.ajax({
		type: "POST",
		url: "/api/v1/item/save",
		data: { "itemName": itemName.value, "boughtPrice": boughtPrice.value, "expPrice": expPrice.value, 'itemCount': itemCount.value },
		success: id => {
			let itemId = JSON.parse(id);
			let tbody = document.querySelector("#tbody");
			tbody = [...tbody.children];
			let index = tbody[tbody.length - 1];
			let indexText = 0;
			try { 
				let indexText = index.children[0].innerText;
			} catch (e) {
				;
			}

			let finishPrice = parseInt(itemCount.value) * parseFloat(boughtPrice.value);
			itemBlock = new Items(itemName.value, itemCount.value, boughtPrice.value, expPrice.value, finishPrice, indexText, itemId.itemId);
			document.querySelector("#tbody").innerHTML += itemBlock.toHtml();

			itemName.value = '';
			itemCount.value = '1'; 
			boughtPrice.value = '';
			expPrice.value = '';
		}
	});
}


const deleteItem = itemId => {
	$.ajax({
		type: "POST",
		url: "/api/v1/item/delete",
		data: {"itemId": itemId},
		success: status => {
			document.querySelector(`#tr_${ itemId }`).remove();
		}
	});
}