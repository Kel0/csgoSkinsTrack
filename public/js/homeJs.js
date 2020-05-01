let $bankForm = document.querySelector("#bankForm");

const bankInputs = () => {
	$bankForm.innerHTML = `
		<div class="input-group input-group-sm mb-3">
		  <div class="input-group-prepend">
		    <span class="input-group-text" id="inputGroup-sizing-sm">Bank</span>
		  </div>
		  <input type="text" class="form-control" aria-label="Bank" aria-describedby="inputGroup-sizing-sm" id="bankValue">
		  <select class="form-control" id="currType">
		  	<option value="KZT">KZT</option>
		  	<option value="USD">USD</option>
		  	<option value="EUR">EUR</option>
		  	<option value="RUB">RUB</option>
		  </select>
		  <button class="btn btn-primary form-control" style="width: 10px;" onclick="saveBank();" type="button">Save</button>
		</div>
	`;
}










