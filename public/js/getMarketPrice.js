const removeDuplicates = (originalArray, prop) => {
     var newArray = [];
     var lookupObject  = {};

     for(var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
     }

     for(i in lookupObject) {
         newArray.push(lookupObject[i]);
     }
      return newArray;
 }

const getMarketPrice = () => {
	const tbody = document.getElementsByTagName("tbody")[1];
	const names = [...tbody.children].map(element => {
		return [...element.children][1].innerText;
	});

	const ids = [...tbody.children].map(element => {
		return [...element.children][1].children[0].id.split('_')[1];
	});
	

	$.ajax({
		type: "GET",
		url: "https://free.currconv.com/api/v7/convert?q=KZT_USD,USD_KZT&compact=ultra&apiKey=866744b750b70d5ec4ef",
		success: currency => {
			names.forEach((name, index) => {
				let URL = `https://api.dmarket.com/exchange/v1/market/items?orderBy=best_deals&orderDir=desc&title=${ name }&priceFrom=0&priceTo=0&treeFilters=&gameId=a8db&offset=0&limit=100&currency=USD`;

				$.ajax({
					type: "GET",
					url: URL,
					success: data => {
						console.log(currency);
						let objects = removeDuplicates(data.objects, "title");
						let boughtPrice = document.querySelector(`#bought_${ ids[index] }`);
						let marketPriceBlock = document.querySelector(`#market_${ ids[index] }`);

						let marketPrice = ( ( parseFloat(objects[0].suggestedPrice['USD']) / 100 ) * currency["USD_KZT"] ).toFixed(2);

						if ( parseFloat( marketPrice ) < parseFloat( boughtPrice.innerText ) ) {
							marketPriceBlock.innerHTML = `
								<span>${ marketPrice } <i class="fas fa-arrow-down" style="color: red;"></i></span>
							`;
						} else {
							marketPriceBlock.innerHTML = `
								<span>${ marketPrice } <i class="fas fa-arrow-up" style="color: green;"></i></span>
							`;
						}
					}
				});
			});
		}
	});
}
getMarketPrice();